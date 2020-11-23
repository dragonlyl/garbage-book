/*
 * @lc app=leetcode.cn id=39 lang=javascript
 *
 * [39] 组合总和
 */

// @lc code=start
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function(candidates, target) {
    for (let index = 0; index < candidates.length; index++) {
        if (candidates[index] > target) {
            break;
        }
    }
};
// @lc code=end

