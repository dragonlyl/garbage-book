let obj = {a: 1};
let proxyObj = new Proxy(obj, {
    get: (target, key ,receiver) => {
        console.log(`getting ${key}`);
        return target[key];
    },
    set: (target, key, value ,receiver) => {
        console.log(target, key,value, receiver)
        return target[key] = value;
    }
})
proxyObj.val = 1;
proxyObj.val