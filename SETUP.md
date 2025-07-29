# Quick Setup Guide

## 1. Prerequisites
- Node.js (version 16 or higher)
- npm package manager

## 2. Installation Steps

1. **Extract/Clone the project**
   ```bash
   cd AI_IMAGE GENERATOR
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Key**
   - Copy `.env.example` to `.env`
   - Replace `your_clipdrop_api_key_here` with your actual Clipdrop API key
   ```
   VITE_CLIPDROP_API_KEY=ENTER_YOUR_CLIPDROP_API_KEY
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Navigate to `http://localhost:5173`

## 3. Getting Clipdrop API Key

1. Visit https://clipdrop.co/apis
2. Create an account or sign in
3. Go to API section
4. Generate your API key
5. Copy and paste into `.env` file

