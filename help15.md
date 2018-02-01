#### 无缝移植斗地主攻略

海南麻将分支里面ddz分支已经完全把斗地主的6种玩法接入

斗地主资源完全分拆，完全分拆，只需要复制到自己工程目录即可

文件列表如下：

```
	<Project Name="CardGameLayer.csd" Type="Layer" />//经典斗地主
    <Project Name="CardGameLayer_DDZ_ER.csd" Type="Layer" />//二人斗地主
    <Project Name="CardGameLayer_DDZ_HL.csd" Type="Layer" />//欢乐斗地主
    <Project Name="CardGameLayer_DDZ_LZ.csd" Type="Layer" />//癞子斗地主
    <Project Name="CardGameLayer_scddz.csd" Type="Layer" />//四川四人
    <Project Name="CardGameLayer_scddz_four.csd" Type="Layer" />//四人斗地主
    <Project Name="choose.csd" Type="Node" />//加入房间选项
    <Project Name="choosePartner.csd" Type="Layer" />//四人斗地主选同伙
    <Project Name="endAll_HLDDZ.csd" Type="Layer" />//斗地主总结算
    <Project Name="endOne_HLDDZ.csd" Type="Layer" />//斗地主每局结算
```

tips:
	在添加到工程里面时，先导入资源。


斗地主代码放在js/ddz目录：

修改app.js和原项目区分

jsclient.netCallBack 里面的initSceneData事件

```
app.js:
    if(!jsclient.playui){
   		jsclient.gameid = d.gameid;
   		if(d.gameid == "ddz"){
   			cc.log("==========playtype:"+d.tData.playType);
   			if(d.tData.playType == "erddz"){//二人斗地主
   				jsclient.Scene.addChild(new CardGameLayer_DDZ_ER());//二人斗地主
   			}else if(d.tData.playType == "lzddz"){ //赖子
   				jsclient.Scene.addChild(new CardGameLayer_DDZ_LZ());
   				// jsclient.Scene.addChild(new EndAllLayer_DDZ());
   			}else if(d.tData.playType == "scddz"){ //四人斗地主
   				if(d.tData.playerNum == 4){ //四人
   					jsclient.Scene.addChild(new CardGameLayer_SCDDZ_FOUR());
   				}
   			}else{
   				//经典
   				jsclient.Scene.addChild(new CardGameLayer());
   			}
   		}else{
   			jsclient.Scene.addChild(new PlayLayer());	
   		}
   	} 

```
在jsclient.netCallBack添加几个是斗地主的监听事件方法

```
	//经典叫分
	,DDZJDJFRob:[0, function(d) {
		cc.log("netCallBack******DDZJDJFRob");
		var sData = jsclient.data.sData;
		sData.tData = d.tData;
	}]
	//赖子叫分
	,DDZLZRob:[0, function(d) {
	   cc.log("netCallBack******DDZLZRob");
   		var sData = jsclient.data.sData;
   		sData.tData = d.tData;
	    sData.players[d.uid].robState = d.rob;
   	}]
   	//二人叫分
   	,DDZERRob:[0, function(d) {
   		var sData = jsclient.data.sData;
   		sData.tData = d.tData;
	    //sData.players[d.uid].robState = d.rob;
  	}]
  	//二人pass
  	,DDZERPass:[0,function(d){
		var sData=jsclient.data.sData;
		var pl=sData.players[SelfUid()];
		pl.mjState=d.mjState;
	}]
	//赖子出牌方法
	,DDZLZPut:[0.8,function(d) {
		cc.log("===癞子斗地主出牌===");
		var sData = jsclient.data.sData;
		var tData = sData.tData;

		tData.lastPut = d.card;
	    tData.lastPutID = d.id;
		tData.tState = TableState.waitEat;
		var pl = sData.players[d.uid + ""];
		if (!pl.mjput) {
			pl.mjput = [];
		}
		pl.mjput = d.card;
	    pl.mjputID = d.id;
		playEffect("nv/" + d.card);
	}]
	//二人斗地主出牌方法
	,DDZERPut:[0.8,function(d) {
		cc.log("===二人斗地主出牌===");
		var sData = jsclient.data.sData;
		var tData = sData.tData;

		tData.lastPut = d.card;
	    tData.lastPutID = d.id;
		var pl = sData.players[d.uid + ""];
		if (!pl.mjput) {
			pl.mjput = [];
		}
		pl.mjput = d.card;
	    pl.mjputID = d.id;
		playEffect("nv/" + d.card);
	}]
```

MJPut 方法同样需要做出区分

```
	if(jsclient.gameid == "hanmj"){
		var sData=jsclient.data.sData;
		var tData=sData.tData;
		tData.lastPut=d.card;
		tData.tState=TableState.waitEat;
		tData.putType=d.putType;
		var pl=sData.players[d.uid];
		pl.mjput.push(d.card); 
		playEffect("nv/"+d.card);
		if(d.uid==SelfUid())
		{
			pl.mjhand.splice(pl.mjhand.indexOf(d.card),1);
			pl.mjState=TableState.waitPut;
			pl.skipHu=false;
		}
		else
		{
			sData.players[SelfUid()+""].mjState=TableState.waitEat;
		}
	}else{
		cc.log("===斗地主出牌===");
		var sData = jsclient.data.sData;
		var tData = sData.tData;
		tData.lastPut = d.card;
		tData.tState = TableState.waitEat;
		tData.putType = d.putType;
		var pl = sData.players[d.uid + ""];
		if (!pl.mjput) {
			pl.mjput = [];
		}
		pl.mjput.push(d.card);
		// playEffect("nv/" + d.card);
		if (d.uid == SelfUid()) {
			pl.mjState = TableState.waitPut;
			pl.skipHu = false;
		} else {
			sData.players[SelfUid() + ""].mjState = TableState.waitEat;
		}
		cc.log("出牌结束====================");
	}
```

创建房间代码根据自己项目结合修改资源

代码调用如下：
```
	//斗地主创建房间
	//类型、局数、炸弹数量、玩家人数、叫分类型
	jsclient.ddzCreateRoom = function(ddzType,round,bomblime,playerNum,gameType) {
	cc.log("斗地主创建房间=================");
	jsclient.block();
	jsclient.gamenet.request("pkplayer.handler.CreateVipTable", {
			round: round,
			bomblime:bomblime,
			gameid:"ddz",
			playtype:ddzType,
			playernum:playerNum,
			gametype:gameType
		},
		function(rtn) {
			jsclient.unblock();
			if (rtn.result == 0) {
				jsclient.data.vipTable = rtn.vipTable;
				jsclient.joinGame(rtn.vipTable,"ddz");
			}
		});
};
```

加入房间选项斗地主或麻将

[choose.js文件](choose.js)

choose.json和choosePartner.json资源用res/choose和原先项目不做关联


resource.js 添加修改
```
	Poker_Card_png:"res/ddz/cards/Poker.png",
	Poker_Card_plist:"res/ddz/cards/Poker.plist",
	Poker_Min_png:"res/ddz/cards/Pokers_min.png",
	Poker_Min_plist:"res/ddz/cards/Pokers_min.plist",
	Poker_back_png:"res/ddz/cards/BGPlist.png",
	Poker_back_plist:"res/ddz/cards/BGPlist.plist",

	EndAllHLDDZ_json:"res/endAll_HLDDZ.json",
	EndOneHLDDZ_json:"res/endOne_HLDDZ.json",
	ChoosePartner:"res/choosePartner.json",



	cc.spriteFrameCache.addSpriteFrames("res/ddz/cards/Poker.plist");
	cc.spriteFrameCache.addSpriteFrames("res/ddz/cards/Pokers_min.plist");
	cc.spriteFrameCache.addSpriteFrames("res/ddz/cards/BGPlist.plist");
```
服务器方面：
	需要服务器配合搭建环境。

斗地主代码移植日期是:2016.11.5日内容