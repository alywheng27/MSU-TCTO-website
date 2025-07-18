import { getCommencementPhotos } from '../../api/api.jsx';

export async function POST({ request }) {
  try {
    const { testName } = await request.json();
    
    console.log('Testing name format:', testName);
    
    // Test different name formats
    const testFormats = [
      testName, // Original format
      testName.split(' ').reverse().join(' '), // Reverse order
      testName.split(' ').map(word => word.length === 1 ? word : word[0]).join(' '), // Convert to initials
      testName.split(' ').slice(0, -1).join(' ') + ' ' + testName.split(' ').slice(-1)[0][0], // Last name + first initial
      testName.split(' ').slice(-1)[0] + ' ' + testName.split(' ').slice(0, -1).map(word => word[0]).join(''), // Family name first
    ];
    
    const results = {};
    
    for (const format of testFormats) {
      const photos = await getCommencementPhotos(format, '');
      results[format] = {
        count: photos.length,
        photos: photos.slice(0, 3).map(p => ({
          id: p._id,
          name: p.graduate?.name || 'No name',
          hasImage: !!p.mainImage?.asset?.url
        }))
      };
    }
    
    return new Response(JSON.stringify({
      message: 'Name format test completed',
      originalName: testName,
      results: results,
      totalFormats: testFormats.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Name format test error:', error);
    
    return new Response(JSON.stringify({
      error: 'Name format test failed',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 