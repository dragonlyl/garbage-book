/*
 * @lc app=leetcode.cn id=20 lang=javascript
 *
 * [20] 有效的括号
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
// let s = '()'
var isValid = function(s) {
    let map = {
        '{' : '}',
        '(' : ')',
        '[' : ']'
    };
    let length = s.length
    if (length%2) return false;
    let arr = [];
    for (let i = 0; i < length; i++) {
        if (map[s.charAt(i)]) {
            arr.push(map[s.charAt(i)])
        } else {
            if (arr.length === 0) {
                return false;
            }
            if (arr[arr.length -1] === s.charAt(i)) {
                arr.pop();
            } else {
                return false;
            }
        }
        
    }
    if (arr.length) {
        return false
    }
    return true;
};
// isValid(s);
// @lc code=end

