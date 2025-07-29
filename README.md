# AI Image Generator

A modern, feature-rich AI image generation web application built with React, TypeScript, and Tailwind CSS. Generate stunning images from text descriptions using the Clipdrop API.

## 🚀 Features

- **AI-Powered Image Generation**: Convert text descriptions to high-quality images
- **Multiple Art Styles**: Realistic, 3D Render, Anime, Digital Art, Oil Painting, Watercolor, Cyberpunk, Fantasy
- **Modern UI**: Glassmorphism design with smooth animations
- **Dark/Light Mode**: Toggle between themes
- **Image Management**: Save favorites, view history, download images
- **Responsive Design**: Works perfectly on desktop and mobile
- **Local Storage**: Persist your generated images and favorites

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **API**: Clipdrop Text-to-Image API

## 📦 Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your Clipdrop API key:
   ```
   VITE_CLIPDROP_API_KEY=your_clipdrop_api_key_here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 🔑 Getting a Clipdrop API Key

1. Visit [Clipdrop API](https://clipdrop.co/apis)
2. Sign up for an account
3. Navigate to the API section
4. Generate your API key
5. Add it to your `.env` file

## 🎨 Usage

1. **Generate Images**: Enter a text description and select an art style
2. **Surprise Me**: Click for random creative prompts
3. **Manage Images**: Save favorites, view history, download images
4. **Theme Toggle**: Switch between dark and light modes
5. **Responsive**: Use on any device

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # App header with navigation
│   ├── ImageGenerator.tsx  # Main generation interface
│   ├── ImageGallery.tsx    # Image grid display
│   ├── ImageCard.tsx   # Individual image card
│   ├── Modal.tsx       # Modal component
│   └── ThemeToggle.tsx # Dark/light mode toggle
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.ts  # Local storage hook
│   └── useTheme.ts     # Theme management hook
├── services/           # API services
│   └── clipdropService.ts  # Clipdrop API integration
├── types/              # TypeScript type definitions
│   └── types.ts        # App type definitions
├── App.tsx             # Main app component
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## 📝 License

This project is open source and available under the MIT License.


**Enjoy creating amazing AI-generated art! ✨**