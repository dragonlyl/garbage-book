# jsx配置

安装babel loader core preset-env webpack

配置webpack.config.js 文件

配置babel 同时配置 `babel-plugin-transform-react-js` 插件
[babel-plugin-transform-react-jsx](https://www.npmjs.com/package/babel-plugin-transform-react-jsx)
[](https://babeljs.io/docs/en/babel-plugin-transform-react-jsx#docsNav)
```js
mode: "development", // 开发模式
optimization: {
    minimize: false // 打包出来的内容不压缩 可读
},
```

使用这个插件 引入 div 发现 是 `React.createElement("div", null, "test")` // 所以是jsx的一个语法糖
