/*
 * @lc app=leetcode.cn id=28 lang=javascript
 *
 * [28] 实现 strStr()
 */

// @lc code=start
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if (!needle) return 0;
    if (!haystack || haystack.length < needle.length) return -1;
    return haystack.indexOf(needle);
    // for (let i = 0; i < haystack.length; i++) {

    // }
};
// @lc code=end

