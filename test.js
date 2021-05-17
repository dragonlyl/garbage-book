
let index = 0;
function test (res, delay) {
    let _index = index + 1;
    index++ ;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (_index === index) {
                resolve(res);
            } else {
                // reject(new Error('数据有问题'));
                resolve('err')
            }
        }, delay)
    })
}


let handle = (res) => {
    if (res === 'err') {
        console.log('不处理')
    } else {
        console.log(res);
    }
}
test(1, 1000).then(handle);
test(2, 50).then(handle);

function myCreate(){
    let O = [].shift(arguments);
    let obj = Object.create(O.prototype);
    // obj.__proto__ = O.prototype

    let ret = O.apply(obj, arguments);
    return ret instanceof Object ? ret : obj;
}


function MyArray() {
    Array.call(this);
}
MyArray.prototype = Object.create(Array.prototype, {
    constructor: {
        value: MyArray,
        writable: true,
        configurable: true
    }
})
let my = new MyArray();
let her = new Array();
my[0] = 'aa'
her[0] = 'bb';
console.log(my, her);
// length 是在Array实例上有的特性
console.log(my.length, her.length)

class MyArray1 extends Array {
    constructor() {
        super();
    }
}
let my1 = new MyArray1();
my1[0] = 'aa'
console.log(my1);
// length 是在Array实例上有的特性
console.log(my1.length)