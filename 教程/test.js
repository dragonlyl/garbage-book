// node test.js one two=three four
console.log(process.argv)
// 返回的是数组形式

// 0: /Users/drazlin/.nvm/versions/node/v12.22.3/bin/node
// 1: /Users/drazlin/Documents/draz/garbage-book/教程/test'
// 2: one
// 3: two=three
// 4: four

// node --harmony test.js foo=bar --version

// process.argv
// [
//   '/Users/drazlin/.nvm/versions/node/v12.22.3/bin/node',
//   '/Users/drazlin/Documents/draz/garbage-book/教程/test.js',
//   'foo=bar',
//   '--version'
// ]
console.log(process.argv0, process.execArgv) // 前者获取 argv[0]的值, 后者获取命令行选项
// node   ['--harmony']

// [npm link的使用](https://www.jianshu.com/p/aaa7db89a5b2)
// 通过 npm link xx 来链接到文件
// 通过 npm unlink xx 来取消链接
let test = require('my-node-cli')
console.log(test)