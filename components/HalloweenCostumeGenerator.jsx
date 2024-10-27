import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Ghost, Sparkles, Skull, RotateCw } from 'lucide-react';

export function HalloweenCostumeGenerator() {
  const [costume, setCostume] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const adjectives = [
    'Spooky', 'Mysterious', 'Enchanted', 'Cursed', 'Glowing'
  ];

  const characters = [
    'Wizard', 'Vampire', 'Ghost', 'Witch', 'Zombie'
  ];

  const accessories = [
    'with a crystal ball', 'carrying a magical staff', 'wearing a cursed amulet',
    'riding a broomstick', 'wielding ancient scrolls'
  ];

  const generateCostume = () => {
    setIsGenerating(true);
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    const randomAccessory = accessories[Math.floor(Math.random() * accessories.length)];
    
    setCostume({
      adjective: randomAdjective,
      character: randomCharacter,
      accessory: randomAccessory
    });

    // For testing, use a placeholder image
    setImageUrl('/api/placeholder/400/400');
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4">
      <div className="max-w-lg mx-auto bg-gray-800 rounded-xl shadow-xl p-6 text-gray-100 border border-purple-500/20">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 text-purple-200">
            <Ghost className="h-8 w-8" />
            Spooktacular Costume Generator
            <Ghost className="h-8 w-8" />
          </h1>
        </div>
        
        <div className="space-y-6">
          <div className="text-center">
            <Button 
              onClick={generateCostume}
              disabled={isGenerating}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="h-5 w-5" />
                  Conjuring...
                </>
              ) : (
                <>
                  <Skull className="h-5 w-5" />
                  Generate Costume!
                </>
              )}
            </Button>
          </div>

          {costume && (
            <div className="space-y-4 text-center">
              <div className="p-6 bg-gray-900 rounded-lg shadow-inner border border-purple-500/20">
                <h2 className="text-2xl font-bold text-purple-200 mb-4">
                  Your Halloween Costume:
                </h2>
                <p className="text-xl text-purple-100 mb-6">
                  {costume.adjective} {costume.character} {costume.accessory}
                </p>

                {imageUrl && (
                  <div className="bg-gray-800 rounded-lg p-4 shadow-inner border border-purple-500/20">
                    <img 
                      src={imageUrl}
                      alt={`${costume.adjective} ${costume.character}`}
                      className="w-full rounded-lg"
                    />
                  </div>
                )}
              </div>
              
              <div className="text-sm text-purple-300 italic">
                🎃 Perfect for spooking up your Halloween night! 🎃
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
