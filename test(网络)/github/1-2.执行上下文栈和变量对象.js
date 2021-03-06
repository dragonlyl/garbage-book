// https://github.com/yygmind/blog/issues/13

// JS是单线程的语言，执行顺序肯定是顺序执行
// 但是JS 引擎并不是一行一行地分析和执行程序，而是一段一段地分析执行，会先进行编译阶段然后才是执行阶段。

// 变量提升
foo;  // undefined
var foo = function () {
    console.log('foo1');
}
foo();  // foo1，foo赋值
var foo = function () {
    console.log('foo2');
}
foo(); // foo2，foo重新赋值

// 函数提升
foo();  // foo2
function foo() {
    console.log('foo1');
}
foo();  // foo2
function foo() {
    console.log('foo2');
}
foo(); // foo2

// 声明优先级，函数 > 变量 (函数声明提升，变量声明提升，但赋值不提升,所以说优先级有点不正确)
foo();  // foo2  (函数声明优先级高)
var foo = function() {
    console.log('foo1');
}
foo();  // foo1，foo重新赋值  (变量声明低 执行完变量就变成变量的语句了)
function foo() {
    console.log('foo2');
}
foo(); // foo1
/**
 * 解释   
 *  var foo; // undefined/变量声明提升/
    function foo() {
    console.log('foo2');
    } /函数声明提升/ // foo -> function foo(){}
    foo(); // foo2 (上述代码的第一个f00)
    foo = function() {
    console.log('foo1');
    } /重新赋值/
    foo(); // foo1  (上述代码的第二个f00)
 * 
 * 
 */



var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    // return f();  //1
    // return f;    //2
}   
// checkscope();    //1
// checkscope()();  //2
// 上面两个  方法虽然最后的结果是一样的  但是 他们执行上下文栈的变化不一样

// 第一段代码：
// ECStack.push(<checkscope> functionContext);
// ECStack.push(<f> functionContext);
// ECStack.pop();
// ECStack.pop();

// 第二段代码：
// ECStack.push(<checkscope> functionContext);
// ECStack.pop();
// ECStack.push(<f> functionContext);
// ECStack.pop();

// 函数上下文

// 在函数上下文中，用活动对象(activation object, AO)来表示变量对象。

// 活动对象和变量对象的区别在于
// 1、变量对象（VO）是规范上或者是JS引擎上实现的，并不能在JS环境中直接访问。
// 2、当进入到一个执行上下文后，这个变量对象才会被激活，所以叫活动对象（AO），这时候活动对象上的各种属性才能被访问。
// 调用函数时，会为其创建一个Arguments对象，并自动初始化局部变量arguments，指代该Arguments对象。所有作为参数传入的值都会成为Arguments对象的数组元素。

// 执行过程

// 执行上下文的代码会分成两个阶段进行处理
// 1、进入执行上下文
// 2、代码执行

// 进入执行上下文
// 很明显，这个时候还没有执行代码
// 此时的变量对象会包括（如下顺序初始化）：
// 1、函数的所有形参 (only函数上下文)：没有实参，属性值设为undefined。
// 2、函数声明：如果变量对象已经存在相同名称的属性，则完全替换这个属性。
// 3、变量声明：如果变量名称跟已经声明的形参或函数相同，则变量声明不会干扰已经存在的这类属性。

function foo(a) {
    var b = 2;
    function c() {}
    var d = function() {};
  
    b = 3;
}
foo(1);
//   对于上面的代码，这个时候的AO是
// AO = {
//     arguments: {
//         0: 1,
//         length: 1
//     },
//     a: 1,
//     b: undefined,
//     c: reference to function c(){},
//     d: undefined
// }
// 形参arguments这时候已经有赋值了，但是变量还是undefined，只是初始化的值

// 代码执行
// AO = {
//     arguments: {
//         0: 1,
//         length: 1
//     },
//     a: 1,
//     b: 3,
//     c: reference to function c(){},
//     d: reference to FunctionExpression "d"
// }

// 总结如下：

// 1、全局上下文的变量对象初始化是全局对象

// 2、函数上下文的变量对象初始化只包括 Arguments 对象

// 3、在进入执行上下文时会给变量对象添加形参、函数声明、变量声明等初始的属性值

// 4、在代码执行阶段，会再次修改变量对象的属性值