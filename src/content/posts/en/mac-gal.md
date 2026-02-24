---
title: "Playing GalGame on Mac is this simple!"
description: "Although using a Mac supposedly means staying away from all games, sometimes one still wants to play a visual novel to unwind. Is there a foolproof way to let us cuddle up with our Mac in bed and indulge in some moaning and groaning? Yes, there is!"
published: 2025-09-30
image: ../../assets/images/d5441bcd48dca4226efe40ba6d522551.webp
tags:
  - Mac
  - GalGame
  - 虚拟机
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
To run Windows games on Apple’s new ARM-based Macs, users can use VMware Fusion to install Windows 11 on ARM, which automatically translates x64 apps. While performance may suffer, compatibility is high, especially for less demanding games like Gal. After installing VMware Fusion and the Windows 11 ARM ISO, users install VMware Tools and DirectX/VC++ runtime to ensure smooth gameplay.
:::

# Thought process
First, the new Macs use Apple's self-developed chips based on the Arm architecture and run on the macOS system, which is based on Unix. However, most games are specifically designed for Windows x64. This means we need to translate at two levels: first, convert Unix to Windows, and then adapt the Arm architecture to x64 architecture.

Indeed, you can use **[[L:CrossOver** to automate this process, or manually download and execute the operation via GPTK in Apple's developer tools. However, one costs money, and the other costs time and brainpower (referring to time and mental effort).

We use **virtual machine** here to simplify these operations. Since it's a virtual machine, we only need to prepare one Arm image to run an Arm-based Windows 11 system perfectly on Mac. Additionally, due to Microsoft's generous support, the Arm version of Windows 11 automatically translates x64 programs, so we only need to ensure that necessary runtime libraries are installed. Yes, this may significantly impact performance, but compatibility is the highest. Moreover, if you only play games like Gal (a type of PPT-style game), the performance difference is hardly noticeable.
# Formally begin
First, we download the virtual machine software **[[L:VMware Fusion** (requires registering a Broadcom account)

After logging in, you may be redirected to the Dashboard; simply access the link again to enter the software download interface.
![](../../assets/images/mac-gal.webp)
⚠️ Note: You may find that the download button is disabled. This is not due to lack of permissions, but because you have not read the user license agreement. You may also find that the checkbox for the user license agreement cannot be selected. Please first click the hyperlink for the user agreement, regardless of whether you have read it or not, then go back to the previous page. You will then find that the checkbox for the user license agreement can be selected.

Let's skip the installation process...

Assume you have successfully installed **VMware Fusion**
![](../../assets/images/mac-gal-1.webp)
Next, we will download the ISO image for **Windows 11 On Arm**: https://www.microsoft.com/zh-cn/software-download/windows11arm64

You will receive
![](../../assets/images/mac-gal-2.webp)
Reopen **VMware Fusion**, create a new virtual machine, import the ISO file, and adjust the virtual machine settings as needed.
![](../../assets/images/mac-gal-3.webp)
Finally, we start the virtual machine, complete the Windows 11 installation wizard, and enter the Windows desktop. At this point, your Windows may appear blurry, which is because **VM Tools** have not been installed. Install them to fix this.
![](../../assets/images/mac-gal-5.webp)
At this point, you have completed 90% of the steps—you can already use your Mac like a Windows machine! However, to ensure that subsequent games run smoothly, we still need to install the necessary runtime libraries.

Go to https://zhangyue667.lanzouh.com/DirectXRepairEnhanced to download, extract, and run the DX Repair Tool. After launching, the program will automatically install DirectX 9 and the VC++ runtime libraries, which are sufficient to ensure most games run smoothly!

If you encounter issues with the game not opening or if it opens initially but fails to open subsequently, please configure Microsoft emulation as needed.

![](../../assets/images/mac-gal-6.webp)

Now, enjoy!