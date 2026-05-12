import { notFoundUnlessDev } from '../../lib/api-guards.js';

export async function GET() {
  const denied = notFoundUnlessDev();
  if (denied) return denied;
  try {
    const SCOPUS_API_KEY = import.meta.env.SCOPUS_API_KEY || process.env.SCOPUS_API_KEY || '';
    const SCOPUS_BASE_URL = 'https://api.elsevier.com/content/search/scopus';

    const testQuery = 'AFFIL("Mindanao State University")';
    const url = `${SCOPUS_BASE_URL}?query=${encodeURIComponent(testQuery)}&start=0&count=1&httpAccept=application/json`;

    if (import.meta.env.DEV) {
      console.log('[test-scopus] GET (API key omitted from logs)');
    }

    const response = await fetch(url, {
      headers: {
        Accept: 'application/json',
        'X-ELS-APIKey': SCOPUS_API_KEY,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();

      let errorDetails = errorText.slice(0, 500);
      let statusCode = '';
      let statusText = '';

      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson['service-error']?.status) {
          const status = errorJson['service-error'].status;
          statusCode = status.statusCode;
          statusText = status.statusText;
          errorDetails = `${status.statusCode}: ${status.statusText}`;
        }
      } catch {
        // ignore parse errors
      }

      return new Response(
        JSON.stringify({
          success: false,
          error: `HTTP ${response.status}`,
          details: errorDetails,
          statusCode,
          statusText,
          recommendations: [
            'Ensure SCOPUS_API_KEY is set and has Scopus API access.',
            'Check Elsevier developer portal quotas and expiry.',
          ],
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    const data = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        data,
        totalResults: data['search-results']?.['opensearch:totalResults'] || 0,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('[test-scopus]', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : String(error),
        type: 'network_error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    );
  }
}
