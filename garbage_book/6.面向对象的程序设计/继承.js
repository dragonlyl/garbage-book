/**
 * 原型链:利用原型让一个引用类型继承另一个引用类型的属性和方法,
 *   原型链的问题 : 包含引用类型值的原型 :即继承原型的实例 改变原型中引用数值类型的值,
 *   其原型的该值也会被改变 (所以实践中会很少单独使用原型链)
 * 
 * 借用构造函数 : 在子类构造函数的内部调用超类型构造函数 即通过apply() call() 方法
 */

 // 确定实例和原型的关系 : xx instanceof xx   或者  xx.isPrototypeOf(xx)
 
 //重写方法 会屏蔽原型链中的同名方法  

 //同时 在通过原型链实现继承时,不能使用对象字面量创建原型方法,因为这样就会是重写原型链

a.prototype = new b();//这里实现了a原型指向了b
a.prototype.getA = function () {
    return '11';// 这种创建方法是对的  下面的那种是错的
}
//错误 定义 原型方法示范
// a.prototype = {
//     getA:function () {
//         return "11";
//     }
// }
/**
 * 借用构造函数
 * function b(){
 *      this.arr = [1,2,3]
 * }
 * function a(){
 *      这部代码 就实现了继承b
 *      通俗来讲就是 在(未来将要)新建的a实例的环境下调用了b构造函数
 *      使得a对象上执行b()函数中所有对象的初始化代码
 *      b.call(this)
 * }
 * var obj = new a();
 * obj.arr.push(4);//此时的obj 的arr  是 [1,2,3,4]
 * 
 * var obj2 = new a();
 * obj.arr; //此时的obj2 的 arr  是[1,2,3]
 */