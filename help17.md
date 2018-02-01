# 修改项目为WebStorm可调试版本

__注意：__由于跨域等问题，建议该版本只用于开发调试问题，不建议将其合并到master上

推荐使用chrome浏览器，需要安装调试插件[JetBrains IDE Support](img17/chrome_debug.crx)

1. 修改不规范的语法
```
	#sys.xxx替换成cc.sys.xxx
	#Action替换
		cc.DelayTime替换成cc.delayTime
		cc.MoveTo替换成cc.moveTo
		cc.EaseIn替换成cc.EaseIn.create
		cc.EaseSineIn替换成cc.EaseSineIn.create
		cc.EaseExponentialIn替换成cc.EaseExponentialIn.create
	#listener的创建前面需要加上cc.EventListener.create();
```
	
2. 解压缩 [pomelo-cocos2d-jsb.zip](img17/pomelo-cocos2d-jsb.zip),放入ccclient/js的目录下。

3. 修改main.js中加载pomelo的库
```
	// 加载pomelo网络库
    var pomelostrjs;
    if(!cc.sys.isNative)
        pomelostrjs =  "src/pomelo-cocos2d-jsb/html5/build/build.js";
    else
        pomelostrjs  =  "src/pomelo/index.js";
    var jslist =[pomelostrjs];
    cc.loader.loadJsWithImg(jslist, function (err) {
        if (err)
        {
            cc.log( err );
        }
    });
```
	
4. 查看project.json中，是否有pomelo的加载，有的话去掉。

5. 由于跨域问题，这里需要修改客户端http请求服务器上的web里的json文件部分，改为本地加载。
将web下的配置文件notice.json，configuration.json等文件，复制到res/web目录下。
修改Update.js，其中initUrlDebugInfo()就是将之前的http请求改为加载本地json。
如果还有类似的多个json的http请求，直接在里面类似处理就行。
![](img17/1.png)

![](img17/2.png)
   
6. 修改UpdateLayer.js里的onEnter方法。
将			
```
		UpdateResource();	
```
修改为
```
		if(cc.sys.isNative === true)
		{
			UpdateResource();
		}
		else
		{
			GetRemoteIP();
			jsclient.restartGame();
		}
```
   
7. 修改resources.js，所有使用的json需要都加在resources.js里的res中。

8. 遇到图片加载失败的情况，在app.js里的JSScene的onEnter中加入图片的plist加载。
```
	onEnter: function ()
	{
		this._super();

		cc.spriteFrameCache.addSpriteFrames("res/playing/PHZ/CurPutCards.plist");
		cc.spriteFrameCache.addSpriteFrames("res/playing/PHZ/HandCards.plist");
		cc.spriteFrameCache.addSpriteFrames("res/playing/PHZ/PlayCards.plist");
		cc.spriteFrameCache.addSpriteFrames("res/playing/other/Countdown.plist");

		setEffectsVolume(-1);
		setMusicVolume(-1);
		ConnectUI2Logic(this, this.jsBind);
		this.addChild(new UpdateLayer());
		this.addChild(new BlockLayer());
	}
```

PS：	
如果完成了以上步骤，应该基本可以调试。

注意调试是在工程目录下，不是在git目录下。

如何调试，在WebStorm里打开工程，右键index.html，选择run或者debug。

![](img17/3.png)

在浏览器上，F12打开开发者工具，可实时显示输出和报错信息

![](img17/4.png)

![](img17/5.png)









