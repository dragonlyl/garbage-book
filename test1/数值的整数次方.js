/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
var myPow = function(x, n) {
    if (n === 0) {
        return 1
    }
    if (n === 1) {
        return x;
    }
    if (n < 0) {
        x = 1/x;
        n = -n;
    }
    let val = x
    let other = 1;
    let pow = n
    while(n != 1) {
        if (n & 1) {
            other *= val;
            n -=1;    
        }
        pow = n / 2

        if (pow >= 1) {
            n = pow
            val *= val;
            
        }
    }
    return val*other
};