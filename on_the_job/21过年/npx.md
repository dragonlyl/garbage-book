# npx使用

## 链接

[npx 使用教程](http://www.ruanyifeng.com/blog/2019/02/npx.html)

## 调用项目安装模块

使用npx的时候 `node-modules/.bin/mocha --version`指令

`npx mocha --version`

npx 的原理: 很简单，就是运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在。
由于 npx 会检查环境变量$PATH，所以系统命令也可以调用。

## 避免全局安装模块

例如create-react-app, 可以不全局安装
`npx create-react-app my-react-app` 将create-react-app下载到一个临时目录，使用以后再删除。所以，以后再次执行上面的命令，会重新下载create-react-app。

## 其他参数

--no-install 参数和--ignore-existing 参数
前者表示使用 本地模块
后者表示 强制使用线上的(即用远程模块)
