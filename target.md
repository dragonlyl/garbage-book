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