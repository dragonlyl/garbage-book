# 深入理解 TypeScript

## url

[深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/#why)

## 配置

tsconfig.json

然后运行 tsc -w // 会自动检测 配置文件,然后转换ts文件

## 声明空间

ts有 **类型声明空间** 和 **变量声明空间**

```ts
// 后面三句都是 类型声明空间
interface Bar {} // 类型声明空间
class Foo {} // 这个同时也算变量声明空间
type Bas = {};

let bar: Bar // 这就是类型
const bar = Bar // 这就会报错  因为Bar未定义变量声明空间

class Foo {}
const someVar = Foo;
const someOtherVar = 123;

let bar: someOtherVar // 这也会报错 因为不能作为类型声明空间
```
