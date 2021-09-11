/**
 * 找出数组中重复的数
 *
 * 长度为n, 数字都在 0~n-1 的范围内,数组中某些数字是重复的,找出任意一个重复的数字.
 * {2,3,1,0,2,5,3} 输出 2或者3
 */
function findRepeat(arr) {
    for (var i = 0; i < arr.length; i++) {
        var num = arr[i];
        while (arr[i] !== i) {
            if (arr[num] === num) {
                return num;
            }
            var temp = arr[num];
            arr[num] = num;
            num = temp;
        }
    }
    return null;
}
console.log(findRepeat([4, 3, 1, 0, 2, 5, 3]));
// 解法一: 声明个对象,里面存储对应关系 空间n
// 解法二: 交换 (上面的demo) 需要考虑:1.给的值超出边界 2.无重复值
// 解法三: 一的优化

function findRepeat1(arr) {
    let set = new Set();
    for (let i of arr) {
        if (set.has(i)) return i;
        set.add(i);
    }
}
console.log(findRepeat1([4, 3, 1, 0, 2, 5, 3]))
