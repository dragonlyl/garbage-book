# 数组乱序和 Array.from

## Array.from用法

<https://www.cnblogs.com/shaofl/p/10521660.html>
这里扩充一下from

```js
//将数组中布尔值为false的成员指为0   即设置默认值
Array.from([1, ,2,3,3], x => x || 0) //[1,0,2,3,3]

//  Array.from ({length:n}, Fn)
Array.from({length:10})
Array.from({length:10}, () => 0);
Array.from({length:10}).fill(0);
上面两个代码的效果是一样的

Array.from({length:3}, item => (item = {'name':'shao','age':18}))
//[{'name':'shao','age':18}, {'name':'shao','age':18}, {'name':'shao','age':18}]
```
