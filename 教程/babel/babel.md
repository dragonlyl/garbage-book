# babel

## 链接

[](https://juejin.cn/post/6844903956905197576)

## 结构

都采用微内核的架构风格 (核心很小,大部分功能通过插件扩展实现)

1. `@babel/core` // 核心

加载和处理配置
加载插件
调用Parser进行语法解析,生成AST树
调用Traverser遍历AST,并使用`访问者模式` 应用 插件 对 AST进行转换
生成代码,包括`SourceMap`转换和源代码生成

2. 周边支撑

Parser(`@babel/parser`): 转换为AST树, (内置支持jsx,ts,flow), 不支持扩展
Traverser(`@babel/traverse`): 实现了`访问者模式`
Generator(@`babel/generator`): 将AST树转换为源代码,支持sourceMap

3. 插件

## 访问者模式

访问者 以深度优先顺序 (递归遍历) 对 AST进行遍历

[Babel 插件手册](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md#toc-visitors)

## 简要介绍

[Babel简介](https://juejin.cn/post/6844904065223098381)

`babel/core` `babel/cli`  `plugins` `presets` `polyfill`
## @babel/cli

它是一个终端运行工具, 内置的插件,运行你从终端使用babel的工具.

npx babel src --out-dir lib // 转完可以使用babel指令 (将src目录下文件转换为lib文件)
npx babel test.js --out-dir lib // 单文件转换

需要运行插件才能转换

`npm i --save-dev @babel/plugin-transform-arrow-functions`

`npx babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions`

