---
title: "Map your Linux hard drive to Windows?"
description: "How to manage Linux files like Windows? SSHFS is here to help!"
category: "Tutorial"
published: 2025-08-03
image: '../../assets/images/2025-08-03-19-15-42-image.webp'
tags: [SSHFS]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
Install SSHFS for Windows and its GUI manager, then configure a new connection by specifying the server details and mounting point. After saving the settings and connecting, your remote server will appear as a drive in File Explorer. This setup enables seamless file access over SSH on Windows.
:::

# Formally begin

Go to [winfsp/sshfs-win: SSHFS For Windows](https://github.com/winfsp/sshfs-win)

Download and install

Go to [evsar3/sshfs-win-manager: A GUI for SSHFS-Win (https://github.com/billziss-gh/sshfs-win)](https://github.com/evsar3/sshfs-win-manager)

Download and install

Open

![](../../assets/images/2025-08-03-19-19-07-image.webp)

If sshfs-win is not installed in the default location, you need to manually specify it; enter `Settings`

![](../../assets/images/2025-08-03-19-20-01-image.webp)

Next, click `Add Connection` — everyone knows what this means.

![](../../assets/images/2025-08-03-19-20-24-image.webp)

After saving, click the Connect button.

![](../../assets/images/2025-08-04-11-58-52-image.webp)

Then you will be able to see your drive in File Explorer.

![](../../assets/images/2025-08-04-11-59-20-image.webp)