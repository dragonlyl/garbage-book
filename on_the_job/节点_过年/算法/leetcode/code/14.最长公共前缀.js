/*
 * @lc app=leetcode.cn id=14 lang=javascript
 *
 * [14] 最长公共前缀
 */

// @lc code=start
/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
    if (strs && strs.length) {
        let str = strs[0];
        if (strs.length >= 1) {
            for (let index = 1; index < strs.length; index++) {
                let current = '';
                for (let i = 0; i < strs[index].length; i++) {
                    if (i >= str.length) {
                        break
                    }
                    if (str.charAt(i) === strs[index].charAt(i)) {
                        current += str.charAt(i)
                    } else {
                        break;
                    } 
                }
                str = current;
                if (str.length === 0) {
                    break;
                }
            }
        }
        return str;
    } else {
        return '';
    }
};
// @lc code=end

