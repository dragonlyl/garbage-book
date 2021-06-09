/*
 * @lc app=leetcode.cn id=5 lang=javascript
 *
 * [5] 最长回文子串
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    let length = s.length;
    if (length === 0) return '';
    if (length === 1) return s[0];
    let dp = Array.from(Array(length), () => Array(length).fill(true))
    let res = s[0];
    for (let i = length - 1; i >= 0; i--) {
        for (let j = i + 1; j < length; j++) {
            dp[i][j] = dp[i + 1][j - 1] && s[i] === s[j]
            if(dp[i][j] && (j - i + 1 > res.length)) {
                res = s.substring(i, j + 1)
            }
        }
    }
    return res;
};
// @lc code=end

