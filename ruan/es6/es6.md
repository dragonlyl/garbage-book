# ES6

## let

### 暂时性死区

总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”

var tmp = 123;
if (true) {
  // 即内部如果有let 声明的变量就不会受外面的同名影响
  tmp = 'abc'; // ReferenceError
  let tmp;
}

// 这种死区比较隐蔽
function bar(x = y, y = 2) {
  return [x, y];
}

bar(); // 报错
//是因为参数x默认值等于另一个参数y，而此时y还没有声明，属于“死区”。
//即如果是 x = 2; y = x 就不会报错

## const

变量指向的那个内存地址所保存的数据不得改动。对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。但对于复合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的（即总是指向另一个固定的地址），至于它指向的数据结构是不是可变的，就完全不能控制了。

如果真要变量不变  用 Object.freeze(obj)
// 最高级保护  还有seal 最低级是preventExtensions
三者区别

1. preventExtensions 用Obejct.isExtensible用来判断是否可以被扩展
锁住对象属性，使其不能够拓展，也就是不能增加新的属性，但是属性的值仍然可以更改，也可以把属性删除
2. seal 用Object.isSealed由于判断对象是否被密封
把对象密封，也就是让对象既不可以拓展也不可以删除属性（把每个属性的configurable设为false）,但是属性值仍然可以修改
3. Object.freeze 用Object.isFrozen判断对象是否被冻结
在seal的基础上，属性值也不可以修改（每个属性的wirtable也被设为false）

const foo = Object.freeze({});
foo.prop = 123; // 严格模式报错；常规模式代码无效

## es6声明变量的六种方法

ES5 只有两种声明变量的方法：`var`命令和`function`命令。ES6 除了添加`let`和`const`命令，后面章节还会提到，另外两种声明变量的方法：`import`命令和`class`命令。

## 解构

只要某种 数据结构具有Iterator接口，都可以采用数组的解构

### 解构赋予默认值

意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，只有当一个数组成员严格等于undefined，默认值才会生效。

let [x = 1] = [undefined];
x // 1

let [foo = true] = [];
foo // true

let [x = 1] = [null];
x // null

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

function f() {
  console.log('aaa');
}
// 不会输出aaa
let [x = f()] = [1];
上面代码中，因为x能取到值，所以函数f根本不会执行。上面的代码其实等价于下面的代码

### 对于对象的解构

// 例一
let { log, sin, cos } = Math;

// 例二
const { log } = console;
log('hello') // hello

**变量与属性名不一致**
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"  这样写 foo并不是变量
如果也想也 foo的值也为变量 可以这样写
let { foo: baz , foo} = { foo: 'aaa', bar: 'bbb' };

其实这里可以说明解构都是简写的
{foo} 是 {foo:foo}的简写

## Symbol

不能用new 来创建新的Symbol

const s1 = Symbol();
const s2 = Symbol();
s1 === s2; // false
const s3 = Symbol('foo');
s3.toString();// "Symbol(foo)"
s3.description; // 'foo'

正因为**每个Symbol值都是不相等**，可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。

当作为属性名时， 不能用点运算符来访问 只能通过中括号

let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"

如果希望重新使用同一个Symbol值，`Symbol.for`方法可以做到这一点。它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。

`Symbol.keyFor`方法返回一个已登记的 Symbol 类型值的`key`。
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
// 因为 Symbol 这种声明方法没有登记机制，只有`Symbol.for`为 Symbol 值登记的名字

## Set

向 Set 加入值的时候，不会发生类型转换，所以5和"5"是两个不同的值。
但是 NaN却认为是相等的

let set = new Set();
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
set // Set {NaN}
上面代码向 Set 实例添加了两个NaN，但是只能加入一个。这表明，在 Set 内部，两个NaN是相等。

>另外，两个对象总是不相等的。
即便你传的是两个相同的空对象， set.size 还是会不一样的

### Set 实例的属性和方法

Set 结构的实例有以下属性。

Set.prototype.constructor：构造函数，默认就是Set函数。
Set.prototype.size：返回Set实例的成员总数。

Set 实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。

Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
Set.prototype.clear()：清除所有成员，没有返回值。

### 遍历操作

Set 结构的实例有四个遍历方法，可以用于遍历成员。

Set.prototype.keys()：返回键名的遍历器
Set.prototype.values()：返回键值的遍历器
Set.prototype.entries()：返回键值对的遍历器
Set.prototype.forEach()：使用回调函数遍历每个成员

keys方法、values方法、entries方法返回的都是遍历器对象（详见《Iterator 对象》一章）。由于 Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致

``` // 遍历成员
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
```

Set 结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法。
这意味着，可以省略values方法，直接用for...of循环遍历 Set。
let set = new Set(['red', 'green', 'blue']);

for (let x of set) {
  console.log(x);
}
// red
// green
// blue

### WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

首先，WeakSet 的成员只能是对象，而不能是其他类型的值。

## Map

它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。例如：对象也能作为键

Map 也可以接受一个数组作为参数。该数组的成员是一个个表示键值对的数组。
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"

事实上，不仅仅是数组，**任何具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构（详见《Iterator》一章）都可以当作Map构造函数的参数**。这就是说，Set和Map都可以用来生成新的 Map。

## Proxy

Proxy实例可以作为其他对象的原型对象
var proxy = new Proxy({}, {
  get: function(target, property) {
    return 35;
  }
});

let obj = Object.create(proxy);
obj.time // 35

### get()

get方法用于拦截某个属性的读取操作，可以接受三个参数，依次为目标对象、属性名和 proxy 实例本身（严格地说，是操作行为所针对的对象），其中最后一个参数可选。

### set()

set方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选。

## Reflect

（1） 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。也就是说，从Reflect对象上可以拿到语言内部的方法。

（2） 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。

## Promise

const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
promise.then(function () {
    console.log('resolve)
})

**Promise 新建后就会立即执行。**
let promise = new Promise(function(resolve, reject) {
  console.log('Promise');
  resolve();
});

promise.then(function() {
  console.log('resolved.');
});

console.log('Hi!');

// Promise
// Hi!
// resolved
Promise 新建后立即执行，所以首先输出的是Promise。然后，then方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出。

>可以看测试用例 test-promise.html

建议都使用.catch的方法 而不使用 接收reject回调的方法 ，具体原因测试.html用例有

Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是“Promise 会吃掉错误”。

除了 .then 和 .catch  还有 .finally ,这个方法会在无论什么情况下都会被运行，但是finally方法的回调函数不接受任何参数，也就是无法知道promise的最终状态是成功还是失败（但还是有用，比如说无论结果如何都要关闭服务器）

// finally 的代码实现
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

finally方法总是会返回原来的值。
// resolve 的值是 undefined
Promise.resolve(2).then(() => {}, () => {})

// resolve 的值是 2
Promise.resolve(2).finally(() => {})

// reject 的值是 undefined
Promise.reject(3).then(() => {}, () => {})

// reject 的值是 3
Promise.reject(3).finally(() => {})

### promise.all()

const p = Promise.all([p1, p2, p3]);
Promise.all方法接受一个数组作为参数，p1、p2、p3都是 Promise 实例，如果不是，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。

p的状态由p1、p2、p3决定，分成两种情况。

（1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
（2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。

***活到老学到老  ，这是我完全没考虑过的写法***
// 生成一个Promise对象的数组
const promises = [2, 3, 5, 7, 11, 13].map(function (id) {
  return getJSON('/post/' + id + ".json");
});

Promise.all(promises).then(function (posts) {
  // ...
}).catch(function(reason){
  // ...
});

***活到老学到老***
可以自定义promise的then和catch方法
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
// 这里 可以写 result => result + ' result',
// 这样 promise的resolve就变成 hello result
// 所以 后面 p1.then(res => console.log(res));//就是 'hello result'
.then(result => result)
.catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))
.catch(e => console.log(e));
// ["hello", Error: 报错了]
上面代码中，p1会resolved，p2首先会rejected，但是p2有自己的catch方法，该方法返回的是一个新的 Promise 实例，p2指向的实际上是这个实例。**该实例执行完catch方法后，也会变成resolved**，导致Promise.all()方法参数里面的两个实例都会`resolved`，因此会调用then方法指定的回调函数，而不会调用catch方法指定的回调函数。

### promise.race()

const p = Promise.race([p1, p2, p3]);
上面代码中，只要p1、p2、p3之中有一个实例率先改变状态，p的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给p的回调函数。

Promise.race方法的参数与Promise.all方法一样，如果不是 Promise 实例，就会先调用下面讲到的Promise.resolve方法，将参数转为 Promise 实例，再进一步处理。

### Promise.resolve()

有时需要将现有对象转为 Promise 对象，Promise.resolve方法就起到这个作用。
const jsPromise = Promise.resolve($.ajax('/whatever.json'));

Promise.resolve等价于下面的写法。

Promise.resolve('foo')
// 等价于
new Promise(resolve => resolve('foo'))

Promise.resolve()的参数分为4中情况

1. 参数是一个 Promise 实例
2. 参数是一个thenable对象
3. 参数不是具有then方法的对象，或根本就不是对象
4. 不带有任何参数

### Promise.reject()

### promise.try()

不知道或者不想区分，函数f是同步函数还是异步操作，但是想用 Promise 来处理它。因为这样就可以不管f是否包含异步操作，都用then方法指定下一步流程，用catch方法处理f抛出的错误。一般就会采用下面的写法。

**Promise.resolve().then(f)**
const f = () => console.log('now');
Promise.resolve().then(f);
console.log('next');

上面代码中，函数f是同步的，但是用 Promise 包装了以后，就变成异步执行了。

下面的方法能够实现同步的同步执行 异步的异步执行

第一种写法
const f = () => console.log('now');
(async () => f())();
// 如果是异步的
//(async () => f())()
//.then(...)
//.catch(...)
console.log('next');
// now
// next

第二种写法

const f = () => console.log('now');
(
  () => new Promise(
    resolve => resolve(f())
  )
)();
console.log('next');
// now
// next

所以会有 Promise.try(f);

## Iterator

Iterator 的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。

Iterator 的遍历过程是这样的。

（1）创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

（2）第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

（3）第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

（4）不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

模拟实现 next方法

``` //模拟实现 next方法
var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

function makeIterator(array) {
  var nextIndex = 0;
  return {
    next: function() {
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  };
}
```

ES6 规定，默认的 Iterator 接口部署在数据结构的Symbol.iterator属性，或者说，一个数据结构只要具有Symbol.iterator属性，就可以认为是“可遍历的”（iterable）。

const obj = {
  [Symbol.iterator] : function () {
    return {
      next: function () {
        return {
          value: 1,
          done: true
        };
      }
    };
  }
};

数组本身具有Symbol.iterator
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }

## 模块

### export

模块导出语法：

1. export var a = 'aaa';
2. export { a, b };
3. export function aa (x,y) { return x + y };
4. export { aa as fn1, bb as fn2 };

错误写法
function f() {}
// 报错
export f;
// 正确
export {f};

// 正确
export function f() {};

### import

import { firstName, lastName, year as newYear } from './profile.js';
function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}

注意：

1. import命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。
即不能改变导入的值，也不能重写导入方法

2. import命令具有提升效果，会提升到整个模块的头部，首先执行。

3. 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。

整体加载 如有fn1,fn2 方法
import * as circle from './circle';
调用 fn1 的写法写为  circle.fn1

#### export 的默认输出  export default

// export-default.js
export default function () {
  console.log('foo');
}
或者
function foo() {
  console.log('foo');
}
export default foo;

// import-default.js  **不用知道方法名就能调用**
import customName from './export-default';
customName(); // 'foo'

>因为export default命令其实只是输出一个叫做default的变量，所以它后面不能跟变量声明语句。

// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;

// 正确
export default 42;

// 报错
export 42;

import语句中，同时输入默认方法和其他接口，可以写成下面这样
import _, { each, forEach } from 'lodash';

### export 与 import 的复合写法

export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };

## Class

// 普通写法
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);

// es6写法

``` // es6写法
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

### 立即执行class

let person = new class {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    console.log(this.name);
  }
}('张三');

person.sayName(); // "张三"

**注意：class中的方法的this如果是单独使用可能会造成问题**
如 test是继承Test()的类且里面有fun方法内部有this变量，如果让fun = test.fun;  那么此时调用fun的this就会指向全局；

为了解决上述问题 有两种解决方法
1.在constructor里面绑定this的指向
constructor() {
    this.printName = this.printName.bind(this);
}

### 静态方法

如果在方法前面加 static 那么该方法**实例不会继承**，即无法调用 但是原类可以调用
但是 却可以**被子类继承**
class Foo {
  static classMethod() {
    return 'hello';
  }
}
Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod(); // 报错

class Bar extends Foo {
}
Bar.classMethod() // 'hello'

### 继承extends

class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
**子类必须在constructor方法中调用super方法，否则新建实例时会报错**。这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。如果不调用super方法，子类就得不到this对象。

住：**在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有super方法才能调用父类实例。**

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class ColorPoint extends Point {
  constructor(x, y, color) {
    this.color = color; // ReferenceError
    super(x, y);
    this.color = color; // 正确
  }
}
**父类的静态方法，也会被子类继承。**
作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错。
第二种情况，super作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
