---
title: "Browser-Based Download Slow? Need Mortix!"
description: "Fellow Chromium users are aware that Chrome’s built-in download module often suffers from slow speeds. However, when this happens, we turn to third-party downloaders like Motrix. This edition recommends Motrix – a free and open-source tool developed by the author itself, boasting high performance and a sleek, minimalist design."
category: "Tutorial"
published: 2025-05-26
image: ../../assets/images/ee0efba8-8c27-449f-86d0-3e9367d12463.webp
tags: [Mortix, 下载器]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article describes a method for downloading files using a browser plugin, Motrix, which intercepts download requests and sends them to the Motrix service. It outlines how to configure Chrome/Edge browsers with Aria2 Explorer extension to enable this functionality, specifying the RPC port and authorization key.  Finally, it demonstrates how to use the extension to initiate downloads directly from the browser and receive the files through Motrix.
:::

# The core principle.

Here’s the translation:  “Utilize a browser extension to intercept download requests and forward the original request to Motrix for implementation of three-way downloading.”

# Download Motrix.

Visit the website: https://motrix.app. Download Motrix.

What? You’re saying I’m experiencing incredibly slow download speeds with Motrix?”  “Just hold on, just keep waiting – it will eventually be over.

Upon installation, you should observe this behavior.

![](../../assets/images/6a10d31c-0c39-456c-8402-ff3190a80dcc.webp)

# Configuration: Motrix

打开Motrix - 进阶设置 - RPC。你可以看到RPC监听端口（默认为16800），和一个RPC授权密钥（随机的）
![](../../assets/images/53e255cf-965f-441d-a47a-81e20f272256.webp)

We need to remember the listening port, and copy the authorization key (click the eye icon then copy, the next side has a new random key). Then click save and apply.

# 配置浏览器

Only supports Chromium-based browsers (such as Chrome and the latest Microsoft Edge, Firefox).

Looking for a browser extension: [[Aria2 Explorer]]

Install the application, then press the right-click menu – expand options. Here, you can configure the RPC settings for Motrix.

![](../../assets/images/0f4a510b-378a-45ab-a35f-88cfa53593e3.webp)

Finally, right-click to expand, check the download intercept, and then attempt the download. If everything proceeds as expected, the browser's download will be captured by Aria2 Explorer and sent to Motrix. You can view the files within the **Aria2 Explorer** and **Motrix** sections.

![](../../assets/images/57fa7b18-541e-4115-a160-cd742735e298.webp)