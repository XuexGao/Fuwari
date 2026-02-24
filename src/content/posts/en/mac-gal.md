---
title: "In Mac, GalGame was surprisingly easy to play!"
description: "While using Mac signifies a detachment from gaming, occasional relaxation is desired – there’s a simple method to embrace it while lying in bed. There are indeed ways!"
published: 2025-09-30
image: ../../assets/images/d5441bcd48dca4226efe40ba6d522551.webp
tags:
  - Mac
  - GalGame
  - 虚拟机
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# 思路
First, the new Mac utilizes Apple-developed chips based on the ARM architecture and runs macOS with a Unix-based system. Most games are specifically designed for Windows x64 platforms. Therefore, we need to translate two layers: first, convert Unix to Windows, and then translate Arm architecture specifically for x64 architecture.

Certainly, here’s the translation:  “Indeed, you can automate this process using **[[L:CrossOver** or manually execute it within the Apple Developer Tools. However, both options incur costs; one is a fee, and the other represents a significant investment of time and mental effort.”

Here’s the translation:  We utilize a virtual machine to streamline these operations. As a virtual machine, we only require an Arm image to run a fully functional Win11 system on macOS, and due to Microsoft's generous initiative, the ARM version of Windows 11 automatically translates to x64 applications, so we must ensure that necessary runtime libraries are installed. Yes, this may result in performance compromises, but compatibility is prioritized, and for games like Gal, performance differences are less noticeable.
# Formal commencement.
First, we download a virtual machine software **[[L:VMware Fusion** (requires registering with a Bitnami account).

登录后你可能会被重定向到 Dashboard，再次访问一次链接即可进入下载软件界面
![](../../assets/images/mac-gal.webp)
⚠️注意：你可能会发现下载按钮被禁用，这并不是你没有权限，而是你没有阅读用户许可协议，你可能又会发现，用户许可协议的勾打不上。请先点击用户协议超链接，不管你看没看，再回退到之前到页面，你就会发现用户许可协议的勾可以被选中了

Let’s omit the installation process…

假设你已经成功安装了 **VMware Fusion**
![](../../assets/images/mac-gal-1.webp)
接下来我们去下载 **Windows 11 On Arm** 的ISO镜像： https://www.microsoft.com/zh-cn/software-download/windows11arm64

你会得到
![](../../assets/images/mac-gal-2.webp)
再次打开 **VMware Fusion** ，新建一个虚拟机，并导入ISO文件，按需调整虚拟机配置即可
![](../../assets/images/mac-gal-3.webp)
最终，我们启动虚拟机，完成Windows11安装向导，进入Windows桌面。此时你的Windows可能看起来糊糊的，那是因为没有安装 **VM Tools** ，安装一下即可
![](../../assets/images/mac-gal-5.webp)
此时你已经完成90%的步骤了，你已经可以把你的Mac当Windows用啦！但是为了让后续的游戏能顺利运行，我们还是要装一下必要的运行库

Download and unpack the DX Repair Enhanced tool from https://zhangyue667.lanzouh.com/DirectXRepairEnhanced. Once installed, the program will automatically install DX9 and the VC++ runtime library, ensuring smooth operation for most games.

If the game fails to launch or the initial setup is unavailable, please configure it manually.

![](../../assets/images/mac-gal-6.webp)

Enjoy!