/**
 * Protected Logo API Endpoint
 * Serves the MSU-TCTO logo with validation to prevent direct URL access
 * Returns blank/placeholder when accessed via DevTools or direct URL
 * Works in both local development and Vercel/serverless environments
 * 
 * Usage: Replace /images/Official MSU-TCTO logo-01.png with /api/protected-logo
 */

// Create a 1x1 transparent PNG (blank image)
function createBlankImage() {
  // Base64 encoded 1x1 transparent PNG
  const blankPNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  return Buffer.from(blankPNG, 'base64');
}

export async function GET({ request }) {
  try {
    // Get request headers for validation
    const referer = request.headers.get('referer') || '';
    const userAgent = request.headers.get('user-agent') || '';
    const origin = request.headers.get('origin') || '';
    const url = new URL(request.url);
    
    // Detect DevTools or direct URL access
    // DevTools often has no referer, or referer is the same as the request URL
    const isDirectAccess = !referer || 
                          referer === url.href || 
                          referer.includes('chrome-devtools://') ||
                          referer.includes('devtools://') ||
                          url.searchParams.has('devtools') ||
                          url.searchParams.has('inspect');
    
    // Check if this is a favicon request
    const isFaviconRequest = url.pathname.includes('favicon') || 
                             userAgent.includes('favicon');
    
    // Check for secret token in query parameter (for internal use)
    const secretToken = url.searchParams.get('token');
    const validToken = secretToken === process.env.LOGO_SECRET_TOKEN || secretToken === 'dev-token-2024';
    
    // For development, allow all requests
    const isDevelopment = process.env.NODE_ENV !== 'production' || 
      origin.includes('localhost') || 
      referer.includes('localhost') ||
      url.hostname.includes('localhost');
    
    // If direct access (DevTools or direct URL), return blank image
    if (isDirectAccess && !validToken && !isDevelopment && !isFaviconRequest) {
      return new Response(createBlankImage(), {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Robots-Tag': 'noindex, nofollow'
        }
      });
    }
    
    // Additional validation: Check if request has proper headers (browser request)
    const isBrowserRequest = !!userAgent && 
      !userAgent.includes('curl') && 
      !userAgent.includes('wget') && 
      !userAgent.includes('python') &&
      !userAgent.includes('Postman') &&
      !userAgent.includes('Insomnia');
    
    // Allow if: valid token, development mode, or browser request with proper referer
    // Must have referer from the same domain for normal page loads
    const hasValidReferer = referer && 
                           (referer.includes(url.hostname) || 
                            referer.includes('msutcto.edu.ph') ||
                            referer.includes('vercel.app') ||
                            referer.includes('netlify.app'));
    
    const allowRequest = validToken || isDevelopment || (isBrowserRequest && hasValidReferer) || isFaviconRequest;
    
    if (!allowRequest) {
      // Return blank image instead of error message
      return new Response(createBlankImage(), {
        status: 200,
        headers: {
          'Content-Type': 'image/png',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Robots-Tag': 'noindex, nofollow'
        }
      });
    }
    
    // Get the actual image from static path
    const imagePath = '/images/Official%20MSU-TCTO%20logo-01.png';
    const imageUrl = new URL(imagePath, request.url);
    
    // Fetch the image from the static path
    try {
      const response = await fetch(imageUrl.href);
      
      if (response.ok) {
        const imageBuffer = await response.arrayBuffer();
        
        // Return the image with protection headers
        return new Response(imageBuffer, {
          status: 200,
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
          }
        });
      }
    } catch (fetchError) {
      console.error('Error fetching image:', fetchError);
    }
    
    // Fallback: return blank image if fetch fails
    return new Response(createBlankImage(), {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
  } catch (error) {
    console.error('Error serving protected logo:', error);
    // Return blank image on error
    return new Response(createBlankImage(), {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  }
}
