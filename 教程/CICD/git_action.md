# Git actions

[Github actions 部署vue项目](https://blog.csdn.net/dikentoujing99/article/details/103681903)
![Github actions 部署vue项目](github_actions.png)

## git action

生成 tokens  Settings / Developer settings / Personal access tokens

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

## npm token

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

## npm发包

`npm publish` // 输入
// 修改npm 的源指向 https://registry.npm.taobao.org/
`npm config set registry https://registry.npmjs.org/` // 改变npm源指向
`npm login` // dralinz dragon_lin95@163.com

## npx

1. 可以不用安装全局依赖

`npx create-react-app ts-with-react --typescript`

npx clear-npx-cache // 如果发现 create-react-app 版本过低, 可以先清除npx 缓存
2. npx调用工程局部模块

`node_modules/.bin/mocha --version`
`npx mocha --version`
