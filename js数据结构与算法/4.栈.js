const _items = Symbol('stackItem');
class Stack {
    constructor() {
        this.items = [];
        this[_items] = []
        // 新添一个count
        this.count = 0;
    }
    // 向栈添加元素
    push(el) {
        // this.items.push(el);
        this.items[this.count] = el;
        this.count++;
    }
    // 从栈移除元素
    pop() {
        // return this.items.pop();
        if(this.isEmpty()) {
            return undefined;
        }
        this.count--;
        const result = this.items[this.count];
        delete this.items[this.count];
        return result;
    }
    // 查看栈顶元素
    peek () {
        // return this.items[this.items.length - 1];
        if (this.isEmpty) {
            return undefined;
        }
        return this.items[this.count - 1];
    }
    // 检查栈是否为空
    isEmpty() {
        // return this.items.length === 0;
        return this.count === 0;
    }
    // 长度
    size() {
        // return this.items.length;  
        return this.count;
    }
    // 清空栈元素
    clear() {
        this.items =  []
        this.count = 0;
    }
    toString() {
        if (this.isEmpty()) { return ''; }
        let objString = `${this.items[0]}`; // {1}
        for (let i = 1; i < this.count; i++) { // {2}
            objString = `${objString},${this.items[i]}`; // {3}
        }
        return objString;
    }
}
// const stack = new Stack();
// console.log(stack.isEmpty());
// // 还是可以拿到 Symbol对象
// console.log(Object.getOwnPropertySymbols(stack));

// node不支持es6的import方法
// export default new Stack();
module.exports = new Stack();