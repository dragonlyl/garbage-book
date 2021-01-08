/**
 * 区间调度问题
 * 多组封闭的区间,设计算出这些区间有几组互不相交的区间
 * 
 */
let intvs = [[1, 3], [2, 4], [3, 6]];
function area() {
    if (intvs.length <= 1) {
        return 1;
    }
    intvs.sort((a,b) => a[1] - b[1])
    let end = intvs[0][1];
    let count = 1;
    for (const item of intvs) {
        // item的end肯定大于 第一个的end,所以只要item的star大于他就是在他之后了
        if (item[0] >= end) {
            count++;
            end = item[1]
        }
    }
    return count;
}
console.log(area());