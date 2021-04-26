function test() {
    let arr = [];
    function tst (fn) {
        return new Promise((resolve, reject) => {
            // resolve(fn())
            fn(resolve, reject);
        })
    }
    for(let i = 0; i < arguments.length; i++) {
        arr.push(tst(arguments[i]))
    }
    return Promise.all(arr)
}