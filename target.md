# 新内容

## Git flow

代码提交

## 代码自动化部署

Jenkins

## 代码自动生成

[若依管理系统](http://vue.ruoyi.vip/tool/gen)

## pv uv

## 错误监控 (扩展: 流量监测)

[什么是ARMS前端监控？](https://help.aliyun.com/document_detail/58652.html?spm=5176.11176313.976547.2.251c6fb7jqPrtm)

[异常埋点](https://www.jianshu.com/p/b357e9a68adb)

## node 内存泄漏

## sessionStorage

[sessionStorage什么时候失效](https://blog.csdn.net/letterTiger/article/details/112581757)

关闭tab或者关闭整个浏览器
但是如果撤销操作还是能够访问到的(原理?)


## vuex和全局变量的区别

1. 使用`vuex`提交数据修改会有记录,可以通过vue-tools查看数据变化
2. 由统一的方法去修改而不是任意修改 (dispatch 触发action ,action去触发mutation)

## 架构

[如何一步步设计前端架构？](https://blog.csdn.net/weixin_44811417/article/details/93079579)

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

## queueMicrotask

## chrome控制台

[【干货】【建议收藏】chrome开发者工具最常见的使用方式](https://blog.csdn.net/qq_38164763/article/details/105464755)

## 技术架构

技术架构
前端架构选型
架构设计

## 前端架构:从入门到微前端 pdf

## 多端异构

## 小程序框架原理(Mpvue)

## 动画 canvas(旋转) svg

## 富文本编辑框

## bff (Backend for frontend)

服务于前端的后端(逻辑分层,而非技术)
BFF调用后端的rpc，BFF给前端提供http

[什么是RPC？](https://www.jianshu.com/p/7d6853140e13)

1. rpc (remote Procedure Call)远程调用过程 ,理解成一个节点调用另外一个节点提供的服务
2. 本地调用 调用本地的函数
3. 远程调用 方法在服务端,通过调用接口

serverless

## api网关 (需要统一的 RESTful api)

作为所有客户端访问服务器的唯一入口

## vue-loader (写个vue的编译器)

webpack 如何提取vue中的标签
vue的style标签如何提取
[关于Vue-loader的那些事儿](https://www.cnblogs.com/Indomite/p/13256530.html)

## ivew

[iVew](https://iview.github.io/docs/guide/install)

## 高阶组件

[Vue 进阶必学之高阶组件 HOC](https://zhuanlan.zhihu.com/p/126552443)

## 前端难点

[前端开发的难点到底在什么地方?](https://www.zhihu.com/question/275915023)

## 工程化建设

应用脚手架;业务组件;创建解决方案,sdk (软件开发工具包: 类似api,但是提供了某一项功能)
[前端工程化建设](https://zhuanlan.zhihu.com/p/117486284)