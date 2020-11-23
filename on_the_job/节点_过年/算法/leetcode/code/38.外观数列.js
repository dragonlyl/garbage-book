/*
 * @lc app=leetcode.cn id=38 lang=javascript
 *
 * [38] 外观数列
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function(n) {
    if(n === 1)return '1';
    if(n === 2)return '11';
    let str = countAndSay(n-1);
    let b = 0;
    let a = 1
    let newStr = ''
    for (a; a < str.length; a++) {
        if (str[a] != str[b]) {
            newStr += a-b + ''+str[b];
            b = a;
        }
        
    }
    if(a != b) {
        newStr += a-b + ''+str[b];
    }
    return newStr;

};
// @lc code=end

