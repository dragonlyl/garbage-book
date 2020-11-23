<!--
 * @Author: your name
 * @Date: 2020-11-21 15:21:17
 * @LastEditTime: 2020-11-21 15:27:43
 * @LastEditors: Please set LastEditors
 * @Description: nginx
 * @FilePath: \garbage-book\on_the_job\归类\服务器\nginx.md
-->

# nginx

## 部分配置

80现在被apache占用
详细配置文件在备忘录 苹果自带apache
重启 nginx -s reload
检测配置 nginx -t
现在配置的端口有 8999
9000 用于指定桌面的tt.html文件
nginx配置文件在 ~/usr/local/etc/nginx
root文件在 ~/usr/local/var/www
cd ~ 表示进入系统中home目录，一般就是你的root权限目录 ；cd / 表示进入系统的根目录，最顶层目录