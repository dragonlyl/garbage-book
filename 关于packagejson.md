# packagejson 总结

之前无聊翻着看了一下用`koa-generator`生成的`koa`目录内容，发现自己都没有总结`package.json`，还有配置开发环境和测试环境，下面就进行个人的总结内容并结合部分开发中遇到的问题，同时对koa目录进行扩展。

## 生成package.json文件

通过 `npm init`生成package.json文件，输入后控制台会让你输入很多内容,例如`package name`,`version`之类的而这些输入的内容都会在生成的`package.json`里面展示。
我们可以将上述的内容直接指定默认参数，通过 `npm init -y` 来跳过这繁琐的过程

## package.json部分参数讲解

### licenses

licenses：授权方式，这里可以让使用者是如何被允许使用你的项目包的。
大部分的licenses都是`MIT`，这种软件授权条款相对是比较宽松的。
而公司里面规定GPL和LGPL的授权是不要使用的，两者都是允许商业化销售，但是不允许封闭源代码，如果违反其授权可能有被起诉的风险。

### mian

main：应用入口文件。即当我们用安装别人的包时，里面的package.json的main指引了引入的包的入口文件。
之前项目中需要使用`jspdf`但是由于稳定版本不支持我所需要的功能，所以需要改引入包的源码，而包目录的`dist`有好多.js文件，而查看main就能明确知道引入的是`jspdf.min.js`文件。
但是由于`min.js`文件是压缩过的js，无法插入修改的代码，那么我们可以配置main指向的文件，指向`jspdf.debug.js`,然后修改该文件额代码就能解决问题了

### dependencries

dependencries：运行时的依赖。发布后，即生产环境下还需要用的模块。例如`hui`就是发布后也要使用的依赖

### devDependencies

devDependencies：项目应用开发环境依赖。由于有些依赖不需要用在线上包里面，发布时用不到它就不需要将其打包到上线包里面了。例如`webpack`，`scss`之类的

### script

script：脚本,使用的`npm run` 指令都需要在这里面进行配置

## 安装依赖

一般使用`npm install xx`来进行依赖的安装，同时缩写成 `npm i xx`。而所有的依赖最好后面加上参数，来标明是开发环境下还是生产环境下使用，并保存到`package.json`文件里面，写法如下：
npm i --save 生产环境 // --save缩写成-S
npm i --save-dev 开发环境 // --save-dev所写成-D

### 版本格式

xx.xx.xx
major.minor.patch
主版本号.次版本号.修补版本号

我们有时候看到依赖里面的包邮`^` 或`~`符号,例如`"vue-router": "^3.2.0"`那么这些什么意思呢:
~ 波浪号 + 指定版本号：比如 ~3.2.0 ，安装 3.2.x 的最新版本（不低于 3.2.0），但是不安装 3.7.x，也就是说安装时不改变主版本号和次版本号。
^ 插入号 + 指定版本号：比如 ^3.2.0 ，安装 3.x.x 的最新版本（不低于 3.2.0），但是不安装 4.x.x，也就是说安装时不改变主版本号。
其中x表示任意版本。除上面两个符号外其他还有大于号，小于号的符号就不赘述了。

### 安装指定版本

由于公司开发的pc端框架采用公司内部的`hui`,但是`hui`有些问题是在不断迭代(为了满足开发的需求),所以我们需要查看稳定版本的`version`
通过指令 `npm view hui version` 来获取hui的版本,该指令会访问服务搜索查看最新版本号
再通过`npm update hui@xx -S` 安装指定版本 // 或者直接`hui@latest` 直接安装最新版本

### npm install 和 npm update区别

`npm install`和`npm update`的区别 在于对已安装的模块具有模糊版本的时候,就像前面说的更新hui一样。
而前者或忽略,后者会更新，如上面 `vue-router`,如果后续官方发布了3.2.2版本,我们用`npm install` 会没有影响,而`npm update`会将其升到3.2.2版本
还有一个区别是对于`devDependecies`
`npm install`默认会安装devDependecies，除非加上--production参数
`npm update`不会默认安装，除非手动加上--dev参数

## scripts详解

来说说里面最复杂的script内容

```json
"scripts": {
    "test": "node index.js",
    "test1": "./node_modules/.bin/nodemon index.js",
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
}
```

例如我们启动vue的时候 输入`npm run test` 其实等效于在控制台直接输入 `node index.js`,就是用`node`去执行`index.js`文件。
而我们直接去控制太敲`vue-cli-service serve`命令行去不能达到`npm run serve`的效果是为什么呢?
这就要涉及npm脚本的原理了: 参考我阮哥的话
>每当执行npm run，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。
npm run新建的这个 Shell，会将当前目录的node_modules/.bin子目录加入PATH变量，执行结束后，再将PATH变量恢复原样。这意味着，当前目录的node_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径。

所以上面的代码 等效于`./node_modules/.bin/vue-cli-service serve`,直接在控制台敲就能直接运行了

### 执行多个语句

例如我们要一个script的一个脚本来执行多个内容的时候可以`node index1.js & node index2.js`
如果有先后顺序(即前者执行成功,后者才能执行)用`&&`,写为`node index1.js && node index2.js`

## 环境配置(本文主要目的)

项目中测试的时候大部分都是通过连接我的服务地址来进行系统测试，但是后续可能有开发内容需要修改`koa`的代码时，那我这边只能等系统测试测完才能对这部分内容进行开发。
那么是不是可以通过配置两个环境，一个用于测试，一个用于开发，例如下面：

配置指令运行时的环境可以通过敲命令行 `NODE_ENV=development npm test` 即指定了环境变量为development,也可以直接在scripts里面配置

```json
"scripts": {
    "test": "NODE_ENV=test node index.js",
}
```

那么我们可以在index.js里面打印出当前的环境
`console.log(process.env.NODE_ENV); // development`
那么我们配置环境的最终目的是为了根据不同的环境来加载不同的配置文件(或者将服务运行在不同的端口，然后再用`nginx`进行转发)继续下面的修改：

```json
// 修改package.json文件
"scripts": {
    "start": "NODE_ENV='development' && node app.js",
    "build": "NODE_ENV='test' && node app.js"
}
```

之后我们创建`config`文件里面添加`index.js、test.js、development.js`三个文件。

```js

development.js文件
/**
 * 开发环境的配置内容
 */

module.exports = {
    env: 'development', //环境名称
    port: 8081,         //服务端口号
    // 还可以配置其他的属性
}

test.js文件
/**
 * 测试环境的配置内容
 */
module.exports = {
    env: 'test',        //环境名称
    port: 8080,         //服务端口号
}

index.js文件

var development_env = require('./development');
var test_env = require('./test');

//根据不同的NODE_ENV，输出不同的配置对象，默认输出development的配置对象
module.exports = {
    development: development_env,
    test: test_env
}[process.env.NODE_ENV || 'development']

//在app.js文件引入配置文件
var config = require('../config');
```

然后打印 `config.port`,会根据不同的脚本来输出不同的端口号。
之后启动两个服务，一个服务用来给测试测试，另一个服务用来给前端进行调试。这样就实现了上面的效果。

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
npm i --save|-S 生产环境
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

## 执行多个

例如我们要一个script的一个脚本来执行多个内容的时候可以node index1.js & node index2.js
如果有先后顺序(即前者执行成功,后者才能执行)用&&
ode index1.js && node index2.js

## 环境配置



https://www.jianshu.com/p/6b816c609669