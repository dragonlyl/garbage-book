class Person{
    constructor (name) {
        this._name = name
    }
    get name() {
        return this._name
    }
    set name(val) {
        this._name = val
    }
}
let test = new Person('jack')
console.log(test.name);
test.name = 'dragon';
// console.log(test.name);
// console.log(test._name);
console.log(test, 'test');// test 好像不是普通的对象,所以不能获取Descriptor
console.log(Object.getOwnPropertyDescriptor(test, 'name'));
