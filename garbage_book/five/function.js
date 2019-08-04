/**
 * 函数是对象 :自己的属性length 和 prototype
 * 创建函数两种方法
 * 
 * function a(b,c){
 *      return c+b
 * }
 * var a = function(b,c){
 *      return c+b
 * }
 *  函数名仅仅是指向函数的指针,所以一个函数可以有多个函数名 var  a = function () ;var b = a;
 * 
 * 函数声明会在函数调用前提升  ,但是变量的声明是不会提升的
 * 
 */
//函数中 有两个特使的对象  arguments(用于保存函数参数) 和this
//arguments 还有一个叫callee的属性(是一个指针) ,用于 指向 这个arguments对象的函数
function ff(num){
    if(num<=1){
        return 1;
    }else{
        return num * arguments.callee(num-1);//即num * ff(num-1)
    }
}
console.log(ff(5),'阶乘');

//this 引用的是函数执行的环境对象 即我们在全局声明了一个函数(那么就是全局调用这个函数),this指向的是全局window
//如果将某个对象的方法指向这个全局的函数 ,那么 这个函数中的this就是指向这个对象
var obj1 = {
    name:'jack'
}
var name = 'lucy';
var color = 'yellow';
function testThis() {
    console.log(this.name,this.color)
}
testThis();
obj1.test = testThis;
obj1.test();//由于obj1 没有color属性所以是undefined

//之后新出的 函数对象的属性.caller  返回调用当前函数的函数的引用 (如果这个函数的window调用就会返回null)
// 可以 用 arguments.callee.caller  但是这些东西在严格模式下会报错 (因为这些方法可以看到函数里面的代码 ,不安全)
function outer() {
    inner()
}
function inner() {
    let f = inner.caller
    console.log(inner.caller)
}
outer()

//函数名.length  返回是的函数所要接收的参数的个数(形参)
// prototype 是原型内容  如valueOf 什么的都是在这里面的


//apply()   和call() 方法 用来设置函数体内中的this对象指向
//apply 接收两个参数 ,第一个是其中运行函数的终于, 第二个是参数数组(也可以是arguments对象)




