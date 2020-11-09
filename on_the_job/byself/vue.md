<!--
 * @Author: your name
 * @Date: 2020-09-27 09:19:19
 * @LastEditTime: 2020-10-26 09:28:05
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \garbage-book\on_the_job\byself\vue.md
-->
# vue

## 双向绑定

Vue 数据双向绑定主要是指：数据变化更新视图，视图变化更新数据。其中，View变化更新Data，可以通过事件监听的方式来实现，所以 Vue数据双向绑定的工作主要是如何根据Data变化更新View。
简而言之， Vue要实现数据双向绑定，需要做三件事情：

检测到Data变化（Observer）
追踪收集依赖，通知变更（Dep）
更新View视图（Watcher）

[Object.defineProperty VS proxy](https://juejin.im/post/6876953766831063048)

### Object.defineProperty()

```js
let _value = obj.a;
Object.defineProperty(obj, 'a', {
    get() {
        return _value;
    }
    set(newVal) {
        _value = newVal;
    }
    obj.a = 2;
    console.log(obj.a);
    // 在get和set里面添加添加相关的打印，在获取值和改变值的时候都会打印（说明set和get方法都被调用了

    // 但是发现如果对于数字的push，并不会有set里面的日志，这也就导致了vue要重写了数组的部分方法（push，pop, shift, unshift, splice, sort, reverse）
})
```

### 数组hack

``` js
// 1. 复制一份数组的原型方法，防止污染
const oldArrayProperty = Array.prototype;
const arrayPrototype = Object.create(oldArrayProperty);
// 2. 遍历，将arrayPrototype对象上的方法转换为观察者对象
const methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];  
methodsToPatch.forEach(methodName => {
    // 往arrayPrototype对象中加入methodsToPatch中的属性，并执行原生的methodsToPatch对应的方法
    Object.defineProperty(arrayPrototype, methodName, {
        value () {
            //监听数组变更
            console.log('you change the array');
            oldArrayProperty[methodName].apply(this, arguments)
        }
    })
})

// 3. 让数组继承arrayPrototype中的方法
obj.c.__proto__ = arrayPrototype;

console.log(obj.c);
obj.c.push('二叉分法');
console.log(obj.c);

// 结果：
// [ '排序', '递归' ]
// you change the array
// [ '排序', '递归', '二叉分法' ]

```

### 缺点

1. 只能监听对象，不能监听数组变化，无法触发push,pop...
2. 必须遍历对象的每个属性
3. 只能劫持当前对象属性，想要深度劫持，必须深层遍历嵌套对象

### Proxy

```js
var obProxy = new Proxy(obj, {
    get(target, key, receiver) {
        console.log('you get:' + key);
        return target[key];
    },
    set(target, key, value, receiver){
        console.log('you set:' + key);
        // target[key] = value;
        // Reflect.set(target, key, value)等同于上面的target[key] = value;
        return Reflect.set(target, key, value);
    }
});
console.log(obj.a);
obj.a = 666;
console.log(obj.a);
// 结果：
// 1
// 666
// 不进入上面的get和set方法
console.log(obProxy.a);
obProxy.a = 2;
console.log(obProxy.a);
// 结果：
// you get:a
// 1
// you set:a
// you get:a
// 2
```

**结果印证：proxy是去创建一个新的代理对象,所以在改变原对象obj时，上述中的get与set中的console均未打印。**

## 好处

Proxy 可以直接监听对象而非属性。
Proxy 可以直接监听数组的变化。
Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的。
Object.defineProperty 只能遍历对象属性实现监听，而Proxy 返回的是一个新对象,我们可以只操作新的对象达到目，大大减少了遍历带来的性能开销。
Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；
