/*
 * @lc app=leetcode.cn id=11 lang=javascript
 *
 * [11] 盛最多水的容器
 */

// @lc code=start
/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    let i = 0;
    let j = height.length - 1;
    let val = 0;
    while(i < j) {
        if (height[i] <= height[j]) {
            val = Math.max(height[i]* (j - i), val);
            i++
        } else {
            val = Math.max(height[j] * (j - i), val);
            j--
        }
    }
    return val;
};
// @lc code=end

