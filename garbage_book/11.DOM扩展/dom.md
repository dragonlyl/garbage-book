# DOM 扩展

选择符 querySelector()  querySelectorAll()

childElementCount firstElementChild previousElementSibling

添加getElementByClassName('xx aa'); 用来取得包含类名具有xx 和aa 的元素

classList ,用来操作元素的类名

innerHtml 返回和调用元素所有子节点(不同浏览器可能不同) ,outerHtml(包括本身节点及其子节点) ,
使用这两者属性考虑性能问题 ,当插入节点 ,比进行多次DOM操作先创建节点在依次插入并安排好插入节点的关系要便利的多
但是 , 尽量少在代码中一次DOM操作多次调用innerHtml

innerText  和outerText(尽量不用,会将自身dom变成文本节点)  用法同上
textContent(会返回其他文本一样返回行内样式和脚本代码)

('xx'); ('#xx'); ('.xx');分别是标签,id,class选择符 同时还支持('img.avatar');//选择img标签中第一个className 为avatar的元素
带了 matchesSelector() 用来判断选择符是否兼容这种写法

修复了childNodes  和firstChild属性指向的元素不一致
childElementCount(不包括文本节点)  firstElementChild指向第一个元素节点  previousElementSibling指向最近哥哥节点

classList  element.add() .contains(是否包含) .remove(移除) .toggle(列表中有就删除,没有就添加)
