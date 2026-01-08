# Protected Logo Serverless Functions Setup

This document explains the serverless functions created for protecting the MSU-TCTO logo on both Netlify and Vercel platforms.

## Overview

Two dedicated serverless functions have been created to provide enhanced protection for the logo:

1. **Netlify Function**: `netlify/functions/protected-logo.js`
2. **Vercel Function**: `api/protected-logo.js`

These functions work independently of Astro's API routes and provide additional serverless-specific protection layers.

## Features

### 🔐 Authentication Protection
- Token-based authentication with time-based validation
- 5-minute token windows for security
- Secret token support for internal use

### 🚫 DevTools Detection
- Detects browser DevTools inspection attempts
- Blocks direct navigation from DevTools
- Returns blank image for suspicious requests

### 📉 Request Validation
- Validates referer headers
- Checks user agent strings
- Validates origin and hostname
- Blocks automated tools (curl, wget, Postman, etc.)

### 🛡️ Security Headers
- No-cache headers to prevent caching
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- X-Robots-Tag: noindex, nofollow

## Configuration

### Netlify

The function is automatically detected in `netlify/functions/protected-logo.js`.

**Configuration in `netlify.toml`:**
```toml
[[redirects]]
  from = "/api/protected-logo"
  to = "/.netlify/functions/protected-logo"
  status = 200
  force = false
```

This redirect ensures that requests to `/api/protected-logo` are handled by the Netlify serverless function.

### Vercel

The function is automatically detected in `api/protected-logo.js`.

**Configuration in `vercel.json`:**
```json
{
  "rewrites": [
    {
      "source": "/api/protected-logo",
      "destination": "/api/protected-logo.js"
    }
  ]
}
```

This rewrite ensures that requests to `/api/protected-logo` are handled by the Vercel serverless function.

## Environment Variables

Both functions support the following environment variable:

- `LOGO_SECRET_TOKEN`: Secret token for internal authentication (optional, defaults to 'msu-tcto-logo-secret-2024')

Set this in your platform's environment variables:
- **Netlify**: Site settings → Environment variables
- **Vercel**: Project settings → Environment Variables

## Usage

The functions are automatically used when you reference `/api/protected-logo` in your HTML:

```html
<img src="/api/protected-logo" alt="MSU-TCTO Logo" />
```

Or in JavaScript:
```javascript
const logoUrl = '/api/protected-logo';
```

## How It Works

1. **Request Received**: Function receives GET request to `/api/protected-logo`
2. **Validation**: Checks authentication token, referer, user agent, and other headers
3. **DevTools Detection**: Detects if request is from browser DevTools
4. **Authorization**: Validates if request is allowed
5. **Image Serving**: Fetches logo from static assets and serves with protection headers
6. **Fallback**: Returns blank 1x1 transparent PNG if validation fails

## Protection Layers

1. **Client-Side**: `logo-protection.js` prevents right-click, drag, and copy
2. **API Route**: `src/pages/api/protected-logo.js` (Astro API route)
3. **Serverless Function**: Platform-specific serverless function (this implementation)

All three layers work together to provide comprehensive protection.

## Testing

### Local Testing (Netlify)
```bash
netlify dev
```
Visit: `http://localhost:8888/api/protected-logo`

### Local Testing (Vercel)
```bash
vercel dev
```
Visit: `http://localhost:3000/api/protected-logo`

### Production Testing
After deployment, test:
- Direct access: `https://yourdomain.com/api/protected-logo`
- From page: Logo should display normally on pages
- DevTools: Should return blank image when accessed directly from DevTools

## Troubleshooting

### Logo Not Showing
1. Check that the static image exists at `/public/images/Official MSU-TCTO logo-01.png`
2. Verify environment variables are set correctly
3. Check function logs in Netlify/Vercel dashboard
4. Ensure redirects/rewrites are configured correctly

### Blank Image Returned
- This is expected behavior for unauthorized requests
- Check that requests include proper referer headers
- Verify authentication tokens if using token-based auth
- Check function logs for specific error messages

### Function Not Found
- **Netlify**: Ensure function is in `netlify/functions/` directory
- **Vercel**: Ensure function is in `api/` directory at project root
- Verify build configuration in respective config files

## Notes

- The functions fetch the logo from static assets, so the original image must exist in `/public/images/`
- Both functions use the same protection logic for consistency
- Functions work independently of Astro's build process
- No additional dependencies required (uses native Node.js and fetch API)

## Security Considerations

While these functions provide strong protection, note that:
- Determined users can still inspect network requests
- Screenshots cannot be fully prevented
- The logo is still visible in the browser (by design)
- Protection focuses on preventing easy downloading and direct access

For maximum security, combine with:
- Client-side protection scripts
- Watermarking (if needed)
- Additional authentication layers
- Rate limiting (can be added to functions)

