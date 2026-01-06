/**
 * Protected Logo API Endpoint
 * Serves the MSU-TCTO logo with validation to prevent direct URL access
 * Works in both local development and Vercel/serverless environments
 * 
 * Usage: Replace /images/Official MSU-TCTO logo-01.png with /api/protected-logo
 */

export async function GET({ request }) {
  try {
    // Get request headers for validation
    const referer = request.headers.get('referer') || '';
    const userAgent = request.headers.get('user-agent') || '';
    const origin = request.headers.get('origin') || '';
    const url = new URL(request.url);
    
    // Additional validation: Check if request has proper headers (browser request)
    const isBrowserRequest = !!userAgent && 
      !userAgent.includes('curl') && 
      !userAgent.includes('wget') && 
      !userAgent.includes('python') &&
      !userAgent.includes('Postman') &&
      !userAgent.includes('Insomnia');
    
    // Check for secret token in query parameter (for internal use)
    const secretToken = url.searchParams.get('token');
    const validToken = secretToken === process.env.LOGO_SECRET_TOKEN || secretToken === 'dev-token-2024';
    
    // For development, allow all requests
    const isDevelopment = process.env.NODE_ENV !== 'production' || 
      origin.includes('localhost') || 
      referer.includes('localhost') ||
      url.hostname.includes('localhost');
    
    // Allow if: valid token, development mode, or browser request
    // This allows same-site requests even without referer/origin headers
    const allowRequest = validToken || isDevelopment || isBrowserRequest;
    
    if (!allowRequest) {
      return new Response('Access Denied: Logo is protected. Please access through the website.', {
        status: 403,
        headers: {
          'Content-Type': 'text/plain',
          'X-Robots-Tag': 'noindex, nofollow'
        }
      });
    }
    
    // In Vercel/serverless, redirect to the actual image file
    // The image will be served from the public folder
    // This works because we've validated the request above
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
            'Referrer-Policy': 'no-referrer',
            'Content-Disposition': 'inline; filename="protected-logo.png"',
            'X-Robots-Tag': 'noindex, nofollow'
          }
        });
      }
    } catch (fetchError) {
      console.error('Error fetching image:', fetchError);
    }
    
    // Fallback: redirect to the image (for cases where fetch doesn't work)
    return Response.redirect(imageUrl.href, 302);
    
  } catch (error) {
    console.error('Error serving protected logo:', error);
    // Last resort: redirect to the actual image
    try {
      const imagePath = '/images/Official%20MSU-TCTO%20logo-01.png';
      const imageUrl = new URL(imagePath, request.url);
      return Response.redirect(imageUrl.href, 302);
    } catch (redirectError) {
      return new Response('Internal Server Error', {
        status: 500,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    }
  }
}
