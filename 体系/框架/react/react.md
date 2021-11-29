# react

## 创建安装

`npx create-react-app my-app --template typescript`

[create-react-app搭建一个完整的项目](https://www.jianshu.com/p/1fb6c11676d2)

## hook注意事项

[使用 React Hooks 时要避免的6个错误](https://juejin.cn/post/7034695882347905060)

1. 不要改变调用顺序
2. 不要使用旧的状态
   1. `setCount(count + 1); setCount(count => count + 1);`
3. 不要创建旧的闭包 (hook是依赖闭包实现的)
4. 不要忘记清理副作用
5. 不要在不需要重新渲染时使用useState
   1. useState 和 useRef 区别(有视图层呈现)
6. 