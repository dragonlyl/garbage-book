class Queue {
    constructor() {
        this.count = 0; // {1}
        this.lowestCount = 0; // {2}
        this.items = {}; // {3}
    }
    // :向队列尾部添加一个(或多个)新的项。
    enqueue(el) {
        this.items[this.count] = el;
        this.count++;
    }
    // :移除队列的第一项(即排在队列最前面的项)并返回被移除的元素。
    dequeue() {
        if (this.isEmpty()) {
            return undefined;
        }
        const result = this.items[this.lowestCount];
        delete this.items[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    // :返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做
    peek() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.items[this.lowestCount];
    }
    // :如果队列中不包含任何元素，返回 true，否则返回 false。
    isEmpty() {
        return this.size() === 0;
    }
    // :返回队列包含的元素个数，与数组的 length 属性类似。
    size() {
        return this.count - this.lowestCount;
    }
    clear() {
        this.items = {};
        this.count = 0;
        this.lowestCount = 0;
    }

    toString() {
        if (this.isEmpty()) {
            return '';
        }
        let objString = `${this.items[this.lowestCount]}`;
        for (let i = this.lowestCount + 1; i < this.count; i++) {
            objString = `${objString},${this.items[i]}`;
        }
        return objString;
    }
    // 插一个双端队列的 插入前端口
    addFront(el) {
        // 判断是否 lowestCount为0 ,为零的话要集体向后移
        if (this.isEmpty()) {
            this.addBack(el); // 全为空类似后插
        } else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.items[this.lowestCount] = el
        } else {
            for (let i = this.count; i > 0; i--) {
                this.items[i] = this.items[i -1];
            }
            this.count++;
            this.lowestCount = 0;
            this.items[0] = el;
        }
    }
}

const queue = new Queue();
module.exports = new Queue()
console.log(queue.isEmpty());
queue.enqueue('tix');
queue.enqueue('bob');
console.log(queue.toString());
queue.dequeue();
console.log(queue.toString());

// 双端前端插入元素
queue.addFront('777');
console.log(queue.toString());