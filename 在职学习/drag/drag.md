# drag

## https://segmentfault.com/a/1190000013606983

``` // 通过给dragstart里面调用setData方法，里面接收的是字符串（不能是对象）
drop (event) {
    this.droppedItem = event.dataTransfer.getData('item')
},
dragstart (event, item) {
    event.dataTransfer.setData('item', item.label)
},
dragend (event) {
    event.dataTransfer.clearData()
}
```
