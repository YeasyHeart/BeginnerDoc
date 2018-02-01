# 创建新项目流程

1. 下载代码

![](img7/image001.png)

2. 将windows环境里的debug.win32文件夹复制一份，改名为新工程名

![](img7/image003.png)

![](img7/image005.png)

3.修改ccclient/js 下的login.js Update.js

![](img7/image007.png)

![](img7/image009.png)

4. 修改ccclient/res/project.manifest

![](img7/image011.png)

5. 修改ccclient/update.manifest

![](img7/image013.png)

6. 修改\android\res\values\strings.xml， 给游戏改个名

![](img7/image015.png)

7. 修改android\AndroidManifest.xml 改包名

![](img7/image017.png)

8. 修改android\src\org\cocos2dx\javascript\AppActivity.java 

![](img7/image019.png)

9. 将pdk下的linkwin32.cmd复制到工程文件夹下的：\frameworks\runtime-src\proj.win32\pdk中

10. 修改\frameworks\runtime-src\proj.win32\pdk\linkwin32.cmd

![](img7/image021.png)

11. 删除\frameworks\runtime-src\proj.win32\pdk\下的以下文件和文件夹

![](img7/image023.png)

![](img7/image025.png)

12. 运行\frameworks\runtime-src\proj.win32\pdk\linkwin32.cmd

13. ccclient下创建文件夹update

![](img7/image027.png)

14. 打开cmd，在ccclient文件夹下，运行命令：   node clientupdate.js

![](img7/image029.png)

15. 打开update文件夹，会发现有很多文件夹。

![](img7/image031.png)

16. 打开cmd
输入命令：git tag

![](img7/image033.png)

将得到的所有tag信息复制下来，

用下面两个命令将上面所有的tag信息删除掉
删除本地tag： git tag -d [tag]
删除远程tag git push origin :refs/tags/[tagName]
