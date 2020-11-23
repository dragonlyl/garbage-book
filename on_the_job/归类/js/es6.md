<!--
 * @Author: your name
 * @Date: 2020-11-21 15:07:35
 * @LastEditTime: 2020-11-21 15:09:07
 * @LastEditors: Please set LastEditors
 * @Description: es6特殊用法
 * @FilePath: \garbage-book\on_the_job\归类\js\es6.md
-->

# es6

## map的for...of使用

hash表建议用Map代替object， 有size属性
<https://juejin.im/post/6868115010913550349>
循环 `for (let [key, value] of map) { console.log(${key} = ${value}); }`;
map的key的顺序是有序的； map上面的key不会和原型链上的重名（toString也没有，用object.create(null)可以创建一个空的object