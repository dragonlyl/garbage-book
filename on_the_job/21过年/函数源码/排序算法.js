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
 
let quickSort1 = function (arr) {
    let mid = Math.floor(arr.length /2)
    let pivot =  arr[mid]
    let left = []
    let right = []
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if(i === mid){
            continue
        }
        if (element < pivot) {
            left.push(element)
        } else {
            right.push(element)
        }
    }
    return quickSort(left).concat(pivot, quickSort(right))

}

// 归并排序 合并排序 (二叉树后序遍历)
// 每次按照数组一半分,直到分成一项或者空项
// [排序算法](https://javascript.ruanyifeng.com/library/sorting.html#toc9)

function merge(left, right){
    var result  = [],
        il      = 0,
        ir      = 0;

    while (il < left.length && ir < right.length){
        if (left[il] < right[ir]){
            result.push(left[il++]);
        } else {
            result.push(right[ir++]);
        }
    }

    return result.concat(left.slice(il)).concat(right.slice(ir));
}

function mergeSort(myArray){

    if (myArray.length < 2) {
        return myArray;
    }

    var middle = Math.floor(myArray.length / 2),
        left    = myArray.slice(0, middle),
        right   = myArray.slice(middle);
        params = merge1(mergeSort(left), mergeSort(right));
    
    // 在返回的数组头部，添加两个元素，第一个是0，第二个是返回的数组长度
    params.unshift(0, myArray.length);
	// splice用来替换数组元素，它接受多个参数，
	// 第一个是开始替换的位置，第二个是需要替换的个数，后面就是所有新加入的元素。
	// 因为splice不接受数组作为参数，所以采用apply的写法。
	// 这一句的意思就是原来的myArray数组替换成排序后的myArray
    Array.prototype.splice.apply(myArray, params);
	// 返回排序后的数组
    return myArray;
}


function merge(nums, left, mid,  right) {
    let result = []
    let il = left, ir = mid + 1
    while(il <= mid && ir <= right) {
        if (nums[il] < nums[ir]) {
            result.push(nums[il++])
        } else {
            result.push(nums[ir++])
        }
    }
    while(il <= mid) {
        result.push(nums[il++])
    }
    while(ir <= right) {
        result.push(nums[ir++])
    }
    return nums.splice.apply(nums, [0, result.length, ...result])
}
function mergeSort(nums, left, right) {
    if (left >= right) {
        return nums
    }
    let mid = Math.floor((left + right) / 2)
    mergeSort(nums, left, mid)
    mergeSort(nums, mid + 1, right)
    return merge(nums, left, mid, right)
   
}