// eslint 提示 Promise executor functions should not be async
// promise 里面加async 多此一举
// 因为 async直接抛出promise,根本不需要再包一层promise
// 见 testPromise 和 testAsync
function testPromise() {
    return new Promise(async (resolve, reject) => {
        await test1()
        console.log('testPromise')
        resolve('resolve')
    })
}
function test1() {
    return new Promise((resolve, reject) => {
        console.log('test1')
        resolve('test1 resolve')
    })
    // return 'test1 resolve'
}
// testPromise().then(res => {
//     console.log(res)
// })
async function testAsync() {
    // return await test1()
    let res = await test1();
    console.log('testAsync inner')
    return 'async 自己抛的promise';
}
testAsync().then(res => console.log(res,'testAsync'))