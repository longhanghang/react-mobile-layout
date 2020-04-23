const path = require('path')
const DllPlugin = require('webpack').DllPlugin
module.exports = {
    mode: 'production',
    entry: ['react', 'react-dom'],
    output: {
        library: 'react', //打包后接受自执行函数的变量名字
        libraryTarget: 'var', //用什么规范接受
        filename: 'react.dll.js', //打包后的文件名字
        path: path.resolve(__dirname, '../dll')
    },
    plugins: [
        new DllPlugin({
            name: 'react',
            path: path.resolve(__dirname, '../dll/manifest.json')
        })
    ]
}