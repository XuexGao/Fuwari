---
title: "Share your OneDrive with Vercel!"
description: "Here’s a professional translation of the text:  “Leveraging OneDrive Index, this project enables seamless synchronization of your OneDrive to a public network, facilitating easy resource distribution.”"
published: 2025-11-14
image: ../../assets/images/onedrive-index.webp
tags:
  - Vercel
  - OneDrive
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Please provide the text you would like me to translate.
You can use E3, which provides up to 5TB of free OneDrive storage, or your personal, permanent free 5G space.

Go to the advanced - OneDrive Vercel Index and retrieve the client ID and secret.

Go to the page, click for quick deployment [onedrive-index/README.zh-CN.md at main · iRedScarf/onedrive-index](https://github.com/iRedScarf/onedrive-index/blob/main/README.zh-CN.md#%E9%83%A8%E7%BD%B2%E5%88%B0vercel).

![](../../assets/images/onedrive-index-1.webp)

填写必须的5个环境变量
![](../../assets/images/onedrive-index-2.webp)

huding@Smartree233.onmicrosoft.com

Vercel部署完毕后，会报错连不上Redis，因为我们还没创建和绑定，现在我们开始做
![](../../assets/images/onedrive-index-3.webp)

前往 https://vercel.com/integrations/upstash 点击 Install
![](../../assets/images/onedrive-index-4.webp)

选择你要绑定的Vercel项目，并且设置Redis实例名称
![](../../assets/images/onedrive-index-5.webp)

来到Vercel的环境变量页面，这就是绑定成功了
![](../../assets/images/onedrive-index-6.webp)

Open a deployment and click Redeploy to successfully connect to the database.

Access your project domain through OneDrive-Index, and you will need to open a Microsoft link for authorization.

The authorization process requires you to copy the URI and paste it into OneDrive-Index (only once).

成功部署！
![](../../assets/images/onedrive-index-7.webp)

# 同项目更改OneDrive账号
首先在Vercel上更改这三个环境变量
![](../../assets/images/onedrive-index-8.webp)

然后打开 Upstash 找到对应的Redis，删除里面存储的所有Token
![](../../assets/images/onedrive-index-9.webp)