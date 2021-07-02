# ts语法

进阶： 类与接口 中的代码内容（确认类里面的各个代码的内容）

## 接口interface

对象集成接口的时候 `let xx : interface = {}` // 展现形式有点像对象

1. xx需要实现interface所有的内容
2. 接口可以定义是否必须要实现的属性 age ? number ;
3. 接口可以不固定属性的类型[propsName: string ] : any // any类型必须包含其他属性的类型
4. 可以定义接口的只读， 即只有定义的时候赋值，其他都不能变化 readonly id: number;

## 数组

`let xx: number[] = [1,2,3]`

1. 可以用泛型的形式展现 `let xx: Array<number> = [1,2,3]`
2. 可以用接口表示数组 （见文档）
3. arguments 不属于数组，是类数组 （数组形式见文档）

## 函数

函数形式 形参要指定类型同时还要指定返回的类型 (): any // 后面是函数类型

1. 函数的声明 `function xx (x: number, y: number) : number {}`
2. 函数的表达式较为复杂 `let xx : (x: number, y: number) => number = function xx (x: number, y: number) : number {}`
3. 函数默认值 

## 类型断言

1. 将联合类型断言为一个类型 (但是是一种欺骗行为,欺骗编译器,但是运行会报错)

    ```js
    // 即如果还是 传入Cat类型的话, 如果没有判断语句那会运行报错
    function isFish(animal: Cat | Fish) {
        if (typeof (animal as Fish).swim === 'function') {
            return true;
        }
    }
    ```

2. 将父类断言为更具体的子类 (即有继承关系的内容)

## 进阶

### 类型别名

`type Name = string; // 表示 Name 就是string`
`type NameResolver = () => string; // NameResolver 是个函数类型`

### 字符串字面量类型

```ts
// 跟上面有点类似
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element, event: EventNames) {
    // do something
}
```

### 元组

合并了不同类型的对象 (数组是合并了相同类型的对象)

```ts
let arr2: number [] = [1,2,3]
// 下面报错 ,是因为 申明了两个,但是定义了3个 (数量没对齐)
let arr2: [number, string] = [1,'2',3]
// 后续添加的时候 ,添加的元素类型只能为 元组定义的类型
```

### 枚举

`enum Days {a,b,c,d};`
`Days.a` 或者 `Day['a']`; // 返回的是 0
`Days[0];` // 返回的是 a

1. 手动赋值
`enum Days {a=6,b};` // a 是 6 ,b是7 (接着前一项加一)

2. 前一项可以为计算数值,但是 后一项会报错 如 `a='aa'.length`,b就会报未初始化错误

3. 常数枚举 (编译阶段被删除,且不能被包含计算成员)

### 类

#### 存储器

直接改变属性读取和存储的行为

```js
class Animal {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return 'Jack';
  }
  set name(value) {
    console.log('setter: ' + value);
  }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
```

### 静态方法 (static)

### 私有修饰符 (private)

公有修饰符 可以在任意地方访问到 (默认所有属性方法都是`public`)
私有修饰符 不能在 类外部访问 `private`
保护修饰符 只能在子类访问 `protected`

区分点就是能否访问
`constructor(name) {super(name);console.log(this.name)}`

```js
class Point {
    /** 静态属性，坐标系原点 */
    static origin = new Point(0, 0);
    /** 静态方法，计算与原点距离 */
    static distanceToOrigin(p: Point) {
        return Math.sqrt(p.x * p.x + p.y * p.y);
    }
    /** 实例属性，x 轴的值 */
    x: number;
    /** 实例属性，y 轴的值 */
    y: number;
    
    private name: string;
    /** 构造函数 */
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.name = xx
    }
    /** 实例方法，打印此点 */
    printPoint() {
        console.log(this.x, this.y);
    }
}

```

### 参数属性 (除上面 还有 readonly)

可以在构造函数参数中,等同于类中定义该属性同时给属性赋值

```js
class Animal {
    public constructor (public name) {}
    // 等效于
    public name: string;
    constructor (name) {
        this.name = name
    }
}
```

### 抽象类

抽象类不运行被实例化, 且抽象方法必须被子类实现