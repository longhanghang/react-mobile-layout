const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const Webpack = require("Webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) =>{
    let uat = env.uat;
    let sit = env.sit;
    let dev = env.dev;
    let prod = env.prod;

    console.log("uat----------"+uat);
    console.log("sit----------"+sit);
    console.log("dev----------"+dev);
    console.log("prod----------"+prod);

    const build = {
        mode:"production",
        output:{
            publicPath:prod ? "/static/hsc_app_re/" : "/hsc_app_re/"
        },
        optimization:{
            splitChunks: {
                chunks: "all", //异步代码分割
                minSize: 30000, //超过30k抽离
                maxSize: 0,
                minChunks: 1, //最少模块引用一次
                maxAsyncRequests: 5,
                maxInitialRequests: 3, //首屏最多3个
                automaticNameDelimiter: "~",
                automaticNameMaxLength: 30, //最长名字大小
                name: true,
                cacheGroups: {
                  //缓存组
                  react: {
                    test: /[\\/]node_modules[\\/](react)|(react-dom)/,
                    priority: 1
                  },
                  vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                  },
                  default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                  }
                }
              },
              minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
        },
        plugins:[
          new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../public/index.html"),
            filename: "index.html",
            minify: {
              removeAttributeQuotes: true,
              collapseWhitespace: true
            },
           // excludeChunks: ["dbr","repay"]
          }),
          // new HtmlWebpackPlugin({
          //   template: path.resolve(__dirname, "../public/index.html"),
          //   filename: "dbr.html",
          //   minify:{
          //     removeAttributeQuotes: true,
          //     collapseWhitespace: true
          //   },
          //   excludeChunks: ["app","repay"]
          // }),
          // new HtmlWebpackPlugin({
          //   template: path.resolve(__dirname, "../public/index.html"),
          //   filename: "repay.html",
          //   minify:{
          //     removeAttributeQuotes: true,
          //     collapseWhitespace: true
          //   },
          //   excludeChunks: ["app","dbr"]
          // }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: "**/*"
              }),
            new Webpack.DefinePlugin({
              UAT: uat,
              SIT:sit,
              DEV:dev,
              PROD:prod
            }),
        ]
    }
    return merge(base,build);
}