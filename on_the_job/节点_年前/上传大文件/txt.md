# 上传大文件

## 搜索的内容

### 原生的js的change事件

onchange='xxx()'  //  前缀要加on 同时后面的方法要加括号
然后调用是时候要写 function xx () {}

onclick 的时候要获取e的话可以通过 xxx(this) 手动传入this (这里的this是这个对象，并不是e)
再通过 window.event || arguments.callee.caller.arguments[0] 拿到的就是这个e了

阻止默认事件
e.preventDefault()
阻止冒泡
e.stopPropagation()

### his.$data和this.$options.data()

在data外面定义的属性和方法通过$options可以获取和调用

### 封装ajax
