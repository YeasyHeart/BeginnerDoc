# 客户端添加http超时检测
客户端请求http链接，如果服务器被攻击成黑洞状态，http的超时会走完30s才返回响应，当有多个请求叠加会导致等待时间超长，因此需要加上超时检测。



1. 修改js/pomelo/index.js
	由于框架中原来的setTimeout和clearTimeout重写有问题，因此需要注释调下面的代码
	![](img25/img25_0.png)
	
	
2. 检查你的客户端中的http请求代码。

2.0 旧代码的请求如下
```
	var xhr = cc.loader.getXMLHttpRequest();
	var httpUrl = "http://www.xxx.com";
    xhr.open("GET", httpUrl);
	xhr.onreadystatechange = function ()
	{
		//成功响应的处理
	}
	xhr.onerror = function(event)
	{	
		//失败响应的处理
	}
	xhr.send();
```

添加超时检测的修改如下：

2.1 统一定义http的超时检测时间
```
	//在方法为统一定义http的超时检测时间
	var httpTimeOutCheck = 5 * 1000;//单位为ms
```

2.2 给http请求加上超时检测
```
	var xhr = cc.loader.getXMLHttpRequest();
	
	var isTimeOut = false;
    var httpTimer = setTimeout(function(){
        isTimeOut = true;
        xhr.abort();
        if(httpTimer != null)
        {
            clearTimeout(httpTimer);
            httpTimer = null;
            //超时检测的处理
        }
    }, httpTimeOutCheck);        
	
	var httpUrl = "http://www.xxx.com";
    xhr.open("GET", httpUrl);
	xhr.onreadystatechange = function ()
	{
		if(isTimeOut)
        {
            return;
        }

        if(httpTimer != null)
        {
            clearTimeout(httpTimer);
            httpTimer = null;
        }
		
		//成功响应的处理
	}
	xhr.onerror = function(event)
	{	
		if(isTimeOut)
        {
            return;
        }

        if(httpTimer != null)
        {
            clearTimeout(httpTimer);
            httpTimer = null;
        }
		//失败响应的处理
	}
	xhr.send();
```

![](img25/img25_1.png)
![](img25/img25_2.png)



3.接入完毕，可以在代码中将http请求的url改成一个不存在的网址测试下。












