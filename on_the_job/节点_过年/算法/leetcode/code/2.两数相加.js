/*
 * @lc app=leetcode.cn id=2 lang=javascript
 *
 * [2] 两数相加
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    let header = new ListNode();
    let p = header;
    let k = 0;
    while(l1 || l2 || k) {
        let current  = (l1 ? l1.val : 0) + (l2 ? l2.val : 0) + k;
        k = 0;
        if (current >=10) {
            k++;
            current -= 10;
        };
        if (l1) {
            l1 = l1.next;
        }
        if (l2) {
            l2 = l2.next;
        }
        p.next = new ListNode(current);
        p = p.next;
    }
    return header.next;
};
// @lc code=end

