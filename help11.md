# 分流ip和端口

在JSScene下的JSBind中的updateFinish中代码修改如下

```
updateFinish: function () {
                if (!jsclient.gamenet)jsclient.gamenet = new GameNet();
                var servers = jsclient.remoteCfg.servers.split(',');
                var server = servers[getServersByRandForWeights(servers)];
                var parts = server.split(':');
                var host = parts[0];
                var port = getServerByRandForPort(parts);
                jsclient.gamenet.disconnect();
                jsclient.gamenet.connect(host, port, function () {
                    sendEvent("connect");
                }, function () {
                    sendEvent("disconnect", 1);
                });
            }
```

添加getServersByRandForWeights函数如下

```
function getServersByRandForWeights(servers) {
    var serversSelect = jsclient.remoteCfg.serversSelect;
    if (serversSelect && serversSelect.length == servers.length) {
        var rand = Math.round(Math.random() * 1000);
        var sum = 0;
        for (var i = 0; i < serversSelect.length; i++) {
            sum += serversSelect[i];
            if (rand <= sum) {
                return i;
            }
        }
        return 0;
    }
    else {
        return Math.floor(Math.random() * servers.length);
    }
}
```

添加getServerByRandForPort

```
function getServerByRandForPort(parts) {
    if (parts.length > 3) {
        return parseInt(parts[1 + Math.floor(Math.random() * (parts.length - 1))]);
    }
    else {
        var min = parseInt(parts[1]);
        var max = parseInt(parts[2]);
        var offset = max - min + 1;
        var part = Math.floor(Math.random() * offset) + min;
        return parseInt(part);
    }
}
```