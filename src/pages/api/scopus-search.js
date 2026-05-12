/**
 * Proxies Scopus search. API key stays in headers only — never echoed to clients or logs.
 */
import { rateLimitJsonResponse } from '../../lib/spam-guard.js';
import { crossOriginBrowserBlockResponse } from '../../lib/same-origin-browser.js';

const SCOPUS_BASE_URL = 'https://api.elsevier.com/content/search/scopus';
/** Elsevier URL + encoding budget; blocks oversized `query` abuse. */
const MAX_QUERY_LEN = 1800;

function parseIntClamp(value, def, min, max) {
  const n = parseInt(String(value), 10);
  if (Number.isNaN(n)) return def;
  return Math.min(max, Math.max(min, n));
}

export async function GET({ request }) {
  try {
    const cors = crossOriginBrowserBlockResponse(request);
    if (cors) return cors;

    const tooMany = rateLimitJsonResponse('scopus-search', request, 40, 3_600_000);
    if (tooMany) return tooMany;

    const { searchParams } = new URL(request.url);
    const query =
      searchParams.get('query') ||
      'AFFIL("Mindanao State University Tawi-Tawi College of Technology and Oceanography")';
    if (query.length > MAX_QUERY_LEN) {
      return new Response(JSON.stringify({ error: 'Query too long' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });
    }
    const start = parseIntClamp(searchParams.get('start'), 0, 0, 50000);
    const count = parseIntClamp(searchParams.get('count'), 25, 1, 25);

    const SCOPUS_API_KEY = import.meta.env.SCOPUS_API_KEY || process.env.SCOPUS_API_KEY || '';

    if (!SCOPUS_API_KEY) {
      console.error('[scopus-search] SCOPUS_API_KEY is not configured');
      return new Response(
        JSON.stringify({
          error: 'Scopus search is unavailable',
          code: 'MISSING_SCOPUS_KEY',
        }),
        {
          status: 503,
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        }
      );
    }

    /** Never put apiKey in the URL — it was previously leaked via error payloads. */
    const apiUrl = `${SCOPUS_BASE_URL}?query=${encodeURIComponent(query)}&start=${String(start)}&count=${String(count)}&httpAccept=application/json`;

    const upstream = await fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
        'X-ELS-APIKey': SCOPUS_API_KEY,
      },
    });

    if (!upstream.ok) {
      const raw = await upstream.text();
      console.error('[scopus-search] Upstream failed:', upstream.status, raw.slice(0, 200));

      let clientMessage = 'Scopus returned an error';
      try {
        const errJson = JSON.parse(raw);
        const svc = errJson['service-error']?.status;
        if (svc?.statusCode) {
          clientMessage = `${svc.statusCode}`;
        }
      } catch {
        // ignore
      }

      return new Response(
        JSON.stringify({
          error: clientMessage,
          statusCode: upstream.status,
        }),
        {
          status: upstream.status >= 400 && upstream.status < 600 ? upstream.status : 502,
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        }
      );
    }

    const data = await upstream.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, max-age=60' },
    });
  } catch (error) {
    console.error('[scopus-search]', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        code: 'SCOPUS_PROXY_ERROR',
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      }
    );
  }
}
