// [扁平数据结构转Tree](https://juejin.cn/post/6983904373508145189)

// 解析url
// [正则使用]('../on_the_job/节点_过年/正则.md')
function sortUrl(url) {
    const reg = /.+\?(.+)$/; // + 是至少一个; * 至少0个; ? 用来贪婪; . 是任意字符; []是括号内容字符一个匹配
    let query = reg.exec(url)?.[1]; // exec 第0项是字符全匹配, 第1项是捕获内容
    if(query) {
        let queryArr = query.split('&')
        let o = {}
        queryArr.forEach(v => {
            let keyVal = v.split('=')
            o[keyVal[0]] = keyVal[1]
        })
        return o
    }
    return {}

}

console.log(sortUrl('https://juejin.cn/search?query=测试&utm_source=gold_browser_extension&utm_medium=search'))
console.log(sortUrl('https://juejin.cn/search'))
return
// 去重
var arr7 = [1,2,2,3,4,1,2]
function deleteNum (arr) {
    return arr.filter((v,i) => arr.indexOf(v) === i)
}
console.log([...new Set(arr7)])
console.log(deleteNum(arr7))
return
// typeof 
function myTypeof(target) {
    return Object.prototype.toString.call(target).slice(8,-1).toLowerCase()
}
console.log(myTypeof('2'))
console.log(myTypeof(2))
console.log(myTypeof({}))
console.log(myTypeof([]))

return 
class Event {
    constructor() {
        this.event = {}
    }
    on = (name, fn)=> {
        if (!this.event[name]) {
            this.event[name] = []
        }
        this.event[name].push(fn)
    }
    off = (name, fn) => {
        if (!this.event[name]) {
            return false
        }
        // let item = this.event[name].findIndex(v => v === fn)
        // if (item >= 0) {
        //     this.event[name].splice(item, 1)
        //     return true
        // }
        // return false
        this.event[name] = this.event[name].filter(v => v !== fn)
    }
    once = (name, fn) => {
        if (!this.event[name]) {
            this.event[name] = []
        }
        // fn1 = () => {
        function fn1 (){
            // 这里this 指向是 v.apply 的this
            fn(...arguments)
            this.off(name, fn1)
        }
        this.on(name, fn1)
    }
    trigger = (name, ...arg) => {
        if (!this.event[name]) {
            return false
        }
        this.event[name].forEach(v => {
            // v.apply(null, arg)
            v.apply(this, arg)
        })
    }
}
let eventObj = new Event()
function fn1(name) {console.log(name + '1')}
function fn2(name) {console.log(name + '2')}
function fn3(name) {console.log(name + '3')}
function fn4(name) {console.log(name + '4')}
eventObj.on('fn', fn1)
eventObj.on('fn', fn2)
eventObj.once('fn', fn3)
console.log(eventObj)
eventObj.trigger('fn', 'fn')
console.log(eventObj)
eventObj.on('fn1', fn3)
eventObj.on('fn1', fn4)
eventObj.off('fn1', fn4)
console.log(eventObj)







return
function curry (fn) {
    let curArg = [...arguments].slice(1)
    let length = fn.length
    return function next() {
        curArg = curArg.concat(...arguments)
        if (curArg.length >= length) {
            return fn.apply(null, curArg)
        } else {
            return next
        }
    }
}
function add (a, b, c) {
    return a+ b+ c;
}
var fn2 = curry(add);
console.log(fn2(1)(2)(3))

var fn1 = curry(add, 1);
console.log(fn1(1)(2))
return
function compose() {
    let fns = [...arguments]
    return function() {
        let arg = [...arguments]
        return fns.reduceRight((pre, cur) => cur(pre), ...arg)
    }
}
function fn1(x) {
    return x + 1;
}
function fn2(x) {
    return x + 2;
}
function fn3(x) {
    return x + 3;
}
function fn4(x) {
    return x * 4;
}
const a6 = compose(fn1, fn2, fn3, fn4);
console.log(a6(1));
return
function myIterator(arr) {
    let index = 0
    return {
        next: function() {
            if (index === arr.length) {
                return {value: undefined, done: true}
            } else {
                return {value: arr[index++], done: false}
                
            }
        }
    }
}
// Array.prototype.myIterator = function() {
//     let index = 0
//     let _this = this
//     return {
//         next: function() {
//             if (index === _this.length) {
//                 return {value: undefined, done: true}
//             } else {
//                 return {value: _this[index++], done: false}
                
//             }
//         }
//     } 
// }
var arr = [1,2,3]
myIterator(arr)
return 
function myInstanceof(a, b) {
    let prototype = b.prototype
    while(true) {
        if (a === null) {
            return false
        }
        if (a.__proto__ === prototype) {
            return true
        }
        a = a.__proto__
    }
}
function a3 () {}
console.log(myInstanceof(a3, Function))
return
class B1 extends A {
    constructor(val) {
        super(val)
    }
}
function A(a) {
    this.a = a
}
function B(a) {
    A.call(this)
    this.a = a
}
B.prototype = Object.create(A.prototype, {
    constructor: {
        value: B,
        writable: true, // 默认是true
        configurable: false,
        enumerable: false
    }
})
return
function myNew (ctx) {
    let arg = [...arguments].slice(1)
    let target = Object.create(ctx.prototype)
    let ret = ctx.call(target, ...arg)
    return typeof ret === 'object' ? ret : target
}
function a1 (val) {this.val = val}
var b = myNew(a1, 2)
console.log(b)
return
// const arr = [1, [1,2], [1,2,3]]
function flatter(arr) {
    while(arr.some(v => Array.isArray(v))) {
        arr = [].concat(...arr)
    }
    return arr
}    
function flatter(arr) {
    return arr.reduce((pre, cur) => {
        if (Array.isArray(cur)) {
            return pre.concat(flatter(cur))
        }
        return pre.concat(cur)
    }, [])
}
return
// 只保留最后一次点击
function debounce (fn, time) {
    let timer = null
    return () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(fn, time)
    }
}
function throttle(fn, time) {
    let can = true
    return ()=> {
        if (!can) return
        can = false
        setTimeout(() => {
            fn.apply(this, arguments)
            can = true
        }, time)
    }
}
return
Function.prototype.myBind = function (ctx) {
    let _this = this
    let arg = [...arguments].slice(1)
    return function fn(){
        if (this instanceof fn) {
            return new _this(...arg, ...arguments)
        }
        // 这里是一开始的this调用
        return _this.call(ctx, ...arg, ...arguments)
    }
}
let obj2 = {a: 2}
var a = 3
function a4 (val) {console.log(this.a, val)}
let fn = a4.myBind(obj2)
fn(3)

return
Function.prototype.myApply = function(ctx) {
    if (typeof this !== 'function') {
        throw Error('非函数')
    }
    ctx = ctx || window
    let fn = Symbol()
    let arg = arguments[1]
    ctx[fn] = this
    let ret
    if (arg) {
        ret = ctx[fn](...arg)
    } else {
        ret = ctx[fn]()
    }
    delete ctx[fn]
    return ret
}
let obj1 = {a: 2}
function a2(val) {console.log(this.a, val)}
a2.myApply(obj1, [3])
return
Function.prototype.myCall = function(ctx) {
    if (typeof this !== 'function') {
        throw Error('非函数')
    }
    ctx = ctx || window
    let arg = [...arguments].slice(1)
    let fn = Symbol()
    ctx[fn] = this
    let ret = ctx[fn](...arg)
    delete ctx[fn]
    return ret
}
let obj = {a: 2}
function a5(val) {console.log(this.a, val)}
a5.myCall(obj, 3)

return
function _const (target, value) {
    Object.defineProperty(window, target, {
        writable: false,
        value
    })
}
_const('obj', {a: 2})
return
// let
(function (){
    for(var i = 0 ; i < 5; i++) {
        console.log(i)
    }
})()
// for语句 里面包裹一个立即执行函数,然后传入参数i
// 判断语句 将判断语句内容 写到立即执行函数,这样var就不是变量提升了
// [ES6之let声明的实现](https://blog.csdn.net/qq_32758013/article/details/79574558)