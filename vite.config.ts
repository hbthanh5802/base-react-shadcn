import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  server: { port: 3000, open: true },
  build: {
    outDir: 'dist',
    sourcemap: false,
    chunkSizeWarningLimit: 5500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/\/node_modules\/(react|react-dom|react-router|react-router-dom)\//.test(id))
            return 'react-vendor';
          if (/iconsax-react/.test(id)) return 'icons-vuesax';
          if (/lucide-react/.test(id)) return 'icons-lucide';
          if (/@tanstack\/react-(query|table)/.test(id)) return 'query-vendor';
          if (/react-hook-form|zod|@hookform\/resolvers/.test(id)) return 'form-vendor';
          if (/@radix-ui/.test(id)) return 'radix-vendor';
          if (/pdfjs-dist|react-pdf/.test(id)) return 'pdf-vendor';
          if (/\/node_modules\/xlsx\//.test(id)) return 'xlsx-vendor';
          if (/docx-preview/.test(id)) return 'docx-vendor';
          return undefined;
        },
      },
    },
  },
});
