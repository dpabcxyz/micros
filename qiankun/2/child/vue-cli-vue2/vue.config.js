const { defineConfig } = require('@vue/cli-service')
const { name } = require("./package");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production' ? '/child/app1/' : '/',
  devServer: {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    host: 'localhost',
    port: 4001
  },
  configureWebpack: {
    output: {
      library: `${name}-[name]`,
      libraryTarget: 'umd', // 把微应用打包成 umd 库格式
      chunkLoadingGlobal: `webpackJsonp_${name}`, // webpack 5 需要把 jsonpFunction 替换成 chunkLoadingGlobal
    },
  },
})
