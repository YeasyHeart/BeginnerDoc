#安装IIS服务器
打开程序和功能->启用或关闭Windows功能
选中 Internet Information Services  和 Internet Information Services 可承载的 Web 核心

以四川麻将为例, 在 scmj 目录下 软连接一个目录叫做scmj, (湖南麻将则是 hnmj)
示例如下:

* ![示例1](img9/1.png)



#搭建web服务器
开始菜单搜索 iis
打开 Internet Information Services管理器

* 执行这一步之前,请务必切换到majiang网络
* 左侧网站  右键 添加网站 , 示例如下, ip 自己选一个 192.168.1 开头的, 因为这是麻将内网ip, 端口为 800
* 某些机器还需要添加 MIME类型,.json   ->  application/json   |  .manifest  ->   application/x-ms-manifest
* ![示例2](img9/2.png)

通过访问 ip:port/Projectname/fileName
来测试是否搭建成功

* ![示例3](img9/3.png)

#测试
电脑 连接majiang, 进入 192.168.1.1 路由管理界面
选择服务 -> 用户名 jxlw  密码 921921921 -> DNSMasq->DNSMasq 附加选项
address=/xxxx.coolgamebox.com/自己的ip
添加或者 修改自己项目的相应值

修改本地 android.json
   "servers":"116.211.167.180:15010:15039,180.97.162.67:15010:15039,116.211.167.177:15010:15039"
改成
   "servers":"120.25.224.7:15010:15012"
   记得测试完之后改回去


手机安装相应的apk包, 进行测试即可

