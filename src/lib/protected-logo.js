/**
 * Protected Logo Utility
 * Provides the protected logo URL to prevent direct access
 * 
 * Usage:
 *   import { getProtectedLogoUrl } from '../lib/protected-logo';
 *   const logoUrl = getProtectedLogoUrl();
 */

/**
 * Get the protected logo URL
 * This endpoint validates requests and prevents direct URL access
 * 
 * @returns {string} The protected logo API endpoint URL
 */
export function getProtectedLogoUrl() {
  // Use the protected API endpoint instead of direct image path
  return '/api/protected-logo';
}

/**
 * Get the protected logo URL with optional query parameters
 * 
 * @param {Object} params - Optional query parameters
 * @returns {string} The protected logo API endpoint URL with query params
 */
export function getProtectedLogoUrlWithParams(params = {}) {
  const url = new URL('/api/protected-logo', window.location.origin);
  Object.keys(params).forEach(key => {
    url.searchParams.append(key, params[key]);
  });
  return url.pathname + url.search;
}

