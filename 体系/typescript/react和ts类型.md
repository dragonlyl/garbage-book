# ts 在tsx里面的属性写法

```tsx
// 事件类型
window.addEventListener('scroll', (e: Event)=> {})
e: React.MouseEvent

// 用来获取dom, 但是 ref.current 已经能拿到,用处不是特别大
import { findDOMNode } from 'react-dom'
findDOMNode(component)

type prop = {
    children: React.ReactNode,
}

// 定义click 的 type
{onClick?: React.MouseEventHandler<SVGAElement>}

new Date().getTime() // 创建时间戳

ReactDOM.unmountComponentAtNode(container) //卸载某个元素
```
