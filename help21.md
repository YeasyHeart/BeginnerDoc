# 【nodejs脚本】发布前，项目资源一键分离成xxx_web,xxx_server,xxx_zip

1. 使用环境必须是bash

2. 自己手动配置资源路径

以湖北麻将为例：

![](img21/img21_0.png)

上图是项目目录(kwx)跟(kwx_publish)目录

![](img21/img21_1.png)

这个是(kwx_publish)里面web,server,zip的目录

![](img21/img21_2.png)

这是脚本存放的目录

以上是湖北麻将卡五星项目路径基本配置

以下是web2git.js脚本中路径的配置

```js
var webPath = '../web';
var serverKWXPath = '../server';
var serverSCMJPath = '../scmj';
var serverDDZPath = '../ddz';
var zipPublishPath = '../../kwx_publish/kwx_zip/web';
var webPublishPath = '../../kwx_publish/kwx_web/web';
var serverKWXPublishPath = '../../kwx_publish/kwx_server/kwx';
var serverSCMJPublishPath = '../../kwx_publish/kwx_server/scmj';
var serverDDZPublishPath = '../../kwx_publish/kwx_server/ddz';
```

这个脚本原理就是删除以前的资源把新资源拷贝进去。

download : [web2git](img21/web2git.js)



