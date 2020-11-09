/*
 * @lc app=leetcode.cn id=36 lang=javascript
 *
 * [36] 有效的数独
 */

// @lc code=start
/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
    // 0 -8
    function getIndex(row, col) {
        return 3* Math.floor(row/ 3) + Math.floor(col /3);
    }
    let aCol = {};
    let aRow = {};
    let aIndex = {}
    for (let index = 0; index < board.length; index++) {
        for (let inner = 0; inner < board[index].length; inner++) {
            let current = board[index][inner]
            if (current != '.') {
                let area = getIndex(index,inner);
                if(aCol[index+'-'+ current] || aRow[inner+'-'+current] || aIndex[area+'-'+current]){
                    return false
                } else {
                    aCol[index+'-'+ current] = 1;
                    aRow[inner+'-'+current] = 1;
                    aIndex[area+'-'+current] = 1;
                }
            }
        }
    }
    return true;
};
// @lc code=end

