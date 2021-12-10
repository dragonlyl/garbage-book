# ts

## 打包

`tsc -p tsconfig.json` // 将tsc通过tsconfig 配置文件进行打包

```json
{
    // 配置ts打包后的内容配置
    // 打包配置
    "compilerOptions": {
        // 打包到build 文件夹
        "outDir": "build",
        // 输出那种类型的module包 (最新的es)
        "module": "esnext",
        // 让不支持的浏览器也能兼容
        "target": "es5",
        // 让引用这个库也有ts提示
        "declaration": true,
        // 编译后的代码替代
        "jsx": "react",
        // 查找模块方法 (babel 错误问题)
        "moduleResolution": "node",
        // import * 问题
        "allowSyntheticDefaultImports": true,
        // 暂时还不知道什么用
        "esModuleInterop": true
    },
    "include": ["src"],
    // 两个星号代表任意长度
    "exclude" :["src/**/*.test.tsx", "src/**/*.stories.tsx"]
    // 运行 yarn build-ts   可以在build文件夹看到 还有一些下划线的方法是因为target配置生成的辅助兼容方法
}
```

[esModuleInterop 到底做了什么?](https://zhuanlan.zhihu.com/p/148081795)
[你不知道的 「 import type 」](https://segmentfault.com/a/1190000039800522)

## ts跟react结合

[](https://juejin.cn/post/6952696734078369828)

```tsx

type AppProps = {
    message: string
}
const App: React.FC<AppProps> = ({ message, children }) => (
    <div>
        {message}
        {children}
    </div>
)
// 代码中的demo
const Main: React.FC<IProps> = props => {
  const state = props.location.state
  const userId = state && state.userId
}
```
