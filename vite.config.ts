/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,          // enables describe/it/expect without imports
    environment: 'jsdom',   // simulates browser DOM
    setupFiles: './src/setupTests.ts', // global test setup
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});