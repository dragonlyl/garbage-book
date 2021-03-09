# 从输入URL开始建立前端知识体系

## 链接地址

[从输入URL开始建立前端知识体系](https://juejin.cn/post/6935232082482298911)

## url组成

![avatar](url.jpg)

## url解析

输入url浏览器会解析出协议，主机，端口和路径，并构造一个http请求

1. 先看是否命中强缓存（不发送请求到服务端
2. 发送请求，看是否命中协商缓存（发送请求到服务端，服务端告知的信息内容是缓存在浏览器的哪个地方可以加载这个缓存
3. 都没有就从服务端读取资源

### 缓存原理

#### 强缓存

1. 强缓存利用`Response Header` 的`Expires`或者`Cache-Control`来实现，表示资源在客户端缓存的有效期 （而这信息是在第一次获取资源返回的时候就将Expires加到响应头，所以后面只要时间没有过期响应头都是本地的
2. Expires是比较老的，返回的是绝对时间（`Expires: Wed, 10 Mar 2021 06:00:08 GMT`，所以可以修改客户端时间达到永远有效）
3. Cache-Control是个绝对时间，以秒为单位`Control:max-age=315360000`,加上请求有个data字段，相加后跟现在请求时间相比是否超时，但也是通过客户端时间进行判断
4. Cache-Control优先级高于Expires
5. Cache-Control 指定 public 或 private 标记。如果使用 private，**则表示该资源仅仅属于发出请求的最终用户，这将禁止中间服务器（如代理服务器）缓存此类资源**，但并不是指缓存更加安全，只是有没有必要存储到中间服务器而已

#### 协商缓存

1. 返回状态304，就表示命中了协商缓存，从客户端缓存加载
2. 利用原理 `[Last-Modified, If-Modified-Since]` 和 `[ETag, If-None-Match]`
3. 第一次response 记录`Last-Modified`时间，下次访问 request的`If-Modified-Since`带上上次`Last-Modified`的时间去请求服务器，服务器比较资源是否改动，没有改动就不返回资源继续从客户端加载资源(但确实会有服务器资源更新但是没有修改时间没有变化，那么资源就不会更新，所以出现后面的一种方案)
4. ETag是唯一标识的一个字符串，只要资源变化串就不同，跟修改时间没有关系了，同上面在request的If-None-Match带上这个字符串给服务器比较
5. 大部分web服务器都默认开启协商缓存，而且是同时启用【Last-Modified，If-Modified-Since】和【ETag、If-None-Match】

>分布式系统里多台机器间文件的Last-Modified必须保持一致，以免负载均衡到不同机器导致比对失败；
分布式系统尽量关闭掉ETag(每台机器生成的ETag都会不一样）；

dd

## hsts

即不加https会自动跳转访问https
