// 链接 https://zhuanlan.zhihu.com/p/72179476
// 转换成字符串
function add (x, y) {
    let str1 = x.toString();
    let str2 = y.toString();
    // let lengthW = str1.length - str2.length;
    // if (lengthW < 0) {
    //     a = a.padStart(str2.length, 0)
    let maxLength = Math.max(str1.length, str2.length);
    x = x.padStart(maxLength, 0);
    y = y.padStart(maxLength, 0);
    let sum = '';
    let more = 0;
    for (let index = maxLength -1; index >= 0; index--) {
        let cur = parseInt(x[index]) + parseInt(y[index]) + more;
        more = cur >= 10 ? 1 : 0;
        sum = cur%10 + sum;
    }
    if (more === 1) {
        sum = '1' + sum;
    }
    return sum;
}
let a = "9007199254740991";
let b = "1234567899999999999";
console.log(add(a, b));
