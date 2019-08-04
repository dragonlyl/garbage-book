/**
 * 引用类型 Object 和array
 * 1.object
 * 创建对象两种方法  1.var obj = new Object()  2. var person = {name:'jack'}
 * 所以  var person = {}  等价于 new Object()
 * 
 * let pname = person.name
 * person.name  等价于 person['name'] 也等价于 person[pname]
 */

 /**
  * 2.array
  * var arr = new Array() //如果知道length可以在括号里面填入长度数字表示创建的数组长度 ,
  *     如果括号里面是字符串表示该数组只包含一项,项目内容就是该字符串
  * 也等价于  var arr = ['嘻嘻','哈哈'] //建议不要在'哈哈'后面加逗号 ,因为可能会造成项目变成3项的数组
  * 
  * 数组的下标如果比length长js是不会报错 
  */
 var arr1 = ['h','x',]
 console.log(arr1.length,'arr1的长度',arr1[arr1.length],'下标3为undefined');//可能是2也可能是3(IE8之前的版本)
 //所以可以通过上述的方法 给数组的最后一个地方添加一个元素

 /**
  * 检测数组 
  * arr instanceof Array  (但因为不同环境会使得同一个数组分别具有各自不同的构造函数)
  * 或者用 Array.isArray(arr)
  */
 
  /**
   * 数组转换 
   * valueOf()  返回数组本身 toString() 数组元素用逗号隔开的字符串  (同.join()和.join(,))
   * 用alert() 因为alert接收字符串参数,所以你里面调用数组会自动调用toString()方法
   */
console.log(arr1.join(),'join内没任何参数,同toString')
//可以通过一次push push多项  push('第一项','第二项')

//实现 栈的效果 push pop  实现队列的效果 push shift  (从头部插入新元素用unshift)
arr1.unshift('a', 'b'); //这个会返回新数组的长度
console.log(arr1,'是a在前,b在后')


//sort 方法是依据每个数组项调用toString()方法然后比较字符串大小 所以会造成如下
var arr2 = [0,1,5,10,15]
console.log(arr2.sort(),arr2.sort((a,b)=>a>b));//1,2,10,15,5  ;所以sort往往带个函数  

//concat 不是数组就会黏贴在数组后面
var a11 = ['1','2']; var a22 = [{b:2},['4','5'],'3']
console.log(a11.concat(a22), a11.concat({ b: 2},['4','5'],'3'),'concat');//两种形式不一样

//splice() 可以实现 删除 ,插入 , 替换功能

//every 和some区别在于  前者全true才true  后者一个true就true
