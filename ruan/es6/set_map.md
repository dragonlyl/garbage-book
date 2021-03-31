# set

## set也可以用于字符串去重

[...new Set('ababbc')].join('')
// "abc"

## Set 加入值的时候，不会发生类型转换

'5' 不等于5
NaN等于自身
两个对象总是不相等 {} 跟 {} 不相同

let set = new Set();

set.add({});
set.size // 1

set.add({});
set.size // 2

set.has({}); // true

## 对象属性用set

下面是一个对比，看看在判断是否包括一个键上面，Object结构和Set结构的写法不同。

```js
// 对象的写法
const properties = {
  'width': 1,
  'height': 1
};

if (properties[someName]) {
  // do something
}

// Set的写法
const properties = new Set();

properties.add('width');
properties.add('height');

if (properties.has(someName)) {
  // do something
}
```

## set的遍历

set的遍历顺序就是插入顺序。这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用。

Set 结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致

```js
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

set 也有foreach

## 并集交集

```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]);
// Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x)));
```

## WeakSet

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

1. 首先，WeakSet 的成员只能是对象，而不能是其他类型的值。

2. WeakSet对对象的引用是弱引用,不会影响垃圾回收机制对该对象内存的回收,即如果外部没有引用该对象,那么会被回收,不用考虑WeakSet里面是否对该对象引用.**所以适合临时存放一组对象,以及存放跟对象绑定的信息,只要这些对象在外部消失,它在 WeakSet 里面的引用就会自动消失**

WeakSet 是一个构造函数，可以使用new命令，创建 WeakSet 数据结构。

`const ws = new WeakSet();`
作为构造函数，WeakSet 可以接受一个数组或类似数组的对象作为参数。（实际上，任何具有 Iterable 接口的对象，都可以作为 WeakSet 的参数。）该数组的所有成员，都会自动成为 WeakSet 实例对象的成员。

```js
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
// WeakSet {[1, 2], [3, 4]}
上面代码中，a是一个数组，它有两个成员，也都是数组。将a作为 WeakSet 构造函数的参数，a的成员会自动成为 WeakSet 的成员。

注意，是a数组的成员成为 WeakSet 的成员，而不是a数组本身。这意味着，数组的成员只能是对象。

const b = [3, 4];
const ws = new WeakSet(b);
// Uncaught TypeError: Invalid value used in weak set(…)
```

>> WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

## map

```js
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
上面代码中，我们分别使用 Set 对象和 Map 对象，当作Map构造函数的参数，结果都生成了新的 Map 对象。

// 如果对同一个键多次赋值，后面的值将覆盖前面的值。

const map = new Map();

map
.set(1, 'aaa')
.set(1, 'bbb');// 可以通过链式的写法

map.get(1) // "bbb"
```

## map转换为对象

```js
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [i,j] of strMap) {
        obj[i] = j;
    }
    return obj;
}
const myMap = new Map();
myMap.set('yes', true).set('no', false);
strMapToObj(myMap)
```

## WeakMap

1. WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。

    ```js
        const map = new WeakMap();
        map.set(1, 2)
        // TypeError: 1 is not an object!
        map.set(Symbol(), 2)
        // TypeError: Invalid value used as weak map key
        map.set(null, 2)
        // TypeError: Invalid value used as weak map key
    ```

2. WeakMap的键名所指向的对象，不计入垃圾回收机制。例子如下:

    ```js
        const e1 = document.getElementById('foo');
        const e2 = document.getElementById('bar');
        const arr = [
            [e1, 'foo 元素'],
            [e2, 'bar 元素'],
        ];
        // 一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。
        // 不需要 e1 和 e2 的时候
        // 必须手动删除引用
        arr [0] = null;
        arr [1] = null;
    ```

### WeakMap用途

WeakMap 应用的典型场合就是 DOM 节点作为键名

```js
let myWeakmap = new WeakMap();

myWeakmap.set(
  document.getElementById('logo'),
  {timesClicked: 0})
;

document.getElementById('logo').addEventListener('click', function() {
  let logoData = myWeakmap.get(document.getElementById('logo'));
  logoData.timesClicked++;
}, false);
// 一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。
```