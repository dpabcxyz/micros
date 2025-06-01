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
      name: "app1",        // 应用名称，保证唯一
      filename:'app1.js', // 模块联邦的入口文件,一般以[name].js命名
      exposes: {                 // 暴露模块，供host应用引用
        './Page1':'./src/views/page1.vue',
        './Page2':'./src/views/page2.vue',
      },
      remotes: {                     // 引用其他应用暴露的模块
        //  app2 作为引用组件的时的前缀，用来指代'/child/app2/assets/app2.js',一般使用remote应用的name
        //  /child/app2 一个特殊路径，用于反向代理
        app2:'/child/app2/assets/app2.js'  

        //  将remotes应用的部署路径写死，不建议这么干！
        // app2:'http://localhost:9000/child/app2/assets/app2.js' 
      },
      shared: ['vue'], // 共享依赖
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/child/app1/' : '/',   // 部署在非根目录
	server: {
		port:9001,
		proxy: {
			'/child/app2': {
				timeout: 30000,
				target: 'http://localhost:9000/child/app2', // 这个地址必须是打包编译后的环境
				changeOrigin: true,
				rewrite: path => path.replace(/^\/child\/app2/, ''),
			},
		},
	},
})
console.log(1)
