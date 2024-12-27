import path from 'path'

import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    }
  },
  plugins: [
    svgr(),
    react(),
  ],
  server: {
    port: 3000,
    open: true,
  }
})
