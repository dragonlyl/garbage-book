function deepClone(source) {
    let targetObj = source.constructor === Array ? [] : {};
    for (const key in source) {
        if (source.hasOwnProperty(key)) {
            if(source[key] && typeof source[key] === 'object') {
                targetObj[key] = source.constructor === Array ? [] : {};
                targetObj[key] = deepClone(source[key]);
            } else {
                targetObj[key] = source[key];
            }
        }
    }
    return targetObj;
};
let obj = {
    name: 'jack',
    arr: [1, 2, {name: 'sss'}],
    obj: {
        name: 'aa',
        arr1: [
            2, 3, 4, 5
        ]
    }
};
console.log(deepClone(obj));