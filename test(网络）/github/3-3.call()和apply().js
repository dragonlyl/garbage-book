// https://github.com/yygmind/blog/issues/22
// call() 和 apply()的区别在于，
// call()方法接受的是若干个参数的列表，而apply()方法接受的是一个包含多个参数的数组

var func = function(arg1, arg2) {
    ...
};

func.call(this, arg1, arg2); // 使用 call，参数列表
func.apply(this, [arg1, arg2]) // 使用 apply，参数数组

// 合并两个数组

var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

// 将第二个数组融合进第一个数组
// 相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);
// 4

vegetables;
// ['parsnip', 'potato', 'celery', 'beetroot']

// 当第二个数组(如示例中的 moreVegs )太大时不要使用这个方法来合并数组，
// 因为一个函数能够接受的参数个数是有限制的。不同的引擎有不同的限制，JS核心限制在 65535，
// 有些引擎会抛出异常，有些不抛出异常但丢失多余参数。

//  解决方法就是将参数数组切块  后循环传入目标方法
function concatOfArray(arr1, arr2) {
    var QUANTUM = 32768;
    for (var i = 0, len = arr2.length; i < len; i += QUANTUM) {
        Array.prototype.push.apply(
            arr1, 
            arr2.slice(i, Math.min(i + QUANTUM, len) )
        );
    }
    return arr1;
}

// 验证代码
var arr1 = [-3, -2, -1];
var arr2 = [];
for(var i = 0; i < 1000000; i++) {
    arr2.push(i);
}

Array.prototype.push.apply(arr1, arr2);
// Uncaught RangeError: Maximum call stack size exceeded

concatOfArray(arr1, arr2);
// (1000003) [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, ...]

// 获取数组中的最大值和最小值
var arr = [1, 2, 3];
var max = Math.max(...arr);
var numbers = [5, 458 , 120 , -215 ]; 
Math.max.apply(Math, numbers);   //458    
Math.max.call(Math, ...numbers); // 458

// 验证是否是数组
function isArray(obj){ 
    return Object.prototype.toString.call(obj) === '[object Array]';
}
isArray([1, 2, 3]);

// 直接使用 toString()
[1, 2, 3].toString(); 	// "1,2,3"
"123".toString(); 		// "123"
// 123.toString(); 		// SyntaxError: Invalid or unexpected token
Number(123).toString(); // "123"
Object(123).toString(); // "123"
// 可以通过toString() 来获取每个对象的类型，但是不同对象的 toString()有不同的实现，
// 所以通过 Object.prototype.toString() 来检测，需要以 call() / apply() 的形式来调用，
// 传递要检查的对象作为第一个参数。

//掺差  
//Javascript中所有的对象都是Object的实例，并继承Object.prototype的属性和方法，有些属性是隐藏的。 

// 在对象创建时会存在预定义的属性，其中有一个属性就是原型对象。
// 在函数对象中存在原型对象prototype，在普通对象中没有prototype，但存在__proto__。
// 或者说使用function定义的对象与使用new操作符生成的对象之间有一个重要的区别，
// 这个区别就是function定义的对象有一个prototype属性，
// 使用new生成的对象就没有这个prototype属性，存在__proto__。
var o =new Object();    
console.log(o.__proto__);
console.log(o.prototype);//undefined

var fn = function(){} 
console.log(fn.prototype);//Object {constructor: function}
var f1 = new fn();
console.log(f1.__proto__);
console.log(f1.__proto__===fn.prototype);//true

// 那么__proto__是什么？每个对象都会在其内部初始化一个属性，就是__proto__。
// 普通对象中的__proto__是什么呢？ Object的本质函数对象，是通过new Function()创建，
// 所以Object.__proto__指向Function.prototype。同理，Function也是函数对象，
// 因此Function.__proto__同样指向Function.prototype。 
// Object.prototype对象也有__proto__属性，但它比较特殊，为null。
// 这个由__proto__串起来的直到Object.prototype.__proto__为null的链就是原型链。

console.log(Object.__proto__ === Function.prototype);//true
console.log(Function.__proto__===Function.prototype);//true
console.log(Object.prototype.__proto__);//null

// 为什么要有类数组对象呢？或者说类数组对象是为什么解决什么问题才出现的？

// JavaScript类型化数组是一种类似数组的对象，并提供了一种用于访问原始二进制数据的机制。 
// Array存储的对象能动态增多和减少，并且可以存储任何JavaScript值。
// JavaScript引擎会做一些内部优化，以便对数组的操作可以很快。
// 然而，随着Web应用程序变得越来越强大，尤其一些新增加的功能例如：音频视频编辑，访问WebSockets的原始数据等，
// 很明显有些时候如果使用JavaScript代码可以快速方便地通过类型化数组来操作原始的二进制数据，这将会非常有帮助。

// 一句话就是，可以更快的操作复杂数据 