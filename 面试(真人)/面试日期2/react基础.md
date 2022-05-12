# react 基础

## react 17相对于16.8变化

(更改事件委托,移除事件池)

## react不推荐使用 componentWillMount 等生命周期原因

(被废弃都是在render之前,fiber出现,可能高**优先级任务**打断现有任务导致被执行多次)

## react为什么是合成事件

因为fiber的机制特点,生成fiber节点他对应的dom可能还没有挂载(onClick为props又不能挂载到dom上) 所以react 提供了顶层注册,事件收集,统一触发
同时带来了一些其他好处:

1. 事件进行归类,可以在事件任务上包含不同的优先级
2. 采用事件池减少内存开销, 不会频繁创建和销毁事件对象;
3. 提供合成事件对象,磨平浏览器的兼容性差异

[深入React合成事件机制原理](https://www.zhihu.com/tardis/sogou/art/347531057)

事件对象的合成, 事件收集(事件执行路径), 事件执行

## useState不能写在循环,条件或嵌套函数中的原因

(确保hook在每一次渲染中都按照同样的顺序调用)
在 重渲染,每调用一次hook都会将其从原链表取出,进行相应的更新操作,再将其挂载到新链表上,如果有if逻辑就会造成错位
a => b => c 后续按链表调用,如果b没有运行,那么就会将原先给b的值赋给c

## react渲染流程

[react渲染流程](https://itcn.blog/p/160887.html)
[react渲染流程](https://www.cnblogs.com/axl234/p/15979080.html) // 必看

## react hook

useState, useEffect, useCallback, useMemo, useRef, useReducer

### hook原理

[这几个关键的数据结构都不会，还怎么学react源码](https://juejin.cn/post/6993150359317250085)
fiber.memoizedState 在class组件存储的是 state内容

在函数组件,指向的是hooks链表,hooks链表里面存储的都是hook对象

## webpack事件流机制

tapable: compiler 由此继承而来
[Webpack5的事件流和插件机制](https://juejin.cn/post/6918998088010956807)
[Webpack 源码（一）—— Tapable 和 事件流](https://segmentfault.com/a/1190000008060440) // 更全面

创建 compiler`[kəmˈpaɪlər]`, 加载config.js文件, compilation 开始(make, after-compiler) emit(获取完整的构建数据), done(最终写入chunk后)

## koa洋葱模型, redux中间件(实现和区别)

[详解redux中间件](https://segmentfault.com/a/1190000023787306)
[Redux 入门教程（二）：中间件与异步操作](https://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html)
将中间件放在数组里面,然后分别传入含有getStore, dispatch属性的对象,
然后通过compose 嵌套执行直至最后执行`store.dispatch`

订阅 `store.subscribe()`

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

number, string, boolean, null, undefined, symbol, bigInt

## ts基本数据类型

元组, never , void, any, 数组, 枚举, object(表示非原始类型)

## type 和 interface区别

[type 和 interface区别](https://juejin.cn/post/6844903749501059085)
共同点: 都能用于描述对象和函数

前者用于描述 类型关系 , 后者用于描述 数据结构

1. 前者能用于基本类型别名, 联合类型, 元组类型
2. 后者能申明合并,前者会报错
3. 前后者都能用于扩展, type 不能用 extends关键字符扩展

```ts
type Name = { 
  name: string; 
}
type User = Name & { age: number  };
```

```ts
interface User {
  name: string
  age: number
}

interface User {
  sex: string
}

/*
User 接口为 {
  name: string
  age: number
  sex: string 
}
*/
```

如何类型收缩 (交叉类型,联合类型)

1. 类型断言 `值 as 类型` 或者` <类型>值`
2. typeof  instanceof

## 模块机制

commonjs, es module

## treeShaking会不会有意外效果

会有, effectSide 为false

## commonjs模块机制 ,esm模块机制对循环引用问题

## 自定义hook

## h5性能优化

## 图片懒加载原理

## 长列表优化

## useCallback使用场景,不用有什么区别

## 状态管理

## react diff

[深入理解React Diff算法](https://segmentfault.com/a/1190000039021724)
[React的diff算法详解](https://www.jianshu.com/p/6b80e1d806b6) // 必看

通过oldFiber 跟reactElement比较(以它为标准生成新fiber节点), 打上effectTag (更新,新增,删除), 形成effectList链表进行操作.

使用tag 和 key 比较是否一样(都一致)

单节点更新:
单节点是新为单节点 ,而不是旧为单节点
先找到key相同的节点,删除剩余的其他oldFiber,再用匹配匹配到的oldFiber跟newChild(reactElement)新的props来生成新的fiber

多节点更新:

1. 节点删除: `newIdx === newChildren.length`, 删除剩余child,并将其以链表形式加入到父节点的effectList, 并打上effectTag = 'Delete'
2. 节点新增: `oldFiber === null`, 并将newFiber连接成以sibling为指针的单项链表
3. 节点移动: 以最后一个相同的为固定点`lastPlacedIndex`, 剩余oldFiber放入key 为键的map,里面根据key去匹配, oldFiber在`lastPlacedIndex`的右边那么以此为新基准且从map中删除,在`lastPlacedIndex`左边那么就移动位置不改变基准

tag和key不变,用oldFiber clone 一个新的fiber,props从...

总结: react的diff 通过比较oldFiber跟newChildren的tag和key,依次打上effectTag(更新,新增,删除),将其以链表的形式加入到父节点的effectList
按照上述先比对当前节点,之后比较子节点,遍历子节点,遇到 tag和key不一致的情况中断循环,并判断是否只剩下新增和只剩下删除,否则开始进行移动操作
将剩下的oldFiber放到以key为键的map里,以上个循环最后一个相同节点为基准,开始节点比较,如果找到的oldFiber索引在基准右边,那么以其为新的基准并从map中移除.如果在左边,那么移动改fiber不改变基准.不存在就新增fiber. 循环结束后最后删除剩下多余的节点

## react生命周期

挂载阶段: constructor; getDerivedStateFromProps; render; componentDidMounted
更新阶段: getDerivedStateFromProps; shouldComponentUpdate; render; getSnapshotBeforeUpdate; componentDidUpdate
卸载阶段: componentWillUnMount
错误阶段: getDerivedStateFromError; componentDidCatch

## ts高级类型

交叉类型, 联合类型, Pick, Omit, Partial

## react和vue的区别

[有react fiber，为什么不需要vue fiber？](https://www.mybj123.com/16657.html)
(前者是函数式思想, 后者响应式基于模板语法)
react组件状态不能修改, setState没有修改原来那块内存的变量,而是新开一块内存 (自顶向下重新渲染组件)
vue是精准知道那一块数据,直接修改重新渲染(Object.defineProperty Proxy劫持数据的getter和setter方法,)

### fiber出现

由于数据更新,fiber需要生成较大的虚拟dom树, 给diff带来很大的压力
(js占据主线程去做比较,渲染线程无法做其他工作,用户界面就会卡顿)

那么就将diff分成一小段一小段 (需要保存工作进度(即运行比较到哪一段))
会比较一部分虚拟dom,让渡主线程让浏览器做其他工作,然后继续比较,依次往复,等到最后比较完成,一次性更新到视图上

requestIdleCallback 在浏览器闲置的时间, timeRemaining 返回还有多少时间处理节点

fiber这种结构使节点可以回溯到其父节点,只要保留中断的节点,就可以回复之前的工作进度(老架构是树,)

### 优劣

那么react是不是比vue性能差呢
vue精准更新是有代价的, 需要给每个组件配置"监视器", 管理着视图依赖收集和数据更新时发布通知(性能消耗). 2.模板语法,实现静态编译,而不同于 jsx语法的灵活性

## 数据监测

Navigator.sendBeacon(url,data), 由于浏览器兼容,会用 image 来做兜底
image 能够跨域,且不需要挂载到dom上, 只需要设置src就会发送请求. 同时静态页面会禁用脚本,影响script使用
发送的请求是1*1的Gif图片,因为同格式下,gif大小更小(性能消耗更小)

>sendBeacon: 1. cors(不需要预请求); 2. 优先级较低; 3.可以放到unload处理[用 sendBeacon 发送分析信息的优点](https://www.csdn.net/tags/NtzaggwsMTg0NTYtYmxvZwO0O0OO0O0O.html)

### 性能监测

通过 performance.timing api 获取

### 错误监测

原生 dom 用 onError 和 unhandledrejection(promise内部抛出的error)

react 可以用错误边界 `ErrorBoundary` 包起来, 通过其静态返回错误,用`componentDidCatch`来接收返回

```js
static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, errorInfo) {
    // 调用我们实现的SDK实例
    insSDK.error(error, errorInfo)
  }
```

vue 用 errorhandler
监听vue.config.errorhandler 方法（捕获vue生命周期，自定义事件，v-on内容，和promise链的错误内容）并解析错误内容，通过ravenjs来处理错误栈里面的信息将其转换为对象形式，然后提交错误信息内容。然后写了webpack的插件，在webpack的done的钩子去提交sourcemap内容，然后后续通过后端查询source-map去解析出错误真实的行列数。最后在页面中集成错误内容用echart进行展示分析错误原因

## js垃圾回收

标记清除法: 从根节点出发被引用的对象打上标记,清除没有标记的对象
引用计数: 一个值如果被引用就计数加一,如果引用为0,就被清除(循环引用)

## Symbol作用

1. 产生一个不会重复的变量(用来标记对象属性)
2. 用来标识可遍历的对象 `arr[Symbol.iterator]` // 是个`function`

## setState是同步还是异步

[setState 是同步还是异步的呀](https://juejin.cn/post/6996846391108567077)

1. 能被react控制的范围调用是异步的, 因为会收集批量更新(状态合并后再进行dom调用) ( `setState` 的合并动作不是单纯地将更新累加。比如这里对于相同属性的设置，React 只会为其保留最后一次的更新)
2. 在原生js控制范围是同步的(`addEventListener`, 定时器回调函数,ajax回调) setState会立即更新dom

总结: react控制得到的就是异步,控制不到的就是同步

> 1. setState是同样的值也会触发render;
> 2. 接连的setState操作会合并(即对同一个数据进行操作会只变成一次)
> 3. 如果是setState通过函数改变,那么函数调用无法合并会操作两次

总结: 调用setState就会触发render (除了 `setState(null)` 不会)

## vite对比webpack

1. 后者需要打包成 `bundle`, 前者(依赖: 用 `esbuild` 预构建依赖; 源码: 用`es module` 方式给浏览器(按需加载))

2. 更新: 模块内容改变时,让浏览器重新去请求该模块,而不是像后者重新将该模块所有依赖重新编译

热更新: 通过服务以及websocket(浏览器和服务器通信, 当模块修改, 发送消息给客户端)

## ts和js

静态类型判断

## react link

a标签页面跳转,页面会重新加载
link只会去触发匹配对应页面, 拦截a标签默认操作, 通过 history的 pushState进行修改

withRouter, 可以让组件有能力获取router中的内容,子组件的 props就有如下属性 history, location ,match{params}

## forwardRef

用来给函数式组件绑定ref的引用
