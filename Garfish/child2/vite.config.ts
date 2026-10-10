import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/child2App/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': `${import.meta.dirname}/src`
    }
  },
  build: {
    outDir: '../dist/child2App',
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
   server:{
      host:'localhost',
      port:7002,
      origin: 'http://localhost:7002',
      open:false,
      proxy:{
        // 接口代理，主应用、子应用的接口代理都走这里
        '/apiExample': {
          target: 'http://10.64.15.85:8481',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/apiExample/, ''),
        }
      }
    },
})
