---
title: "Browser's built-in download is slow? You need a third-party downloader: Mortix!"
description: "Frequent users of Chromium know that the built-in download module in the browser often lacks speed. At such times, we need to use third-party downloaders. This issue is addressed by Motrix, a free, open-source, high-performance, aesthetically pleasing, and powerful downloader that the author personally uses."
category: "Tutorial"
published: 2025-05-26
image: ../../assets/images/ee0efba8-8c27-449f-86d0-3e9367d12463.webp
tags: [Mortix, 下载器]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide explains how to use the Aria2 Explorer browser extension to redirect downloads to Motrix via RPC, enabling faster third-party downloads. Users must install Motrix, configure its RPC settings (port and token), and set up Aria2 Explorer in Chromium-based browsers to intercept and forward download requests. Once configured, downloads appear in both the extension and Motrix interface.
:::

# Principle

Use a browser plugin to intercept download requests and forward the original request to Motrix for third-party downloading.

# Download Motrix

Visit the official website: https://motrix.app/ . Download Motrix

What? You say downloading with Motrix is incredibly slow? ~~Just endure it for a while, and it'll pass~~

After installation, it should look like this.

![](../../assets/images/6a10d31c-0c39-456c-8402-ff3190a80dcc.webp)

# Configure Motrix

Open Motrix - Advanced Settings - RPC. You can see the RPC listening port (default is 16800) and an RPC authorization key (randomly generated).
![](../../assets/images/53e255cf-965f-441d-a47a-81e20f272256.webp)

We need to remember the listening port, copy the authorization key (click the eye icon to copy, the dice icon next to it generates a new random key). Then click Save and Apply.

# Configure the browser

> Only supports Chromium-based browsers (such as Chrome and the new Microsoft Edge; Firefox requires alternative solutions).

Looking for browser extension: **Aria2 Explorer**

Install, then right-click - Extension Options. Here, configure the RPC settings for Motrix.

![](../../assets/images/0f4a510b-378a-45ab-a35f-88cfa53593e3.webp)

Finally, right-click the extension, check the Download Interception option, and then attempt to download. If everything goes smoothly, the browser's download will be captured by Aria2 Explorer and forwarded to Motrix. You can see the downloading files at **Aria2 Explorer** and **Motrix**.

![](../../assets/images/57fa7b18-541e-4115-a160-cd742735e298.webp)