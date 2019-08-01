# 前端基础篇之CSS世界

https://juejin.im/post/5ce607a7e51d454f6f16eb3d

流体布局之下，块级元素的宽度width: auto是默认撑满父级元素的。这里的撑满并不同于width: 100%的固定宽度，而是像水一样能够根据margin不同而自适应的宽度。

正常流下，如果块级元素的width是个固定值，margin是auto，则margin会撑满剩下的空间；如果margin是固定值，width是auto，则width会撑满剩下的空间。这就是流体布局的根本所在。

阻止margin合并，可以：

1. 给元素设置 bfc；
2. 设置border或padding阻隔margin；
3. 用内联元素（如文字）阻隔；
4. 给父元素设定高度。

## BFC：Block Formatting Contexts（块级格式化上下文）

Formatting context （格式化上下文） 是W3C CSS2.1规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

### 触发BFC

只要元素满足下面任一条件即可触发BFC特性：
body根元素
浮动元素：float除none以外的值
绝对定位元素：position（absolute、fixed）
display为inline-block、table-cells、flex
overflow除了visible以外的值（hidden、auto、scroll）

### BFC 布局规则

内部的Box会在垂直方向，一个接一个地放置。
**Box垂直方向的距离由margin决定**。属于同一个BFC的两个相邻Box的margin会发生重叠
// 项目上发现 用overflow：hidden可以展示margin-bottom
每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
BFC的区域不会与float box重叠。
BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
计算BFC的高度时，浮动元素也参与计算
**但是，直接子孙元素与该BFC上下边界margin不能折叠**

border dashed (扩折线) dotted（虚线，用错了）

line-height
无论内联元素的line-height如何设置，最终父元素的高度都是以大的line-height为基准

元素设置了float: left或者position: absolute，则其vertical-align属性不能生效，
**因为此时元素的display计算值为block了**。

### 例子： 有点重要line-height

一个line-height为30px的div 里面有个span font-size为30px;结果导致div的实际高度大于30了为什么？
>由于div行高是30px，所以字母x和span元素的高度都是30px。但是字母x的font-size较小，span元素的font-size较大，而行高一样的情况下font-size越大基线的位置越偏下，所以两者的基线不在同一水平线上。
![avatar](./1-2)
由于 ***内联元素默认基线对齐，所以字母x和span元素发生了位移以使基线对齐，导致div高度变大*** 。而此时字母x的半行距比span元素的半行距大，**大出的部分就是div的高度增加的部分**。

test.html中的inline-block实例中 既然最后多了一片白的区域

这就要说到inline-block的不同之处了。一个设置了display: inline-block的元素：

1. 如果元素内部没有内联元素，则该元素基线就是该元素下边缘；
2. 如果元素设置了overflow为hidden auto scroll，则其基线就是该元素下边缘；
3. 如果元素内部还有内联元素，则其基线就是内部最后一行内联元素的基线；

**此时span的行框盒子前，还存在一个幽灵空白节点。由于span元素默认基线对齐，所以span元素的基线也就是其下边缘是和幽灵空白节点的基线对齐的。从而导致幽灵空白节点基线下面的半行距撑高了div元素，造成空隙。** 并不是因为底部有个空白元素text，是 ***因为基准线的缘故*** (可以通过设置父元素的字体大小为0来解决)
如果在span元素内存在内联元素（给span里面添加文字），此时span元素下边缘的空隙没了，因为此时span元素的基线是内部最后一行内联元素的基线。
解决办法：

1. 可以通过设置父元素的字体大小为0来解决；**其实是解决line-height**; 因为ine-height默认相对值为1.4;
2. 所以设置line-height 的值也可以（我这里设置了0）
3. 给元素设置块状化display: block使vertical-align属性失效；
4. 尝试不同的vertical-align值如bottom/middle/top；

张鑫旭大佬推荐的利用vertical-align实现的水平垂直居中弹框

### 层叠规则 层叠上下文（有点不懂，test有个例子）

层叠上下文好像是一个结界，层叠上下文内的元素如果跟层叠上下文外的元素发生层叠，则比较该层叠上下文和外部元素的层叠上下文的层叠水平高低。

规则：

1. 最底层的border/background是指当前层叠上下文元素的边框和背景色。z-index为负值的元素在其之上。
.dad元素默认设置z-index: auto，没有创建层叠上下文，此时其就是一个普通的块级盒子，所以设置了z-index: -1的.son元素跑到了爸爸身后看不见了。
而由于.mom设置了z-index: 0，创建出了一个层叠上下文，所以.son元素就算设置了z-index: -1也跑不出老妈的视线
2. 当块级元素和内联元素发生层叠，内联元素居于块级元素之上。
3. 普通定位元素层叠水平在普通元素之上。普通定位元素是指z-index为auto的定位元素。下图span就是普通定位元素

## 文本控制器

::first-letter 应用实例  可以改变第一个字的样式

text-transform
 input {
    text-transform: uppercase;
    // 可以实现将input输入的文字直接变成大写
}

### white-space 空白处理

我们都知道如果在html中输入多个空白符，默认会被当成一个空白符处理，实际上就是这个属性控制的：地址

normal：合并空白符和换行符；
nowrap：合并空白符，但不许换行；
pre：不合并空白符，并且只在有换行符的地方换行；
pre-wrap：不合并空白符，允许换行符换行和文本自动换行

### text-align: justify 重点

display: none会影响css3的transition过渡效果。 但是display: none并不会影响css animation动画的效果。
