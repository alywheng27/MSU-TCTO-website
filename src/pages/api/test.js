import { notFoundUnlessDev } from '../../lib/api-guards.js';

export async function GET() {
  const denied = notFoundUnlessDev();
  if (denied) return denied;
  return new Response(JSON.stringify({ message: 'API is working!' }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
} 