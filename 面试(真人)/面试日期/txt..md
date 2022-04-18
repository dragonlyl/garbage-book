# React知识点

## react的调试工具

react-developer-tools
模拟数据的工具 charles(抓包发送出去的数据进行出出力)

## React初级知识点

```js
结构赋值
import {component} from 'react'
等价于
import React from 'react'
const Component = React.Component
```

只要用了jsx语法就要引入react文件，不然无法编译

Fragment

React中常见的一种模式是为一个组件返回多个元素。`Fragment`可以让你聚合一个
子元素的列表，并且不在DOM中增加额外的节点

React框架的特点
1、声明式开发  jq(命令式开发)
2、组件开发
3、可以与其他框架并存
4、单向数据流 父组件可以传值给子组件，子组件不能修改父组件的值
5、视图层框架(只解决数据和渲染的问题) 需要用到redux、mobox等数据层框架
6、函数式编程(更容易实现前端自动化测试)

### 什么是虚拟DOM ?(react的虚拟DOM是同层比对的)

1、state 数据
2、JSX   模版
3、数据+模版 结合，生成真实的DOM，来显示
`<div id='abc'><span>hello world</span></div>`
4、生成虚拟DOM(虚拟DOM就是一个JS对象，用它来描述真实DOM) (损耗了性能)
['div',{id:'abc'},['span',{},'hello']]
5、state发生变化
6、数据+模版 生成新的虚拟DOM (极大地提升了性能)
['div',{id:'abc'},['span',{},'bye bye']]
7、比较原始虚拟DOM和新的虚拟DOM的区别，找到区别是span内容 (极大地提升了性能)
   Diff算法
8、直接操作DOM，改变span中的内容

Diff算法(react)
1、同层比对
2、key值比对

e.target 获取元素节点

setState
1、这个方法时异步的
2、两个参数的含义
`setState(()=>{},()=>{})；`
  第一个参数是设置状态
  第二个参数是一个回调函数，在setState() 的异步操作结束并且组件已经重新渲染的时候执行,
  这个回调来拿到更新的state的值

 ref是什么时候使用的(尽量不要使用)
 是帮助我们在react中直接获取dom元素的使用
 `<i ref={(Icon)=>{this.spinIcon=Icon}}></i>`

 ************************react组件交互***********************
1、父组件想子组件传值
通过组件传参数如 name={'wangwenya'} 子组件通过this.props来获取父组件的值
2、子组件向父组件传值
通过向子组件传方法等，通过子组件使用父组件的方法来改变父组件的值
3、兄弟组件之前的交互
就是通过父组件来进行数据交互

 *********************************************************

 *****************声明周期函数 START**********************
 生命周期函数指在某一个时刻组件会自动执行的函数
 1、Initialization
 setup props and state
 2、Mounting（组件第一次挂载的流程）
 componentWillMount->render->componentDidMount
 componentWillMount(){}     组件即将被挂载到页面的时刻自动执行
 componentDidMount(){}      组件被挂载到页面之后，自动被执行(如：做AJAX请求，也可以放在cnstructor和
 componentWillMount但是不建议)
 3、Updation (更新流程)
 componentWillReceiveProps(){} 当一个组件要从父组件接收参数，如果这个组件第一次存在于父组件中，不会执行，如果这个组件已经存在于父组件中，会被执行
 只有父组件的render函数被重新执行了，子组件的生命周期还是就会被执行
 shouldComponentUpdate(nextProps,nextState){ return true;}  组件被更新之前会被自动执行(返回true要被更新，false不要);
 componentWillUpdate(){} 组件被更新之前，它会自动执行，但是他在shouldComponentUpdate之后被执行。
 如果shouldComponentUpdate返回true会被执行，false不会被执行(!==判断不相等)
 render()
 componentDidUpdate(){} 组件更新完成后，会执行
4、Unmounting
componentWillUnmount(){} 当这个组件即将被页面移除的时候会被执行

************************redux*********************************
 安装redux npm install redux或者 yarn add redux
 store.dispath();
actionCreator统一创建action,可以对action进行统一的管理提高可维护性。放在统一的文件里做自动化测试可以是很方便的了。

核心设计原则
1、store必须是唯一的
2、只有store能改变自己的能容
3、Reducer必须是纯函数 什么是纯函数：返回值只和函数参数有关,与外部无关（不会产生副作用比如改变外部的变量，发送Ajax请求、调用window.reload刷新浏览器甚至是console.log打印数据）。就是几乎除了计算数据以外什么都不能干,计算的时候还不能依赖除了函数参数以外的数据。无状态组件本身是一个纯函数。

核心API
1、createStore
2、store.dispatch
3、store.getState
4、store.subscribe

## UI组件

import React ,{Component} from 'react';
import {Input,Button,List} from 'antd';
class TodoListUI extends Component{
    render(){
        return(
            <div>
            <div>
                <Input placeholder="Basic usage" style={{width:'300px',margin:'20px'}} 
                value={this.props.inputValue}
                onChange={(e)=>{this.props.inputOnchang(e)}}
                />
                <Button type="primary" onClick={(e)=>{this.props.handBtnChange(e)}}>Primary</Button>
            </div>
                <List
                    style={{width:'300px',marginTop:'10px',marginLeft:'20px'}}
                    bordered
                    dataSource={this.props.list}
                    renderItem={(item,index) => <List.Item  onClick={(index)=>{this.props.handleItemDelete(index)}}>{item}</List.Item>}
                />
         </div>
        )
    }
}
export default TodoListUI;

## 无状态组件

什么是无状态组件：无状态就是一个函数，同时会接受一个props，并且返回一个jsx
什么时候去使用：当一个组件只有render函数的时候可以用无状态组件来代替UI组件。
为什么要使用无状态组件：无状态组件性能更优：既要执行render方法还要执行声明周期组件
const TodoListUI=(props)=>{
    return(
        <div>
        <div>
            <Input placeholder="Basic usage" style={{width:'300px',margin:'20px'}} 
            value={props.inputValue}
            onChange={(e)=>{props.inputOnchang(e)}}
            />
            <Button type="primary" onClick={(e)=>{props.handBtnChange(e)}}>Primary</Button>
        </div>
            <List
                style={{width:'300px',marginTop:'10px',marginLeft:'20px'}}
                bordered
                dataSource={props.list}
                renderItem={(item,index) => <List.Item  onClick={(index)=>{props.handleItemDelete(index)}}>{item}</List.Item>}
            />
     </div>
    )
}
export default TodoListUI;
*********************中间件********************
什么是中间件：中间件指redux的中间件，指的是action和store之间的中间件，也就是对dispatch方法的升级
-------------------------------------------------------
一、redux-thunk处理异步操作
是什么：redux的中间件
为什么要使用：
1、以前你创建action的时候只能返回js对象，当你使用的是redux-thunk的时候在创建action的时候就可以返回函数
2、为了把复杂的操作可以归类在一块
3、会在自动化测试的时候会非常的简单
原理
1、当你使用store.dispatch发送action的时候，store会自动执行action里面的函数
什么是redux的中间件？
redux的中间件指的是action和store之间的中间，就是对dispatch方法的封装
二、redux-saga处理异步操作
可以返回的不仅是一个对象还可以是一个函数。
三、redux-react方法
*************************react-deux******************************************
API:
<Provider></Provider>:连接Store,里面的组件有能力获取store俩面的数据了。
connect方法(属于高阶组件):组件和store做连接

//返回的结果是容器组件，调用UI组件，把方法都准备好了，导出的是connect包装好的组件
export default connect(mapStateToProps,mapDisptchToProps)(TodoList);
//TodoList怎么做连接，用mapStateToProps做connect和store做连接

在react的className怎么又使用字符串又使用变量
1、className={`title ${index === this.state.active ? 'active' : ''}`}  ES6的模版字符串
2、className={["title", index === this.state.active?"active":null].join(' ')}  拼接
3、className={value.class + " " + value.class2} 拼接

reducer放过多的数据会导致代码不可维护我们把一个reducer拆分成多个维护，最后再做一个整合。
combineReducers可以将多个reducer文件整合成为一个：
export default combinReducers ({
    header:headerReducer
})

facebook团队建立的immutable.js
第三方的库，不可以改变的对象
1、fromJS可以把js对象转化成immutable对象
2、toJS可以转化为js对象
3、immutable不可以直接用数组的中括号形式如：list[i]
4、设置值set().set()需要一个一个，除了set()还可以用merga({})可以可以同时设置多个值
5、merge({})可以一次合并对个属性
6、immutable有个List可以把普通数组转化成immutable对象的数组

 focused:state.header.get('focused')中state是js对象header是immutable对象我们要把对象进行统一
 就需要使用redux-immutable库的：
1、import { combineReducers } from 'redux';修改为import { combineReducers } from 'redux-immutable';
2、state.get('header').get('focused')等同于state.getIn(['header','focused'])
3、state.get.concat()合并数据
---------------------------其他------------------------------------------------------
用axios做第三方请求
在react中使用阿里巴巴字体图标库需要修改文件路径前面加一个./

(list.size===0)&&dispacth(creatorType.getList());就是如果满足第一个就会执行第二个

可以把axios的操作放在redux-thunk来进行处理
redux-thun可以返回一个函数

======================================react路由================================================
1、安装路由
npm install react-router-dom 这是react-router 4.0的版本
2、例子
这就叫路由规则
import {BowserRouter,Route} from 'react-router-dom';
exact:完全匹配路径
path:路径
render：Route元素的一个属性可以渲染元素
redirect：路由重定向
<BowserRouter>//该元素下面只能有一个子元素
    <div>
        <Route path="/" exact render={()=><div>home</div>></Route>//使用元素
        <Route path="/" exact component={Home}></Route>//使用Home组件
        <Route path="/detail" exact  render={()=><div>home</div>></Route>
    </div>
</BowserRouter>

withRouter():可以让withRouter里面的组件有能力获取到router里面的内容

单页应用：整个网页只会加载一次
why:使用a标签进行路由跳转，页面会重新进行加载
how:所以要使用react-router-dom里面的Link
{Link} from 'react-router-dom';
路由跳转：<Link to="detail"></Link>

动态路由：
how：<Link to="detail"+'对应的id值'></Link> <Route path='detail/:id'></Route>
进行cosole.log(this.props);可以看见id值在this.props.match.params.id
不用动态路由：
to='detail?id='+'对应id的值'
id在this.props.location.search中，但是要进行处理
<Link href={{pathname:'/detailed',query:{id:item.id}}}>

====================================性能提升===================================================
why：由于connect()每次跟store连接，都会改变数据，导致所有的组件都会重新render()一遍
how:1\可以用shouldComponentUpdate()进行判断当数据更新以后再执行 
2、使用react的{PureComponent} from 'react'，这个底层进行了数据更新的判断，只会更新改变数据的组件，最好搭配immtable一起进行数据管理
不然会报错
为什么要使用immtable进行数据管理
在react中,immutable主要是防止state对象被错误赋值,使用Immutable.is来减少 React 重复渲染,提高性能
后端传给前端的字符串带有标签的话会默认转义
如何避免转义：
{dangerouslysetInnerHtml={_html:对应的要显示的值}}

innerRef

引入本地图片方法：
let url=require('../.../../static/'+item.get("imgUrl"));
<img src={url} alt="图片"/>

异步加载：react-loadable

XAMPP 可以帮助在本地起服务器 PHP
怎么上线？
1、npm run build 打包
2、把build文件给后端(前端的代码放到后端项目里面，访问后端地址)
===============================================================================================
面试题：

1、说下事件委托和事件代理
事件委托又叫事件代理，事件委托就是利用事件冒泡，只制定一个时间处理程序，就可以管理某一类型的所有事件。第三个参数默认冒泡false,true是事件捕获
通过nodeName找到对应节点去执行方法
event.stopPropagation()阻止事件的传递行为. event.preventDefault();阻止默认行为，比如阻止a的href

2、302 303 304 401等状态码 的含义
1XX ：信息状态码

　　100 Continue 继续，一般在发送 post 请求时，已发送了 http header 之后服务端 将返回此信息，表示确认，之后发送具体参数信息

2XX ：成功状态码

　　200 OK 正常返回信息 201 Created 请求成功并且服务器创建了新的资源

　　202 Accepted 服务器已接受请求，但尚未处理

3XX ：重定向

　　301 Moved Permanently 请求的网页已永久移动到新位置。

　　302 Found 临时性重定向。 303 See Other 临时性重定向，且总是使用 GET 请求新的 URI 。

　　304 Not Modified 自从上次请求后，请求的网页未修改过。（有缓存）

4XX ：客户端错误

　　400 Bad Request 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的 内容发起请求。

　　401 Unauthorized 请求未授权。

　　403 Forbidden 禁止访问。

　　404 Not Found 找不到如何与 URI 相匹配的资源。

5XX: 服务器错误

　　500 Internal Server Error 最常见的服务器端错误。

　　503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。
3、什么是同步什么是异步？
同步:发送一个请求,等待返回,然后再发送下一个请求
异步:发送一个请求,不等待返回,随时可以再发送下一个请求

4、setState是同步还是异步方法？
setState有可能是异步的。
出于性能考虑，React 可能会把多个 setState() 调用合并成一个调用。
因为 this.props 和 this.state 可能会异步更新。

5、let和var，以及普通函数和箭头函数的区别？
let和var的区别：
1、不存在变量提升
2、不能重复命名
3、var只有全局作用域和函数作用域，没有块级作用域
let存在块级作用域，外层代码块不受内层代码块的影响

6、普通函数和箭头函数的区别：
1)普通函数可以用于创建构造函数，箭头函数不能用于创建构造函数，因为箭头函数1、不能绑定arguments 2、没有单独的this 3、没有prototype属性。因为没有自己的this指针所以通过call()\apply()等方法调用只能传参不能绑定this,因为第一个参数会被忽略
2)this的指向不同，普通函数的this总是指向调用它的对象或者，如果用作构造函数，它指向创建的对象实例。箭头函数指向上下文

7、apply\call\bind的区别是什么？
call和apply的共同点是可以改变函数执行的上下文，将一个对象交给另一个对象，并且立即执行。
Function.call(obj,[param[,param[,...[,param]]]]);
call的第一个参数是一个对象，function的调用者将会指向这个对象，如果哦不传默认为全局对象window,第二个参数开始可以接收任意个参数。
每个参数都会映射到相应位置的function的参数上。如果将所有的参数作为一个数组传入，他们会作为一个整体映射到Function对应的第一个参数上，后面的参数都会为空。
Function.apply(obj,[,argArray]);
第一个参数和call一致，第二个参数必须是数组或者类数组，它们会被转换为类数组，传入Function中，并且会被映射到Funtion对应的参数上。
Function.bind(thisArg[,arg1[,arg2[,...]]]);
bind方法创建一个新的函数，在调用时设置this关键字为提供的值。并在调用新函数时将给定参数列表作为原函数的阐述序列的前若干项。且bind方法需要调用后才会执行。
bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用
什么是类数组，就是具备与数组特征类似的对象。类数组无法使用数组原型链上面的方法。

8、什么是闭包，为什么要用闭包？
闭包是一个可以访问外部作用域的内部函数，即使这个外部作用域已经执行结束。
闭包的功能就是使一个函数能访问另一个函数作用域中的变量。形成闭包之后，该变量不会被垃圾回收机制回收并且内部函数可以引用外层的参数和变量。
创建闭包的常见方式是在一个函数内部再创建一个函数。闭包的原理其实还是作用域。
使用闭包的优点是可以避免全局变量污染，缺点是容易造成内存泄露（不再用到的内存，没有及时释放，就叫做内存泄漏）
作用域链：子集会一级级地向上寻找所有父对象的变量，父对象的所有变量对子对象可见，反之则不成立。
注意：闭包的外部作用域是在其定义的时候已决定，而不是执行的时候、
闭包的使用场景：封装私有变量
9、原型、构造函数、实例、原型链、new运算符的分析

    原型是Javascript中的继承的基础.指构造函数的内置属性，即prototype属性。

    原型链作为实现继承的主要方法，其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。

    “原型链”的作用在于，当读取对象的某个属性时，JavaScript引擎先寻找对象本身的属性，如果找不到，
    就到它的原型去找，如果还是找不到，就到原型的原型去找。以此类推，如果直到最顶层的Object.prototype还是找不到，
    则返回undefine。

    原型对象:prototype
    原型指针:__proto__
10、  new 运算符
    1\一个对象被创建。它继承自foo.prototype
    2\构造函数foo被执行。执行的时候，相应的 传参会被传入，同时上下文（this）
    会被指定为这个新实例。new foo等同于new foo(),只能用在不传递任何参数的情况
    3\如果构造函数返回一个"对象"，那么这个对象会取代整个new出来的结果。如果构造函数没有返回对象，
    那么new出来的结果为步骤1创建的对象
怎么去实现？
1.创建一个空的简单 JavaScript 对象（即{}）；

2.链接该对象（即设置该对象的构造函数）到另一个对象 ；（ 通俗理解就是新对象隐式原型__proto__链接到构造函数显式原型prototype上。）

3.将步骤 1 新创建的对象作为 this 的上下文 ；（ 实际是执行了构造函数 并将构造函数作用域指向新对象 ）

4.如果该函数没有返回对象，则返回 this。（ 实际是返回一个空对象， new Object()就是返回一个空对象{} ）
function _new(constructor, ...arg) {
  var obj = {}; // 对应于上面的步骤 1
  obj.__proto__ = constructor.prototype; // 对应于上面的步骤 2

  var res = constructor.apply(obj, arg); // 对应于上面的步骤 3

  return Object.prototype.toString.call(res) === '[object Object]' ? res : obj; // 对应于上面的步骤 4
}

11、webpack
    webpack需要处理的文件类型
    Html->html-webpack-plugin
    脚本->babel+babel-preset-react
    样式->css-loader+sass-loader
    图片/字体->url-loader+file-loader

    html-webpack-plugin,html单独打包成文件的
    extract-text-webpack-plugin,样式打包成单独文件
    CommonsChunkPlugin,提出通用模块

    webpack-dev-server
    1、为webpack项目提供web服务（express＋webpack-dev-middleware）
    2、 更改代码自动刷新，路径转发 
    react绑定this的方法
    1、在标签里使用bind();
    2、箭头函数，箭头函数会捕获其所在上下文的this值，作为自己的this值。如果要传递参数，事件对象e必须显示传递作为第二个参数
    3、使用React.createClass会自己绑定this
    4、在构造函数内绑定this,this.event=this.event.bind(this);
    *5、定义函数的时候使用箭头函数定义handleClick=()=>{}; 这是SE7的语法
    推荐使用5，由于1、2每次render的时候都会重新分配函数事件会影响性能。

    热加载跟热更新的区别：热加载会刷新页面
    **webpack怎么实现的热更新(HMR)？webpack-dev-middleware
    当代码文件修改并保存之后，webpack通过watch监听到文件发生变化，会对代码文件重新打包生成两个模块补丁文件
    manifest.js和一个或者多个updated chunk.js，将结果存储在内存文件系统中，通过websocket通信机制将重新打包
    的模块发送给浏览器端，浏览器动态的获取新的模块补丁替换旧的模块，浏览器不需要刷新页面就可以实现应用的更新。
12、单页应用的优点和缺点
  单页web应用（简称SPA），它仅在web页面初始化时加载响应的HTML\JavaScript\css，一旦页面加载完成
  SPA不会因为用户的操作进行页面的重新加载和跳转，而是通过javaSvript动态的变换HTML的内容。
  优点：
  1、良好的交互体验(用户不需要刷新页面，通过ajax异步获取，页面显示流畅)
  2、前后端工作分离模式，后端不用管模版渲染、输出页面的工作，API通用化。
  3、单页面相对于服务器压力小，服务器只用出数据就可以了，不用管展示逻辑和页面合成
  4、单页应该用页面切换不会出现白屏现象也不会出现闪烁现象
  缺点：
  1、首次加载耗时时间比较多(单页应该用是首页把所有组件都加载出来)
  2、SEO问题，不利于百度，360等搜索引擎收录（seo就是搜索引擎优化）
  3、造成css命名冲突（如果不是单页应用浏览器会重新渲染不会有遮掩的问题）
  4、由于web单页应用在一个页面显示所有内容，所有不能使用浏览器前进、后退等。
*** 解决：
  1、服务端渲染（SSR）
  2、预渲染，在build时对指定的路由生产静态HTML文件
  3、通过sass\less\stylus等进行CSS预处理，在一定程度可以解决该问题
  4、前端的hash路由配置了就可以前进后退

13、为什么现在都用import和require，优点在哪里？还有什么是AMD、什么是CMD

14、js是单线程node也是单线程，怎么就能实现高并发

15、mongdb怎么找大于6小于10的数字
$gte:>=   $lte:<=    $gt:>    $lt:<

*16、闭包怎么影响了浏览器的性能
会产生内存泄露
什么是内存泄露：“内存泄漏（Memory Leak）是指程序中己动态分配的堆内存由于某种原因程序未释放或无法释放，造成系统内存的浪费，导致程序运行速度减慢甚至系统崩溃等严重后果。”
造成内存泄露的原因：引用对象存储的位置是堆内存中，当js的垃圾回收机制检测不到该变量被使用，就会被垃圾回收机制收走。而闭包，就会产生一个一直存在，切不释放的变量。
怎么解决内存泄露：执行完成后给变量设置为空
基本类型变量（Number 、Boolean、Undefined、String、Null）的值一般都是存在栈内存中，
引用类型变量（Array、Object、Function）的值存储在堆内存中，栈内存存储对应空间地址

*17、网页渲染的过程
构建DOM树-CSS解析-构建渲染树-渲染树布局-渲染树绘制
1、浏览器将获取的HTML文档并解析成DOM树。DOM树在构建的过程中可能会被CSS和JS的加载而执行阻塞。脚本可以defer异步加载或者放在body里
2、处理CSS标记，构成层叠样式表模型CSSOM(CSS Object Model)。
3、将DOM和CSSOM合并为渲染树(rendering tree)将会被创建，代表一系列将被渲染的对象。
4、渲染树的每个元素包含的内容都是计算过的，它被称之为布局layout。浏览器使用一种流式处理的方法，只需要一次pass绘制操作就可以布局所有的元素。
5、将渲染树的各个节点绘制到屏幕上，这一步被称为绘制painting
前三个步骤可能在第一次Painting之后又被更新，比如JS修改了DOM或CSS属性。
回流(reflow位置发生变化)、重绘(repaint属性发生变化)，DOM、CSSOM更新，图片下载完成，都需要回流、重绘来更新网页。
*18、http的缓存机制
    1、Http请求(Request)报文，报文格式为：请求行-HTTP头(通用信息头、请求头、实体头)-请求报文主体(只有POST才有请求报文主体)
    2、Http响应(Response)报文,报文格式为：状态行-HTTP头(通用信息头、响应头、实体头)-响应报文主体

Accpet：
告诉服务端,客户端接收什么类型的响应
Referer：
表示这是请求是从哪个URL进来的,比如想在网上购物,但是不知道选择哪家电商平台,你就去问度娘,说哪家电商的东西便宜啊,然后一堆东西弹出在你面前,第一给就是某宝,当你从这里进入某宝的时候,这个请求报文的Referer就是www.baidu.com
Cache-Control：
对缓存进行控制,如一个请求希望响应的内容在客户端缓存一年,或不被缓可以通过这个报文头设置
Accept-Encoding：
这个属性是用来告诉服务器能接受什么编码格式,包括字符编码,压缩形式(一般都是压缩形式)
例如:Accept-Encoding:gzip, deflate(这两种都是压缩格式)
Host：
指定要请求的资源所在的主机和端口
User-Agent 作用：告诉服务器，客户端使用的操作系统、浏览器版本和名称

    3、浏览器和服务器通信方式为应答模式：浏览器发起HTTP请求-服务器响应该请求。那么浏览器第一次向服务器发起该请求后拿到该请求结果，会根据报文中HTTP头的缓存标识，决定是否缓存结果，是则将请求结果和缓存标识存入浏览器缓存中。
    4、强制缓存：就是向浏览器缓存查找该请求结果，并根据该结果的缓存规则来决定是否使用该缓存结果的过程。
           强制缓存的缓存规则：当浏览器向服务器发送请求的时候，服务器会将缓存规则放入HTTP响应的报文的HTTP头中和请求结果一起返回给浏览器，控制强制缓存的字段分别是Expires和Cache-Control，其中Cache-Conctrol的优先级比Expires高
           Expires是HTTP/1.0控制网页缓存的字段，其值为服务器返回该请求的结果缓存的到期时间，即再次发送请求时，如果客户端的时间小于Expires的值时，直接使用缓存结果
           在HTTP/1.1中，Cache-Control是最重要的规则，主要用于控制网页缓存，主要取值为：

            （1）public：所有内容都将被缓存（客户端和代理服务器都可缓存）

            （2）private：所有内容只有客户端可以缓存，Cache-Control的默认取值

            （3）no-cache：客户端缓存内容，但是是否使用缓存则需要经过协商缓存来验证决定

            （4）no-store：所有内容都不会被缓存，即不使用强制缓存，也不使用协商缓存

            （5）max-age=xxx (xxx is numeric)：缓存内容将在xxx秒后失效
    5、协商缓存：协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程
            1)协商缓存生效会返回304
            2)商缓存的标识也是在响应报文的HTTP头中和请求结果一起返回给浏览器的，控制协商缓存的字段分别有：
            Last-Modified (Last-Modified是服务器响应请求时)/ If-Modified-Since(客户端再次发起该请求时,携带上次请求返回的Last-Modified值)
            Etag(Etag是服务器响应请求时，返回当前资源文件的一个唯一标识(由服务器生成)) If-None-Match(If-None-Match是客户端再次发起该请求时，携带上次请求返回的唯一标识Etag值)
            其中Etag / If-None-Match的优先级比Last-Modified / If-Modified-Since高
            若服务器的资源最后被修改时间大于If-Modified-Since的字段值，则重新返回资源，状态码为200；否则则返回304，代表资源无更新，可继续使用缓存文件
19、一个数组有100个对象，每个对象都有一个id属性，怎么根据id去重复，并且效率要高
  function noRepeat(arr){
            let arrList=[];
            let array=[];
           for( let i in arr){
            if(arrList.indexOf(arr[i].id)===-1){
                    arrList.push(arr[i].id);
                    array.push(arr[i])
                }  
           }              
        }
20、网页输入url以后敲回车发生了什么
    1、解析url
    http://www.haapmall.com:80/get-data.do?product=1#title
    协议      域名        端口号    路径      参数    哈希
    域名用来查找服务器位置
    http默认端口80
    https默认端口443
    路径：服务器接到请求后按这个路径定位资源位置
    2、DNS查询(域名系统)
    把域名转化为ip地址
    浏览器——>通过域名——>DNS缓存+DNS服务器——>返回IP地址
    3、资源请求
    浏览器通过request头+参数向后端服务器进行请求返回status+response-header+body
    4、浏览解析
    理想模型
    DOM遇到js,js先解析，解析后继承构造DOM树，之后构建渲染树，布局确定
*21、跨域以及跨域的解决方法？
什么是跨域？
在浏览器同源策略限制下，向不同源(不同协议、不同域名或者不同端口)发送XHR请求，浏览器认为该请求不受任何信任，禁止请求具体表现为请求后不正常响应。
所谓同源是指，域名、协议、端口均相同。
解决办法：
1、代理配置
2、jsop(只适用于get请求)
jsonp原理是html中的link，href,src属性都不受跨域影响的，link可以调用
远程的css文件，href可以链接到随便的url上。图片的src可以随意引用图片
，scriptde src属性可以随意引入不同源的js文件。jsonp?callback=func1，或者用jquery的$.getJSON或者jquery的ajax请求的方法
3、CORS(跨资源共享)W3C新标准，浏览器检测到响应头的一些字段的值后，跳过同源策略
有哪些响应头字段，以及它们分别是怎么定义的？
// 前端设置是否带cookie
xhr.withCredentials = true;

//服务端设置
 res.header("Access-Control-Allow-Origin", "*"); //允许全部域名跨域，可以指定特点域名，逗号分隔

  res.header("Access-Control-Allow-Credentials", "true"); //允许携带cookie

  res.header("Access-Control-Allow-Headers", "X-Requested-With"); //允许传输的请求头

  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS"); //允许发送的xhr模式

  res.header("X-Powered-By", " 3.2.1"); //快速模式

  res.header("Content-Type", "application/json;charset=utf-8"); //类型及字符编码
4、postMessage
postMessage指发送消息
发送：
window.postMessage('我要发送的消息','指定域名，*表示不管什么域名只要在同一个window就给它发送消息');
接收消息：window.addEventLinstener('message',function(res){
    console.log(res);
});接收到的数据在data中
这种跨域的局限性在于必须在同一个winodw对象上，也就是说哪个window发送消息只有当前window才可以接收到
5、通过修改document.domain来夸字域
上述方法只能解决请求跨域，而无法解决跨域操作dom,操作dom必须两个域名属于同一个基础域名，而且所用的协议，端口都要一致。



22、深拷贝浅拷贝以及es6\es5的实现方法
浅拷贝是按位拷贝对象，它会创造一个新对象，赋值原对象的属性，如果是基本类型就是值引用类型就是内存地址。浅拷贝只复制某个对象的指针不是复制对象本身。
深拷贝是拷贝对象的具体内容，内存地址是自主分配的，拷贝后两个对象的值一样但是地址不一样，互不影响。
赋值就是使用同一个内存地址，复制在栈中的地址
浅拷贝的方法：1、Object.assign()注意：只有一层的时候是深拷贝2、结构赋值{...Arr}
3、Array.prototype.concat()4、Array.prototype.slice()
深拷贝的方法：1、JSON.parse(JSON.stringify()) ,用JSON.stringify()将对象转成JSON字符串，再用JSON.parse()把字符串解析成对象，该对象会开辟新的栈，实现深拷贝。
JSON.prase(JSON.stringfy())的缺陷
1、如果obj里面有时间对象，则JSON.stringify后再JSON.parse的结果，时间将只是字符串的形式。而不是时间对象；
2、如果obj里有RegExp、Error对象，则序列化的结果将只得到空对象；
3、如果obj里有函数，undefined，则序列化的结果会把函数或 undefined丢失；
4、如果obj里有NaN、Infinity和-Infinity，则序列化的结果会变成null
5、JSON.stringify()只能序列化对象的可枚举的自有属性，例如 如果obj中的对象是有构造函数生成的， 则使用JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的constructor；

2、手写递归实现深度克隆：
递归实现深度克隆的原理：遍历对象、数组直到里面都是基本数据类型，然后再去复制就是深度拷贝
内存溢出(Out Of Memory，简称OOM)是指应用系统中存在无法回收的内存或使用的内存过多，最终使得程序运行要用到的内存大于能提供的最大内存。此时程序就运行不了，系统会提示内存溢出   
普通版本：function clone(target) {
    if (target &&typeof target === 'object') {
        let cloneTarget = Array.isArray(target) ? [] : {};
        for (const key in target) {
            cloneTarget[key] = clone(target[key]);
        }
        return cloneTarget;
    } else {
        return target;
    }
};

进阶版本：
function  deepClone(data) {
      const type = this.judgeType(data);
      let obj;
      if (type === 'array') {
        obj = [];
      } else if (type === 'object') {
        obj = {};
      } else {
    // 不再具有下一层次
        return data;
      }
      if (type === 'array') {
        // eslint-disable-next-line
        for (let i = 0, len = data.length; i < len; i++) {
          obj.push(this.deepClone(data[i]));
        }
      } else if (type === 'object') {
        // 对原型上的方法也拷贝了....
        // eslint-disable-next-line
        for (const key in data) {
          obj[key] = this.deepClone(data[key]);
        }
      }
      return obj;
    }


function  judgeType(obj) {
  // tostring会返回对应不同的标签的构造函数
      const toString = Object.prototype.toString;
      const map = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regExp',
        '[object Undefined]': 'undefined',
        '[object Null]': 'null',
        '[object Object]': 'object',
      };
      if (obj instanceof Element) {
        return 'element';
      }
      return map[toString.call(obj)];
    }


26、怎么用effectState实现ComponentDidiMount()方法？
27、react怎么渲染的页面
28、promise.all怎么用promise实现
let PromiseAll = (promises)=>{
    return new Promise((resolve, reject)=>{
        let results = new Array(promises.length)
        for(let i=0;i<promises.length;i++){
            let promise = promises[i]
            promise.then(res => {
            results[i] = res
            if(i === promises.length-1){
                   resolve(results)
                }
            }).catch(err => {
                    reject(err)
            })
        }
    })
}
29、Array.from()可以将set结构转化为数组
30、为什么react修改了一个值为什么会重绘？
31、react怎么实现双向数据绑定
32、单独把jsx抽出来当文件写，ejs模版语法跟es6的模版字符串有什么区别？

33、XSS\CSRF攻击
xss:跨站脚本攻击，指攻击者在网页上注入恶意的客户端代码，通过恶意的脚本对客户端网页进行篡改， 转义如：&lt
从而在用户浏览网页时，对客户端浏览器进行控制或获取用户隐私数据的方式。
防范：httpOnly防止截取cookie、用户输入检查、用户输出检查、利用CSP(浏览器的内容安全策略)
1、转义：
  str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/"/g, "&quot;");
    str = str.replace(/'/g, "&#39;");
CSRF
1、get请求不对数据进行修改

　　2、不让第三方网站访问到Cookie，安全地使用 Cookie，设置Cookie为HttpOnly，禁止JavaScript操作Cookie；

　　3、阻止第三方网站请求接口，不要信任任何传入的第三方数据，使用 CORS，设置 Access-Control-Allow-Origin；

　　4、请求时附带验证信息，比如验证码或者Token

　　5、防止网页被其他网站内嵌为iframe，服务器端设置 X-Frame-Options 响应头，防止页面被内嵌。
2、浏览器自带防御 (X-SS-Protection)响应头，当浏览器检测到跨站脚本攻击XS时，浏览器将停止加载页面。这种自带的防御功能只对反射型XSS有一点防御功能。
3、内容安全策略(CSP)
内容安全策略实际就是白名单制度，开发者明确告诉客户端，哪些资源可以加载执行增加网页的安全性。
一种是 HTTP头信息Content-Security-Policy
Content-Security-Policy: script-src 'self'; 
                         object-src 'none';
                         style-src cdn.example.org third-party.org; 
                         child-src https:
一种是通过网页的 <meta> 标签
<meta http-equiv="Content-Security-Policy" content="script-src 'self'; object-src 'none'; style-src cdn.example.org third-party.org; child-src https:">
脚本：只信任当前域
<object>标签：不信任任何url,即不加载任何资源
样式表：只信任cdn.example.org和third-party.org
页面子内容：如<frmae>、<iframe>:必须使用HTTPS协议加载
其他资源：没有限制
启用后，不符合的外部资源都会被阻止加载。
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
csrf跨站请求防伪，未经用户许可，偷偷的使用用户名义，执行非本意的操作的攻击方法。通常情况下借助用户cookie来骗取服务器信任。
防范：验证码、后端判断referer是否合法、增加token验证。
不同域的网站是拿不到token的，所以也就防止了csrf了。
例子：简单的说，就是利用游览器对用户的信任，比如，用户已经登录了ww.aaa.com，自然aaa这个网站就会将用户的登录状态session存在cookie中；
然后，aaa.com这个网页有一个对作品点赞的功能，点赞提交地址为aaa.com/api.like?id=777；
这时，另外一个叫www.bbb.com的网站，放了这样一个元素<img src="aaa.com/api.like?id=888">，这样的话，一旦用户进入这个bbb.com页面，就会请求aaa.com这个网站的点赞接口，而且点赞的用户对象是888；
最后因为用户的登录信息尚未过期，那就等于给id为888这个作品点赞了，然而，用户并不知情。

34、hook业务用法，高阶组件的业务用
高阶组件：
如何在高阶组件中获取到WrappedComponent组件的实例呢？
通过WrappedComponent组价的ref实例，该属性会在组件componentDidMount的时候执行ref
的回调函数并传入该组件的实例。
React.cloneElement也是创建的jsx语法，第一个参数是react元素
**高阶组件存在的问题
·静态方法丢失 解决方案 hoist-non-react-statics可以自动拷贝所有非React的静态方法
·refs属性不能透传 解决方法：react提供了一个名为React.forwareRef的API来解决
·反向继承不能保证完成的子组件被继承
高阶组件需要注意：
props 保持一致
·你不能在函数式（无状态）组件上使用 ref 属性，因为它没有实例
·不要以任何方式改变原始组件 WrappedComponent
·透传不相关 props 属性给被包裹的组件 WrappedComponent
·不要再 render() 方法中使用高阶组件 因为调用高阶函数的时候每次会返回一个新的组件
每次render的时候，都会使子对象书完全被卸载和重新加载，重新加载一个 组件会引起原有组件的 状态和它的子组件丢失。
·使用 compose 组合高阶组件 提高代码的可读性和逻辑清晰度
·包装显示名字以便于调试
应用场景：用户权限以及页面加载

hook的使用：
1、useState可以记性独立声明但是不能使用在判断语句中，react在react-hook中的执行是按照顺序来的。
2、useEffect,Effect Hook 可以让你在函数组件中执行副作用操作副作用，主要函数操作以外的作用比如数据请求，dom绑定等
useEffect代替声明周期函数的方法：
 `React首次渲染和之后的每次渲染都会调用一遍useEffect函数，而之前我们要用两个生命周期函数分别表示首次渲染(componentDidMonut)和更新导致的重新渲染(componentDidUpdate)。

 `useEffect中定义的函数的执行不会阻碍浏览器更新视图，也就是说这些函数时异步执行的，而componentDidMonut和componentDidUpdate中的代码都是同步执行的。个人认为这个有好处也有坏处吧，比如我们要根据页面的大小，然后绘制当前弹出窗口的大小，如果时异步的就不好操作了。
 `componentWillUnmount可以理解为解绑副作用
 通过返回函数的形式进行解绑
 useEffect的第二个参数是，改值状态变化时进行解绑
 useContent 解决父子组件传值的问题：状态全局化并能统一管理
 userReducer解决状态共享的问题：更新复杂逻辑状态，控制业务逻辑
 useMemo用来解决使用React hooks产生的无用渲染的性能问题（重复渲染的问题）。使用function形式声明组件，失去了shouldComponentUpdate这个声明周期，也就是说现在无法通过更新前条件来决定组件是否更新。而且在函数组件中，也不再区分mount和update两个状态，这意味着函数组件的每一次调用都会执行内部的所有逻辑会带来很大的性能问题，useMemo和useCallback可以解决上诉性能问题。

useRef：
作用：1、获取元素 2、保存变量

自定义hook函数要用use来开头
useCallback缓存方法
useEffect、useMemo、useCallback都是自带闭包的。也就是说，每一次组件的渲染，其都会捕获当前组件函数上下文中的状态(state, props)，所以每一次这三种hooks的执行，反映的也都是当前的状态，你无法使用它们来捕获上一次的状态。对于这种情况，我们应该使用ref来访问。
 ****
 1、是不是写不写第二个参数都会存在解绑
 2、存在多个值的情况下面怎么使用useContext
 3、为什么要用useCallback来缓存方法


35、webpack配置用法
36、hash路由和broswer路由的区别
37、Object的hasOwnProperty()方法返回一个布尔值，判断对象是否包含特定的自身(非继承)属性。
38、合并对象的方法：
Object.assign(target，obj); 
第一个参数是目标对象，后面的参数都是源对对象。注意：如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。
39、判断是不是数组 Array.isArray()；
40、React.createElement()和React.cloneElement();
41、编写一个函数讲[3,5,7,21,8,9,05,23,15,5,1,5,8]这样一个数组中重复的元素去掉

方法：

1） const removSame=(arr)=>{

            let setVal=new Set(arr);

            return [...setVal];

        }

2）const removSame=(arr)=>{

            let setVal=new Set(arr);

            return Array.from(setVal);//讲set类型转化为数组

        }

3） function remov(arr){

           var list=[];

           var arrs=[];

           for( k in arr){

               if(list[arr[k]]===undefined){

                list[arr[k]]=true;

                arrs.push(arr[k]);

               }

           }

       }

42、编写一个正则表达式，用于验证合法的URL，比如 https://www.aliyun.com/;编写一个 正则表达式讲URL的二级域名提取出来，比如，https://www.aliyun.com/提取aliyun



43、根据提示代码中的内容，写出这些代码按次打印出的结果，并在每个结果后面从promise特性的角度阐述为什么打印出来会是这样的结果。

// var p1 = Promise.resolve(1);

// var p2 = Promise.resolve(p1);

// var p3 = new Promise(function (resolve, reject) {

//  resolve(1);

// });

// var p4 = new Promise(function (resolve, reject) {

// console.log('success')

//  resolve(p1);

// });

// console.log(p1 === p2);

// console.log(p1 === p3);

// p4.then(function (value) {

//  console.log('p4=' + value);

// });

// p2.then(function (value) {

//  console.log('p2=' + value);

// });

// p1.then(function (value) {

//  console.log('p1=' + value);

// });

event Loop(事件线):
什么是event Loop?
计算机的运行机制，是一个程序结构，用于等待和发送消息、事件。
在程序中设置两个线程：一个负责程序本身的运行，称为“主线程”；另一个负责主线程与其他进程
(主要是各种I/O操作)的通信，被称为Event Loop线程。
什么是宏任务？什么是微任务？有什么区别？
概念：
宏任务：当前调用栈中执行的代码称为宏任务。
微任务：当前(此次事件循环中)宏任务执行完成，在下一个任务开始之前需要执行的任务，可以理解为回调事件。
注意：宏任务中的事件放在callback queue中，由事件触发线程维护；微任务事件凡在微任务队列中，由js引擎线程维护。
运行机制：
整体的同步任务代码执行完后，就会先执行微任务队列中的任务，等待微任务队列中的所有任务执行完毕后
1、在执行栈中执行一个宏任务
2、执行过程中遇到微任务，将微任务添加到微任务队列中
3、当前宏任务执行完毕，立即执行微任务队列中的任务。
当前微热任务队列中的任务执行完毕，检查渲染，GUI线程接管渲染。
5、渲染完毕后，js线程接管，开启下一次事件循环，执行下一次宏任务(事件队列中取)
宏任务有：
· setTimeout
· setInterval
· setImmediate(Node独有)
· requestAnimationFrame(浏览器独有)
· I/O(输入/输出)
· UI rendering(浏览器独有)
微任务有：
· process.nextTick(Node独有)
· Promise
· Object.observe
· MutationObserver
44、实现一个简单的画板，要求画板可以实现鼠标滑动绘制简单的细线

canvas

45、promise的实现以及使用

46、for in 和for of的区别

for...in循环读取键名，for...of循环读取键值。如果要通过for...of循环，获取数组的索引，可以借助数组实例的entries方法和keys方法。

etarr=[3,5,7];arr.foo='hello';for(letiinarr){console.log(i); // "0", "1", "2", "foo"}for(leti of arr){console.log(i); // "3", "5", "7"}

for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。这一点跟for...in循环也不一样
47、import css和link css的区别
48、懒加载怎么实现？
49、请求头带有哪些？
50、async await 和promise的关系？
51、什么是微前端，微前端怎么实现？
52、react有哪些api
53、什么时候用高阶组件
54、css优化
55、判断数据类型
 typeof 、instanceof、Object.prototype.toString.call()
56、新增数据
push()从后面增加数据数据，pop()从后面删除数据数据
unshift()从头增加数据，shift()从头删除数据
57、await怎么请求多个接口
58、什么是js异步编程回调地狱
出层层嵌套的回调函数，如果嵌套过多，会极大影响代码可读性和逻辑

59、MVVM是什么，对应react的那些部分？
MVVM是Model-View-ViewModel的简写，MVVM 就是将其中的View 的状态和行为抽象化，让我们将视图 UI 和业务逻辑分开。
 M(odel)：对应组件的方法或生命周期函数中实现的业务逻辑和this.state中保存的本地数据，如果React集成了redux +react-redux，那么组件中的业务逻辑和本地数据可以完全被解耦出来单独存放当做M层，如业务逻辑放在Reducer和Action中。
 V(iew)-M(odel)：对应组件中的JSX，它实质上是Virtual DOM的语法糖。React负责维护 Virtual DOM以及对其进行diff运算，而React-dom 会把Virtual DOM渲染成浏览器中的真实DOM
 View：对应框架在浏览器中基于虚拟DOM生成的真实DOM（并不需要我们自己书写）以及我们书写的CSS
绑定器：对应JSX中的命令以及绑定的数据，如className={ this.props.xxx }、{this.props.xxx}等等
PureComponent是通过浅比较还是深比较？
是浅比较(深比价需要用大量的递归影响性能所以折中使用浅比较)，当然副作用就是，仍可能出现没有必要的重新渲染
60、为什么建议setState第一个参数使用函数？
因为this.props和this.state可能会异步更新，所以不能再setState中通过传递对象的方式来更新
react会把更新state的函数加入到一个队列里面，然后按照函数的顺序依次调用。同时，为每个函数传入state的前一个状态，这样，就能更新state了。
会对对象进行批量处理，对相同变量进行的多次处理会合并为一个，并以最后一次结果为准
this.setSate((prevState,props)=>{
    return {
        age:prevState.age+1
    }
})
61、async await怎么做并发请求
62、node做请求
63、useCallback和useMemo，在组件第一次渲染的时候执行，之后会依赖变量再次执行，之后会在其变量发生改变时进行二次执行，并且这两个hooks都返回缓存的值，useMemo返回缓存的变量，useCallback返回缓存的函数
64、数组平铺的方法
递归判断是否是数据 转化为字符串join()方法 
65、js实现回文
用reverse()反转之后比较
66、css的隐藏元素的方法
display:none;会使元素不存在导致重排和重绘
visibility:hidden；元素在页面消失后，元素还在会产生重绘
opacity:0; 元素透明
67、https是怎么加密传输的，在传输过程中什么加密了，cookie可以加密嘛，怎么加密，加密了什么
68、promise的实现以及3中状态
69、https\http1.1\http2
70、loader和plugin分别作了什么说一下
71、webpack优化，怎么优化打包速度和打包体积 和rollup以及gulp的区别 分别适合用在什么场景还有有缺点
72、css 布局html一些基础标签 js闭包 原型链
73、网络安全 性能优化 前端工程化
74、前端监控、用户行为分析、前端性能优化
75、自己踩过的坑比如兼容性的问题
76、实现1px的优化
77、css选择器的几种方法
78、
https的传输过程
在服务器端存在一个公钥及私钥
客户端从服务器取得这个公钥
客户端产生一个随机的密钥
客户端通过公钥对密钥加密（非对称加密）
客户端发送到服务器端
服务器端接受这个密钥并且以后的服务器端和客户端的数据全部通过这个密钥加密
https加密除了ip和端口号都进行了数据加密
https和http的区别
https需要证书。
http是超文本传输协议，是明文传输，https则是具有安全性的ssl加密传输协议。
http和https使用的端口不同，前者是80，后者是443。
http的连接很简单，无状态；HTTPS是由SSL+HTTP构建的可进行加密传输、身份认证的网络协议，比http协议安全。
79、apply\call\bind的区别
apply跟call的区别是apply的第二个参数必须是一个包含多个参数的数组（或类数组对象）
绑定都是指向第一个参数的
80\instaceof的用法

81\实现promise
promise的使用方法
promise默认传入exectutor执行器 立即执行。
promise提供两个方法reslove和reject.
promise实例生成后，可以用then方法分别指定resloved状态和rejected状态的回调函数.
promise是异步编程的一种解决方案，解决多个异步方法串行的问题，比如回调地狱等.所谓的promise，简单地说就是一个容器，里面保存着某个未来才会结束的事件，从语法说promise是一个对象，从他可以获取异步操作的消息。

/1.exectutor执行器 立即执行
//三种状态默认是等待态 resolve成功态  reject失败态

const PENDING='PENDING'
const RESOLVE='RESOLVE'
const REJECT='REJECT'
class Promise{
    constructor(exectutor){
        //成功状态的取值
        this.success_val=undefined;
        //失败状态的取值
        this.error_val=undefined;
        //状态
        this.status=PENDING;
        //成功回调
        let resolve=(val)=>{
            //判断如果是等待态 将状态赋值 不能再修改状态
            if(this.status===PENDING){
                this.success_val=val;
                this.status=RESOLVE;
            }
        }
        //失败回调
        let reject=(err)=>{
            //同上
            if(this.status===PENDING){
                this.error_val=err;
                this.status=REJECT
            }
        }
        try{
           exectutor(resolve,reject)
        }catch(err){
            //如果是 throw err直接手动调用reject
           reject(err)
        }
    }
    then(successFn,errFn){
        //then会传入两个回调函数 一个成功一个失败
        //如果状态是成功态 successFn执行
        if(this.status===RESOLVE){
            successFn(this.success_val)
        }
        //反之
        if(this.status===REJECT){
            errFn(this.error_val)
        }
    }
}
82、axios实现并行请求
axios.all([]).then(res);
res为返回的请求结果
例子：
let urls = [
          'https://jsonplaceholder.typicode.com/posts/1',
          'https://jsonplaceholder.typicode.com/posts/2',
          'https://jsonplaceholder.typicode.com/posts/3'
        ]
       let axiosList = []
        urls.forEach(url => {
         axiosList.push(axios.get(url))
        })
       axios.all(axiosList).then(function (res) {
         let p1 = (res[0].data)
         let p2 = (res[1].data)
         console.info(p1)
         console.info(p2)
       })
83、instanceof判断数据类型
typeOf NULL 返回的是一个object 是一个bug
typeOf undedined 返回的是一个 undedined
instanceof就是通过判断对象的原型琏中是否存在构造函数的prototype来判断类型
instanceof在判断数组是，即会把数组当做Array类型，又会把数组当做Object类型，都会返回true constructor，能严格区分数组和对象
84、前端性能优化

85、浏览器兼容性问题
E条件注释（Conditional comments）是IE浏览器私有的代码
86、toString() 方法可把一个 Number 对象转换为一个字符串,并返回结果
87、react-router怎么传参数
们可以给<Route>指定一个path，然后指定通配符可以携带参数到指定的path，然后通过this.props.param去获取
88、变量是怎么存储的
对象
在栈内存中存储着变量名和变量地址，堆内存中存着对象的值
普通变量
在栈内存中存储着变量名和变量值，堆内存中存着对象的值
89、高阶组件怎么获取ref里面的值
90、函数组件跟class组件的区别以及使用
因为类组件使用的时候要实例化，而函数组件直接执行函数取返回结果即可。
为了提高性能，尽量使用函数组件。
函数组件没有this,没有生命周期，没有状态state,
类组件有this,有生命周期，有状态state。
91、react配置什么可以实现按需加载
92、react怎么获取表单的数据
93、hook的优点以及缺点
清爽的代码风格以及代码量更少
需要响应式的useEffect
94、babel-loader的作用
babel-loder用来处理把es6转化为js语言
babel-preset
95、前端性能优化
要提高前端的性能可以从如下几个方面入手：

1)、尽量减少HTTP请求数量
2)、压缩
3)、缓存
4)、使用内容发布网络（CDN的使用）
5)、DNS Prefetch
6)、将CSS样式表放在顶部
7)、将javascript脚本放在底部
8)、使用外部javascript和CSS
9)、避免重定向
96、useMemo返回的是计算的结果值，用于缓存计算后的状态
useCallback返回的是函数，主要用来缓存函数，因为函数式组件中的state的变化都会导致整个组件被重新刷新（即使一些函数没有必要被刷新），此时用useCallback就会将函数进行缓存，减少渲染时的性能损耗
97、react的优化做了什么
98、setState的回调函数什么时候执行
setState((state,props)=>{})的回调函数在state更新完毕后执行
setState是同步的还是异步的 
在React中， 如果是由React引发的事件处理（比如通过onClick引发的事件处理），调用setState不会同步更新this.state，除此之外的setState调用会同步执行this.state 。所谓“除此之外”，指的是绕过React通过addEventListener直接添加的事件处理函数，还有通过setTimeout/setInterval产生的异步调用。
原因： 在React的setState函数实现中，会根据一个变量isBatchingUpdates判断是直接更新this.state还是放到队列中回头再说，而isBatchingUpdates默认是false，也就表示setState会同步更新this.state，但是，有一个函数batchedUpdates，这个函数会把isBatchingUpdates修改为true，而当React在调用事件处理函数之前就会调用这个batchedUpdates，造成的后果，就是由React控制的事件处理过程setState不会同步更新this.state 。
99、传输控制协议（Transmission Control Protocol，TCP）是一种面向连接的、可靠的、基于字节流的运输层通信协议，通常由IETF的RFC 793说明。在简化的计算机网络OSI模型中，它完成运输层所指定的功能。
100、父组件怎么调用子组件的方法
webpack打包jsx的过程

怎么打包其他后缀的文件

为什么要有hook，hook的setXXX是异步更新：
1、生命周期化作钩子，可以在函数组件内自由使用，逻辑聚合、复用方便；
2、自定义hook代替高阶组件，更优雅简洁；
3、不用声明繁杂的类组件，不需要this，可以简化一些代码；

两个子域怎么交互cookie值

怎么挂载到body上面

weakMap的使用
主要要突出自己的两点，自己优化过什么东西
新的生命周期是什么？
怎么用git进行的合作开发

flex的一些属性的使用

react实现懒加载以及分页

const定义的引用类型怎么冻住变量不给属性赋值：
Object.freeze()冻结const定义的变量

less怎么定义全局的变量以及使用：
style-resources-loader
暴露webpack配置文件 npm run eject
gulp跟webpack的区别：
gulp是工具链、构建工具，可以配合各种插件做js压缩，css压缩，less编译 替代手工实现自动化工作
webpack是文件打包工具，可以把项目的各种js文、css文件等打包合并成一个或多个文件，主要用于模块化方案，预编译模块的方案，它是预编译的，不需要在浏览器中加载解释器
三栏布局的实现

从浏览器返回html到渲染出页面，中间的优化点，重排重绘涉及的优化

promise.all()请求多个接口有一个接口请求失败怎么处理
axios.all()请求多个接口

.catch后面可以跟.then嘛？可以，为什么？
因为返回的是promise对象

react组件较深级别传值的方法
context方法
redux为什么要把reducer设计成纯函数：
因为redux把reducer设计成只负责这个作用，所以reducer的职责不允许有副作用，副作用简单来说就是不确定性，如果reducer有副作用，那么返回的state就不确定。
实现模糊搜索：
react-router的原理：
路由（routing）是指分组从源到目的地时，决定端到端路径的网络范围的进程
继承的几种方法？：
1、将父类的实例作为子类的原型(原型链继承)
2、使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）（构造函数继承）就是用call方法绑定this
3、为父类实例添加新特性，作为子类实例返回
4、通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点(寄生组合继承)
function Cat(name){
  Animal.call(this);
  this.name = name || 'Tom';
}
(function(){
  // 创建一个没有实例方法的类
  var Super = function(){};
  Super.prototype = Animal.prototype;
  //将实例作为子类的原型
  Cat.prototype = new Super();
})();

// Test Code
var cat = new Cat();
console.log(cat.name);
console.log(cat.sleep());
console.log(cat instanceof Animal); // true
console.log(cat instanceof Cat); //true
Cat.prototype.constructor = Cat; // 需要修复下构造函数

用户名密码的加密
hook的数据请求跟下发写在哪里

webpack3.x的 版本
ant4.0 部分组件开始使用 hooks进行重构
react在IE下需要进行配置什么
js实现bind
react为什么移除那些生命周期
hook的设计理念，hook的规则原理
自定义loader写过嘛
https跟http的区别
http的请求头的组成
cookie的作用
cookie的新的属性
怎么阻止第三方攻击
设计一个秒杀页面会想到哪些场景和应对方式


1、接口处理
2、权限处理：
通过劫持渲染以及权限透传
抽离路由
DOMContentLoaded不同的浏览器对其支持不同，所以在实现的时候我们需要做不同浏览器的兼容。

1）支持DOMContentLoaded事件的，就使用DOMContentLoaded事件；

2）IE6、IE7不支持DOMContentLoaded，但它支持onreadystatechange事件，该事件的目的是提供与文档或元素的加载状态有关的信息。

3)  更低的ie还有个特有的方法doScroll， 通过间隔调用：document.documentElement.doScroll("left");

  可以检测DOM是否加载完成。 当页面未加载完成时，该方法会报错，直到doScroll不再报错时，就代表DOM加载完成了。该方法更接近DOMContentLoaded的实现。
  使用hash-router


  1、本地数据复制到网页上
  2、三张表格联动功能
  3、温度海洋
  this.$axios.all([getUserAccount(),getUserPermissions()])
  .then(axios.spread(function(res1,res2){
    //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
}))
react中英文切换
实现批量上传