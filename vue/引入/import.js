//commonjs 引入
var cal = require('./cal.js');

//commonjs导出
module.exports = cal;


//es6 默认是获取default属性
import cal from './cal.js'

//es6导出
export default  cal;

//按需导入
export var obj1 = xx;
import {obj1} from './cal.js'

//导出全部  { default:xx,obj1:xx }
import * as allobj from './cal.js';
//import只能在函数的最外层  不能包含在函数内部