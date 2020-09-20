var a = { x:1 }
Object.defineProperty( a , 'x' , {
    get ( ){
        return this.tmp
    },
    set ( val ){
        val > 0 ? this.tmp = val : this.tmp = 0
    }
})
a.x = 5 ;
console.log( a.x )  // 5
a.x = -5 ;
console.log( a.x ) // 0
console.log(Object.getOwnPropertyDescriptor(a, 'x'));
// 借助的tmp也会被枚举出来,可以通过下面来清除
Object.defineProperty(a, 'tmp', {
    enumerable: false
})
for (const key in a) {
    if (a.hasOwnProperty(key)) {
        console.log(key)        
    }
}
/**
 * 
 * 打印出的内容如下
 * {
        get: [Function: get],
        set: [Function: set],
        enumerable: true,
        configurable: true
  }
  value 属性和 get 方法不能同时存在所以原本是value的变成get和set了
 */

