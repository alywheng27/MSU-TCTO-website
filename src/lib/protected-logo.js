/**
 * Official MSU-TCTO seal asset path (served statically from `public/images`).
 *
 * Usage:
 *   import { LOGO_IMAGE_PATH, getProtectedLogoUrl } from '../lib/protected-logo';
 *   const logoUrl = getProtectedLogoUrl();
 */

export const LOGO_IMAGE_PATH = '/images/Official MSU-TCTO logo-01.png';

/** Canonical URL used for `<img src>` references site-wide */
export function getProtectedLogoUrl() {
  return LOGO_IMAGE_PATH;
}

/**
 * Logo path with optional query string (e.g. cache-busting).
 * Params are appended to the static image URL, not `/api/protected-logo`.
 */
export function getProtectedLogoUrlWithParams(params = {}) {
  const keys = Object.keys(params);
  if (keys.length === 0) return LOGO_IMAGE_PATH;
  const search = keys
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(String(params[key]))}`)
    .join('&');
  return `${LOGO_IMAGE_PATH}?${search}`;
}
