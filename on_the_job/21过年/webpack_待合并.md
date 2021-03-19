# 待合并

## resolve

```js
resolve: {
    // 由于查找包的时候会去当前目录的node_modules，找不到会去上层的
    // 那么这里自己告诉查询的范围就当前目录的node_modules, 不用去上层了
    // 也可以告诉，当前dist目录也有一些模块
    modules: [path.resolve('node_modules'), path.resolve('dist')],
    // 或者通过 mainFile 指定读取包的读取入口字段(默认是package.json 的 main路径)
    mainFields: ['style', 'main'],
    mainFiles: [], // 入口文件的名字 index.js  默认指定文件名
    // 别名
    alias: {
        bootstrap: 'bootstrap/dist/css/bootstrap.css'
    }
}
```

## 定义环境变量

```js
new webpack.DefinePlugin({
    // 必须使用双引号 包裹字符串
    // DEV: "'dev'"
    // 或者用下面的写法
    DEV: JSON.stringify('dev')
    // 可以在js中打印类型， 其实是布尔类型
    FLAG: "true"

})

那么就可以在js代码里面使用判断
if (DEV === 'dev') {
  // 链接的服务ip xxx
}
console.log(typeof FLAG);
```

这样还是要改变 `webpack.config.js` 里面的代码，分别写两个文件 ，dev.js prod.js base.js

可以在开发里面配置devTool(打包后的内容)，proxy 代理服务器
在发布环境里配置 代码压缩以及省略console.log

```js
// 通过使用merge 库将几个配置文件代码合并使用
let {smart} = require('webpack-merge');
let base = require('webpack.base.js');
module.exports = smart(
    base, {
        mode: 'production'
    }
)
```

`npm  run build --config webpack.dev.js`

```js
webpack --config XXX.js //使用另一份配置文件（比如webpack.config2.js）来打包

webpack --watch //监听变动并自动打包

webpack -p//压缩混淆脚本，这个非常非常重要！
// -p 是很重要的参数，曾经一个未压缩的 700kb 的文件，压缩后直接降到 180kb （主要是样式这块一句就独占一行脚本，导致未压缩脚本变得很大）
webpack -d//生成map映射文件，告知哪些模块被最终打包到哪里了其中的 
webpack --progress //显示进度条
webpack --color //添加颜色
```
