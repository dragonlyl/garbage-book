/**
 * 二叉树前序遍历
 * @param {*} root 
 */
function preOrder (root) {
    let arr = []
    let visit = (node) => {
        if(node) {
            arr.push(node.val);
            visit(node.left)
            visit(node.right);
        }
    }
    visit(root);
}

function preOrderNormal (root) {
    let arr = [];
    let visit = [];
    // arr.push(root);
    let current = root;
    // 需要取个标志位
    while (current || arr.length) {
        while (current) {
            // if (current.left) {
            //     arr.push(current.left);
            //     visit.push(current.val);
            //     current = current.left;
            // }
            arr.push(current);
            // 前序塞入的时候 读取值
            visit.push(current.val);
            current = current.left;
        }
        current = arr.pop();
        // if (current.right) {
        //     arr.push(current.right);
        //     visit.push(current.val);
        // }
        current = current.right;
    }
}

function preOrderStack (root) {
    let current = root;
    let arr = [];
    let visit = [];
    arr.push(root);
    // 利用栈先进后出
    while (arr.length) {
        current = arr.pop();
        visit.push(current.val);
        if (current.right) {
            arr.push(current.right);
            // current = current.right;
        }
        if (current.left) {
            arr.push(current.left);
            // current = current.left;
        }

    }
}


/**
 * 二叉树中序遍历
 * @param {*} root 
 */

function inOrderNormal (root) {
    let arr = [];
    let visit = [];
    let current = root;
    visit.push(root.val);
    // 需要取个标志位
    while (current || arr.length) {
        if (current) {
            // visit.push(current.val);
            arr.push(current);
            current = current.left
        }
        // 后续弹出的时候去读取值
        current = arr.pop();
        visit.push(current.val)
        arr.push(current.right);
    }
}

function inOrderStack (root) {
    let current = root;
    let arr = [];
    let visit = [];
    arr.push(root);
   
}

/**
 * 二叉树后续遍历
 * @param {*} root 
 */
 function inorder (root) {
    let arr = []
    let visit = (node) => {
        if(node) {
            arr.push(node.val);
            visit(node.left)
            visit(node.right);
        }
    }
    visit(root);
}


function inorderNormal (root) {
    let arr = [];
    let visit = [];
    // arr.push(root);
    let current = root;
    // 需要取个标志位
    while (current || arr.length) {
        while (current) {
            // if (current.left) {
            //     arr.push(current.left);
            //     visit.push(current.val);
            //     current = current.left;
            // }
            arr.push(current);
            visit.push(current.val);
            current = current.left;
        }
        current = arr.pop();
        // if (current.right) {
        //     arr.push(current.right);
        //     visit.push(current.val);
        // }
        current = current.right;
    }
}

function inorderStack (root) {
    let current = root;
    let arr = [];
    let visit = [];
    arr.push(root);
    // 利用栈先进后出
    while (arr.length) {
        current = arr.pop();
        visit.push(current.val);
        if (current.right) {
            arr.push(current.right);
            // current = current.right;
        }
        if (current.left) {
            arr.push(current.left);
            // current = current.left;
        }

    }
}

