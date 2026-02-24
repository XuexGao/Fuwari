---
title: "Come on! Let’s share your OneDrive with Vercel!"
description: "Leveraging OneDrive Index allows you to seamlessly map your OneDrive to a public network, facilitating easy resource distribution."
published: 2025-11-14
image: ../../assets/images/onedrive-index.webp
tags:
  - Vercel
  - OneDrive
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article provides instructions on how to quickly access and deploy OneDrive storage space via Vercel, utilizing a free E3 account and leveraging OneDrive Vercel Index. It details the steps for obtaining necessary credentials, deploying the index, configuring Redis instances, and successfully connecting to your project. The process involves changing environment variables, accessing a specific link, and deploying the index to ensure seamless database connectivity.
:::

# Formal commencement.
You can obtain E3 storage space for free, receiving a high level of OneDrive storage and a personal, permanent 5G allowance.

Please visit the [Advanced - OneDrive Vercel Index](https://ovi.swo.moe/zh/docs/advanced#%E4%BD%BF%E7%94%A8%E4%BD%A0%E8%87%AA%E5%B7%B1%E7%9A%84-client-id-%E4%B8%8E-secret) to retrieve your client ID and secret.

Please visit the page and quickly deploy [onedrive-index/README.zh-CN.md](https://github.com/iRedScarf/onedrive-index/blob/main/README.zh-CN.md#%E9%83%A8%E7%BD%B2%E5%88%B0vercel) at main · iRedScarf/onedrive-index.

![](../../assets/images/onedrive-index-1.webp)

填写必须的5个环境变量
![](../../assets/images/onedrive-index-2.webp)

The user’s primary email address is huding@Smartree233.onmicrosoft.com, which serves as their OneDrive login username.

Vercel部署完毕后，会报错连不上Redis，因为我们还没创建和绑定，现在我们开始做
![](../../assets/images/onedrive-index-3.webp)

前往 https://vercel.com/integrations/upstash 点击 Install
![](../../assets/images/onedrive-index-4.webp)

选择你要绑定的Vercel项目，并且设置Redis实例名称
![](../../assets/images/onedrive-index-5.webp)

来到Vercel的环境变量页面，这就是绑定成功了
![](../../assets/images/onedrive-index-6.webp)

Please open a deployment, then click "Redeploy" to successfully connect to the database.

Please access your project domain and proceed to the OneDrive-Index guided entry, requiring you to authorize a Microsoft link.

Upon authorization, the URI will be redirected to a designated localhost domain. Please copy this URI and paste it back into OneDrive-Index for one-time use.

成功部署！
![](../../assets/images/onedrive-index-7.webp)

# 同项目更改OneDrive账号
首先在Vercel上更改这三个环境变量
![](../../assets/images/onedrive-index-8.webp)

然后打开 Upstash 找到对应的Redis，删除里面存储的所有Token
![](../../assets/images/onedrive-index-9.webp)