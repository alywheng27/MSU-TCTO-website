import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "w8lfrsa6",
  dataset: "production",
  apiVersion: '2021-03-25',
  useCdn: true
});

export async function GET() {
  try {
    const query = `*[_type == "banner"] | order(title desc) {
      title,
      link,
      mainImage {
        asset->
      }
    }`;
    
    const data = await client.fetch(query);
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Error fetching banner data:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch banner data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}

