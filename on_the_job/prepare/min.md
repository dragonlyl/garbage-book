# 自己开发总结

## 两行省略号

<https://www.cnblogs.com/zpsong/p/5406494.html>

```css
{
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```

## 两个边框重合

添加样式，这样会导致最右边多出一点点
margin-right: -1px;
margin-bottom: -1px
