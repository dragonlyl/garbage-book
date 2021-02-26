// 链接地址 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures
// 一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起
// （或者说函数被引用包围），这样的组合就是闭包（closure）。
// 也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域
function makeFunc() {
    var name = "Mozilla";
    function displayName() {
        alert(name);
    }
    return displayName;
}

var myFunc = makeFunc();
myFunc();
// 一旦 makeFunc() 执行完毕，你可能会认为 name 变量将不能再被访问。
// 然而，因为代码仍按预期运行，所以在 JavaScript 中情况显然与此不同。

// 原因在于，JavaScript中的函数会形成了闭包。 
// 闭包是由函数以及声明该函数的词法环境组合而成的。
// 该环境包含了这个闭包创建时作用域内的任何局部变量。
// 在本例子中，myFunc 是执行 makeFunc 时创建的 displayName 函数实例的引用。
// displayName 的实例维持了一个对它的词法环境（变量 name 存在于其中）的引用。
// 因此，当 myFunc 被调用时，变量 name 仍然可用，其值 Mozilla 就被传递到alert中

function makeAdder(x) {
    return function(y) {
      return x + y;
    };
  }
  
  var add5 = makeAdder(5);
  var add10 = makeAdder(10);
  
  console.log(add5(2));  // 7
  console.log(add10(2)); // 12
//   add5 和 add10 都是闭包。它们共享相同的函数定义，
// 但是保存了不同的词法环境。在 add5 的环境中，x 为 5。而在 add10 中，x 则为 10

// 用闭包模拟私有方法
// 使用立即执行函数，创建一个独立的作用域， 外部访问不到（即避免了「变量污染」）
var Counter = (function () {
    // 可以看到 innerVal 和changeVal是无法通过外部访问
   let innerVal = 0;
   function changeVal (val) {
        innerVal += val
   }
   return {
    increment: function() {
        changeVal(1);
      },
      decrement: function() {
        changeVal(-1);
      },
      val: function() {
        return innerVal;
      }
   }
})()
// 只能访问 Counter.increment，Counter.decrement 和 Counter.val 

function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
    this.getName = function() {
      return this.name;
    };
  
    this.getMessage = function() {
      return this.message;
    };
}


// 在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。
// 原因是这将导致每次构造器被调用时，
// 方法都会被重新赋值一次（也就是说，对于每个对象的创建，方法都会被重新赋值）。

// 使用这个来替换闭包
function MyObject(name, message) {
    this.name = name.toString();
    this.message = message.toString();
}
MyObject.prototype = {
    getName: function() {
      return this.name;
    },
    getMessage: function() {
      return this.message;
    }
};