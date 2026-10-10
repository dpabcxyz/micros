# Garfish 微前端生产白屏问题记录

> 涉及应用：`main`（主应用/壳）、`operation`（子应用）、共享依赖构建（`main/shared.vite.config.ts`）
> 关键词：Garfish、provider is undefined、白屏、importmap、module-federation、共享依赖
> 关联文档：[Garfish微前端依赖共享方案.md](./Garfish微前端依赖共享方案.md)（依赖共享方案的完整说明与代码片段）

---

## 一、症状

子应用独立运行（直接访问子应用端口）一切正常，dev 环境一切正常；
**生产构建部署后，通过主应用 Garfish 壳加载子应用时白屏**。

控制台典型报错（按因果链自上而下）：

1. `ReferenceError: process is not defined`
   —— 加载共享产物 `assets/shared/vue.js` 时抛出。
2. `The requested module '/assets/shared/vue-router.js' does not provide an export named 'RouterView'`
   （同类还有 `useRoute`、`storeToRefs`、`ElButton` 等）
   —— 子应用入口模块**链接（link）阶段**直接失败。
3. Garfish 报错：`"provider" is "undefined"`（`assert(provider)` 失败）
   —— 入口模块加载失败 → Garfish 拿不到子应用导出的 `provider` → 微前端白屏。

报错 1、2 是"因"，报错 3 是"果"。凡是在 Garfish 场景看到 `provider is undefined`，
优先怀疑**子应用入口模块或其依赖链上有模块加载/链接失败**。

---

## 二、根因分析（四个问题叠加）

### 根因 1：裸标识符 + importmap 方案对 Garfish 完全无效

最初方案：子应用构建时把 `vue` / `vue-router` / `pinia` external 掉（产物里保留裸标识符
`import { createApp } from 'vue'`），再在子应用 `index.html` 里写 importmap 把裸标识符映射到
`/assets/shared/*.js`。

**importmap 只作用于浏览器原生的模块解析**。而 Garfish 加载子应用的机制是：
自己 fetch 模块源码 → 字符串重写 → `blob:` URL 动态 import，**全程不经过浏览器的模块解析器**，
importmap 对它完全无效。

于是裸标识符 `'vue'` 被 Garfish 按**相对 URL** 去 fetch（如 `/operationApp/assets/vue`）→
404，或命中 nginx SPA fallback 返回 `index.html`——HTML 当 JS 执行 →
入口模块加载失败 → Garfish 拿不到 provider → 白屏。

### 根因 2：library 模式构建不会注入 `process.env.NODE_ENV`

共享依赖改用 Vite library 模式独立构建后，产物里 vue 的 esm-bundler 代码中到处是
`process.env.NODE_ENV` 条件分支。**只有应用模式构建才注入这个变量，library 模式不会替换**，
浏览器直接抛 `ReferenceError: process is not defined`，共享库加载即失败。

### 根因 3：rolldown/rollup 的 chunk 导出集由消费者决定（导出裁剪）

更早的方案是靠主应用 `codeSplitting` 从业务代码里拆出 `assets/shared/*.js` chunk 给子应用复用。
但 chunk 的**导出集只包含「主应用实际引用过的符号」**：

- 实测主应用构建出的 `vue-router.js` 只剩
  `export { createRouter, createWebHistory, useRouter }`；
- `pinia.js` 只剩 `createPinia`、`defineStore`；
- `element-plus.js` 因主应用是 `import ElementPlus from 'element-plus'` 全量 default 注册，
  chunk 里**只有 default 导出**，没有 `ElButton` 等命名导出。

子应用一旦 `import { RouterView } from 'vue-router'` 或 `import { ElButton } from 'element-plus'`，
模块链接直接失败：`does not provide an export named '...'`。
普通应用构建里无论 `preserveEntrySignatures` 还是命名空间导入，都绕不过这道导出集裁剪。

### 根因 4：`__vitePreload` 与 blob URL 冲突，路由懒加载全挂

Vite 默认把动态 import 包装成 `__vitePreload(() => import(...), deps)`，内部用
`import.meta.resolve()` 计算依赖 URL。Garfish 以 `blob:` URL 执行子应用模块，
`import.meta.resolve()` 以 `blob:` 为 base 解析直接抛
`"base scheme isn't hierarchical"` → 所有路由懒加载 chunk 加载失败。

---

## 三、解决方案

核心思路：**共享依赖用 library 模式独立构建出符号表完整、路径固定的 ESM 产物；
子应用构建时直接把裸标识符改写成指向该产物的绝对路径 import，彻底绕开 importmap。**

### 3.1 主应用：新增共享依赖独立构建（`main/shared.vite.config.ts`）

- 用 Vite **library 模式**把 `vue` / `vue-router` / `pinia` / `element-plus` 打成独立产物：
  `dist/assets/shared/{vue,vue-router,pinia,element-plus}.js`（`entryFileNames: '[name].js'`，固定路径不带 hash）。
  library 模式自动 `preserveEntrySignatures: 'strict'`，入口的 `export * from 'xxx'` 完整保留，
  产物即一份**符号表完整**的 ESM。
- `define: { 'process.env.NODE_ENV': '"production"' }` —— 解决根因 2。
- `external` 按 importer 区分 vue 的处理：
  - `src/shared/vue.ts` 这个入口本身要产出 vue 运行时，**不能** external
    （否则 `vue.js` 只剩 `export * from 'vue'` 指回自己，循环解析失败）；
  - 被 `vue-router` / `pinia` / `element-plus` 引用的 vue **必须** external
    （否则各自打进一份 vue 运行时，多实例，响应式失效）。
- `output.paths: { vue: './vue.js' }` —— 把 external 的 vue 在产物里重写成**相对路径**而不是裸标识符。
  相对路径对两条链路都成立：
  - 浏览器独立访问：`./vue.js` 相对 `/assets/shared/` 解析 ✓
  - Garfish fetch 重写：按模块所在目录解析为 `/assets/shared/vue.js` ✓
- `emptyOutDir: false` —— 与主应用共用同一个 `dist`，不能清空主应用产物。
- 主应用 `index.html` 的 importmap 指向这批固定路径产物。
- **部署约束：主应用构建与该共享构建的产物必须一起发布。**

### 3.2 子应用：构建时改写共享依赖为绝对路径（`operation/vite.config.ts`）

- 自定义 `shared-externals` 插件（`enforce: 'pre'`、`apply: 'build'`）：

  ```ts
  const SHARED_IMPORTS: Record<string, string> = {
    vue: '/assets/shared/vue.js',
    'vue-router': '/assets/shared/vue-router.js',
    pinia: '/assets/shared/pinia.js',
    'element-plus': '/assets/shared/element-plus.js',
  }
  // resolveId(source) → { id: '/assets/shared/vue.js', external: true }
  ```

  产物里直接写 `import { createApp } from '/assets/shared/vue.js'`。
  绝对路径对两条链路都成立：
  - Garfish 重写：`new URL('/assets/shared/vue.js', baseUrl)` → 同源绝对路径 ✓
  - 浏览器独立访问：绝对路径直接请求 ✓（**子应用 `index.html` 不再需要 importmap，已删除**）
  - dev 环境 `apply: 'build'` 不生效，从 `node_modules` 正常加载 ✓

- **单实例保障**：主应用 importmap 与子应用绝对路径最终指向**同一个 URL**
  `/assets/shared/vue.js`，浏览器按 URL 做模块缓存去重 → 天然单实例。
  与主应用的 "external + importmap" 方案殊途同归。

- `build.modulePreload: false` —— 关闭 `__vitePreload` 包装（解决根因 4）。
  关闭后动态 import 保持裸 `import('./chunk.js')`，由 Garfish 重写接管，
  独立运行则由浏览器原生处理，两条链路都通。
  （modulepreload link 对 Garfish 的 fetch 驱动加载本来就没有作用。）

- `build.emptyOutDir: true` —— `outDir` 在项目根之外（`../dist/operationApp`）时
  Vite 默认不清空，旧 hash chunk 会残留，必须显式开启。

### 3.3 不共享、各自打包的依赖（保持默认，不 external）

| 包 | 原因 |
|---|---|
| `element-plus` | **已改为共享**：由 `src/shared/element-plus.ts`（`export *` + `export { default }`）以 library 模式构建，`ElButton` / `ElMessage` 等命名导出完整保留（绕开根因 3 的导出裁剪），EP 内部引用的 vue external 到共享 `vue.js` 保证单实例，其自身依赖（dayjs / lodash-es 等）打进该 chunk 成为全局唯一副本。注意只 external 裸包名，`element-plus/dist/index.css` 等子路径仍由各应用自己打包 |
| `@element-plus/icons-vue` | 不共享，各应用自己打包 |
| `axios` | 各子应用自己打自己的，避免请求/响应拦截器跨应用互相污染（federation `shared` 里 `singleton: false`） |
| `pinia-plugin-persistedstate`、`@garfish/bridge-vue-v3` | operation 特有，无共享需求 |

### 3.4 module-federation 配置注意点

- `dts: false`：远程 `GienComponents` 未开启 `dts: true`，产物中没有 `@mf-types.zip`，
  开启 dts 消费只会下载失败并产生告警；待 components 侧生成类型后再打开。
- 不要开 `inlineDynamicImports`：与 Vite 8 推荐的 codeSplitting 互斥，
  且会干扰 federation 插件的 chunk 分割。

---

## 四、排查与验证清单

遇到 Garfish `provider is undefined` / 微前端白屏时按此顺序排查：

1. **打开 Network 面板**，看子应用入口模块及其 import 链上是否有 404 / 返回 HTML 的请求
   （SPA fallback 返回的 `index.html` 当 JS 执行是最常见的坑）。
2. **看 Console 第一条报错**是 `process is not defined`、
   `does not provide an export named` 还是 `base scheme isn't hierarchical`，
   分别对应根因 2 / 3 / 4。
3. 检查产物：子应用构建产物里**不应出现** `vue` 等裸标识符 import，
   应是 `/assets/shared/*.js` 绝对路径。
4. 检查 `dist/assets/shared/{vue,vue-router,pinia}.js` 三个文件存在、
   且 `vue-router.js` / `pinia.js` 里对 vue 的引用是 `./vue.js` 相对路径。
5. 确认主应用与共享构建**同一批发布**，版本一致。
6. 验证路由懒加载：切换子应用路由，动态 chunk 能正常加载（无 `__vitePreload` 报错）。

---

## 五、相关文件

- `main/shared.vite.config.ts` —— 共享依赖 library 构建配置（新增）
- `main/src/shared/{vue,vue-router,pinia,element-plus}.ts` —— 共享库入口（`export * from 'xxx'`）
- `main/index.html` —— 主应用 importmap
- `main/vite.config.ts`、`main/src/main.ts`、`main/package.json` —— 主应用配套修改
- `operation/vite.config.ts` —— `shared-externals` 插件、`modulePreload: false`、`emptyOutDir: true`
- `operation/index.html` —— 已移除 importmap（构建后不再依赖）
