# 导出回放Log，最新版本

导出回放数据功能是为了解决线上玩家牌局出现bug，咱们程序员们为了要还原整个bug的真相。此功能就应用而生了。

这个文档是对以前的代码做了一次更新。

首先加入了新的域名对回放数据访问方式，完整连接类似于：

```
xxx.happyplaygame.net/xx/playlog/201x-xx-xx/ownerid_tableid.json
```

其中的/xx/是由服务器写入并传下来的。就是对以前ip替换了成了url。

服务器代码如下：

```
    playInfo = {
        //ip:app.getPublicIp(),
        url:publicIp,
        owner: tData.owner,
        money: tb.createPara.money,
        gameid: tData.gameid,
        gamemode: tData.SelectGameMode,
        now: nowStr,
        tableid: tb.tableid,
        logid: playid,
        players: [],
        isShow:true,
        allowCheck:true
    };

```

新的url字段的内容的生成如下：

```JavaScript
function getPublicIp() {
    var serverId_index01 = app.serverId.lastIndexOf("pkroom");
    var serverID = app.serverId.substring(
        (serverId_index01+6),
        app.serverId.length
    );
    if(serverID.length<2) {
        serverID="00";
    }
    else  {
        serverID = serverID.substring(0,2);
    }
    console.error('-----------------'+serverID);
    return serverID;
}

```

现在getPlayLogOne回放的请求也变了，变成如下：

```
jsclient.getPlayLogOne = function (item) {
    if(item.url)
    {
        if(jsclient.remoteCfg.playBackServer)
        {
            //item.ip在服务器端存的值是 serverId
            //playUrl="http://hnmjhf.happyplaygame.net"+"/"+item.ip+"/playlog/"+item.now.substr(0,10)+"/"+item.owner+"_"+item.tableid+".json";
            playUrl="http://"+jsclient.remoteCfg.playBackServer+"/"+item.url+"/playlog/"+item.now.substr(0,10)+"/"+item.owner+"_"+item.tableid+".json";

            cc.log("playUrl " + playUrl);
            var xhr = cc.loader.getXMLHttpRequest();
            xhr.open("GET", playUrl);
            xhr.onreadystatechange = function () {
                jsclient.unblock();
                if (xhr.readyState == 4 && xhr.status == 200) {
                    sendEvent("playLogOne",JSON.parse(xhr.responseText));
                }
            }
            xhr.onerror = function (event) {jsclient.unblock(); }
            xhr.send();
        }
    }
    else if(item.ip)
    {
        jsclient.block();
        var xhr = cc.loader.getXMLHttpRequest();
        var playUrl="http://"+item.ip+":800/playlog/"+item.now.substr(0,10)+"/"+item.owner+"_"+item.tableid+".json";
        xhr.open("GET", playUrl);
        xhr.onreadystatechange = function () {
            jsclient.unblock();
            if (xhr.readyState == 4 && xhr.status == 200) {
                sendEvent("playLogOne",JSON.parse(xhr.responseText));
            }
        }
        xhr.onerror = function (event) {jsclient.unblock(); }
        xhr.send();
    }
    else
    {
        var now=item.now; var logid=item.logid;
        jsclient.block();
        jsclient.gamenet.request("pkplayer.handler.getSymjLog",{now:now,logid:logid},function(rtn){
            jsclient.unblock();
            if(rtn.result==0)
            {
                sendEvent("playLogOne",rtn.data["mjlog"]);
            }
        });
    }
}
```

这里的jsclient.remoteCfg.playBackServer也变成了上文中的xxx.happyplaygame.net域名。此域名需找服务器要。

前期的工作就完成，现在正餐来了。

导出回放log跟上文中获取回放数据有点类似，这里只是把回放数据写入文件。在home.js修改代码如下；

为了copy方便我把代码全部都放了出来。

```
(function() {
	var playerId;
	var homeId;
	var playUrl;
	var xhr;
	function printfLogToFile(ip,url,owner,now,logid,pid,hid) {
		if (url) {
			if (jsclient.remoteCfg.playBackServer) {
				//item.ip在服务器端存的值是 serverId
				//playUrl="http://hnmjhf.happyplaygame.net"+"/"+item.ip+"/playlog/"+item.now.substr(0,10)+"/"+item.owner+"_"+item.tableid+".json";
				jsclient.block();
				playUrl = "http://" + jsclient.remoteCfg.playBackServer + "/" + url + "/playlog/" + now.substr(0, 10) + "/" + owner + "_" + hid + ".json";
				xhr = cc.loader.getXMLHttpRequest();
				xhr.open("GET", playUrl);
				xhr.onreadystatechange = function () {
					jsclient.unblock();
					if (xhr.readyState == 4 && xhr.status == 200) {
						var obj = JSON.parse(xhr.responseText);
						jsb.fileUtils.writeStringToFile(JSON.stringify(obj),
							jsb.fileUtils.getWritablePath() + pid + "_" + hid + '_.json');
						jsclient.exportdataui.removeFromParent(true);
						jsclient.exportdataui = null;
						jsclient.showMsg("已写入文件");
						jsclient.unblock();
					}
					else {
						jsclient.showMsg("查询失败");
						jsclient.unblock();
					}
				}
				xhr.onerror = function (event) {
					jsclient.showMsg("查询失败");
					jsclient.unblock();
				}
				xhr.send();
			}
		}
		else if(ip)
		{
			jsclient.block();
			xhr = cc.loader.getXMLHttpRequest();
			playUrl="http://"+ip+":800/playlog/"+now.substr(0,10)+"/"+owner+"_"+hid+".json";
			xhr.open("GET", playUrl);
			xhr.onreadystatechange = function () {
				jsclient.unblock();
				if (xhr.readyState == 4 && xhr.status == 200) {
					var obj = JSON.parse(xhr.responseText);
					jsb.fileUtils.writeStringToFile(JSON.stringify(obj),
						jsb.fileUtils.getWritablePath()+ pid + "_" + hid + '_.json');
					jsclient.exportdataui.removeFromParent(true);
					jsclient.exportdataui = null;
					jsclient.showMsg("已写入文件");
					jsclient.unblock();
				}
				else {
					jsclient.showMsg("查询失败");
					jsclient.unblock();
				}
			}
			xhr.onerror = function (event) {
				jsclient.showMsg("查询失败");
				jsclient.unblock();
			}
			xhr.send();
		}
		else
		{
			jsclient.block();
			jsclient.gamenet.request(
				"pkplayer.handler.getSymjLog",
				{now:now,logid:logid}, function(item){
					if(item.result == 0) {
						jsb.fileUtils.writeStringToFile(JSON.stringify(item.data["mjlog"]),
							jsb.fileUtils.getWritablePath()+ pid + "_" + hid + '_.json');
						jsclient.exportdataui.removeFromParent(true);
						jsclient.exportdataui = null;
						jsclient.showMsg("已写入文件");
						jsclient.unblock();
					}
					else {
						jsclient.showMsg("查询失败");
						jsclient.unblock();
					}
				});
		}
	}
	function printfLogListToFile(logs,pid) {
		jsb.fileUtils.writeStringToFile(JSON.stringify(logs),
			jsb.fileUtils.getWritablePath()+ pid + "_" + 'logList.json');
		jsclient.exportdataui.removeFromParent(true);
		jsclient.exportdataui = null;
		jsclient.showMsg("已写入文件");
		jsclient.unblock();
	}
	ExportDataLayer = cc.Layer.extend({
		jsBind: {
			block:{_layout:[[1,1],[0.5,0.5],[0,0],true]	},
			_event: {

			},
			back: {
				_layout: [[0, 0.4], [0.5, 0.5], [0, 0]],
				inputimg:{
					playerId:{
						_run:function() {
							playerId = this;
						},
						_listener:function(sender,eType) {
							switch (eType) {
								case ccui.TextField.EVENT_DETACH_WITH_IME:
									//SendChatMsg(false);
									break;
							}
						}
					}
				},
				inputimg1:{
					homeId:{
						_run:function() {
							homeId = this;
						},
						_listener:function(sender,eType) {
							switch (eType) {
								case ccui.TextField.EVENT_DETACH_WITH_IME:
									//SendChatMsg(false);
									break;
							}
						}
					}
				},
				send_list_btn:{
					_click:function(btn,eT) {
						var pId = parseInt(playerId.string);
						if(pId){
							var logs = [];
							jsclient.block();
							jsclient.gamenet.request("pkplayer.handler.getSymjLog",{uid:pId},function(rtn){
								if(rtn.result == 0) {
									logs = JSON.parse(JSON.stringify(rtn.playLog["logs"]));
									if(logs.length > 0){
										printfLogListToFile(logs,pId);
									}
									else {
										jsclient.showMsg("查询失败");
										jsclient.unblock();
									}
								}
								else {
									jsclient.showMsg("查询失败");
									jsclient.unblock();
								}
							});
						}
					}
				},
				send_btn:{
					_click:function(btn,eT){
						//change id
						var pId = parseInt(playerId.string);
						var hId = parseInt(homeId.string);
						if(pId && hId){
							var logs = [];
							jsclient.block();
							jsclient.gamenet.request("pkplayer.handler.getSymjLog",{uid:pId},function(rtn){
								if(rtn.result == 0) {
									logs = JSON.parse(JSON.stringify(rtn.playLog["logs"]));
									if(logs.length > 0){
										for(var i = 0;i < logs.length;i++){
											if(parseInt(logs[i].tableid) == hId){
												printfLogToFile(logs[i].ip,logs[i].url,logs[i].owner,logs[i].now,logs[i].logid,pId,hId);
											}
										}
									}
									else {
										jsclient.showMsg("查询失败");
										jsclient.unblock();
									}
								}
								else {
									jsclient.showMsg("查询失败");
									jsclient.unblock();
								}
							});
							// jsclient.exportdataui.removeFromParent(true);
							// jsclient.exportdataui = null;
						}
					}
				},
				close:{
					_click:function(btn,eT){
						jsclient.exportdataui.removeFromParent(true);
						jsclient.exportdataui = null;
					}
				}
			}
		},
		ctor: function () {
			this._super();
			var exportdataui = ccs.load("res/ExportDataLayer.json");
			ConnectUI2Logic(exportdataui.node, this.jsBind);
			this.addChild(exportdataui.node);
			jsclient.exportdataui = this;
			return true;
		}
	});
})();
```

