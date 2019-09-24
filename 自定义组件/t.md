# 自定义组件

## 样式上的补充

``` // not 除了xx之外的元素样式
@each $type in (primary, success, warning, danger, info) {
    .el-button--#{$type} {
      &:first-child {
        border-right-color: rgba($--color-white, 0.5);
      }
      &:last-child {
        border-left-color: rgba($--color-white, 0.5);
      }
      &:not(:first-child):not(:last-child) {
        border-left-color: rgba($--color-white, 0.5);
        border-right-color: rgba($--color-white, 0.5);
      }
    }
  }
```

## 对于某些只能在具体某些存下的组件  比如 ul里面只能放li

```<table><tr is="my-row"></tr></table>``` 这样就能用自己申明的my-row组件

## 想把一个对象的所有属性作为 prop 进行传递

可以使用不带任何参数的 v-bind (即用 v-bind 而不是 v-bind:prop-name)。

``` // 具体写法
todo: {
  text: 'Learn Vue',
  isComplete: false
}
<todo-item v-bind="todo"></todo-item>
// 上面的代码等价于下面的代码
<todo-item
  v-bind:text="todo.text"
  v-bind:is-complete="todo.isComplete"
></todo-item>
```

## 想将prop传递的数据进行改（比如说传过来是字符小写，我组件内部要大写）

可以定义相关的computed 的方法来返回相应的处理结果

## props的验证

``` // props的验证
Vue.component('example', {
  props: {
    // 基础类型检测 (`null` 指允许任何类型)
    propA: Number,
    // 可能是多种类型
    propB: [String, Number],
    // 必传且是字符串
    propC: {
      type: String,
      required: true
    },
    // 数值且有默认值
    propD: {
      type: Number,
      default: 100
    },
    // 数组/对象的默认值应当由一个工厂函数返回
    propE: {
      type: Object,
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        return value > 10
      }
    }
  }
})
```

## class 的合并以及部分type

即如果你在子组件内部 有个class a
父引入和子组件并在上面绑定了 class b
那么最终结果是  class a b
但如果是类似type这种可能会进行父覆盖子的配置

## 监听组件的根元素的原生事件

`<my-component v-on:click.native="doTheThing"></my-component>`

## 父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译

`<child-component v-show="someChildProperty"></child-component>`
// 所以上面的v-show是不能生效的
就是说 v-show 应该写入到子组件内

## 作用域插槽

比如父想要子的数据可以使用这个

``` // 情景再现
//子
<span>
  <slot>{{ user.lastName }}</slot>
</span>
// 父 （这里会没反应，因为user是在子组件的对象，无法访问）
<current-user>
  {{ user.firstName }}
</current-user>

// 通过下面进行改造

//子
<span>
//  也可以是静态的  如 num = '1'
  <slot :user="user">
    {{ user.lastName }}
  </slot>
</span>
// 父
<current-user>
// 这里如果是不具名插槽 :default可以省略
// 如果这里的插槽是<slot name="header"></slot>
// 那么 就变成 v-slot:header
  <template v-slot:default="slotProps">
    {{ slotProps.user.firstName }}
  </template>
</current-user>
```

## v-slot的缩写

跟 v-on 和 v-bind 一样，v-slot 也有缩写，即把参数之前的所有内容 (v-slot:) 替换为字符 #。例如 v-slot:header 可以被重写为 #header