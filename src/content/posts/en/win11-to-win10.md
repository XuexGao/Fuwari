---
title: "Win11 retains data without loss!"
description: "I’m increasingly frustrated with the persistent “sticky” nature of Windows 11. Can we consider a downgrade? Or is there a more permanent solution to preserve my data?"
published: 2025-11-23
image: ../../assets/images/win11-to-win10.webp
tags:
  - Windows
  - 降级
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Here’s the translation:  “Introduction”

### Why return to Windows 10?
There are too many reasons.
- Windows 11 has largely updated its UI, but some areas still feel clunky due to incomplete optimizations. See: [We’ve uncovered the deep-seated reasons why Windows 11 is so difficult to master!_哔哩哔哩](https://www.bilibili.com/video/BV11MVoznE4L/?spm_id_from=333.1387.search.video_card.click&vd_source=6b94c66d8e200ba092130f674228bbff)
- Windows 10 and Win11 both utilize NT 10.x kernels, and programs running on Windows 11 are likely to run on Windows 10 as well. Microsoft’s documentation typically specifies the minimum version number for most of its programs, which is almost always `Windows 10 2016 and later` or **Support Windows 10 2016 and beyond**. We generally use versions that are more recent than this, such as `21h2` and `22h2`, so there is no need to worry about compatibility issues.

### What are the impacts of this unconventional approach?
Almost no damage, despite the fact that we need to do some post-work, but it’s due to the inherent nature of Windows 10 and 11 – they are things that won't cause any irreversible harm.

### “After upgrading, what will I lose?”
Windows 11 has features that are absent on Windows 10, and those features that are present on both systems will remain. The “Upgrade” app for Windows 11 will be unusable or disappear directly after its launch.

### Is data upgrading?
Theoretically, this process will only target Windows versions and will not erase your data, including applications, documents, or personal information.

### Microsoft has not released a public channel downgrade.
You can return to Windows 10 during a 30-day grace period after installing Windows 10 and upgrading to Windows 11. However, this is not a special event; it’s a conservative date set by Microsoft to minimize inconvenience with the upgrade process.

# Please provide the text you would like me to translate.
Okay, I understand. Please provide the text.
Data is valuable; exercise caution.
Okay, please provide the text. I’m ready when you are.

Okay, I understand. Please provide the text.
Ensure you have a PE U disk, if you don’t understand what I’m saying, please do not proceed.
Okay, please provide the text. I’m ready when you are.

First, ensure you are running Windows 11 with **Official** edition, and if you’ve joined the **Windows Insider Preview**(https://www.windowsinsiderpreview.com/), please try to return to **Official**.

接下来我们先去下载Win10的ISO，前往 https://www.microsoft.com/zh-cn/software-download/windows10 ，如果你发现你没有可以下载ISO文件的地方，如图
![](../../assets/images/win11-to-win10-1.webp)

点击F12，打开Devtools，切换为设备仿真
![](../../assets/images/win11-to-win10-2.webp)

按F5，刷新页面，此时网页就会认为你是手机，就会让你下载ISO了
![](../../assets/images/win11-to-win10-3.webp)

选择版本 **Windows 10 （多版本ISO）**
![](../../assets/images/win11-to-win10-5.webp)

选择 **简体中文**
![](../../assets/images/win11-to-win10-6.webp)

下载 **64位版本的ISO**
![](../../assets/images/win11-to-win10-7.webp)

得到ISO文件
![](../../assets/images/win11-to-win10-8.webp)

确保你安装了 **支持解压缩ISO** 的软件，如 [Bandizip 官方网站 - 免费压缩软件下载 (Windows)](https://www.bandisoft.com/bandizip/) ，**解压ISO文件**
![](../../assets/images/explorer_xY0rowaOaU.gif)

打开 **已解压的ISO** 文件夹，重命名 `setup.exe` 为 `setup1.exe`
![](../../assets/images/win11-to-win10-11.webp)

更改文件属性 - 兼容性为 **Windows 8** 
![](../../assets/images/explorer_6TrQ3aXWcR.gif)

Download the forced activation package: [Win11ToWin10.zip](https://acofork-my.sharepoint.com/:u:/g/personal/af_acofork_onmicrosoft_com/ESxJWKgjjHVEhlNoBG4oNWUB_-rGTlLRh1CkXdLoxJsGpw?e=8s79zt). The archive contains the mandatory installation upgrade process.

解压出 `ei.cfg` 和 `setupcompat.dll` 。将其复制到ISO文件夹下的 `sources` 文件夹并替换其中已有的文件
![](../../assets/images/win11-to-win10-13.webp)

![](../../assets/images/explorer_9vcYIunVJH.gif)

打开 `setup1.exe` ，**更改 Windows 安装程序下载更新的方式**，选择 **不是现在**，然后一路下一步
![](../../assets/images/SetupHost_dtT7QeMuhO.gif)

等待变为 **准备就绪，可以安装** ，并确保 **保留个人文件和应用** ，选择 **安装** 
![](../../assets/images/win11-to-win10.webp)

等待设备开机时从 **白条转圈** 变为 **白点转圈** ，即Windows10已被安装
![](../../assets/images/win11-to-win10-15.webp)

The system may display a black screen upon startup. This occurs when the user logs in, accompanied by a warning sound and a black screen. The mouse cursor becomes visible while moving, but cannot interact with any elements on the screen.

进入其他系统（如U盘中的PE系统），删除所有 
```
C:\ProgramData\Microsoft\Windows\AppRepository\StateRepository-开头的文件
```

Restarting now, should be successful.

Open PowerShell as Administrator.

首先修复一下系统
```
Dism.exe /Online /Cleanup-Image /CheckHealth
DISM.exe /Online /Cleanup-image /Scanhealth
DISM.exe /Online /Cleanup-image /Restorehealth
sfc /scannow
```

接下来修复系统应用
```
恢复系统应用：add-appxpackage -register "C:\Windows\SystemApps\*\AppxManifest.xml" -disabledevelopmentmode

恢复内置应用：add-appxpackage -DisableDevelopmentMode -Register "C:\ProgramData\Microsoft\Windows\AppRepository\*\AppxManifest.xml" -verbose

恢复应用商店安装的应用：add-appxpackage -DisableDevelopmentMode -Register "C:\Program Files\WindowsApps\*\AppxManifest.xml" -verbose
```

你还可能会遇到点击 Win 弹出开始菜单后打不开设置，我是这样解决的
![](../../assets/images/explorer_DqoWvdqpPS.gif)

Upgraded to Windows 10.