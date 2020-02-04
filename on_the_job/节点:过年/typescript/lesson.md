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

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

如果定义的类变量的属性比接口少/多都是会报错的
interface Person {
    name: string;
    age: number;
}
// 这里没有实现age这个属性，所以会报错
let tom: Person = {
    name: 'Tom'
};

#### 可选属性

当然如果某个接口里面的内容我们不一定要全部继承的时候可以用可选属性
interface Person {
    name: string;
    age?: number;
}
// 上面的age是可选的，所以可以不再下面的变量进行实现
let tom: Person = {
    name: 'Tom'
}