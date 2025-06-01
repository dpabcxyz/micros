/*
 * @Author: chenxuan
 * @Date: 2022-10-27 09:39:10
 * @LastEditTime: 2022-10-27 09:59:12
 * @LastEditors: chenxuan
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    host: 'localhost',
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    port: 8011,
    open: true,
    proxy: {
      '/apiPaasBase': {
        timeout: 30000, // 请求超时时间
        target: 'http://10.114.10.218:8081',
        changeOrigin: true,
        pathRewrite: {
          '^/apiPaasBase': ''
        }
      },
    }
  },
})
