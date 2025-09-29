export async function GET() {
  try {
    const SCOPUS_API_KEY = import.meta.env.SCOPUS_API_KEY || process.env.SCOPUS_API_KEY || '';
    const SCOPUS_BASE_URL = 'https://api.elsevier.com/content/search/scopus';
    
    // Test with a simple query
    const testQuery = 'AFFIL("Mindanao State University")';
    const url = `${SCOPUS_BASE_URL}?query=${encodeURIComponent(testQuery)}&start=0&count=1&apiKey=${SCOPUS_API_KEY}&httpAccept=application/json`;
    
    console.log('Testing Scopus API with URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'X-ELS-APIKey': SCOPUS_API_KEY
      }
    });
    
    console.log('Test response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Test API Error:', errorText);
      
      // Parse the error response for better details
      let errorDetails = errorText;
      let statusCode = '';
      let statusText = '';
      
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson['service-error'] && errorJson['service-error'].status) {
          const status = errorJson['service-error'].status;
          statusCode = status.statusCode;
          statusText = status.statusText;
          errorDetails = `${status.statusCode}: ${status.statusText}`;
        }
      } catch (e) {
        // If parsing fails, use the raw error text
      }
      
      return new Response(JSON.stringify({
        success: false,
        error: `HTTP ${response.status}`,
        details: errorDetails,
        statusCode: statusCode,
        statusText: statusText,
        url: url,
        recommendations: [
          "Check if the API key is properly configured in Elsevier Developer Portal",
          "Verify that the API key has Scopus API access permissions",
          "Ensure the CORS domains include your development and production URLs",
          "Check if the API key is active and not expired",
          "Contact Elsevier support if the issue persists"
        ]
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const data = await response.json();
    console.log('Test API success:', data);
    
    return new Response(JSON.stringify({
      success: true,
      data: data,
      totalResults: data['search-results']?.['opensearch:totalResults'] || 0
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Test API exception:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      stack: error.stack,
      type: 'network_error'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 