// 要自己实现一个new功能，实现要知道new操作符都干了些什么，其实总的来说就四步：
// 1.创建一个空对象
// 2.链接到原型
// 3.绑定this值
// 4.返回新对象
function create() {
    let obj = new Object();
    let Con = [].shift.call(arguments);
    obj.__proto__ = Con.prototype;
    // 将构造函数中的this指向新对象，这样新对象就可以访问构造函数中的属性和方法了
    let result = Con.apply(obj,arguments);
    // result 就是要返回的对象
    // 但如果result 不是对象那么就返回构造函数的一个实例对象
    return typeof result === "object" ? result : obj;
}
// let test = new Obj(1,2);
// let test2 = create(Obj,1,2)