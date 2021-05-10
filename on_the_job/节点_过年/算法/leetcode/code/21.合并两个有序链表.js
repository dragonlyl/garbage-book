/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    if (l1 == null) {
        return l2
    }
    if (l2 == null) {
        return l1;
    }
    let head = new ListNode();
    let p = head;
    while(l1 && l2) {
        if (l1.val >= l2.val) {
            p.next = l2;
            l2 = l2.next;
        } else {
            p.next = l1;
            l1 = l1.next;
        }
        // if (l1.val > l2.val) {
        //     p.next = l2;
        //     l2 = l2.next;
        // } else if (l1.val < l2.val){
        //     p.next = l1;
        //     l1 = l1.next;
        // } else {
        //     p.next = l1;
        //     p = p.next;
        //     p.next = l2;
        //     l1 = l1.next;
        //     l2 = l2.next;
        // }
        p = p.next;

    }
    p.next = l1 ? l1 : l2
    return head.next;
};
// @lc code=end

