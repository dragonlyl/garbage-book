/**
 * 二维数组中的查找
 * 
 * 题目:在一个二维数组中，
 * 每一行都按照从左到右递增的顺序排序，
 * 每一列都按照从上到下递增的顺序排序。
 * 请完成一个函数，输入这样的一价二维数组和一个整数，判断数组中是否含有该整数。
 */
let array = [
    [1,   4,  7, 11, 15],
    [2,   5,  8, 12, 19],
    [3,   6,  9, 16, 22],
    [10, 13, 14, 17, 24],
    [18, 21, 23, 26, 30]
  ]
let array1 = [
    [1,2,3,4,5],
    [6,7,8,9,10],
    [11,12,13,14,15],
    [16,17,18,19,20],
    [21,22,23,24,25]
]
// 错误代码, 两个while循环应该联立起来
var findNumberIn2DArray1 = function(matrix, target) {
    let i = matrix.length // 行数
    if (i === 0) return false
    let j = matrix[0].length // 列数
    while(matrix[0][j -1] > target) {
        --j
        if (j <= 0) return false
    }
    if (matrix[0][j -1] === target) return true
    let t = 0;
    while(matrix[t][j-1] < target ) {
        ++t;
        if (t >= i) return false
    }
    if (matrix[t][j-1] === target) return true
    return false
};
var findNumberIn2DArray = function(matrix, target) {
    let i = matrix.length - 1 // 行数
    if (i === -1) return false
    let j = matrix[0].length - 1 // 列数
    let t = 0; 
    while (j >= 0 && t <= i) {
        if (matrix[t][j] === target) return true;
        if (matrix[t][j] > target) {
            --j
        } else {
            ++t;
        }
    }
    return false
};

console.log(findNumberIn2DArray(array, 20))

// 思路: 缩小搜索范围
// 解题1: 从右上角开始
// 解题2: 从左下角开始