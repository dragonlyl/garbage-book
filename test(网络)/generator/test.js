// https://www.cnblogs.com/imwtr/p/5913294.html

// 在异步编程中，还有一种常用的解决方案，它就是Generator生成器函数。
//顾名思义，它是一个生成器，它也是一个状态机，内部拥有值及相关的状态，
//生成器返回一个迭代器Iterator对象，我们可以通过这个迭代器，
//手动地遍历相关的值、状态，保证正确的执行顺序。
function* greeter() {
    yield 'Hi';
    yield 'How are you?';
    yield 'Bye';
  }
  const greet = greeter();
  // 执行 greet.next 会返回一个对象 里面有 value 和 done
  // done输出当前状态(迭代器是否遍历完成) value (相应的值)
  // return 完成之后 ,就退出了生成器函数, 后续还有yield操作也不会执行
  console.log(greet.next().value);
  // 'Hi'
  console.log(greet.next().value);
  // 'How are you?'
  console.log(greet.next().value);
  // 'Bye'
  console.log(greet.next().value);
  // undefined
  //使用生成器生成无限个值：
  function* idCreator() {
    let i = 0;
    while (true)
      yield i++;
  }
  const ids = idCreator();
  console.log(ids.next().value);
  // 0
  console.log(ids.next().value);
  // 1
  console.log(ids.next().value);
  // 2
  // etc...


//   yield和yield*
function* showWords() {
    yield 'one';
    yield showNumbers();
    // 正确写法应该是
    yield* showNumbers();
    return 'three';
}

function* showNumbers() {
    yield 10 + 1;
    yield 12;
}

var show = showWords();
console.log(show.next()); // {done: false, value: "one"}
console.log(show.next()); // {done: false, value: showNumbers}
console.log(show.next()); // {done: false, value: 11}
console.log(show.next()); // {done: false, value: 12}
console.log(show.next()); // {done: true, value: "three"}
console.log(show.next()); // {done: true, value: undefined}
// 没达到 进入showNumbers函数里面的效果   
// 但是  在 showNumbers()左边加个 * 就能执行进去了



// 在爬虫开发中，我们常常需要请求多个地址，为了保证顺序，
//     引入Promise对象和Generator生成器函数，看这个简单的栗子：
var urls = ['url1', 'url2', 'url3'];

function* request(urls) {
    urls.forEach(function(url) {
        yield req(url);
    });

//     for (var i = 0, j = urls.length; i < j; ++i) {
//         yield req(urls[i]);
//     }
}
//上述代码中forEach遍历url数组，匿名函数内部不能使用yield关键字，
//改换成注释中的for循环就行了
var r = request(urls);
r.next();

function req(url) {
    var p = new Promise(function(resolve, reject) {
        $.get(url, function(rs) {
            resolve(rs);
        });
    });

    p.then(function() {
        r.next();
    }).catch(function() {

    });
}

// next()调用中的传参
function* showNumbers() {
    var one = yield 1;
    var two = yield 2 * one;
    yield 3 * two;
}

var show = showNumbers();

show.next().value // 1
// 在第二次调用next的时候one其实是undefined的
// 因为generator不会自动保存相应变量值，我们需要手动的指定
show.next().value // NaN
// 在第三次调用next的时候执行到yield 3 * two，通过传参将上次yield返回值two设为2
show.next(2).value // 6

// 后续接test1.js文件

