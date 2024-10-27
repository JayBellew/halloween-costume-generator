const generateImage = async (costume) => {
    setIsGenerating(true);
    setError(null);
    
    try {
      console.log('Generating image for costume:', costume); // Debug log
      const prompt = generateImagePrompt(costume);
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate image');
      }

      const data = await response.json();
      console.log('Received image URL:', data.imageUrl); // Debug log
      setImageUrl(data.imageUrl);
    } catch (err) {
      console.error('Error:', err); // Debug log
      setError(err.message);
      // Show error on UI
      setImageUrl(null);
    } finally {
      setIsGenerating(false);
    }
  };
