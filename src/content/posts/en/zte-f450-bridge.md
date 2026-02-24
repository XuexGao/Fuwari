---
title: "ZTE Optical Modem F450 Without Disassembly to Obtain Super Dense"
description: "My friend had been wanting to change the optical modem to bridge mode for a long time, and today I finally got it done. However, I didn’t have a super-dense (or ultra-dense) device, but with the help of the internet, we eventually found a solution."
published: 2025-11-01
image: ../../assets/images/zte-f450-bridge-4.webp
tags:
  - 破解
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide explains how to retrieve the super administrator password from ZTE F450/F650 optical modems by injecting HTML code via USB to access the root directory, copying the encrypted configuration file, and using NirSoft’s RouterPassView to decrypt and reveal the password. The process requires a FAT32-formatted USB drive and specific file manipulation within the modem’s file manager. The final step involves searching for the "tele" entry in the decrypted XML file to extract the password.
:::

> Reference:
> 
> [ZTE Optical Modem F450 Obtain Super Password Without Disassembling_zxhnf450 Optical Modem Super Password - CSDN Blog](https://blog.csdn.net/z47913/article/details/140727685)
> 
> [【Network】ZTE Tianyi Optical Modem F450/F650 Super Admin Password Retrieval - Bilibili](https://www.bilibili.com/video/BV1ri4y1h7Zo/?vd_source=6b94c66d8e200ba092130f674228bbff)

# Basic Principles
By connecting via an external USB and injecting the path `../..` through the official file manager to view the root directory, copy the file containing the optical modem's super-encrypted data to a USB drive, and decrypt and read it to understand the super-encryption.

# Formally begin
First, prepare a USB drive, **must have a FAT32 formatted partition**

Insert into the optical cat's USB port and wait for recognition.

Enter the file manager of the optical modem to view the files on the USB drive. At this point, press F12, select one folder, and change the HTML code to
```html
<a href="javascript:;" style="color:#535353;"
   onclick="openfile('../..', false)"
   title="System Volume Information">
  System Volume Information
</a>

```

Then click on the folder, wait a few seconds, and you will enter the `/` directory of the optical modem.

Copy `/userconfig/cfg/db_user_cfg.xml` to USB drive

Eject the USB drive, insert it into the computer, and take out `db_user_cfg.xml`

Go to [RouterPassView - Recover Lost Router Passwords from Router Backup Files on Windows](https://www.nirsoft.net/utils/router_password_recovery.html) to download

![](../../assets/images/zte-f450-bridge.webp)

![](../../assets/images/zte-f450-bridge-1.webp)

Unzip and use `RouterPassView` to open `db_user_cfg.xml`

Search `tele`, looking for superdense

![](../../assets/images/zte-f450-bridge-3.webp)