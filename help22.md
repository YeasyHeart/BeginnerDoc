# 本地缓存配置
用于特殊情况下获取不到网络上的配置，使用上一次的配置（假如之前缓存过）或者默认配置可以进入游戏

修改主要在于两处：
1. 获取配置成功的时候要将配置缓存起来
2. 获取配置失败的时候，读取上一次的缓存配置，假如没有缓存，那么使用默认的配置。

接入流程如下：

1.添加LocalJson.js，并修改里面的默认配置为你的项目配置。

2.修改Update.js，分别修改上述配置的缓存。主要涉及到Notice，update，活动和config等。

2.1 Notice缓存

![](img22/img22_0.png)

2.2 活动缓存

![](img22/img22_1.png)

2.3 更新tip缓存

![](img22/img22_2.png)
![](img22/img22_3.png)

注意这里的formatStr方法需要单独提取出来，原来是在startUpdateCfg方法内部定义的。

![](img22/img22_4.png)

2.4 Config缓存

![](img22/img22_5.png)

Config获取失败会调用GetCfgAgainWhenGetFail。

![](img22/img22_6.png)
![](img22/img22_7.png)


具体代码可参考[update.js](img22/update.js)和[LocalJson.js](img22/LocalJson.js)。



