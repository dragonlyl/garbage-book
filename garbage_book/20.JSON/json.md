# JSON 的对象的属性也必须加双引号]

stringify()  和 parse()

stringify()
序列化js对象时,所有函数及其原型成员都会被忽略,值为undefined的任何属性都会被跳过
JSON.stringify(book,["title","edition"]);//转换后的json只会包含这两个属性

```js
JSON.stringify(book,function(key,value){
    switch(key){
        case: "eidtion":
            return value.join(","); //将eidtion数组变成字符串用,连接
        case: "title":
            return undefined: // 删除title属性
        default: return value; //其他的返回传入的值 (default项必须要有)
    }
})
 
JSON.stringify(book ,null ,4); 子元素缩进4个空格
```
