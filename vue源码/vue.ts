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

// [stringify第二个参数](https://juejin.cn/post/6844904034290106381)


// vue 里面获取某值的类型都是通过 Object.prototype.toString.call(xx)

// 判断对象里面是否有该key值
const hasOwnProperty = Object.prototype.hasOwnProperty
const hasOwn = (val: object, key: string|symbol):key is keyof typeof val => hasOwnProperty.call(val, key)

// 从数组里面移除同一类型的item
const remove = <T> (arr: T[], el: T): void => {
    const i = arr.indexOf(el);
    if (i > -1) {
        arr.splice(i, 1)
    }
}