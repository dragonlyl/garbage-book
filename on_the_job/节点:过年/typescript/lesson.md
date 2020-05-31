# typescript

## 基础

### 原始数据类型

#### 布尔值

`let c: boolean = false;`
跟js一样 用new Boolean创建的是Boolean类型不是布尔值
`let createdByNewBoolean: boolean = new Boolean(1);`

#### 数值

let b: number = 12;

#### 字符串

let d: string = 'hh';

#### 空值

js没有空值（Void）的概念的概念，而ts有可以用 void 表示没有任何返回值的函数

```// 声明空的函数
function alertName(): void {
    alert('My name is Tom');
}
```

#### Null和Undefined

ts可以专门这两个原始的数据类型
`let u: undefined = undefined;let n: null = null;`
>与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量：

``` // 如上面的说明 undefined和 void的区别
// 这样不会报错
let num: number = undefined;
// 这样也不会报错
let u: undefined;
let num: number = u;

而 void 类型的变量不能赋值给 number 类型的变量：
let u: void;
let num: number = u;
// Type 'void' is not assignable to type 'number'.
```

### 任意值

用any来表示的值是任意的
**即定义为any的值后期改变值的类型是不会报错的**

#### 未声明类型的变量都是任意值

let something;
something = 'seven';
something = 7;

something.setName('Tom');

### 类型推论

注意跟上面的不同

>这里虽然没有写明声明对象的类型，但是ts会根据规则推断出一个规则
**跟上面的不同是上面在声明的时候并没有马上给他赋值，这样在后面改变值的类型是不会报错的**

let myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
// index.ts(2,1): error TS2322: Type 'number' is not assignable to type 'string'.
事实上，它等价于：
let myFavoriteNumber: string = 'seven';
myFavoriteNumber = 7;

### 联合类型

// 定义多忠可能值。可以给x赋值 number，null，undefined值，不会报错
let x: number | null | undefined;
x = 'seven';
x = 7;

#### 访问联合类型的属性和方法

当ts不知道要访问联合类型的那个类型时，我们***只能访问联合类型的共同属性和方法***

function getLength(something: string | number): number {
    return something.length;
}
// 上面的length不是string和number的共同属性（只是string的属性），所以会报错
如果调用的是`toString()` 的方法的时候是可以的

> 虽然联合类型时可以赋予不同的类型的值的，，但是赋予某种值的时候**ts会推断当前值的类型**即如果是赋予数字，那么调用length就会报错（因为ts判断当前类型为数字，不具备length方法）
同上面的类型推断

### 对象的类型---接口（Interfaces）

在面向对象语言中，接口（`Interfaces`）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（`classes`）去实现（`implement`）。

如果定义的类变量的属性比接口少/多都是会报错的

```ts
interface Person {
    name: string;
    age: number;
}
// 这里没有实现age这个属性，所以会报错
let tom: Person = {
    name: 'Tom'
};
```

#### 可选属性

当然如果某个接口里面的内容我们不一定要全部继承的时候可以用可选属性

``` ts
interface Person {
    name: string;
    age?: number;
}
// 上面的age是可选的，所以可以不再下面的变量进行实现
let tom: Person = {
    name: 'Tom'
}
```

#### 任意属性

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: any;
}
// 上面的属性名未定
let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
```

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
// 这里会报错， 因为有任意属性的存在 ，name 和age的属性只能是string，不能是number（
// 因为number不是string的子属性）
```

#### 只读属性

一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性
**只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候**

``` ts
//这里没有给id赋初值
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}
// 1. 这里没有给id赋初值所以报错
let tom: Person = {
    name: 'Tom',
    gender: 'male'
};
// 2. 只读的对象是不能重新赋值的，所以又报错了
tom.id = 89757;
// index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

### 数组的类型

#### 「类型 + 方括号」表示法

`let f: number[] = [1,2];`
那么数组后面的所有都必须是数字，不能出现非数字类型

#### 数组泛型

我们也可以使用数组泛型（Array Generic） `Array<elemType>` 来表示数组：

`let fibonacci: Array<number> = [1, 1, 2, 3, 5];`

#### 接口表示数组

``` ts
// 表示：只要索引的类型是数字时，那么值的类型必须是数字。
interface NumberArray {
    [index: number] : number;
}
let arr: Arr = [1,2,3,4]
```

虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。
不过有一种情况例外，那就是它常用来表示**类数组**。

#### 类数组

类数组（Array-like Object）不是数组类型，比如 `arguments`

``` // arguments的定义
function sum() {
    let args: {
        [index: number]: number;
        length: number;
        callee: Function;
    } = arguments;
}
```

因为有这种现象，所以有专门的类型来定义
如 `IArguments, NodeList, HTMLCollection` 等：

```IArguments
// IArguments 是ts内置对象，直接使用
function sum() {
    let args: IArguments = arguments;
}
// IArguments的原理
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}
```

#### any 在数组中的应用

`let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];`

### 函数

函数多输入/少输入参数是不行的

#### 函数声明

function_name():return_type

``` ts
//如果没有返回值可以用void
function add(x: number, y: number): number {
// rate:number = 0.50   // 默认参数写法
    return x + y;
}
console.log(add(1,2))
```

#### 函数表达式

可能会这样写但是是有问题的,问题在于 `mySum`的类型并没有定义（这样写是赋值操作进行类型推论而推断出来的）
`let mySum = function (x: number, y: number): number { return x + y; };`
实际写法
`let mySum: (x: number, y: number) => number = function (x: number, y: number): number { return x + y; };`
这里的箭头跟es6的箭头不是一个箭头 
>在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

#### 用接口定义函数的形状

用接口的方式来定义一个函数需要符合的形状：

``` js
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

#### 可选参数

用 `?`来设置 ，同接口

``` js
function buildName(firstName: string, lastName?: string) {
    if (lastName) {
        return firstName + ' ' + lastName;
    } else {
        return firstName;
    }
}
let tomcat = buildName('Tom', 'Cat');
let tom = buildName('Tom');
```

**可选参数后面不允许再出现必需参数了**
即可选参数只能写在最后，不能写在前面

#### 参数默认值

如果可选参数赋予了默认值，那么就不一定要放在参数最后面了
如果要使用默认参数 可以给值赋予`undefined`就好了

``` js
function buildName(firstName: string = 'Tom', lastName: string) {
    return firstName + ' ' + lastName;
}
let tomcat = buildName('Tom', 'Cat');
let cat = buildName(undefined, 'Cat');
```

#### 剩余参数

同es6的 ... 一样

``` js
function push(array: any[], ...items: any[]) {
    items.forEach(function(item) {
        array.push(item);
    });
}

let a = [];
push(a, 1, 2, 3);
```

#### 重载

``` TypeScript
// 这里通过一个方法返回 数字和字符串的处理
// 这样有一个缺点，就是不能够精确的表达，
// 输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串。
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
// 改进写法
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
    if (typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''));
    } else if (typeof x === 'string') {
        return x.split('').reverse().join('');
    }
}
```

上例中，我们重复定义了多次函数 `reverse`，前几次都是函数定义，最后一次是函数实现。在编辑器的代码提示中，可以正确的看到前两个提示。

注意，`TypeScript` 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。

### 类型断言

可以用来手动指定一个值的类型。

#### 语法

`<类型>值` 或 `值 as 类型`
在tsx 语法（React 的 jsx 语法的 ts 版）中必须用后一种。

#### 将一个联合类型的变量指定为一个更加具体的类型

``` js
// 这里会报错，因为length不是number和string的共同属性
function getLength(something: string | number): number {
    if (something.length) {
        return something.length;
    } else {
        return something.toString().length;
    }
}
// 所以需要借助类型断言 在需要断言的变量前加上 <Type> 即可。
function getLength(something: string | number): number {
    if ((<string>something).length) {
        return (<string>something).length;
    } else {
        return something.toString().length;
    }
}
```

**注： 类型断言不是类型转换，断言成一个联合类型中不存在的类型是不允许的：**
即上面的如果断言为boolean就会报错

### 声明文件

太杂了就没看了。。。。。

### 内置对象

#### ECMAScript 的内置对象

ECMAScript 标准提供的内置对象有：

`Boolean、Error、Date、RegExp` 等。
我们可以在 TypeScript 中将变量定义为这些类型：

``` ts
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;
```

#### DOM 和 BOM 的内置对象

`DOM` 和 `BOM` 提供的内置对象有：

`Document、HTMLElement、Event、NodeList` 等。

TypeScript 中会经常用到这些类型：

``` typescript
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});
```

再举一个 DOM 中的例子：

``` ts
document.addEventListener('click', function(e) {
    console.log(e.targetCurrent);
});
// index.ts(2,17): error TS2339: Property 'targetCurrent' does not exist on type 'MouseEvent'.

// 上面的例子中，addEventListener 方法是在 TypeScript 核心库中定义的：

interface Document extends Node, GlobalEventHandlers, NodeSelector, DocumentEvent {
    addEventListener(type: string, listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
}
// 所以 e 被推断成了 MouseEvent，而 MouseEvent 是没有 targetCurrent 属性的，所以报错了。
```

注意，`TypeScript` 核心库的定义中不包含 `Node.js` 部分

## 进阶

### 类型别名 type

使用 `type` 创建类型别名。类型别名常用于联合类型。

``` ts
// 这里用Name来代替string
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
    if (typeof n === 'string') {
        return n;
    } else {
        return n();
    }
}
```

### 字符串字面量类型

字符串字面量类型用来约束取值只能是某几个字符串中的一个

```ts
// 用 type 定了一个字符串字面量类型 EventNames，它只能取三种字符串中的一种。
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}

handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
handleEvent(document.getElementById('world'), 'dbclick'); // 报错，event 不能为 'dbclick'

```

**类型别名与字符串字面量类型都是使用 type 进行定义。**

### 元组

数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象。

#### 简单的例子

`let tom: [string, number] = ['Tom', 25];`

可以对元组里面的某一项赋值，但是直接对元组类型的变量进行初始化或者赋值的时候需要提供元组类型指定的项

``` ts
// 对某一项赋值
let tom: [string, number];
tom[0] = 'Tom';

// 这里会报错，因为没有初始化number这个项
let tom: [string, number];
tom = ['Tom'];

```

#### 越界的元素

如果想tom里面push新的元素，那么元素必须是每个类型的联合类型，即上面的只能push `string,number`两种类型， 如果push 布尔值就会报错

### 枚举

`enum`关键字来声明，

`enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};`
枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
`console.log(Days["Sun"] === 0); // true`
`console.log(Days[0] === "Sun"); // true`

#### 手动赋值

``` ts
// 这里Web跟 Sun重复了， 虽然两者都指向3， 但是从3指向的挚友Web
enum Days {Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat};

console.log(Days["Sun"] === 3); // true
console.log(Days["Wed"] === 3); // true
console.log(Days[3] === "Sun"); // false
console.log(Days[3] === "Wed"); // true
```

注： 如果 Mon 定义的是0.5 ，那么Tue是1.5

#### 常数项和计算所得项

// 这样是没有问题的， 但是如果把blue放到red或者green前面就会报错
因为 **紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错**
`enum Color {Red, Green, Blue = "blue".length};`

#### 常数枚举

常数枚举是使用 `const enum` 定义的枚举类型

```ts
const enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];

// 编译后的代码里面没有常数枚举声明的这行声明代码 上面代码编译后代码
var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];
```

常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

#### 外部枚举

外部枚举（Ambient Enums）是使用 `declare enum` 定义的枚举类型

```ts
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}

let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// 之前提到过，declare 定义的类型只会用于编译时的检查，编译结果中会被删除。编译后代码
var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```

### 类

回顾一下es6的类

#### 属性和方法

使用 `class` 定义类，使用 `constructor` 定义构造函数。

通过 new 生成新实例的时候，会自动调用构造函数

``` js
class Animal {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `My name is ${this.name}`;
    }
}

let a = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

#### 类的继承

```js
class Cat extends Animal {
    constructor(name) {
        super(name);
        console.log(this.name);
    }
    sayHi() {
        return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
    }
}
let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
```

#### 存取器

使用`get`和`set`

```js
class Animal{
    constructor(name) {
        this.name = name;
    }
    set name(value) {
        console.log('Setter' + value);
    }
    get name() {
        return "Jack";
    }
}
let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```

#### 静态方法

使用`static`修饰符修饰的方法，并不需要实例化，直接通过类来调用

```js
class Animal {
    constructor() {
        this.name = name;
    }
    static isAnimal(a) {
        return a instanceof Animal;
    }
}
let person = new Animal('Jack');
Animal.isAnimal(person); // true
// 这里会报错 因为静态方法只能通过类来调用
person.isAnimal(persion);
// TypeError: person.isAnimal is not person function

```

#### ES7类的方法

##### 实例属性

ES6 中实例的属性只能通过构造函数中的 `this.xxx`来定义，ES7 提案中可以直接在类里面定义：

```js
class Animal() {
    name = "jack";
}
let a = new Animal();
console.log(a.name);
```

##### 静态属性

直接通过构造类调用
static num = 42；
Animal.num;

#### ts中类的方法

##### public、private和protect

1. `public` 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 `public` 的
2. `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
3. `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

```js
class Animal {
    private name;
    public constructor(name) {
        this.name = name;
    }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';

// index.ts(9,13): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
// index.ts(10,1): error TS2341: Property 'name' is private and only accessible within class 'Animal'
```

使用 private 修饰的属性或方法，在子类中也是不允许访问的：

```js
class Animal {
    private name;
    public constructor(name) {
        this.name = name;
    }
}

class Cat extends Animal {
    constructor(name) {
        super(name);
        console.log(this.name);
    }
}

// index.ts(11,17): error TS2341: Property 'name' is private and only accessible within class 'Animal'.
```

有上面可知，如果构造函数为`private`的话，那么用`super`也会报错

当构造函数修饰为 `protected` 时，该类只允许被继承：

```js
class Animal {
    public name;
    protected constructor (name) {
        this.name = name;
  }
}
class Cat extends Animal {
    constructor (name) {
        super(name);
    }
}

let a = new Animal('Jack');

// index.ts(13,9): TS2674: Constructor of class 'Animal' is protected and only accessible within the class declaration.
```

##### readonly

只允许出现在属性声明或索引签名中。

```js
class Animal {
    readonly name;
    public constructor(name) {
        this.name = name;
    }
}

let a = new Animal('Jack');
console.log(a.name); // Jack
a.name = 'Tom';

// index.ts(10,3): TS2540: Cannot assign to 'name' because it is a read-only property.
```

注意如果 `readonly` 和其他访问修饰符同时存在的话，需要写在其后面。

#### 抽象类

`abstract` 用于定义抽象类和其中的抽象方法

抽象类是无法被实例化的

其次抽象类的抽象方法必须被子类实现

```js
abstract class Animal {
    public name;
    public constructor(name) {
        this.name = name;
    }
    public abstract sayHi();
}

class Cat extends Animal {
    public eat() {
        console.log(`${this.name} is eating.`);
    }
    // 即这行代码必须要写，要不然就报下面的错误
    // public sayHi() {
    //     console.log(`Meow, My name is ${this.name}`);
    // }
}

let cat = new Cat('Tom');

// index.ts(9,7): error TS2515: Non-abstract class 'Cat' does not implement inherited abstract member 'sayHi' from class 'Animal'.
```

#### 类的类型

给类加上ts的类型

```js
class Animal {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
    sayHi(): string {
      return `My name is ${this.name}`;
    }
}

let a: Animal = new Animal('Jack');
console.log(a.sayHi()); // My name is Jack
```

### 类与接口

#### 类实现接口

实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性，这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。

举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法。这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它：

>一句话概括上面的意思的就是： 两个东西不属于同一个种类，但是这两个类有一个一样的功能

```ts
interface Alarm {
    alert();
}
class Door {
    constructor() {
    }
}
class SecurityDoor extends Door implements Alarm {
    alert() {
        console.log('SecurityDoor alert');
    }
}
class Car implements Alarm {
    alert() {
        console.log('Car alert');
    }
}

例子二： 当然可以继承多个类
interface Light {
    lightOn();
    lightOff();
}

class Car implements Alarm, Light {
    alert() {
        console.log('Car alert');
    }
    lightOn() {
        console.log('Car light on');
    }
    lightOff() {
        console.log('Car light off');
    }
}

例子三： 接口与接口之间也可以是继承关系
interface LightableAlarm extends Alarm {
    lightOn();
    lightOff();
}

例子四： 接口也可以继承类
class Point {
    x: number;
    y: number;
}

interface Point3d extends Point {
    z: number;
}

let point3d: Point3d = {x: 1, y: 2, z: 3};
```

#### 混合类型

使用接口的方式来定义一个函数需要符合的形状：
之前有用接口来现在函数的，现在再写一遍

```ts
接口实现函数
interface SearchFun {
    (source: string, subString: string): boolean;
}
let mySearch: SearchFun;
mySearch = function (source: string, subString: string) {
    return source.search(subString) !== -1;
}
```

有时候，一个函数还可以有自己的属性和方法：

```ts
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

### 泛型

泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

#### 举个例子

首先，我们来实现一个函数 `createArray`，它可以创建一个指定长度的数组，同时将每一项都填充一个默认值：

```js
function createArray(length: number, value: any): Array<any> {
    let result = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray(3, 'x'); // ['x', 'x', 'x']

一个显而易见的缺陷是，它并没有准确的定义返回值的类型：
Array<any> 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 value 的类型。

所以就有了下面的泛型/
在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了。
function createArray<T>(length: number, value: T): Array<T> {
    let result: T[] = [];
    for (let i = 0; i < length; i++) {
        result[i] = value;
    }
    return result;
}

createArray<string>(3, 'x'); // ['x', 'x', 'x']
当然，也可以不手动指定，而让类型推论自动推算出来：
即上面的调用可以写成下面的形式； 也是不会报错的
createArray(3, 'x'); // ['x', 'x', 'x']
```

#### 多个类型参数

```ts
这里定义了多个类型的泛型
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]];
}

swap([7, 'seven']); // ['seven', 7]
```

#### 泛型的约束

在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法：

即上面的T 不能直接调用 `tuple[1].length` 因为并不知道这个tuple[1]里面的值是什么类型的

所以我们可以对泛型进行添加约束

```js
interface Lengthwise {
    length: number;
}
使T遵循lengthwise接口的类型，必须包含length属性（即为字符串）
这种情况下如果调用这个函数传入的参数为数字就会报错
function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```