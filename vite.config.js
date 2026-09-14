import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { projects } from './src/data/projects.js'
import missingProject from './api/missing-project.js'

export default defineConfig({
  plugins: [react(), {
    name: 'flow-prerender-preview',
    configurePreviewServer(server) {
      server.middlewares.use((request, response, next) => {
        const url = new URL(request.url, 'http://localhost');
        if (url.pathname === '/') {
          if (url.searchParams.get('page') === 'work') request.url = '/_pages/work.html';
          else if (url.searchParams.get('project')) {
            const slug = url.searchParams.get('project');
            if (!projects.some(project => project.slug === slug)) {
              missingProject(request, response).catch(next);
              return;
            }
            request.url = `/_pages/projects/${slug}.html`;
          }
        }
        next();
      });
    },
  }],
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
