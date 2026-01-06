/**
 * Protected Logo API Endpoint
 * Serves the MSU-TCTO logo with validation to prevent direct URL access
 * Only serves the image when requested from the website context
 * 
 * Usage: Replace /images/Official MSU-TCTO logo-01.png with /api/protected-logo
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cache the image buffer in memory for better performance
let cachedImageBuffer = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 3600000; // 1 hour

function getLogoBuffer() {
  const now = Date.now();
  
  // Return cached buffer if still valid
  if (cachedImageBuffer && (now - cacheTimestamp) < CACHE_DURATION) {
    return cachedImageBuffer;
  }
  
  try {
    // Path to the logo image (relative to this file)
    const logoPath = path.join(__dirname, '../../../public/images/Official MSU-TCTO logo-01.png');
    
    // Check if file exists
    if (!fs.existsSync(logoPath)) {
      return null;
    }
    
    // Read and cache the image file
    cachedImageBuffer = fs.readFileSync(logoPath);
    cacheTimestamp = now;
    return cachedImageBuffer;
  } catch (error) {
    console.error('Error reading logo file:', error);
    return null;
  }
}

export async function GET({ request }) {
  try {
    // Get request headers for validation
    const referer = request.headers.get('referer') || '';
    const userAgent = request.headers.get('user-agent') || '';
    const origin = request.headers.get('origin') || '';
    const url = new URL(request.url);
    
    // Allowed origins (your website domains)
    const allowedOrigins = [
      'https://msutcto.edu.ph',
      'http://localhost',
      'http://127.0.0.1',
      'https://msutcto.netlify.app',
      'https://msutcto.vercel.app'
    ];
    
    // Check if request is from allowed origin or referer
    const isAllowedOrigin = allowedOrigins.some(allowed => 
      origin.includes(allowed) || 
      referer.includes(allowed) ||
      referer.includes('localhost') ||
      referer.includes('127.0.0.1')
    );
    
    // Additional validation: Check if request has proper headers (browser request)
    const isBrowserRequest = userAgent && 
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
    
    // Block direct URL access (no referer and suspicious user agent)
    // Allow if: valid token, development mode, or valid origin with browser request
    if (!validToken && !isDevelopment && (!isAllowedOrigin || !isBrowserRequest)) {
      return new Response('Access Denied: Logo is protected. Please access through the website.', {
        status: 403,
        headers: {
          'Content-Type': 'text/plain',
          'X-Robots-Tag': 'noindex, nofollow'
        }
      });
    }
    
    // Get the image buffer
    const imageBuffer = getLogoBuffer();
    
    if (!imageBuffer) {
      return new Response('Logo not found', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain'
        }
      });
    }
    
    // Return the image with appropriate headers
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
        // Prevent image from being saved easily
        'Content-Disposition': 'inline; filename="protected-logo.png"',
        // Additional security headers
        'X-Robots-Tag': 'noindex, nofollow',
        // Prevent caching in browser
        'Last-Modified': new Date().toUTCString(),
        'ETag': '"protected-logo"'
      }
    });
    
  } catch (error) {
    console.error('Error serving protected logo:', error);
    return new Response('Internal Server Error', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }
}

