一、node版本
    V21.2.0

二、目录结构说明
   /child  微应用目录
   /main   主应用目录
   /doc    说明文档

二、子应用目录说明

    /vue-cli-vue2        app1 基于vue-cli+vue2，     安装依赖：npm i  启动：npm run serve  打包：npm run build
    /vue-vite-vue3-ts    app2 基于vite+ts+vue3，     安装依赖：pnpm i  启动：pnpm dev      打包：pnpm dev
    /purehtml            app3 传统的html应用，        安装依赖：npm i  启动：npm run serve  
    /childreact          app4 基于webpack+react18.x，安装依赖：npm i  启动：npm run start  打包：npm run build

三、部署说明
    1、使用nginx部署，nginx配置文件参看/doc目录
    2、四个微应用：app1、app2、app3、app4与主应用部署在同一个端口下，使用同一个端口访问
        http://localhost:5000/child/app1
        http://localhost:5000/child/app2
        http://localhost:5000/child/app3
        http://localhost:5000/child/app4
        
    3、微应用app2基于vite构建，遗憾的是qiankun官方并不支持vite，虽然有社区插件提供支持，但还是有些问题，不建议用于生产环境
       a、破坏qiankun的沙箱机制
       b、vite不支持动态修改publicPath，也就是vite.config.ts里的base字段，导致应用微前端模式/单体模式不能共存
