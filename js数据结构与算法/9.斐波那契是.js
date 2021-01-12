// 记忆
function fibonacci(n){
    // if (n === 0) return 0;
    // if (n === 1)return 1;
    // return fibonacci(n-1) + fibonacci(n-2)
    let arr = [0,1];
    const fn = (n) => {
        if (arr[n] != null) return arr[n];
        return arr[n] = fn(n-1) + fn(n-2)
    }
    return fn(n)
}
console.log(fibonacci(45))
