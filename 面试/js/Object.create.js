// Object.create可以理解为继承一个对象，它是ES5的一个新特性，
// 对于旧版浏览器需要做兼容，基本代码如下（vue使用ie9+浏览器，
// 所以不需要做兼容处理）：
if (!Object.create) {
    Object.create = function (o) {
        function F() {}  //定义了一个隐式的构造函数
        F.prototype = o;
        return new F();  //其实还是通过new来实现的
    };
  }
