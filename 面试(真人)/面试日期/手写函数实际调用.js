let pattern = /^1[35][0-9]{9}/;
let num = 13588024593;
let result = pattern.exec(num);
console.log(result)



function myNew () {
    let O = [].shift.call(arguments);
    // 创建空对象, 将该对象的proto 指向 构造函数的原型上
    let obj = Object.create(O.prototype);
    // 绑定this, 使该对象能访问到构造函数中的属性(将该对象作为this的上下文)
    let ret = O.call(obj, ...arguments)
    // 优先返回构造函数返回的对象
    return typeof ret === 'object' ? ret : obj;
}
function myCall (target) {
    if (typeof target !== 'function') {
        throw Error('')
    }
    let ctx = target || window
    let arg = [...arguments].slice(1)
    ctx.fn = this
    let ret = ctx.fn(...arg)
    delete ctx.fn
    return ret
}

Function.prototype.myBind = function (context) {
    var _this = this
    var args = [...arguments].slice(1)
    // 返回一个函数
    return function F() {
      // 因为返回了一个函数，我们可以 new F()，所以需要判断
      if (this instanceof F) {
        return new _this(...args, ...arguments)
      }
      return _this.apply(context, args.concat(...arguments))
    }
  }
  
function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function() {
    return this.x + ',' + this.y;
};

var p = new Point(1, 2);
p.toString(); // '1,2'


var YAxisPoint = Point.myBind(null, 0/*x*/);

var axisPoint = myNew(YAxisPoint, 5);
// var axisPoint = new YAxisPoint(5);
axisPoint.toString(); // '0,5'

axisPoint instanceof Point; // true
axisPoint instanceof YAxisPoint; // true
new YAxisPoint(17, 42) instanceof Point; // true


最终稿子

fn.myCall(target, arguments)
Function.prototype.myCall (target) {
    // 必须是函数调用
    if (typeof this !== 'function') {
        throw Error('非函数')
    }
    // target 为null 情况下 为window
    let ctx = target || window
    // 拿到传入的参数
    let arg = [...arguments].slice(1)
    // 将方法绑定到 target上
    ctx.fn = this
    // 运行该方法
    let ret = ctx.fn(...arg)
    // 删除定义的属性
    delete ctx.fn
    return ret
}

Function.prototype.myApply(target) {
    if (typeof this !== 'function') {
        throw Error('非函数')
    }
    let ctx = target || window
    // 拿到传入的参数
    let arg = [...arguments].slice(1)
    // 将方法绑定到 target上
    ctx.fn = this
    // 运行该方法
    let ret = ctx.fn(...arg[0])
    // 删除定义的属性
    delete ctx.fn
    return ret
}

Point.bind(obj)
Function.prototype.myBind = function (context) {
    // 调用bind的方法
    let fn = this
    let arg = [...arguments].slice(1)

    // 返回的是方法
    return function F (){
        // 判断是否用 fn2 当做构造函数
        if (this instanceof F) {
            // 是就用 fn 构造函数
            return new fn(...arg, ...arguments)
        }
        // 否则 将this绑定到 context 上
        return fn.apply(context, arg.concat(...arguments))
    }

}
myNew(Point, 1, 2)

function myNew (target) {
    // 拿到剩余参数
    let arg = [].shift.call(arguments)
    // 创建一个空对象,空对象的__proto__ 指向target的原型
    let obj = Object.create(target.prototype)
    // 绑定target内容
    let ret = target.call(obj, ...arguments)
    // 如果target构造函数有内容返回优先展示
    return typeof ret === 'object' ? ret : obj

}