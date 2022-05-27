async function async1() {
    console.log('async1 start');
    await async2(); // 1 先执行 async2函数,然后跳出async1,执行同步语句,然后将返回的promise放入微队列
    // await async2().then(() => {console.log(222)}); // 2
    console.log('async2 end')
    await async3();
    console.log('async3 end')
    console.log('async1 end')
}
async function async2() {
    console.log('async2')
}
async function async3() {
    console.log('async3')
}
console.log('script start');
setTimeout(() => {
    console.log('setTimeout')
})
async1()
new Promise((resolve) => {
    console.log('promise 1')
    resolve()
}).then(() => {
    console.log('promise 2')
})
console.log('script end')
/**
 * 第一种结果
 * script start
async1 start
async2
promise 1
script end
async2 end
async3
promise 2
async3 end
async1 end
setTimeout
 */
/**
 * 第二种结果
 * script start
async1 start
async2
promise 1
script end
222
promise 2
async2 end
async3
async3 end
async1 end
setTimeout
 */

// 1. 外呼优化(解决了什么功能的)
// 2. 审批流优化
// 3. 

new Promise((resolve,reject) => {
    console.log('1')
    resolve()
}).then(() => {
    console.log(2)
    return new Promise((resolve,reject) => { // 需要等所有then运行结束
    // new Promise((resolve,reject) => { // 4先加入微任务队列, 6再加入,然后5
        console.log('3')
        resolve()
    }).then(() => {
        console.log(4)
    }).then(() => {
        console.log(5)
    })
}).then(() => {
    console.log(6)
})