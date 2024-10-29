export default async function handler(req, res) {
  // Debug logging
  console.log('Request method:', req.method);
  console.log('Request body:', req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  if (!req.body || !req.body.prompt) {
    return res.status(400).json({ error: 'Prompt is required in request body' });
  }

  try {
    // Log OpenAI request
    console.log('Making OpenAI request with prompt:', req.body.prompt);

    const openaiResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        prompt: req.body.prompt,
        n: 1,
        size: "1024x1024",
        response_format: "url"
      })
    });

    // Log OpenAI response
    const responseText = await openaiResponse.text();
    console.log('OpenAI response:', responseText);

    if (!openaiResponse.ok) {
      throw new Error(`OpenAI API error: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    return res.status(200).json({ imageUrl: data.data[0].url });
  } catch (error) {
    console.error('Error in API route:', error);
    return res.status(500).json({ 
      error: error.message,
      details: 'Check server logs for more information'
    });
  }
}
