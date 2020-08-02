// 创建链表
function ListNode(val, next = null) {
    this.val = val;
    this.next = next;
}

// 将数组变成链表
const getListFromArray = (a) => {
    // 链表头
    let header = new ListNode();
    // 指针 当前指向链表头
    let pre = header;
    a.forEach(i => pre = pre.next = new ListNode(i));
    console.log(header.next);
    return header.next;
}
// let arr = [1,3,5];
// getListFromArray(arr);

// 链表转换为数组

const getArrayFromList = (node) => {
    let arr = [];
    while(node) {
        arr.push(node.val);
        node = node.next;
    }
    return arr;
}