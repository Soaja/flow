import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react':              'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom':          'preact/compat',
      'react/jsx-runtime':  'preact/jsx-runtime',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/preact')) return 'react-vendor';
          if (id.includes('node_modules/gsap'))   return 'gsap-vendor';
        },
      },
    },
    chunkSizeWarningLimit: 400,
  },
})
