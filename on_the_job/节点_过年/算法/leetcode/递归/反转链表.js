/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
// 反转链表(全部)
var reverseList = function(head) {
    // 递归
    // if (head.next === null || head === null) return head;
    // let end = reverseList(head.next)
    // head.next.next = head ;
    // head.next = null;
    // return end;
    // 指针
    // if (head === null) return head;
    // let p = head;
    // let q = head.next;
    // p.next = null;
    // while (q !== null) {
    //     let t = q.next;
    //     q.next = p;
    //     p = q;
    //     q = t;
    // }
    // return p;
    // 优化指针
    let p = null;
    let q = head;
    while(q !== null) {
        let t = q.next;
        q.next = p;
        p = q;
        q = t;
    }
    return p;

};
// 反转部分 前N个

// if (head.next === null || head === null) return head;
if (n === 1) 返回判断
let end = reverseList(head.next, n-1)
head.next.next = head ;
head.next = null;
return end;