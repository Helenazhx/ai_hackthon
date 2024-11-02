import { GoogleGenerativeAI } from '@google/generative-ai';

// Add specific error handling
class GeminiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export async function POST(request) {
  try {
    // Validate API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new GeminiError('Gemini API key not configured', 500);
    }

    // Initialize the API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' });

    // Parse request body
    const body = await request.json();
    if (!body.prompt) {
      throw new GeminiError('Prompt is required', 400);
    }

    try {
      // Generate content with timeout
      const result = await Promise.race([
        model.generateContent(body.prompt),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Request timeout')), 30000)
        )
      ]);

      const response = await result.response;
      const text = response.text();

      // Return successful response
      return new Response(
        JSON.stringify({ 
          success: true,
          insights: text 
        }), 
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store'
          }
        }
      );

    } catch (genError) {
      console.error('Gemini API Error:', genError);
      throw new GeminiError(
        'Error generating content: ' + genError.message, 
        500
      );
    }

  } catch (error) {
    console.error('Server Error:', error);
    
    // Return structured error response
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
      {
        status: error.statusCode || 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store'
        }
      }
    );
  }
}