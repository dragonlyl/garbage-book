<!--
 * @Author: your name
 * @Date: 2020-11-21 16:00:31
 * @LastEditTime: 2020-11-21 16:05:58
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