import path from 'path'

import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'

import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
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
}
