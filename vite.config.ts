import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@components': path.resolve(import.meta.dirname, './src/components'),
      '@styles': path.resolve(import.meta.dirname, './src/styles'),
      '@hooks': path.resolve(import.meta.dirname, './src/hooks'),
      '@utils': path.resolve(import.meta.dirname, './src/utils'),
      '@types': path.resolve(import.meta.dirname, './src/types'),
      '@data': path.resolve(import.meta.dirname, './src/data'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "styles/abstracts" as *;\n`,
        loadPaths: [path.resolve(import.meta.dirname, './src')],
        api: 'modern-compiler',
      },
    },
  },
});