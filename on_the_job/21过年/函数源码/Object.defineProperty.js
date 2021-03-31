let obj = {a: 1}
// 默认 configurable, enumerable, writable都为false
Object.defineProperty(obj, 'b', {value: 2});
obj.b = 222; // 无效的修改
// 指定为configurable true 那么可以继续通过这种方式来修改value值
Object.defineProperty(obj, 'c', {value: 3, configurable: true})
// 不会报错
Object.defineProperty(obj, 'c', {value: 4})
// enumerable 会出现在遍历的函数， 如 Object.keys()
Object.defineProperty(obj, 'd', {value: 4, enumerable: true});
Object.defineProperty(obj, 'e', {value: 5, writable: true});
// 指定writable 才可以重新写
obj.d = 6;
// 为enumerable 才会遍历出来
console.log(obj, Object.keys(obj)); 
// {a: 1, b: 2, c: 4, d: 4, e: 5}; ['a', 'd']

// Object.defineProperties(obj, {
//     "b": {value: 22}
// })