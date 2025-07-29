import { GeneratedImage, ImageStyle } from '../types/types';

const API_KEY = import.meta.env.VITE_CLIPDROP_API_KEY;
const API_URL = 'https://clipdrop-api.co/text-to-image/v1';

export const imageStyles: ImageStyle[] = [
  { id: 'realistic', name: 'Realistic', description: 'Photorealistic images', prompt_suffix: ', photorealistic, high quality, detailed' },
  { id: '3d', name: '3D Render', description: '3D rendered style', prompt_suffix: ', 3D render, cinema4d, octane render' },
  { id: 'anime', name: 'Anime', description: 'Japanese anime style', prompt_suffix: ', anime style, manga, japanese animation' },
  { id: 'digital', name: 'Digital Art', description: 'Digital artwork style', prompt_suffix: ', digital art, concept art, artstation' },
  { id: 'oil', name: 'Oil Painting', description: 'Classic oil painting', prompt_suffix: ', oil painting, classical art, renaissance style' },
  { id: 'watercolor', name: 'Watercolor', description: 'Watercolor painting style', prompt_suffix: ', watercolor painting, soft colors, artistic' },
  { id: 'cyberpunk', name: 'Cyberpunk', description: 'Futuristic cyberpunk', prompt_suffix: ', cyberpunk, neon lights, futuristic, sci-fi' },
  { id: 'fantasy', name: 'Fantasy', description: 'Fantasy art style', prompt_suffix: ', fantasy art, magical, ethereal, mystical' }
];

export const generateImage = async (prompt: string, style: string): Promise<GeneratedImage> => {
  if (!API_KEY || API_KEY === 'your_clipdrop_api_key_here') {
    // Fallback to demo mode with placeholder images
    console.warn('Clipdrop API key not configured. Using demo mode.');
    return generateDemoImage(prompt, style);
  }

  try {
    const selectedStyle = imageStyles.find(s => s.id === style) || imageStyles[0];
    const enhancedPrompt = prompt + selectedStyle.prompt_suffix;

    const formData = new FormData();
    formData.append('prompt', enhancedPrompt);

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'x-api-key': API_KEY,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    
    const imageId = Math.random().toString(36).substring(7);

    return {
      id: imageId,
      url: imageUrl,
      prompt: prompt,
      style: selectedStyle.name,
      createdAt: Date.now()
    };
  } catch (error) {
    console.error('Clipdrop API Error:', error);
    // Fallback to demo mode on error
    return generateDemoImage(prompt, style);
  }
};

// Demo mode fallback
const generateDemoImage = async (prompt: string, style: string): Promise<GeneratedImage> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

  const selectedStyle = imageStyles.find(s => s.id === style) || imageStyles[0];
  const imageId = Math.random().toString(36).substring(7);
  
  // Use Unsplash for demo images with relevant keywords
  const keywords = prompt.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(' ').slice(0, 3).join(',');
  const imageUrl = `https://source.unsplash.com/800x800/?${keywords || 'art'},${style}`;

  return {
    id: imageId,
    url: imageUrl,
    prompt: prompt,
    style: selectedStyle.name,
    createdAt: Date.now()
  };
};

export const surprisePrompts = [
  "A majestic dragon soaring through storm clouds",
  "Cyberpunk cityscape with neon reflections in rain",
  "Ancient library filled with floating magical books",
  "Underwater palace with bioluminescent coral gardens",
  "Steampunk airship flying over Victorian London",
  "Crystal cave with rainbow light refractions",
  "Futuristic space station orbiting a purple nebula",
  "Enchanted forest with glowing mushrooms and fireflies",
  "Desert oasis with palm trees under starry night sky",
  "Floating islands connected by rainbow bridges",
  "Gothic cathedral made entirely of ice and snow",
  "Mechanical clockwork city with brass gears",
  "Tropical beach on an alien planet with two moons",
  "Medieval castle perched on a floating mountain",
  "Neon-lit Tokyo street during cherry blossom season"
];