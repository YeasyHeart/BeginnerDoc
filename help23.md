# 服务器防护分层
游戏中添加服务器防护分层，在游戏启动的时候就将所有配置的可用服务器ip获取缓存起来，然后按照一定的优先级，依次尝试连接服务器，当高优先级服务器连接失败后，尝试连接低优先级服务器，直到连接成功或者所有服务器都尝试失败。

目前游戏中的服务器分为三种：
1. 阿里盾服务器，需要异步的解密成实际可用的ip。
```
	,"aliGroup":[
		{"gNames":["phz1.xxx.aliyungf.com"], "Times":0},
		{"gNames":["phz2.xxx.aliyungf.com"], "Times":1000},
		{"gNames":["phz3.xxx.aliyungf.com"], "Times":2000}
	]
	,"aliPort":"15010:15039"
```
2. 阿里高防服务器。
```
	"servers":"xxx.xx.xx.xx:15010:15039,xxx.xxx.xxx.xx:15010:15039"
```
3. 新高防服务器。（新加的配置，与阿里高防配置方式一样，只不过会配不同的ip,没有的话就留空）
```
	"servers2":"xxx.xx.xx.xx:15010:15039"
```

针对上述三种服务器，添加了一个服务器优先级的配置，即游戏中优先尝试连接哪个服务器。
```
	"priorityLevel":"aliDunServer,aliHighDefenceServer,newHighDefenceServer"
```
aliDunServer对应阿里盾服务器，
aliHighDefenceServer对应阿里高防， 
newHighDefenceServer对应新高防。
优先级的顺序即队列的位置，从左到右依次尝试。
即图中的优先级为：阿里盾——阿里高防——新高防。

完整的一个新配置如下：
```
  "servers":"xxx.xx.xx.xx:15010:15039,xxx.xxx.xxx.xx:15010:15039"
  ,"servers2":"xxx.xx.xx.xx:15010:15039"
  ,"priorityLevel":"aliDunServer,aliHighDefenceServer,newHighDefenceServer"
  ,"aliGroup":[
    {"gNames":["phz1.xxx.aliyungf.com"], "Times":0},
    {"gNames":["phz2.xxx.aliyungf.com"], "Times":1000},
    {"gNames":["phz3.xxx.aliyungf.com"], "Times":2000}
  ]
  ,"aliPort":"15010:15039"
```


PS：代码里缓存了上一次连接成功的ip和端口配置，在游戏中断网的情况下，会先使用上一次缓存的配置尝试连接服务器，如果连接失败，才会接着按照优先级尝试连接服务器。

PS2：代码接入后，在更新100%的时候连接服务器，只有在所有ip都尝试失败后，才会弹窗提示服务器连接不上，而不会某一个ip失败就弹窗提示。缺点是假如多个ip尝试失败，这里更新显示100%会停比较久的时间。


接入步骤：
具体代码和配置请参考[app.js](img23/app.js)，[PriorityConnect.js](img23/PriorityConnect.js)，[Update.js](img23/Update.js)和[android.json](img23/android.json)

1. 添加PriorityConnect.js，并且在project.json中添加"src/PriorityConnect.js"

	PS：这里测试的时候可以打开priorityLog的注释显示日志。
	
2. 修改 GetRemoteCfg （读测试配置文件登录）
	PS:这里的jsclient.hasAliDunSDK（）方法在app.js里，是封装的判断是否使用阿里盾方法，各个项目可根据自己的情况修改。

	![](img23/img23_0.png)

3. 修改LoadConfig （正常情况登录）

	![](img23/img23_1.png) 

	改为 
	
	![](img23/img23_2.png)

4. 修改GetCfgAgainWhenGetFail （获取配置失败情况下登录）
	这里注意根据项目代码不同自己做修改。
	将原来请求阿里盾和发送updateFinish的方法改为
	jsclient.initAllServer();
	if (!jsclient.hasAliDunSDK()) sendEvent("updateFinish");

	![](img23/img23_3.png) 

	改为 
	
	![](img23/img23_4.png)

5. 在Update.js中，添加循环解密获取阿里盾ip的相关代码，并删除旧的阿里盾处理代码。

	删除图中代码

	![](img23/img23_5.png)

	添加图中代码

	![](img23/img23_6.png)

6. 修改Update.js里Update的Ui里的计算获取阿里盾超时的事件。

	![](img23/img23_7.png) 

	改为 

	![](img23/img23_8.png)

7. 修改Update.js里Update的Ui里的响应GetRemoteIpByAliDun_Back的事件，直接调用前面封装好的处理方法jsclient.handleGetAliDunIpResult(ip);

	![](img23/img23_9.png) 

	改为 

	![](img23/img23_10.png)

8. 修改app.js里的native方法，删除旧的GetRemoteIpByAliDun方法里实现，添加新的getRealAliDunIp方法。

	![](img23/img23_11.png)

9. 修改app.js里UpdateFinish事件响应里连接服务器代码。

	![](img23/img23_12.png) 

	改为 

	![](img23/img23_13.png)

10. 修改app.js里的disconnect事件响应的断网处理，添加一个当前数是否还有可用ip的判断。

	![](img23/img23_14.png) 

	改为 

	![](img23/img23_15.png)













