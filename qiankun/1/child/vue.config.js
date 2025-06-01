/*
 * @Author: chenxuan
 * @Date: 2021-12-04 12:54:33
 * @LastEditTime: 2021-12-04 21:46:38
 * @LastEditors: chenxuan
 */
const { name } = require("./package");
module.exports = {
    outputDir: "./child",
    productionSourceMap: false,
    devServer: {
      host: "0.0.0.0",
      port: 8001,
      open: false,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: {
        "/api": {
          target: "http://10.114.14.68:9100",
          changeOrigin: true,
          pathRewrite: {
            "^/api": "",
          },
        } 
      }
    },
    configureWebpack: {
      output: {
        library: `${name}-[name]`,
        libraryTarget: "umd",
        jsonpFunction: `webpackJsonp_${name}`,
      },
    },
  };