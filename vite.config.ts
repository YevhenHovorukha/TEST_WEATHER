import { resolve } from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/

const root = resolve(__dirname, 'src');

export default defineConfig(() => ({
  optimizeDeps: {
    include: ['@emotion/react', '@emotion/styled', '@mui/material/Tooltip']
  },
  plugins: [
    react(),
    svgr({
      include: '**/*.svg'
    })
  ],
  server: {
    host: 'localhost',
    port: 3004
  },
  resolve: {
    alias: [
      {
        find: '@assets',
        replacement: resolve(root, 'assets')
      },
      {
        find: '@components',
        replacement: resolve(root, 'components')
      },
      {
        find: '@constants',
        replacement: resolve(root, 'constants')
      },
      {
        find: '@hooks',
        replacement: resolve(root, 'hooks')
      },
      {
        find: '@pages',
        replacement: resolve(root, 'pages')
      },
      {
        find: '@services',
        replacement: resolve(root, 'services')
      },
      {
        find: '@utils',
        replacement: resolve(root, 'utils')
      }
    ]
  }
}));
