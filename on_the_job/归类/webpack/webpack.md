# webpack

## 为什么使用webpack

1. 打包; 2. 翻译(es6,ts)loader; 3. 插件

打包后的变量名称的变化: 用字母可以减少体积(即没有了自己定义的可读性)

使用最简单的, index.html 然后引入index.js ,在控制台使用webpack指令就能自动生成dist文件
发现,里面的方法 会放在module在后面的数组的入参

webpack的核心
__webpack_require__(moduleId) {
}

里面有  installedModules 用来表示需要加载的模块
所以 需要 对于已加载过的内容直接把在`installedModules`里面的内容export出去, 对于未加载的模块要先存到`installedModules`里去

## 路由懒加载

[路由懒加载](https://www.cnblogs.com/cczlovexw/p/14263654.html)
```js

let arr =  [1,2,3]
for (let i = 0; i < arr.length ; i++) {
    // 通过这个方法 可以从头删到最后一个元素
    console.log(arr[i]);
    // i-- 表示 ,先将i这个位置的值删除,再将i变小
    arr.splice(i--, 1);
}
```

使用mini-css-extract-plugin 来为每个包含css的js文件都创建一个css文件。它支持css和sourceMaps的按需加载。