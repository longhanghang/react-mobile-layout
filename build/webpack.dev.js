
const merge = require("webpack-merge");
const base = require("./webpack.base");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const Webpack = require("webpack");

module.exports = (env) =>{
    let uat = env.uat;
    let sit = env.sit;
    let dev = env.dev;
    let prod = env.prod;

    const devConfig = {
        mode: "development",
        devtool: "source-map",
        devServer: {
            progress: true, //进度条
            contentBase: false,
            compress: true,
            host: "0.0.0.0",
            port: 8086,
            compress: true, //服务器返回给浏览器的时候是否gizp压缩
            inline: true,
            hot: true,
            proxy:{}
        },
        plugins:[
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, "../public/index.html"),
                filename: "index.html",
              }),

              new Webpack.DllReferencePlugin({
                manifest: path.resolve(__dirname, "../dll/manifest.json")
              }),
              new AddAssetHtmlPlugin({
                filepath: path.resolve(__dirname, "../dll/react.dll.js")
              }),
              new Webpack.DefinePlugin({
                UAT: uat,
                SIT:sit,
                DEV:dev,
                PROD:prod
              }),
            new Webpack.NamedModulesPlugin(), //打印更新的模块路径
            new Webpack.HotModuleReplacementPlugin() //热更新插件
        ]
    }

    return merge(base, devConfig);
}