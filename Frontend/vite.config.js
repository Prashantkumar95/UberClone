import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; // Import the Tailwind CSS plugin

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), // React plugin
    tailwindcss(), // Tailwind CSS plugin
  ],
});