# react 基础

## react 17相对于16.8变化

(更改事件委托,移除事件池)

## react不推荐使用componentWillMount 等生命周期原因

(被废弃都是在render之前,fiber出现,可能高优先级任务打断现有任务导致被执行多次)

## react为什么是合成事件

(采用事件池减少内存开销, 不会频繁创建和销毁事件对象; 统一的处理,兼容浏览器)

## useState不能写在循环,条件或嵌套函数中的原因

(确保hook在每一次渲染中都按照同样的顺序调用)

## webpack事件流机制

taptable

## koa洋葱模型, redux中间件(实现和区别)

## 权限系统设计

## node的 event loop 和 浏览器的 event loop

## 元组

数组合并了相同类型的对象
合并了不同类型对象

1. 直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项(只初始化部分不需要)
2. 超出的索引元素是数组里面的联合类型 `t.push(string | number)`

```ts
let t: [string, number];
t = ['2', 2] // 这里需要列全两项 (而不能一项)
t[0] = '2'// 但对单项是没问题的
```

## promise

[promise](https://juejin.cn/post/7054519691368202253)
resolve 不同值区别

1. resolve 普通值或对象, 作为 `then` 回调参数
2. promise ,根据这个 `promise` 的状态来确定是 then 还是 catch
3. object 且有自己的then 方法(thenable), 根据then 方法来确定是 then 还是 catch

```js
const newPromise = new Promise((resolve, reject) => {
    resolve("resolve message")
    reject("err message")
})

new Promise((resolve, reject) => {
    // pending -> fulfilled
    resolve(newPromise)
}).then(res => {
    console.log("res:", res)
}, err => {
    console.log("err:", err)
})

```

## seo ,serverless, js-bridge, 微前端, next-js

## 基本数据类型

number, string, boolean, null, undefined, symbol, bigInt, 

## ts基本数据类型

## type 和 interface区别

## 模块机制

## treeShaking会不会有意外效果

## commonjs模块机制 ,esm模块机制对循环引用问题

## 自定义hook

## h5性能优化

## 图片懒加载原理

## 长列表优化

## useCallback使用场景,不用有什么区别

## 状态管理
