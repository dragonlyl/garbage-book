# webpack

## 初始化创建

初始化创建（yarn  add  -D babel-loader @babel/core @babel/preset-env webpack）
同时创建 `wepback.config.js` 输入配置entry文件

```js
module.exports = {
    entry: './index.js'
}
// 运行webpack 指令就能执行生成dist文件
```

## main/module区别

需要在不同环境加载不同npm包内容(服务端和客户端)

所以衍生 `module` 和 `browser`

node v8.5.0 衍生了  `index.mjs` 文件 // module javascript
(加载实训 `.mjs` 优先级高于 `.js`)

[package.json 中 你还不清楚的 browser，module，main 字段优先级](https://blog.csdn.net/weixin_34396902/article/details/93170277)
[ES6 模块化的时代真的来临了么？Using MJS](https://www.jianshu.com/p/fa54a2e6e168)

main: browser/node
module: esm 规范的入口,browser/node
browser: 在browser 环境下使用

```json
  "main": "lib/index.js",  // main 
  "module": "lib/index.mjs", // module
 
  // browser 可定义成和 main/module 字段一一对应的映射对象，也可以直接定义为字符串
  "browser": {
    "./lib/index.js": "./lib/index.browser.js", // browser+cjs
    "./lib/index.mjs": "./lib/index.browser.mjs"  // browser+mjs
  },
 
  // "browser": "./lib/index.browser.js" // browser
```

配置 `package.json` 指定的入口可以有

main
module
browser
browser+cjs
browser+mjs 这 5 种情况。

`mainFields: ["browser", "module", "main"]` // 可以设置使用哪个字段导入模块(第一项优先加载)
[webpack4打包时如何默认解析package.json中main字段指定的文件](https://blog.csdn.net/huzhenv5/article/details/105346567)

因为 一般module指向是es模块化方案,在编码语法使用es5(但是如果 用的是es6编码就无法在babel中屏蔽node_modules中的js文件)

### 总结

如果 npm 包导出的是 ESM 规范的包，使用 module
如果 npm 包只在 web 端使用，并且严禁在 server 端使用，使用 browser。
如果 npm 包只在 server 端使用，使用 main
如果 npm 包在 web 端和 server 端都允许使用，使用 browser 和 main
其他更加复杂的情况，如npm 包需要提供 commonJS 与 ESM 等多个规范的多个代码文件，请参考上述使用场景或流程图

## tree-shaking和bable-preset-env

前者依赖es模块化,后者babel 配置就是一个简单的 `"presets: ["env"]"`是包含 `ES2015 modules to CommonJS transform` 的 plugin，也就是转化成 `CommonJS` 导致 tree-shaking失败, 所以babel transform 需要保留es module

[package.json 中的 Module 字段是干嘛的](https://segmentfault.com/a/1190000014286439)