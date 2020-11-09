/*
 * @Author: your name
 * @Date: 2020-10-26 14:26:14
 * @LastEditTime: 2020-10-26 14:28:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \garbage-book\on_the_job\byself\空参数.js
 */
function test ({a = 1}){
    console.log(a)
};

test({}); // 必须传空对象，否则报错
test({a:2});

function test1 (a = 1){
    console.log(a)
};

test1(); // 可以不传
test1(2)

function test2 ({a = 1} = {}){
    console.log(a)
};

test2(); // 不传默认空对象
test2({a:2});