// 有效时间内再次执行，清空计时器
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