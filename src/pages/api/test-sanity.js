import { testSanityConnection } from '../../api/api.jsx';

export async function GET() {
  try {
    console.log('Testing Sanity connection...');
    const result = await testSanityConnection();
    console.log('Sanity connection test result:', result);
    
    return new Response(JSON.stringify({ 
      success: true, 
      result: result,
      message: 'Sanity connection test completed'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error testing Sanity connection:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message,
      message: 'Sanity connection test failed'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
} 