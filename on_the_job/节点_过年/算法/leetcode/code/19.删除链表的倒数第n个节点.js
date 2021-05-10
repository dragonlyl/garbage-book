/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第N个节点
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
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let p = head;
    let q = head;
    // for (let i = 0; i < n; i++) {
    //     p = p.next;        
    // }
    while(n--) {
        p = p.next;
    }
    if (!(p && p.next)) {
        return head.next;
    }
    while(p && p.next) {
        p = p.next;
        q = q.next;
    }
    console.log(p, 'p')
    console.log(q, 'q')
    if (q.next.next) {
        q.next = q.next.next;
    } else {
        q.next = null;
    }
    return head
};
// @lc code=end

