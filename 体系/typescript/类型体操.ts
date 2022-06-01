/**
 * https://juejin.cn/post/7061556434692997156
 * [模式匹配-让你 ts 类型体操水平暴增的套路](https://juejin.cn/post/7045536402112512007)
 */

//  (if else 条件类型)
type A1 = 1
type B12 = 2
type example1 = A1 extends B12 ? true : false // false 

// (模式匹配)
type A2 = [1, 2, 3]
// 即数组至少有一项就能匹配这个extends
type example2 = A2 extends [infer First, ...infer Rest] ? First : never // 1
type B2 = "123"
type exampleB2 = B2 extends `${infer FirstChar}${infer Rest}` ? FirstChar : never // "1"

// 都是通过 extends 来进行模式匹配
type getPromiseVal<T> = T extends Promise<infer R> ? R : never
type number1 = getPromiseVal<Promise<number[]>> // 就能拿到promise 里面的类型

// 实现 pop
// 前面的尖括号 是为了规范输入的内容, 对后面的没有影响
type Pop<T extends unknown[]> = T extends [...infer Rest, infer R] ? [...Rest] : never;
type res1 =  Pop<[1, 2, 3]>
type res2 = Pop<[]>
// type res3 = Pop<12>

// 字符串模式匹配
// 出掉前面的 空格,制表符,换行符
type TrimLeft<Str extends string> = Str extends `${' '| '\t' | '\n'}${infer R}` ? TrimLeft<R> : Str
type res4 = TrimLeft<'   abc'> // 'abc'

// 取出函数里面的参数
type getFnVal<Fn extends Function> = Fn extends(...params:infer P) => any ? P : never
type res11 = getFnVal<(a: number, b: boolean) => void> // [a: number, b: boolean]

// (与或非)
// 与 即 C1, C2 都为真
type And<C1 extends boolean, C2 extends boolean> = C1 extends true ? ( C2 extends true ? true : false)  : false

// ts 目前不支持动态个数的泛型参数，因此如果有多个条件，我们需要定义多个不同的

// 即 判断3 个条件 那我们就要写三个条件匹配的范式
type And3<C1 extends boolean, C2 extends boolean, C3 extends boolean> = And<And<C1, C2>, C3>
// 4个同理
type And4<C1 extends boolean, C2 extends boolean, C3 extends boolean, C4 extends boolean> = And<And3<C1, C2, C3>, C4>

// (== 和 ===)

// Left extends Right ? xx : xx  只会进行结构性兼容的检查
type Example1 = { a: 1; b: 2 } extends { a: 1 } ? true : false // true
type Example2 = 1 | 2 extends 1 ? true : false // true
type IsEqual<A, B> = (<T>() => T extends A ? 1 : 2) extends <
  T1
>() => T1 extends B ? 1 : 2
  ? true
  : false
type a12 = IsEqual<{a: 1,b: 2}, {a: 1}>

// (toString)

type CanStringified = string | number |bigint| boolean|null| undefined
type Stringify<T extends CanStringified> = `${T}`
type Example3 = Stringify<0.4>

// (循环)
// 循环: 递归; 分布式条件类型; 映射类型

// 分布式条件类型
type Example4<T> = T extends number ? T : never
type example41 = Example4<1 | '1' | true>
// 映射类型
// type Example5<T> = {[K in T]: K}
// type example51 = Example5<1 | '2' | 3>