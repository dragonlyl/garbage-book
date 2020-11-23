// https://juejin.im/post/5bfe8fc5e51d4514e0515b90

// this绑定规则: 1.默认绑定 2.隐式绑定 3.显示绑定 4.new绑定 5.箭头函数绑定

// 调用位置就是函数在代码中被调用的位置（而不是声明的位置）。

// 1.默认绑定 (严格模式,this为undefined ,不严格为全局对象)

// 独立函数调用，可以把默认绑定看作是无法应用其他规则时的默认规则，this指向全局对象。
// 严格模式下，不能将全局对象用于默认绑定，this会绑定到undefined。只有函数运行在非严格模式下，
// 默认绑定才能绑定到全局对象。在严格模式下调用函数则不影响默认绑定。
function foo() { // 运行在严格模式下，this会绑定到undefined
    "use strict";
    console.log(this.a);
}
var a = 2;
// 调用
foo(); // TypeError: Cannot read property 'a' of undefined
// --------------------------------------
function foo() { // 运行
    console.log(this.a);
}
var a = 2;
(function () { // 严格模式下调用函数则不影响默认绑定
    "use strict";
    foo(); // 2
})();

// 2 隐式绑定
// 当函数引用有上下文对象时，隐式绑定规则会把函数中的this绑定到这个上下文对象。
// 对象属性引用链中只有上一层或者说最后一层在调用中起作用

function foo() {
    console.log(this.a);
}
var obj = {
    a: 2,
    foo: foo
};
obj.foo(); // 2

// 这里讲解直接将函数赋给另外一个值时的this(要与上面分开看) 如下:

// 虽然bar是obj.foo的一个引用，但是实际上，它引用的是foo函数本身。
// bar()是一个不带任何修饰的函数调用，应用默认绑定。
function foo() {
    console.log(this.a);
}

var obj = {
    a: 2,
    foo: foo
};
var bar = obj.foo; // 函数别名
var a = "oops, global"; // a是全局对象的属性
bar(); // "oops, global"
// 原因  : 
// 被隐式绑定的函数特定情况下会丢失绑定对象，应用默认绑定，把this绑定到全局对象或者undefined上。

// 除了上面那种会 丢失外 回调函数丢失this 也是常见
function foo() {
    console.log(this.a);
}
function doFoo(fn) {
    // fn其实引用的是foo
    fn(); // <-- 调用位置！
}
var obj = {
    a: 2,
    foo: foo
};
var a = "oops, global"; // a是全局对象的属性
doFoo(obj.foo); // "oops, global"

// ----------------------------------------

// JS环境中内置的setTimeout()函数实现和下面的伪代码类似：  (参数传递也是一种隐式赋值,传入函数时也会被隐式赋值)
function foo() {
    console.log( this.a );
}

function doFoo(fn) {
    // fn其实引用的是foo
    
    fn(); // <-- 调用位置！
}

var obj = {
    a: 2,
    foo: foo
};

var a = "oops, global"; // a是全局对象的属性

doFoo( obj.foo ); // "oops, global"  (既即使是obj.foo  但是打印的还是全局的)

function setTimeout(fn, delay) {
    // 等待delay毫秒
    fn(); // <-- 调用位置！
}

// 3 显式绑定
// 通过call(..) 或者 apply(..)方法。第一个参数是一个对象，在调用函数时将这个对象绑定到this。
// 因为直接指定this的绑定对象，称之为显示绑定

// 显示绑定无法解决丢失绑定问题。

// 解决方案：
// 1、硬绑定
// 创建函数bar() ，并在它的内部手动调用foo.call(obj) ，强制把foo的this绑定到了obj。
// 这种方式让我想起了借用构造函数继承
function foo() {
    console.log(this.a);
}
var obj = {
    a: 2
};
var bar = function () {
    foo.call(obj);
};
bar(); // 2
setTimeout(bar, 100); // 2
// 硬绑定的bar不可能再修改它的this
bar.call(window); // 2  虽然我这里绑定window 但在bar内部 硬绑定了obj

// 硬绑定的应用场景 在 创建一个包裹函数，负责接收参数并返回值
function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

var obj = {
    a: 2
};

var bar = function () {
    return foo.apply(obj, arguments);
};

var b = bar(3); // 2 3
console.log(b); // 5

// 所以在就是 bind
function foo(something) {
    console.log(this.a, something);
    return this.a + something;
}

// 简单的辅助绑定函数
function bind(fn, obj) {
    return function () {
        return fn.apply(obj, arguments);
    }
}

var obj = {
    a: 2
};

var bar = bind(foo, obj);
// es6 内置的bind
// var bar = foo.bind(obj);

var b = bar(3); // 2 3
console.log(b); // 5

// JS许多内置函数提供了一个可选参数，被称之为“上下文”（context），其作用和bind(..)一样，确保回调函数使用指定的this。
// 这些函数实际上通过call(..)和apply(..)实现了显式绑定。

// function foo(el) {
// 	console.log( el, this.id );
// }

// var obj = {
//     id: "awesome"
// }

// var myArray = [1, 2, 3]
// // 调用foo(..)时把this绑定到obj
// myArray.forEach( foo, obj );
// // 1 awesome 2 awesome 3 awesome


// 4 new绑定

// 在JS中，构造函数只是使用new操作符时被调用的普通函数，他们不属于某个类，也不会实例化一个类。
// 包括内置对象函数（比如Number(..) ）在内的所有函数都可以用new来调用，这种函数调用被称为构造函数调用。
// 实际上并不存在所谓的“构造函数”，只有对于函数的“构造调用”。

// 使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作。

// 1、创建（或者说构造）一个新对象。
// 2、这个新对象会被执行[[Prototype]]连接。
// 3、这个新对象会绑定到函数调用的this。
// 4、如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

// 使用new来调用foo(..)时，会构造一个新对象并把它（bar）绑定到foo(..)调用中的this。
function foo(a) {
    this.a = a;
}

var bar = new foo(2); // bar和foo(..)调用中的this进行绑定
console.log(bar.a); // 2

// 手写一个new实现;
function create() {
    // 创建一个空的对象
    var obj = new Object(),
    // 获得构造函数，arguments中去除第一个参数
    Con = [].shift.call(arguments);
    // 链接到原型，obj 可以访问到构造函数原型中的属性
    obj.__proto__ = Con.prototype;
    // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
    var ret = Con.apply(obj, arguments);
    // 优先返回构造函数返回的对象
    return ret instanceof Object ? ret : obj;
};
// 使用是个手写new
function Person() {... }

// 使用内置函数new
var person = new Person(...)

// 使用手写的new，即create
var person = create(Person, ...)

// 代码原理解析：

// 1、用new Object() 的方式新建了一个对象obj

// 2、取出第一个参数，就是我们要传入的构造函数。此外因为 shift 会修改原数组，所以 arguments 会被去除第一个参数

// 3、将 obj 的原型指向构造函数，这样obj就可以访问到构造函数原型中的属性

// 4、使用 apply，改变构造函数 this 的指向到新建的对象，这样 obj 就可以访问到构造函数中的属性

// 5、返回 obj





// 在new中使用硬绑定函数的目的是预先设置函数的一些参数，
// 这样在使用new进行初始化时就可以只传入其余的参数（柯里化）
function foo(p1, p2) {
    this.val = p1 + p2;
}

// 之所以使用null是因为在本例中我们并不关心硬绑定的this是什么
// 反正使用new时this会被修改
var bar = foo.bind(null, "p1");

var baz = new bar("p2"); 

baz.val; // p1p2


// 4 绑定例外
// 4.1 被忽略的this
// 把null或者undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认规则。
// 下面两种情况下会传入null

// 使用apply(..)来“展开”一个数组，并当作参数传入一个函数
// bind(..)可以对参数进行柯里化（预先设置一些参数）
function foo(a, b) {
    console.log("a:" + a + "，b:" + b);
}

// 把数组”展开“成参数
foo.apply(null, [2, 3]); // a:2，b:3

// 使用bind(..)进行柯里化
var bar = foo.bind(null, 2);
bar(3); // a:2，b:3 

// 总是传入null来忽略this绑定可能产生一些副作用。如果某个函数确实使用了this，
// 那默认绑定规则会把this绑定到全局对象中

// 安全的做法就是传入一个特殊的对象（空对象），把this绑定到这个对象不会对你的程序产生任何副作用。
// JS中创建一个空对象最简单的方法是 ** Object.create(null) **，这个和{ } 很像，
// 但是并不会创建Object.prototype这个委托，所以比{ } 更空。

// 所以上面的代码可以优化成

// 我们的空对象
var ø = Object.create(null);
// 把数组”展开“成参数
foo.apply(ø, [2, 3]); // a:2，b:3

// 使用bind(..)进行柯里化
var bar = foo.bind(ø, 2);
bar(3); // a:2，b:3 

// 4.2 间接引用
// 间接引用下，调用这个函数会应用默认绑定规则。间接引用最容易在赋值时发生。

// p.foo = o.foo的返回值是目标函数的引用，所以调用位置是foo()而不是p.foo()或者o.foo()
function foo() {
    console.log(this.a);
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2
p.foo(); // 4


// 4.3 软绑定

// 硬绑定可以把this强制绑定到指定的对象（new除外），防止函数调用应用默认绑定规则。
// 但是会降低函数的灵活性，使用硬绑定之后就无法使用隐式绑定或者显式绑定来修改this。

// 如果给默认绑定指定一个全局对象和undefined以外的值，那就可以实现和硬绑定相同的效果，
// 同时保留隐式绑定或者显示绑定修改this的能力。

// 默认绑定规则，优先级排最后
// 如果this绑定到全局对象或者undefined，那就把指定的默认对象obj绑定到this,否则不会修改this
if (!Function.prototype.softBind) {
    Function.prototype.softBind = function (obj) {
        var fn = this;
        // 捕获所有curried参数
        var curried = [].slice.call(arguments, 1);
        var bound = function () {
            return fn.apply(
                (!this || this === (window || global)) ?
                    obj : this,
                curried.concat.apply(curried, arguments)
            );
        };
        bound.prototype = Object.create(fn.prototype);
        return bound;
    };
}
// 使用：软绑定版本的foo()可以手动将this绑定到obj2或者obj3上，但如果应用默认绑定，则会将this绑定到obj
function foo() {
    console.log("name:" + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

// 默认绑定，应用软绑定，软绑定把this绑定到默认对象obj
var fooOBJ = foo.softBind(obj);
fooOBJ(); // name: obj 

// 隐式绑定规则
obj2.foo = foo.softBind(obj);
obj2.foo(); // name: obj2 <---- 看！！！

// 显式绑定规则
fooOBJ.call(obj3); // name: obj3 <---- 看！！！

// 绑定丢失，应用软绑定
setTimeout(obj2.foo, 10); // name: obj



// 5 this词法
// ES6新增一种特殊函数类型：箭头函数，箭头函数无法使用上述四条规则，
// 而是根据外层（函数或者全局）作用域（词法作用域）来决定this。


function foo() {
    // 返回一个箭头函数
    return (a) => {
        // this继承自foo()
        console.log(this.a);
    };
}

var obj1 = {
    a: 2
};

var obj2 = {
    a: 3
}

var bar = foo.call(obj1); // 这里绑定的环境是obj1  此时foo内部的this是obj1  bar = () => {console.log(this.a)}
bar.call(obj2); // 2，不是3！  这里改变了bar的调用环境为obj2,但没有影响到之前为箭头函数的this

// foo()内部创建的箭头函数会捕获调用时foo()的this。由于foo()的this绑定到obj1，
// bar(引用箭头函数)的this也会绑定到obj1，箭头函数的绑定无法被修改(new也不行)。

// ES6之前和箭头函数类似的模式，采用的是词法作用域取代了传统的this机制。

// function foo() {
//     var self = this; // lexical capture of this
//     setTimeout( function() {
//         console.log( self.a ); // self只是继承了foo()函数的this绑定
//     }, 100 );
// }

// var obj = {
//     a: 2
// };

// foo.call(obj); // 2
// 代码风格统一问题：如果既有this风格的代码，还会使用 seft = this 或者箭头函数来否定this机制。
    // 只使用词法作用域并完全抛弃错误this风格的代码；
    // 完全采用this风格，在必要时使用bind(..)，尽量避免使用 self = this 和箭头函数。


var num = 1;
var myObject = {
    num: 2,
    add: function () {
        this.num = 3;
        (function () {
            console.log(this.num);
            this.num = 4;
        })();
        console.log(this.num);
    },
    sub: function () {
        console.log(this.num)
    }
}
myObject.add(); // 到 this.num = 3 => 隐式绑定 修改myObject.number = 3;
// 然后里面 函数默认绑定 输出window.num = 1; 到 this.num = 4 => 默认绑定 window.num = 4 
console.log(myObject.num); 
console.log(num); 
var sub = myObject.sub;
// 丢失了隐式绑定的 myObject,所以使用默认绑定 输出 4
sub();
// 1、3、3、4、4

