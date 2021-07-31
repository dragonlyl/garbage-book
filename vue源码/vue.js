// 这里表示 该函数返回的是个方法  (key: string) => boolean
function makeMap(str, expectsLowerCase) {
    // 这个是高级写法 看ts写法
    var map = Object.create(null);
    var list = str.split(',');
    for (var i = 0; i < list.length; i++) {
        map[list[i]] = true;
    }
    return expectsLowerCase ? function (val) { return !!map[val.toLocaleLowerCase()]; } : function (val) { return !!map[val]; };
}
// console.log(makeMap('jj,dd'))
// 是否为对象,返回判断 ,判断为 key 为 string/number/symbol : 返回为any
var isObject = function (val) { return val !== null && typeof val === 'object'; };
// 转换为string
var toDisplayString = function (val) {
    return val === null ? '' : isObject(val) ? JSON.stringify(val) : String(val);
};
var a = function () { console.log(222); };
console.log(isObject(a), String(a));
// [stringify第二个参数](https://juejin.cn/post/6844904034290106381)
// vue 里面获取某值的类型都是通过 Object.prototype.toString.call(xx)
var obj = { a: 2 };
console.log(keyof, typeof obj);
