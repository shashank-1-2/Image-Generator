export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  style: string;
  createdAt: number;
  isFavorite?: boolean;
}

export interface ImageStyle {
  id: string;
  name: string;
  description: string;
  prompt_suffix: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  autoSave: boolean;
  imageQuality: 'standard' | 'high';
}