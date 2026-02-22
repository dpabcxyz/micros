import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port:9000,
    proxy: {
      '/publicsApi': {
        timeout: 30000,
        target: 'http://10.64.15.85:8680/', 
        changeOrigin: true,
        rewrite: path => path.replace(/^\/publicsApi/, ''),
      }
    },
  }
})
