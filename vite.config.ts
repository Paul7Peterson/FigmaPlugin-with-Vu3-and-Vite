/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// import svgLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: false,
    minify: false,
    watch: {
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'api'),
        path.resolve(__dirname, 'assets'),
      ]
    },
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        manualChunks: {
          code: [
            path.resolve(__dirname, 'api', 'index.ts'),
          ],
          html: [
            path.resolve(__dirname, 'src', 'ui.html'),
          ]
        },
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      },
      input: {
        code: path.resolve(__dirname, 'api', 'index.ts'),
        html: path.resolve(__dirname, 'src', 'ui.html'),
      },
      external: [
        path.resolve(__dirname, 'communication'),
        path.resolve(__dirname, 'helpers'),
      ]
    },
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    viteSingleFile(),
  ],
  resolve: {
    alias: {
      '~ui': path.resolve(__dirname, 'src'),
      '~api': path.resolve(__dirname, 'api'),
      '~helpers': path.resolve(__dirname, 'helpers'),
      '~comm': path.resolve(__dirname, 'communication'),
    },
  },
  define: {
    'process.env': process.env
  },
  test: {
    watch: false,
    globals: true,
    include: ['src/**/*.spec.ts'],
    environment: 'jsdom',
  },
});
