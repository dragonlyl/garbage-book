/**
 * RegExp  正则表达式
 * var expression = / pattern / flags ; 始终共享同一个RegExp实例
 * var expression = new RegExp("pattern","flags"); 每次都是新实例
 * flags : g(全局) ; i(忽略大小写) ; m(表示多行)
 * 
 *  () [] {} \ ^ $ | ? * + . 这些是元字符 都需要转义  用反斜杆
 */
var pat1 = /[bc]at/i;//匹配第一个bat 或cat 不区分大小写 
var pat2 = /\[bc\]at/i;//匹配第一个[bc]at ,不区分大小写  转义一根反斜杠
var pat3 = new RegExp("\\[bc\\]at",'i');//效果同上  转义要两根反斜杠

/**
 * RegExp实例方法
 * .exec() 使用于捕获组,发货包含第一个匹配项信息的数组;没有返回null
 * 虽说返回的数组,但是多个index(字符串所在位置) 和input(应用正则表达式的字符串)属性
 * 
 * .test()  返回匹配结果 true 或false
 * 
 * .toString() 返回正则表达式的字面量 (无论是用那种方式创建的数组)
 * 
 */

var test = 'bbattcbacat'
var mat = pat1.exec(test);
console.log(mat, mat.index, mat.input, mat[0], mat[1])

//如果 表达式中 有/g的标记为  ,exec还是只会捕获第一个匹配的字符串 ,只不过再次调用时  lastIndex值会增加 (即下次会在上次搜索的位置后面继续搜找)
//当然 ,如果是非全局模式下  lastIndex的值是始终保持不变的(IE除外)

// RegExp有些自带的属性  如 RegExp.input ;(获得最近匹配的字符串) //或者 RegExp.$_ 

//其中  有用(项目中遇到过 )  每次调用 .test() 和.exec() 的时候 会将捕获组存储于 RegExp.$1  ~ RegExp.$9 的位置;即使test()方法只用于返回一个布尔值
var test1 = 'this has been a short summer';
var pat4 = /(..)or(.)/g;
if(pat4.test(test1)){
    console.log(RegExp.$1,RegExp.$2,'$1 和 $2')
}



