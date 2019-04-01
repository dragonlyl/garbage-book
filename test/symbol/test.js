// https://www.cnblogs.com/imwtr/p/5912318.html

/**
 * Symbol 是唯一标识符的基本类型
Symbol 使用 Symbol() 创建的，调用带有一个可选的描述。
Symbol 总是不同的值，即使它们有相同的名称。如果我们希望同名 Symbol 相等，那么我们应该使用全局注册表：Symbol.for(key) 返回（如果需要的话创建）一个以 key 作为名称的全局 Symbol。Symbol.for 的多次调用完全返回相同的 Symbol。
Symbol 有两个主要的使用场景：
1. “隐藏” object 属性。如果需要将属性添加到 “属于” 另一个脚本或库的对象中，则可以创建 Symbol 并将其用作属性键。Symbol 属性不出现在 for..in中，因此不回偶尔列出。另外，它不会被直接访问，因为另一个脚本没有我们的符号，所以它不会偶尔干预它的操作。 因此我们可以使用 Symbol 属性“秘密地”将一些东西隐藏到我们需要的 object 中，但其他人不应该看到。 
2. JavaScript 使用了许多系统 Symbol，这些 Symbol 可以作为 Symbol.* 访问。我们可以使用它们来改变一些内置行为。例如，在本教程的后面部分，我们将使用 Symbol.iterator 来迭代，Symbol.toPrimitive来设置对象原始值的转换等等。 
从技术上说，Symbol 不是 100% 隐藏的。有一个内置方法 Object.getOwnPropertySymbols(obj) 允许我们获取所有的 Symbol。还有一个名为 Reflect.ownKeys(obj) 返回所有键，包括 Symbol。所以它们不是真正的隐藏。但是大多数库、内置方法和语法结构都遵循一个共同的协议。而明确调用上述方法的人可能很清楚他在做什么。


被ES6引入作为一种新的数据类型，表示独一无二的值
 */
 

//  声明 
//  类似字符串String的声明方式 var str = 'str'; Symbol的声明方式类似，
//  它调用构造函数Symbol()
var s = Symbol();
console.log(typeof s,'typeof') // symbol


// symbol除了简单的在控制台输出之外，还可以参与到其他代码逻辑运算中去，
// 最常见的是在对象属性名称中（为确保属性名惟一而存在）
var s = Symbol();
var s1 = Symbol('s1');

const obj = {
    [s]: function() {
        console.log(1);
    },
    [Symbol()]: () => {
        console.log(2);
    },
    [s1]: 3,
    a: 4
};

obj[s]() // 1
console.log(obj[s1]) // 3
// 注意到symbol要使用[]中括号包裹起来，调用的时候也一样
// （不能使用obj.s的方式，这样会被识别成字符串）

//想遍历 对象的属性值   console.log(obj[item]);
// 但是 旧的for...in  Object.keys()、Object.getOwnPropertyNames()等不支持访问
// 要使用新的getOwnPropertySymbols方法才能访问
console.log('demo getOwnPropertySymbols')
Object.getOwnPropertySymbols(obj).forEach(function(item) {
    if (typeof obj[item] === 'function') {
        obj[item]();
    } else {
        console.log(obj[item]);
    }
});// 发现并没有输出 4  因为常规属性被忽略了
// 所以ES6还引入了一个新的内置类Reflect，它的ownKeys方法可以识别出所有属性名
console.log('demo Reflect')
Reflect.ownKeys(obj).forEach(function(item) {
    if (typeof obj[item] === 'function') {
        obj[item]();
    } else {
        console.log(obj[item]);
    }
});

//类型转换 不能直接加上 + 就变成字符串 需要调用toString 或者String方法
// 也可以转成 bool值 不能转换成 Number类型
let t_sy = Symbol(2);
console.log('symbol to string',String(t_sy));// Symbol(2)

// 因为每次调用Symbol  无论传入的值是什么 都是不一样的 
// 所以 要用Symbol.for  该方法会先判断全局中是否有symbol值,有就返回已有的值,没有再创建
let for_s1 = Symbol.for('s');
let for_s2 = Symbol.for('s');
console.log('测试for创建的是否相等', for_s1 === for_s2);
// 此外，我们可以用Symbol.keyFor()访问全局中的symbol相关项，没有则返回undefined
