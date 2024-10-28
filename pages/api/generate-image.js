export default async function handler(req, res) {
  console.log('API route hit:', req.method);  // Debug log

  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: `Method ${req.method} Not Allowed` 
    });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/images/generations', {
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

    const data = await response.json();
    return res.json({ imageUrl: data.data[0].url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
