/*
 * @lc app=leetcode.cn id=9 lang=javascript
 *
 * [9] 回文数
 */

// @lc code=start
/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    // let str = x.toString();
    // return str.split('').reverse().join('') === str;
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
    let reverseNum = 0
    while (x > reverseNum) {
        reverseNum = reverseNum * 10 + x % 10;
        x = Math.floor(x/10)
    }
    return reverseNum === x || Math.floor(reverseNum/10) === x
};
// @lc code=end

