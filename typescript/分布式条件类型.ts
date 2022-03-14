// [条件类型 -- Typescript类型编程篇](https://juejin.cn/post/6844904169929719815)
type fn<T> = T extends number ? true : false

type a = fn<'a'>
type b = fn<2>
// (string | number) extends T ? A : B	(string extends T ? A : B) | (number extends T ? A : B)
type c = fn<2 | 'a'> //  所以是 true | false

// 作用
// 筛选 A 中不存在B中的内容
type Without<A, B> = A extends B ? never : A
type d = Without<boolean | number | string, boolean> // type d = string | number

interface objE {
    a: string,
    b: boolean
}
type ValueOf<T> = T[keyof T];
type valueType = ValueOf<objE>
type e = Without<valueType, boolean> // 移除 objE 为boolean 类型的值
//  never作用: 它可以用于指定一个永远无法返回的函数的返回类型。
// [never 问题](https://www.zhihu.com/question/354601204)
// 什么函数不会返回值呢？比如：错误处理函数，无限循环函数。 // 比如死循环,区分与void 


type A = { a: number; b: 'b'; c: never; }; 
type B = keyof A // type B = "a" | "b" | "c" 
type C = A[B] // number | "b", 这里 never 去除了

// 条件类型中待检查的类型（即extends左边的类型）必须是裸类型（naked type parameter）。
// 即没有被诸如数组，元组或者函数包裹


type Test<T> = T extends true ? 1 : 2;

type res = Test<boolean>; // boolean 也是联合类型会把每个类型单独传入
// [TypeScript 类型 原因](https://juejin.cn/post/7066745410194243597)

// 重要: 条件类型当 checkType（左边的类型）是类型参数的时候，会有 distributive 的性质，
// 也就是传入联合类型时会把每个类型单独传入做计算，最后把结果合并返回。这叫做分布式条件类型。

// 此外，条件类型遇到 never 会直接返回 never，遇到 any 会返回 trueType 和 falseType 的联合类型。

// 再就是 boolean 也是联合类型，是 true | false。

// any 不是联合类型 