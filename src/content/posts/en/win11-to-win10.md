---
title: "Win11 retains data without loss!"
description: "I’m completely fed up with the persistent ‘stickiness’ of Windows 11. What can be done to downgrade it? Or is there a more official solution that preserves my data? Can I still retain my files?"
published: 2025-11-23
image: ../../assets/images/win11-to-win10.webp
tags:
  - Windows
  - 降级
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
To return to Windows 10, you need to follow these steps:

1.  **Download the ISO:** Download the Windows 10 ISO file from Microsoft's website ([https://www.microsoft.com/zh-cn/software-download/windows10](https://www.microsoft.com/zh-cn/software-download/windows10)).
2.  **Prepare your device:** Ensure you have a USB drive (U disk) with sufficient storage space and support for Windows 8 installation.
3.  **Install the ISO:** Install the ISO file onto your USB drive.
4.  **Update to Windows 11:**  The process involves updating your current operating system to Windows 11, which is now supported by Windows 10 versions 2016 and later.
5.  **Restore Data:** After upgrading, you will lose some data, such as applications and documents. It's recommended to perform a "restore data" operation within the Windows settings.
6. **Disable/Remove Appx Files:**  The upgrade process removes "appxmanifest" files, which are necessary for certain apps. These files can be located in the `sources` folder of your ISO. 
7. **Repair System and Applications:** Run DISM to repair system files and scan for malware.
8. **Clean Up:** After the installation, you may encounter a black screen during startup.  This is a temporary glitch that resolves itself with a warning message.
9. **PowerShell Access:** To access the Windows 10 installation process, open PowerShell as an administrator (right-click on the Start button and select "Windows PowerShell").

It’s crucial to understand that the “upgrade” process involves replacing your current operating system version with Windows 11, so you should have a backup of your important data before proceeding.
:::

# Introduction

### Why return to Windows 10?
There are numerous reasons why…
- Win11 has primarily focused on UI enhancements, with some optimizations remaining incomplete. This has resulted in a noticeable feeling of sluggishness and friction across various areas, as detailed in the video: [Win11！_](https://www.bilibili.com/video/BV11MVoznE4L/?spm_id_from=333.1387.search.video_card.click&vd_source=6b94c66d8e200ba092130f674228bbff)
- Windows 10 and Windows 11 both utilize NT 10.x kernels, and programs designed to run on Windows 11 are expected to function correctly on Windows 10. Microsoft’s documentation typically specifies a minimum version number for these programs, which is generally `Windows 10 2016 and later` – encompassing versions supporting Windows 10 2016 and beyond, as well as subsequent releases. However, we often utilize programs with higher versions, such as `21h2` and `22h2`, which do not require compatibility concerns.

### Here’s a professional translation of the text:  “What are the potential impacts of this unconventional approach to ‘upgrading’?”
Despite minimal impact, while addressing the necessary post-event remediation efforts, the inherent nature of Windows 10 and 11 – being fundamentally objects – does not pose any irreversible damage.

### Upon upgrading, what will I lose?
Windows 11 retains features not present in Windows 10, while the combination of both offers a seamless experience.

### Is the “upgrade” process retaining data?
Yes, theoretically, it will only replace the Windows version and will not erase your data, including applications, documents, or personal information.

### Here’s a professional translation of the text:  “Microsoft has not publicly announced a phased reduction in its official channels, citing concerns about maintaining user trust and preventing potential disruptions to existing services.”
Here’s the translation:  “You are entitled to a thirty-day grace period following the initial installation of Windows 10 and subsequent upgrade to Windows 11. During this timeframe, you can revert back to Windows 10 within the settings menu.” “This thirty-day period is not a defined event, but rather a conservative date implemented by Microsoft to minimize potential disruption during the upgrade process.”

# Formal commencement.
:::caution
Data is invaluable; proceed with caution.
:::

:::warning
Ensure you have a PE USB drive; if you don’t understand what I’m saying, please discontinue operation.
:::

Ensure you are running Windows 11 in the **Official Edition** version. If you have joined the **Windows Insider Preview**, please try to revert to the **Official Edition**.

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

Download the disguised file: [Win11ToWin10.zip](https://acofork-my.sharepoint.com/:u:/g/personal/af_acofork_onmicrosoft_com/ESxJWKgjjHVEhlNoBG4oNWUB_-rGTlLRh1CkXdLoxJsGpw?e=8s79zt). The installation program includes a mandatory activation of the **Data Upgrade** feature.

解压出 `ei.cfg` 和 `setupcompat.dll` 。将其复制到ISO文件夹下的 `sources` 文件夹并替换其中已有的文件
![](../../assets/images/win11-to-win10-13.webp)

![](../../assets/images/explorer_9vcYIunVJH.gif)

打开 `setup1.exe` ，**更改 Windows 安装程序下载更新的方式**，选择 **不是现在**，然后一路下一步
![](../../assets/images/SetupHost_dtT7QeMuhO.gif)

等待变为 **准备就绪，可以安装** ，并确保 **保留个人文件和应用** ，选择 **安装** 
![](../../assets/images/win11-to-win10.webp)

等待设备开机时从 **白条转圈** 变为 **白点转圈** ，即Windows10已被安装
![](../../assets/images/win11-to-win10-15.webp)

Upon the first startup, you may experience a black screen. This occurs when the user logs in and is accompanied by a warning message – the screen goes black immediately upon login, with the cursor moving freely on the area where it’s supposed to be clickable.

进入其他系统（如U盘中的PE系统），删除所有 
```
C:\ProgramData\Microsoft\Windows\AppRepository\StateRepository-开头的文件
```

Please restart the device successfully.

`Win+X` opens the PowerShell console as an administrator.

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

Here’s the translation:  “This has been fully upgraded to Windows 10.”