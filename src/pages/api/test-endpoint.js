import { notFoundUnlessDev } from '../../lib/api-guards.js';

export async function GET({ request }) {
  const denied = notFoundUnlessDev();
  if (denied) return denied;
  return new Response(JSON.stringify({ 
    message: 'Test endpoint is working',
    timestamp: new Date().toISOString(),
    method: 'GET'
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

export async function POST({ request }) {
  const denied = notFoundUnlessDev();
  if (denied) return denied;
  try {
    const body = await request.json();
    return new Response(JSON.stringify({ 
      message: 'Test endpoint is working',
      receivedData: body,
      timestamp: new Date().toISOString(),
      method: 'POST'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'Invalid JSON',
      message: error.message
    }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
}

export async function OPTIONS({ request }) {
  const denied = notFoundUnlessDev();
  if (denied) return denied;
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
} 