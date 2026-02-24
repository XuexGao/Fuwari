---
title: "Use WebHook to notify your subscribers of new articles."
description: "For static blogs, bloggers typically need to manually notify subscribers of new articles after each update. This article utilizes Webhooks to automate the publication of new content."
category: "Tutorial"
published: 2025-05-19
image: ../../assets/images/69389a6f-da33-4f53-be34-408b9f88d9e1.webp
tags: [Github, Netlify, QQBot]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# 原理解析

Static blogs are typically hosted on GitHub to facilitate automated website construction and deployment services offered by static site builders.

We can automatically notify subscribers via webhooks after an article is updated. However, a single webhook has its own limitations.

| Webhook type | Advantages | Weaknesses |
|---|---|---|
| GitHub Webhook | Can detect file changes, knowing which articles have been updated. | Build time, need to set conservative delay. |
| Netlify Webhook | Completed construction notification, timing precise | Unable to detect file changes. |

The optimal approach is to combine both elements, utilizing a workflow that involves integrating the two aspects.

**Github WebHook Notification Bot (Record Article Changes)**→ **Netlify Webhook Notification Build Complete**→ **Bot Immediately Push Article Update Notifications**

# Formal commencement.

## Configure your self-hosted Webhook receiver.

Here’s the translation:  “I developed a plugin using Koishi to create an HTTP server that accepts Webhooks. Upon receiving a specified webhook containing a submission, the server will broadcast update messages to my group within two minutes of receipt.”

![](../../assets/images/53b434e4-cf0e-4cfc-a688-054d13f1c01a.webp)

If your service is running in a private network, you can utilize Cloudflared to expose the Webhook receiver server to the public internet. Otherwise, GitHub will not be able to send Webhook information to your service.

## GitHub Repository Webhook Configuration

Please open your blog repository and navigate to the Webhooks settings within the repository configuration.

![](../../assets/images/e899ddd6-9b3e-4d0a-848b-7f9b43d2004e.webp)

Please add a new Webhook, as described.

![](../../assets/images/7fa35782-2d3c-4d18-afca-cb7db8ee36fc.webp)

## Configure Netlify Webhooks.

If your site is deployed on Netlify, you can further configure build completion notifications.

Adding an HTTP POST hook.

![](../../assets/images/2025-08-09-23-15-10-image.webp)

Create a deployment success hook.

![](../../assets/images/2025-08-09-23-15-40-image.webp)

## Bot configuration.

Implement a dual-listen Webhook server to simultaneously receive GitHub and Netlify Webhooks.

![](../../assets/images/2025-08-09-23-36-50-5ec10aad91b98d8d36699c7956c705f0.webp)

![](../../assets/images/2025-08-09-23-39-27-cfc2d6a91a07455adbcee0c491143640.webp)

![](../../assets/images/2025-08-09-23-57-02-image.webp)

## Development and testing.

Please perform a Push operation on your blog repository, verifying receipt of Webhooks and analyzing the information configuration for your webhook receiver to initiate subsequent actions.