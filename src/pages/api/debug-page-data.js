import { getCOEDPrograms } from '../../api/api.jsx';

export async function GET() {
  try {
    console.log('=== DEBUG: Checking page data ===');
    
    // Get the programs data
    const programs = await getCOEDPrograms();
    console.log('Programs data for page:', programs);
    
    // Test JSON serialization
    const jsonData = JSON.stringify(programs);
    console.log('JSON serialized data:', jsonData);
    console.log('JSON data length:', jsonData.length);

    return new Response(JSON.stringify({ 
      success: true,
      debug: {
        programs: programs,
        jsonData: jsonData,
        jsonLength: jsonData.length,
        summary: {
          totalPrograms: programs?.length || 0,
          firstProgram: programs?.[0] || null
        }
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });

  } catch (error) {
    console.error('Error in debug page data:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      message: 'Failed to debug page data'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}



