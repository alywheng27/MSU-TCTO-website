import { groq } from 'astro-sanity';
import { createClient } from "@sanity/client";
import { rateLimitJsonResponse } from '../../lib/spam-guard.js';
import { notFoundUnlessDev } from '../../lib/api-guards.js';

const client = createClient({
  projectId: "w8lfrsa6",
  dataset: "production",
  apiVersion: '2021-03-25',
  useCdn: true
});

export async function GET({ request }) {
  try {
    const devOnly = notFoundUnlessDev();
    if (devOnly) return devOnly;

    const denied = rateLimitJsonResponse('commencement-export', request, 12, 3_600_000);
    if (denied) return denied;
    
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
      error: 'Failed to fetch commencement photos'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 