---
title: 来！让我们用Vercel来分享你的OneDrive！
published: 2025-11-14T15:03:46
description: 利用onedrive-index这个项目可以将你的OneDrive映射到公网，轻松分发资源！
image: ../assets/images/onedrive-index.webp
tags:
  - Vercel
  - OneDrive
draft: false
lang: ""
---
> [!ai] qwen/qwen3-vl-8b
> 使用个人免费OneDrive账号部署OneDrive-Index，需获取client_id与secret，配置Vercel环境变量（含USER_PRINCIPAL_NAME邮箱），部署后因未绑定Redis报错，通过Upstash绑定Redis实例并重部署即可解决；访问项目域名授权微软后复制回调URI粘贴完成初始化；更换账号时需更新Vercel环境变量并清空Upstash中对应Redis的Token。

# 正式开始
你可以根据[前文](/posts/ms-e3/)免费拿E3，得到至高免费5T的OneDrive存储空间，也可以用你个人永久免费的5G空间，都可以！

前往 [高级 - OneDrive Vercel Index](https://ovi.swo.moe/zh/docs/advanced#%E4%BD%BF%E7%94%A8%E4%BD%A0%E8%87%AA%E5%B7%B1%E7%9A%84-client-id-%E4%B8%8E-secret) 拿到 clientid 和 secret

前往该页面，点击快速部署 [onedrive-index/README.zh-CN.md at main · iRedScarf/onedrive-index](https://github.com/iRedScarf/onedrive-index/blob/main/README.zh-CN.md#%E9%83%A8%E7%BD%B2%E5%88%B0vercel) 

![](../assets/images/onedrive-index-1.webp)

填写必须的5个环境变量
![](../assets/images/onedrive-index-2.webp)

其中，USER_PRINCIPAL_NAME为类似 huding@Smartree233.onmicrosoft.com 的电子邮箱，也就是你登陆OneDrive的用户名

Vercel部署完毕后，会报错连不上Redis，因为我们还没创建和绑定，现在我们开始做
![](../assets/images/onedrive-index-3.webp)

前往 https://vercel.com/integrations/upstash 点击 Install
![](../assets/images/onedrive-index-4.webp)

选择你要绑定的Vercel项目，并且设置Redis实例名称
![](../assets/images/onedrive-index-5.webp)

来到Vercel的环境变量页面，这就是绑定成功了
![](../assets/images/onedrive-index-6.webp)

随便打开一个部署，点击 Redeploy 重新部署，就能成功连接数据库了

接下来访问你的项目域名，进入OneDrive-Index的引导，需要打开微软的一个链接授权

授权后会重定向到一个localhost的域名，复制该URI，粘贴回OneDrive-Index即可（仅需一次）

成功部署！
![](../assets/images/onedrive-index-7.webp)

# 同项目更改OneDrive账号
首先在Vercel上更改这三个环境变量
![](../assets/images/onedrive-index-8.webp)

然后打开 Upstash 找到对应的Redis，删除里面存储的所有Token
![](../assets/images/onedrive-index-9.webp)