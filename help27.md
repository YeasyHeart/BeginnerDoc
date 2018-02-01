# 修改iOS语音BUG
目前iOS上语音BUG分两个。
一个是设置中调完音量比如静音后，点击语音，音量全开了。
另一个是iOS上某些系统，切屏后，语音听不到了。（这个需要更新低包，所以尽量早改！）


1. 音量静音后点击语音音量全开了。原因是在jS代码中，点击音量播放语音的时候，将音量设置成1了，但是播放完语音后，并没有设置回去原来的值。
修改Play.js里的showchat方法。
	![](img27/img27.png)


2. iOS上切屏后语音听不到问题。目前测试发现是引擎有bug，暂时的处理方法如下：
修改Classes下的AppDelegate.cpp，修改applicationDidEnterBackground方法和applicationWillEnterForeground方法，在iOS上不调用声音的暂停和恢复方法。
	![](img27/img27_1.png)











