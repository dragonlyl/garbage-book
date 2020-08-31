/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {
    if (!root) return 0;
    let arr = [];
    let height = 1;
    arr.push(root);
    while(arr.length) {
        let length = arr.length;
        for (let i = 0; i < length; i++) {
            let cur = arr.shift();
            if (cur.left == null && cur.right == null) {
                return height;
            }
            if (cur.left) {
                arr.push(cur.left)
            }
            if(cur.right) {
                arr.push(cur.right)
            }
        }
        height++;
    }
    return height;
};
// @lc code=end

