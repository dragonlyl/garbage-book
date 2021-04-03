# 另一个教程的vue.js

## vue 的构建工具是rollup.js

[rollup.js 中文文档](https://www.rollupjs.com/guide/zh)

// 跑起源码  首先 npm install  之后 npm run dev 就能跑通了

// 查找dev代码 运行的文件  是scripts 的config.js
// 之后 去 查找web-full-dev  找到其对应的入口文件 entry

// 然后 找到 src 的web下的 entry-runtime-with-compiler.js
// 通过 一层层 然后找到 instance里面的index.js  这里就是一切的开始
// 为什么 要一层层呢  因为每一层都会给vue添加新的功能

// vue-lazyload
// vue-scroller
// mint-ui

## vue只能监听数组整体的变化  不能监听数组中元素的变化

但为什么splice 和 push 的变化能监听到呢  因为vue对其做了封装 使得这些操作也能够别监听到

## 忽略的用法

vue用来遍历对象  (item,key) in obj   可以输出键值对

你在vue 的data里面申明了一个变量 aaa 你在method可以用  let { aaa } = this  来获取到aaa

## computed监听事件

只要监听的数据发生改变就会自动调用  比如说 你通过关键字搜索  用computed来筛选出有相应关键字的数组, 这时候你还可以在同一个监听事件中来通过对筛选出来的数据进行按不同方式排序

//  点击事件 如果传了参数但又不想影响event  可以将$event作为形参传递进去

//  为什么mounted ()  而methods: {}  和 data: { }   因为mounted是生命周期  其他生命周期  
//   例如 created()   beforeDestroy() 这些生命周期都是马上加小括号
//  为什么清理在methods或者mounted创建的定时器最迟要在beforeDestroy ..  因为在destroy之后 ,vue实例就无法拥有数据绑定的功能了

## vue的生命周期  即 mounted是将数据挂载进去 ,为什么会特意有个挂载呢  ,首先数据要在内存中解析,不是直接到页面的

比如说10个标签每个标签都有数据,你不能生成一个标签然后马上把这个
标签的数据挂载进去 ,而是标签全部生成后 再把内存中的数据在mounted周期全部挂载进去

## 对于 vue的动画效果 其实是这样的   v-enter  v-enter-to    v-leave   v-leave-to   这些是状态(在变化过程还有两个状态)

v-enter-active  v-leave-active
动画分为两步 1.动画进入 enter 2: 动画离开 leave  而  v-enter是动画开始前  v-enter-to是动画结束  过度阶段v-enter-avtive
动画离开也是同理

.fade-enter-active, .fade-leave-active { transition: opacity .5s };  // 给两个过度加transition
.fade-enter, .fade-leave-to { opacity: 0; }   // 动画进入开始  和动画离开结束都是透明度为0
这里不需要 写 进入完成的状态样式是怎么样的

vue  还支持有animation 的动画效果  动画效果的 @keyframes { 0% 100% }代表的是时间的刻度 ,
    比如说这个动画效果要1s, 那么0% 就是0s时的状态   100% 就是1s时的状态  所以下面就能看懂
.bounce-enter-active{ animation: bounce-in 1s }; .bounce-leave-active{ animation: bounce-in 1s reverse};
@keyframes bounce-in { 0% {transform:scale(0)}; 50% {transform:scale(1.5)}; 100%{transform:scale(1)}; }
reverse 是指 离开的动画将 bounce-in效果从100% 到0%;

v-cloak 可以用于防止闪现表达式 配合css中 [v-cloak] { display:none }  // 属性选择器
    因为在实例被载入之前  <P v-cloak>{{msg}}</p> 里面的msg就是msg不会拿到data中msg值(因为vue实例还未创建)
    那么就会 display为none  ,实例载入成功就会自动显现替换msg的内容了

## 自定义指令 下面是全局指令 Vue.directive('upper-text',bind: (el,binding) => { el.textContent = binding.value.toUpperCase() })

这里定义的指令  在  标签中  `<p v-upper-text>{{msg}}</p>`   // msg值就是binding.value
特殊说明 :   el: 指令属性所在的标签对象    binding: 包含指令相关信息数据的对象

上面是bind的钩子
bind：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
官方实例的focus用的是下面的inserted
inserted：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
update

// 定义vue插件   Vue.use(MyPlugin) // 这句话会执行MyPlugin.install(Vue)
//   即我们的插件 只要是个立即执行函数 并把MyPlugin暴露出去 window.MyPlugin = MyPlugin
//   并且在立即执行函数定义 MyPlugin.install = function xxx {} ,那么就能实现Vue.use(MyPlugin)来调用我们的插件了

//  父子组件交互  还可以传递 函数  

//  获取为true的项   return todos.reduce((preTotal,todo) => preTotal + (tode.isCheck ? 1 : 0),0)

// vue中的全选  好像用computed 中的get set就能实现   get获取是否全选 然后是打钩 否不勾   set是在变化该值是改变列表所有的状态的是否选中

// 自定义事件
//  给组件绑定自定义事件有两种 首先子组件内部得写出发送事件 this.$emit('myEvent',msg)
//          1: 在父文件的 子组件标签上写上@myEvent = myEvent ,  然后  myEvent(msg) { console.log(msg) };
//          2: 或者在mounted 先找到子组件的dom   dom.$on('myEvent',(msg)=>{ console.log(msg) });

//   npm  info  pubsub-js   // 这行代码可以查看npm 是否库的信息

//  一丶将伪数组转换成数组    [].slice.call(arr);   或者  Array.from(arr)

```js
//假设空数组的原型slice方法为testSlice
Array.prototype.testSlice = function () {
    var start = 0
    var end = this.length
    if (arguments.length === 1) {
        start = arguments[0]
    } 
    else if (arguments.length === 2) {
        start = arguments[0]
        end = arguments[1]
    }
    var arr = []
    for (var i = start; i < end; i++) {
        arr.push(this[i]) //此时这个this为arguments
    }
    return arr
}
var arguments = {
    0: '我',
    1: '是',
    2: '伪数组',
    length: 3
}
[].testSlice.call(arguments);
```

这样就一目了然了，[].testSlice.call(arguments)，即空数组调用了testSlice函数，只不过也改变了this的指向，
此时这个this为arguments，那arr.push(this[i])==arr.push(arguments[i])，arr是函数里的新建的空数组 ,
函数里把伪数组的元素赋值给arr数组，返回值是arr，所以伪数组转化成了数组。

arguments本身并不是数组 而是对象

首先要说明[].slice.call()与Array.prototype.slice.call() 有什么区别?
[].slice === Array.prototype.slice  //true
[]为创建数组,当[].slice的时候,自然会去找原型链

[].__proto__.slice === Array.prototype.slice   //true

 // 二丶node.nodeType

 // 三丶Object.defineProperty(obj,propertyName,{}) // 给对象添加属性(指定描述符)
 /**
  属性描述符: 
  1.数据描述符:
  * configurable: 是否可以重新定义
  * enumerable: 是否可以枚举
  * value: 初始值
  * writable: 是否可以修改属性值
  2.访问描述符: 
  * get: 回调函数,根据其他相关的属性动态计算得到当前属性值
  * set: 回调函数,监视当前属性值的变化,更新其他相关的属性值
  */

```js
//  例子
let obj = { f:'peter',l:'lin' }
Object.defineProperty(obj,'fullname', {
    get() {
        return this.f + '-' + this.l
    },
    set(value) {
        const names = value.split('-');
        this.f = names[0];
        this.l = names[1];
    }
})
console.log(obj.fullname);
obj.f = 'hhh';
obj.l = 'xxx';
console.log(obj.fullname);
obj.fullname = 'ttt-eee';
console.log(obj.f,obj.l);

Object.defineProperty(obj,'test1',{
    configurable: false,  // 这里不能重新定义  即你在下面新写 object.defineProperty(obj,'test1',{ 是不会生效的
    enumerable: true,
    value: 'tes111',
    writable: false // 无法修改值
})
console.log(obj.test1);
obj.test1 = 'tesssss';
console.log(obj.test1);
```

//  四丶Object.keys();
console.log(Object.keys(obj)); // 这里没有fullname
//  看enumerable 是否为可枚举   不写是默认为false的.即不可枚举


//  五丶obj.hasOwnProperty(prop): 判断prop是否为obj的自身属性  即检查对象是否具备某个属性名

// 六丶  DocumentFragment: 文档碎片(高效批量更新多个节点)
//   document: 对应显示的页面,包含n个element,一旦更新document内容的某一个元素会触发页面更新
//   documentsFragment: 内存中保存n个element的容器对象(不与界面关联),如果更新fragment中的某个ele,界面不变.
//                  到最后全部改完才更新一个界面

// 示例  目前的ul 为  <ul><li>第一</li><li>第二</li></ul>
//  1.创建fragment
const fragment = document.createDocumentFragment();
// 2.取出ul中所有的子节点 保存到fragment中
let child;
while(child = ul.firstChild) { // 一个节点只能有一个父亲 ,
    fragment.appendChild(child);// 第一个节点被用ul移除,然后添加为fragment的子节点,
                            //然后之前的第二个节点变成了fristChild,直至ul所有子节点都被移除
}
// 3.更新fragment中所有li的文本
Array.prototype.slice.call(fragment.childNodes).forEach(node => {
    node.textContent = '新的文本内容'
})
// 4.将fragment插入ul 中
ul.appendChild(fragment);  // 此时ul变成 <ul><li>新的文本内容</li><li>新的文本内容</li></ul>
// 但只发生了一次页面变化


//  数据代理   即 a.b.xx 你可以通过  a.xx来直接获取
/**
 * 比如说 vue里面的 data属性里面定义 各种值  先data中定义一个name
 * console.log(this.name,this);  // 可以在this中移到name 提示 (invoke property getter); vm代理对data数据的读操作
 * this.name = 'xxxx';                                                               vm代理对data数据的写操作
 * console.log(this._data.name, this.name); // _data里面有 get name:  和set name 方法
 * 
 * //  即 this.name 时 get 中return的是 this._data['name']
 * //  即this.name = a 时  set中 this._data['name'] = a;
 */

 //  用debug来查看源码