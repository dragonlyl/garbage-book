/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    let pre = 0;
    let max = nums[0];
    nums.forEach(val => {
        // pre = Math.max(val, pre);
        pre = pre > 0 ? (pre + val): val;
        max = Math.max(pre,max);
    });
    return max;
};
// @lc code=end

