const oldArr = Array.prototype;
const ss = Object.create(oldArr);
Object.defineProperty(ss, 'push', {
    value() {
        console.log('test');
        oldArr.push.apply(this,arguments)
    }
})
let obj = {c: []}
obj.c.__proto__ = ss;
obj.c.push('cc')