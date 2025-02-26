import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslint({
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      emitWarning: true,
      emitError: false, // error doesn't block compilation
      failOnWarning: false,
      failOnError: false, // error doesn't block compilation
    }),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@solver': path.resolve(__dirname, './src/solver'),
    },
  },
});
