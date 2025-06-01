import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from "vite-plugin-qiankun";

export default defineConfig({
  base: 'http://localhost:5000/child/app2/',
  plugins: [
    vue(),
    qiankun("app2", {
      useDevMode: true,
    }),
  ],
  server:{
    host:'localhost',
    port:4002,
    open:false,
    proxy:{
        '/portalApi': {
          target: 'http://10.64.16.76:8482',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/portalApi/, ''),
        }
        
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
