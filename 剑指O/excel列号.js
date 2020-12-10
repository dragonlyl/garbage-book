// 用A表示第一列，用B表示第二列。。。。用Z表示第26列，用AA表示第27列。。。请写出一个函数，输入用字母表示的列号编码，输出它是第几列。
function CharToNum(str) {
    // 非 符号 高于 比较符, 要加括号
    let num = 0
    for (let index = 0; index < str.length; index++) {
        // if (!(str[index] <= 9)) {
        //     num += str.charCodeAt(index) - 'A'.charCodeAt() + 10
        // } else {
        //     num += Number(str[index])
        // }
        let val = str.charCodeAt(index) - 'A'.charCodeAt() + 1;
        if (str.length === index + 1) {
            num += val
        }else {
            num += Math.pow(26, str.length - index - 1)*val
        }
    }
    return num;
}
let str = 'AZZ'
console.log(CharToNum(str))