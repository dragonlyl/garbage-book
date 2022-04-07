new Promise((resolve, reject) => {
    // pending -> fulfilled
    const obj = {
      then: function(resolve, reject) {
        // resolve("resolve message")
        reject("reject message")
      }
    }
    resolve(obj)
  }).then(res => {
    console.log("res:", res)
  }, err => {
    console.log("err:", err)
  })

  const promise = new Promise((resolve, reject) => {
    resolve("zh")
  })
  // 1> 如果我们返回的是一个普通值(数值/字符串/普通对象/undefined), 那么这个普通的值被作为一个新的Promise的resolve值
  promise.then(res => {
    return "aaaaaa" // => return new Promise((resolve,reject) => {resolve("aaaaaa")})
  }).then(res => {
    console.log("res:", res)
  })

  promise.then(res => {
    return new Promise((resolve, reject) => { // => return new Promise((resolve,reject) => {resolve("return的表达式")})
      setTimeout(() => {
        resolve(111111)
      }, 1000)
    })
  }).then(res => {
    console.log("res:", res)
  })

  
  new Promise(function (resolve) {
    console.log("promise1");
    resolve();
  }).then(function () {
    console.log("then1");
  });

  setTimeout(function () {
    console.log("setTimeout2");
  });

  console.log(2);
