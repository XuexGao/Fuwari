---
title: OPPO R9s刷机教程
description: 本期教程会教你从什么都不会到刷第三方系统
draft: false
image: /images/oppo-r9s/cover.jpg
lang: ""
published: 2026-05-31
tags:
  - OPPO R9s
  - 解BL锁
---



由于要降级，所以要进9008
## 第一步:进9008
首先将手机关机
![](/images/oppo-r9s/01-9008.jpg)
长按电源键加音量加和减并连接电脑
在此电脑中右键管理，点击设备管理器，在端口内检查是否有9008（如没有请尝试再进一遍，如有报错请在网上下载9008驱动，[下载链接](https://pan.xiegao.top/%E8%B5%84%E6%BA%90%E5%88%86%E4%BA%AB/%E5%A4%A9%E7%BF%BC%E4%BA%91%E7%9B%98/OPPO%20R9s%20(sk)/%E8%A7%A3BL/1.%E4%B8%80%E9%94%AE%E5%AE%89%E8%A3%85%E5%AE%89%E5%8D%93%E9%A9%B1%E5%8A%A8.exe) ）
![](/images/oppo-r9s/02-port-check.jpeg)
![](/images/oppo-r9s/03-bl-unlock-tool.jpeg)
如有请到第二步
由于r9s较为新的版本都把fastboot彻底屏蔽了，所以要降级

## 第二步:降级
首先解压链接里唯一可解bl的包，[下载链接](https://pan.xiegao.top/%E8%B5%84%E6%BA%90%E5%88%86%E4%BA%AB/%E5%A4%A9%E7%BF%BC%E4%BA%91%E7%9B%98/OPPO%20R9s%20(sk)/%E8%A7%A3BL/2.%E7%BA%BF%E5%88%B7%E8%BD%AF%E4%BB%B6,%E5%88%B7%E6%9C%BA%E5%8C%85.zip)，然后打开第二个程序（.exe）
![](/images/oppo-r9s/04-bl-success.jpeg)
然后点击确定，在选择界面中r9s选择第一个，r9sk选择第二个
![](/images/oppo-r9s/05-samsung-odm.jpeg)
然后点击开始
![](/images/oppo-r9s/06-unlock-confirm.jpeg)
如果开始点不了请打开第四个程序（.exe），然后再选择（选择和上一次一样）
![](/images/oppo-r9s/07-exit-diag.jpeg)
点击是
![](/images/oppo-r9s/08-sw-version.jpeg)
然后等一会儿
如果出现握手失败的报错请长按电源键和音量加键等到开机，然后再长按电源加音量加和减键
如出现这种报错请确认数据线的稳定性
![](/images/oppo-r9s/09-erase-ok.jpeg)
如果出现绿字就是降级完成，请点击停止
![](/images/oppo-r9s/10-lock-check.jpeg)

## 第三步:解bl
首先下载个[搞机助手](https://pan.xiegao.top/%E8%B5%84%E6%BA%90%E5%88%86%E4%BA%AB/%E5%A4%A9%E7%BF%BC%E4%BA%91%E7%9B%98/%E8%BD%AF%E4%BB%B6/%E7%94%B5%E8%84%91%E8%BD%AF%E4%BB%B6/%E6%90%9E%E6%9C%BA%E5%8A%A9%E6%89%8B/%E6%90%9E%E6%9C%BA%E5%8A%A9%E6%89%8B_V4.9.1.zip?preview=download)或者[柚坛工具箱](https://toolbox.uotan.cn/)
安装完后点击adb命令行之类的文字

在里面输入: `adb reboot bootloader` ，然后回车
如有报错请检查手机是否连接或者在关于手机里点击四次版本号
![](/images/oppo-r9s/11-twrp-sel.jpeg)
在其他设置中找到开发者选项
![](/images/oppo-r9s/12-twrp-openok.jpeg)
然后打开oem解锁，再输入一次试试
![](/images/oppo-r9s/13-twpr-main.jpeg)
如没有报错会进入fastboot
![](/images/oppo-r9s/14-twrp-swipe.jpeg)
进入fastboot后再在adb命令行中输入:`fastboot oem unlock-go`（显示OKAY为成功，如失败请照上面的提示退出然后打开oem解锁）

成功后将会提示要输入密码，不用管，直接下一步（如没有大概率为不成功）

## 第四步:刷twrp
首先下载[XIAOMI FLASH](https://pan.xiegao.top/%E8%B5%84%E6%BA%90%E5%88%86%E4%BA%AB/%E5%A4%A9%E7%BF%BC%E4%BA%91%E7%9B%98/OPPO%20R9s%20(sk)/%E8%A7%A3BL/MiFlash%E5%88%B7%E6%9C%BA%E5%B7%A5%E5%85%B7.msi)并安装，然后下载r9s－new并解压到文件夹（不准套娃，链接在文尾）
双击XiaoMI Flash并按确定
然后在上面的框中选择你解压好的r9s－new
![](/images/oppo-r9s/15-twrp-reboot.jpeg)
照第一步进入9008，然后回到第四步
进入9008后选择加载设备
![](/images/oppo-r9s/16-twrp-new.jpeg)
然后等设备跳出来后点击刷机（如有报错请重进9008然后再刷（长按电源键和音量加键等到开机，然后再长按电源加音量加和减））
这样就是刷成功了
![](/images/oppo-r9s/17-twrp-new-2.jpeg)

## 第五步:进twrp并刷第三方
刷完twrp后长按电源键加音量减键直到进入下图界面
![](/images/oppo-r9s/18-twrp-main2.jpg)
先刷入这个新版本[TWRP](https://pan.xiegao.top/%E8%B5%84%E6%BA%90%E5%88%86%E4%BA%AB/%E5%A4%A9%E7%BF%BC%E4%BA%91%E7%9B%98/OPPO%20R9s%20(sk)/Recovery/TWRP/twrp-3.7.1_12-4-R9s.img)至Recovery分区，刷完之后重启到Recovery
然后点击清除
滑动下面的小滑块
![](/images/oppo-r9s/19-wipe.jpg)
第一次可能会报错
退到主界面，然后点击重启，再次重启到Recovery
![](/images/oppo-r9s/20-reboot-recovery.jpg)
然后再点击清除，滑动下面的小滑块
这样就是成功了
![](/images/oppo-r9s/21-wipe-success.jpeg)
然后退到主界面，点击安装
有TF卡的点击选择储存选择TF卡，请提前在读卡器放入刷机包（有TF卡没读卡器和没TF卡的都看后面）
没有TF卡的连接电脑把刷机包放储存设备里，有TF卡但没有读卡器的也可以在这里选择TF卡把刷机包放进去
![](/images/oppo-r9s/22-install-zip.jpg)
然后选择刷机包滑动刷入，如果还要刷Magisk或者SukiSU可以在选择刷机包后直接点击添加更多刷机包（刷机包文尾的链接有）
![](/images/oppo-r9s/23-add-zip.jpg)
等成功后点击重启
这样就成功了

有错误请在评论区指正

其他文件链接 https://pan.xiegao.top