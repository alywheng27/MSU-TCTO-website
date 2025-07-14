import { getCommencementPhotos, testSanityConnection } from '../../api/api.jsx';

export async function POST({ request }) {
  try {
    const { name, birthDate } = await request.json();
    
    console.log('API received request:', { name, birthDate });
    
    if (!name || !birthDate) {
      console.log('Missing required fields');
      return new Response(JSON.stringify({ error: 'Name and birth date are required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Test Sanity connection first
    console.log('Testing Sanity connection...');
    const testResult = await testSanityConnection();
    console.log('Sanity connection test result:', testResult);

    // Call the Sanity API function
    console.log('Calling getCommencementPhotos...');
    const photos = await getCommencementPhotos(name, birthDate);
    console.log('Photos returned:', photos);
    
    return new Response(JSON.stringify(photos), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in search-commencement-photos API:', error);
    
    return new Response(JSON.stringify({ error: 'Internal server error', details: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 