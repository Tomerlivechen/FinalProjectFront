import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      stream: 'stream-browserify',
      events: 'events',
      util: 'util/',

    },
  },
  optimizeDeps: {
    include: ['util','events', 'stream-browserify'], 
    exclude: []
  },
});