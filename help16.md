声明：此功能需要更新底包

步骤1: c++层修改 cocos2d-x-3.11.1

由于js报错后脚本层处于瘫痪状态，所以需要通过c++上传报错信息。

找到引擎c++文件ScriptingCore.cpp 替换源方法为如下方法。

```
void ScriptingCore::reportError(JSContext *cx, const char *message, JSErrorReport *report)
{
    js_log("%s:%u:%s\n",
            report->filename ? report->filename : "<no filename=\"filename\">",
            (unsigned int) report->lineno,
            message);
    char buff[2048];
    sprintf(buff, "%s:%u:%s\n", report->filename ? report->filename : "<no filename=\"filename\">",
            (unsigned int) report->lineno,
            message );

    std::string strBuff = buff;
    
    std::string reportServer;
    localStorageGetItem("errorReportServer", &reportServer);
    std::string tag;
    if(  cocos2d::Application::Platform::OS_MAC == Application::getInstance()->getTargetPlatform() || cocos2d::Application::Platform::OS_WINDOWS == Application::getInstance()->getTargetPlatform() )
    {
       MessageBox(buff, "error");
       strBuff = "windows" + strBuff;
    }
    else
    {
        std::string strGameId;
        localStorageGetItem("reportGameid", &strGameId);
        strBuff = strGameId + strBuff;
    }

    cocos2d::network::HttpRequest* request = new (std::nothrow) cocos2d::network::HttpRequest();
    request->setRequestType(cocos2d::network::HttpRequest::Type::POST);
    _Urlbase64Encode1( (const unsigned char*)strBuff.c_str(), (unsigned int)strBuff.length(), buff );
//
    strBuff = "?content=";
    strBuff = strBuff + (const char*)buff;
    reportServer = reportServer + strBuff;
    request->setUrl(reportServer.c_str());
    //request->setRequestData(strBuff.c_str(),strBuff.length());
    request->setResponseCallback(CC_CALLBACK_2(ScriptingCore::onHttpRequestCompleted, ScriptingCore::getInstance()));
    request->setTag("report");
    cocos2d::network::HttpClient::getInstance()->send(request);
     js_log("sent error to %s", reportServer.c_str());
    request->release();
    
};

void ScriptingCore::onHttpRequestCompleted(cocos2d::network::HttpClient *sender, cocos2d::network::HttpResponse *response)
{
    if (!response)
    {
        return;
    }
    if( response->getResponseCode() == 404 )
    {
        js_log("send failed 404");
    }
    else
    {
        std::string strOut;
        std::vector<char> *buffer = response->getResponseData();
        for (unsigned int i = 0; i < buffer->size(); i++)
        {
            strOut = strOut + (*buffer)[i];
        }
        js_log("%s send response", strOut.c_str());
        
    }
    
}

```

现在你是编译不过的。

ScriptingCore.h里面 包含头文件 
```
增加两个头
#include "network/HttpRequest.h"
#include "network/HttpClient.h"

放到class方法内加入
void onHttpRequestCompleted(cocos2d::network::HttpClient *sender, cocos2d::network::HttpResponse *response);

```

你还是编译不过的

需要添加base64编码，本应该使用urlEncode的，不过c++层编码有点问题的，还是用base64吧！

添加到cpp任意位置

```
void _Urlbase64Encode1( const unsigned char *input, unsigned int input_len, char *output )
{
    unsigned int char_count;
    unsigned int bits;
    unsigned int input_idx = 0;
    unsigned int output_idx = 0;
    unsigned char alphabet1[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    
    char_count = 0;
    bits = 0;
    for( input_idx=0; input_idx < input_len ; input_idx++ ) {
        bits |= input[ input_idx ];
        
        char_count++;
        if (char_count == 3) {
            output[ output_idx++ ] = alphabet1[(bits >> 18) & 0x3f];
            output[ output_idx++ ] = alphabet1[(bits >> 12) & 0x3f];
            output[ output_idx++ ] = alphabet1[(bits >> 6) & 0x3f];
            output[ output_idx++ ] = alphabet1[bits & 0x3f];
            bits = 0;
            char_count = 0;
        } else {
            bits <<= 8;
        }
    }
    
    if (char_count) {
        if (char_count == 1) {
            bits <<= 8;
        }
        
        output[ output_idx++ ] = alphabet1[(bits >> 18) & 0x3f];
        output[ output_idx++ ] = alphabet1[(bits >> 12) & 0x3f];
        if (char_count > 1) {
            output[ output_idx++ ] = alphabet1[(bits >> 6) & 0x3f];
        } else {
            output[ output_idx++ ] = '=';
        }
        output[ output_idx++ ] = '=';
    }
    
    output[ output_idx++ ] = 0;
}
```

步骤2 配置和js层修改

在 android.json 和 x.x.x.json里添加报错收集服务器ip如下

```
"errorReportServer":"http://139.129.206.54:3000/scmj",
"reportGameid":"scmj",
```

reportGameid是你项目名字，别写成别人项目的了，要不报错可能分不清是谁的项目，找骂的事情咱别干！


在login.js里面的f_login添加如下方法
```
	//设置报错log服务器
	if( "undefined" !=  typeof(jsclient.remoteCfg.errorReportServer ) && "" != jsclient.remoteCfg.errorReportServer )
	{
		sys.localStorage.setItem("errorReportServer", jsclient.remoteCfg.errorReportServer);
		sys.localStorage.setItem("reportGameid", jsclient.remoteCfg.reportGameid);
	}
```

以上是客户端的修改

步骤3 报错服务器配置

由于暂时是初始阶段，牵扯权限安全之类因素，需要报错服务器支持的项目组通知我（呼延）暂时帮你搞定！！！
前提是你客户端需要按照上面的步骤处理完！！！


完成后登录网页 http://139.129.206.54:3001 可以看到你们项目线上报错日志下载链接（参考四川）