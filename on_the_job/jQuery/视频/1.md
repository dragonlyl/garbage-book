# 第一个文件夹

## 如果想让script放在前面也能正确运行的话

要写window.onload = function () {...}
表示 在页面加载完执行里面的代码

但是多个window.onload 会实现覆盖

jQuery入口写法
$(document).ready(function() {})

## $的作用(写法 `$()`)

1. 参数是function，表示入口函数
$(function () {})

2. $(domObj) 把dom对象换成jquery对象
$(document).ready(function() {})
// 原本的document是没有ready方法的 ，转换成jquery对象就有了

3. 参数是字符串 获取dom对象
$('div')
// jquery里面的选择器，css里面能支持的都支持
如$('.jon,.kom')// 表示class为jon和kom的节点

## 调用css('key','value') 函数

css('background','yellow')
