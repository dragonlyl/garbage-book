# 算法

## 链接

<https://www.cnblogs.com/wenruo/p/11100537.html>

## 判断奇偶数

x & 1 === 1 就是奇数  x会转换成二进制，然后与操作  1 & 1  为 1 ；0 & 1 为 0
注： 上面的代码可以直接放在  if 语句里面  因为 1 就直接通过，即奇数

## 浮点数 x 的整数部分

浮点数 x 的整数部分： ~~x ，对于正数相当于  floor(x)  对于负数相当于  ceil(-x)

## 计算  2 ^ n 次

即  1 << n   计算方式是 `1 * 2^n` 即（`1* pow(2, n)`）

## 定义一些常用的函数

const _max = Math.max.bind(Math);
const _min = Math.min.bind(Math);
const _pow = Math.pow.bind(Math);
const _floor = Math.floor.bind(Math);
const _round = Math.round.bind(Math);
const _ceil = Math.ceil.bind(Math);
const log = console.log.bind(console);
//const log = _ => {}
这样就能够直接用上面的这行代码进行注释了

## 快速幂

参考快速幂文件

## 链表

参考链表操作文件