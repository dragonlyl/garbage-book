# 已完成

## 路由控制权限

1. beforeEach用来拦截所有路由内容
2. 通过判断token存在进入后续页面
3. 通过vuex来获取不同的路由内容(角色获取路由组,或者都是通过后端放回)
4. perms用来判断用户具体权限 `*:*:*` 表示所有的权限, `system:user:list` 表示系统的用户列表内容 `system:role:query/add/edit/remove`
[琛哥demo](https://arb.manage.chengecloud.com/system/config)
[rouyi代码实现1](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/store/modules/permission.js)
[rouyi代码实现2](https://gitee.com/y_project/RuoYi-Vue/blob/master/ruoyi-ui/src/permission.js)

## Map Set

### Map

map 的 `entries` 和 `keys`, `values` 返回的都是遍历器对象
即 `map.keys().next()` 都是可以操作的

map 的 `iterator` 就是 `entries()`函数

`map[Symbol.iterator] === map.entries`

WeakMap只接受对象为key值

### WeakSet 和Set

前者只能存对象(数组也算), 并且是弱引用,如果WeakSet内容没有被引用就会被垃圾处理回收
所以**不能遍历**(因为里面元素数量取决于垃圾回收的处理时间),也没有`size`属性

## node 垃圾回收

```js
// 运行能手动触发垃圾回收
node --expose-gc

// 先触发一次 回收
> global.gc();
// 查看内存状态
> process.memoryUsage();
{ rss: 21106688,
  heapTotal: 7376896,
  heapUsed: 4153936,
  external: 9059 }

> let wm = new WeakMap();

// 新建一个变量 key，指向一个 5*1024*1024 的数组
> let key = new Array(5 * 1024 * 1024);

// 设置 WeakMap 实例的键名，也指向 key 数组
// 这时，key 数组实际被引用了两次，
// 变量 key 引用一次，WeakMap 的键名引用了第二次
// 但是，WeakMap 是弱引用，对于引擎来说，引用计数还是1
> wm.set(key, 1);
> global.gc();
// 这时内存占用 heapUsed 增加到 45M 了
> process.memoryUsage();
{ rss: 67538944,
  heapTotal: 7376896,
  heapUsed: 45782816,
  external: 8945 }
// 清除变量 key 对数组的引用，
// 但没有手动清除 WeakMap 实例的键名对数组的引用
> key = null;
// 再次执行垃圾回收
> global.gc();
// 内存占用 heapUsed 变回 4M 左右，
// 可以看到 WeakMap 的键名引用没有阻止 gc 对内存的回收
> process.memoryUsage();
```

## 数据属性和访问器属性

[Js中的数据属性和访问器属性](https://www.cnblogs.com/yanan-boke/p/7771264.html)
数据属性:
    configurable
    writable
    enumerable
    value
通过 `Object.getOwnPropertyDescription(obj, key)`
访问器属性:
    get
    set

## 浏览器缓存

301 和 302的区别

网站权重: 搜索引擎给网站赋予的一定权威值,权重越高在搜索引擎所占分量越大,搜索引擎排名越高

302 搜索引擎抓取新的内容和保留旧的内容
301 搜索引擎抓取新的内容同时将旧网站替换为重定向的网站(网页权重也转移到新页面上)

## Array 和 [] 的区别

一种是直接创建了一个数组，一个是调用字符串的构造函数创建字符串对象然后再创建这个字符串，中间多了一个创建对象的过程
Array()是一个对象，[]是一个数据原型, 用new Array()系统每次都会新生成一个对象（浏览器每生成一个对象都会耗费资源去构造他的属性和方法），他的子集是[]