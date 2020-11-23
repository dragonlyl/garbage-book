# pm2使用

## 初次使用

`npm install -g pm2`
一般是是用于生产环境下的(界面不会有显现)
在package.js中
dependencies是生产环境,即部署需要使用的库(jquery)
devDependcies是开发环境,即开发要使用的(webpack
)

## 参数介绍

--watch : 监听应用文件、目录的变化，一旦发生改变，自动重启。复杂的最好通过配置文件。

--name <app_name> : 指定 app name

--log <log_path> : 指定 日志的保存路径

## 启用

启用单入口文件
`pm2 start app.js`
调用npm的script,run后面要跟指令 ,name命名为jack
`pm2 start npm --watch --name jack -- run start`
停止命名的指令
`pm2 stop jack   pm2 stop <id | name | all | json | stdin...>`
查看某一个
`pm2 show (appname | id)`
从list里面删除
`pm2 delete <app_name | id | >`

简单用法

1. npm run dev
2. pm2 start npm -- run dev
以上使用是等效的
  
pm2 start npm --watch --name nickname -- run sit
// 启动 npm run sit
eg: pm2 start npm --watch --name h5toolsit -- run sit
其中 --watch监听代码变化，--name 重命令任务名称，-- run后面跟脚本名字

## 常用脚本

<https://www.jianshu.com/p/96a019cdb77e>
npm install pm2 -g     # 命令行安装 pm2
pm2 start app.js -i 4 #后台运行pm2，启动4个app.js
                              # 也可以把'max' 参数传递给 start
                              # 正确的进程数目依赖于Cpu的核心数目
pm2 start app.js --name my-api # 命名进程
pm2 list               # 显示所有进程状态
pm2 monit              # 监视所有进程
pm2 logs               #  显示所有进程日志
pm2 stop all           # 停止所有进程
pm2 restart all        # 重启所有进程
pm2 reload all         # 0秒停机重载进程 (用于 NETWORKED 进程)
pm2 stop 0             # 停止指定的进程
pm2 restart 0          # 重启指定的进程
pm2 startup            # 产生 init 脚本 保持进程活着
pm2 web                # 运行健壮的 computer API endpoint (http://localhost:9615)
pm2 delete 0           # 杀死指定的进程
pm2 delete all         # 杀死全部进程
