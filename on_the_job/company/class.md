# js中使用class

<https://mp.weixin.qq.com/s/BDBE2aLq1kOo4wsE0i3wEw>

```js
class Person {
  constructor (name) {
    this.name = name
  }
  
  talk () {
    console.log(`${this.name} says hello`)
  }
}
// 如上写法等同于
function Person (name) {
  this.name = name
}
Person.prototype.talk = function () {
  console.log(`${this.name} says hello`)
}
// 但是由于js的this指向的是调用函数
const Grey = new Person('Grey')
const mockDomButton = {} // 模拟一个DOM上的按钮对象
mockDomButton.onClick = Grey.talk; // 绑定点击事件
mockDomButton.onClick() // 输出的结果是 undefined says hello
// 可以写成如下样式，但是看起来代码臃肿
class Person {
  constructor (name) {
    this.name = name
    this.talk = this.talk.bind(this); // 在构造器里显式调用 bind 函数绑定 this
  }

  talk () {
    console.log(`${this.name} says hello`)
  }
}
// 可以写成如下 （箭头函数）
class Person {
  constructor(name) {
    this.name = name
  }

  talk = () => {
    console.log(`${this.name} says hello`)
  }
}

```