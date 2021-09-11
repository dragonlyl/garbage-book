/**
 * 替换空格
 * 
 * 请实现一个函数，把字符串中的每个空格替换成针%20"。例如 "We are happy.", 则输出 "We%20are%20happy心
 * 
 */

// \s 是空格(空白内容) , \W 是非单词字符
 var replaceSpace1 = function(s) {
    // return s.replace(/\s/g,'%20')
    return s.split(' ').join('%20')
};
// console.log(replaceSpace1('We are happy.'))

// 主要考察 插入元素移动
// 方法1: 用一些简单的函数, replace split和join
// 方法2: 转换为数组,然后用移动指针的形式

var replaceSpace = function (s) {
    s = s.split('');
    let count = 0
    for(let i = 0; i < s.length; i++) {
        if (s[i] === ' ') ++count;
    }
    if (count) {
        q = s.length - 1
        for (let p = s.length - 1 + count * 2; p >= 0; p--, q--) {
            if (s[q] === ' ') {
                s[p] = '0'
                s[p-1] = '2'
                s[p-2] = '%'
                p -= 2;
            } else {
                s[p] = s[q]
            }
        }
    }
    return s.join('');
}
console.log(replaceSpace('We are happy.'))

// 代码随想
// https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/solution/jian-zhi-offer-05-ti-huan-kong-ge-shuang-cgk3/