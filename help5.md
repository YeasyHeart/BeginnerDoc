windows文件引入流程 
========

1. 建立cocos项目

	新建项目 &&　配置项目
	
	![](img3/page1.png)
	
	__PS.__尽量源码地址跟Cocos新建目录处于同一路径下
	

2. 运行项目

	项目文件夹跟源码文件夹位置
	
	![](img3/page2.png)
	
	__PS.__这样放方便于脚本批量生成连接
	
	连接脚本（如：连接湖南麻将）
	
	在client目录下linkwindows运行脚本
	
	![](img3/page3.png)
	
	脚本：[linkwindows](img3/linkwindows.cmd)
	
	编译项目，生成Debug.win32文件夹
	
	![](img3/page4.png)
	
	__项目基本的生成就完成了__
	
3. 使用debug模式批量处理多项目多分辨率
	
	### 概念原理
	
	首先，删除Debug.win32下
	
	res\
	
	script\
	
	src\
	
	main.js
	
	project.json
	
	连接源码下的这些文件夹
	
	点击目录下的生成 *.exe 就可以跑起来项目
	
	分辨率：只要修改*.exe的文件名就可以了，使用（长@宽）这种模式。（如：client_480@320.exe）
	
	多分辨率：只要拷贝多个*.exe并且修改文件名。
	
	基本分辨率为：__960@640__ __1136@640__ __1280@720__ __1334@750__
		
	![](img3/page5.png)
		
	### 批量生成
	
	复制多个Debug.win32并改名。
		
	![](img3/page6.png)
		
	脚本：[linkprotowin32](img3/linkprotowin32.cmd)
		
4. 使用VS2012看程序中的log

	点击*.exe，打开VS2012。
	
	在VS2012中找到附加到进程。
	
	![](img3/page7.png)
	
	在附加到进程对话框里面找到*.exe
	
	![](img3/page8.png)
	
5. 快速查看写好的JS代码
	
	在*.exe对话框下，按键盘上的 __R__ 键
	
	
	
	
	
	
	
	
	
		
	
	
	
	
	
	