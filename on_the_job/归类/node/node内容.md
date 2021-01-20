<!--
 * @Author: your name
 * @Date: 2020-11-21 15:09:57
 * @LastEditTime: 2021-01-19 13:48:02
 * @LastEditors: Please set LastEditors
 * @Description: node内容
 * @FilePath: \garbage-book\on_the_job\归类\node\node.md
-->

# node内容

## process

1. 是node中进程相关的对象
2. 是全局对象,在任何一个地方都可以范围该对象中的属性

关于`NODE_ENV`说明
原本node的evn是没有这个属性名,是后续通过添加上去的环境变量,
[NodeJs/Vue项目中对process.env的使用](https://blog.csdn.net/qq_40963664/article/details/88016586)
cross-env可以跨平台的设置和使用环境变量 解决配置环境变量的问题

## path.resolve使用

作用： `path.resolve()` 该方法将一些的 路径/路径段 解析为绝对路径
语法： `path.resolve( [from…],to )`
说明： 将参数to位置的字符解析到一个绝对路径里，[from … ]为选填项，路径源

```js
总结： 从后向前，以字符/开头不会拼接到前面；以../开头拼接到前面且不含最后一个路径
var path = require("path")     //引入node的path模块

path.resolve('/foo/bar', './baz')   // returns '/foo/bar/baz'
path.resolve('/foo/bar', 'baz')   // returns '/foo/bar/baz'
path.resolve('/foo/bar', '/baz')   // returns '/baz'
path.resolve('/foo/bar', '../baz')   // returns '/foo/baz'
path.resolve('home','/foo/bar', '../baz')   // returns '/foo/baz'
path.resolve('home','./foo/bar', '../baz')   // returns '/home/foo/baz'
path.resolve('home','foo/bar', '../baz')   // returns '/home/foo/baz'
path.resolve('home', 'foo', 'build','aaaa','aadada','../../..', 'asset') //return '/home/foo/asset'
```

常跟`__dirname`一起使用，该变量用来指向被执行的js文件的绝对路径
跟 `./`的区别是，只有node运行的路径恰为当前执行文件的时候才相等
例如在`test.js`外面有`dir2` 和最外面的`dir1`，在`dir2`目录运行`test`文件 `node dir2/test.js`， 前者打印出 `/dir1/dir2` 后者打印 `/dir1`

所以在使用`require`的时候要注意 ，相对的还是 `node`运行的目录，如还是在`dir2`运行`test` 那么 `require('../other')`指的是`dir1`目录下的`other`，而不是`dir2`下的

公司的node里面使用，是先用`__dirname`获取当前绝对路径，然后`../../`到最外面的路径（即自己计算当前目录在根目录有几层），之后拼上 `/public/img/`的路径获取静态资源路径
`const ROOTPATH = path.resolve(__dirname, '../../');`

## node浏览器调试