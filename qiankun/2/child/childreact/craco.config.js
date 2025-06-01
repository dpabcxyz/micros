const { name } = require("./package");

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.output.library = `${name}-[name]`;
      webpackConfig.output.libraryTarget = "umd";
      webpackConfig.output.chunkLoadingGlobal = `webpackJsonp_${name}`;
      return webpackConfig;
    },
  },
  // publicPath: '/child/app4/',
  publicPath: process.env.NODE_ENV === 'production' ? '/child/app4/' : '/',
  devServer: {
    port: 4004,
    host: '0.0.0.0',
    headers:{
      "Access-Control-Allow-Origin": "*",
    },
    proxy: { 
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  }
};
