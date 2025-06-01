/*
 * @Author: hsj
 * @Date: 2021-08-18 13:34:53
 * @LastEditTime: 2022-07-08 23:34:23
 * @LastEditors: chenxuan
 */
module.exports = {
  devServer: {
    host: 'localhost',
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    port: 3003,
    open: true,
    proxy: {
      '/apiUcac': {
        target: `http://10.64.15.86:9085`,
        changeOrigin: true,
        pathRewrite: {
          '^/apiUcac': ''
        }
      },
    },

  },

}