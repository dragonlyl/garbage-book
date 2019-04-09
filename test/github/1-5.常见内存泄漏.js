// https://github.com/yygmind/blog/issues/16

// 四种常见的JS内存泄漏

// 1.意外的全局变量
// 未定义的变量会在全局对象创建一个新变量，如下。
function foo(arg) {
    bar = "this is a hidden global variable";
    // window.bar = xxx
}

// 另一个意外的全局变量可能由 this 创建。
function foo() {
    this.variable = "potential accidental global";
}

// Foo 调用自己，this 指向了全局对象（window）
// 而不是 undefined
foo();

// 解决方法：
// 在 JavaScript 文件头部加上 'use strict'，使用严格模式避免意外的全局变量，此时上例中的this指向undefined。
// 如果必须使用全局变量存储大量数据时，确保用完以后把它设置为 null 或者重新定义。

// 2、被遗忘的计时器或回调函数
// 计时器setInterval代码很常见
// var someResource = getData();
// setInterval(function() {
//     var node = document.getElementById('Node');
//     if(node) {
//         // 处理 node 和 someResource
//         node.innerHTML = JSON.stringify(someResource));
//     }
// }, 1000);
// 在节点node或者数据不再需要时，定时器依旧指向这些数据。
// 所以哪怕当node节点被移除后，interval 仍旧存活并且垃圾回收器没办法回收，它的依赖也没办法被回收，除非终止定时器。

// var element = document.getElementById('button');
// function onClick(event) {
//     element.innerHTML = 'text';
// }

// element.addEventListener('click', onClick);

// 旦它们不再需要（或者关联的对象变成不可达），明确地移除它们非常重要。
// 老的 IE 6 是无法处理循环引用的。因为老版本的 IE 是无法检测 DOM 节点与 JavaScript 代码之间的循环引用，会导致内存泄漏。

// 但是，现代的浏览器（包括 IE 和 Microsoft Edge）使用了更先进的垃圾回收算法（标记清除），
// 已经可以正确检测和处理循环引用了。即回收节点内存时，不必非要调用 removeEventListener 了。

// 3、脱离 DOM 的引用
//  看不懂

// 4、闭包
// 闭包的关键是匿名函数可以访问父级作用域的变量。
var theThing = null;
var replaceThing = function () {
  var originalThing = theThing;
  var unused = function () {
    if (originalThing)
      console.log("hi");
  };
    
  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function () {
      console.log(someMessage);
    }
  };
};

setInterval(replaceThing, 1000);

// 每次调用 replaceThing ，theThing 得到一个包含一个大数组和一个新闭包（someMethod）的新对象。
// someMethod 与 unused 分享闭包作用域，尽管 unused 从未使用，它引用的 originalThing 迫使它保留在内存中（防止被回收）。

// 解决方法：
// 在 replaceThing 的最后添加 originalThing = null 。



// 从内存来看 null 和 undefined 本质的区别是什么？

// 给一个全局变量赋值为null相对于这个变量的指针对象以及值清空,给对象的属性赋值为null,或者局部对象赋值为null,相对于给这个属性分配一个空内存,然后值为null,
// js会回收全局变量为null的对象
// 给一个全局变量赋值为undefined,相对于将这个对象的值清空,但对象还在,如果给对象的属性赋值为undefined,说明值为空值

// 扩展下：
// 声明了一个变量，但未对其初始化时，这个变量的值就是undefined，它是 JavaScript 基本类型 之一。
var data;
console.log(data === undefined); //true
// 对于尚未声明过的变量，只能执行一项操作，即使用typeof操作符检测其数据类型，使用其他的操作都会报错。
//data1变量未定义
console.log(typeof data1); // "undefined"
console.log(data1 === undefined); //报错

// null 是表示缺少的标识，指示变量未指向任何对象。


// const 问题
// const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。

// 简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
// 但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，
// const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。