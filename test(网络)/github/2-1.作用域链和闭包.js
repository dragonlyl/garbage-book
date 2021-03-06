// https://github.com/yygmind/blog/issues/17

// 闭包是指有权访问另外一个函数作用域中的变量的函数
// 关键在于下面两点：
//     是一个函数
//     能访问另外一个函数作用域中的变量

// 闭包有下面三个特性：
//     1、闭包可以访问当前函数以外的变量
function getOuter1(){
    var date = '815';
    function getDate(str){
      console.log(str + date);  //访问外部的date
    }
    return getDate('今天是：'); //"今天是：815"
  }
  getOuter1();
//     2、即使外部函数已经返回，闭包仍能访问外部函数定义的变量
function getOuter(){
    var date = '815';
    function getDate(str){
      console.log(str + date);  //访问外部的date
    }
    return getDate;     //外部函数返回
  }
  var today = getOuter();
  today('今天是：');   //"今天是：815"
  today('明天不是：');   //"明天不是：815"
//     3、闭包可以更新外部变量的值
function updateCount(){
    var count = 0;
    function getCount(val){
      count = val;
      console.log(count);
    }
    return getCount;     //外部函数返回
  }
  var count = updateCount();
  count(815); //815
  count(816); //816

// 作用域链：当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没有找到，
//     就去父作用域找，直到找到该变量的标示符或者不在父作用域中，这就是作用域链。

// 作用域链和原型继承查找时的区别：如果去查找一个普通对象的属性，但是在当前对象和其原型中都找不到时，会返回undefined；
//     但查找的属性在作用域链中不存在的话就会抛出ReferenceError。
// 作用域链的顶端是全局对象，在全局环境中定义的变量就会绑定到全局对象中。