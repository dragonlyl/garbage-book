/**
 * 0-1背包问题: 物品要么装要么不装,不能切成两半
 * 给你W的背包和N个物品, 每个物品都有各自的重量和价值, 
 * 其中wt表示重量,val表示价值
 * wt 和val
 * 
 */
let wt = [2,1,3]
let val = [4,2,3]
function bag(N=3, W) {
    let dp = Array.from(Array(N + 1), () => Array(W + 1).fill(0))
    // 所有的物品
    for (let i = 1; i <= N; i++) {
        // 从零遍历到W
        for (let j = 0; j <= W; j++) {
            // 放不下
            if(j - wt[i-1] < 0) {
                dp[i][j] = dp[i-1][j]
            } else {
                dp[i][j] = Math.max(dp[i-1][j],dp[i-1][j-wt[i-1]] + val[i-1])
            }
            
        }
    }
    return dp[N][W]
}
console.log(bag(3, 4))