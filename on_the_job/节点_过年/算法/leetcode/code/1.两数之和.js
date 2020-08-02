/*
 * @lc app=leetcode.cn id=1 lang=javascript
 *
 * [1] 两数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let obj = {};
    for (let index = 0; index < nums.length; index++) {
        // 这里声明的otherNum会占用空间 换种存储方式
        // let otherNum = target - nums[index];
        // if (obj[otherNum]!== undefined) return [obj[otherNum], index];
        // obj[nums[index]] = index;
        if (obj[nums[index]] !== undefined) {
            return [obj[nums[index]], index]
        } else {
            obj[target - nums[index]] = index;
        }
        
    }
};
// @lc code=end

