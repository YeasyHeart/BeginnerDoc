#### 项目更新包出错 spawn ENAMETOOLONG ... 解决方案

```
internal/child_process.js:302
    throw errnoException(err, 'spawn');
    ^

Error: spawn ENAMETOOLONG
    at exports._errnoException (util.js:949:11)
    at ChildProcess.spawn (internal/child_process.js:302:11)
    at Object.exports.spawn (child_process.js:367:9)
    at Socket.<anonymous> (C:\Users\Administrator\Desktop\pro\kwx\ccclient\clien
tupdate.js:96:33)
    at emitNone (events.js:91:20)
    at Socket.emit (events.js:185:7)
    at endReadableNT (_stream_readable.js:926:12)
    at _combinedTickCallback (internal/process/next_tick.js:74:11)
    at process._tickCallback (internal/process/next_tick.js:98:9)
```

发生这种问题是因为nodejs中child_process的spawn参数列表过长引起的。

代码位置如下：

```
var ziproc = cp.spawn('zip',zipfiles,{});
```

对此改进如下

```
var tempZipfiles = [];
var tempAddFiles = [];
for (var zi = 1; zi < zipfiles.length; zi++) {
    tempAddFiles.push(zipfiles[zi]);
    if(zi == (zipfiles.length - 1)
    || tempAddFiles.length == 100){
        tempZipfiles = [];
        tempZipfiles.push(zipfiles[0]);
        for(var zj = 0;zj < tempAddFiles.length;zj++){
            tempZipfiles.push(tempAddFiles[zj]);
        }
        var ziproc = cp.spawnSync('zip', tempZipfiles, {});
        tempAddFiles = [];
    }
}
```

使用的是spawnSync同步的方法，每100文件压缩到相应的.zip下。

[clientupdate.js文件](clientupdate.js)
