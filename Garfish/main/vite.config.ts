import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    host:'localhost',
    port:7000,
    open:false,
    proxy:{
      '/exampleApi': {
        target: 'http://10.64.15.85:8481',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/exampleApi/, ''),
      }
    }
  }
})
