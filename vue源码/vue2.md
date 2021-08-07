# vue-min

## <<

let a = 1 << 2; // 2的平方 4 (两个二相乘)

## |

对两个二进制进行逐位比较 有一个为1就是 1

## on-click变形

`'on-click'.replace(/-(\w)/g, (_,c) => {console.log(c); return c? c.toUpperCase():''})`

## 遍历过程

## 调用 render
render 调用patch
## patch

传入 render的节点和挂载的点
vnode 和 container
然后根据类型 调用 processComponent
## processComponent
根据挂载类型调用
mountComponent
还是
updateComponent
## mountComponent
调用 createComponentInstance 生成 实例
之后调用 setupComponent(instance) // 来给instance 加工
## setupComponent
处理props 和 slots
initProps
initSlots
setupStatefulComponent // 处理option创建的Component ?

### createComponentInstance

传入
里面调用 emit方法

#### emit方法

获取 instance.prop 里面的

### setupComponent


## 待学习

proxy