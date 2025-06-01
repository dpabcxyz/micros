# 目录说明
## /doc  开发部署文档
## mf-vite-1  应用1 部署在非根目录 /child/app1
## mf-vite-2  应用2 部署在非根目录 /child/app2
## mf-vite-3  应用3 部署在根目录

# 核心依赖
## @originjs/vite-plugin-federation
## vite-plugin-top-level-await

# 必读的核心知识要点
## 1模块联邦最初随webpack5.0推出，旨在解决微前端架构中各个子应用间共享模块的问题，基于动态容器技术，也可以用于构建微前端架构。
## 2动态容器技术，即动态注册容器，而不是通过remotes字段固化在配置文件里
## 3vite版的模块联邦貌似不支持动态容器技术，用作微前端就有些鸡肋，作为组件库来使用还是可以的
## 4host指消费其他remotes模块的应用，remote指暴露模块给其他host应用的应用
## 5某个应用可以既是host应用，又是remote应用