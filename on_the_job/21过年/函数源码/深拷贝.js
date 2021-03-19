function deepClone(source) {
    let target = source.constructor === Array ? [] : {}
    for (const key in source) {
        if (Object.hasOwnProperty.call(source, key)) {
            if (typeof source[key] === 'object') {
                target[key] = source[key].constructor === Array ? []:{}
                target[key] = deepClone(source[key])
            } else {
                target[key] = source[key]
            }
            
        }
    }
    return target
}
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