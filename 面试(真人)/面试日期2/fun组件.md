# fun 组件

## button

### component

用指定的ReactNode来做 wapper, 为`React.ReactNode`
所以要判断 `WrapNode = component ? component : 'button'`

### child处理

前面有 `icon` 标签

用 `React.children.map`, 同时处理 child 为string情况

```js
const wrapChild = React.children.map(children, child => {
    // 同时处理child 为字符串的情况(包裹一个span标签)
    if (typeof child === 'string') {
        return <span>{child}</span>
    }
    return child
})
```

## icon

```js

let IconPath: any = (icons as any)[camelCaseTypeName]
// 为什么是function
  if (typeof IconPath === 'function') {
    IconPath = IconPath({ fill, highlightColor })
  }
```
