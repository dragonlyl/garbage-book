// https://github.com/yygmind/blog/issues/21
// 对于箭头函数的this总结如下：
// 1.箭头函数不绑定this，箭头函数中的this相当于普通变量。
// 2.箭头函数的this寻值行为与普通变量相同，在作用域中逐级寻找。
// 3.箭头函数的this无法通过bind，call，apply来直接修改（可以间接修改）。
// 4.改变作用域中this的指向可以改变箭头函数的this。
// 5.eg.function closure(){ () => {//code }}，在此例中，我们通过改变封包环境closure.bind(another)()，来改变箭头函数this的指向。
var name = 'window'

var person1 = {
    name: 'person1',
    show1: function () {
        console.log(this.name)
    },
    show2: () => console.log(this.name),
    show3: function () {
        return function () {
            console.log(this.name)
        }
    },
    show4: function () {
        return () => console.log(this.name)
    }
}
var person2 = { name: 'person2' }

person1.show1() // person1，隐式绑定，this指向调用者 person1 
person1.show1.call(person2) // person2，显式绑定，this指向 person2

person1.show2() // window，箭头函数绑定，this指向外层作用域，即全局作用域
person1.show2.call(person2) // window，箭头函数绑定，this指向外层作用域，即全局作用域

person1.show3()() // window，默认绑定，这是一个高阶函数，调用者是window
// 类似于`var func = person1.show3()` 执行`func()`
person1.show3().call(person2) // person2，显式绑定，this指向 person2
person1.show3.call(person2)() // window，默认绑定，调用者是window

person1.show4()() // person1，箭头函数绑定，this指向外层作用域，即person1函数作用域
person1.show4().call(person2) // person1，箭头函数绑定，
// this指向外层作用域，即person1函数作用域
person1.show4.call(person2)() // person2
// 对最后一项进行讲解 
// var func1 = person1.show4.call(person2) ，这是显式绑定，调用者是person2，show4函数指向的是person2。
// 2、然后是func1() ，箭头函数绑定，this指向外层作用域，即person2函数作用域

// 如果将上面 变成 如下 
function Person(name) {
    this.name = name;
    this.show1 = function () {
        console.log(this.name)
    }
    this.show2 = () => console.log(this.name)
    this.show3 = function () {
        return function () {
            console.log(this.name)
        }
    }
    this.show4 = function () {
        return () => console.log(this.name)
    }
}
var personA = new Person("personA");
var personB = new Person("personB");
personA.show1() // personA，隐式绑定，调用者是 personA
personA.show1.call(personB) // personB，显式绑定，调用者是 personB

personA.show2() // personA，首先personA是new绑定，产生了新的构造函数作用域，
// 然后是箭头函数绑定，this指向外层作用域，即personA函数作用域
personA.show2.call(personB) // personA，同上

personA.show3()() // window，默认绑定，调用者是window
personA.show3().call(personB) // personB，显式绑定，调用者是personB
personA.show3.call(personB)() // window，默认绑定，调用者是window

personA.show4()() // personA，箭头函数绑定，this指向外层作用域，即personA函数作用域
personA.show4().call(personB) // personA，箭头函数绑定，call并没有改变外层作用域，
// this指向外层作用域，即personA函数作用域
personA.show4.call(personB)() // personB，解析同题目1，最后是箭头函数绑定，
                              // this指向外层作用域，即改变后的person2函数作用域
                              
// 使用 new 操作符调用构造函数，实际上会经历一下4个步骤：
//     1.创建一个新对象；
//     2.将构造函数的作用域赋给新对象（因此this就指向了这个新对象）；
//     3.执行构造函数中的代码（为这个新对象添加属性）；
//     4.返回新对象。


var obj = {
  say: (function() {
    function _say() {
      console.log(this);
    }
    console.log(obj);
    return _say.bind(obj);
  })()
};
obj.say();
