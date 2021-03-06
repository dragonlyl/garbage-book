// 防抖：有效时间内再次执行，清空计时器
function debounce(fn,time) {
    // 每次都是同一个timeout 
    let timeout = null;
    // if (timeout) clearTimeout(timeout);
    // timeout = setTimeout(fn, time)
    return function () {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(fn, time)
    }
}
function handle() {    
    console.log(Math.random()); 
}
debounce(handle, 1000)()

// 节流： 一段时间只触发一次

function throttle (fn ,time = 500) {
    let canRun = true;
    return function () {
        if (!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn();
            canRun = true;
        }, time);
    }
}
function throttle1(fn) {
    // console.log(this.name, '刚进入this指向')
    let canRun = true;// 标志位
    return function () {
        if(!canRun) return;
        canRun = false;
        setTimeout(() => {
            fn.apply(this,arguments);
            canRun = true;// 运行完设置成可以执行的状态
        },500);
    }
}
let obj = {name: 111, fn(){console.log(this.name)}};
let obj1 = {name: 333, f1: throttle1, f: throttle, f2: throttle1(obj.fn),f3: throttle(obj.fn)};
globalThis.name = 222;
// throttle(obj.fn)();
throttle1(obj.fn)();
// obj1.f(obj.fn)();
obj1.f1(obj.fn)();
obj1.f2(); // 这里两者的this指向就不一样了，这里this指向obj1
obj1.f3(); // 这里this指向 window
/**
 * 那么可以在方法中查看
 * outer.addEventListener('scroll', throttle(fn));
 * 如果不绑定this ，那么一个是指向window 一个指向outer（outer合理
 */
