/// <reference types="vitest" />

import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import svgLoader from 'vite-svg-loader';


// https://vitejs.dev/config/
export default defineConfig({
  publicDir: path.resolve(__dirname, 'assets'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    sourcemap: false,
    minify: false,
    watch: {
      include: [
        path.resolve(__dirname, 'src'),
        path.resolve(__dirname, 'api'),
        path.resolve(__dirname, 'communication'),
        path.resolve(__dirname, 'assets'),
        path.resolve(__dirname, 'helpers'),
      ]
    },
    assetsDir: path.resolve(__dirname, 'dist', 'assets'),
    rollupOptions: {
      inlineDynamicImports: true,
      input: {
        code: path.resolve(__dirname, 'api', 'index.ts'),
        html: path.resolve(__dirname, 'src', 'ui.html'),
      },
      output: {
        manualChunks: {
          code: [
            path.resolve(__dirname, 'api', 'index.ts'),
          ],
          html: [
            path.resolve(__dirname, 'src', 'ui.html'),
          ]
        },
        entryFileNames: ({ name }) =>
          name === 'html' ? `src/[name].js` : `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: (x) => `src/[name].[ext]`,
      },
      external: [
        path.resolve(__dirname, 'communication'),
      ]
    },
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    svgLoader(),
    viteSingleFile(),
  ],
  resolve: {
    alias: {
      '~ui': path.resolve(__dirname, 'src'),
      '~api': path.resolve(__dirname, 'api'),
      '~comm': path.resolve(__dirname, 'communication'),
      '~assets': path.resolve(__dirname, 'assets'),
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
