 function test(content,done) {
    this.content = content
    setTimeout(() => {
        let b = 2;
        done(b)
    }, 10);
}
var Done = function (res) {
    console.log(res)
}
test(123,Done)
//上面的 Done 和 test可以合并成下面的代码
// test(123,(res)=>
//     console.log(res)
// )
function test2(content, done) {
    this.content = content
    setTimeout(() => {
        let b = 2;
        if (b != content) {
            return done('error')
        }
        done('', 'success 为'+this.content)
    }, 10);
}
test2(2,(err,data)=>{
    if(err){
        console.log('传入的数据不等于里面的数据');

    }else{
        console.log(data)
    }
})
test2(3,(err,data)=>{
    if (err) {
        console.log('传入的数据不等于里面的数据');

    } else {
        console.log(data)
    }
})