// https://segmentfault.com/a/1190000011526612?utm_source=tag-newest

// 强行掺差promise的简单demo
const myPromise = new Promise(function(res, rej) {
        setTimeout(function(){
        if (Math.random() < 0.9) {
            return res('Hooray!');
        }
        return rej('Oh no!');
        }, 1000);
    });
    myPromise
    .then(function(data) {
    console.log('Success: ' + data);
    })
    .catch(function(err) {
    console.log('Error: ' + err);
    });
    // If Math.random() returns less than 0.9 the following is logged:
    // "Success: Hooray!"
    // If Math.random() returns 0.9 or greater the following is logged:
    // "Error: On no!"

    
    // promise all 
    // return Promise.all([Core.Api.Wx.encryptedData(code, encryptedData, iv), 
                            // Core.Api.Wx.decryptPhone(code, encryptedData, iv)])
    // .then(res => { res[0] res[1] }


async function basicDemo() {
    let result = await Math.random();
    console.log(result);
}
basicDemo();
//  调用完该函数返回一个promise对象

async function demo01() {
    return 123;
} // 用来表示函数是异步的,函数会返回一个promise对象,可用.then方法
// 若async定义的函数有返回值,相当于 Promise.resolve(123)
//  没有return则相当于执行了  Promise.resolve()
demo01().then(val => {
    console.log(val);// 123
});

//await 必须出现在 async 函数内部，不能单独使用。(没说await后面必须要跟异步方法)
//如果await的是 promise对象会造成异步函数停止执行并且等待 promise 的解决,如果等的是正常的表达式则立即执行。

function sleep(second) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve('enough sleep ~~')
        }, second);
    })
}
function normalFunc() {
    console.log('normalFunc');
}
async function awaitDemo() {
    await normalFunc();
    console.log('something,~~');
    // let result = await sleep(2000);
    // console.log(result);// 两秒之后会被打印出来
    return result = await sleep(2000);
}
awaitDemo().then(res=>{
    console.log(res,'.then 输出')
})

//对于reject 情况的解决
function sleep1(second) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('want to sleep~');
        }, second);
    })
}

async function errorDemo() {
    let result = await sleep1(3000);
    console.log(result);
}
// errorDemo();//UnhandledPromiseRejectionWarning: want to sleep~

// 所以要用try  catch 方法进行处理
async function errorDemoSuper() {
    try {
        let result = await sleep1(3000);
        console.log(result);
    } catch (err) {
        console.log(err);
    }
}
errorDemoSuper();// want to sleep~


// 注意
// await 若等待的是 promise 就会停止下来 
//(即如果三个没有关联的东西就不要用await一个再执行下一个了)
// 假设下面三个异步方法 没有任何关联
async function bugDemo() {
    await sleep(1000);
    await sleep(1000);
    await sleep(2000);
    console.log('clear the loading~ bug');
} // 如果这样写就要执行3000s才结束(不合理)
bugDemo() // 用了 4000s
// 应该用promise all
async function correctDemo() {
    let p1 = sleep(1000);
    let p2 = sleep(1000);
    let p3 = sleep(1000);
    await Promise.all([p1, p2, p3]);
    console.log('clear the loading~');
    //  会在之前的两个例子之前输出 (就用等1000s)
}
correctDemo();


// await in for 循环 
// await必须在async函数的上下文中的。
/**
 * 
 
// 正常 for 循环
async function forDemo() {
    let arr = [1, 2, 3, 4, 5];
    for (let i = 0; i < arr.length; i ++) {
        await arr[i];
    }
}
forDemo();//正常输出
// 因为想要炫技把 for循环写成下面这样
async function forBugDemo() {
    let arr = [1, 2, 3, 4, 5];
    arr.forEach(item => {
        await item;
    });
}
forBugDemo();// Uncaught SyntaxError: Unexpected identifier
*/