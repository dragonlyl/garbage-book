const path = require('path');

module.exports = {
    // [devtool](https://zhuanlan.zhihu.com/p/265266279)
    // 用来表示调试的时候看到的内容
    // source-map 产生一个单独的source-map文件，功能最完全，但会减慢打包速度
    //  eval-source-map ：使用eval打包源文件模块，直接在源文件中写入干净完整的source-map，不影响构建速度，但影响执行速度和安全，建议开发环境中使用，生产阶段不要使用
    // devtool: 'source-map',
    devtool: 'cheap-module-source-map',
    mode: 'development',
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist')
    }
}