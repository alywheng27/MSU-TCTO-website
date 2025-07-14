import { getCommencementPhotos } from '../../api/api.jsx';

export async function GET() {
  try {
    console.log('Debug API called');
    
    // Test getting all photos without filters
    const allPhotos = await getCommencementPhotos('', '');
    
    console.log('Debug - All photos:', allPhotos);
    
    return new Response(JSON.stringify({
      message: 'Debug API working',
      allPhotos: allPhotos,
      count: allPhotos.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Debug API error:', error);
    
    return new Response(JSON.stringify({
      error: 'Debug API failed',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 