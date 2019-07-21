var urls = ['url1', 'url2', 'url3'];

function* request(urls) {
    var data;

    for (var i = 0, j = urls.length; i < j; ++i) {
        data = yield req(urls[i], data);
    }
}

var r = request(urls);
r.next();

function log(url, data, cb) {
    setTimeout(function() {
        cb(url);
        // cb(data || url);
    }, 1000);
    
}


function req(url, data) {
    var p = new Promise(function(resolve, reject) {
        log(url, data, function(rs) {
            if (!rs) {
                reject();
            } else {
                resolve(rs);
            }
        });
    });

    p.then(function(data) {
        console.log(data);
        r.next(data);
    }).catch(function() {
        
    });
}


// for...of循环代替.next()

// 除了使用.next()方法遍历迭代器对象外，
// 通过ES6提供的新循环方式for...of也可遍历，
// 但与next不同的是，它会忽略return返回的值
function* showNumbers() {
    yield 1;
    yield 2;
    return 3;
}

var show = showNumbers();

for (var n of show) {
    console.log(n) // 1 2
}

// 此外，处理for...of循环，
// 具有调用迭代器接口的方法方式也可遍历生成器函数，
// 如扩展运算符...的使用
console.log([...show],'...')