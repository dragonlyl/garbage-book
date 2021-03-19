// 链接 https://zhuanlan.zhihu.com/p/288369976
function mul(a, b) {
    if (Number(a) === 0|| Number(b) === 0) {
        return 0
    }
    let lt1 = a.length;
    let lt2 = b.length;
    let arr = [];
    for (let i = lt1 -1; i >= 0; i--) {
        for (let j = lt2 - 1; j >= 0; j--) {
            let num1 = i + j;
            // 位数越高 数越小
            let num2 = num1 + 1;
            let total = a[i]*b[j] + (arr[num2] || 0);
            arr[num2] = total%10;
            arr[num1] = Math.floor(total/10) + (arr[num1] || 0)
        }        
    }
    // while (pos[0] == 0) { pos.shift();}
    return arr.join('').replace(/^0+/, '');
}
console.log(mul('123', '234'))