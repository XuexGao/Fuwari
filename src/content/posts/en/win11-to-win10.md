---
title: "Downgrade from Win11 to Win10 Without Losing Data!"
description: "I'm really sick of the sticky feeling of Win11. What? Can I downgrade? Is it an official method? Can I keep my data??"
published: 2025-11-23
image: ../../assets/images/win11-to-win10.webp
tags:
  - Windows
  - 降级
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide details a non-official method to downgrade from Windows 11 to Windows 10 while preserving user data and applications. It involves downloading a modified Windows 10 ISO, replacing key files to force a "keep-data" upgrade, and performing post-installation system repairs. While effective, the process requires technical knowledge and carries risks, including potential system instability if not executed correctly.
:::

# Preface

### Why return to Windows 10
There are too many reasons.
- Win11 has almost only upgraded its UI, and the new UI optimization is incomplete, leading to sluggishness in many areas. See: [Win11！__bilibili](https://www.bilibili.com/video/BV11MVoznE4L/?spm_id_from=333.1387.search.video_card.click&vd_source=6b94c66d8e200ba092130f674228bbff)
- Windows 10 and Windows 11 both run on the NT 10.x kernel, so any program that can run on Windows 11 can certainly run on Windows 10. Microsoft's documentation for most of its programs typically specifies a minimum version of `Windows 10 1607 and later`, which means **supports Windows 10 from the 2016 version onward, and all subsequent versions**. The versions we generally use are newer than this, such as `21h2` `22h2`, so there's no need to worry about compatibility issues.

### What impacts does the "upgrade" of such abnormal means have?
Hardly any impact; although we need to do some cleanup work, thanks to the fact that Windows 10 and 11 are essentially the same thing, there won't be any irreversible damage.

### What will I lose after the "upgrade"?
Things that exist in Win11 but not in Win10 will disappear, while those common to both will be retained. Apps specifically designed for Win11 will become unavailable or disappear outright after the "upgrade."

### Is it an "upgrade" for retaining data?
Yes. Theoretically, it will only replace the Windows version and will not clear all your data, such as applications, documents, and personal information.

### Why doesn't Microsoft provide an official channel for downgrading?
Actually, there is one: when you first install Windows 10 and then upgrade to Windows 11 via Windows Update, you have a 30-day grace period during which you can choose to revert back to Windows 10 in Settings. However, 30 days is not a special date—it’s just a conservative timeframe set by Microsoft to minimize complications.

# Formally begin
:::caution
Data is priceless; operate with caution.
:::

:::warning
Make sure you have a PE USB drive; if you don't understand what I'm saying, do not proceed!
:::

First, ensure you are running the **official version** of Windows 11. If you have joined the **Windows Insider Preview**, find a way to return to the **official version**

Next, we will first download the Win10 ISO. Go to https://www.microsoft.com/zh-cn/software-download/windows10. If you find that you do not have a place to download the ISO file, as shown in the figure
![](../../assets/images/win11-to-win10-1.webp)

Click F12 to open DevTools, then switch to device emulation.
![](../../assets/images/win11-to-win10-2.webp)

Press F5 to refresh the page; at this point, the website will recognize you as using a mobile device and prompt you to download the ISO.
![](../../assets/images/win11-to-win10-3.webp)

Choose version **Windows 10 (Multiple ISO versions)**
![](../../assets/images/win11-to-win10-5.webp)

Select **Simplified Chinese**
![](../../assets/images/win11-to-win10-6.webp)

Download **64-bit version ISO**
![](../../assets/images/win11-to-win10-7.webp)

Get the ISO file
![](../../assets/images/win11-to-win10-8.webp)

Make sure you have installed software that supports decompressing ISO files, such as [Bandizip Official Website - Free Compression Software Download (Windows)](https://www.bandisoft.com/bandizip/), **Extract ISO files**
![](../../assets/images/explorer_xY0rowaOaU.gif)

Open the **Unzipped ISO** folder and rename `setup.exe` to `setup1.exe`
![](../../assets/images/win11-to-win10-11.webp)

Change file properties - Compatibility for **Windows 8**
![](../../assets/images/explorer_6TrQ3aXWcR.gif)

Download the spoofed file: [Win11ToWin10.zip](https://acofork-my.sharepoint.com/:u:/g/personal/af_acofork_onmicrosoft_com/ESxJWKgjjHVEhlNoBG4oNWUB_-rGTlLRh1CkXdLoxJsGpw?e=8s79zt) with the purpose of forcibly activating the "Preserve Data Upgrade" option in the installer.

Extract `ei.cfg` and `setupcompat.dll`. Copy them into the `sources` folder within the ISO folder and replace the existing files.
![](../../assets/images/win11-to-win10-13.webp)

![](../../assets/images/explorer_9vcYIunVJH.gif)

Open `setup1.exe`, **Change how Windows Installer downloads updates**, select **Not now**, then click Next through all steps
![](../../assets/images/SetupHost_dtT7QeMuhO.gif)

Wait until it becomes **Ready to Install**, and make sure **Your Personal Files and Apps Are Backed Up**, then select **Install**
![](../../assets/images/win11-to-win10.webp)

Wait until the device powers on and the **White spinning bar** changes to **White spinning dot**, indicating that Windows 10 has been installed
![](../../assets/images/win11-to-win10-15.webp)

The first time you power on your device, it may display a black screen. This manifests as a warning sound followed by a black screen after user login. At this point, moving the mouse will show the cursor moving, but you will be unable to click on any elements on the screen.

Enter other systems (such as PE systems on USB drives) and delete all
```
C:\ProgramData\Microsoft\Windows\AppRepository\StateRepository-开头的文件
```

Restarting the device should allow it to boot successfully.

Next, `Win+X` to open PowerShell as Administrator

First, fix the system.
```
Dism.exe /Online /Cleanup-Image /CheckHealth
DISM.exe /Online /Cleanup-image /Scanhealth
DISM.exe /Online /Cleanup-image /Restorehealth
sfc /scannow
```

Next, fix the system applications.
```
恢复系统应用：add-appxpackage -register "C:\Windows\SystemApps\*\AppxManifest.xml" -disabledevelopmentmode

恢复内置应用：add-appxpackage -DisableDevelopmentMode -Register "C:\ProgramData\Microsoft\Windows\AppRepository\*\AppxManifest.xml" -verbose

恢复应用商店安装的应用：add-appxpackage -DisableDevelopmentMode -Register "C:\Program Files\WindowsApps\*\AppxManifest.xml" -verbose
```

You may also encounter the issue where clicking the Win key to open the Start menu fails to launch Settings; here's how I resolved it.
![](../../assets/images/explorer_DqoWvdqpPS.gif)

By now, it has been perfectly "upgraded" to Windows 10.