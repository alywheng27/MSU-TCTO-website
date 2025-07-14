import { groq } from 'astro-sanity';
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "w8lfrsa6",
  dataset: "production",
  apiVersion: '2021-03-25',
  useCdn: true
});

export async function GET() {
  try {
    console.log('Fetching all commencement photos...');
    
    const query = groq`*[_type == "commencement"] {
      _id,
      graduate->,
      mainImage{
        asset->{
          url
        }
      },
      birthDate
    }`;
    
    const photos = await client.fetch(query);
    console.log('All commencement photos:', photos);
    console.log('Number of photos found:', photos ? photos.length : 0);
    
    return new Response(JSON.stringify({ 
      success: true, 
      photos: photos,
      count: photos ? photos.length : 0,
      message: 'All commencement photos retrieved'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching commencement photos:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      message: 'Failed to fetch commencement photos'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 