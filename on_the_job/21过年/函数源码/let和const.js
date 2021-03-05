/*
 * @Author: your name
 * @Date: 2021-03-02 22:00:11
 * 实现原理
 */

// let 实现原理
// (function(){var a = 1;console.log(a)})();console.log(a)

// const实现原理 使用Object.defineProperty
let __const = function(data,value) {
    Object.defineProperty(globalThis, data,{
        //因为const定义的属性在global下也是不存在的，所以用到了enumerable: false来模拟这一功能
        enumerable: false, 
        configurable: false,
        get: function () {
            return value
        },
        set: function(val) {
            if (val !== value) {
                throw new TypeError('Assignment to constant variable.')
            } else {
                return value;
            }
        }
    })
}

__const('a', 10)
console.log(a)
a = 20

// 更简单的实现
var f = Object.freeze({'name':'admin'});
f.name = 'hello'; // 严格模式下是会报错的
f.name; // 打印出admin ,值没有被改变
