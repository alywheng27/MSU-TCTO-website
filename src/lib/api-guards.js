/**
 * Block debug/test-only API routes from being reachable in production builds.
 */
export function notFoundUnlessDev() {
  if (import.meta.env.PROD) {
    return new Response(JSON.stringify({ error: 'Not Found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store',
      },
    });
  }
  return null;
}
