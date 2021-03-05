let arr = [3,5,3,2,6,7,1]
// 冒泡排序
let bubble = function (arr) {
    let finish;
    for (let i = 0; i < arr.length; i++) {
        finish = true;
        for (let j = arr.length - 1 ; j >= i; j--) {
            if (arr[j] > arr[j+1]) {
                [arr[j+1], arr[j]] = [arr[j], arr[j+1]];
                finish = false
            }
        }
        if (finish) return arr
    }
}
// 选择排序 (冒泡排序衍生版本，从左到右，找到最小元素替换)
let select = function (arr) {
    let len = arr.length;
    let min, min_idx;
    for(let i = 0; i < len - 1; i++) {
        min = arr[i];
        for(let j = i + 1; j <len; j++) {
            if (min > arr[j]) {
                min = arr[j];
                min_idx = j;
            }
        }
        if (min !== arr[i]) {
            [arr[min_idx], arr[i]] = [arr[i], arr[min_idx]]
        }
    }
}
// 左边有序，右边无序， 直到推到最后一个位置
let insert = function (arr) {
    let len = arr.length;
    for (let i = 1; i < len; i++) {
        let i_idx = 0
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[i]) {
                i_idx = j;
                break;
            }
        }
        for(let j = i; j > i_idx; j--) {
            [arr[j], arr[j-1]] = [arr[j-1], arr[j]]
        }
    }
}
// 快速排序 （不稳定）http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html

let quickSort = function (arr) {
    if (arr.length <= 1) {return arr};
    let mid = Math.floor(arr.length / 2);
    // arr.splice(mid, 1)返回的数组，去第一个元素就好（就一个元素）
    let pivot = arr.splice(mid, 1)[0];
    let left = [];
    let right = [];
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i])
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}
 