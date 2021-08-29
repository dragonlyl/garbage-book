# rrweb

record and replay the web 
## 适用场景

记录⽤户使⽤产品的⽅式并加以分析，进⼀步优化产品。
采集⽤户遇到 bug 的操作路径，予以复现。
记录 CI 环境中的 E2E 测试的执⾏情况。
录制体积更⼩、清晰度⽆损的产品演⽰。
## 录制原理

document/iframe.contentDocument
record : 
[rrweb: Session Replays](https://docs.sentry.io/platforms/javascript/configuration/integrations/rrweb/)
除了报错和性能，其实sentry还可以录制屏幕的信息，来更快的帮助开发者定位错误官方文档，sentry的错误录制其实主要依靠rrweb这个包实现

大概的流程就是首先保存一个一开始完整的dom的快照，然后为每一个节点生成一个唯一的id。
当dom变化的时候通过MutationObserver来监听具体是哪个DOM的哪个属性发生了什么变化，保存起来。
监听页面的鼠标和键盘的交互事件来记录位置和交互信息，最后用来模拟实现用户的操作。
然后通过内部写的解析方法来解析（我理解的这一步是最难的）
通过渲染dom，并用RAF来播放，就好像在看一个视频一样。

数据量过大的情况

查看rrweb源码发现checkoutEveryNms属性可以按照时间进行session切分，于是代码变成了这样
rrweb.record({
  emit(event, checkout) {
    if(checkout)rrwebSessionSet();
    storagePush(event);
  },
  checkoutEveryNms: 1000 * 60 * 10
});
每一次checkoutEveryNms到期时，emit里的第二个参数checkout都会为true，这样就可以知道新的session开始，给session分配一个唯一值，存到数据库中的数据结构改为这样
{
timestamp: 1563418490795,
name:'小明',
session:xxxxxxxxxxx,
event:...
}

## 缺点

连续几帧数据变化比较大的时候会卡顿 (所以需要进行优化)