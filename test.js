
Function.prototype.myApply = function (context) {
    if (typeof this !== 'function') {
        throw new TypeError('not function')
    }
    let _this = this || window;
    let fn = Symbol();
    context[fn] = _this;
    let result;
    if (arguments[1]) {
        result = context[fn](...arguments[1])
    } else {
        result = context[fn]()
    }
    delete context[fn];
    return result;
}

let obj = {t: '33'}
function tt(a,bb) {
    console.log(this.t, a,bb);
}
tt(12,22);
tt.myApply(obj,[12,33])
Function.prototype.myBind = function () {
    let context = [].shift.call(arguments) || window;
    let arg = arguments;
    let fn = this;
    return function fn1 () {
        return this instanceof fn1 ? new fn1(...arguments) : fn.apply(context, arg.concat(...arguments))
    }
}
let fn1 = tt.bind(obj);
fn1(12,22)
