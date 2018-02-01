# 阿里盾攻略（所有内容和下载文档需都快速看一遍 在开始接入）（添加方法与平台无关以mac为主要参考）

# (一)c++篇

* 1.需要底层相关c++支持，下载压缩包 [cpp_3.11.zip](img18/cocos_3.11_xxtea.zip)
如果你是3.10.1点这里[cpp_3.10.zip](img18/cocos_3.10_xxtea.zip)
里面分别有几个cpp文件直接替换掉，当然细心的童鞋想知道改了什么可以compare下人肉去merge,底层主要是提供两个
接口支持，一个是加密解密，一个是热更新多域名替换支持，版本为咱们的打包版本3.11.1

![](img18/1.png)
![](img18/2.png)
![](img18/3.png)

* 2.导入xxtea文件，该文件已经在引擎中了，只要我们加进来就行 

ios
![](img18/xxtea1.png)
android  路径: client\frameworks\cocos2d-x\cocos  修改Androi.mk
![](img18/xxtea2.png)

* 3.重新编译引擎不管你是window, ios, android  


# (二)加密工具篇
* 1.下载工具脚本[shell](img18/shell.zip)放到这里![](img18/4.png)
* 2.打开sourceTree调用出控制台，如果你是window目前测试必须是sourceTree的![](img18/6.png)
* 3.在shell目录下运行脚本node xxteaEncode.js ../../web 出现下面结果代表运行成功![](img18/5.png)
* 4.在web下面哪些.json文件会对应生成.dat文件，这个就是加密生成的，可以打开看看是否为乱吗，你可别认为只用了base64编码那么简单哦!
![](img18/7.png)

* 5.兼容海外加密与上面的加密方法存在一种就行，因为海外和国内配置不一样所以需要管理两套，建立文件夹如下
![](img18/jsonen.png)
json_en为海外配置，json_cn为国内配置，这个可以自己指定
加密方法国外为node xxteaEncode.js ../json_en ../../web，国内为node xxteaEncode.js ../json_cn ../../web
加密脚本下载[shell支持海外策略](img18/shell_en_cn.zip)

# (三)阿里盾接入篇

阿里盾接入要做的几个问题： 参看湖南项目
* 1.阿里盾SDK接入 ( 有3秒一次请求，有结果就停止的需求 )
* 2.设置下载更新的地址
* 3.设置下载json配置的 地址
* 4.修改回放的下载地址
* 5.GameCfg添加minVersion字段控制是否能进入游戏的最低热更版本
* 6.保证兼容线上玩家
* 7.加密的 .dat 的使用
* 8.兼容最后使用配置中的servers进入游戏
* 9加密脚本接入

具体文档下载  [aliDun接入.docx](img18/aliDun接入.docx) 
SDK [anliYunCeng_v2.7z](img18/anliYunCeng_v2.7z)

有C++层问题联系我（呼延），js脚本层配置层的联系陈继尚



