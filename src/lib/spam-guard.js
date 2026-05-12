import { checkRateLimit } from './rate-limit.js';
import { getClientIp } from './request-ip.js';

/** Hidden field — leave blank; bots often fill visible-off inputs. */
export const HONEYPOT_FIELD = 'hp_company_url';

export function isHoneypotTripped(formData) {
  const v = formData.get(HONEYPOT_FIELD);
  return v != null && String(v).trim() !== '';
}

/**
 * @returns {Response | null} 429 Response or null when allowed.
 */
export function jsonHoneypotNonEmpty(body) {
  if (!body || typeof body !== 'object') return false;
  const v = body.hp_company_url ?? body.HpCompanyUrl;
  return v != null && String(v).trim() !== '';
}

/** Remove anti-spam fields before forwarding payloads (e.g. Power Automate). */
export function stripJsonHoneypotFields(body) {
  if (!body || typeof body !== 'object') return;
  delete body.hp_company_url;
  delete body.HpCompanyUrl;
}

export function rateLimitJsonResponse(endpointKey, request, prodLimit, windowMs = 3600000) {
  const ip = getClientIp(request);
  const max = import.meta.env.PROD ? prodLimit : Math.max(prodLimit, 250);
  const rl = checkRateLimit(`${endpointKey}:${ip}`, { max, windowMs });
  if (rl.ok) return null;
  return new Response(
    JSON.stringify({
      success: false,
      error: 'Too many requests. Please try again later.',
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
        ...(rl.retryAfter ? { 'Retry-After': String(rl.retryAfter) } : {}),
      },
    },
  );
}
