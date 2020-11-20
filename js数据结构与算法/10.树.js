const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUALS: 0
};
function defaultCompare(a, b) {
    if (a === b) {
      return Compare.EQUALS;
    }
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}
class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}
class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn; // 用来比较节点值 
        this.root = null; // {1} Node 类型的根节点
    }
    // 向树中插入一个新的键。
    insert(key) {
        if (this.root == null) {
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key)
        }

    }
    insertNode(node, key) {
        if (node.key > key) {
            if (node.left != null) {
                this.insertNode(node.left, key);
            } else {
                node.left = new Node(key)
            }
        }else {
            if (node.right == null) { // {8}
                node.right = new Node(key); // {9}
            } else {
                this.insertNode(node.right, key); // {10}
            } 
        }
    }
    // 在树中查找一个键。如果节点存在，则返回 true;如果不存在，则返回
    search(key) {

    }
    // 通过中序遍历方式遍历所有节点。
    inOrderTraverse() {
        
    }
    // 通过先序遍历方式遍历所有节点。
    preOrderTraverse() {

    }
    // 通过后序遍历方式遍历所有节点。
    postOrderTraverse() {

    }
    // 返回树中最小的值/键。
    min() {

    }
    // 返回树中最大的值/键。
    max() {

    }
    // 从树中移除某个键。
    remove(key) {

    }
}
let tree = new BinarySearchTree();
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13)