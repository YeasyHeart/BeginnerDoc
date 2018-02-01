# 公会接入文档与测试
公会功能：玩家可以加入多个公会，同一个公会的玩家可以一起打牌，消耗公会的钻石，公会开的房间必须全都是本公会成员才能加入，非该公会成员无法加入。

相关js文件：[guild.js](img26/guild.js),[Result.js](img26/Result.js),[app.js](img26/app.js)

公会资源文件(.js、.csd、.png):[公会资源](img26/公会资源.rar)


1. home界面添加公会按钮和响应事件，并添加GuildLayer展示公会信息。
![](img26/img26_0.png)
![](img26/img26_1.png)
![](img26/img26_2.png)


2. 添加app中的公会相关事件处理


	2.1 jsclient.netCallBack中添加updateGuildInfo事件，玩家在线时提示加入离开公会。
	![](img26/img26_3.png)


	2.2 添加jsclient.joinGuildGame公会里点击开始游戏的事件。
	![](img26/img26_4.png)
	![](img26/img26_5.png)


	2.3 修改旧的jsclient.joinGame输入房间号加入房间的对公会的处理。注意这里有的项目之前传参数没有带当前的gameid的话现在需要带上。
	![](img26/img26_6.png)
	![](img26/img26_7.png)


3.申请加入公会

3.1 裸公会（一个公会也不存在），点击右上角"牌友群"直接弹出加入牌友群界面。详见[guildJoin.js](img26/guildJoin.js)
![](img26/img26_15.png)

3.2 已有公会，再加入其它公会。点击图中"申请加入"按钮即可弹出3.1中图所示界面。
![](img26/img26_16.png)
	其中3.1和3.2有个提示语的区别，注意下，如图所示！
![](img26/img26_17.png)


4.会长修改公会房间玩法。

4.1	只有会长才能修改玩法。非会长"修改"按钮不可见！详见：[guild.js](img26/guild.js)
![](img26/img26_18.png)
	点击"修改"按钮后弹出如下图界面。详见[guildCreate.js](img26/guildCreate.js)。
![](img26/img26_19.png)

5.修改打牌界面、结算界面和回放界面，假如是公会房间，显示出公会id。jsclient.data.sData.tData.guildid为公会id数据。
![](img26/img26_8.png)

6.服务器逻辑修改。详见:[GameCode.js](img26/GameCode.js)

6.1 GameCode.js添加判断是否公会房间的方法。

	//判断是否公会房间
    Table.prototype.isGuildTable = function () {
        return !!this.createPara.guildid;
    };
6.2 初始化房间玩家数据的时候，存储下公会id。
	
	Table.prototype.initAddPlayer = function(pl,msg)
		{
			//其他代码
			...
			// 公会不存在房主
			if(tData.owner == -1&&!this.isGuildTable())
			{
				tData.owner = pl.uid;
	        }
		    ...
		｝

6.3 解散房间的时候写日志中添加公会id的记录。
![](img26/img26_9.png)

6.4 扣钻修改，在endVipTable中加上扣钻的参数(原来的一局打完扣钻不用改，服务器有处理不会扣个人的钻)，要特别注意这里的扣钻参数为负值。
![](img26/img26_10.png)

	------------------------------完美的分割线------------------------------


	下面是测试流程。代理账户和代理后台请咨询各产品。
1. 首先要在代理后台添加公会账户。
![](img26/img26_11.png)

2. 给添加的公会账户充钻。
![](img26/img26_12.png)

3. 拿上面公会账户登录公会管理后台（现在默认密码123456，后续如果不对请咨询服务器后台开发人员）。

	3.1 先新建公会，然后设置公会玩法（一个公会只能配置一种玩法）
	![](img26/img26_13.png)

	3.2 添加玩家到公会里，然后就能测试了。
	![](img26/img26_14.png)












