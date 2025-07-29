import { useState } from 'react';
import { Header } from './components/Header';
import { ImageGenerator } from './components/ImageGenerator';
import { ImageGallery } from './components/ImageGallery';
import { Modal } from './components/Modal';
import { GeneratedImage } from './types/types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';

function App() {
  const [generatedImages, setGeneratedImages] = useLocalStorage<GeneratedImage[]>('generated-images', []);
  const [favorites, setFavorites] = useLocalStorage<GeneratedImage[]>('favorite-images', []);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  
  // Initialize theme
  useTheme();

  const handleImageGenerated = (image: GeneratedImage) => {
    setGeneratedImages(prev => [image, ...prev]);
  };

  const handleToggleFavorite = (id: string) => {
    const image = generatedImages.find(img => img.id === id);
    if (!image) return;

    const isFavorite = favorites.some(fav => fav.id === id);
    
    if (isFavorite) {
      setFavorites(prev => prev.filter(fav => fav.id !== id));
      setGeneratedImages(prev => prev.map(img => 
        img.id === id ? { ...img, isFavorite: false } : img
      ));
    } else {
      const favoriteImage = { ...image, isFavorite: true };
      setFavorites(prev => [favoriteImage, ...prev]);
      setGeneratedImages(prev => prev.map(img => 
        img.id === id ? { ...img, isFavorite: true } : img
      ));
    }
  };

  const handleRegenerate = async (prompt: string, style: string) => {
    // This will be handled by the ImageGenerator component
    // We just need to set the prompt and style there
    console.log('Regenerating with:', prompt, style);
  };

  const handleDelete = (id: string) => {
    setGeneratedImages(prev => prev.filter(img => img.id !== id));
    setFavorites(prev => prev.filter(fav => fav.id !== id));
  };

  const handleClearAll = () => {
    setGeneratedImages([]);
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    setGeneratedImages(prev => prev.map(img => ({ ...img, isFavorite: false })));
  };

  // Update favorites status in generated images
  const imagesWithFavoriteStatus = generatedImages.map(img => ({
    ...img,
    isFavorite: favorites.some(fav => fav.id === img.id)
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <Header
        onShowHistory={() => setShowHistory(true)}
        onShowFavorites={() => setShowFavorites(true)}
        historyCount={generatedImages.length}
        favoritesCount={favorites.length}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <ImageGenerator
            onImageGenerated={handleImageGenerated}
            isGenerating={isGenerating}
            setIsGenerating={setIsGenerating}
          />
          
          <ImageGallery
            images={imagesWithFavoriteStatus}
            onToggleFavorite={handleToggleFavorite}
            onRegenerate={handleRegenerate}
            onDelete={handleDelete}
            onClearAll={handleClearAll}
            isGenerating={isGenerating}
          />
        </div>
      </main>

      {/* History Modal */}
      <Modal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        title="Generation History"
      >
        <ImageGallery
          images={imagesWithFavoriteStatus}
          onToggleFavorite={handleToggleFavorite}
          onRegenerate={handleRegenerate}
          onDelete={handleDelete}
          onClearAll={handleClearAll}
          isGenerating={isGenerating}
          title="All Generated Images"
        />
      </Modal>

      {/* Favorites Modal */}
      <Modal
        isOpen={showFavorites}
        onClose={() => setShowFavorites(false)}
        title="Favorite Images"
      >
        <ImageGallery
          images={favorites}
          onToggleFavorite={handleToggleFavorite}
          onRegenerate={handleRegenerate}
          onDelete={handleDelete}
          onClearAll={handleClearFavorites}
          isGenerating={isGenerating}
          title="Your Favorites"
        />
      </Modal>
    </div>
  );
}

export default App;