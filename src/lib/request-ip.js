/**
 * Best-effort client IP from reverse-proxy headers (Netlify, Vercel, Cloudflare-style).
 */
export function getClientIp(request) {
  const h = request.headers;
  const cf = h.get('cf-connecting-ip');
  if (cf) return cf.trim();
  const nf = h.get('x-nf-client-connection-ip');
  if (nf) return nf.trim();
  const vf = h.get('x-vercel-forwarded-for');
  if (vf) {
    const first = vf.split(',')[0];
    if (first) return first.trim();
  }
  const xff = h.get('x-forwarded-for');
  if (xff) {
    const first = xff.split(',')[0];
    if (first) return first.trim();
  }
  const realIp = h.get('x-real-ip');
  if (realIp) return realIp.trim();
  return 'unknown';
}
