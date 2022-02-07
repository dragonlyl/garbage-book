# 工程配置

## 链接

[工程配置](https://juejin.cn/post/6860129883398668296)
## npm 的配置获取

npm list -g // 获取全局npm包
npm get registry  // 获取registry 指向目录

## .npmrc 文件

可以配置运行的 npm 源 (配置 `.npmrc` 文件)

```shell
# 创建 .npmrc 文件
touch .npmrc
# 在该文件内输入配置
registry=https://registry.npm.taobao.org/

```

## editorconfig

跨编译器一致编码风格文件, vscode需要安装这个插件

```shell
# 创建 .editorcofig 文件
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
# 移除后缀的空格
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf

[*.md]
trim_trailing_whitespace = false

```

### prettier

[prettier](https://prettier.io/playground/) // 可以进行配置效果复制
