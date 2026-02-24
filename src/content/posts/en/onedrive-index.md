---
title: "Come! Let's share your OneDrive with Vercel!"
description: "Using the onedrive-index project, you can map your OneDrive to the public internet, making it easy to distribute resources!"
published: 2025-11-14
image: ../../assets/images/onedrive-index.webp
tags:
  - Vercel
  - OneDrive
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide explains how to deploy OneDrive-Index on Vercel using a Microsoft account, requiring client ID and secret, and connecting it to Upstash Redis for session management. After deployment, users must authorize via Microsoft and redirect back to the app to complete setup. Changing OneDrive accounts later involves updating environment variables on Vercel and clearing tokens in Redis.
:::

# Formally begin
You can get E3 for free based on [](/posts/ms-e3/), obtain the maximum free 5TB OneDrive storage space, or use your personal permanently free 5GB space—either way works!

Go to [Advanced - OneDrive Vercel Index](https://ovi.swo.moe/zh/docs/advanced#%E4%BD%BF%E7%94%A8%E4%BD%A0%E8%87%AA%E5%B7%B1%E7%9A%84-client-id-%E4%B8%8E-secret) to obtain the client ID and secret

Go to this page and click Quick Deployment [onedrive-index/README.zh-CN.md at main · iRedScarf/onedrive-index](https://github.com/iRedScarf/onedrive-index/blob/main/README.zh-CN.md#%E9%83%A8%E7%BD%B2%E5%88%B0vercel)

![](../../assets/images/onedrive-index-1.webp)

Fill in the required 5 environment variables
![](../../assets/images/onedrive-index-2.webp)

Among them, USER_PRINCIPAL_NAME is an email address similar to huding@Smartree233.onmicrosoft.com, which is your username used to log in to OneDrive.

After deploying on Vercel, an error occurs indicating it cannot connect to Redis because we haven't created and bound it yet. Now we begin doing that.
![](../../assets/images/onedrive-index-3.webp)

Go to https://vercel.com/integrations/upstash and click Install
![](../../assets/images/onedrive-index-4.webp)

Select the Vercel project you want to bind and set the Redis instance name.
![](../../assets/images/onedrive-index-5.webp)

Go to the Vercel environment variables page, and this is it—binding is successful.
![](../../assets/images/onedrive-index-6.webp)

Just open any deployment, click Redeploy to redeploy, and you will be able to successfully connect to the database.

Next, visit your project domain, enter the OneDrive-Index onboarding, which requires opening a Microsoft link authorization.

After authorization, you will be redirected to a domain on localhost; copy this URI and paste it back into OneDrive-Index (only once needed).

Successfully deployed!
![](../../assets/images/onedrive-index-7.webp)

# Change OneDrive account for the same project
First, change these three environment variables on Vercel.
![](../../assets/images/onedrive-index-8.webp)

Then open Upstash and locate the corresponding Redis; delete all stored Tokens within it.
![](../../assets/images/onedrive-index-9.webp)