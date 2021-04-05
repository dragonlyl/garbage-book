

const curry = (fn) => {
    let params = [];
    const next = (...args) => {
        params = [...params, ...args];
        if (params.length < fn.length) {
            return next;
        } else {
            return fn.apply(fn, params);
        }
    }
    return next;
}
const add = (a, b, c) => {
    return a+ b+ c;
}
const fn = curry(add);
const res = fn(1)(2)(3)
console.log(res, curry(add(1,2,3)),'res');