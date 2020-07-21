# 项目分析

## 目录

bin里的www为项目入口，通过它引入app.js配置内容。
public公共文件夹,放一些样式、页面js逻辑、图片。
routers路由，功能为分发请求。
views为视图文件，jade是一个文本格式，其内容还可以是我们最熟悉的html。
app.js和package.json是配置文件。

链接：https://www.jianshu.com/p/6b816c609669

"dev": "./node_modules/.bin/nodemon bin/www",
`nodemon`插件的作用是在你启动了服务之后，修改文件可以自动重启服务。

npm start是npm run start
npm stop是npm run stop的简写
npm test是npm run test的简写
npm restart是npm run stop && npm run restart && npm run start的简写

## npm script

### 只要定义在node_modules/.bin子目录里面的所有脚本，都可以直接用脚本名调用，而不必加上路径

<http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html>
这里我在 .bin面有个nodemon.js文件
"dev": "./node_modules/.bin/nodemon bin/www",
"dev": "nodemon bin/www"

### 由于 npm 脚本就是 Shell 脚本，因为可以使用 Shell 通配符

``` shell
"lint": "jshint *.js"
"lint": "jshint **/*.js"
```

上面代码中，*表示任意文件名，**表示任意一层子目录。

如果要将通配符传入原始命令，防止被 Shell 转义，要将星号转义。

``` shell
"test": "tap test/\*.js"
```

### 传参

向 npm 脚本传入参数，要使用--标明。

```shell
"lint": "jshint **.js"
向上面的npm run lint命令传入参数，必须写成下面这样。
```

```shell
$ npm run lint --  --reporter checkstyle > checkstyle.xml
也可以在package.json里面再封装一个命令。
```

```shell
"lint": "jshint **.js",
"lint:checkstyle": "npm run lint -- --reporter checkstyle > checkstyle.xml"
```

### 执行顺序

如果 npm 脚本里面需要执行多个任务，那么需要明确它们的执行顺序。

如果是并行执行（即同时的平行执行），可以使用&符号。

$ npm run script1.js & npm run script2.js
如果是继发执行（即只有前一个任务成功，才执行下一个任务），可以使用&&符号。

$ npm run script1.js && npm run script2.js

### 默认值

一般来说，npm 脚本由用户提供。但是，npm 对两个脚本提供了默认值。也就是说，这两个脚本不用定义，就可以直接使用。

"start": "node server.js"，
"install": "node-gyp rebuild"
上面代码中，npm run start的默认值是node server.js，前提是项目根目录下有server.js这个脚本；npm run install的默认值是node-gyp rebuild，前提是项目根目录下有binding.gyp文件。

### 七、钩子

npm 脚本有pre和post两个钩子。举例来说，build脚本命令的钩子就是prebuild和postbuild。

```shell
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"

用户执行npm run build的时候，会自动按照下面的顺序执行。
npm run prebuild && npm run build && npm run postbuild
```

### 九.变量

npm 脚本有一个非常强大的功能，就是可以使用 npm 的内部变量。

首先，通过npm_package_前缀，npm 脚本可以拿到package.json里面的字段。比如，下面是一个package.json。

```json
{
  "name": "foo",
  "version": "1.2.5",
  "scripts": {
    "view": "node view.js"
  }
}
```

那么，变量npm_package_name返回foo，变量npm_package_version返回1.2.5。

// view.js
console.log(process.env.npm_package_name); // foo
console.log(process.env.npm_package_version); // 1.2.5

上面代码中，我们通过环境变量process.env对象，拿到package.json的字段值。如果是 Bash 脚本，可以用$npm_package_name和$npm_package_version取到这两个值。

npm_package_前缀也支持嵌套的package.json字段。

```json
  "repository": {
    "type": "git",
    "url": "xxx"
  },
  scripts: {
    "view": "echo $npm_package_repository_type"
  }
```

## 切换Node——环境变量（NODE_ENV）

<https://www.jianshu.com/p/3a2249cbc5bd>

## 在启动服务的时候可以对NODE_ENV进行赋值

$ NODE_ENV=test npm start
作用是 NODE_ENV先赋值然后在启用npm start方法
然后我们可以在bin/www文件中输出一下，看看是否配置成功，添加如下代码：
console.log("process.env.NODE_ENV=" + process.env.NODE_ENV);
// 打印出内容   process.env.NODE_ENV=test

`"start": "NODE_ENV=development ./node_modules/.bin/nodemon bin/run",`
可以将代码改造成这样

