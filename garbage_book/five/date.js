/**
 * Date类型   创建 Date有两种方法  
 * new Date() 会默认返回当前事件   或者用  Data.now()
 * 
 * date类型的数据可以调用减法  也可以比较数值大小 (后发生的大于先发生的)
 */
// Date.parse() 可以将字符串转换成date类型 若不行显示NaN 
var now1 = new Date();//括号内可以给定数据  会自动调用  Date.parse()
var now2 = Date.now()
console.log(now1,now2,'now')
// 日期格式化
/**
 *  toDateString();// 星期 年月日
    toTimeString();// 时分秒 和时区
    toLocalDateString();//已经指定时区
    toLocalTimeString();//已指定时区
    //后面这个个不同浏览器不同 都是年月日+时间
    toLocalString();//  带AM和PM
    toString();// 军用时间(0-23表示)
 * 
 */
