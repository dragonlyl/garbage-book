# 事件

1. IE的事件流叫冒泡 Netscape的事件流叫事件捕获DOM事件流 三个过程 事件捕获阶段 ,处于目标阶段 和事件冒泡阶段 (即先捕获发生事件的元素 ,然后响应事件冒泡的形式)

2. 事件处理程序 以on开头 响应click就叫onclick

3. event事件

4. 客户区坐标 ,页面坐标 ,屏幕坐标 client page sreen

若在html 标签绑定onclick会使得html 和js高度耦合 所以采用js声明事件 比较好

1. DOM0级事件处理程序
xx.onclick = function (){} ; //这里面的this指代的是访问元素
通过 xx.onclick = null ;// 来删除事件处理程序

2. DOM2级事件处理程序
xx.addEventListener('click',function(){});//接收三个参数 ,最后一个是布尔值,如果是true表示在捕获阶段调用处理函数;false表示在冒泡阶段调用事件处理函数 (建议 不要再事件捕获阶段注册事件处理程序  ,如果第三个参数不传, 默认是冒泡阶段注册)
通过xx.removeEventListener() ;//来移除 (传入的参数必须与添加事件传入的参数一致, 所以匿名函数事件无法被移除  )

3. IE可能有点不同
xx.attachEvent('onclick',function(){}) 和xx.detachEvent ; 这里的事件是onclick 而不像上面的是click  
这种方法与DOM0 的区别在于  方法内部的this 指向的是全局 , 而不是所在元素
与DOM2 的区别在于  ,同时添加两个不同的时间处理程序 ,后添加的先触发

## 事件对象

event 可以用event.type 来判断事件的类型 'click'
在事件对象中 this 始终等于 currentTarget的值, 如果将事件处理程序制定给目标元素,则this,currentTarget 和target包含相同的值
即 event.currentTarget  == this  (如果点击的恰是监听的元素,则 event.target也与前面两个是相等的)

其中 event.cancelable 用来表明是否可以取消事件的默认行为 event.preventDefault() 来取消默认事件
用stopPropagation() 方法 来停止事件的冒泡

用eventPhase属性可以判断 现在的事件处于 事件流的哪个阶段  1.捕获  2.目标 3.冒泡

IE的event 有点不同
使用  window.event 获取的 (所以下面的event都表示的是window.event),
但是如果ie的事件是通过attachEvent添加的 ,那么会有一个event对象被作为参数传入函数中,但用window.event也可以拿到

IE 的 window.event.srcElement 可以获取 事件目标(与DOM的target属性相同)
window.event.returnValue属性 等价于 preventDefault() 方法
window.event.cancelBubble 属相等价于 stopPropagation()方法

鼠标位于 视口中的位置 event.clientX 和 event.clientY
鼠标位于 页面中的位置(页面没有滚动情况等于视口中的位置) event.pageX event.pageY  
      但是在IE8 没有这个属性 所以要用 clientX 和 scrollLeft相加 document.body.scrollLeft || document.documentElement.scrollLeft
鼠标位于 电脑屏幕的位置 event.screenX 和 event.screenY
