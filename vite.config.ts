
import { defineConfig } from 'vite';
import path from 'path';

import vue from '@vitejs/plugin-vue';
import { viteSingleFile } from 'vite-plugin-singlefile';
// import vueI18n from '@intlify/vite-plugin-vue-i18n';
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
        path.resolve(__dirname, 'assets'),
      ]
    },
    rollupOptions: {
      inlineDynamicImports: true,
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      },
      input: {
        code: path.resolve(__dirname, 'src', 'code.ts'),
        // ui: path.resolve(__dirname, 'src', 'ui.ts'),
        html: path.resolve(__dirname, 'src', 'ui.html'),
      }
    },
  },
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    viteSingleFile()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  define: {
    'process.env': process.env
  },
  // test: {
  //   watch: false,
  //   globals: true,
  //   include: ['src/**/*.spec.ts'],
  //   environment: 'jsdom',
  // },
});
