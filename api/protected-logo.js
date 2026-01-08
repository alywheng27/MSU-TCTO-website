/**
 * Vercel Serverless Function - Protected Logo API
 * 🔐 Enhanced protection for MSU-TCTO logo
 * 📉 Serves protected logo with authentication and DevTools detection
 * 🚫 Prevents direct access and unauthorized downloads
 * 
 * This function works independently of Astro's API routes
 * and provides additional serverless-specific protection for Vercel
 */

// Create a 1x1 transparent PNG (blank image)
function createBlankImage() {
  const blankPNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  return Buffer.from(blankPNG, 'base64');
}

// Generate authentication token based on session/timestamp
function generateAuthToken(request) {
  const url = new URL(request.url);
  const timestamp = Math.floor(Date.now() / (1000 * 60 * 5)); // 5-minute window
  const referer = request.headers.referer || request.headers.Referer || '';
  const hostname = url.hostname;
  
  const secret = process.env.LOGO_SECRET_TOKEN || 'msu-tcto-logo-secret-2024';
  const hashInput = `${timestamp}-${hostname}-${secret}`;
  
  let hash = 0;
  for (let i = 0; i < hashInput.length; i++) {
    const char = hashInput.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  return Math.abs(hash).toString(36);
}

// Validate authentication token
function validateAuthToken(request, providedToken) {
  if (!providedToken) return false;
  
  const url = new URL(request.url);
  const timestamp = Math.floor(Date.now() / (1000 * 60 * 5));
  const referer = request.headers.referer || request.headers.Referer || '';
  const hostname = url.hostname;
  const secret = process.env.LOGO_SECRET_TOKEN || 'msu-tcto-logo-secret-2024';
  
  // Check current window
  const hashInput = `${timestamp}-${hostname}-${secret}`;
  let hash = 0;
  for (let i = 0; i < hashInput.length; i++) {
    const char = hashInput.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const currentToken = Math.abs(hash).toString(36);
  
  if (providedToken === currentToken) return true;
  
  // Check previous window (for clock skew)
  const prevHashInput = `${timestamp - 1}-${hostname}-${secret}`;
  hash = 0;
  for (let i = 0; i < prevHashInput.length; i++) {
    const char = prevHashInput.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  const prevToken = Math.abs(hash).toString(36);
  
  return providedToken === prevToken;
}

// Main handler for Vercel Serverless Functions
export default async function handler(req, res) {
  try {
    // Only allow GET requests
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const request = {
      url: req.url,
      headers: req.headers,
      query: req.query
    };

    // Construct URL properly for localhost
    const protocol = req.headers['x-forwarded-proto'] || 
                    (req.headers.host && req.headers.host.includes('localhost') ? 'http' : 'https');
    const host = req.headers.host || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;
    const url = new URL(req.url, baseUrl);
    
    const referer = req.headers.referer || req.headers.Referer || '';
    const userAgent = req.headers['user-agent'] || req.headers['User-Agent'] || '';
    const origin = req.headers.origin || req.headers.Origin || '';
    const accept = req.headers.accept || req.headers.Accept || '';

    // 🔐 AUTH-PROTECTED: Check for authentication token
    const authToken = req.query.auth || req.headers['x-logo-auth'] || req.headers['X-Logo-Auth'];
    const validAuthToken = validateAuthToken(request, authToken);

    // Enhanced DevTools detection
    const isImageOnlyRequest = accept.includes('image/') && !accept.includes('text/html');
    const isDirectNavigation = !referer || 
                              referer === url.href || 
                              referer.includes('chrome-devtools://') ||
                              referer.includes('devtools://') ||
                              req.query.devtools ||
                              req.query.inspect;

    const isDevToolsInspection = isDirectNavigation && 
                                 (isImageOnlyRequest || 
                                  referer.includes('chrome-devtools://') ||
                                  referer.includes('devtools://'));

    const isFaviconRequest = url.pathname.includes('favicon') || userAgent.includes('favicon');

    // Check for secret token
    const secretToken = req.query.token;
    const validToken = secretToken === process.env.LOGO_SECRET_TOKEN || secretToken === 'dev-token-2024';

    // Development mode check - Enhanced localhost detection
    const isLocalhost = url.hostname === 'localhost' || 
                        url.hostname === '127.0.0.1' ||
                        url.hostname === '0.0.0.0' ||
                        url.hostname.includes('localhost') ||
                        url.hostname.includes('127.0.0.1') ||
                        origin.includes('localhost') || 
                        origin.includes('127.0.0.1') ||
                        referer.includes('localhost') ||
                        referer.includes('127.0.0.1') ||
                        (host && (
                          host.includes('localhost') ||
                          host.includes('127.0.0.1')
                        ));
    
    const isDevelopment = process.env.NODE_ENV !== 'production' || isLocalhost;

    // 🔐 AUTH-PROTECTED: Require valid auth token OR valid session token OR development mode
    if (isDevToolsInspection && !validAuthToken && !validToken && !isDevelopment && !isFaviconRequest) {
      return res.status(200)
        .setHeader('Content-Type', 'image/png')
        .setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
        .setHeader('Pragma', 'no-cache')
        .setHeader('Expires', '0')
        .setHeader('X-Robots-Tag', 'noindex, nofollow')
        .send(createBlankImage());
    }

    // Additional validation
    const isBrowserRequest = !!userAgent && 
      !userAgent.includes('curl') && 
      !userAgent.includes('wget') && 
      !userAgent.includes('python') &&
      !userAgent.includes('Postman') &&
      !userAgent.includes('Insomnia');

    const hasValidReferer = referer && 
                           (referer.includes(url.hostname) || 
                            referer.includes('msutcto.edu.ph') ||
                            referer.includes('netlify.app') ||
                            referer.includes('vercel.app') ||
                            referer.includes('localhost') ||
                            referer.includes('127.0.0.1'));
    
    // For localhost, always allow even without referer (common in dev)
    const isLocalhostRequest = isLocalhost;

    const allowRequest = validAuthToken || 
                        validToken || 
                        isDevelopment || 
                        isLocalhostRequest || // Always allow localhost
                        (isBrowserRequest && hasValidReferer) || 
                        isFaviconRequest;

    if (!allowRequest) {
      return res.status(200)
        .setHeader('Content-Type', 'image/png')
        .setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
        .setHeader('Pragma', 'no-cache')
        .setHeader('Expires', '0')
        .setHeader('X-Robots-Tag', 'noindex, nofollow')
        .send(createBlankImage());
    }

    // Get the logo image from static assets
    // In Vercel, static files are served from the public directory
    // Prefer localhost during local dev to avoid external fetch failures
    const siteUrl = (() => {
      // Local dev (vercel dev / npm run dev / astro dev)
      if (isLocalhost) {
        // Use the request origin or construct from headers
        if (origin) {
          return origin;
        }
        // Fallback to constructing from host
        const localProtocol = protocol || 'http';
        return `${localProtocol}://${host}`;
      }
      // Vercel deployment
      if (process.env.VERCEL_URL) {
        return `https://${process.env.VERCEL_URL}`;
      }
      // Production fallback
      return process.env.NEXT_PUBLIC_SITE_URL || 'https://msutcto.edu.ph';
    })();
    
    const imagePath = '/images/Official MSU-TCTO logo-01.png';
    const imageUrl = `${siteUrl}${imagePath}`;

    try {
      // Fetch the image from the static path
      const response = await fetch(imageUrl, {
        headers: {
          'User-Agent': userAgent || 'MSU-TCTO-Logo-API/1.0',
          'Accept': 'image/png,image/*,*/*'
        }
      });

      if (response.ok) {
        const imageBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(imageBuffer);

        return res.status(200)
          .setHeader('Content-Type', 'image/png')
          .setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate, max-age=0')
          .setHeader('Pragma', 'no-cache')
          .setHeader('Expires', '0')
          .setHeader('X-Content-Type-Options', 'nosniff')
          .setHeader('X-Frame-Options', 'DENY')
          .setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
          .setHeader('Content-Disposition', 'inline; filename="protected-logo.png"')
          .setHeader('X-Robots-Tag', 'noindex, nofollow')
          .send(buffer);
      } else {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }
    } catch (fetchError) {
      console.error('Error loading image:', fetchError);
      
      // Fallback: return blank image
      return res.status(200)
        .setHeader('Content-Type', 'image/png')
        .setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
        .setHeader('Pragma', 'no-cache')
        .setHeader('Expires', '0')
        .send(createBlankImage());
    }

  } catch (error) {
    console.error('Error serving protected logo:', error);
    
    return res.status(200)
      .setHeader('Content-Type', 'image/png')
      .setHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
      .setHeader('Pragma', 'no-cache')
      .setHeader('Expires', '0')
      .send(createBlankImage());
  }
}

