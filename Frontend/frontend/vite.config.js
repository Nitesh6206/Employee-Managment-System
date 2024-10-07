import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export Vite configuration using defineConfig
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Backend server
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    port: 3000, // This sets the development server to run on port 3000
  },
});
