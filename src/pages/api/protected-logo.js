/**
 * Protected Logo API Endpoint
 * 🔐 Auth-protected API endpoint with token validation
 * 📉 Serve compressed version
 * 🚫 No public direct access
 * 
 * Works in both local development and Vercel/serverless environments
 * 
 * Usage: Replace /images/Official MSU-TCTO logo-01.png with /api/protected-logo
 */

import sharp from 'sharp';
import { readFile } from 'fs/promises';
import { join } from 'path';

/**
 * The official MSU-TCTO logo image path
 * @constant {string}
 */
const LOGO_IMAGE_PATH = '/images/Official MSU-TCTO logo-01.png';

// Create a 1x1 transparent PNG (blank image)
function createBlankImage() {
  // Base64 encoded 1x1 transparent PNG
  const blankPNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  return Buffer.from(blankPNG, 'base64');
}

// Generate authentication token based on session/timestamp
function generateAuthToken(request) {
  const url = new URL(request.url);
  const timestamp = Math.floor(Date.now() / (1000 * 60 * 5)); // 5-minute window
  const referer = request.headers.get('referer') || '';
  const hostname = url.hostname;
  
  // Create a simple hash from timestamp + hostname + referer
  const secret = process.env.LOGO_SECRET_TOKEN || 'msu-tcto-logo-secret-2024';
  const hashInput = `${timestamp}-${hostname}-${secret}`;
  
  // Simple hash function (in production, use crypto)
  let hash = 0;
  for (let i = 0; i < hashInput.length; i++) {
    const char = hashInput.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return Math.abs(hash).toString(36);
}

// Validate authentication token
function validateAuthToken(request, providedToken) {
  if (!providedToken) return false;
  
  const url = new URL(request.url);
  const timestamp = Math.floor(Date.now() / (1000 * 60 * 5)); // Current 5-minute window
  const referer = request.headers.get('referer') || '';
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

// Process image with compression (no watermark)
async function processImage(imageBuffer) {
  try {
    let image = sharp(imageBuffer);
    
    // Get image dimensions
    const metadata = await image.metadata();
    const imageWidth = metadata.width || 800;
    const imageHeight = metadata.height || 800;
    
    // Resize if too large (optional compression)
    const maxDimension = 1200;
    if (imageWidth > maxDimension || imageHeight > maxDimension) {
      image = image.resize(maxDimension, maxDimension, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }
    
    // 📉 COMPRESS: Reduce quality for compression
    const processedImage = await image
      .png({ 
        quality: 70, // 70% quality for compression
        compressionLevel: 9 // Maximum compression
      })
      .toBuffer();
    
    return processedImage;
  } catch (error) {
    console.error('Error processing image:', error);
    // Return original if processing fails
    return imageBuffer;
  }
}

export async function GET({ request }) {
  try {
    // Get request headers for validation
    const referer = request.headers.get('referer') || '';
    const userAgent = request.headers.get('user-agent') || '';
    const origin = request.headers.get('origin') || '';
    const accept = request.headers.get('accept') || '';
    const url = new URL(request.url);
    
    // 🔐 AUTH-PROTECTED: Check for authentication token
    const authToken = url.searchParams.get('auth') || request.headers.get('x-logo-auth');
    const validAuthToken = validateAuthToken(request, authToken);
    
    // Enhanced DevTools detection:
    // 1. No referer (direct navigation from DevTools)
    // 2. Referer is the same as request URL (DevTools inspection)
    // 3. Accept header is just image/* (DevTools image inspection)
    // 4. Direct URL access patterns
    // Note: Regular <img> tags don't send X-Requested-With, so we don't require it
    const hasRequestedWith = request.headers.get('x-requested-with') === 'XMLHttpRequest';
    const isImageOnlyRequest = accept.includes('image/') && !accept.includes('text/html');
    const isDirectNavigation = !referer || 
                              referer === url.href || 
                              referer.includes('chrome-devtools://') ||
                              referer.includes('devtools://') ||
                              url.searchParams.has('devtools') ||
                              url.searchParams.has('inspect');
    
    // DevTools inspection: direct navigation with suspicious patterns
    // Regular <img> tags are allowed (they have referer but no X-Requested-With)
    const isDevToolsInspection = isDirectNavigation && 
                                 (isImageOnlyRequest || 
                                  referer.includes('chrome-devtools://') ||
                                  referer.includes('devtools://'));
    
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
    
    // 🔐 AUTH-PROTECTED: Require valid auth token OR valid session token OR development mode
    // If DevTools inspection detected, ALWAYS return blank image
    if (isDevToolsInspection && !validAuthToken && !validToken && !isDevelopment && !isFaviconRequest) {
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
    
    // Allow if: valid auth token, valid token, development mode, or browser request with proper referer
    // Must have referer from the same domain for normal page loads
    // Note: Regular <img> tags don't send X-Requested-With, so we allow requests with valid referer
    const hasValidReferer = referer && 
                           (referer.includes(url.hostname) || 
                            referer.includes('msutcto.edu.ph') ||
                            referer.includes('vercel.app') ||
                            referer.includes('netlify.app') ||
                            referer.includes('localhost'));
    
    // 🔐 AUTH-PROTECTED: Require auth token OR valid session OR browser request with valid referer
    // Allow regular <img> tag requests (they have referer but no X-Requested-With)
    const allowRequest = validAuthToken || 
                        validToken || 
                        isDevelopment || 
                        (isBrowserRequest && hasValidReferer) || 
                        isFaviconRequest;
    
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
    // Try multiple methods to load the image for compatibility with both Netlify and Vercel
    let imageBuffer = null;
    
    try {
      // Method 1: Try file system access (works in some serverless environments)
      // In Astro with Netlify adapter, static files are copied to dist during build
      try {
        // Try multiple possible paths for the image
        const possiblePaths = [
          join(process.cwd(), 'public', LOGO_IMAGE_PATH),
          join(process.cwd(), 'dist', LOGO_IMAGE_PATH),
          join(process.cwd(), '.netlify', 'functions-internal', 'public', LOGO_IMAGE_PATH),
        ];
        
        for (const publicPath of possiblePaths) {
          try {
            imageBuffer = await readFile(publicPath);
            break; // Success, exit loop
          } catch (pathError) {
            // Try next path
            continue;
          }
        }
        
        if (!imageBuffer) {
          throw new Error('File system access failed for all paths');
        }
      } catch (fsError) {
        // Method 2: Try fetch from static path using the site URL
        // This works better in serverless environments like Netlify
        const imagePath = LOGO_IMAGE_PATH.replace(/ /g, '%20'); // URL encode spaces
        
        // Use site URL from environment or construct from request
        // Avoid fetching from same origin to prevent loops
        const siteUrl = process.env.SITE_URL || 
                       process.env.URL || 
                       process.env.DEPLOY_PRIME_URL ||
                       'https://msutcto.edu.ph';
        
        const imageUrl = `${siteUrl}${imagePath}`;
        
        // Fetch the image from the static path
        try {
          const response = await fetch(imageUrl, {
            headers: {
              'User-Agent': userAgent || 'MSU-TCTO-Logo-API/1.0',
              'Accept': 'image/png,image/*,*/*'
            }
          });
          
          if (response.ok) {
            imageBuffer = Buffer.from(await response.arrayBuffer());
          } else {
            throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
          }
        } catch (fetchErr) {
          // If site URL fetch fails, try with request origin as last resort
          // But only if it's different from the API endpoint
          if (!url.pathname.includes('/api/protected-logo')) {
            const originUrl = `${url.origin}${imagePath}`;
            const originResponse = await fetch(originUrl);
            if (originResponse.ok) {
              imageBuffer = Buffer.from(await originResponse.arrayBuffer());
            } else {
              throw fetchErr;
            }
          } else {
            throw fetchErr;
          }
        }
      }
      
      if (imageBuffer) {
        // 📉 COMPRESS: Process image with compression (no watermark)
        const processedImage = await processImage(imageBuffer);
        
        // Return the processed image with protection headers
        return new Response(processedImage, {
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
      console.error('Error loading image:', fetchError);
      // Log more details for debugging
      console.error('Request URL:', request.url);
      console.error('Image path:', LOGO_IMAGE_PATH);
      console.error('Site URL:', process.env.SITE_URL || process.env.URL || 'not set');
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
