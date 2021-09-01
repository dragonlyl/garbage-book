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
当dom变化的时候通过 MutationObserver 来监听具体是哪个DOM的哪个属性发生了什么变化，保存起来。
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

## 组成

rrweb 主要由 3 部分组成：

rrweb-snapshot，包含 snapshot 和 rebuild 两个功能。snapshot 用于将 DOM 及其状态转化为可序列化的数据结构并添加唯一标识；rebuild 则是将 snapshot 记录的数据结构重建为对应的 DOM。
rrweb，包含 record 和 replay 两个功能。record 用于记录 DOM 中的所有变更（mutation）；replay 则是将记录的变更按照对应的时间一一重放。
rrweb-player，为 rrweb 提供一套 UI 控件，提供基于 GUI 的暂停、快进、拖拽至任意时间点播放等功能。
## 缺点

连续几帧数据变化比较大的时候会卡顿 (所以需要进行优化)
yarn add rrweb-snapshot rrweb rrweb-player -S

## 源码

record
void 0 // 用来表示 undefined

maskInputOptions

wrappedEmit
wrappedMutationEmit

takeFullSnapshot // 获取dom 调用 snapshot 调 serializeNodeWithId // 返回的内容给 data.node
observe_1  initObservers// 监听变化 doc就是document节点
handlers_1 push进去
document.readyState // document 的加载状态
在 可交互和完成阶段 开始调用内容函数 takeFullSnapshot 和 observe_1
否则 用 `document.addEventLister('load')`
`loading（正在加载）`
document 仍在加载。
`interactive（可交互）`
文档已被解析，"正在加载"状态结束，但是诸如图像，样式表和框架之类的子资源仍在加载。
`complete（完成）`
文档和所有子资源已完成加载。表示 load (en-US) 状态的事件即将被触发。

如何生成 全局快照： 调用takeFullSnapshot =》 snapshot =》 serializeNodeWithId
serializeNodeWithId 先调用 serializeNode (序列化节点)

id有就用原来的 ,没有就递增生成

```js
function serializeNodeWithId(n, options) {
    ...
    var serializedNode = Object.assign(_serializedNode, { id: id });
    // sn 指向自己
    n.__sn = serializedNode;
    // 如果是meta ,就不需要标注id, 在slimDOMExcluded处理
    // map记录id 和对应的节点 (hash表)
    map[id] = n;
    
    // 然后遍历childNodes 节点 (element, document, frame(需要先加载完才开始处理))
    for (var _i = 0, _h = Array.from(n.childNodes); _i < _h.length; _i++) { // n是原及诶单
        var childN = _h[_i];
        var serializedChildNode = serializeNodeWithId(childN, bypassOptions); // 返回序列化后的子节点节点
        if (serializedChildNode) {
            // serializedNode 是序列化后的父节点
            serializedNode.childNodes.push(serializedChildNode); // 将序列化后的字节点添加到序列化的节点上
        }
    }
    ...
}
```
