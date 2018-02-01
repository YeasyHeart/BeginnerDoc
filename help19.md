# 一键修复客户端

方法非常简单，主要是删除project.manifest跟project.manifest.temp这两个文件重启客户端。重新下载新的zip的包。

```javascript
   function renameUpdateDir(){
        var basePath = jsb.fileUtils.getWritablePath();
        var time = new Date();
        jsb.fileUtils.renameFile(basePath+"update/",basePath+"update_" + time.getTime() + "/");
    }

    jsclient.removeUpdateRes = function(){
        renameUpdateDir();
        jsclient.restartGame();
    }
```
