var movingCount = function(m, n, k) {
    let obj = {}
    // ((i + '' + j).split('').reduce((a,b) => +a + +b))
    function test(i,j) {
        if (i<0 || i> n-1 || j>m-1|| j<0 ||value(i) + value(j) >k || obj[i+'-'+j] === 1) return;
        obj[i+'-'+j] = 1;
        test(i+1,j);
        test(i,j+1);
        test(i-1,j);
        test(i,j-1);
    }
    function  value (val) {
        let txt = val.toString();
        let arr = [...txt];

        return arr.reduce((a,b) => Number(a) + Number(b))
    }
    test(0,0);
    return Object.keys(obj).length

};
console.log(movingCount(3,2,7))
'3'.split('').reduce((a,b) => Number(a) + Number(b))
// 建议最好用split (但是最终结果是字符串)
function getSum(num) {
    let answer = 0;

    while(num) {
        answer += num % 10;
        // 向下取整，因为可能出现小数
        num = Math.floor(num / 10);
    }

    return answer;
}