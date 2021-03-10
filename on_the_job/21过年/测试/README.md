# 单元测试

## url

[js高级进阶之单元测试jest使用](https://blog.csdn.net/weixin_40073115/article/details/103839638)
[Javascript单元测试工具-Jest 学习笔记(一）](https://blog.csdn.net/dazzlingstar/article/details/80832781?utm_medium=distribute.pc_relevant.none-task-blog-baidujs_title-1&spm=1001.2101.3001.4242)

## 使用

`npm install -D jest`

```js
// 创建 main.js文件
let add = (a,b)=>  a+b;
// module.exports 返回的是模块对象本身  exports是对module.exports的引用
// 当然也能直接写成  module.exports = add  调用  let add = require('./main.js');
module.exports = {add};
```

```js
// 创建 main.test.js文件
let {add} = require('./main.js');
test('加法测试',()=>{
    expect(add(1,2)).toBe(4);
})
```

修改package.json script 的 test指令
`"test": "jest"`
运行 npm run test

## 其他Matchers

对象的比较 使用 toEqual

>toBe使用 === 来测试全等于，如果我们想检查一个对象object中的值，使用toEqual来替代

```js
"use strict";
    
test('object assigenment', ()=> {
    let data = { one: 1};
    data['two'] = 2;
    expect(data).toEqual({ one: 1, two: 2 });
})
```

`expect(a + b).not.toBe(0);` // 不等

### Truthiness

有时候我们需要在undefined，null和false进行区别，但是我们又不想去了解他们的不同点，Jest也会帮助我们得到我们想要的结果。

1. toBeNull 检查是否为null
2. toBeUndefined 检查是否为undefined
3. toBeDefined 与toBeUndefined的相反
4. toBeTruthy 检查任何通过if显示转换是否为true
5. toBeFalsy 检查任何通过if显示转换是否为false

```js
test('null', () => {
    let n = null;
      expect(n).toBeNull();
      expect(n).toBeDefined();
      expect(n).not.toBeUndefined();
      expect(n).not.toBeTruthy();
      expect(n).toBeFalsy();
});
 
test('zero', () => {
      let z = 0;
      expect(z).not.toBeNull();
      expect(z).toBeDefined();
      expect(z).not.toBeUndefined();
      expect(z).not.toBeTruthy();
      expect(z).toBeFalsy();
});
```

### Numbers

toBeGreaterThan 大于
toBeGreaterThanOrEqual 大于等于
toBeLessThan 小于
toBeLessThanOrEqual 小于等于

```js
test('two plus two', () => {
    let value = 2 + 2;
    expect(value).toBeGreaterThan(3);
    expect(value).toBeGreaterThanOrEqual(3.5);
    expect(value).toBeLessThan(5);
    expect(value).toBeLessThanOrEqual(4.5);
 
    // toBe and toEqual 对于number类型作用是一样的
    expect(value).toBe(4);
    expect(value).toEqual(4);
});

// 对于浮点数的测试，使用toBeCloseTo来替代toEqual，因为我们不会让一个测试依赖于一个微小的舍入型错误。
test('adding floating point numbers', () => {
    let value = 0.1 + 0.2;
    expect(value).not.toBe(0.3);    // It isn't! Because rounding error
    expect(value).toBeCloseTo(0.3); // This works.
});

```

### String

```js

test('there is no I in team', () => {
    expect('team').not.toMatch(/I/);
});
 
test('but there is a "stop" in Christoph', () => {
    expect('Christoph').toMatch(/stop/);
})
```

### Arrays

```js
let shoppingList = ['diapers', 'kleenex', 'trash bags', 'paper towels', 'beer'];
 
test('the shopping list has beer on it', () => {
    expect(shoppingList).toContain('beer');
});
```

### Exceptions

```js
function compileAndroidCode() {
    throw new ConfigError('you are using the wrong JDK');
}
 
test('compiling android goes as expected', () => {
    expect(compileAndroidCode).toThrow();
    expect(compileAndroidCode).toThrow(ConfigError);
 
    // You can also use the exact error message or a regexp
    expect(compileAndroidCode).toThrow('you are using the wrong JDK');
    expect(compileAndroidCode).toThrow(/JDK/);
});
```

## Testing Asynchronous Code(异步代码)

在javascript程序中，会经常见到一些异步执行的代码，当我们有这些异步执行的代码时，Jest需要知道当前这个代码测试是否已经完成，然后才能转向另一个测试。Jest提供了一些方法来处理这种问题。

### callback

我们有一个fetchData(callback)方法，当callback(data)方法调用的时候，我们会获取一些data数据，并且想测试返回的数据是否只是一个字符串uyun

```js
test('the data is uyun', done => {
    function callback(data) {
        expect(data).toBe('uyun');
        done();
    }
 
    fetchData(callback);
});
```

### promises

```js
test('the data is uyun', () => {
    return fetchData().then(data => {
        expect(data).toBe('uyun');
    });
});
```

### Async/Await

```js
test('the data is uyun', async () => {
    const data = await fetchData();
    expect(data).toBe('uyun');
});
```
