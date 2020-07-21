// https://www.cnblogs.com/zfdai/p/9473825.html
// https://www.cnblogs.com/imwtr/p/5893814.html
// 解构
const ORDER_LIST_STATUS = {
    APPLIED:1,  //已申请
    APPLY:2,    //待提交
    AUDIT:3,    //待审核
};
const constOrderStatus = (() =>
    {   
        let obj = {};
        ({ 
            APPLIED: obj.apply,     //1
            APPLY: obj.submit,  //2
            AUDIT: obj.audit,   //3
             } = ORDER_LIST_STATUS);
        return obj;
    })()   //  因为这里是不打算传递任何参数
// 这里实现了传递参数的情况  
console.log(constOrderStatus,'order_status')
let postData = {"name1":"value1","name2":"value2"};
postData = (function(value){
	var dataString = "";
	for(var key in value){
	     dataString += key+"="+value[key]+"&";
	};
	return dataString;
}(postData));
console.log(postData,'postData')

const obj = { name:'keo' };
const { name:myname } = obj;
//这样 myname的值就是’keo’
function introduce( { name } ) { console.log(name) };
introduce(obj);//对象作为参数传入


let [ a , b ] = [1] ; //b 为undefined
let [, b] = [1,2]; // b 为2 ; 用于第一个数不要的情况
var [a, ...b] = [1, 2, 3]; // b 为 [2,3]; 用于只要后面几个元素的情况
var [a, ...b] = [1]; // b 为 []
// 覆用默认值 只在两种情况下  1.前后元素个数不对等  2.元素为 undefined 的情况
var [a, b = [2, 3]] = [1];     var [a, b = [2, 3]] = [1, undefined];  // b 为 [2,3]
var [a, b = [2, 3]] = [1, null];   // 这与上面的两种情况不同 这里的 b 为 null
// 惰性求值  
var [str = foo()] = [1];    //   str 为1  ; 没执行方法 (执行的条件是默认值生效,这里没生效)
//函数如果执行会在 
var [str = foo()] = [1]; 执行的时候立马执行 
//变量值的交换
var x = 1, y = 2; [x, y] = [y, x]; // x为2  y为1

// 对于对象
var {name, id: ID} = { name: 'jack', id: 1 };  // 此时 声明的是ID 而不是 id 变量
var { a0: { b0: { c0 } } } = { a0: { b0: { c0: 'cc', d0: 'dd' } } };  // 然而这里只定义了 c0 为 cc
var {a:b = 2} = {};   //b 为 2
var {a:b = 2} = { a: 1 };   // b 为1
const {foo, bar} = require('./util'); // 有foo  和bar 属性
//var a; {a} = { a: 1 }; // 会报错是因为大括号位于行首 js引擎会认为{a}是个代码块,所以等号就出问题了
// (Uncaught SyntaxError: Unexpected token =   // 报的错误) 在后面一句的全部加个括号就行了
var a; ({a} = { a: 1 });  // 这里是正确的写法;

// 对于字符串 ( 用数组和对象的两种模式都能进行匹配 )
var [a, b] = 'str'; // a 为s b // t
var { 0: a, 1: b, length: len } = 'str'; //  a为 s  b 为 t  len 为 3
