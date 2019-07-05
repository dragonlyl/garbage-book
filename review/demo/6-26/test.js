
function debounce(fn, delay) {
    // 维护一个 timer
    let timer = null;
  
    return function() {
        // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
        let context = this;
        let args = arguments;

        clearTimeout(timer);
        timer = setTimeout(function() {
        fn.apply(context, args);
        }, delay);
    }
}
// 当用户滚动时被调用的函数 
function foo() { 
    console.log('!!!!!'); 
}
    
// 在 debounce 中包装我们的函数，过 2 秒触发一次 
let elem = document.getElementById('container'); 
elem.addEventListener('scroll', debounce(foo, 2000));