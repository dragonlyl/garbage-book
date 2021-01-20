<!--
 * @Author: your name
 * @Date: 2021-01-19 16:12:34
 * @LastEditTime: 2021-01-19 16:16:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \garbage-book\on_the_job\归类\node\koa\koa开发内容.md
-->

# koa 开发内容

## 获取cookie

ctx.cookies.get('LtpaToken');

## 转换base64

Buffer.from(token, 'base64')
解析base64
Buffer.from(token, 'base64').toString('utf8');

## 获取body

安装 koa-body koa-bodyparser
ctx.request.body 获取传递的body信息内容
let { name } = ctx.request.body

## 获取query

ctx.request.query 获取query参数内容
