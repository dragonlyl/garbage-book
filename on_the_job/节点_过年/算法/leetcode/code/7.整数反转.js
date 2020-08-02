/*
 * @lc app=leetcode.cn id=7 lang=javascript
 *
 * [7] 整数反转
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
    let val = 0;
    if (x < 0) {
        val = -Number((-x).toString().split('').reverse().join(''))
    } else {
        val = Number((x).toString().split('').reverse().join(''))
    }
    if (val > Math.pow(2,31) -1 || val < Math.pow(-2,31)) {
        val = 0
    }
    return val;
};
// @lc code=end

