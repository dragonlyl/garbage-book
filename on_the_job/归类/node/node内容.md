<!--
 * @Author: your name
 * @Date: 2020-11-21 15:09:57
 * @LastEditTime: 2020-11-21 15:10:06
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