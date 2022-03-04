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

//  never作用: 它可以用于指定一个永远无法返回的函数的返回类型。
// [never 问题](https://www.zhihu.com/question/354601204)
// 什么函数不会返回值呢？比如：错误处理函数，无限循环函数。 // 比如死循环,区分与void 


type A = { a: number; b: 'b'; c: never; }; 
type B = keyof A // type B = "a" | "b" | "c" 
type C = A[B] // number | "b", 这里 never 去除了

// 条件类型中待检查的类型（即extends左边的类型）必须是裸类型（naked type parameter）。
// 即没有被诸如数组，元组或者函数包裹