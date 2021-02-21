/*
 * @Author: your name
 * @Date: 2021-02-08 14:25:34
 * @LastEditTime: 2021-02-08 16:05:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \garbage-book\on_the_job\test.js
 */
let aa = async function outer() {
    function test1() {
        return new Promise((resolve, reject) => {
            reject(new Error(1))
        })
    }
    function test2() {
        return new Promise((resolve, reject) => {
            reject(new Error(2))
        })
    }
    let list = []
    list.push(test1(), test2())
    // console.log(list, 'list');
    try {
        let val = await Promise.all(list);
        console.log(val ,'val')
    } catch (err) {
        console.log(err ,'err')
    }
}
aa()

// https://www.cnblogs.com/fundebug/p/javascript-promise-combinators.html
// https://www.kancloud.cn/wangjiachong/gongzuopian/1856425

Promise.allSettled =
  Promise.allSettled ||
  function(arr) {
    let P = this;
    return new P(function(resolve, reject) {
      if (Object.prototype.toString.call(arr) !== '[object Array]') {
        return reject(
          new TypeError(
            typeof arr +
              ' ' +
              arr +
              ' ' +
              ' is not iterable(cannot read property Symbol(Symbol.iterator))'
          )
        );
      }
      let args = Array.prototype.slice.call(arr);
      if (args.length === 0) return resolve([]);
      let arrCount = args.length;
 
      function resolvePromise(index, value) {
        if (typeof value === 'object') {
          let then = value.then;
          if (typeof then === 'function') {
            then.call(
              value,
              function(val) {
                args[index] = { status: 'fulfilled', value: val };
                if (--arrCount === 0) {
                  resolve(args);
                }
              },
              function(e) {
                args[index] = { status: 'rejected', reason: e };
                if (--arrCount === 0) {
                  resolve(args);
                }
              }
            );
          }
        }
      }
 
      for (let i = 0; i < args.length; i++) {
        resolvePromise(i, args[i]);
      }
    });
  };