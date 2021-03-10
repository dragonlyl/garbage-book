// 被测试对象
let add = (a,b)=>a+b
 
// 测试代码
let expect = (res)=>{
    return {
        toBe:(actual)=>{
            if(res !== actual){
                throw new Error('期望值与预期值不符')
            }
        }
    }
}

let test = (desc,fn)=>{
    try{
        fn()
    }
    catch(e){
        console.log(`${desc}没有通过`)
    }
}
test("加法测试", () => { expect(add(1,2)).toBe(4) } )