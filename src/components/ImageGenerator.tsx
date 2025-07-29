import React, { useState } from 'react';
import { Wand2, Loader2, Shuffle, Sparkles, Palette } from 'lucide-react';
import { GeneratedImage } from '../types/types';
import { generateImage, imageStyles, surprisePrompts } from '../services/clipdropService';

interface ImageGeneratorProps {
  onImageGenerated: (image: GeneratedImage) => void;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

export const ImageGenerator: React.FC<ImageGeneratorProps> = ({
  onImageGenerated,
  isGenerating,
  setIsGenerating
}) => {
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('realistic');
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please describe the image you want to create');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const image = await generateImage(prompt, selectedStyle);
      onImageGenerated(image);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Image generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSurpriseMe = () => {
    const randomPrompt = surprisePrompts[Math.floor(Math.random() * surprisePrompts.length)];
    setPrompt(randomPrompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isGenerating) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 dark:border-gray-700/50 mb-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="w-8 h-8 text-purple-500 animate-pulse" />
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
            Create Magic with AI
          </h2>
          <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Describe your vision and watch AI bring it to life in seconds
        </p>
      </div>

      <div className="space-y-6">
        {/* Prompt Input */}
        <div className="relative group">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe the image you want..."
            className="w-full p-6 bg-white/50 dark:bg-gray-800/50 border-2 border-gray-200/50 dark:border-gray-600/50 rounded-2xl focus:border-purple-500 focus:ring-4 focus:ring-purple-200/50 dark:focus:ring-purple-800/50 transition-all duration-300 resize-none min-h-[120px] text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 text-lg backdrop-blur-sm"
            disabled={isGenerating}
          />
          <div className="absolute bottom-4 right-4 flex items-center space-x-2">
            <span className="text-sm text-gray-400 dark:text-gray-500">
              {prompt.length}/500
            </span>
            <button
              onClick={handleSurpriseMe}
              disabled={isGenerating}
              className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              title="Surprise Me!"
            >
              <Shuffle className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Style Selection */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Palette className="w-5 h-5 text-purple-500" />
            <label className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              Art Style
            </label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {imageStyles.map((style) => (
              <button
                key={style.id}
                onClick={() => setSelectedStyle(style.id)}
                disabled={isGenerating}
                className={`p-4 rounded-xl border-2 transition-all duration-300 group ${
                  selectedStyle === style.id
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/30 shadow-lg'
                    : 'border-gray-200 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 hover:border-purple-300 hover:bg-purple-25 dark:hover:bg-purple-900/20'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="text-center">
                  <h3 className={`font-semibold mb-1 ${
                    selectedStyle === style.id 
                      ? 'text-purple-700 dark:text-purple-300' 
                      : 'text-gray-800 dark:text-gray-200'
                  }`}>
                    {style.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {style.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-xl p-4 text-red-700 dark:text-red-300 animate-in slide-in-from-top duration-300">
            {error}
          </div>
        )}

        {/* Generate Button */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="relative overflow-hidden bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-600 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl hover:shadow-3xl disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 min-w-[200px] group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {isGenerating ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="text-lg">Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-6 h-6" />
                <span className="text-lg">Generate Image</span>
              </>
            )}
          </button>

          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium">AI Ready</span>
          </div>
        </div>

        {/* API Key Notice */}
        {(!import.meta.env.VITE_CLIPDROP_API_KEY || import.meta.env.VITE_CLIPDROP_API_KEY === 'your_clipdrop_api_key_here') && (
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4 text-yellow-800 dark:text-yellow-300">
            <p className="text-sm">
              <strong>Demo Mode:</strong> Add your Clipdrop API key to the .env file to use real AI generation. 
              Currently using placeholder images for demonstration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};