import path from 'node:path'
import { defineConfig,loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'
const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}
// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      assets: pathResolve('./src/assets'),
    },
  },
  server: {
    hmr: {
      overlay: false
    },
    proxy: {
      '/api': {
        target: env.VITE_API_BASE,
        // 开启websocket服务，默认true
        ws: true,
        changeOrigin: true,
        // 用于修改路径配置,把api路径名去掉
        // rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
}})
