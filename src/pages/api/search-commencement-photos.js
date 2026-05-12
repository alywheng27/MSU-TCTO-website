import { getCommencementPhotos } from '../../api/api.jsx';
import { jsonHoneypotNonEmpty, rateLimitJsonResponse } from '../../lib/spam-guard.js';

const MAX_BODY = 16_384;
const MAX_NAME = 200;
const MAX_BIRTH = 48;

export async function GET() {
  return new Response(JSON.stringify({ message: 'Use POST with JSON body: name, birthDate' }), {
    status: 405,
    headers: { 'Content-Type': 'application/json', Allow: 'POST, OPTIONS', 'Cache-Control': 'no-store' },
  });
}

export async function POST({ request }) {
  try {
    const limited = rateLimitJsonResponse('commencement-search', request, 60, 3_600_000);
    if (limited) return limited;

    const raw = await request.text();
    if (raw.length > MAX_BODY) {
      return new Response(JSON.stringify({ error: 'Payload too large' }), {
        status: 413,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });
    }

    let body;
    try {
      body = JSON.parse(raw || '{}');
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });
    }

    if (jsonHoneypotNonEmpty(body)) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });
    }

    const name =
      typeof body?.name === 'string' ? body.name.trim().slice(0, MAX_NAME) : '';
    const birthDate =
      typeof body?.birthDate === 'string' ? body.birthDate.trim().slice(0, MAX_BIRTH) : '';

    if (!name || !birthDate) {
      return new Response(JSON.stringify({ error: 'Name and birth date are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });
    }

    const photos = await getCommencementPhotos(name, birthDate);

    return new Response(JSON.stringify(Array.isArray(photos) ? photos : []), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'private, max-age=0' },
    });
  } catch (error) {
    console.error('Error in search-commencement-photos API:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
