/**
 * 1、纯字符串比较，转换成ASCII码在进行比较；
 * 2、纯数字和数字字符串相比较，则将字符串数字隐式转换成数字再进行比较；
 * 3、纯数字和非数字字符串比较，都返回false；// 这种情况下字符优先转换为数字比较,字符为NaN 无论如何都是false
 */

console.log('ca' > 'bedf') // 'c'大于'a'
console.log('222' < '33') // '3'大于'2'
console.log('222' > 33) // '222'转为数字222
console.log(222 > 'abc') // 转换为数字NaN 即都为false
console.log(222 < 'abc') // 转换为数字NaN 即都为false

