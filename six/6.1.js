/**
 * 6.1.1 属性类型
 * 1.数据属性 和访问器属性
 * 
 * configurable:表示能否通过delete删除属性从而重新定义属性,默认true(一旦定义为false就无法变回true了)
 * enumerable:表示能否通过for-in循环返回属性.默认true
 * writable:表示能否修改属性的值,默认为true
 * value:这个属性的属性值
 *  */
var person = {
    name:'jack' //这里的jack就是属性值value
}
//通过Object.defineProperty来修改属性默认特性:三个参数:属性所在对象,属性名字,描述对象
Object.defineProperty(person,'name',{
    writable:false,
    value:'ma'
})
person.name = 'jack'
console.log(person.name)
