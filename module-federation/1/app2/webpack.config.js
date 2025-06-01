/*
 * @Author: chenxuan
 * @Date: 2021-12-16 23:28:40
 * @LastEditTime: 2022-04-10 00:05:23
 * @LastEditors: chenxuan
 */
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
module.exports = {
    devtool: false,
    entry: './src/index.js',
    mode: "development",
    devServer: {
      port: 3002,
      contentBase: path.join(__dirname, "dist"),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
          {
            test: /\.vue$/,
            loader: 'vue-loader'
          },
          {
            test: /\.css$/,
            use: [
              'vue-style-loader',
              'css-loader'
            ],
          },
          {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file-loader'
          }
        ]
    },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
        new ModuleFederationPlugin({
          // 必须，唯一 ID，作为输出的模块名，使用的时通过 name/{name}/name/{expose} 的方式使用；。
          name: "app2",
          // 可以将其他项目的 name 映射到当前项目中，远程其他共享模块的加载地址。
          // 用来声明会引用哪些远程文件，以及从哪里来导入远程资源
          remotes: {
            app1: "app1@http://localhost:3001/app1.js",
          },
          shared:['qs','vue','element-ui']
        })
      ]
}
