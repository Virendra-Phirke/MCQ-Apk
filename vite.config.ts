import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import netlify from '@netlify/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/MCQ-Apk/',
  plugins: [react(), netlify()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
