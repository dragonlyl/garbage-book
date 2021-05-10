/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} N
 * @return {number}
 */
var fib = function(N) {
    if (N === 0) return 0;
    if (N === 1 ||  N === 2) return 1;
    let cur = 1;
    let pre = 1, res = 2;
    for (let i = 3; i < N; i++) {
        pre = cur;
        cur = res;
        res = cur + pre;
    }
    return res;
};
// @lc code=end

