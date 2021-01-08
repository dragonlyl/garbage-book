/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 */

const { auto } = require("async");
const cons = require("consolidate");

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function(coins, amount) {
    let max = Number.MAX_VALUE;
    let arr = new Array(amount+1).fill(max);
    // let arr = []
    arr[0] = 0;
    // let dp = (n) => {
    for (let index = 1; index <= amount; index++) {
        for (const coin of coins) {
            if(index - coin >= 0) {
                arr[index] = Math.min(arr[index], 1 + arr[index - coin])
            }
        }
    }
    // }
    return arr[amount] === max ? -1: arr[amount]
};
// @lc code=end
