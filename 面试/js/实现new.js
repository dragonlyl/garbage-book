// 要自己实现一个new功能，实现要知道new操作符都干了些什么，其实总的来说就四步：
// 1.创建一个空对象
// 2.链接到原型 (这个新对象被执行 [[原型]] 连接)
// 3.绑定this值 (执行构造函数方法，属性和方法被添加到 this 引用的对象中。)
// 4.返回新对象
function create() {
    let obj = new Object();
    let Con = [].shift.call(arguments);
    obj.__proto__ = Con.prototype;
    // 将构造函数中的this指向新对象，这样新对象就可以访问构造函数中的属性和方法了
    let result = Con.apply(obj,arguments);
    console.log(result,obj,typeof result)
    // result 就是要返回的对象
    // 但如果result 不是对象那么就返回构造函数的一个实例对象
    return typeof result === "object" ? result : obj;
}
function Car(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    return {year:this.year}
  }
let test = new Car(1,2,3);
let test2 = create(Car,2,3,4)
console.log(test,test2,'test')
// let test2 = create(Obj,1,2)

/**
 * https://zhuanlan.zhihu.com/p/23987456
 * 图片 new语法糖
 * new 其实是个语法糖
 * 1. 不用创建临时对象，因为 new 会帮你做（你使用「this」就可以访问到临时对象）；
 * 2. 不用绑定原型，因为 new 会帮你做（new 为了知道原型在哪，所以指定原型的名字为 prototype）；
 * 3. 不用 return 临时对象，因为 new 会帮你做；
 * 4. 不要给原型想名字了，因为 new 指定名字为 prototype。
 */