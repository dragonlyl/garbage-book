/*
 * @lc app=leetcode.cn id=26 lang=javascript
 *
 * [26] 删除排序数组中的重复项
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    //暴力
    // let last = nums[nums.length - 1];
    // for (let i = nums.length - 2; i >= 0; i--) {
    //     if (nums[i] === last) {
    //         nums.splice(i, 1);
    //     } else {
    //         last = nums[i]
    //     }
    // }
    // 双指针
    let p = 0;let q = 1;
    while(q < nums.length) {
        if (nums[p] !== nums[q] ) {
            p++;
            // if (q-p > 1) {
            //     nums[p + 1] = nums[q];
            // }
            if (q != p) {
                nums[p] = nums[q];
            }
        }
        q++;
    }
    return p+1;
};
// @lc code=end

