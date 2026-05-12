/**
 * In production, reject cross-origin browser requests when `Origin` is present.
 * (Anonymous cross-origin hits may still occur without an Origin header; combine with rate limits.)
 */
export function crossOriginBrowserBlockResponse(request) {
  if (!import.meta.env.PROD) return null;
  const origin = request.headers.get('origin');
  if (!origin || !origin.trim()) return null;
  let expected;
  try {
    expected = new URL(request.url).origin;
  } catch {
    return null;
  }
  let actual;
  try {
    actual = new URL(origin).origin;
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request.' }), {
      status: 403,
      headers: jsonNoStore(),
    });
  }
  if (actual !== expected) {
    return new Response(JSON.stringify({ error: 'Forbidden' }), {
      status: 403,
      headers: jsonNoStore(),
    });
  }
  return null;
}

function jsonNoStore() {
  return {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  };
}
