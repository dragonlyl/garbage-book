// https://juejin.im/post/5bfcbb4be51d452aa770fa2b
// 红宝书(p178)上对于闭包的定义：闭包是指有权访问另外一个函数作用域中的变量的函数，
// MDN 对闭包的定义为：闭包是指那些能够访问自由变量的函数

// 自由变量，指在函数中使用的，但既不是函数参数arguments也不是函数的局部变量的变量，
// 其实就是另外一个函数作用域中的变量。
function getOuter() {
    var date = '1127';
    function getDate(str) {
        console.log(str + date);  //访问外部的date
    }
    return getDate('今天是：'); //"今天是：1127"
}
getOuter();

// 其中date既不是参数arguments，也不是局部变量，所以date是自由变量。

// 简要的执行过程如下：
// 1.全局代码,创建全局执行上下文,全局执行上下文压入执行上下文栈
// 2.全局执行上下文初始化 
// 3.执行 getOuter函数,创建该函数执行上下文,并将其亚茹执行上下文栈
// 4.getOuter函数执行上下文初始化，创建变量对象、作用域链、this等
// 5.函数执行完毕，getOuter 执行上下文从执行上下文栈中弹出.
// 6.执行 getDate 函数，创建 getDate 函数执行上下文，getDate 执行上下文被压入执行上下文栈
// 7. 执行上下文初始化，创建变量对象、作用域链、this等
// 8.f 函数执行完毕，f 函数上下文从执行上下文栈中弹出

// 注意 : 执行内部getDate函数的时候,getOuter函数上下文已经被销毁了,是如何获取
// data变量的呢
// 是因为函数getDate 执行上下文维护了一个作用域链，会指向指向getOuter作用域，
// 作用域链是一个数组，结构如下。
// getDateContext = {
//   Scope: [AO, getOuterContext.AO, globalContext.VO]
// };
var data = [];

for (var i = 0; i < 3; i++) {
    data[i] = function () {
        console.log(i);
    };
}
data[0]();
data[1]();
data[2]();
// 执行 data[0] 函数的时候，data[0] 函数的作用域链为：
// data[0]Context = {
//     Scope: [AO, globalContext.VO]
// }
// 由于其自身没有i变量，就会向上查找，所有从全局上下文查找到i为3，data[1] 和 data[2] 是一样的。
var data = [];

for (var i = 0; i < 3; i++) {
    data[i] = (function (i) {
        return function () {
            console.log(i);
        }
    })(i);
}
// 执行 data[0] 函数的时候，data[0] 函数的作用域链发生了改变：
// data[0]Context = {
//     Scope: [AO, 匿名函数Context.AO, globalContext.VO]
// }
// 因为闭包执行上下文中贮存了变量i，所以根据作用域链会在globalContext.VO中查找到变量i, 并输出0。



// 用 let i = 0  也可以实现的原理
var data = [];// 创建一个数组data;

// 进入第一次循环
{
    let i = 0; // 注意：因为使用let使得for循环为块级作用域
    // 此次 let i = 0 在这个块级作用域中，而不是在全局环境中
    data[0] = function () {
        console.log(i);
    };
}
let 声明的i,在整块是块级作用域,那个data[0]这个函数就成了闭包

// 进入第二次循环
{
    let i = 1; // 因为 let i = 1 和上面的 let i = 0     
    // 在不同的作用域中，所以不会相互影响
    data[1] = function () {
        console.log(i);
    };
}
