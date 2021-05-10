/*
 * @lc app=leetcode.cn id=235 lang=javascript
 *
 * [235] 二叉搜索树的最近公共祖先
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    if (root === null) {
        return null;
    }
    let dfs = (root, p ,q) => {
        if (root === null) {
            return null;
        }
        if (root.val === p || root.val === q) {
            return root
        }
        let left = dfs(root.left, p, q)
        let right = dfs(root.right, p, q)
        if (left && right) {
            return root
        }
        if (left) {
            return left
        }
        if (right) {
            return right
        }
    }
    return dfs(root, p, q);
    
};
// @lc code=end

