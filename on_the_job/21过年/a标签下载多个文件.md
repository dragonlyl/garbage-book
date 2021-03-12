# 利用js动态创建a标签单个文件及多个文件下载

## 链接

[利用js动态创建a标签单个文件及多个文件下载](https://blog.csdn.net/qq_42092177/article/details/105789938)

```js
//创建下载url数组
 
//这个地址是在其他地方找的，如果不能用，需自行找一些地址来测
var data= ['http://cachefly.cachefly.net/100mb.test','http://speedtest.fremont.linode.com/100MB-fremont.bin']
 
//单个下载文件测试
var url= "http://cachefly.cachefly.net/100mb.test"
var down = document.createElement('a');
down.href = url;
// down.download = '';// 默认为文件的名字
document.body.appendChild(down);
down.click();
down.remove();
 
//多个文件循环下载
 
for (let i = 0; i < data.length; i++) {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = data[i];
    document.body.appendChild(iframe);
    setTimeout(() => {
        iframe.remove();
    }, 2 * 60 * 1000);
}
```

```js
downloadMulti (name, url) {
    var aDom = document.createElement('a')
    var evt = document.createEvent('HTMLEvents')
    evt.initEvent('click', false, false)
    aDom.download = name
    aDom.href = '/file/download?file_path=' + url
    aDom.dispatchEvent(evt)
    aDom.click()
},

```
