/**
 * window对象
 * 1.窗口位置
 * 2.窗口大小
 * 3.resizse(只能用最外层window对象使用)
 * 4. window.open(url,窗口目标,特性字符串,是否取代先前history页面)
 * 5.window.location 和document.location(两者引用的是同一个对象)
 * 6.navigator 对象(识别客户端浏览器的标准)
 * 7.history go (用back 和forward来代替go)
 */

 //1.窗口位置
//  window.screenLeft 否则 用 window.screenX (firefox)

//2.窗口大小  (书上判断是否具有该属性 用 typeof xx != 'number')
// innerWidth outerWidth (两者谷歌都表示为窗口大小而非浏览器窗口大小,其他浏览器的outerwidth包括浏览器宽度)

// window.innerWidth 
// document.documentElement.clientWidth 页面视口信息 doucment.body.clientWidth(IE) (谷歌两种都行)

//移动的有所不同 
// window.innerWidth(可见视口, 可见视口只是整个页面的一小部分) document.documentElement.(布局视口,即渲染后页面的实际大小) 移动IE布局视口 用document.body.clientWidth

//3.resizeTo(xx,xx) 和resizeBy(xx,xx)  前者接收浏览器窗口的新宽度和高度,后者接收新窗口与原窗口的只差 ,即原本20  在这里填5  就是现在为25

//4.window.open 可以搭配上面的函数使用  var newWindow = window.open('xx'); newWindow.resizeTo(500,200); //将打开的窗口变成500*200 的

//5. location的属性 hash(#及#后面的字符串) host(服务器名称加端口号) hostname(不带端口号) href(完整的url) pathname(url中的目录(或)文件名) 
//port(端口号) protocol(协议http) search(?及?后面的参数)
// location的方法: .replace() .reload() 


//6.navigator  .puugins 可以用来判断浏览器安装的插件信息数组

//7.