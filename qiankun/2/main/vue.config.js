const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    host: 'localhost',
    port: 4000,
    proxy:{
       '/appChild': {
        target: 'http://localhost:4001/',
        pathRewrite: {
          "^/appChild": "",
        },
      },
    }
  }
})
