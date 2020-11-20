// https://juejin.im/post/5bfd51db5188250c10213937
//  函数局部变量优先级高于全局变量 
var scope = "global";   
function scopeTest() {
    console.log(scope);
    var scope = "local"
}
scopeTest(); //undefined
// 因为scope变量提升了 等效与下面代码
// function scopeTest() {
//     var scope;
//     console.log(scope);
//     scope = "local"
// }


function createClosure() {
    var name = "jack";
    return {
        setStr: function () {
            name = "rose";
        },
        getStr: function () {
            return name + ":hello";
        }
    }
}
var builder = new createClosure();
builder.setStr();
console.log(builder.getStr()); //rose:hello

// 上面在函数中返回了两个闭包，这两个闭包都维持着对外部作用域的引用。
// 闭包中会将外部函数的自由对象添加到自己的作用域链中，所以可以通过内部函数访问外部函数的属性，
// 这也是javascript模拟私有变量的一种方式。


//思考题   这两个scope会被回收吗?
var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f;
}

var foo = checkscope();
foo();

var scope = "global scope";
function checkscope() {
    var scope = "local scope";
    function f() {
        return scope;
    }
    return f;
}

checkscope();

// checkscope()执行完成后，代码1中自由变量特定时间之后回收，代码2中自由变量不回收。

// 首先要说明的是，现在主流浏览器的垃圾回收算法是标记清除，标记清除并非是标记执行栈的进出，
// 而是从根开始遍历，也是一个找引用关系的过程，但是因为从根开始，相互引用的情况不会被计入。
// 所以当垃圾回收开始时，从Root（全局对象）开始寻找这个对象的引用是否可达，如果引用链断裂，那么这个对象就会回收。

// 闭包中的作用域链中 parentContext.vo 是对象，被放在堆中，栈中的变量会随着执行环境进出而销毁，
// 堆中需要垃圾回收，闭包内的自由变量会被分配到堆上，所以当外部方法执行完毕后，对其的引用并没有丢。
// 每次进入函数执行时，会重新创建可执行环境和活动对象，但函数的[[Scope]]是函数定义时就已经定义好的（词法作用域规则），不可更改。

// 对于代码1：
// checkscope()执行时,将checkscope对象指针压入栈中，其执行环境变量如下

// checkscopeContext:{
//     AO:{
//         arguments:
//         scope:
//         f:
//     },
//     this,
//     [[Scope]]:[AO, globalContext.VO]
// }
// 执行完毕后出栈，该对象没有绑定给谁，从Root开始查找无法可达，此活动对象一段时间后会被回收

// 对于代码2：
// checkscope()执行后，返回的是f对象，其执行环境变量如下

// fContext:{
//     AO:{
//         arguments:
//     },
//     this,
//     [[Scope]]:[AO, checkscopeContext.AO, globalContext.VO]
// }
// 此对象赋值给var foo = checkscope();，将foo 压入栈中，foo 指向堆中的f活动对象,对于Root来说可达，不会被回收。

// 如果一定要自由变量scope回收，那么该怎么办？？？

// 很简单，foo = null;，把引用断开就可以了。
