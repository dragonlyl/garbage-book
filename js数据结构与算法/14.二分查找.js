/*
 * @Author: your name
 * @Date: 2020-11-09 09:30:41
 * @LastEditTime: 2020-11-09 09:43:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \garbage-book\js数据结构与算法\14.二分查找.js
 */
const Compare = {
    LESS_THEN: -1,
    BIGGER_THAN: 1,
    EQUAL: 0
}
function defaultCompare(a,b) {
    if (a === b){
        return 0
    } else if(a > b) {
        return 1
    } else {
        -1
    }
}

function binarySearchRecursive(array, value, low, high, compareFn = defaultCompare) {
    if (low <= high) {
        // floor
        let mid = Math.floor((low +high)/2)
        let element = array[mid];
        // 当前值比要查找的值小找右边
        if(compareFn(element, value) === Compare.LESS_THEN) {
            return binarySearchRecursive(array, value, mid+1, high,compareFn)
        } else if (compareFn(element, value) === Compare.BIGGER_THAN) {
            return binarySearchRecursive(array, value, low, mid-1,compareFn)
        } else {
            return mid
        }
    }
    return undefined;
}
function binarySearchRecursive(array, value, low, high, compareFn = defaultCompare) {
    // 这里做其他处理
    // 但感觉这里并不需要
    return binarySearchRecursive(array, value, low, high, compareFn);
}