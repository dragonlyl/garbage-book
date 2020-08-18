/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    let def = function (res, path, nums) {
        if (path.length === nums.length) {
            res.push([...path]);
            return
        }
        for (let i = 0; i < nums.length; i++) {
            if (path.indexOf(nums[i]) === -1) {
                path.push(nums[i]);
                def(res, path, nums)
                path.pop();
            }
        }
    }
    let res = [];
    let path = [];
    def(res, path, nums);
    return res;
};
// @lc code=end

