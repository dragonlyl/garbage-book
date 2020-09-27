// import stack from './栈.js';
const stack  = require('./4.栈.js')
function decimalToBinary (decNumber) {
    let rem;
    let number = decNumber;
    let binaryString = '';
    while(number > 0) {
        rem = number % 2;
        stack.push(rem);
        // 需要使用Math.floor
        number = Math.floor(number /2)
    }
    while(!stack.isEmpty()) {
        binaryString += stack.pop().toString();
    }
    return binaryString
}
console.log(decimalToBinary(10));
// // 代码还可以扩展,例如其他进制
// if(base >= 2 && base <= 32) {
//     return ''
// }
// // 找对应值
// let digits = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // {6}
// digits[stack.pop()];