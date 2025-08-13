export async function GET({ request, url }) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || 'AFFIL("Mindanao State University Tawi-Tawi College of Technology and Oceanography")';
    const start = searchParams.get('start') || '0';
    const count = searchParams.get('count') || '25';
    
    const SCOPUS_API_KEY = '989a27d9e8f51e8e12a530dbaa6cca46';
    const SCOPUS_BASE_URL = 'https://api.elsevier.com/content/search/scopus';
    
    const apiUrl = `${SCOPUS_BASE_URL}?query=${encodeURIComponent(query)}&start=${start}&count=${count}&apiKey=${SCOPUS_API_KEY}&httpAccept=application/json`;
    
    console.log('Scopus API URL:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'X-ELS-APIKey': SCOPUS_API_KEY
      }
    });
    
    console.log('Scopus API Response Status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Scopus API Error:', errorText);
      
      // Parse the error response
      let errorDetails = errorText;
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson['service-error'] && errorJson['service-error'].status) {
          const status = errorJson['service-error'].status;
          errorDetails = `${status.statusCode}: ${status.statusText}`;
        }
      } catch (e) {
        // If parsing fails, use the raw error text
      }
      
      return new Response(JSON.stringify({ 
        error: `HTTP error! status: ${response.status}`,
        details: errorDetails,
        statusCode: response.status,
        apiUrl: apiUrl
      }), {
        status: 200, // Return 200 to client but include error info
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    const data = await response.json();
    console.log('Scopus API Data received:', data);
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
  } catch (error) {
    console.error('Error in Scopus API endpoint:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message,
      type: 'network_error'
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
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
} 