// 一个函数就可以接收另一个函数作为参数，这种函数就称之为高阶函数。

// 高阶函数简单举例

function add (x, y, fn) {
    return fn(x) + fn(y)
}
console.log(add (1, -1, Math.abs));

function pow(x) {
    return x * x;
}

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// 平方
arr.map(Math.pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
// 变为string
arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']
// [JS 利用高阶函数实现函数缓存(备忘模式)](https://segmentfault.com/a/1190000012505900)