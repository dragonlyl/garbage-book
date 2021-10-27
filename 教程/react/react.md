# react

## 组件声明周期

[react声明周期](https://www.cnblogs.com/faith3/p/9216165.html)

1. 不涉及 setState ,第一次渲染

constructor => componentWillMount => render
然后父的这三个好了之后 到子的

componentDidMount (先子然后父)

2. 触发 setState 事件

componentWillUpdate => render (父 然后子 , 子还有一个 componentWillReceiveProps 在这两个之前)

componentDidUpdate (先子然后父)

>小结: 初次和更新的顺序都是从根部到子部, 完成时是从子部到根部 (类似事件冒泡顺序)
