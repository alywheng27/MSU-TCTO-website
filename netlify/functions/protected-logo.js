/**
 * Netlify Serverless Function - Protected Logo API
 * 🔐 Enhanced protection for MSU-TCTO logo
 * 📉 Serves protected logo with authentication and DevTools detection
 * 🚫 Prevents direct access and unauthorized downloads
 * 
 * This function works independently of Astro's API routes
 * and provides additional serverless-specific protection
 */

// Create a 1x1 transparent PNG (blank image)
function createBlankImage() {
  const blankPNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  return Buffer.from(blankPNG, 'base64');
}

// Generate authentication token based on session/timestamp
function generateAuthToken(request) {
  const url = new URL(request.rawUrl || request.url);
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
  
  const url = new URL(request.rawUrl || request.url);
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

// Main handler for Netlify Functions
exports.handler = async (event, context) => {
  try {
    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
      return {
        statusCode: 405,
        headers: {
          'Content-Type': 'application/json',
          'Allow': 'GET'
        },
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    const request = {
      url: event.rawUrl || `https://${event.headers.host}${event.path}`,
      rawUrl: event.rawUrl,
      headers: event.headers,
      queryStringParameters: event.queryStringParameters || {}
    };

    const url = new URL(request.url);
    const referer = request.headers.referer || request.headers.Referer || '';
    const userAgent = request.headers['user-agent'] || request.headers['User-Agent'] || '';
    const origin = request.headers.origin || request.headers.Origin || '';
    const accept = request.headers.accept || request.headers.Accept || '';

    // 🔐 AUTH-PROTECTED: Check for authentication token
    const authToken = url.searchParams.get('auth') || request.headers['x-logo-auth'] || request.headers['X-Logo-Auth'];
    const validAuthToken = validateAuthToken(request, authToken);

    // Enhanced DevTools detection
    const isImageOnlyRequest = accept.includes('image/') && !accept.includes('text/html');
    const isDirectNavigation = !referer || 
                              referer === url.href || 
                              referer.includes('chrome-devtools://') ||
                              referer.includes('devtools://') ||
                              url.searchParams.has('devtools') ||
                              url.searchParams.has('inspect');

    const isDevToolsInspection = isDirectNavigation && 
                                 (isImageOnlyRequest || 
                                  referer.includes('chrome-devtools://') ||
                                  referer.includes('devtools://'));

    const isFaviconRequest = url.pathname.includes('favicon') || userAgent.includes('favicon');

    // Check for secret token
    const secretToken = url.searchParams.get('token');
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
                        (request.headers.host && (
                          request.headers.host.includes('localhost') ||
                          request.headers.host.includes('127.0.0.1')
                        ));
    
    const isDevelopment = process.env.NODE_ENV !== 'production' || isLocalhost;

    // 🔐 AUTH-PROTECTED: Require valid auth token OR valid session token OR development mode
    if (isDevToolsInspection && !validAuthToken && !validToken && !isDevelopment && !isFaviconRequest) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Robots-Tag': 'noindex, nofollow'
        },
        body: createBlankImage().toString('base64'),
        isBase64Encoded: true
      };
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
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Robots-Tag': 'noindex, nofollow'
        },
        body: createBlankImage().toString('base64'),
        isBase64Encoded: true
      };
    }

    // Get the logo image from static assets
    // In Netlify, static files are served from the publish directory
    // Prefer localhost during local dev to avoid external fetch failures
    const siteUrl = (() => {
      // Local dev (netlify dev / npm run dev / astro dev)
      if (isLocalhost && request.headers.host) {
        const protocol = request.headers['x-forwarded-proto'] || 
                        (request.headers['x-forwarded-ssl'] === 'on' ? 'https' : 'http');
        const host = request.headers.host;
        return `${protocol}://${host}`;
      }
      // Also check origin for localhost
      if (isLocalhost && origin) {
        return origin;
      }
      // Deploy previews / production
      return process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://msutcto.edu.ph';
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
        const base64Image = Buffer.from(imageBuffer).toString('base64');

        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'image/png',
            'Cache-Control': 'private, no-cache, no-store, must-revalidate, max-age=0',
            'Pragma': 'no-cache',
            'Expires': '0',
            'X-Content-Type-Options': 'nosniff',
            'X-Frame-Options': 'DENY',
            'Referrer-Policy': 'strict-origin-when-cross-origin',
            'Content-Disposition': 'inline; filename="protected-logo.png"',
            'X-Robots-Tag': 'noindex, nofollow'
          },
          body: base64Image,
          isBase64Encoded: true
        };
      } else {
        throw new Error(`Failed to fetch image: ${response.status}`);
      }
    } catch (fetchError) {
      console.error('Error loading image:', fetchError);
      
      // Fallback: return blank image
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        body: createBlankImage().toString('base64'),
        isBase64Encoded: true
      };
    }

  } catch (error) {
    console.error('Error serving protected logo:', error);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      body: createBlankImage().toString('base64'),
      isBase64Encoded: true
    };
  }
};

