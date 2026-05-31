---
title: OPPO R9s刷机教程
description: 本期教程会教你从什么都不会到刷第三方系统
draft: false
image: https://img.xiegao.top/file/s3:s3_1780214387697_ube86o.jpg
lang: ""
published: 2026-05-31
tags:
  - OPPO R9s
  - 解BL锁
---



由于要降级，所以要进9008
## 第一步:进9008
首先将手机关机
![](https://img.xiegao.top/file/s3:s3_1780213296282_kk283i.jpg)
长按电源键加音量加和减并连接电脑
在此电脑中右键管理，点击设备管理器，在端口内检查是否有9008（如没有请尝试再进一遍，如有报错请在网上下载9008驱动，[下载链接](https://pan.xiegao.top/%E8%B5%84%E6%BA%90%E5%88%86%E4%BA%AB/%E5%A4%A9%E7%BF%BC%E4%BA%91%E7%9B%98/OPPO%20R9s%20(sk)/%E8%A7%A3BL/1.%E4%B8%80%E9%94%AE%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93%E9%A9%B1%E5%8A%A8.exe) ）
![](https://img.xiegao.top/file/s3:s3_1780213295688_gd1tvw.jpeg)
![](https://img.xiegao.top/file/s3:s3_1780213295883_08z6qn.jpeg)
如有请到第二步
由于r9s较为新的版本都把fastboot彻底屏蔽了，所以要降级

## 第二步:降级
首先解压链接里唯一可解bl的包，[下载链接](https://pan.xiegao.top/%E8%B5%84%E6%BA%90%E5%88%86%E4%BA%AB/%E5%A4%A9%E7%BF%BC%E4%BA%91%E7%9B%98/OPPO%20R9s%20(sk)/%E8%A7%A3BL/2.%E7%BA%BF%E5%88%B7%E8%BD%AF%E4%BB%B6,%E5%88%B7%E6%9C%BA%E5%8C%85.zip)，然后打开第二个程序（.exe）
![](https://img.xiegao.top/file/s3:s3_1780213300562_nsfzwm.jpeg)
然后点击确定，在选择界面中r9s选择第一个，r9sk选择第二个
![](https://img.xiegao.top/file/s3:s3_1780213300481_iu13z8.jpeg)
然后点击开始
![](https://img.xiegao.top/file/s3:s3_1780213300613_2852d9.jpeg)
如果开始点不了请打开第四个程序（.exe），然后再选择（选择和上一次一样）
![](https://img.xiegao.top/file/s3:s3_1780213302600_x170cp.jpeg)
点击是
![](https://img.xiegao.top/file/s3:s3_1780213302579_mcw19k.jpeg)
然后等一会儿
如果出现握手失败的报错请长按电源键和音量加键等到开机，然后再长按电源加音量加和减键
如出现这种报错请确认数据线的稳定性
![](https://img.xiegao.top/file/s3:s3_1780213302687_e4vsn6.jpeg)
如果出现绿字就是降级完成，请点击停止
![](https://img.xiegao.top/file/s3:s3_1780213305589_n1fs1k.jpeg)

## 第三步:解bl
首先下载个[搞机助手](https://pan.xiegao.top/%E8%B5%84%E6%BA%90%E5%88%86%E4%BA%AB/%E5%A4%A9%E7%BF%BC%E4%BA%91%E7%9B%98/%E8%BD%AF%E4%BB%B6/%E7%94%B5%E8%84%91%E8%BD%AF%E4%BB%B6/%E6%90%9E%E6%9C%BA%E5%8A%A9%E6%89%8B/%E6%90%9E%E6%9C%BA%E5%8A%A9%E6%89%8B_V4.9.1.zip?preview=download)或者[柚坛工具箱](https://toolbox.uotan.cn/)
安装完后点击adb命令行之类的文字

在里面输入: `adb reboot bootloader` ，然后回车
如有报错请检查手机是否连接或者在关于手机里点击四次版本号
![](https://img.xiegao.top/file/s3:s3_1780213305674_o8ca15.jpeg)
在其他设置中找到开发者选项
![](https://img.xiegao.top/file/s3:s3_1780213305665_d6amfh.jpeg)
然后打开oem解锁，再输入一次试试
![](https://img.xiegao.top/file/s3:s3_1780213308276_n7dl94.jpeg)
如没有报错会进入fastboot
![](https://img.xiegao.top/file/s3:s3_1780213308347_wcw4ve.jpeg)
进入fastboot后再在adb命令行中输入:`fastboot oem unlock-go`（显示OKAY为成功，如失败请照上面的提示退出然后打开oem解锁）

成功后将会提示要输入密码，不用管，直接下一步（如没有大概率为不成功）

## 第四步:刷twrp
首先下载[XIAOMI FLASH](https://pan.xiegao.top/%E8%B5%84%E6%BA%90%E5%88%86%E4%BA%AB/%E5%A4%A9%E7%BF%BC%E4%BA%91%E7%9B%98/OPPO%20R9s%20(sk)/%E8%A7%A3BL/MiFlash%E5%88%B7%E6%9C%BA%E5%B7%A5%E5%85%B7.msi)并安装，然后下载r9s－new并解压到文件夹（不准套娃，链接在文尾）
双击XiaoMI Flash并按确定
然后在上面的框中选择你解压好的r9s－new
![](https://img.xiegao.top/file/s3:s3_1780213308262_rijz47.jpeg)
照第一步进入9008，然后回到第四步
进入9008后选择加载设备
![](https://img.xiegao.top/file/s3:s3_1780213311836_gsvog5.jpeg)
然后等设备跳出来后点击刷机（如有报错请重进9008然后再刷（长按电源键和音量加键等到开机，然后再长按电源加音量加和减））
这样就是刷成功了
![](https://img.xiegao.top/file/s3:s3_1780213311831_jpf7tu.jpeg)

## 第五步:进twrp并刷第三方
刷完twrp后长按电源键加音量减键直到进入下图界面
![](https://img.xiegao.top/file/s3:s3_1780213430553_qtds28.jpg)
先刷入这个新版本[TWRP](https://pan.xiegao.top/%E8%B5%84%E6%BA%90%E5%88%86%E4%BA%AB/%E5%A4%A9%E7%BF%BC%E4%BA%91%E7%9B%98/OPPO%20R9s%20(sk)/Recovery/TWRP/twrp-3.7.1_12-4-R9s.img)至Recovery分区，刷完之后重启到Recovery
然后点击清除
滑动下面的小滑块
![](https://img.xiegao.top/file/s3:s3_1780213430400_cra9i9.jpg)
第一次可能会报错
退到主界面，然后点击重启，再次重启到Recovery
![](https://img.xiegao.top/file/s3:s3_1780213430216_wgg4ff.jpg)
然后再点击清除，滑动下面的小滑块
这样就是成功了
![](https://img.xiegao.top/file/s3:s3_1780213435958_ghmy06.jpeg)
然后退到主界面，点击安装
有TF卡的点击选择储存选择TF卡，请提前在读卡器放入刷机包（有TF卡没读卡器和没TF卡的都看后面）
没有TF卡的连接电脑把刷机包放储存设备里，有TF卡但没有读卡器的也可以在这里选择TF卡把刷机包放进去
![](https://img.xiegao.top/file/s3:s3_1780213436244_br0fu0.jpg)
然后选择刷机包滑动刷入，如果还要刷Magisk或者SukiSU可以在选择刷机包后直接点击添加更多刷机包（刷机包文尾的链接有）
![](https://img.xiegao.top/file/s3:s3_1780213436295_dllsdi.jpg)
等成功后点击重启
这样就成功了

有错误请在评论区指正

其他文件链接 https://pan.xiegao.top