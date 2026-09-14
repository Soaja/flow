import { defineConfig } from 'vite';
import config from './vite.config.js';

export default defineConfig({
  ...config,
  ssr: { noExternal: true },
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: 'dist-ssr',
    target: 'node22',
  },
});
