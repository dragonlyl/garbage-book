class Person {

}
const myNew = function () {
    // 创建对象， 指向原型
    let obj = [].shift.call(arguments);
    let ret = Object.create(obj.prototype)
    
    return ret(...arg);
}

let t = new Person();
console.log(t, 'tt')