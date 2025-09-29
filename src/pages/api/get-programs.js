import { getCOEDPrograms } from '../../api/api.jsx';

export async function GET() {
  try {
    // Use the getCOEDPrograms function from api.jsx
    const programs = await getCOEDPrograms();

    return new Response(JSON.stringify({ 
      success: true, 
      programs: programs,
      count: programs.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });

  } catch (error) {
    console.error('Error fetching COED programs from Sanity:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      message: 'Failed to fetch COED programs data'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
