/**
 * Proxies ICTO service requests to a Google Apps Script web app so rows land in Sheets without
 * browser POST to docs.google.com (avoids HTTP 401 when the Form requires Google auth).
 *
 * Security (production):
 *   - `ICTO_APPS_SCRIPT_INGEST_URL` and `ICTO_SERVICE_SHEET_SHARED_SECRET` must be server-only.
 *     Set them in the host dashboard (Netlify / Vercel). Do **not** use the `PUBLIC_` prefix.
 *   - Optional `ICTO_SHEET_INGEST_ALLOWED_ORIGINS` (comma-separated full origins) if users hit
 *     a host alias where `Origin` does not match `request.url` (e.g. www vs apex).
 *   - Secrets are never sent to the browser; the page only POSTs same-origin JSON to this route.
 *   - Successful responses do not echo upstream payloads (prevents leaking Apps Script internals).
 *
 * Local development (Astro dev server, `import.meta.env.DEV`):
 *   - Server-side reCAPTCHA verification is skipped by default so localhost POSTs succeed without
 *     registering `localhost` in reCAPTCHA Admin or matching prod keys.
 *   - Set `ICTO_ENFORCE_RECAPTCHA_IN_DEV=true` to run the same verify path as production while developing.
 *   - `ICTO_RECAPTCHA_USE_REMOTEIP=true` — include `remoteip` on siteverify (default is off).
 *     Loopback/private/malformed X-Forwarded-For values often trigger reCAPTCHA `browser-error`;
 *     omitting `remoteip` is valid and fixes many dev/proxy setups.
 */

import {
  stripJsonHoneypotFields,
  jsonHoneypotNonEmpty,
  rateLimitJsonResponse,
} from '../../lib/spam-guard.js';
import { getClientIp } from '../../lib/request-ip.js';

const MAX_JSON_BYTES = 24 * 1024 * 1024;
const MAX_ENTRY_KEYS = 72;
const MAX_ENTRY_KEY_LEN = 64;
const MAX_ENTRY_VALUE_CHARS = 48_000;
const MAX_HEADER_MAP_KEYS = 120;
const MAX_HEADER_MAP_VALUE_CHARS = 128;
const MAX_FILES = 14;
/** ~10MB base64 per file (~7.5MiB decoded) — tuned for larger scanned IDs/signatures */
const MAX_FILE_B64_CHARS = 10 * 1024 * 1024;
const RECAPTCHA_MIN_SCORE = 0.5;

/** @param {unknown} codesRaw */
function recaptchaVerifyFailureReason(codesRaw) {
  const codes =
    Array.isArray(codesRaw) && codesRaw.length
      ? codesRaw.map(function (x) {
          return String(x == null ? '' : x).toLowerCase().trim();
        })
      : [];
  const joined = codes.length ? codes.slice(0, 8).join(', ') : '';
  if (codes.indexOf('browser-error') !== -1) {
    return (
      'Security verification failed (browser-error). ' +
      'This site verifies reCAPTCHA without sending client IP unless ICTO_RECAPTCHA_USE_REMOTEIP=true. ' +
      'If it still fails: add your exact host under reCAPTCHA Admin → Domains, confirm Site Key + Secret are one pair, ' +
      'try another browser/disabled extensions. On Astro dev, server verify is off unless ICTO_ENFORCE_RECAPTCHA_IN_DEV=true.'
    );
  }
  if (joined) {
    return (
      'Security verification failed (' +
      joined.slice(0, 120) +
      '). Check reCAPTCHA site key, secret key, and registered domains.'
    );
  }
  return 'Security verification failed.';
}

/** Omit `remoteip` unless optional + looks like a public IP (avoid Google `browser-error` on ::1 etc.). */
function shouldSendRemoteIpForRecaptcha(raw) {
  if (String(process.env.ICTO_RECAPTCHA_USE_REMOTEIP || '').trim().toLowerCase() !== 'true')
    return false;
  if (!raw || typeof raw !== 'string') return false;
  const ip = raw.trim();
  if (!ip || ip === 'unknown') return false;
  if (ip.includes(',')) return false;
  if (ip === '::1') return false;
  if (/^127\./.test(ip)) return false;
  if (/^192\.168\./.test(ip)) return false;
  if (/^10\./.test(ip)) return false;
  if (/^172\.(1[6-9]|2\d|3[01])\./.test(ip)) return false;
  if (/^169\.254\./.test(ip)) return false;
  if (/^fe80:/i.test(ip)) return false;
  if (/^::ffff:127\./i.test(ip)) return false;
  return /^[\da-fA-F:.]+$/.test(ip) || /^[\d.]+$/.test(ip);
}

function invalidRequest(msg, status = 400) {
  return new Response(JSON.stringify({ success: false, error: msg || 'Invalid request.' }), {
    status,
    headers: jsonNoStoreHeaders(),
  });
}

async function verifyRecaptchaToken({ token, request, expectedAction }) {
  const enforceRecaptchaInDev =
    import.meta.env.DEV === true &&
    String(process.env.ICTO_ENFORCE_RECAPTCHA_IN_DEV || '').trim().toLowerCase() === 'true';
  if (import.meta.env.DEV === true && !enforceRecaptchaInDev) {
    return { ok: true, skipped: true };
  }

  const secret =
    import.meta.env.RECAPTCHA_SECRET_KEY?.trim?.() || process.env.RECAPTCHA_SECRET_KEY?.trim?.() || '';
  if (!secret) return { ok: true, skipped: true };
  if (!token || typeof token !== 'string' || !token.trim()) {
    return { ok: false, reason: 'Security verification token missing.' };
  }

  const payload = new URLSearchParams({
    secret,
    response: token.trim(),
  });
  const ip = getClientIp(request);
  if (shouldSendRemoteIpForRecaptcha(ip)) payload.set('remoteip', ip.trim());

  try {
    const verifyRes = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: payload,
    });
    if (!verifyRes.ok) {
      return { ok: false, reason: 'Security verification service unavailable.' };
    }
    const data = await verifyRes.json();
    if (!data || data.success !== true) {
      return { ok: false, reason: recaptchaVerifyFailureReason(data['error-codes']) };
    }
    if (expectedAction && typeof data.action === 'string' && data.action !== expectedAction) {
      return { ok: false, reason: 'Security verification action mismatch.' };
    }
    const score = typeof data.score === 'number' ? data.score : null;
    if (score != null && score < RECAPTCHA_MIN_SCORE) {
      return { ok: false, reason: 'Security verification score too low.' };
    }
    return { ok: true };
  } catch {
    return { ok: false, reason: 'Security verification could not be completed.' };
  }
}

function jsonNoStoreHeaders() {
  return {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  };
}

function unauthorized(msg) {
  return new Response(JSON.stringify({ success: false, error: msg || 'Not configured' }), {
    status: 503,
    headers: jsonNoStoreHeaders(),
  });
}

/**
 * Optional comma-separated absolute origins (e.g. `https://www.example.com,https://example.com`)
 * when the live site is reachable on multiple hosts but `request.url` origin differs from `Origin`
 * (aliases, www vs apex). Prefer fixing DNS/canonical URLs; this is an escape hatch.
 */
function originAllowedForSheetIngest(request, actualOrigin) {
  let expected;
  try {
    expected = new URL(request.url).origin;
  } catch {
    return false;
  }
  if (actualOrigin === expected) return true;
  const raw = String(process.env.ICTO_SHEET_INGEST_ALLOWED_ORIGINS || '').trim();
  if (!raw) return false;
  const parts = raw.split(',');
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i].trim();
    if (!p) continue;
    try {
      if (new URL(p).origin === actualOrigin) return true;
    } catch {
      /* ignore bad entry */
    }
  }
  return false;
}

/** In production, reject cross-origin browser POSTs when `Origin` is present. */
function crossOriginBlockResponse(request) {
  if (!import.meta.env.PROD) return null;
  const origin = request.headers.get('origin');
  if (!origin || !origin.trim()) return null;
  let actual;
  try {
    actual = new URL(origin).origin;
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid request.' }), {
      status: 403,
      headers: jsonNoStoreHeaders(),
    });
  }
  if (!originAllowedForSheetIngest(request, actual)) {
    return new Response(JSON.stringify({ success: false, error: 'Forbidden' }), {
      status: 403,
      headers: jsonNoStoreHeaders(),
    });
  }
  return null;
}

function safeClientMessage(s, max = 280) {
  const t = String(s == null ? '' : s).replace(/[\r\n]+/g, ' ').trim();
  return t.length > max ? t.slice(0, max - 1) + '\u2026' : t;
}

/**
 * Ensure `entries` and optional `entryIdByColumnHeader` shapes are bounded and safe.
 * Note: Google Forms can emit duplicate `entry.*` keys; the client intentionally represents these as `string[]`.
 * @returns {Response | null} 400 Response or null if ok.
 */
function validateIngestShape(body) {
  const entries = body.entries;
  if (!entries || typeof entries !== 'object' || Array.isArray(entries)) {
    return new Response(JSON.stringify({ success: false, error: 'Missing entries.' }), {
      status: 400,
      headers: jsonNoStoreHeaders(),
    });
  }
  const keys = Object.keys(entries);
  if (keys.length > MAX_ENTRY_KEYS) {
    return new Response(JSON.stringify({ success: false, error: 'Too many form fields.' }), {
      status: 400,
      headers: jsonNoStoreHeaders(),
    });
  }
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (typeof k !== 'string' || k.length > MAX_ENTRY_KEY_LEN) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid field name.' }), {
        status: 400,
        headers: jsonNoStoreHeaders(),
      });
    }
    const v = entries[k];
    if (v == null) continue;
    if (typeof v === 'string') {
      if (v.length > MAX_ENTRY_VALUE_CHARS) {
        return new Response(JSON.stringify({ success: false, error: 'Field value too large.' }), {
          status: 413,
          headers: jsonNoStoreHeaders(),
        });
      }
      continue;
    }
    if (Array.isArray(v)) {
      if (v.length > 48) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid field value.' }), {
          status: 400,
          headers: jsonNoStoreHeaders(),
        });
      }
      let total = 0;
      for (let ai = 0; ai < v.length; ai++) {
        const one = v[ai];
        if (one == null) continue;
        if (typeof one !== 'string') {
          return new Response(JSON.stringify({ success: false, error: 'Invalid field value.' }), {
            status: 400,
            headers: jsonNoStoreHeaders(),
          });
        }
        total += one.length;
        if (one.length > MAX_ENTRY_VALUE_CHARS || total > MAX_ENTRY_VALUE_CHARS) {
          return new Response(JSON.stringify({ success: false, error: 'Field value too large.' }), {
            status: 413,
            headers: jsonNoStoreHeaders(),
          });
        }
      }
      continue;
    }
    {
      return new Response(JSON.stringify({ success: false, error: 'Invalid field value.' }), {
        status: 400,
        headers: jsonNoStoreHeaders(),
      });
    }
  }

  const map = body.entryIdByColumnHeader;
  if (map && typeof map === 'object' && !Array.isArray(map)) {
    const mk = Object.keys(map);
    if (mk.length > MAX_HEADER_MAP_KEYS) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid metadata.' }), {
        status: 400,
        headers: jsonNoStoreHeaders(),
      });
    }
    for (let j = 0; j < mk.length; j++) {
      const key = mk[j];
      const val = map[key];
      if (typeof key !== 'string' || key.length > 200) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid metadata.' }), {
          status: 400,
          headers: jsonNoStoreHeaders(),
        });
      }
      if (val != null && (typeof val !== 'string' || String(val).length > MAX_HEADER_MAP_VALUE_CHARS)) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid metadata.' }), {
          status: 400,
          headers: jsonNoStoreHeaders(),
        });
      }
    }
  }

  const files = Array.isArray(body.files) ? body.files : [];
  if (files.length > MAX_FILES) {
    return new Response(JSON.stringify({ success: false, error: 'Too many attachments.' }), {
      status: 400,
      headers: jsonNoStoreHeaders(),
    });
  }
  for (let f = 0; f < files.length; f++) {
    const part = files[f];
    if (!part || typeof part !== 'object') {
      return new Response(JSON.stringify({ success: false, error: 'Invalid attachment.' }), {
        status: 400,
        headers: jsonNoStoreHeaders(),
      });
    }
    const b64 = part.dataBase64;
    if (b64 != null && (typeof b64 !== 'string' || b64.length > MAX_FILE_B64_CHARS)) {
      return new Response(JSON.stringify({ success: false, error: 'Attachment too large.' }), {
        status: 413,
        headers: jsonNoStoreHeaders(),
      });
    }
  }

  return null;
}

export async function POST({ request }) {
  const ingestUrl =
    import.meta.env.ICTO_APPS_SCRIPT_INGEST_URL?.trim?.() ||
    process.env.ICTO_APPS_SCRIPT_INGEST_URL?.trim?.() ||
    '';
  const sharedSecret =
    import.meta.env.ICTO_SERVICE_SHEET_SHARED_SECRET?.trim?.() ||
    process.env.ICTO_SERVICE_SHEET_SHARED_SECRET?.trim?.() ||
    '';

  if (!ingestUrl || !sharedSecret) {
    return unauthorized('ICTO sheet ingest is not configured on this server.');
  }

  const corsBlock = crossOriginBlockResponse(request);
  if (corsBlock) return corsBlock;

  const tooMany = rateLimitJsonResponse('icto-service-sheet-ingest', request, 30);
  if (tooMany) return tooMany;

  const rawLen = Number(request.headers.get('content-length') || 0);
  if (rawLen > MAX_JSON_BYTES) {
    return new Response(JSON.stringify({ success: false, error: 'Request body too large.' }), {
      status: 413,
      headers: jsonNoStoreHeaders(),
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Invalid JSON.' }), {
      status: 400,
      headers: jsonNoStoreHeaders(),
    });
  }

  if (jsonHoneypotNonEmpty(body)) {
    stripJsonHoneypotFields(body);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: jsonNoStoreHeaders(),
    });
  }

  stripJsonHoneypotFields(body);

  const recaptcha = await verifyRecaptchaToken({
    token: body.recaptchaToken,
    request,
    expectedAction:
      typeof body.recaptchaAction === 'string' && body.recaptchaAction.trim()
        ? body.recaptchaAction.trim()
        : 'icto_service_submit',
  });
  if (!recaptcha.ok) {
    return invalidRequest(recaptcha.reason || 'Security verification failed.', 403);
  }

  const shapeErr = validateIngestShape(body);
  if (shapeErr) return shapeErr;

  /** @type {Record<string, unknown>} */
  const forward = {
    secret: sharedSecret,
    source: 'msu-tcto-website',
    submittedAt:
      typeof body.submittedAt === 'string' ? String(body.submittedAt).slice(0, 80) : new Date().toISOString(),
    appointmentReference:
      typeof body.appointmentReference === 'string'
        ? String(body.appointmentReference).slice(0, 280)
        : '',
    submissionId:
      typeof body.submissionId === 'string' ? String(body.submissionId).slice(0, 128) : '',
    entries: body.entries,
    files: Array.isArray(body.files) ? body.files : [],
    entryIdByColumnHeader:
      body.entryIdByColumnHeader && typeof body.entryIdByColumnHeader === 'object'
        ? body.entryIdByColumnHeader
        : {},
  };

  try {
    const up = await fetch(ingestUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(forward),
    });

    const text = await up.text();
    let parsed = {};
    try {
      parsed = JSON.parse(text);
    } catch {
      /* non-JSON (e.g. HTML error) */
    }

    if (!up.ok) {
      console.error('[icto-service-sheet-ingest] Apps Script HTTP', up.status, text.slice(0, 500));
      return new Response(
        JSON.stringify({
          success: false,
          error: safeClientMessage(
            typeof parsed.error === 'string'
              ? parsed.error
              : 'Apps Script HTTP error (' + up.status + ')',
          ),
        }),
        {
          status: 502,
          headers: jsonNoStoreHeaders(),
        },
      );
    }

    if (parsed.ok !== true) {
      return new Response(
        JSON.stringify({
          success: false,
          error: safeClientMessage(
            typeof parsed.error === 'string'
              ? parsed.error
              : 'Ingest endpoint did not confirm success.',
          ),
        }),
        {
          status: 502,
          headers: jsonNoStoreHeaders(),
        },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: jsonNoStoreHeaders(),
    });
  } catch (err) {
    console.error('[icto-service-sheet-ingest]', err);
    return new Response(
      JSON.stringify({ success: false, error: 'Failed to reach ingest endpoint.' }),
      {
        status: 502,
        headers: jsonNoStoreHeaders(),
      },
    );
  }
}
