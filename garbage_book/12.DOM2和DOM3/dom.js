/**
 * 偏移量 offset  包括 内边距,滚动条,边框大小(但是不包括外边距)
 * 
 * 客户区大小 client 元素内容及内边距所占据的空间大小(不包括边框) ,就是元素内部的空间大小,所以滚动条就不算了
 * 
 * 滚动大小  包含滚动内容元素的大小 scroll,即元素的实际大小
 * 
 * 还有其他 DOM2遍历及范围 
 * DOM2级样式
 */

 /**
  * offsetHeight(元素在垂直方向上占用的空间大小) offsetTop(元素上外边框至包含元素上内边距之间的像素距离)
  * 所以想知道元素的对于页面的偏移量 offsetTop + offsetParent.offsetTop(一直到根,即if(offsetParent!=null) + offsetParent.offsetParent.offsetTop )
  * body 可以通过 getElementLeft() 和getElementTop() 用来返回body的 offsetLeft  和offsetTop的值
  * 
  */


 /**
  * clientWidth 可以使用 doucment.documentElement. 或document.body.(IE7之前的版本)来确认浏览器的视口大小
  */

  /**
   * scrollHeight 在没用滚动条的情况下,元素内容的总高度
   * scrollTop 被隐藏在内容区域上方的像素数,通过这个属性可以改变元素的滚动位置
   * 
   * 但是对于doucment.documentElement的 scrollHeight 和clientHeight在不同的浏览器是不同的,
   * 所以取 doucment.documentElement.scrollHeight 和 doucment.documentElement.clientHeight的最大值 Math.max()
   * 
   * 对于混杂模式下的IE 要用 document.body代替document.doucmentElement 判断是否混杂 document.compatMode == 'BackCompat'
   */