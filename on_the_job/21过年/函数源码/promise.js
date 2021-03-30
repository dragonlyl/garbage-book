
// 手写promise

// class 传入的入参函数的this指向问题??

class MyPromise {
    constructor(fn) {
        // 最终的值需要通过 .then来获取到
        this.val = ''
        this.reason = ''
        this.status = 'pending'
        let self = this;
        function resolve (res) {
            if (self.status === 'pending') {
                self.status = 'success';
                self.val = res;
            }
        }
        function reject(err) {
            if (self.status === 'pending') {
                self.status = 'error'
                self.reason = err;
            }
        }
        try {
            fn(resolve, reject)
          } catch (err) {
            reject(err);
          }
    }
    // 同步
    then(fill = () => {}, fail=() => {}) {
        if(this.status === 'success') {
            fill(this.val)
        }
        if (this.status === 'error') {
            fail(this.reason)
        }
    }
}
new Promise ((resolve, reject) => {
    resolve(3)
}).then(res => {console.log(res, 'res')});
let b = new MyPromise((resolve, reject) => {
    resolve(3)
})
b.then(res => {
    console.log(res, 'then1')
})
new MyPromise((resolve, reject) => {
    console.log('before reject')
    reject('reject error')
}).then(res => {
    console.log(res ,'success')
}, error => {
    console.log(error, 'error')
})
  