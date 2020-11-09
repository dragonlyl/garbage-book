const { push } = require("./4.栈");

class Node{
    constructor(element){
        this.element = element;
        this.next = undefined;
    }
}
class LinkedList {
    constructor() {
        this.count = 0;
        this.head = undefined;
        this.equalsFn = function defaultEquals(a, b) {
            return a === b;
        }
    }
    // 尾部插入
    push(element) {
        const node = new Node(element);
        // != null 等价于 !==undefined && !== null
        if (this.head == null) {
            this.head = node
        } else {
            let current = this.head;
            while(current.next != null) {
                current = current.next;
            }
            current.next = node
        }
        this.count++;
    }
    // 具体某个位置插入
    insert(element, position) {
    
    }
    // 返回链表中特定位置的元素
    getElementAt(index) {
        if (index >= 0 && index <= this.count) { // {1}
            let node = this.head; // {2}
            for (let i = 0; i < index && node != null; i++) { // {3}
                node = node.next;
            }
            return node; // {4}
        }
        return undefined; // {5}
    }
    remove(element) {
    
    }
    // 返回索引
    indexOf(element) {
    
    }
    // 从链表的特定位置移除一个元素。
    removeAt(index) {
        if (index >= this.count || index < 0) {
            return undefined;
        }
        let current = this.head;
        if(index === 0) {
            this.head = current.next;
        } else {
            let previous ;
            for (let i = 0; i < index; i++) {
                previous = current;
                current = current.next;
            }
            previous.next = current.next;
        }
        this.count--;
        return current.element;
    }
    isEmpty(){
    
    }
    toString() {
    
    }
}
const list = new LinkedList();
list.push(33);
list.push(44)
list.removeAt(1)
console.log(list, 'list');

// 双向链表 节点结构
class DoublyNode extends Node { // {1}
    constructor(element, next, prev) {
        super(element, next); // {2}
        this.prev = prev; // {3} 新增的
    }
}
class DoublyLinkedList extends LinkedList { // {4}
constructor(equalsFn = defaultEquals) {
    super(equalsFn); // {5}
        // 对最后一个节点的引用
        this.tail = undefined; // {6} 新增的 
    }
}
