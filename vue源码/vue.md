// 这里表示 该函数返回的是个方法  (key: string) => boolean
function makeMap(str: string, expectsLowerCase ?: boolean): (key: string) => boolean {
    // 这个是高级写法 看ts写法
    const map: Record<string, boolean> = Object.create(null);
    const list: Array<string> = str.split(',')
    for (let i = 0; i <list.length; i++) {
        map[list[i]] = true
    }
    return expectsLowerCase ? val => !!map[val.toLocaleLowerCase()] : val => !!map[val]
}
// console.log(makeMap('jj,dd'))

// 是否为对象,返回判断 ,判断为 key 为 string/number/symbol : 返回为any
const isObject = (val:unknown): val is Record<any, any> => val !== null && typeof val === 'object';
// 转换为string
const toDisplayString = (val: unknown): string => {
    return val === null ? '' : isObject(val) ? JSON.stringify(val) : String(val)
}
let a = function () {console.log(222)};
console.log(isObject(a), String(a))

[第二个参数](https://juejin.cn/post/6844904034290106381)
1. 如果是函数就是下面的情况
2. 如果是数组, 表示过滤,只会展示数组里面的匹配的key值
第一次 是 key 空, value为能被格式化的value, 后面才是对obj 的key值各个遍历

```js
const obj = {  name: "wlh",  male: undefined,  special: Symbol("dd"),  action: function () {return 666}}
const result = JSON.stringify(obj, (key, value) => {
    const type = typeof value
    console.log(key,'===', value)
    switch (true) {    
        case type === "undefined":      
        return "undefined"    
        case type === "symbol":      
        return value.toString()    
        case type === "function":      
        return value.toString()    
        default:
            break  
    }  
    return value;
})
console.log(result)
```

vue 里面获取某值的类型都是通过

```ts

Object.prototype.toString.call(xx)

const objectToString = Object.prototype.toString
const toTypeString = (val: any): string => objectToString.call(val)
```

封装专门函数通过这个来判断 是map类型还是set类型

`String.prototype.starstWith('xx'); `// 判断字符串是否以xx字符开启, 第二个参数为数字,表示从第几个字符开始

## keyof typeof obj

这是个组合 输出的是所有obj上面的 key值的type
`key is keyof typeof obj`  是用来判断obj是否有这个key值

```ts
// 判断对象里面是否有该key值(主语上面的写法)
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (val: object, key: string|symbol):key is keyof typeof val => hasOwnProperty.call(val, key)
```
