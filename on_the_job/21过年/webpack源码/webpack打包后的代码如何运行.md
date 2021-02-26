# webpack打包后的代码如何运行

## 配置说明

首先通过 `npm init -y` 创建一个普通的`package.json` 文件，并在改项目中创建`webpack.config.js`文件，穿件 src目录和在其中创建 `index.js` 入口文件，并创建utils文件（工具库），在其中创建tools文件并定义工具方法，并通过`export`的方式导出。
在`index.js` 文件里面引入`utils`目录下的`tools.js`文件的函数。
最后在webpack里面引入改入口文件，如下

```js
const path = require('path');
module.exports = {
    mode: 'development',
    entry: path.resolve(__dirname, '../src/index.js'),
    output: {
        path: path.resolve(__dirname, '../dist')
    }
}
```

那么安装相关依赖(`webpack`,`webpack-cli`)之后就可以开始通过命令行 `webpack` 执行生成打包结果

## 代码分析

生成dist文件，直接查看生成的main.js文件可以看到代码的祖逖如下

```js
(function(modules) {// webpackBootstrap
    ...
})({
    "./src/index.js": (function() {...}),
    "./src/utils/tools.js": (function() {...})
})

// 立即执行函数简化demo
(function (key){console.log(key)})({'name':'Test'}) // 打印 {'name':'Test'}
```

可以看到代码代码的主体就是一个立即执行函数，并将有使用的两个文件通过对象参数的形式传入进行加载处理
那么就看里面主要的`webpackBootstrap`代码主体

```js
(function(modules) { // webpackBootstrap
  // The module cache
  var installedModules = {};

  // The require function
  function __webpack_require__(moduleId) {
    ...
  }
  __webpack_require__.m = modules;

  __webpack_require__.c = installedModules;

  __webpack_require__.d = function(exports, name, getter) {};

  __webpack_require__.t = function(value, mode) {};

  __webpack_require__.n = function(module) {};

  __webpack_require__.o = function(object, property) {};

  __webpack_require__.p = "";

  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
 })
```

可以看到一开始 定义了`__webpack_require__` 方法，需要传入`moduleId`, 在最后一行可以看到 `moduleId`就是我们传入的path路径，并传入入口文件`./src/index.js`, 所以主要加载代码是通过调用`__webpack_require__`方法

那么如何加载，

```js
function __webpack_require__(moduleId) {

   // Check if module is in cache
   if(installedModules[moduleId]) {
    return installedModules[moduleId].exports;
   }
   // Create a new module (and put it into the cache)
   var module = installedModules[moduleId] = {
    i: moduleId,
    l: false,
    exports: {}
   };

   // Execute the module function
   modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

   // Flag the module as loaded
   module.l = true;

   // Return the exports of the module
   return module.exports;
  }
```

可以看到`installedModules`是用来储存各个加载过的模块，并将其储存在对象数组里面各自的`exports`里面，在第二次再被加载直接返回`exports`里面的内容

首次加载时会标识这是首次加载，并初始化`exports`的值，之后调用作为形参对象传入的`./src/index.js`属性的属性值方法,也就是执行`index.js`里面的代码

```js

(function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/tools.js */ "./src/utils/tools.js");

... // index.js 里面原本的代码
/***/ })
```

进入后发现有依赖其他模块(`./utils/tools.js`)，那么就先加载该模块,发现里面调用`__webpack_require__.d`方法，继续查看`__webpack_require__.d`方法里面的内容，就是类似`Object.defineProperty`将`tools.js`里面所有的方法绑定到`exports`里面（即`__webpack_exports__`）就是最上层的`module`下面的`exports`属性

```js
__webpack_require__.d(__webpack_exports__, "toolFun1", function() { return toolFun1; });

__webpack_require__.d = function(exports, name, getter) {
   if(!__webpack_require__.o(exports, name)) {
    Object.defineProperty(exports, name, { enumerable: true, get: getter });
   }
};
__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
```

所以上面就实现了`module`对象中的`exports`属性内容值（记录改模块所有的代码内容）。
那么最后将`exports`值传递给`_utils_math_js__WEBPACK_IMPORTED_MODULE_0__`用于给`index.js`里面使用。

## 总结

webpack的同步引用模块其实就是先用`__webpack_require__`执行入口模块，然后如果执行的模块有其他模块，那么就再用`__webpack_require__`将其他模块执行并记录内容给自己调用直至最后结束。
