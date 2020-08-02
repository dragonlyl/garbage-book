function test(x, n) {
    let result = 1;
    while(n) {
        if (n & 1) result *= x;
        x = x * x;
        n >>= 1;
    }
    return result;
}
console.log(test(2,3));