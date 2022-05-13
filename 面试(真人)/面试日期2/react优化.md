# react优化

## 链接

[React 性能优化 | 包括原理、技巧、Demo、工具使用](https://juejin.cn/post/6935584878071119885) // 必看

## 跳过不必要的组件更新

1. PureComponent, memo
2. shouldComponentUpdate
    有个问题是, 如果有很多子孙节点,子只用到了对象a属性,孙节点用到对象b属性(所以处理的时候要看仔细)
3. useCallback, useMemo实现稳定的props
4. 发布订阅者模式跳过中间组件
5. 状态下放,缩小范围(A,B,C 中color 就A,B受影响,就将AB封装成组件,且将color在AB共同组件里面定义)
    但如果color影响范围较大,即父组件也会有用到,可以提供插槽来处理

    ```jsx
    import { useState } from "react"

    export default function App() {
        return <ColorContainer expensiveTreeNode={<ExpensiveTree />}></ColorContainer>
        }

        function ColorContainer({ expensiveTreeNode }) {
        let [color, setColor] = useState("red")
        return (
            <div style={{ color }}>
            <input value={color} onChange={e => setColor(e.target.value)} />
            {expensiveTreeNode}
            <p style={{ color }}>Hello, world!</p>
            </div>
        )
    }
    ```
6.

## 前端通用优化

1. 组件懒加载 `React.lazy` `react-loadable` (先用占位符,然后异步加载组件,同时错误处理)
    `loader().then(Component => setState) loader: () => import('../containers/Home')`
2. 懒渲染: model的visible为true的时候再去获取数据
3. 虚拟列表
4. 批量更新: 1. setState 合并两次操作, 2. 用`unstable_batchedUpdates`

     ```js
     unstable_batchedUpdates(() => {
        setList(data.list)
        setInfo(data.info)
      })```

5. useDebounce