// 方法1: instanceof
// instanceof用于判断引用类型属于哪个构造函数的方法
let arr = [];
let obj = {};
let fnc = function () {  }
// instanceof 的右边 必须是 Array 或者Object
console.log(arr instanceof Array, arr instanceof Object);
// fnc 用 instanceof 是 Function 也是Object , arr 同理

// 方法2: Object.prototype.toString().call()

// 为什么要用Object的原型的toString() ,因为 Array 和function 都重写了toString,
// 不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应的重写之后的toString方法

console.log(Object.prototype.toString.call(arr), Object.prototype.toString.call(fnc))

// 方法3: constructor (比instanceof 更严格点)
console.log(arr.constructor === Array, arr.constructor === Object, fnc.constructor === Function);

// 方法4: isArray()
console.log(Array.isArray(arr), Array.isArray(obj));
