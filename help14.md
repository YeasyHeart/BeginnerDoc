#### 导出线上玩家数据到本地进行回放测试

基本每个项目有导出玩家数据功能,但不一定有ExportDataLayer。

所以需要检查下app.js jsclient.exportDataLayer 函数里面之后是否执行。

1.使用海南项目的导出ExportDataLayer.json资源
2.把export.js 加入到自己项目中。
3.使用按键C调出导出界面，输入玩家的ID和房间ID
4.之后点击战绩功能就是显线上的玩家记录了。

tips:加上test.cfg 连接外网ip

重要的逻辑在于绑定线上的玩家和本地登录的用户帐号

```
export.js:130
    jsclient.data.playLog=rtn.playLog;
    jsclient.data.pinfo.uid = pId;

```


导出功能的界面和逻辑直接单独拿出来了。

[export.js文件](export.js)

重要tip,建议执行导出之后不要执行线上的其他功能。