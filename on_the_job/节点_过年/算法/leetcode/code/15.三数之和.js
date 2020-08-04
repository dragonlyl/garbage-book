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
    let arr = [];
    if (nums.length < 3) {
        return arr;
    }
    nums.sort((a,b) => a - b);
    // 没必要循环到最后
    for (let index = 0; (index < nums.length - 2) && (nums[index] <= 0); index++) {
        if (index > 0 && nums[index] === nums[index-1]){
            continue;
        }
        let left = index + 1;
        let right = nums.length - 1;
        while(left < right) {
            // if (nums[left] === nums[left + 1] && left+1 !== right && (2*nums[left] !== -nums[index])) {
            //     left++;
            // } else if (nums[right] === nums[right - 1] && left !== right - 1 && (2*nums[right] !== -nums[index])) {
            //     right--;
            // } else {
            //     let count = nums[left] + nums[right];
            //     if (count == -nums[index]) {
            //         arr.push([nums[index], nums[left], nums[right]]);
            //         left++;
            //         right--;
            //     } else if (count > -nums[index]){
            //         right--;
            //     } else {
            //         left++;
            //     }
            // }
            if (nums[left] + nums[right] == -nums[index]) {
                arr.push([nums[index], nums[left], nums[right]]);
                while(left < right && nums[left] === nums[left + 1]) {
                    left++
                }
                while(left < right && nums[right] === nums[right - 1]) {
                    right--;
                }
                left++;
                right--;
            } else if (nums[left] + nums[right] > -nums[index]){
                right--;
            } else {
                left++;
            }
        }
    }
    return arr;
};
// @lc code=end

