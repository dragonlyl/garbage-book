// 防抖
// 节流
// eventBus
// instanceof
// call
// apply
// bind
function throttle (fn, time) {
  let can = true;
  return function () {
    if (!can) {
      return;
    }
    can = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      can = true;
    }, time);
  }
}
function debounce (fn, time) {
  let timeout = null
  return function () {
    if (timeout) return clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments)
    }, time);
  }
}
// 观察模式 ，发布订阅模式
class Sub {
  constructor () {
    this.obj = {};
  }
  on(name, fn) {
    if (!this.obj[name]) {
      this.obj[name] = [];
    }
    this.obj[name].push(fn);
  }
  emit() {
    let key = [].shift.call(arguments);
    if (!this.obj[key]) return;
    let arr = this.obj[key];
    arr.forEach(fn => {
      fn.apply(this, arguments);
    })
  }
  remove(name) {
    if (!this.obj[name]) delete this.obj[name];
  }
}
let sub = new Sub();
sub.on('click', (val) => {console.log(val, 111)})
sub.on('click', (val) => {console.log(val, 222)})
sub.emit('click', 777)

function myInstanceof(a, b) {
  let pro = a.__proto__;
  let t = b.prototype;
  while(pro!== null) {
    if (pro === t) return true;
    pro = pro.__proto__;
  }
  return false;
}

Function.prototype.myCall = function (obj) {
  if(typeof this !== 'function') {
    throw new TypeError('not function')
  }
  let fn = this || window;
  let arg = [...arguments].slice(1)
  obj.fn = fn;
  let ret = obj.fn(...arg)
  delete obj.fn;
  return ret;
}
function xx(val) {
  console.log(this.tt, val);
}
xx.myCall({tt: 2}, 33);
Function.prototype.myApply = function () {
  if(typeof this !== 'function') {
    throw new TypeError('not function')
  }
  let obj = arguments[0];
  let fn = this || window;
  let ret = null;
  obj.fn = fn;
  if (arguments[1]) {
    ret = obj.fn(...arguments[1])
  } else {
    ret = obj.fn()
  }
  delete obj.fn;
  return ret;
}
xx.myApply({tt: 2}, [33]);

Function.prototype.myBind = function () {
  if(typeof this !== 'function') {
    throw new TypeError('not function')
  }
  let obj = [].shift.call(arguments);
  let arg = [...arguments];
  let fn = this || window;
  return function () {
    if (this instanceof fn) {
      return new fn(...arg, ...arguments)
    }
    return fn.apply(obj, arg.concat(...arguments));
  }
}
let bindX = xx.myBind({tt:2})
bindX(44);
let myNew = function () {
  let fn = [].shift.call(arguments);
  let obj = Object.create(fn.prototype);
  let ret = fn.apply(obj, arguments);
  return ret instanceof Object ? ret : obj;
}
let n = myNew(xx, 22)