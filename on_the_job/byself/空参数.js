function test ({a = 1}){
    console.log(a)
};

test({}); // 必须传空对象，否则报错
test({a:2});

function test1 (a = 1){
    console.log(a)
};

test1(); // 可以不传
test1(2)

function test2 ({a = 1} = {}){
    console.log(a)
};

test2(); // 不传默认空对象
test2({a:2});