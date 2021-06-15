# 新内容

## Git flow

代码提交

## 代码自动化部署

Jenkins

## 代码自动生成

[若依管理系统](http://vue.ruoyi.vip/tool/gen)

## pv uv

## 错误监控

[什么是ARMS前端监控？](https://help.aliyun.com/document_detail/58652.html?spm=5176.11176313.976547.2.251c6fb7jqPrtm)

[异常埋点](https://www.jianshu.com/p/b357e9a68adb)

## node 内存泄漏

## sessionStorage

[sessionStorage什么时候失效](https://blog.csdn.net/letterTiger/article/details/112581757)

关闭tab或者关闭整个浏览器
但是如果撤销操作还是能够访问到的(原理?)

https://arb.manage.chengecloud.com/system/config

## vuex和全局变量的区别

1. 使用`vuex`提交数据修改会有记录,可以通过vue-tools查看数据变化
2. 由统一的方法去修改而不是任意修改 (dispatch 触发action ,action去触发mutation)

## 浏览器缓存

301 和 302的区别

网站权重: 搜索引擎给网站赋予的一定权威值,权重越高在搜索引擎所占分量越大,搜索引擎排名越高

302 搜索引擎抓取新的内容和保留旧的内容
301 搜索引擎抓取新的内容同时将旧网站替换为重定向的网站(网页权重也转移到新页面上)

## Array 和 [] 的区别

一种是直接创建了一个数组，一个是调用字符串的构造函数创建字符串对象然后再创建这个字符串，中间多了一个创建对象的过程
Array()是一个对象，[]是一个数据原型, 用new Array()系统每次都会新生成一个对象（浏览器每生成一个对象都会耗费资源去构造他的属性和方法），他的子集是[]

## 路由控制权限

[琛哥demo](https://arb.manage.chengecloud.com/system/config)
[rouyi代码实现1](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/store/modules/permission.js)
[rouyi代码实现2](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/permission.js)

## 架构

[如何一步步设计前端架构？](https://blog.csdn.net/weixin_44811417/article/details/93079579)

## Map Set

### Map

map 的 `entries` 和 `keys`, `values` 返回的都是遍历器对象
即 `map.keys().next()` 都是可以操作的

map 的 `iterator` 就是 `entries()`函数

`map[Symbol.iterator] === map.entries`

WeakMap只接受对象为key值

### WeakSet 和Set

前者只能存对象(数组也算), 并且是弱引用,如果WeakSet内容没有被引用就会被垃圾处理回收
所以**不能遍历**(因为里面元素数量取决于垃圾回收的处理时间),也没有`size`属性

## node 垃圾回收

```js
// 运行能手动触发垃圾回收
node --expose-gc

// 先触发一次 回收
> global.gc();
// 查看内存状态
> process.memoryUsage();
{ rss: 21106688,
  heapTotal: 7376896,
  heapUsed: 4153936,
  external: 9059 }

> let wm = new WeakMap();

// 新建一个变量 key，指向一个 5*1024*1024 的数组
> let key = new Array(5 * 1024 * 1024);

// 设置 WeakMap 实例的键名，也指向 key 数组
// 这时，key 数组实际被引用了两次，
// 变量 key 引用一次，WeakMap 的键名引用了第二次
// 但是，WeakMap 是弱引用，对于引擎来说，引用计数还是1
> wm.set(key, 1);
> global.gc();
// 这时内存占用 heapUsed 增加到 45M 了
> process.memoryUsage();
{ rss: 67538944,
  heapTotal: 7376896,
  heapUsed: 45782816,
  external: 8945 }
// 清除变量 key 对数组的引用，
// 但没有手动清除 WeakMap 实例的键名对数组的引用
> key = null;
// 再次执行垃圾回收
> global.gc();
// 内存占用 heapUsed 变回 4M 左右，
// 可以看到 WeakMap 的键名引用没有阻止 gc 对内存的回收
> process.memoryUsage();
```

## 业务代码

[业务代码究竟难不难写？](https://www.sohu.com/a/434687127_673711)

> 再来看看文首的问题，你看，虽然只是写业务代码，如果要写的足够好，必须要了解设计模式、理解各种弹力设计、理解事务、熟悉框架、了解中间件原理，怎么可能学不到东西，要实现健壮的业务代码，其实很难，要考虑的东西太多了，如果说写框架我们需要考虑不同的使用方和使用环境，这很难，写业务代码我们要考虑到千奇百怪的使用行为，要考虑到层次不起的对接方，这不比写框架简单。对于5年+经验丰富的程序员应当有能力开一个好头，或者说愿意在老代码上去做一些改变，否则你的价值在哪里呢？

## 前端 架构设计

[前端架构设计的方法论](https://segmentfault.com/a/1190000016873522)

## requestAnimationFrame (分片优化渲染)

1. 请求动画帧 由系统绘制率(浏览器刷新频率)决定 (60Hz 1000/60 = 16.7ms)
2. 会把每一帧的所有dom操作集中起来(再一次重绘或回流中完成)
3. 隐藏或者不可见的元素不会重绘或回流

[什么是requestAnimationFrame](https://zhuanlan.zhihu.com/p/171612962)
[requestAnimationFrame详解](https://www.jianshu.com/p/fa5512dfb4f5)
挂载在window上的方法.

**它能保证回调函数在屏幕每一次的绘制间隔中只被执行一次, 这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。**

跟`setTImeout`相比

1. 时间较为固定,不会造成动画的卡顿

## 渲染

[渲染大量数据显示的优化](https://blog.csdn.net/alnorthword/article/details/87935038)

主要问题

1. 按照原来的做法，普通的组件，进行数据渲染插入dom中（几十条邹游），数据量小的时候很正常，vue很快。
2. 改为分段实现，把一批数据进行分块，通过定时器取出相应的部分去渲染，这种做法，比第一中稍微好点
3. 改为分段+虚拟DOM实现，这种做法，当达到几百条就会出现问题。

解决思路

1. 不要渲染全部数据，只渲染用户眼睛能看到的部分数据。
2. 不要用Vue去管理和监听全部的数据，造成很大的内存开销，可以自己定义个变量计算。

### 大数据处理

前端分片优化渲染
[前端页面如何正确渲染大量数据](https://blog.csdn.net/yy168888/article/details/115660601?utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromMachineLearnPai2%7Edefault-3.control)

### 微任务 queueMicrotask

宏任务 macro-task;

## 千分位

## 前端设置页面缓存

[实践这一次，彻底搞懂浏览器缓存机制](https://segmentfault.com/a/1190000017962411)
[前端缓存最佳实践](https://juejin.cn/post/6844903737538920462)

## 工程化建设

应用脚手架;业务组件;创建解决方案,sdk (软件开发工具包: 类似api,但是提供了某一项功能)

## queueMicrotask

## chrome控制台

[【干货】【建议收藏】chrome开发者工具最常见的使用方式](https://blog.csdn.net/qq_38164763/article/details/105464755)

## 技术架构

技术架构
前端架构选型
架构设计

## 数据属性和访问器属性

[Js中的数据属性和访问器属性](https://www.cnblogs.com/yanan-boke/p/7771264.html)
数据属性:
    configurable
    writable
    enumerable
    value
通过 `Object.getOwnPropertyDescription(obj, key)`
访问器属性:
    get
    set

## 前端架构:从入门到微前端 pdf