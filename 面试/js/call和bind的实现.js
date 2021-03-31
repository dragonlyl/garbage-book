Function.prototype.myCall = function (context) {
    if(typeof this !== 'function') {
        throw new TypeError('not function')
    }
    //test1.myCall 所以this指向test1
    context = context || window;// context第一个参数如果有传那么是个对象
    context.fn = this;  // 创建 obj.tt = test1
    // arguments不具备 slice方法  也可以用 Array.prototype.slice.call(arguments,1)
    let arg = [...arguments].slice(1);
    let result = context.fn(...arg);
    delete context.fn;
    return result;

}

function test1 () {
    console.log(this,typeof this,this.name,'this');
    // 这里的this指向window 对象 
}
test1();
let obj = {
    name: 'jack'
}

test1.call(obj)
// obj.tt = test1
// obj.tt();
test1.myCall(obj, '222')


Function.prototype.myApply = function (context) {
    if(typeof this !== 'function') {
        throw new TypeError('not function')
    }
    //test1.myCall 所以this指向test1
    context = context || window;// context第一个参数如果有传那么是个对象
    context.fn = this;  // 创建 obj.tt = test1
    // let arg = [...arguments].slice(1);
    let result
    // 用来判断是否传递了第二个参数 ,没有使用 arguments.length  学习一下
    if(arguments[1]){
        result = context.fn(...arguments[1]);
        // 毕竟是个方法  这里需要将第二个数组类型扩展出来一个个传进去
        //  即 外面传的是数组,但是我们实际给方法的还是一个个参数
    }else {
        result = context.fn()
    }
    
    delete context.fn;
    return result;
}


// instanceof  用来判断测试 构造函数的prototype属性是否出现在对象的原型链中的任何位置
// bind() 的注意点  
// https://www.cnblogs.com/goloving/p/9380076.html    
function foo(c) {
    this.b = 100;
    console.log(this.a);
    console.log(c)
    return this.a;
}

var func =  foo.bind({a:1},20);
func();//1 20
new func();//undefined 20   foo {b: 100}，可以看到此时上面的bind并不起作用 执行完之后返回本身;
// 解释: 函数中的return除非返回的是个对象，否则通过new返回的是个this，指向一个空对象，空对象原型指向foo.prototype，
//      空对象的b属性是100。也就是说通过new的方式创建一个对象，bind()函数在this层面上并不起作用
//  但是需要注意在参数层面上仍起作用

// 所以 实现bind函数 要注意new的情况

/**
 * https://blog.csdn.net/q3254421/article/details/82999718
 * 总的来说bind有如下三个功能点：
 * 1. 改变原函数的 this 指向，即绑定上下文，返回原函数的拷贝
 * 2. 当 绑定函数 被调用时，bind的额外参数将置于实参之前传递给被绑定的方法。
 * 3. 注意，一个 绑定函数 也能使用 new 操作符创建对象,这种行为就像把原函数当成构造器，
 * thisArg 参数无效。也就是 new 操作符修改 this 指向的优先级更高。
 */


// [使用js实现bind()函数最严谨的方式](https://blog.csdn.net/a_salt_fish/article/details/88047330)
Function.prototype.bind1 = function (oThis) {
    if (typeof this !== "function") {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var aArgs = Array.prototype.slice.call(arguments, 1), 
        fToBind = this, 
        fNOP = function () {},
        // bind完之后 有两种情况 1: new func();  2 func()直接调用
        fBound = function () {
          return fToBind.apply(this instanceof fNOP && oThis
                                 ? this
                                 : oThis || window,
                               aArgs.concat(Array.prototype.slice.call(arguments)));
        };

    // 维护原型关系
    if (this.prototype) {
      // 这里需要判断是否存在prototype属性 应为Funtion.prototype 是不存在prototype属性的
      fNOP.prototype = this.prototype; 
    }
    // 下行的代码使fBound.prototype是fNOP的实例,因此
    // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
    fBound.prototype = new fNOP();

    return fBound;
};

// 思路：类似call，但返回的是函数
Function.prototype.mybind = function (context) {
    if (typeof this !== 'function') {
      throw new TypeError('Error')
    }
    let _this = this
    let arg = [...arguments].slice(1)
    return function F() {
      // 处理函数使用new的情况
      if (this instanceof F) {
        return new _this(...arg, ...arguments)
      } else {
        return _this.apply(context, arg.concat(...arguments))
      }
    }
}

