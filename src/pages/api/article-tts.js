/**
 * Neural TTS proxy (OpenAI) — keeps API key server-side.
 * Requires OPENAI_API_KEY in env. Falls back gracefully when absent (client uses browser voices).
 */

import { rateLimitJsonResponse } from '../../lib/spam-guard.js';

const MAX_JSON_BYTES = 48 * 1024;

export async function POST({ request }) {
  try {
    const len = Number(request.headers.get('content-length'));
    if (!Number.isNaN(len) && len > MAX_JSON_BYTES) {
      return new Response(JSON.stringify({ error: 'Payload too large' }), {
        status: 413,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });
    }

    const key =
      (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.OPENAI_API_KEY) ||
      (typeof process !== 'undefined' && process.env && process.env.OPENAI_API_KEY);

    if (!key) {
      return new Response(JSON.stringify({ error: 'TTS_UNAVAILABLE', fallback: true }), {
        status: 503,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });
    }

    const rlTts = rateLimitJsonResponse('article-tts', request, 48, 3_600_000);
    if (rlTts) return rlTts;

    let body;
    try {
      const raw = await request.text();
      if (raw.length > MAX_JSON_BYTES) {
        return new Response(JSON.stringify({ error: 'Payload too large' }), {
          status: 413,
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        });
      }
      body = JSON.parse(raw || '{}');
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
      });
    }

    let text = typeof body?.text === 'string' ? body.text.trim() : '';
    if (!text.length) {
      return new Response(JSON.stringify({ error: 'Missing text' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    /** OpenAI TTS character limit */
    const MAX = 4096;
    if (text.length > MAX) {
      text = text.slice(0, MAX);
    }

    /** Female-natural voices; shimmer & nova suit news-style narration */
    const requested = typeof body?.voice === 'string' ? body.voice.trim() : 'shimmer';
    const allowedVoices = ['shimmer', 'nova', 'alloy'];

    const res = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tts-1',
        voice: allowedVoices.includes(requested) ? requested : 'shimmer',
        input: text,
        speed: Math.min(1.15, Math.max(0.85, typeof body.speed === 'number' ? body.speed : 1)),
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('[article-tts] OpenAI error:', res.status, errText.slice(0, 200));
      return new Response(JSON.stringify({ error: 'TTS_upstream_error' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const buf = await res.arrayBuffer();
    return new Response(buf, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'private, max-age=0',
      },
    });
  } catch (e) {
    console.error('[article-tts]', e);
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
