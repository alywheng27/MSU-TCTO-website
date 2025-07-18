import { getCommencementPhotos } from '../../api/api.jsx';

export async function POST({ request }) {
  try {
    const { name, birthDate } = await request.json();
    
    console.log('Debug search called with:', { name, birthDate });
    
    // Get all photos without filters first
    const allPhotos = await getCommencementPhotos('', '');
    
    // Then try the actual search
    const searchResults = await getCommencementPhotos(name, birthDate);
    
    // Get some sample data for debugging
    const samplePhotos = allPhotos.slice(0, 5).map(photo => ({
      id: photo._id,
      name: photo.graduate?.name || 'No name',
      birthDate: photo.birthDate || 'No birth date',
      hasImage: !!photo.mainImage?.asset?.url
    }));
    
    return new Response(JSON.stringify({
      message: 'Debug search completed',
      searchParams: { name, birthDate },
      totalPhotos: allPhotos.length,
      searchResults: searchResults.length,
      sampleData: samplePhotos,
      allPhotos: allPhotos.map(photo => ({
        id: photo._id,
        name: photo.graduate?.name || 'No name',
        birthDate: photo.birthDate || 'No birth date',
        hasImage: !!photo.mainImage?.asset?.url
      }))
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Debug search error:', error);
    
    return new Response(JSON.stringify({
      error: 'Debug search failed',
      details: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 