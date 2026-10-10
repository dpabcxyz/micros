import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Garfish from 'garfish';
// 把 node 内置模块 util 的浏览器 polyfill 挂到 window 上,
// 供子应用(sandbox: false 模式下与主应用共享 window)直接使用,
// 消除 Garfish 加载子应用时 "Package util is not found" 的警告。
// 注意: util 内部会访问 process, 其 polyfill 已在 index.html 中提前注入。
import * as util from 'util'
if (typeof window !== 'undefined') {
  (window as any).util = util
}
createApp(App).use(router).mount('#app')

const APP_NAMES = ['child1', 'child2'] as const
const PORT_MAP: Record<string, number> = {
  child1: 7001,
  child2: 7002
}
Garfish.run({
  basename: '/',
  apps: APP_NAMES.map((name) => ({
    name,
    activeWhen: `/${name}`,
    domGetter: `#${name}App`,
    entry: import.meta.env.PROD
      ? `/${name}App/index.html`
      : `http://localhost:${PORT_MAP[name]}`,
    sandbox: false,
    cache: true,
    /**
     * 【关键】等待子应用异步注册 provider 的超时时间(ms)。
     * operation 的入口是 Module Federation 生成的 bootstrap, 顶层是
     *   (async()=>{...})().then(()=>import(真实入口))
     * 同步部分瞬间执行完, 而 Garfish 的 esmQueue.awaitCompletion() 只等顶层同步执行,
     * 等不到真实入口把 provider 注册到 __GARFISH_EXPORTS__, 于是 checkAndGetProvider
     * 直接 assert(provider) 失败: [Garfish warning]: "provider" is "undefined"。
     *
     * 配了它, Garfish 会提前在 __GARFISH_EXPORTS__ 上挂 registerProvider 并等待
     * (@garfish/bridge-vue-v3 会优先调它注册), 直到真实入口执行完毕。
     * 注意: 全局默认 asyncProviderTimeout: 2000 只作用于顶层配置对象,
     * App 实例实际读的是 appInfo.asyncProviderTimeout(默认 0, 不等待), 必须逐个 app 配置。
     */
    asyncProviderTimeout: 5000,
  })),
})
