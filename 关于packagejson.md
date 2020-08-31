# packagejson 总结

## 生成

通过 `npm init`生成package.json文件
输入后控制台会让你输入很多内容,例如package name,version之类的而这些输入的内容都会在生成的package.json里面展示
而我们可以通过精简操作,直接指定默认参数 `npm init -y` 来跳过繁琐的过程

## 安装依赖

由于公司开发的pc端框架采用公司内部的hui,但是hui有些问题是在不断迭代(为了满足开发的需求),所以我们需要查看稳定版本的version
通过指令 `npm view hui version` 来获取hui的版本,远程搜索查看
<!-- 再通过npm update hui@latest -S -->
再通过npm update hui@xx -S 安装指定版本 // 或者直接hui@latest 直接安装最新版本

### 版本的格式

major.minor.patch
主版本号.次版本号.修补版本号

我们有时候看到依赖里面的包邮`^` 或`~`符号,例如`"vue-router": "^3.2.0"`那么这些什么意思呢:
~ 波浪号 + 指定版本号：比如 ~3.2.0 ，安装 3.2.x 的最新版本（不低于 3.2.0），但是不安装 3.7.x，也就是说安装时不改变主版本号和次版本号。
^ 插入号 + 指定版本号：比如 ^3.2.0 ，安装 3.x.x 的最新版本（不低于 3.2.0），但是不安装 4.x.x，也就是说安装时不改变主版本号。
其中x表示任意版本
<!-- 需要注意的是，如果主版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次版本号变动，也可能带来 程序的不兼容。 -->
其他还有 大于号 小于号的就不赘述了

> 题外话,npm install和npm update的区别 在于对已安装的模块具有模糊版本的时候,前者或忽略,后者会更新
如上面 vue-router,如果后续官方发布了3.2.2版本,我们用npm install 会没有影响,而npm update会将其升到3.2.2版本
还有一个区别是对于devDependecies
npm install默认会安装devDependecies，除非加上--production参数
npm update不会默认安装，除非手动加上--dev参数


## 最外层

name：项目名称

deecription：应用项目描述

version 版本号

config：应用的配置项

author：作者

respository：资源仓库地址

licenses：授权方式 // MIT可以用来

directories：目录

main：应用入口文件 // 引用某个包的时候需要指定(有个项目由于主代码引入的包有压缩版,而我们改源码的时候需要通过配置main.js将main引入另外一个文件)

bin：命令行文件

dependencries：运行时的依赖，发布后，即生产环境下还需要用的模块

devDependencies：项目应用开发环境依赖 由于有些依赖不需要用在线上包里面,，发布时用不到它就不需要将其打包到上线包里面了

而保存到这里面的方法是指定save方法
npm i --save|-S 生成环境
npm i --save-dev|-D 开发环境

engines：运行引擎，指明node.js运行所需要的版本

script：脚本

npm run  加后续的命令
而命令在 scripts标签里面的各个key值
但是有固定几个命令是可以缩写的
npm start是npm run start
npm stop是npm run stop的简写
npm test是npm run test的简写
npm restart是npm run stop && npm run restart && npm run start的简写

## scripts

来说说里面最复杂的script内容
"scripts": {
    "test": "node index.js",
    "test1": "./node_modules/.bin/nodemon index.js",
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
},
例如我们启动vue的时候 输入`npm run test` 其实等效于在控制台直接输入 `node index.js`
就是用`node`去执行`index.js`文件.
而我们直接去控制太敲`vue-cli-service serve`命令行去不能达到`npm run serv`e的效果是为什么呢?
这就要涉及npm脚本的原理了: 参考我阮哥的话
每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。
npm run新建的这个 Shell，会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。
这意味着，当前目录的node_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。

所以上面的代码 等效于`./node_modules/.bin/vue-cli-service serve`,直接在控制台敲就能直接运行了

## 执行多个

例如我们要一个script的一个脚本来执行多个内容的时候可以node index1.js & node index2.js
如果有先后顺序(即前者执行成功,后者才能执行)用&&
ode index1.js && node index2.js

## 环境配置

配置指令运行时的环境

通过敲命令行 `NODE_ENV=development npm test` 即指定了环境变量为development,也可以直接在scripts里面配置
"scripts": {
    "test": "NODE_ENV=development node index.js",
}
那么我们可以在index.js里面打印出当前的环境
`console.log(process.env.NODE_ENV); // development`

那么我们配置环境的最终目的是为了根据不同的环境来加载不同的配置文件
例如在
"scripts": {
    "start": "NODE_ENV='development' && node app.js",
    "build": "NODE_ENV='production' && node app.js"
}

例如我们在 创建config文件里面添加`index.js、test.js、development.js`三个文件

```js
development.js文件
/**
 * 开发环境的配置内容
 */

module.exports = {
    env: 'development', //环境名称
    port: 3001,         //服务端口号
    mongodb_url: '',    //数据库地址
    redis_url:'',       //redis地址
    redis_port: ''      //redis端口号
}
/**
 * 测试环境的配置内容
 */
test.js文件
module.exports = {
    env: 'test',        //环境名称
    port: 3002,         //服务端口号
    mongodb_url: '',    //数据库地址
    redis_url:'',       //redis地址
    redis_port: ''      //redis端口号
}

index.js
var development_env = require('./development');
var test_env = require('./test');

//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
module.exports = {
    development: development_env,
    test: test_env
}[process.env.NODE_ENV || 'development']
```

//引入配置文件
var config = require('../config');
然后 打印 config.port,会根据不同的脚本来输出不同的端口号

https://www.jianshu.com/p/6b816c609669