# 关于 Babel 你必须知道的

## Babel 官方文档: <https://babeljs.io/>

## babel 编译的阶段

>babel 总共分为三个阶段：解析，转换，生成

babel 本身是不具备这种转化功能，提供这些转化功能的是一个个 plugin。所以我们没有配置任何 plugin 的时候，经过 Babel 输出的代码是没有改变的。

// .babelrc 文件
{
    "plugins": [
        "transform-es2015-template-literals"// 转译模版字符串的 plugins
    ],
    "presets": ["env", "stage-2"]
}
preset（即一组预先设定的插件）
>preset: babel 插件集合的预设，包含某些插件 plugin。显然像上面那样一个一个配置插件会非常的麻烦，为了方便，babel 为我们提供了一个配置项叫做 persets（预设）。

### plugins 与 presets 同时存在的执行顺序

1. 先执行 plugins 的配置项,再执行 Preset 的配置项；
2. plugins 配置项，按照声明顺序执行；
3. Preset 配置项，按照声明逆序执行。

"presets": [["env",{
    //是否自动引入 polyfill，开启此选项必须保证已经安装了 babel-polyfill
    // “usage” | “entry” | false, defaults to false.
        "useBuiltIns": "usage
    }], "stage-2"]

上面的是useBuiltIns 配置
我们可能在全局引入 babel-polyfill，这样打包后的整个文件体积必然是会变大的。
但是通过设置 **"useBuiltIns":"usage"** 能够把 babel-polyfill 中你需要用到的部分提取出来，不需要的去除。

**useBuiltIns 参数说明：**

* false: 不对 polyfills 做任何操作
* entry: 根据 target 中浏览器版本的支持，将 polyfills 拆分引入，仅引入有浏览器不支持的 polyfill
* usage(新)：检测代码中 ES6/7/8 等的使用情况，仅仅加载代码中用到的 polyfills

<!-- ![avatar](./1-1.tiff) -->

babel-core（核心）
这个模块是最能顾名思义的了，即 babel 的核心模块。babel 的核心 api 都在这个模块中。也就是这个模块会把我们写的 js 代码抽象成 AST 树；然后再将 plugins 转译好的内容解析为 js 代码。
