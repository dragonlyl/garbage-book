// [TS的高级类型编程](https://juejin.cn/post/6898270313050537997)
class Person {
    name: string = 'jack'
    age: number = 18
}
// tst为 string | number
type tst = keyof Person // 获取 范型上的public的属性名 (返回的是联合属性)
// [] 索引类型访问操作符; 在TS中，它可以用来访问某个属性的类型
type NameType = Person['name']
// 所以 T[K] 可以拿到对象上所有的publice的联合类型
function pick<T, K extends keyof T>(obj: T, prop: K): T[K] {
    return obj[prop]
}
const User = {
    name: "胡先生",
    age: 18,
    id: 12345
}
// 输入age 内容自动提示 User里面所有属性
const nameValue = pick(User, 'age')//胡先生
console.log(nameValue)

// ## 映射类型的语法是：[K in Keys] 类似JS的数组方法forEach去遍历keys

// 从泛型T中挑选出需要的属性
type MyPick<T, K extends keyof T> = {
    [P in K]: T[P]
}
interface User{
    name:string,
    age:number,
    id:number
}
// type name = { name: string; }
type name = MyPick<User,"name">

// 同理可以将所有interface都变为可选的
type MyPartial <T> = {
    [K in keyof T]?: T[K]
}
type PartialUser = MyPartial<User>

// ## 条件类型

// T extends U ? X : Y 如果T 能赋值给U，则返回类型X 否则返回类型Y

// 注意 ：是 T能不能赋值给U，而不是T是不是U类型，因为U可能是any，是所有类型的子类型，
type IsStringOrNumber<T> = T extends string ? string : number
type str = IsStringOrNumber<"123"> // 直接是string类型


// 在T中找到不存在U中的类型，并返回
type Diff<T, U> = T extends U ? never : T

type DiffType = Diff<number | string | boolean, undefined | string>

// 上面代码等效于下面
type DiffType2 = Diff<number, undefined | string> 
		| Diff<string, undefined | string>
                | Diff<boolean, undefined | string>

// 注意: 上面只有裸类型参数才能实现分布式有条件类型，
// 裸类型参数，即类型参数不能被包裹在其他类型中，如数组，元组，函数，Promise等