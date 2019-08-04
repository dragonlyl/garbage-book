// https://www.runoob.com/typescript/ts-tutorial.html
// 查看版本 tsc -v 
// 运行要先转换成js 再用node 运行 tsc xx node xx
// var [变量名] : [类型] = 值;
let a: any = 'test';
// 也可以直接 let a = 'test';

// 定义的是任意的数组
let arrayList: any[] = [1, false, 'fine'];
let b: number = 12;
let c: boolean = false;
let d: string = 'hh';
// 下面两个是申明数组
// 元素后面加中括号
let f: number[] = [1,2];
// 数组泛型
let e: Array<number> = [1,2];
// 元组类型用来表示已知元素数量和类型的数组，各元素的类型不必相同，对应位置的类型需要相同。
let g: [string, number];
g = ['Runoob', 1];    // 运行正常
// 也可以直接像js一样申明数组
// let g = ['Runoob', 1];

// 枚举类型用于定义数值集合。
enum Color {Red, Green, Blue};
let h: Color = Color.Blue;
console.log(h);    // 输出 2

// 用于标识方法返回值的类型，表示该方法没有返回值。
function hello(): void {
    alert("Hello Runoob");
}

// never 是其它类型（包括 null 和 undefined）的子类型，代表从不会出现的值。
// 这意味着声明为 never 类型的变量只能被 never 类型所赋值，
// 在函数中它通常表现为抛出异常或无法执行到终止点（例如无限循环）

// 还有null 和 undefined

// 联合类型
// 定义多忠可能值。可以给x赋值 number，null，undefined值，不会报错
let x: number | null | undefined;


// 类型断言
// 类型断言可以用来手动指定一个值的类型，即允许变量从一种类型更改为另一种类型。
// 写法 <类型>值 或  值 as 类型
var str = '1' 
var str2:number = <number> <any> str   //str、str2 是 string 类型
console.log(str2,typeof str2)

// 类型推断
// 当类型没有给出时，TypeScript 编译器利用类型推断来推断类型。

// 注意： 被系统推断成一种之后，再给该变量赋予不同的类型的值时会报错


var global_num = 12          // 全局变量
class Numbers { 
   num_val = 13;             // 类变量
   static sval = 10;         // 静态变量
   
   storeNum():void { 
      var local_num = 14;    // 局部变量
   } 
} 
console.log("全局变量为: "+global_num)  
console.log(Numbers.sval)   // 静态变量
var obj = new Numbers(); 
console.log("类变量: "+obj.num_val)


// 函数返回值

// function function_name():return_type { 
//     // 语句
//     return value; 
// }
function greet():string { // 返回一个字符串
    return "Hello World" 
} 

// 带参数函数
// function func_name( param1 [:datatype], param2 [:datatype]) {   
// }

// ts中 定义了几个参数就要传几个参数 ，否则会报错
function add(x: number, y: number): number {
// rate:number = 0.50   // 默认参数写法
    return x + y;
}
console.log(add(1,2))

// 剩余参数
// 有一种情况，我们不知道要向函数传入多少个参数，这时候我们就可以使用剩余参数来定义。

function addNumbers(...nums:number[]) {  
    var i;   
    var sum:number = 0; 
    for(i = 0;i<nums.length;i++) { 
       sum = sum + nums[i]; 
    } 
    console.log("和为：",sum) 
 } 
 addNumbers(1,2,3) 
 addNumbers(10,10,10,10,10)

 // 匿名函数  也可以带参数

 var res = function(a:number,b:number) { 
    return a*b;  
}; 
console.log(res(12,2));

// 匿名函数自调用
(function () { 
    var x = "Hello!!";   
    console.log(x)     
 })()


// TypeScript 接口
// 接口是一系列抽象方法的声明，是一些方法特征的集合，这些方法都应该是抽象的，需要由具体的类去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。

// TypeScript 接口定义如下：
interface interface_name { 
}


// 接口继承
// 接口继承就是说接口可以通过其他接口来扩展自己。
// Typescript 允许接口继承多个接口。
// 继承使用关键字 extends。
// 单接口继承语法格式：
// Child_interface_name extends super_interface_name
// 多接口继承语法格式：
// Child_interface_name extends super_interface1_name, super_interface2_name,…,super_interfaceN_name


// TypeScript 类
// TypeScript 是面向对象的 JavaScript。
// 类描述了所创建的对象共同的属性和方法。
// TypeScript 支持面向对象的所有特性，比如 类、接口等。
// TypeScript 类定义方式如下：
// class class_name { 
//     // 类作用域
// }
// 完整实例
class Car { 
    // 字段
    engine:string; 
    // 构造函数
    constructor(engine:string) { 
       this.engine = engine 
    }  
    // 方法
    disp():void { 
       console.log("函数中显示发动机型号  :   "+this.engine) 
    } 
} 
// 创建一个对象
var obj1 = new Car("XXSY1")
// 访问字段
console.log("读取发动机型号 :  "+obj1.engine)  
// 访问方法
obj1.disp()

// 类的继承
// TypeScript 支持继承类，即我们可以在创建类的时候继承一个已存在的类，
//这个已存在的类称为父类，继承它的类称为子类。
// 类继承使用关键字 extends，子类除了不能继承父类的私有成员(方法和属性)和构造函数，其他的都可以继承。
// TypeScript 一次只能继承一个类，不支持继承多个类，
//但 TypeScript 支持多重继承（A 继承 B，B 继承 C）。
// 语法格式如下：
// class child_class_name extends parent_class_name

// 继承类的方法重写
// 类继承后，子类可以对父类的方法重新定义，这个过程称之为方法的重写。
// 其中 super 关键字是对父类的直接引用，该关键字可以引用父类的属性和方法。
class PrinterClass { 
    doPrint():void {
        console.log("父类的 doPrint() 方法。") 
    } 
} 
class StringPrinter extends PrinterClass { 
    doPrint():void { 
        super.doPrint() // 调用父类的函数
        console.log("子类的 doPrint()方法。")
    } 
}

// static 关键字
// static 关键字用于定义类的数据成员（属性和方法）为静态的，静态成员可以直接通过类名调用。


// 访问控制修饰符
// TypeScript 中，可以使用访问控制符来保护对类、变量、方法和构造方法的访问。TypeScript 支持 3 种不同的访问权限。
// public（默认） : 公有，可以在任何地方被访问。
// protected : 受保护，可以被其自身以及其子类和父类访问。
// private : 私有，只能被其定义所在的类访问。

// 类和接口
// 类可以实现接口，使用关键字 implements，并将 interest 字段作为类的属性使用。
// 以下实例红 AgriLoan 类实现了 ILoan 接口：
interface ILoan { 
   interest:number 
} 
class AgriLoan implements ILoan { 
    interest:number 
    rebate:number 
    constructor(interest:number,rebate:number) { 
        this.interest = interest 
        this.rebate = rebate 
    } 
} 
var obj3 = new AgriLoan(10,1) 
console.log("利润为 : "+obj3.interest+"，抽成为 : "+obj3.rebate )

//命名空间 
// TypeScript 命名空间
// 命名空间一个最明确的目的就是解决重名问题。
namespace SomeNameSpaceName { 
    export interface ISomeInterfaceName {      }  
    export class SomeClassName {      }  
}
// 以上定义了一个命名空间 SomeNameSpaceName，
// 如果我们需要在外部可以调用 SomeNameSpaceName 中的类类和接口，
// 则需要在类和接口添加 export 关键字。


// TypeScript 模块

// TypeScript 声明文件