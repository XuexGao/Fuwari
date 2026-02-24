---
title: "Use WebHooks to push article update notifications to your subscribers"
description: "For static blogs, after an article is updated, the blogger usually needs to manually notify subscribers to read the new article. This article implements an automatic article update notification using WebHook."
category: "Tutorial"
published: 2025-05-19
image: ../../assets/images/69389a6f-da33-4f53-be34-408b9f88d9e1.webp
tags: [Github, Netlify, QQBot]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article explains how to build a notification system for static blog updates using GitHub and Netlify WebHooks in tandem. GitHub WebHooks detect file changes, while Netlify WebHooks confirm successful builds; combining both ensures timely, accurate notifications. The setup involves configuring both platforms to trigger a custom bot (built with Koishi) that broadcasts article updates to a group after a short delay.
:::

# Principle Analysis

Static blogs are generally hosted on GitHub to facilitate automatic building and publishing of the site by static website hosting service providers.

We can automatically notify subscribers after an article is updated via WebHook. However, individual WebHooks each have their own drawbacks:

| Webhook Type | Advantages | Drawbacks |
|---|---|---|
| Github WebHook | Can detect file changes and know which articles have been updated | Unknown build duration; conservative delay needed |
| Netlify WebHook | Notify upon completion of build, with precise timing | Cannot detect file changes |

The best solution is **using both together**, with the workflow being:

**Push** → **Github WebHook notification Bot (records changed articles)** → **Netlify WebHook notification upon build completion** → **Bot immediately pushes article update notifications**

# Formally begin

## Set up your self-hosted WebHook receiver

I used Koishi to write a plugin that creates an HTTP server to receive WebHooks, and upon receiving a WebHook with a specified commit message, it will broadcast an article update message in my group two minutes later.

![](../../assets/images/53b434e4-cf0e-4cfc-a688-054d13f1c01a.webp)

If your service is on the internal network, you can use Cloudflared to expose your WebHook receiving server to the public internet. Otherwise, GitHub will not be able to send WebHook information to your service.

## Configure GitHub Repo Webhook

Open your blog repository, go to Repository Settings to find WebHooks

![](../../assets/images/e899ddd6-9b3e-4d0a-848b-7f9b43d2004e.webp)

Add a new WebHook, as shown in the figure.

![](../../assets/images/7fa35782-2d3c-4d18-afca-cb7db8ee36fc.webp)

## Configure Netlify WebHook

If your site is deployed on Netlify, you can further configure build completion notifications.

Add HTTP POST hook

![](../../assets/images/2025-08-09-23-15-10-image.webp)

Create a deployment success hook

![](../../assets/images/2025-08-09-23-15-40-image.webp)

## Bot-side configuration

Set up a dual-listening WebHook server to accept WebHooks from both Github and Netlify.

![](../../assets/images/2025-08-09-23-36-50-5ec10aad91b98d8d36699c7956c705f0.webp)

![](../../assets/images/2025-08-09-23-39-27-cfc2d6a91a07455adbcee0c491143640.webp)

![](../../assets/images/2025-08-09-23-57-02-image.webp)

## Development Testing

Perform a Push operation in your blog repository, check whether you have received WebHook information, and analyze the information to configure your WebHook receiver for subsequent actions.