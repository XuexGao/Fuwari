---
title: "Use WebHook to notify your subscribers of new articles."
description: "Here’s a professional English translation of the text:  “For static blogs, bloggers typically need to manually notify subscribers upon publication of new articles. This article utilizes Webhooks to automate the article update notification process.”"
category: "Tutorial"
published: 2025-05-19
image: ../../assets/images/69389a6f-da33-4f53-be34-408b9f88d9e1.webp
tags: [Github, Netlify, QQBot]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Please provide the text you would like me to translate. I need the original text to be able to fulfill your request.

Static blogs are typically hosted on GitHub for service providers to automate build and deployment of websites.

We can automatically notify subscribers via webhooks after an article is updated. However, a single webhook has its own limitations.

Okay, here's the translation of the provided text:  | WebHook Type | Advantages | Disadvantages |
Okay, please provide the text. I’m ready when you are.
GitHub Webhook can detect file changes and identify which articles have been updated. It does not know the build duration, requiring a conservative delay to be set.
Netlify Webhook: Sends notifications precisely after deployment, enabling accurate timing. Cannot detect file changes.

Okay, please provide the text you would like me to translate. I’m ready when you are.

**Github WebHook 通知Bot（记录变动文章）** → **Netlify WebHook 通知构建完成** → **Bot 即刻推送文章更新消息**

# Please provide the text you would like me to translate.

## Set up your self-hosted Webhook receiver.

I am using Koishi to create a plugin that creates an HTTP server to accept Webhooks, and will broadcast update messages to my group within 2 minutes after receiving the specified submission information.

![](../../assets/images/53b434e4-cf0e-4cfc-a688-054d13f1c01a.webp)

If your service is running on an internal network, you can use Cloudflared to forward Webhooks from a server to the public internet. Otherwise, GitHub will not be able to send Webhook information to your service.

## Configure GitHub repository webhooks.

Open your blog repository and navigate to the Webhooks settings within the repository configuration.

![](../../assets/images/e899ddd6-9b3e-4d0a-848b-7f9b43d2004e.webp)

Add a new Webhook as described.

![](../../assets/images/7fa35782-2d3c-4d18-afca-cb7db8ee36fc.webp)

## Configure Netlify Webhooks

If your site is deployed on Netlify, you can further configure build completion notifications.

Add HTTP POST hook

![](../../assets/images/2025-08-09-23-15-10-image.webp)

Create a deployment success hook.

![](../../assets/images/2025-08-09-23-15-40-image.webp)

## Please provide the text you would like me to translate.

Set up a dual-listen Webhook server that accepts GitHub and Netlify Webhooks.

![](../../assets/images/2025-08-09-23-36-50-5ec10aad91b98d8d36699c7956c705f0.webp)

![](../../assets/images/2025-08-09-23-39-27-cfc2d6a91a07455adbcee0c491143640.webp)

![](../../assets/images/2025-08-09-23-57-02-image.webp)

## Development and testing are crucial processes in software engineering. Effective development requires meticulous planning and rigorous testing to ensure quality assurance. Thorough testing encompasses various methodologies, including unit testing, integration testing, system testing, and user acceptance testing.  Testing helps identify bugs early in the development cycle, reducing risks and improving overall product reliability.  A robust testing strategy is essential for delivering high-quality software that meets customer expectations.

Perform a push operation to your blog repository, and check if you have received a WebHook notification and analyze the information configuration for your WebHook receiver to perform follow-up actions.