import React, { useState } from 'react';
import { Download, Heart, RotateCcw, Clock, Palette, Trash2 } from 'lucide-react';
import { GeneratedImage } from '../types/types';

interface ImageCardProps {
  image: GeneratedImage;
  onToggleFavorite: (id: string) => void;
  onRegenerate: (prompt: string, style: string) => void;
  onDelete: (id: string) => void;
  isGenerating?: boolean;
}

export const ImageCard: React.FC<ImageCardProps> = ({ 
  image, 
  onToggleFavorite, 
  onRegenerate, 
  onDelete,
  isGenerating = false 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showActions, setShowActions] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(image.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-image-${image.id}.jpg`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStyleFromName = (styleName: string) => {
    const styleMap: { [key: string]: string } = {
      'Realistic': 'realistic',
      '3D Render': '3d',
      'Anime': 'anime',
      'Digital Art': 'digital',
      'Oil Painting': 'oil',
      'Watercolor': 'watercolor',
      'Cyberpunk': 'cyberpunk',
      'Fantasy': 'fantasy'
    };
    return styleMap[styleName] || 'realistic';
  };

  return (
    <div 
      className="group relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-xl border border-white/20 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-purple-200 via-blue-200 to-cyan-200 dark:from-purple-800 dark:via-blue-800 dark:to-cyan-800 animate-pulse" />
        )}
        <img
          src={image.url}
          alt={image.prompt}
          className={`w-full h-80 object-cover transition-all duration-700 ${
            isLoading ? 'opacity-0' : 'opacity-100 group-hover:scale-110'
          }`}
          onLoad={handleImageLoad}
        />
        
        {/* Overlay Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
          showActions ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Action Buttons Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          showActions ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="flex space-x-3">
            <button
              onClick={handleDownload}
              className="p-3 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => onToggleFavorite(image.id)}
              className={`p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm ${
                image.isFavorite 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-white/90 hover:bg-white text-gray-800'
              }`}
              title={image.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Heart className={`w-5 h-5 ${image.isFavorite ? 'fill-current' : ''}`} />
            </button>
            
            <button
              onClick={() => onRegenerate(image.prompt, getStyleFromName(image.style))}
              disabled={isGenerating}
              className="p-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 disabled:cursor-not-allowed backdrop-blur-sm"
              title="Regenerate"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => onDelete(image.id)}
              className="p-3 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 backdrop-blur-sm"
              title="Delete"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed line-clamp-3">
            {image.prompt}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4 text-purple-500" />
            <span className="text-purple-600 dark:text-purple-400 font-medium">
              {image.style}
            </span>
          </div>
          
          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3" />
            <span className="text-xs">{formatTime(image.createdAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};