/*
 * @lc app=leetcode.cn id=12 lang=javascript
 *
 * [12] 整数转罗马数字
 */

// @lc code=start
/**
 * @param {number} num
 * @return {string}
 */
var intToRoman = function(num) {
    let arr = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9 , 5, 4, 1];
    let value = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I'];
    let i = 0;
    let str = ''
    while(i < arr.length) {
        if (num >= arr[i]) {
            num -= arr[i];
            str += value[i]
        } else {
            i++;
        }
    }
    return str;
};
// @lc code=end

