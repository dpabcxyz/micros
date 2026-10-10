# Garfish 子应用路由切换不显示问题记录

> 记录时间：2026-08-26
> 涉及项目：新版调度（主应用 `main`、子应用 `operation` / `runtime`）
> 涉及版本：Garfish ^1.19.12、@garfish/bridge-vue-v3 ^1.19.12、vue-router ^5.2.0

---

## 一、现状描述

### 1. 问题现象

通过主应用左侧导航菜单切换子应用（`operation` / `runtime`）内部路由时，**经常不显示**（页面空白或停留在旧页面），但**直接修改浏览器地址栏 URL 可以正常显示**。

以 `main/src/mock/menus.ts` 中两条菜单为例：

```ts
// 第 45 行
menuUrl: "micro*operation*/test2",   // operation 子应用 test2 页面

// 第 73 行
menuUrl: "micro*runtime*/test2",     // runtime 子应用 test2 页面
```

复现路径：

- ❌ 点击左侧菜单：`运行监控(test1) → 运维统计(test2)`，页面不切换 / 空白
- ❌ 跨子应用切换后再切回：`operation → runtime → operation`，内部路由与 URL 不一致
- ✅ 直接在地址栏输入 `/operation/test2` 回车：正常显示

### 2. 触发场景汇总

| 场景 | 现象 |
| --- | --- |
| 同一子应用内路由切换（test1 → test2） | 不切换 / 空白 |
| 跨子应用切换后切回（缓存恢复） | 内部路由停留在切走时的旧状态 |
| 直接修改地址栏 URL（整页刷新） | 正常 |
| 子应用独立运行（`!window.__GARFISH__`） | 正常 |

---

## 二、原因分析

### 1. 核心结论

这是 **Garfish 微前端主应用 URL 变化无法驱动子应用内部 vue-router 同步** 导致的，不是菜单代码或路由配置写错。

### 2. 技术背景

菜单点击的执行链路（`main/src/views/layout/sideBar/menus/menuTemplate.vue`）：

```ts
const handleClick = (menuUrl: string): void => {
  const currentApp = menuUrl.split('*')[1];
  const path = menuUrl.split('*')[2];
  store.setCurrentApp(currentApp);
  router.push(`/${currentApp}${path}`);   // SPA 内部导航
}
```

主应用配置（`main/src/main.ts`）：

```ts
Garfish.run({
  basename: '/',
  apps: [
    { name: 'runtime',   activeWhen: '/runtime',   domGetter: '#runtimeApp',   sandbox: false, cache: true },
    { name: 'operation', activeWhen: '/operation', domGetter: '#operationApp', sandbox: false, cache: true },
  ],
});
```

### 3. 根因拆解（结合 Garfish 源码 `packages/router/src/linkTo.ts` / `agentRouter.ts`）

**关键点 1：`history.pushState` 不触发 `popstate` 事件**

菜单点击走的是 vue-router 的 `router.push`，内部调用原生 `history.pushState`。而原生 `pushState` **不会触发 `popstate` 事件**，子应用 vue-router 依靠 `popstate` 感知 URL 变化，因此收不到任何通知。

**关键点 2：同一子应用内切换时，Garfish 不重新激活子应用**

`router.push('/operation/test2')` 后，Garfish 检测到 URL 仍匹配 `activeWhen: '/operation'`，判定该应用"仍处于激活状态"，因此：

- 不会重新调用 `provider.mount()`；
- 不会销毁/重建子应用；
- 仅更新自身路由上下文 `RouterConfig.current`，并通过 `callCapturedEventListeners` 尝试触发子应用的 popstate 监听器。

**关键点 3：`sandbox: false` 导致 Garfish 捕获不到子应用的监听器**

`callCapturedEventListeners` 触发的是 Garfish 在 JS 沙箱中**捕获并缓存**的监听器。本项目配置了 `sandbox: false`，子应用的 `popstate` 监听器直接注册在全局 `window` 上，Garfish 无法捕获到，导致该机制失效。

**关键点 4：`cache: true` 导致缓存恢复时内部路由滞后**

跨子应用切换（`operation → runtime`）时，`operation` 实例被缓存（`cache: true`），Vue 实例、DOM、内部 vue-router 全部保留。切回 `operation` 时直接复用缓存实例，内部 vue-router 的 `currentRoute` 仍停留在切走时的旧路由，与当前 URL 不一致。

**关键点 5：直接改地址栏为何正常**

直接修改地址栏 URL 会触发**整页刷新**，主应用与子应用全部重新初始化，子应用 vue-router 在创建时基于当前 URL 解析初始路由，天然正确。

### 4. 链路图

```
点击菜单 → router.push → history.pushState（不触发 popstate）
        → Garfish patch 检测到 URL 变化 → linkTo 匹配
        → 同一子应用内切换：应用仍激活 → 不重新 mount
        → callCapturedEventListeners（sandbox:false 捕获不到，失效）
        → 子应用 vue-router 无感知 → 页面不切换 ✗

直接改地址栏 → 整页刷新 → 子应用基于当前 URL 重新初始化 → 正常 ✓
```

---

## 三、解决方案

### 1. 思路

通过**自定义事件**桥接「主应用 URL 变化 → 子应用内部路由同步」：

1. 主应用路由每次变化后（`router.afterEach`）派发自定义事件 `app-url-change`；
2. 子应用监听该事件（及浏览器前进后退的 `popstate`），把当前 URL 减去自身 `basename` 得到内部路径，同步到内部 vue-router。

采用自定义事件而非手动派发 `popstate` 的原因：手动派发 `popstate` 会同时触发子应用 vue-router 的原生监听器，跨子应用切换时旧子应用会收到与自己 basename 不匹配的 URL 而导致页面变空白；自定义事件只有子应用自身的同步逻辑响应，且按 basename 过滤天然隔离。

### 2. 修改内容

#### 2.1 主应用：`main/src/router/index.ts`

在 `router.beforeEach` 之后新增 `router.afterEach`：

```ts
// 主应用 URL 变化后, 通知子应用同步内部路由。
// 原因: 菜单点击走的是 SPA 内部 router.push(原生 pushState 不触发 popstate),
// 且 Garfish 配置了 cache: true + sandbox: false,
// - 同一子应用内切换时, Garfish 判定应用仍激活, 不会重新激活/通知子应用;
// - 跨子应用切换(缓存恢复)时, 子应用内部 vue-router 停留在旧路由, 与 URL 不一致。
// 直接修改地址栏之所以正常, 是因为整页刷新后子应用会基于当前 URL 重新初始化。
// 这里统一派发自定义事件, 由子应用按各自的 basename 过滤并同步内部路由。
router.afterEach(() => {
  window.dispatchEvent(new CustomEvent('app-url-change'))
})
```

#### 2.2 子应用 `operation` / `runtime`：`src/main.ts`

修改 `newRouter` 函数，添加 URL 同步逻辑：

```ts
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
```

### 3. 修改文件清单

| 文件 | 修改点 |
| --- | --- |
| `main/src/router/index.ts` | 新增 `router.afterEach`，派发 `app-url-change` 事件 |
| `operation/src/main.ts` | `newRouter` 中新增 `syncRoute`，监听 `app-url-change` / `popstate` |
| `runtime/src/main.ts` | `newRouter` 中新增 `syncRoute`，监听 `app-url-change` / `popstate` |
| `design/src/main.ts` | `newRouter` 中新增 `syncRoute`，监听 `app-url-change` / `popstate`（Garfish 注册启用后生效） |

---

## 四、方案覆盖场景验证

| 场景 | 是否覆盖 | 说明 |
| --- | --- | --- |
| 同一子应用内路由切换 | ✅ | 主应用派发事件 → 子应用同步内部路由 |
| 跨子应用切换后缓存恢复 | ✅ | 切回时事件派发，监听器仍在（JS 只加载一次） |
| 跨子应用切换（旧子应用） | ✅ | URL 不以自己 basename 开头 → 忽略，互不干扰 |
| 浏览器前进/后退 | ✅ | 监听 `popstate` 同步 |
| 直接修改地址栏（刷新） | ✅ | 子应用基于当前 URL 初始化，天然正确 |
| 子应用独立运行 | ✅ | 无主应用派发事件，逻辑不生效、无副作用 |
| 首次进入子应用 | ✅ | router 初始化基于当前 URL，无需事件兜底 |

> 使用 `router.replace` 而非 `push`，避免在浏览器历史中产生额外记录；
> 同步后 URL 与当前一致，`replaceState` 到相同地址不会触发 Garfish 重新派发，无循环风险。

---

## 五、补充说明

- 若后续放开 `design` 子应用（`main/src/main.ts` 中已注释），需按相同方式在 `design` 的 `src/main.ts` 中补充 `syncRoute` 逻辑。
- 生产环境子应用入口为 `entry: '/operationApp/index.html'`、`'/runtimeApp/index.html'`，URL 结构一致，方案同样适用。
- 子应用 `src/main.ts` 中保留了 `console.log("basename:", basename)` 调试日志，验证时可在控制台确认 basename 分别为 `/operation`、`/runtime`。
