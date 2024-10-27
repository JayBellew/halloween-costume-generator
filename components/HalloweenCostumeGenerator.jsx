import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Ghost, Sparkles, Skull, RotateCw } from 'lucide-react';

export function HalloweenCostumeGenerator() {
  const [costume, setCostume] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [error, setError] = useState(null);

  const adjectives = [
    'Spooky', 'Mysterious', 'Enchanted', 'Cursed', 'Glowing', 'Ancient',
    'Haunted', 'Magical', 'Cosmic', 'Undead', 'Spectral', 'Whimsical',
    'Infernal', 'Celestial', 'Mythical', 'Eldritch'
  ];

  const characters = [
    'Wizard', 'Vampire', 'Ghost', 'Witch', 'Zombie', 'Werewolf',
    'Pirate', 'Ninja', 'Robot', 'Alien', 'Dragon', 'Mummy',
    'Demon', 'Angel', 'Cryptid', 'Phantom', 'Sorcerer', 'Reaper',
    'Banshee', 'Gargoyle'
  ];

  const accessories = [
    'with a crystal ball', 'carrying a magical staff', 'wearing a cursed amulet',
    'riding a broomstick', 'wielding ancient scrolls', 'with glowing eyes',
    'covered in cobwebs', 'surrounded by bats', 'with mystical runes',
    'holding a jack-o-lantern', 'wrapped in chains', 'with floating candles',
    'wielding ethereal weapons', 'with shadowy tentacles', 'wearing a cursed crown',
    'carrying a haunted lantern', 'with spectral wings', 'wielding chaos magic'
  ];

  const generateImagePrompt = (costume) => {
    const moodMap = {
      'Spooky': 'eerie and mysterious, with fog effects',
      'Mysterious': 'shrouded in shadows with mystical elements',
      'Enchanted': 'magical and ethereal, with sparkling magical aura',
      'Cursed': 'dark and ominous, with supernatural corruption effects',
      'Glowing': 'radiating otherworldly light and energy',
      'Ancient': 'weathered and timeworn, with historical authenticity',
      'Haunted': 'spectral and ghostly, with ethereal effects',
      'Magical': 'surrounded by vibrant magical energy and arcane symbols',
      'Cosmic': 'with space and celestial elements, star-touched',
      'Undead': 'with supernatural undead features and dark magic',
      'Spectral': 'translucent and ethereal, with ghostly whisps',
      'Whimsical': 'playful and fantastical, with magical whimsy',
      'Infernal': 'with hellfire and demonic elements',
      'Celestial': 'with divine light and heavenly elements',
      'Mythical': 'legendary and fantastic in appearance',
      'Eldritch': 'with otherworldly cosmic horror elements'
    };

    const characterDetails = {
      'Wizard': 'wearing ornate magical robes with glowing runes',
      'Vampire': 'with aristocratic gothic attire and vampiric features',
      'Ghost': 'translucent and ethereal, floating with spectral trails',
      'Witch': 'in elaborate witches attire with magical implements',
      'Zombie': 'decaying undead with tattered gothic clothing',
      'Werewolf': 'with lupine features and torn formal attire',
      'Pirate': 'in elaborate captain\'s gear with supernatural elements',
      'Ninja': 'in dark assassin garb with mystical elements',
      'Robot': 'biomechanical construct with glowing elements',
      'Alien': 'with otherworldly anatomy and advanced technology',
      'Dragon': 'with scales, horns, and draconic features',
      'Mummy': 'in ancient bandages with Egyptian magical symbols',
      'Demon': 'with horns, dark armor, and infernal elements',
      'Angel': 'with wings, holy symbols, and divine light',
      'Cryptid': 'mysterious creature with supernatural elements',
      'Phantom': 'ethereal being with ghostly flowing elements'
    };

    const mood = moodMap[costume.adjective] || costume.adjective.toLowerCase();
    const details = characterDetails[costume.character] || costume.character;
    
    return `A Halloween costume concept art of a ${mood} ${costume.character.toLowerCase()} ${costume.accessory}, 
      ${details}. Dramatic lighting, dark fantasy style, highly detailed, professional digital art.`;
  };

  const generateImage = async (costume) => {
    setIsLoadingImage(true);
    setError(null);
    
    try {
      const prompt = generateImagePrompt(costume);
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      setImageUrl(data.imageUrl);
    } catch (err) {
      setError(err.message);
      console.error('Error generating image:', err);
    } finally {
      setIsLoadingImage(false);
    }
  };

  const generateCostume = () => {
    setIsGenerating(true);
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomCharacter = characters[Math.floor(Math.random() * characters.length)];
    const randomAccessory = accessories[Math.floor(Math.random() * accessories.length)];
    
    const newCostume = {
      adjective: randomAdjective,
      character: randomCharacter,
      accessory: randomAccessory
    };

    setCostume(newCostume);
    generateImage(newCostume);
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
              disabled={isGenerating || isLoadingImage}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin">
                    <Sparkles className="h-5 w-5" />
                  </div>
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

                <div className="bg-gray-800 rounded-lg p-4 shadow-inner border border-purple-500/20">
                  <div className="relative aspect-square w-full max-w-sm mx-auto rounded-lg overflow-hidden">
                    {isLoadingImage ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                        <div className="text-center space-y-3">
                          <Sparkles className="h-8 w-8 animate-spin text-purple-400 mx-auto" />
                          <p className="text-purple-200">Summoning your costume...</p>
                        </div>
                      </div>
                    ) : error ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                        <p className="text-red-400">{error}</p>
                      </div>
                    ) : imageUrl ? (
                      <>
                        <img 
                          src={imageUrl} 
                          alt={`${costume.adjective} ${costume.character}`}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <Button
                          onClick={() => generateImage(costume)}
                          className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70"
                          size="sm"
                        >
                          <RotateCw className="h-4 w-4 mr-2" />
                          Regenerate
                        </Button>
                      </>
                    ) : null}
                  </div>
                </div>
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

export default HalloweenCostumeGenerator;
