# webpack概念

## 链接

[当面试官问Webpack的时候他想知道什么](https://juejin.cn/post/6943468761575849992)

## 作用

1. 模块打包
2. 编译兼容(loader机制，转换.less, .vue, .jsx)
3. 能力扩展(plugin, 进一步提高自动化程度，工程效率和打包速度)

## 模块打包运行原理

1. 读取webpack配置参数
2. 启动webpack, 创建Compiler对象开始解析项目
3. 从入口开始解析，并找到其导入的依赖模块，递归遍历，形成依赖树
4. 对不同文件类型的依赖模块使用loader进行编译， 转换成js文件
5. webpack会发布订阅模式，向外抛出一些hooks， 这样webpack插件可以通过监听这些关键事件节点，执行插件任务进而达到干预输出结果的目的

## sourceMap

## 是否写过loader

## 是否写过plugin
