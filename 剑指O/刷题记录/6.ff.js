/**
 * 从尾到头打印链表
 * 
 * 输入一个链表的头结点，从尾到头反过来打印出每个结点的值}
 */

function reverseLink (head) {
    // if (head.next == null) {
    //     return head
    // } else {
    //     reverseLink(head.next).next = head;
    // }
    if (head === null || head.next === null) {
        return head
    }
    // 最后一次 p 是head节点
    let p = reverseLink(head.next);
    return p

}