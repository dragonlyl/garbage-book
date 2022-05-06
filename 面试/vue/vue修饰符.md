# vue修饰符

v-model.lazy 原本不加是根据input事件就更新，而加了.lazy就变成change事件同步

v-model.number 将输入的值转为数值类型

v-model.trim 过滤首尾空白字符

## 事件修饰符

.stop // 阻止单击事件继续传播
.prevent // 阻止默认事件
.capture // 使事件变成捕获模式 即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
.self  //只当在 event.target 是当前元素自身时触发处理函数 即其内部的元素也没用
prevent.self //阻止所有的点击
self.prevent //只会阻止对元素自身的点击
once //点击事件将只会触发一次
.native // 变为原 html 标签

## async

[v-model](../../on_the_job/关于vue的优化.md)

```html
<child :name.sync="name"></child>  // 父组件
 
<script>
// 子组件事件
changePropsInChild(){
    this.$emit('update:name', 'I am from child');
}

:name.sync
:name="name" @update:name="name = $event"的缩写
</script>
```

## 按键修饰符

keyup.enter tab delete