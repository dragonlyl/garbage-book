class Publish{
    constructor() {
        this.list = {}
    }
    on (event, fn) {
        // if (this.list[event]) {
        //     this.list[event].push(fn)
        // } else {
        //     this.list[event] = [];
        //     this.list[event].push(fn)
        // }
        // (this.list[event] ? this.list[event] : []).push(fn)
        (this.list[event] || (this.list[event] = [])).push(fn)
    }
    emit () {
        // console.log(event, 'event');
        // let arg = [].slice.call(arguments)
        let event = [].shift.call(arguments);
        if (this.list[event]) {
            let fns = this.list[event];
            fns.forEach(fn => {
                fn.apply(this, arguments)
            });
        }
    }
    // 添加解绑事件
    off(event, fn) {
        if (!this.list[event]) return;
        if (!fn) {
            this.list[event] = [];
        } else {
            let fns = this.list[event];
            let index = fns.findIndex(cb => cb === fn );
            this.list[event].splice(index, 1);
        }
    }
}
let eventTest = new Publish();
eventTest.on('test', (val) => {
    console.log('订阅1' + val)
});
eventTest.on('test', (val) => {
    console.log('订阅2' + val)
});
eventTest.on('test2', (val) => {
    console.log('订阅1' + val)
})
eventTest.emit('test', '测试测试')
// 无订阅的内容 不会有显示
eventTest.emit('test3', '测试测试')
// 解绑
eventTest.off('test', (val) => {
    console.log('订阅1' + val)
})
eventTest.emit('test', '测试测试')