
// [深入分析 Promise 实现细节](https://juejin.cn/post/6945319439772434469#heading-17)
// [BAT前端经典面试问题：史上最最最详细的手写Promise教程](https://juejin.cn/post/6844903625769091079#heading-10)
class MyPromise {
    constructor(fn) {
        try {
            
            this.status = 'pending';
            this.result = null;
            this.reason = null;
            fn(this.resolve, this.reject);
            this.successCallback = [];
            this.failCallback = [];
        } catch (error) {
            this.reject(error)            
        }

    }
    resolve = (res) =>  {
        if (this.status === 'pending') {
            this.status = 'resolve'
            this.result = res;
            while (this.successCallback && this.successCallback.length) {
                let fn = this.successCallback.shift()
                console.log('异步方法')
                fn()
            }
        }
    }
    reject = (value) => {
        if (this.status === 'pending') {
            this.status = 'reject'
            this.reason = value;
            while(this.failCallback && this.failCallback.length) {
                this.failCallback.shift()(value)
            }
        }
    }
    // then(onFulfilled, onRejected) {
    //     // 还没有返回 缓存一下函数
    //     if (this.status === 'pending') {
    //         if (onFulfilled) {
    //             this.successCallback.push(onFulfilled);
    //         }
    //         if (onRejected) {
    //             this.failCallback.push(onRejected);
    //         }
    //     }
    //     if (this.status === 'resolve') {
    //         console.log('同步方法')
    //         onFulfilled(this.result)
    //     }
    //     if (this.status === 'reject') {
    //         onRejected(this.reason)
    //     }
    // }
    then (onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled !== 'function' ? (v) => v : onFulfilled;
        function resolvePromise(promise1, x, resolve, reject) {
            if (x === promise1) {
                return reject(new TypeError('promise same'))
            }
            if (x instanceof MyPromise) {
                x.then(resolve, reject)
            } else {
                resolve(x)
            }
        }
        let promise = new MyPromise((resolve, reject) => {
            const fulFilledMicrotask = () => {
                queueMicrotask(() => {
                    try {
                        const x = onFulfilled(this.result);
                        resolvePromise(promise, x, resolve, reject);
                    } catch (error) {
                        reject(error)
                    }
                })
            }
            const rejectedMicrotask = (() => {
                queueMicrotask(() => {
                    try {
                        let x =  onRejected(this.reason);
                        resolvePromise(promise, x, resolve, reject)
                    } catch (error) {
                        reject(error);
                    }
                })
            })
            if (this.status === 'pending') {
                this.successCallback.push(fulFilledMicrotask);
                this.failCallback.push(onRejected);
            }
            if (this.status === 'resolve') {
                fulFilledMicrotask();
            }
            if (this.status === 'reject') {
                rejectedMicrotask();
            }
        })
        return promise;
    }

}

let promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        resolve('333')
    }, 1000)
})
// promise.then(value => {
//     console.log(1)
//     console.log('resolve', value)
// })
// promise.then(value => {
//     console.log(2)
//     console.log('resolve', value)
// })
// promise.then(value => {
//     console.log(3)
//     console.log('resolve', value)
// })
function other () {
    return new MyPromise((resolve, reject) =>{
      resolve('other')
    })
}
promise.then(value => {
    console.log(4);
    return other()
}).then(res => {
    console.log('other', res)
})

function coinSelect(coins, num) {
    let arr = Array(num + 1).fill(num + 1);
    arr[0] = 0;
    for (let i = 1; i <= num; i++) {
        for (let j = 0; j < coins.length; j++) {
            if (i - coins[j] >= 0) {
                arr[i] = Math.min(arr[i], arr[i - coins[j]] + 1);
            }
        }
    }
    if (arr[num] === num + 1) {
        return -1
    }
    return arr[num]
}
// console.log(coinSelect([1, 2, 5], 11))

const getJson = function (url) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest()
        xhr.open('get', url, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState !== 4) {
                return
            }
            if (xhr.status === 200) {
                resolve(xhr.responseText)
            } else {
                reject(new Error(xhr.responseText))
            }
        }
        xhr.send();
    })
}

const obj = {
    a: {
        b: 1,
        c: 2,
        d: {e: 5}
    },
    b: [1, 3, {a: 2, b: 3}],
    c: 3
}
function flatten(flattenObj) {
    let retObj = {}
    // 是个对象
    let dfs = (obj, pre) => {
        if (typeof obj === 'object') {
            let keys = Object.keys(obj);
            let bArray = Array.isArray(obj);
            keys.forEach(val => {
                let str = val
                if (pre) {
                    str = bArray ?(`${pre}[${val}]`) : (pre + '.' + val);
                }
                dfs(obj[val], str);
            })
        } else {
            retObj[pre] = obj
        }
    }
    dfs(flattenObj, '');
    return retObj;    
}
// console.log(flatten(obj));
// {
//  'a.b': 1,
//  'a.c': 2,
//  'a.d.e': 5,
//  'b[0]': 1,
//  'b[1]': 3,
//  'b[2].a': 2,
//  'b[2].b': 3
//   c: 3
// }

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
}
console.log(render(template, data)); // 我是姓名，年龄18，性别undefined

function render(t, d) {
    // 匹配到的字符  , 捕获到的字符
    return t.replace(/\{\{(\w+)\}\}/g, (match, val) => {
        console.log(match, val)
        return d[val];
    })
}
