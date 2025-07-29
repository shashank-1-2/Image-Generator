import React from 'react';
import { Sparkles, Wand2, Heart, History } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
  onShowHistory: () => void;
  onShowFavorites: () => void;
  historyCount: number;
  favoritesCount: number;
}

export const Header: React.FC<HeaderProps> = ({ 
  onShowHistory, 
  onShowFavorites, 
  historyCount, 
  favoritesCount 
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Wand2 className="w-7 h-7 text-white" />
              </div>
              <Sparkles className="w-5 h-5 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Shashank's AI Studio
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Transform your imagination into stunning visuals
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={onShowHistory}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 group"
            >
              <History className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                History ({historyCount})
              </span>
            </button>
            
            <button
              onClick={onShowFavorites}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl border border-white/20 dark:border-white/10 hover:bg-white/20 dark:hover:bg-black/30 transition-all duration-300 group"
            >
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Favorites ({favoritesCount})
              </span>
            </button>
            
            <ThemeToggle />
            
            <div className="hidden md:flex items-center px-3 py-2 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl">
              <span className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                ✨ AI Powered
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};