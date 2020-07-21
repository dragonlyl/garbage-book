# vue 文档

## Vue读懂这篇，进阶高级

<https://juejin.im/post/5e2453e8518825366e13f59a>

＄listeners $attrs 和 $parent(这个能解决props地狱问题，因为拿到的是父组件的引用)

```//手写一个深拷贝
function deepClone (source) {
    let cloneTarget = source.constructor === Array ? [] : {};
    for(let key in source) {
        if (source.hasOwnProperty(key)) {
            if (source[key] && typeof source[key] === 'object') {
                cloneTarget[key] = source[key].constructor === Array ? [] : {};
                cloneTarget[key] = deepClone(source[key]);
            } else {
                cloneTarget[key] = source[key];
            }
        }
    }
    return cloneTarget;
}
```

## 获取多语言当前语言

this.$i18n.locale 可以获取是什么语言

用的是-webkit-私有属性。
text-overflow: -o-ellipsis-lastline;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
https://www.cnblogs.com/zpsong/p/5406494.html