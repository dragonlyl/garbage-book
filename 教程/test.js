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
// let test = require('my-node-cli')
// console.log(test)

// 引入 events 模块
var EventEmitter = require('events').EventEmitter; 
// 创建 eventEmitter 对象
var event = new EventEmitter(); 
event.on('some_event', function() { 
    console.log('some_event 事件触发'); 
}); 
setTimeout(function() { 
    event.emit('some_event'); 
}, 1000); 


function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}
function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    // i = o[Symbol.iterator]()
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}
let o = {c: function(){console.log(1)}}
let t = {c: function(){console.log(2)}}
let test = o.c
o.c = function () {
    var p = [];
    for (let _i = 0; _i < arguments.length; _i++) {
        p[_i] = arguments[_i];
        if (t.c) {
            t.c.apply(t, __spread(p))
        }
        test.apply(void 0, __spread(p))
        
    }
}
o.c()