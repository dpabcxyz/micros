module.exports = {
  devServer: {
    host: '0.0.0.0',
    headers: {
        'Access-Control-Allow-Origin': '*'
    },
    port: 8000,
    open: true,
    proxy:{
      '/apiUcac': {
        target: `http://10.64.15.86:9085`,
        changeOrigin: true,
        pathRewrite: {
          '^/apiUcac': ''
        }
      },
      '/app1': {
         target: 'http://localhost:3001/',
        changeOrigin: true,
        pathRewrite: {
          "^/app1": "",
        },
      },
      '/app2': {
        target: 'http://localhost:3002/',
        changeOrigin: true,
        pathRewrite: {
          "^/app2": "",
        },
      },
      '/app3': {
        target: 'http://localhost:3003/',
        changeOrigin: true,
        pathRewrite: {
          "^/app3": "",
        },
      }
    }

  },

}