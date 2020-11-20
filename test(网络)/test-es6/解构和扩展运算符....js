let a = 0;
//undefined(未被定义 取2) null(改值为空 取null)
let [b, c = 2, d = 3] = [1, undefined, null];
// console.log(a,b,c,d)
//数组的结构赋值是顺序对应 ,对象的结构赋值要名字对应(对应不上就是undefined)
let { name } = { name: 'lin' };
//先赋值的用结构赋值要先加小括号
let lastName;
({ lastName } = { lastName: 'dragon' });
// console.log(name + lastName)

//对字符串
let [q, w, e] = 'hello';
// console.log(q,w,e)//实现了去字符串的前3位

//...的用处
let arr1 = [1, 2, 3];
//这种情况改变arr2的值arr1也会变
// let arr2 = arr1;
// 用... 就不会影响到arr1
let arr2 = [...arr1]

arr2.push(4);
console.log(arr2, arr1);

//for of  比for( ; ;)来的更为简单
for (let val of arr2) {
    // console.log(val);
}
// indexOf()>=0  不如直接用includes() 来的方便
// str.repeat(2) //将str字符串打印2次

