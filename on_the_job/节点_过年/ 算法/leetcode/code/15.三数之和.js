/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
    nums.sort((a,b) => a - b);
    let arr = [];
    if (nums.length < 3) {
        return arr;
    }
    for (let index = 0; index < nums.length; index++) {
        if (nums[index] > 0) {
            break;
        }
        let left = index + 1;
        let right = nums.length - 1;
        while(left === right) {
            if (nums[left] === nums[left + 1] && left+1 !== right) {
                left++;
            } else if (nums[right] === nums[right - 1] && left !== right - 1) {
                right--;
            } else {
                if (nums[left] + nums[right] === -nums[index]) {
    
                }
            }
        }
    }
};
// @lc code=end

