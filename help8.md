#设定不分辨率进行测试界面适应

##分辨率
般情况下可能我们只需考虑QVGA、HVGA、WVGA、FWVGA和DVGA等分辨率，但平板电脑可能要用到WSVGA的1024x576以及WXGA的1280x768等分辨率。以下是50种分辨率：

* QVGA = 320 * 240;
* WQVGA = 320 * 480;
* WQVGA2 = 400 * 240;
* WQVGA3 = 432 * 240;
* HVGA = 480 * 320;
* VGA = 640 * 480;
* WVGA = 800 * 480;
* WVGA2 = 768 * 480;
* FWVGA = 854 * 480;
* DVGA = 960 * 640;
* PAL = 576 * 520;
* NTSC = 486 * 440;
* SVGA = 800 * 600;
* WSVGA = 1024 * 576;
* XGA = 1024 * 768;
* XGAPLUS = 1152 * 864;
* HD720 = 1280 * 720;
* WXGA = 1280 * 768;
* WXGA2 = 1280 * 800;
* WXGA3 = 1280 * 854;
* SXGA = 1280 * 1024;
* WXGA4 = 1366 * 768;
* SXGAMINUS = 1280 * 960;
* SXGAPLUS = 1400 * 1050;
* WXGAPLUS = 1440 * 900;
* HD900 = 1600 * 900;
* WSXGA = 1600 * 1024;
* WSXGAPLUS = 1680 * 1050;
* UXGA = 1600 * 1200;
* HD1080 = 1920 * 1080;
* QWXGA = 2048 * 1152;
* WUXGA = 1920 * 1200;
* TXGA = 1920 * 1400;
* QXGA = 2048 * 1536;
* WQHD = 2560 * 1440;
* WQXGA = 2560 * 1600;
* QSXGA = 2560 * 2048;
* QSXGAPLUS = 2800 * 2100;
* WQSXGA = 3200 * 2048;
* QUXGA = 3200 * 2400;
* QFHD = 3840 * 2160;
* WQUXGA = 3840 * 2400;
* HD4K = 4096 * 2304;
* HXGA = 4096 * 3072;
* WHXGA = 5120 * 3200;
* HSXGA = 5120 * 4096;
* WHSXGA = 6400 * 4096;
* HUXGA = 6400 * 4800;
* SHV = 7680 * 4320;
* WHUXGA = 7680 * 4800;

##常用分辨率

* 1920 * 1080
* 1280 * 720    `2560 1440`
* 1024 * 768    `2048 1536`
* 1920 * 1280



##设置不同分辨率进行适配测试
* 通过更改可执行文件的文件名来设置不同的分辨率, 应尽量避免拉伸
* 比如 phz_1920@1080.exe 这里分辨率就是 `1920 1080`的

#设置分辨率的代码
* 这部分代码在 `AppDelegate.cpp` `applicationDidFinishLaunching`
* ```cpp
    char exeName[512];  
	GetModuleFileNameA(NULL,exeName,512);
	int len=strlen(exeName)-1;
	
	myexeName[11]=0;
	for(int i = 0;i<10;i++)
	{
		myexeName[i] = exeName[len-10+i];
	}
    
    bool found=false;
	while(len>0)
	{
		if(exeName[len]=='.') exeName[len]=0;
		else if(exeName[len]=='@')
		{
			exeName[len]=0;
			height=atoi(exeName+len+1);
			found=true;
		}
		else if(exeName[len]=='_')
		{
			if(found) width=atoi(exeName+len+1); 
			break;
		}
		len--;
	}
```