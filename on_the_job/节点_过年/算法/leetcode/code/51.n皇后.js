/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N皇后
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
    let dfs = function (n, tmp, res) {
        if (tmp.length === n) {
            res.push(
                tmp.map(i => {
                    let arr = new Array(n).fill('.');
                    arr[i] = 'Q';
                    return arr.join('');
                })
            )
            return
        }
        // 当前的行数
        let row = tmp.length;
        for (let col = 0; col < n; col++) {
            if (canPush(row, tmp, col)) {
                tmp.push(col);
                dfs(n, tmp, res);
                tmp.pop();
            }
        }
        function canPush(row, tmp, col) {
            for (let index = 0; index < row; index++) {
                let y = tmp[index];
                if (y === col || index-y === row-col || index+y === row+col) {
                    return false
                }
            }
            // 不单单是一个左上,是整个斜行
            // if (tmp[row -1] === col - 1 || tmp[row -1] === col + 1) {
            //     return false
            // }
            return true
        }
    }
    let res = [];
    dfs(n, [], res);
    return res;
};
// @lc code=end

