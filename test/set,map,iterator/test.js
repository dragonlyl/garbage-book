// https://www.cnblogs.com/imwtr/p/5913790.html

// 解构赋值以及扩展运算符的便利，多亏了内部实现的默认iterator迭代器接口
// 可以使用其Symbol.iterator属性获得
var arr = [1, 2, 3];

var it = arr[Symbol.iterator]();

console.log(it.next()); // {done: false, value: 1}
console.log(it.next()); // {done: false, value: 2}
console.log(it.next()); // {done: false, value: 3}
console.log(it.next()); // {done: true, value: undefined}

// 上述的iterator接口表现形式过于隐秘，
// 在generator生成器函数中，我们可以看看比较显示的iterator接口调用
function* showNumbers() {
    yield 1;
    yield 2;
    yield 3;
}

var show = showNumbers();

show.next(); // {done: false, value: 1}
show.next(); // {done: false, value: 2
show.next(); // {done: true, value: 3}

// 结合上述两个例子，应该知道可以通过Symbol.iterator与generator的结合，
// 创建出一个iterator迭代器
var obj = {};

obj[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};

[...obj] // [1, 2, 3]



// set
// Set是ES6中新引入的数据结构，它类似于数组，但是成员的值都是唯一的，没有重复的值。
// 可以通过实例化其构造函数，用来生成Set数据结构，通过.add()方法插入值，
// 通过for...of循环遍历相应值

var s = new Set();

var arr = [1, 2, 2, 3];

arr.forEach(function(item) {
    s.add(item);
});

for (var item of s) {
    console.log(item) // 1 2 3
}

//去重函数
// Set判断是否重复，是使用到了全等===条件，即类型及值完全相等才摈除
var arr = [1, 2, 2, 3];


function unique(arr) {
    return [...new Set(arr)];
}

unique(arr) // [1, 2, 3]

// set有一些属性和方法

// Set.prototype.constructor：构造函数，默认就是Set函数。
// Set.prototype.size：返回Set实例的成员总数。
// add(value)：添加某个值，返回Set结构本身。
// delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
// has(value)：返回一个布尔值，表示该值是否为Set的成员。
// clear()：清除所有成员，没有返回值。
console.log('set属性和方法')
var s = new Set();

s.add(1).add(2).add(2);

s.size // 2

s.has(1) // true
s.has(2) // true
s.has(3) // false

s.delete(2);
s.has(2) // false

s.clear()
s.has(1) // false


// set的一些遍历操作

// keys()：返回键名的遍历器
// values()：返回键值的遍历器
// entries()：返回键值对的遍历器
// forEach()：使用回调函数遍历每个成员
console.log('set遍历操作');
let set = new Set(['red', 'green', 'blue']);

for (let item of set.keys()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.values()) {
  console.log(item);
}
// red
// green
// blue

for (let item of set.entries()) {
  console.log(item);
}
// ["red", "red"]
// ["green", "green"]
// ["blue", "blue"]
let set1 = new Set([1, 2, 3]);
set1.forEach((value, key) => console.log(value * 2) )
// 2
// 4
// 6


// set与数组的转换
// 数组转换成set结构只需要将数组加入到set构造函数参数中实例化即可
// set集合转换成数组，可简单的使用扩展运算符...，也可使用Array.from()的新方法


// Map
// Map也是ES6中新引入的数据结构，它类似于Hash结构，
// 属于键=>值对的结构，每一项值可用key=>value来表示
// 通过实例化构造函数生成一个map对象，再通过.set方法设置相关项的键值对，
// 通过.get方法获取相应的键值对

var m = new Map();
var obj = {str: 'str'};

m.set(obj, 'content');
m.get(obj) // "content"

// 也可以直接在构造函数中加入一个数组参数，直接实例化出map对象

var map = new Map([
    ['name', '张三'],
    ['title', 'Author']
  ]);
  
  console.log(map.size,'map_size') // 2
  console.log(map.has('name')) // true
  console.log(map.get('name')) // '张三''
  console.log(map.has('title')) // true
  console.log(map.get('title')) // 'Author'

//   类似Set，Map也有一些常见的属性和方法
// size属性 返回Map结构的成员总数。
// set(key, value) 设置key所对应的键值，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就新生成该键
// get(key) 读取key对应的键值，如果找不到key，返回undefined。
// has(key) 返回一个布尔值，表示某个键是否在Map数据结构中
// delete(key) 删除某个键，返回true。如果删除失败，返回false
// clear() 清除所有成员，没有返回值。

// 类似Set，Map也有一些常见的遍历方法

// keys()：返回键名的遍历器。
// values()：返回键值的遍历器。
// entries()：返回所有成员的遍历器。
// forEach()：遍历Map的所有成员

let map2 = new Map([
    ['F', 'no'],
    ['T',  'yes'],
  ]);
for (let value of map.values()) {
    console.log(value);
}
for (let item of map.entries()) {
    console.log(item[0], item[1]);
}
  // "F" "no"
  // "T" "yes"
  
  // 或者
for (let [key, value] of map.entries()) {
    console.log(key, value);
}
// 等同于使用map.entries()
for (let [key, value] of map) {
    console.log(key, value);
  }


//   Map与数组的转换
// 与Set一样，Map和数组直接也可以相互转换
// 使用扩展运算符...可以将Map转换为数组
let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
[...myMap]
// [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]

// 实例化Map构造函数时传入参数可将数组转换为Map对象
new Map([[true, 7], [{foo: 3}, ['abc']]])
// Map {true => 7, Object {foo: 3} => ['abc']}