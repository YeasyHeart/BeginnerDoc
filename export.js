/**
 * Created by Administrator on 2016/8/19 0019.
 */
//TODO: pop change player ID
(function() {
    var input;
    ChangeIDLayer = cc.Layer.extend({
        jsBind: {
            block:{_layout:[[1,1],[0.5,0.5],[0,0],true]	},
            _event: {

            },
            back: {
                _layout: [[0, 0.4], [0.5, 0.5], [0, 0]],
                inputimg:{
                    input:{
                        _run:function() {
                            input = this;
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
                send_btn:{
                    _click:function(btn,eT){
                        //change id
                        var id = parseInt(input.string)
                        if(id){
                            jsclient.data.pinfo.uid = id;
                            sendEvent("changeId");
                            jsclient.changeidui.removeFromParent(true);
                            jsclient.changeidui = null;
                        }
                    }
                },
                close:{
                    _click:function(btn,eT){
                        jsclient.changeidui.removeFromParent(true);
                        jsclient.changeidui = null;
                    }
                }
            }
        },
        ctor: function () {
            this._super();
            var changeidui = ccs.load("res/ChangeIdLayer.json");
            ConnectUI2Logic(changeidui.node, this.jsBind);
            this.addChild(changeidui.node);
            jsclient.changeidui = this;
            return true;
        }
    });
})();

//TODO: pop export data by id
(function() {
    var playerId;
    var homeId;
    function printfLogToFile(now,logid,owner,hid,ip) {
        jsclient.block();
        var xhr = cc.loader.getXMLHttpRequest();
        var playUrl="http://"+ip+":800/playlog/"+now.substr(0,10)+"/"+owner+"_"+hid+".json";
        cc.log(playUrl);
        xhr.open("GET", playUrl);
        xhr.onreadystatechange = function () {
            jsclient.unblock();
            if (xhr.readyState == 4 && xhr.status == 200) {
                // cc.log(JSON.parse(xhr.responseText));

                jsb.fileUtils.writeStringToFile(xhr.responseText,
                    jsb.fileUtils.getWritablePath()+ owner + "_" + hid + '.json');
                jsclient.showMsg("写入成功");

            }
        }
        xhr.onerror = function (event) {jsclient.unblock(); }
        xhr.send();
    }
    ExportDataLayer = cc.Layer.extend({
        jsBind: {
            block:{_layout:[[1,1],[0.5,0.5],[0,0],true]	},
            _event: {

            },
            back: {
                _layout: [[0, 0.4], [0.5, 0.5], [0, 0]],
                inputimg:{
                    input:{
                        _run:function() {
                            homeId = this;
                        },
                        _listener:function(sender,eType) {
                            switch (eType) {
                                case ccui.TextField.EVENT_DETACH_WITH_IME:
                                    break;
                            }
                        }
                    }
                },
                player:{
                    input:{
                        _run:function() {
                            playerId = this;
                        },
                        _listener:function(sender,eType) {
                            switch (eType) {
                                case ccui.TextField.EVENT_DETACH_WITH_IME:
                                    break;
                            }
                        }
                    }
                },
                send_btn:{
                    _click:function(btn,eT){
                        var pId = parseInt(playerId.string);
                        var hId = parseInt(homeId.string);
                        // hId = parseInt(169730);
                        // pId = parseInt(102639);
                        cc.log("==============="+pId+":"+hId);
                        if(pId && hId){
                            var logs = [];
                            jsclient.block();
                            jsclient.gamenet.request("pkplayer.handler.getSymjLog",{uid:pId},function(rtn){
                                if(rtn.result == 0) {
                                    jsclient.data.playLog=rtn.playLog;
                                    jsclient.data.pinfo.uid = pId;
                                    logs = JSON.parse(JSON.stringify(rtn.playLog["logs"]));
                                    if(logs.length > 0){
                                        for(var i = 0;i < logs.length;i++){
                                            if(parseInt(logs[i].tableid) == hId){
                                                printfLogToFile(logs[i].now,logs[i].logid,logs[i].owner,hId,logs[i].ip);
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