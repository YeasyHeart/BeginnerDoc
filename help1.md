# xcode文件引入流程

下载 [cocos 3.10](http://www.cocos.com/download/#) 编辑器

下载 git clone git@120.25.224.7:developer/xxx.git 代码

1. 建立cocos项目

	新建项目
	
	![](img/page1.png)
	
	配置项目
	
	![](img/page2.png)
	
	__PS.__尽量源码地址跟Cocos新建目录处于同一路径下
	
2. 打开Xcode链接文件

	路径
	
	![](img/page3.png)
	
	项目Xcode原始文件列表
	
	![](img/page4.png)
	
	删除JS Common下的Script文件夹
	
	![](img/page5.png)
	
	删除引用就可以了
	
	![](img/page6.png)
	
	删除Classes下AppDelegate.cpp AppDelegate.h两个引用
	
	![](img/page7.png)
	
	添加源码文件下Classes下所有文件
	
	![](img/page8.png)
	
	删除项目本身自带的ios目录
	
	![](img/page9.png)
	
	link源码下ios目录到项目目录下，在把源码里剩余的文件添加到项目工程里面来。
	
	![](img/page10.png)
	
	__PS:__注意加入的文件的格式
	
	![](img/page11.png)
	
	删除项目工程下Resources所有文件的引用
	
	![](img/page12.png)
	
	在源码下引入这个几个文件
	
	![](img/page14.png)
	
	![](img/page15.png)
	
	__PS：__注意加入的文件格式
	
	![](img/page13.png)
	
3. 加入必要的库文件
	
	手动加入一下
	
	![](img/page16.png)
	
	__库文件：__
	
	libc++.tbd
	
	SystemConfiguration.framework
	
	CoreTelephony.framework
	
4. 加入微信链接库
	
	![](img/page17.png)

