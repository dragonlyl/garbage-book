# hooks

## ts函数式组件标准写法(泛型)

函数组件是引用fc

```jsx
import {FC, ReactElement} from 'react'
import ITodo from './' // 专门的目录定义type
interface IProps {
    addTodo: {todo: ITodo} => void
}
// 有传值 需要写泛型 ,传入的是props, 返回的是 ReactElement
const TestInput: FC<IProps> = ({
    addTodo
}): ReactElement=> {

}
```

## 断言

`inputRef.current!.value` // 表示current 肯定有value属性

## 泛型申明

除了 useCallback useEffect 其他都传泛型

`const inputRef = useRef<HTMLInputElement>(null);`
`const [todoList, setTodoList] = useState<ITodo>([])` // 申明的是`ITodo`的list,初始值为空数组
input ref = {inputRef}

## 如果子组件方法是父传过来,建议用useCallback封装一下

```jsx
// 原本可以直接将setTodoList 传到子组件 ,但是包了一层
const addTodo = useCallback((todo: ITodo) => {
    // 如果这里比较复杂(多种类型修改) 可以用useReducer来进行改造
    setTodoList(todoList => [...todoList, todo])
}, []) // 没有依赖 传空数组

useEffect(() => {

}, [todoList])
```

## 方法中比较复杂,用useReducer改造(useReducer有深部优化)

```jsx
const [todoList, setTodoList] = useState<ITodo>([]) // 将要被改造的内容

// state 和 action  所以 todoReducer可以写到文件外
// 返回类型是给 useReducer ,所以是state
todoReducer (state: IState, action: IAction): IState {
    const {type, payload} = action;
    switch (type) {
        case ACTION_TYPE.ADD_TODO:
            return {
                ...state,
                todoList: [...state.todoList, payload as ITodo]
            }
        case ACTION_TYPE.REMOVE_TODO:
            return {
                ...state,
                todoList: state.todoList.filter(v => v.id !== payload as id)
            }
        default: return state
    }
}
const [state, dispatch] = useReducer(todoReducer)

// 改造callback里面内容
const addTodo = useCallback((todo: ITodo) => {
    dispatch(type: add, payload: todo)
}, [])
```

## 不同的行为定义枚举

```jsx
export Interface IAction {
    type: ACTION_TYPE,
    // 接收的参数 要么是item要么是删除某个id
    payload: ITodo | number
}
export enum ACTION_TYPE {
    ADD_TODO = 'addTodo',
    REMOVE_TODO = 'removeTodo',
    TOGGLE_TODO = 'toggleTodo'
}
```