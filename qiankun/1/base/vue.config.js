/*
 * @Author: chenxuan
 * @Date: 2021-12-04 12:54:24
 * @LastEditTime: 2021-12-04 21:28:01
 * @LastEditors: chenxuan
 */
module.exports = {
  outputDir: "./base",
  productionSourceMap: false,
  devServer: {
    host: "0.0.0.0",
    port: 8000,
    open: true,
    proxy: {
      "/api": {
        target: "http://10.114.14.68:9100",
        changeOrigin: true,
        pathRewrite: {
          "^/api": "",
        },
      } 
    }
  }
};
