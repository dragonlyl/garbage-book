# html页面渲染

## 浏览器渲染过程及优化建议

<https://juejin.im/post/5d8989296fb9a06b1f147070>

1. 解析：一个是HTML/SVG/XHTML，事实上，Webkit有三个C++的类对应这三类文档。
解析这三种文件会产生DOM Tree；CSS，解析CSS会产生CSS规则树；Javascript，脚本，主要是通过DOM API和CSSOM API来操作DOM Tree和CSS Rule Tree；
2. 渲染：浏览器引擎通过DOM Tree 和 CSS Rule Tree 来构造Rendering Tree。 rendering tree 并不等于 dom tree ， 因为像header标签 和 display：none的东西就没必要放在渲染树中了。 CSS Rule Tree主要完成匹配并把css rule附加到rendering tree 上的每个element（DOM 结点），也就是所谓的Frame，然后技术每个element的位置（又叫layout和reflow过程）
3. 绘制：最后通过调用操作系统Native GUI的API绘制

所以对于html的优化减少(reflow和repaint) 可以是：

1. 不要一条一条地修改DOM的样式。还不如预先定义好css的class，然后修改DOM的className。   即改变样式用修改classname的方法
2. 把DOM离线后修改。如：使用documentFragment 对象在内存里操作DOM 先把DOM给display:none(有一次reflow)，然后你想怎么改就怎么改。比如修改100次，然后再把他显示出来。 clone一个DOM结点到内存里，然后想怎么改就怎么改，改完后，和在线的那个的交换一下。
3. 不要把DOM结点的属性值放在一个循环里当成循环里的变量。不然这会导致大量地读写这个结点的属性
4. 为动画的HTML元件使用fixed或absoulte的position，尽量使用transform，那么修改他们的CSS是不会reflow的
5. 尽量少使用table布局。因为可能很小的一个小改动会造成整个table的重新布局

## 加载html页面步骤

1.用户输入网址，浏览器向服务器发出请求，服务器返回HTML文件；
2.浏览器开始载入HTML代码，发现＜head＞标签内有一个＜link＞标签引用外部CSS文件；
3.浏览器又发出CSS文件的请求，服务器返回这个CSS文件；
4.CSS文件获取到以后，浏览器继续载入HTML中＜body＞部分的代码；
5.浏览器在代码中发现一个＜img＞标签引用了一张图片，向服务器发出请求，此时浏览器不会等到图片下载完，而是继续加载后面的代码；
6.服务器返回图片文件，由于图片占用了一定面积，影响了后面段落的排版，因此浏览器需要回过头来重新渲染这部分代码；
7.浏览器发现了一个包含一行js代码的＜script＞标签，直接运行该脚本；
8.执行js过程中，发现代码中要隐藏某个元素（style.display='none'），这时浏览器不得不重新渲染这部分代码；
9.整个`<html>＜/html＞`文档暂时加载完成；
10.此时用户点了一下界面中的“换肤”按钮，js让浏览器换了一下＜link＞标签的CSS路径；
11.浏览器向服务器请求了新的CSS文件，重新加载页面，然后执行渲染过程。
<https://www.cnblogs.com/zhaoxinmei-123/p/8891094.html>
