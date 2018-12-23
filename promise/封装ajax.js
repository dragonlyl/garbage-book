function get(url,cb) {
    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
        cb(xhr.responseText)
    }
    xhr.open('get',url,true)
    xhr.send(null)
}
get('data.json',(data)=>{
    console.log(data)
})
function get(url) {
    return new Promise(function (resolve,reject) {
        var xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            resolve(xhr.responseText)
        }
        xhr.onerror = function (err) {
            reject(err)
        }
        xhr.open('get',url,true)
        xhr.send(null);
    })
}
get('data.json').then(res=>{
    console.log(res)
})