import React from 'react';
import { ImageCard } from './ImageCard';
import { GeneratedImage } from '../types/types';
import { Images, Trash2, Filter } from 'lucide-react';

interface ImageGalleryProps {
  images: GeneratedImage[];
  onToggleFavorite: (id: string) => void;
  onRegenerate: (prompt: string, style: string) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
  isGenerating?: boolean;
  title?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ 
  images, 
  onToggleFavorite, 
  onRegenerate, 
  onDelete, 
  onClearAll,
  isGenerating = false,
  title = "Your Gallery"
}) => {
  if (images.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative mb-6">
          <Images className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto" />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 opacity-20 rounded-full blur-xl" />
        </div>
        <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-3">
          No images yet
        </h3>
        <p className="text-gray-500 dark:text-gray-500 max-w-md mx-auto">
          Start creating amazing AI-generated images by describing what you want to see above
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Gallery Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl">
            <Images className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              {images.length} {images.length === 1 ? 'image' : 'images'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-600/50 hover:bg-white/70 dark:hover:bg-gray-800/70 transition-all duration-300">
            <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Filter</span>
          </button>
          
          {images.length > 0 && (
            <button
              onClick={onClearAll}
              className="flex items-center space-x-2 px-4 py-2 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 rounded-xl border border-red-200 dark:border-red-800 transition-all duration-300"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Clear All</span>
            </button>
          )}
        </div>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <div
            key={`${image.id}-${index}`}
            className="animate-in fade-in slide-in-from-bottom duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ImageCard
              image={image}
              onToggleFavorite={onToggleFavorite}
              onRegenerate={onRegenerate}
              onDelete={onDelete}
              isGenerating={isGenerating}
            />
          </div>
        ))}
      </div>
    </div>
  );
};