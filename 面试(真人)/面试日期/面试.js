for (var i = 0; i < 4; i++) {
    // setTimeout(()=>{
    //     console.log(i)
    // },1000)
    (function(ii){
        setTimeout(()=>{
                console.log(ii)
            },1000)
    })(i)    
}

function deepClone (target) {
    let current = target.constructor === Array ? []:{}
    for (let i in target) {
        if (Object.prototype.hasOwnProperty.call(target, i)) {
            if (target[i] && typeof target[i] === 'object') {
                current[i] = target[i].constructor === Array?[]:{}
                current[i] = deepClone(target[i])
            } else {
                current[i] = target[i]
            }
        }
    }
    return current
}

function myNew(fn) {
    let fn = [].shift.call(arguments)
    const obj = Object.create(fn.prototype)
    const ret = fn.call(obj, ...arguments)
    return ret instanceof Object ? ret : obj; 
}
function curry (fn) {
    let arg = [].slice.call(arguments, 1)
    let length = fn.length
    return function next() {
        arg = arg.concat(...arguments)
        if (length > arg.length) {
            return next
        }
        return fn.apply(null, arg)
    }
    // return next
}
function add (a, b, c) {
    return a+ b+ c;
}
let fn = curry(add);
console.log(fn(1)(2)(3))

Function.prototype.myCall = function (target) {
    if (typeof this !== 'function') {
        throw Error('非函数')
    }
    target = target || window
    let s = Symbol('fn')
    target[s] = this
    // let arg = [].slice.call(arguments, 1)
    let arg = [...arguments].slice(1)
    let result = target[s](...arg)
    delete target[s]
    return result
}
Function.prototype.myApply = function (target) {
    target = target || window
    // let arg = [...arguments].slice(1)
    let arg = arguments[1]
    let fn = Symbol()
    target[fn] = this
    let ret = null
    if (arg.length) {
        ret = target[fn](...arg)
    } else {
        ret = target[fn]()
    }
    delete target[fn]
    return ret
}

Function.prototype.myBind = function (target) {
    let fn = this
    target = target || window
    let arg = [...arguments].slice(1)
    return function fn1 () {
        if (this instanceof fn1) {
            return new fn(...arg.concat(...arguments))
        }
        return fn.apply(target, arg.concat(...arguments))
    }
}
function Parent (name) {
    this.name = name
}
function Child(name) {
    Parent.call(this)
    this.name = name
}
Child.prototype = Object.create(Parent.prototype, {
    constructor: {
        value: Child,
        writable: true,
        enumerable: false,
        configurable: false
    }
})

function myInstanceof (current, target) {
    let pro = current.__proto__
    while(true) {
        if (pro === null) {
            return false
        }
        if (pro === target.prototype) {
            return true
        }
        pro = pro.__proto__
    }
}

function compose(...arg) {
    return function fn(x) {
        return arg.reduceRight((pre,cur) => cur(pre), x)
    }
}