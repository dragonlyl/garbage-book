# react

## 创建安装

`npx create-react-app my-app --template typescript`

[create-react-app搭建一个完整的项目](https://www.jianshu.com/p/1fb6c11676d2) // todo

## hook注意事项

[使用 React Hooks 时要避免的6个错误](https://juejin.cn/post/7034695882347905060)

1. 不要改变调用顺序
2. 不要使用旧的状态
   1. `setCount(count + 1); setCount(count => count + 1);`
3. 不要创建旧的闭包 (hook是依赖闭包实现的)
4. 不要忘记清理副作用
5. 不要在不需要重新渲染时使用useState
   1. useState 和 useRef 区别(有视图层呈现)

## React Hook 中 createContext & useContext 跨组件透传上下文与性能优化

[React Hook 中 createContext & useContext 跨组件透传上下文与性能优化](http://www.ptbird.cn/react-createContex-useContext.html)

## 性能优化

同个父组件,有A,B两个子组件,若A组件发生更新会导致重新构建,即使B无数据更新也会重新构建

### shouldComponentUpdate

通过比较 nextProp 和 prop 的关键值来比较是否需要更新

### PureComponet

内部自动实现了`shouldComponentUpdate`, 缺点是只会进行一层比较,数据是嵌套的对象或者数组的时候，它就无法比较了。
所以`PureComponent`最好只用于`展示型组件`

### Memo

上面是用于 `class` 组件, 函数式组件用 `memo`, 

```tsx
const Son3: React.FC<Iprops> = (props) => {}
export default memo(Son3)
```

## memo 和 callback的区别 (主要一部分也是性能优化)

React.memo()
React.useCallback()
React.useMemo()

[useCallback()、useMemo() 解决了什么问题？](https://www.jianshu.com/p/014ee0ebe959)

## ts跟react结合

[React + TypeScript实践](https://juejin.cn/post/6952696734078369828)

```tsx

type AppProps = {
    message: string
}
const App: React.FC<AppProps> = ({ message, children }) => (
    <div>
        {message}
        {children}
    </div>
)
// 代码中的demo
const Main: React.FC<IProps> = props => {
  const state = props.location.state
  const userId = state && state.userId
}
```

### useEffect 的回调函数返回值必须是 undefined 或者 函数

```tsx
function App() {
  // undefined作为回调函数的返回值
  React.useEffect(() => {
    // do something...
  }, [])
  // 返回值是一个函数
  React.useEffect(() => {
    // do something...
    return () => {}
  }, [])
}
```

### 自定义hook 如果返回值是数组类型,ts会自动推导为 `Union` 类型, 我们需要手动添加 const 断言进行处理

```tsx


function useLoading() {
  const [isLoading, setState] = React.useState(false)
  const load = (aPromise: Promise<any>) => {
    setState(true)
    return aPromise.then(() => setState(false))
  }
  // 实际需要: [boolean, typeof load] 类型
  // 而不是自动推导的：(boolean | typeof load)[]
  return [isLoading, load] as const
}

```

### 使用 Type 还是 Interface ?

* 在定义公共API时(比如编辑一个库) 使用 interface, 这样方便使用者继承接口
* 在定义组件属性 (Props) 和 状态 (State), 建议使用 `Type`, type 约束性更强

两者最大的区别 是, interface 可随时扩展

```ts
interface A {
    name: string
}
interface A {
    color: string // A 扩展 color 属性
}

type B = {
 name: string
}
type B = {
    color: string // 报错 ,Duplicate identifier
}
```

### 获取未导出的 Type

通过 ComponentProps / ReturnType 来获取想要的类型
