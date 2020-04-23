const path = require("path");
const HappyPack = require("happypack");//性能优化化
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Webpack = require("webpack");
const theme = require("../package.json").theme;

module.exports = {
        //打包入口文件
        entry:{
            app: path.resolve(__dirname, "../src/index.js"),
        },
        //打包后输出文件
        output:{
            path: path.resolve(__dirname, "../dist"),
            filename: "[name].[hash:8].js", //出口
            chunkFilename: "[name].[hash].min.js",
        },
        //配置处理模块的loader
        module:{
            rules:[
                { 
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader:"happypack/loader?id=jsx"
                },
                {
                    test: /\.(jpe?g|png|gif)$/,
                    use: [
                      {
                        loader: "url-loader",
                        options: {
                          limit: 10 * 1024,
                          name: "images/[contenthash].[ext]"
                        }
                      }
                    ]
                  },
                {
                    test: /\.(woff|ttf|eot)$/,
                    use: "file-loader"
                },
                {
                    test: /\.css$/,
                    use: [
                      MiniCssExtractPlugin.loader,
                      {
                        loader: "css-loader",
                        options: {
                          importLoaders: 3
                        }
                      },
                      {
                        loader: "px2rem-loader",
                        options: {
                          remUnit: 75,
                          remPrecision: 8
                        }
                      },
                      "postcss-loader",
                      "less-loader"
                    ]
                  },
                  {
                    test: /\.less$/,
                    use: [
                       MiniCssExtractPlugin.loader,
                      "css-loader",
                      {
                        loader: "px2rem-loader",
                        options: {
                          remUnit: 75,
                          remPrecision: 8
                        }
                      },
                      "postcss-loader",
                      {
                        loader: "less-loader",
                        options: {
                          sourceMap: true,
                          modifyVars: theme,
                          javascriptEnabled: true
                        }
                      }
                    ]
                  }
                ]
        },
        //配置全局插件
        plugins:[
            //额外开5个进程用来处理babel-loader和eslint-loader处理jsx，避免影响主流程
            new HappyPack({
              id:"jsx",
              threads:5,
              loaders:["babel-loader","eslint-loader"]
              }),
            //分离css文件
           new MiniCssExtractPlugin({
               filename:"css/[name].[hash].css",
               chunkFilename:"[id].[hash].css"
           }),
           new Webpack.IgnorePlugin(/\.\/locale/, /moment/),
        ],
        //配置找出依赖模块的规则
        resolve:{
            modules: [path.resolve("node_modules"), path.resolve("lib")],
            alias: {
              // 别名
              "@common": path.join(__dirname, "../src/common/"),
              "@components": path.join(__dirname, "../src/components/"),
              "@redux": path.join(__dirname, "../src/redux/"),
              "@utils": path.join(__dirname, "../src/utils/"),
              "@": path.join(__dirname, "../src")
            },
            extensions: [".js", ".jsx", ".less", ".css", ".json"] //省略扩展名
        }
}