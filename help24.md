# 客户端获取配置域名优化
客户端在游戏过程中需要通过域名去获取更新包和一些配置文件，为了防止域名被攻击，需要准备多个域名。

域名分成两个部分：
一个为前缀，目前都是sourceXX这种。
一个为后缀，目前有四种（happyplaygame.net，jxlwgame.net，jxlwgame.cn，jxlwgame.com）
下面的优化处理，就是对取域名规则进行优化。


1. 添加 [DomainUrl.js](img24/DomainUrl.js),修改你的project.json添加DomainUrl.js。
2. 修改 DomainUrl.js里的配置为你自己项目的配置
```
	var PreDomainSource = [
		"sources18",
		"sources19"
	];
```

3. 修改 [Update.js](img24/Update.js)。

3.1 删除旧的updateUrl相关的方法（这些方法在DomainUrl.js已经做了新处理）

![](img24/img24_0.png)

3.2 搜索并修改旧的reInitDownUrl()方法为getDomainUrl()方法。

3.3 修改GetRemoteCfg()方法里，在最前面添加 reInitDomain()和getDomainUrl()的调用。
```
	function GetRemoteCfg()
    {
        reInitDomain();
        getDomainUrl();
		...
	}
```

	PS:这里的修改，是为了处理当服务器上某一个更新包配置错误，导致正常的网络走到这里jsclient.downCfgUrl为null了，所以这里获取配置前重新初始化下。

4.到这里就接入完毕，注意这个优化需要配合[本地缓存兼容](help22.md)一起，当所有域名都挂了，使用本地缓存或者代码里配置的值进入游戏。












