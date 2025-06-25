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