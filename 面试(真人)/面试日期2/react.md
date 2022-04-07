# react

## 受控非受控

[受控非受控](https://juejin.cn/post/6858276396968951822)
html表单元素通常维护着一套状态(`state`),并随着用户输入然后展现在ui上(不受我们控制)叫非受控. 如果让表单元素值和`react`的`state`建立依赖关系,再通过事件和`setState`来控制用户输入的表单发生的操作这就叫做受控组件

非受控,可以通过 `ref` 的形式拿到里面的值

## 生命周期

[生命周期](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

## 优化

1. `pureComponent` 做浅比较, `props` `state`, 来决定是否重新渲染组件 **用于性能优化,减少`render`次数**

    ```js
    class Index extends React.PureComponent{
        // 这样就会失效, 因为指向的是同一个data对象
        // this.setState({ data: {...data} }) 的浅拷贝来解决问题
        this.state = {
            data: {
                count: 0
            }
        }
    }
    ```

    类似于`shouldComponentUpdate()` (首次调用或使用forceUpdate不会使用), 为true表示要重新渲染, 为false 会跳过 componentDidUpdate()

2. `memo`, 和前者类似, React.memo是高阶组件, (函数组件和类组件都能用)
但是后者只能 对props情况确定是否渲染 (state不行)

接收两个参数, 第一个是 组件本身, 第二个是判断是否要渲染(param old 和 next, return boolean, true 为不渲染)
类似于 shouldComponentUpdate 但是true false 是相反的

## createElement

用 `jsx` 写的代码会 `babel` 转换成 `createElement` 形式

```js
// 第一个属性 type
// 第二个是 props
// 第三个是child
React.createElement("div", { className: "item" }, "text"),
```

## cloneElement

可以 传入新 props , 返回元素 是跟之前的props联立

`const newChildren = React.cloneElement(children, { age: 18})`

## createContext

创建 `Context` 对象, 包含用于 传递 `Context` 对象值的 `value` 的 `Provider` , 和接受 `value` 变化订阅的 `Consumer`

即创建了三样

```js
// 传入 default 对象, 只有在 Consumer 没有找到Provider (即没有被这个标签包裹 )
let MyContext = React.createContext({age: 0})

// 这里传入新值
<MyContext.Provider age={2}><MyContext.Provider>
<MyContent.Consumer>
// 这里进行消化, 如果不在MyContext.Provider 标签内就是 age: 0
// 如果是在标签内(即子节点) age: 2
{(value) => {console.log(value)}} // {age: 0}
</MyContent.Consumer>
```

## createRef

```js
// class组件
class Index extends React.Component {
    this.node = React.createRef()
}

// 函数式组件
function Index () {
    const node = React.useRef(null)
    return <div ref= {node}>test</div>
}
```

## isValidElement

可以用来检测是否为 react element 元素

//type标签 ,但是如果是字符串就过不去 (用来过滤非element)
`children.filer(item => React.isValidElement(item))`

## React.Children

### children 透明数据结构和不透明

过map遍历后的元素，react底层会处理，默认在外部嵌套一个`<Fragment>`。

若是 `Array(2).fill(0).map` + 普通元素结构是下述
`[Array(2), {...}]`
// 这样第一个 是 false 第二个是true (table组件中的问题)
`children.map((v) => console.log(React.isValidElement(v)))`

若是直接元素的话

`[{...}, {...}, {...}]`

Children.map 方法来处理
可以用 `React.Children.map(children, (item) => item)`

`Children.forEach` // 纯遍历
`Children.count` // 返回同一级别子组件的数量
`Children.toArray` // 返回拍平后数组
`Children.only` // 是否只有一个child, 否抛出错误

## useMemo

之前用 `const dateRangeVal = useMemo(() => [pageInfo.fromDate, pageInfo.toDate], [pageInfo.fromDate, pageInfo.toDate])`
来返回 `dataTime` 的 `val`

## useReducer

```js
// 返回 state 和 reducer
// 接收方法 (state, action)  和初始state 值
const [number, dispatchNumber] = useReducer((state, action) => {
    const {type} = action
    if (type === 'add') {
        return state + 1
    }
}, 1)
```

## useContext

```js
const value = useContext(MyContext)
return <div> my name is {value.name}</div>
代替下面的代码块

<MyContent.Consumer>
    {/*  my name is alien  */}
    {(value) => <div> my name is {value.name}</div>}
</MyContent.Consumer>

```