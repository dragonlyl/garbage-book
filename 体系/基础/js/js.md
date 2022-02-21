# js

## JSON.stringify()

[你不知道的 JSON.stringify() 的威力](https://juejin.cn/post/6844904016212672519) // 待看

将 对象中的属性名变换, 可以通过 stringify 然后 str.replace 正则替换字符

### JSON.stringify()第一大特性

**对于 undefined、任意的函数以及 symbol 三个特殊的值分别作为对象属性的值、数组元素、单独的值时 JSON.stringify()将返回不同的结果。**

对象中 将会 忽略
数组中 将会 转化为 `null`
单独值 将会 转化为 `undefined`

## 可选链路 `?.`

[页面白屏了？看看可选链操作符(?.)](https://segmentfault.com/a/1190000040029674)

需要babel 支持

[babel](https://babeljs.io/) 直接输入代码查看

```js
let a = {b: 2}
console.log(a?.b)

console.log(a === null ? void 0 : a.b);
```

[优化代码](https://segmentfault.com/a/1190000020173404?utm_source=sf-similar-article)

```js

if (movie.actors && movie.actors.length > 0) {
    return movie.actors[0].name;
}

return movie.actors?.[0]?.name;
```

## 双运算符

表达式变量?? 如果变量undefined或为null，则默认值为指定的值。

```js
const noValue = undefined;
const value = 'Hello';

noValue ?? 'Nothing'; // => 'Nothing'
value   ?? 'Nothing'; // => 'Hello'

```

## Event对象

`event = new Event(typeArg, eventInit);`
typeArg: 事件名
eventInit: bubbles(是否冒泡), cancelable(是否能被取消), composed (影子dom根节点之外触发侦听器)

例子: 用于兄弟节点触发事件

```js

const CUSTOMER_INFO_EVENT_NAME = 'customer-detail-customer-info-reload'
// 创建event
export const CUSTOMER_INFO_EVENT = new Event(CUSTOMER_INFO_EVENT_NAME)
// 添加event监听
window.addEventListener(CUSTOMER_INFO_EVENT_NAME, fetchCustomerProfile, false)

// 另外的文件引入 触发事件调用
window.dispatchEvent(CUSTOMER_OPERATE_RECORD_REFRESH_EVENT)
```
