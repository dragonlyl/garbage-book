<!--
 * @Author: your name
 * @Date: 2020-11-21 16:00:31
 * @LastEditTime: 2021-01-12 16:48:26
 * @LastEditors: Please set LastEditors
 * @Description: dom调用写法
 * @FilePath: \garbage-book\on_the_job\归类\js\dom.md
-->

# dom调用写法

## scrollTo和scrollBy的api的兼容

[scrollTo和scrollBy两个api的兼容](https://www.cnblogs.com/xieyongbin/p/11274959.html)
e.target.closest(文件为什么写了)

## js获取冒泡路径的写法

[JS获取事件冒泡路径(composedPath )的兼容性写法](https://blog.csdn.net/qq_32013641/article/details/89351265)
[FireFox和Safari兼容event.path](https://www.cnblogs.com/xuLessReigns/p/11276225.html)

```js
function clickDom(event)
    const path=eventPath(event);
    console.log(path);
}
function eventPath(evt) {
    const  path = (evt.composedPath && evt.composedPath()) || evt.path,
        target = evt.target;

    if (path != null) {
        return (path.indexOf(window) < 0) ? path.concat(window) : path;
    }

    if (target === window) {
        return [window];
    }

    function getParents(node, memo) {
        memo = memo || [];
        const parentNode = node.parentNode;

        if (!parentNode) {
            return memo;
        } else {
            return getParents(parentNode, memo.concat(parentNode));
        }
    }

    return [target].concat(getParents(target), window);
}
```

## touch操作

知识储备
[触摸事件 touchstart、touchmove、touchend](https://blog.csdn.net/wangmx1993328/article/details/83270166）

案例
[vue移动端滑动切换图片的一个简单思路](https://blog.csdn.net/buppt/article/details/83662966)

```html
<div id="slider" class="slider">
      <img v-for="(src,index) in imgSrc" :key="index" :src="src" 
      @touchstart="touchstart"
      @touchmove="touchmove"/>
</div>
<script>
data () {
    return {
      imgSrc:[
        '../static/slider1.jpeg',
        '../static/slider2.jpeg',
        '../static/slider3.jpeg',
        '../static/slider4.jpeg',
        '../static/slider5.jpeg',
      ],
      startPointX: 0,
      changePointX: 0,
      showIndex: 0,
    }
},
methods:{
    show(index){
      this.changePointX=this.startPointX;
      let slider = document.getElementById('slider');
    //   slider.style.marginLeft=`-${330*index}px`;
      slider.style.marginLeft = `-${slider.clientWidth*index}px`;
    },
    touchstart(e){
      this.startPointX = e.changedTouches[0].pageX;
    },
    touchmove(e){
      if(this.startPointX==this.changePointX){
        return ;
      }
      let currPointX = e.changedTouches[0].pageX;
      let leftSlide = this.startPointX-currPointX;
      if(leftSlide>30&&this.showIndex<this.imgSrc.length-1){
        this.show(++this.showIndex)
      }else if(leftSlide<-30&&this.showIndex>0){
        this.show(--this.showIndex)
      }
    },
}
// 检测到touchstart事件后，使用startPointX记录一下touch时候的pageX值。
// 在滑动时touchmove事件是一直触发的。
// 当手指滑动的位置和touchstart时位置在x轴上的距离大于一个值时触发图片切换，我这里设置的是30px
</script>
<style>
.slider {
    transition: all 300ms linear;
    white=space: nowrap;
}
</style>
```
