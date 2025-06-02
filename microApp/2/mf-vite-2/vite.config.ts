import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import federation from '@originjs/vite-plugin-federation'
import topLevelAwait from 'vite-plugin-top-level-await'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    topLevelAwait(),
    federation({
      // 应用名称，保证唯一
      name: "app2",       

      // 模块联邦的入口文件
      filename:'app2.js', 

      // 暴露模块，供host应用引用
      exposes: {                
        './Page1':'./src/views/page1.vue',
        './Page2':'./src/views/page2.vue',
      },
      
      // 引用其他应用暴露的模块
      remotes: { 

        //  app1 作为引用组件的时的前缀，用来指代'/child/app1/assets/app1.js',一般使用remote应用的name
        //  /child/app1 一个特殊路径，用于反向代理
        app1:'/child/app1/assets/app1.js'  

        //  将remotes应用的部署路径写死，不建议这么干！
        // app1:'http://localhost:9000/child/app1/assets/app1.js'
      },
      shared: ['vue'], // 共享依赖
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/child/app2/' : '/',   // 部署在非根目录
	server: {
		port:9002,
		proxy: {
			'/child/app1': {
				timeout: 30000,
        target: 'http://localhost:9000/child/app1',   // 这个地址必须是打包编译后的环境
				changeOrigin: true,
				rewrite: path => path.replace(/^\/child\/app1/, ''),
			},
		},
	},
})
