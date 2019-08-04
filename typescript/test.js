// 查看版本 tsc -v 
// 运行要先转换成js 再用node 运行 tsc xx node xx
// var [变量名] : [类型] = 值;
var a = 'test';
// 也可以直接 let a = 'test';
// 定义的是任意的数组
var arrayList = [1, false, 'fine'];
var b = 12;
var c = false;
var d = 'hh';
// 下面两个是申明数组
// 元素后面加中括号
var f = [1, 2];
// 数组泛型
var e = [1, 2];
// 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。
var g;
g = ['Runoob', 1]; // 运行正常
// 枚举类型用于定义数值集合。
// var Color;
// (function (Color) {
//     Color[Color["Red"] = 0] = "Red";
//     Color[Color["Green"] = 1] = "Green";
//     Color[Color["Blue"] = 2] = "Blue";
// })(Color || (Color = {}));
// ;
// var h = Color.Blue;
// console.log(h); // 输出 2
// 用于标识方法返回值的类型，表示该方法没有返回值。
function hello() {
    alert("Hello Runoob");
}
// never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。
// 这意味着声明为 never 类型的变量只能被 never 类型所赋值，
// 在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环）
// 还有null 和 undefined
// 定义多忠可能值
var x;
// 类型断言
// 类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型。
// 写法 <类型>值 或  值 as 类型
var str = '1';
var str2 = str; //str、str2 是 string 类型
console.log(typeof str2);
