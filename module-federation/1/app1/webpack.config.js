/*
 * @Author: chenxuan
 * @Date: 2021-12-16 23:28:02
 * @LastEditTime: 2022-05-28 01:40:37
 * @LastEditors: chenxuan
 */
const path = require('path');
// vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin的,
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;

module.exports = {
    devtool: false,
    entry: './src/main.js',
    mode: "development",
    devServer: {
      port: 4001,
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
          },   
        ]
    },
    plugins: [
        // 请确保引入这个插件！
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html')
        }),
        new ModuleFederationPlugin({
            // 提供给其他服务加载的文件 可自定义
            filename: "app1.js",
            // 唯一ID，用于标记当前服务
            name: "app1",
            library: { type: "var", name: "app1" },
            // 表示导出的模块，只有在此申明的模块才可以作为远程依赖被使用。
            // 用来声明会提供哪些资源供远程使用
            exposes: {
              './Buttons': "./src/components/Buttons.vue",
            },
            // shared:['qs','vue','element-ui']
        })
      ]
}
