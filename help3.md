android环境搭建和文件引入流程
===========

__准备：__ 
	
	Eclipse
	
	ndk  r10e版本
	
	sdk
	
	ant

0. 请参考下图：

	![](img4/zhunbei_1.png)

	![](img4/zhunbei_2.png)

	![](img4/zhunbei_3.png)

	![](img4/zhunbei_4.png)

	![](img4/zhunbei_5.png)

1. 脚本引入文件（如：湖南麻将）

	![](img4/page1.png)
	
	引入的是源码下的android文件夹
	
	![](img4/page2.png)
	（cocos3.10需引用android/script1文件
	cocos3.0需要引用android/script）
	脚本：[linkAndroid](img4/linkAndroid.cmd)
	
	__注意：__安卓源码使用的是JSC文件

	jsc生成使用的是：[copySo_Jsc](img4/copySo_Jsc.cmd)
	
	![](img4/page3.png)
	
2. 在elipse下引入sdk和ndk

	![](img4/page4.png)
	
3. 导入项目和libcocos2d	
	
	![](img4/page5.png)
	
	导入项目
	
	![](img4/page6.png)
	
	导入libcocos2d
	
	![](img4/page7.png)
	
4. 导入第三方jar

	![](img4/page8.png)
	
	![](img4/page9.png)

4. 导出apk 发布包 详细流程如下：

	![](img4/daobao_1.png)
	
	![](img4/daobao_2.png)	

	![](img4/daobao_3.png)
	
	![](img4/daobao_4.png)

	![](img4/daobao_5.png)
	
	![](img4/daobao_6.png)

	![](img4/daobao_7.png)
	
	![](img4/daobao_8.png)
	
	
	
