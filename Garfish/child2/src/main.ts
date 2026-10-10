import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { vueBridge } from '@garfish/bridge-vue-v3'
import App from './App.vue'
import routes from './router'

function newRouter(basename: string) {
  const router = createRouter({
    history: createWebHistory(basename),
    routes,
  })
  // 同步主应用 URL 到子应用内部路由:
  // 主应用菜单切换是 SPA 内 push, 原生 pushState 不触发 popstate, 且 Garfish cache 模式下
  // 子应用实例被复用、内部 vue-router 不会自动跟随主应用 URL 变化, 需要手动同步。
  // 主应用每次路由变化会派发 app-url-change 事件, 子应用按自己的 basename 过滤后同步。
  const syncRoute = () => {
    if (!window.location.pathname.startsWith(basename)) return
    const innerPath = window.location.pathname.replace(basename, '') || '/'
    if (router.currentRoute.value.path !== innerPath) {
      router.replace(innerPath)
    }
  }
  window.addEventListener('app-url-change', syncRoute)
  window.addEventListener('popstate', syncRoute)
  return router
}

// Garfish 子应用入口契约:vueBridge 必须在模块初始化时立即调用,
// 它会在 window.__GARFISH__ 为 true 时自动把 provider 注册到 Garfish
// 注入的 __GARFISH_EXPORTS__(即主框架内部维护的 customExports) 上,
// Garfish 主应用就是通过 __GARFISH_EXPORTS__ 拿到 provider 来挂载/销毁子应用的。
// 注意:不要手动覆盖 window.__GARFISH_EXPORTS__, 那与主框架读取的
// customExports 不是同一个对象, 反而会污染全局环境。
const provider = vueBridge({
  // 子应用根组件
  rootComponent: App,
  // vueBridge 创建好 Vue 实例后调用,这里按 Garfish 传入的 basename 装配子应用内部路由
  handleInstance: (vueInstance, { basename }) => {
    console.log("basename:",basename)
    vueInstance.use(newRouter(basename))
  },
})

export { provider }

// 独立运行时(直接访问 ip:port/runtimeApp/)直接挂载, 便于单独调试子应用。
// basename 用 BASE_URL(生产为 /runtimeApp/), 与部署路径一致, 保证独立访问时路由能匹配。
if (!window.__GARFISH__) {
  const app = createApp(App)
  app.use(newRouter(import.meta.env.BASE_URL))
  app.mount('#app')
}
