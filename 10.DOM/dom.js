/**
 * DOM 的NodeList对象时一种类数组对象,有length属性,但并不是Array实例
 * Document类型
 * Element类型
 */

//  1. someNode.childNode[0] 等价于 someNode.firstChild lastChild nextSibling 和previousSibling

// xx.appendChild(node) 用于向xx节点的子节点末尾插入一个   还有 remove
// xx.insertBefore(newNode,beforeTargetNode) 插入于在具体的某个节点之前  还有replace

// xx.cloneNode(true/false); //true 表示深拷贝(会拷贝其本身以及其子节点) false(只复制节点本身)  然后再通过append方法关联到相关位置
// 注意 : 这里的深拷贝是不会拷贝添加的DOM节点的JavaScript属性的(但是IE有bug),所以复制的时候最好先移除事件处理程序

//document 的.documentElement 指向的是html元素 也是文档的第一个子节点  document.body 用来取得对body的引用
// 还有 document.title  //<title>标签中的内容  document.URL (取得页面的完整URL) document.domain//(页面的域名) document.referrer//(链接到当前页面的那个页面)
// 上面的4个属性 title 和domain可以设置 ,但是domain也是要按照一定规则改变,用来改变值来解除跨域安全限制,互相访问对方的js对象


//获得元素 getElementById('大小写严格匹配'); //IE有点问题,就是它的表单元素如果name跟要搜寻的Id相同也会返回

//用getElementByTagName 得到HTTMLCollection对象,与NodeList对象类似,是个类数组  ,
// 如 <img name='自己定义的name属性'>  用上面的方法 拿到得到HTTMLCollection对象 赋值给 arr 
// 可以用 arr.namedItem('标签中name属性的值'); 简写 arr['标签中name属性的值']//来找到标签name属性具体为这个的元素 (注:这个方法是HTMLCollection对象的属性)

// 可以用 getElementByTagName('*'); 来获取该document下的所有子元素

//getElementByName()


//2.ELement
//  所有元素的 .tagName 返回的都是大写  所以要用.toLowerCase()  转换成小写然后比较
/**
 * element 元素有几个特殊属性, id ,title(鼠标移动到会出现的文字),lang,dir(语言方向),className(因为class是预留关键字)
 * 
 * 特性: getAttribute 和setAttribute removeAttribute ,开发人员不经常使用getAttribute(),而是直接使用对象的属性,用处在于取得自定义特殊值才使用
 * 
 * 用attribute属性(比上面的那个更少用), element.attribute.getNamedItem('id').nodeValue ; 简写 element.attribute('id').nodeValue; //用来获取该节点的特性值
 * 其中 用 attribute.getNameItem(xx)获取到的是属性等于xx的节点    
 * 
 * 注  每个特性节点都有一个specified属性,用来标注是否为html特殊特性,true是是
 * 
 * 创建元素 creatElement  然后appendChild() insertBefore  replaceChild
 * 
 * 子节点 用childNode 一般浏览器会包括文本节点 ,只有IE用.childNode获取到的都是元素节点  可以用 childNode[i].nodeType == 1 来过滤文本节点
 * 文本节点的nodeType 是3 , 用createTextNode() 创建文本节点 ,用element.normalize() 方法来将两个相连同胞文本节点合并
 * 
 * 动态脚本 , 直接用DOM创建 script加入到代码中是不会下载src指向的js代码的 ,所以需要将其封装成函数
 * 
 * 每次遍历 nodeList ,因为所有nodeList对象都是访问DOM文档实时运行的查询,divs.length会在每次有新元素加入的时候不断递增
 * 所以 写法  for( i = 0 , len = div.length ; i < len ; i++ )  代替 for( i = 0  ; i < div.length ; i++ )
 * 
 * 
 * 
 * 
 */
