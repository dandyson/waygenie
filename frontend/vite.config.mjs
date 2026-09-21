import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Auth0 callback URLs, backend CORS and Cypress all expect 3000
    strictPort: true, // fail loudly instead of silently moving to 3001
  },
  build: {
    outDir: 'build', // CRA's default build output
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,jsx}'],
      exclude: [
        'src/index.jsx',
        'src/setupTests.js',
        'src/**/*.test.{js,jsx}',
      ],
    },
  },
});