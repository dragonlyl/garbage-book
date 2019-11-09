# jquery部分笔记

## xx.text();xx.html();xx.val()

前者返回、设置所选元素的文本内容；中间用来返回、设置所选元素的内容（包括html标记）例如里面如果有span标签也会将标签返回； 后者用来返回、设置表单字段的值（例如input的value）；

设定值的话就在括号里面写入就值就行了
.text('文本内容'); .html("<span>hello world</span>")

上面的三个 jQuery 方法：text()、html() 以及 val()，同样拥有回调函数。回调函数由两个参数：被选元素列表中当前元素的下标，以及原始（旧的）值。然后以函数新值返回您希望使用的字符串。
// i 是被选中的值得下标 ； origText是之前标签里面的值
`.text(function(i,origText){
    return "Old text: " + origText + " New text: Hello world!
    (index: " + i + ")";
});`

## xx.attr('href');用来获取元素的href属性的值

`.attr("href","http://www.w3school.com.cn/jquery");`

`.attr({
    "href" : "http://www.w3school.com.cn/jquery",
    "title" : "W3School jQuery Tutorial"
  });`

## 添加元素

append() - 在被选元素的结尾插入内容
prepend() - 在被选元素的开头插入内容
after() - 在被选元素之后插入内容
before() - 在被选元素之前插入内容

## 删除元素

如需删除元素和内容，一般可使用以下两个 jQuery 方法：

remove() - 删除被选元素（及其子元素）
empty() - 从被选元素中删除子元素

## 修改类

addClass() - 向被选元素添加一个或多个类
removeClass() - 从被选元素删除一个或多个类
toggleClass() - 对被选元素进行添加/删除类的切换操作
css() - 设置或返回样式属性

## 查看css

$("p").css("background-color");// 获取background-color的属性值

$("p").css("background-color","yellow"); // 设置属性值

css({"propertyname":"value","propertyname":"value",...});// 设置多个属性值

## 元素尺寸

width()   返回元素的宽度（不包括内边距、边框或外边距）
innerWidth()  返回元素的宽度（包括内边距）
outerWidth()  返回元素的宽度（包括内边距和边框）
outerWidth(true) 方法返回元素的宽度（包括内边距、边框和外边距）。

## $each()

$(selector).each(function(index,element))
$.each(arr,function(index,element)) // index 序号， element 当前元素

## 获取子节点

$("#test1").parent(); // 父节点
$("#test1").parents(); // 全部父节点
$("#test1");//返回class为mui-content的父节点
$("#test").children(); // 全部子节点
$("#test").children("#test1"); //返回id为test1的子节点
$("#test").contents(); // 返回id为test里面的所有内容，包括节点和文本
$("#test").contents("#test1"); //返回id为test里面的id为#test1的节点和文本
$("#test1").prev();  // 上一个兄弟节点
$("#test1").prevAll(); // 之前所有兄弟节点
$("#test1").next(); // 下一个兄弟节点
$("#test1").nextAll(); // 之后所有兄弟节点
$("#test1").siblings(); // 所有兄弟节点
$("#test1").siblings("#test2"); //返回id为test2的兄弟节点
$("#test").find("#test1"); 选中id为test后代中 id为test1的节点

## 添加方法

document.getElementById("myBtn").addEventListener("click", function(){
    document.getElementById("demo").innerHTML = "Hello World";
});

最后一个值： 可选。
布尔值，指定事件是否在捕获或冒泡阶段执行。
可能值:
true - 事件句柄在捕获阶段执行
false- false- 默认。事件句柄在冒泡阶段执行

## eq的使用

`<a class="a"></a><a class="a"></a><a class="a"></a>`
$('.a')  // 选择了3个a，都是jq对象（可以用jq的属性、方法）
$('.a').eq(1) // 选择了第二个a，是jq对象（不可以使用dom属性方法，可以用jq的属性、方法）
$('.a')[1]  // 选择了第二个a，是dom对象（可以使用dom属性，方法，不可以使用jq属性方法）
$('.a').eq(1)[0]  // 选择了第二个a，并且转化成都是dom对象（可以使用dom属性，方法，不可以使用jq属性方法）

## prop()的使用

prop() 方法设置或返回被选元素的属性和值。
当该方法用于返回属性值时，则返回第一个匹配元素的值。
当该方法用于设置属性值时，则为匹配元素集合设置一个或多个属性/值对。

## 判断数组是否存在某个元素

$.inArray(index, _aCurRelatedDevIdList) >= 0;

