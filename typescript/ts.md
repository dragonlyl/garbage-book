# ts语法

进阶： 类与接口 中的代码内容（确认类里面的各个代码的内容）

## 接口interface

对象集成接口的时候 let xx : interface = {}

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
