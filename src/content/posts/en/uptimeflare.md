---
title: "Ultra-High-Level Monitoring Service: UptimeFlare! Based on CF Worker! Self-Hosted! Beginner-Friendly!"
description: "Here’s a professional translation of the text:  “Many individuals seek to establish a service that is entirely self-managed.”"
published: 2026-01-03
image: ../../assets/images/uptimeflare.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Here's a brief summary of the article:

The article guides users on how to migrate UptimeFlare from KV to D1, leveraging Cloudflare Worker and D1 for monitoring. It involves creating a new `uptime.config.ts` file, deploying to Cloudflare via API tokens, configuring GitHub Actions, and setting up a deployment workflow.  It highlights the fundamental principles behind this migration – utilizing Cloudflare Worker for real-time state updates and D1 as a persistent storage location.  Finally, it demonstrates how to customize the monitoring process with custom callbacks and email notifications using Resend.com.
:::

# From KV migration
Due to the data migration from KV to D1, and with a comprehensive i18n system in place, upgrading is recommended if you are currently operating UptimeFlare.  See the migration tutorial below.

Add the new edit permission **editD1** to your Cloudflare account.

Backup the root directory of `uptime.config.ts` and delete the entire repository directly.

afoim/UptimeFlare

uptime.config.ts

Migrate custom callbacks to the official WebHook method.

The content has been edited and pushed to Github. It will automatically deploy data from KV to D1.

这迁移到D1何意味
![](../../assets/images/uptimeflare-16.webp)

# Here’s the translation:  “Introduction”
This monitoring service is self-hosted.

I have recently re-checked the control panel and discovered that all of my monitors have been deleted. I don’t know whether they were officially removed or targeted by a hacker group. Regardless, I need to rebuild the monitoring service now.

# Okay, please provide the text. I’m ready when you are.
UptimeFlare is a monitoring service based on Cloudflare Worker+D1.

它的原理非常简单，一共由三个部分组成
- **前端**：放在Cloudflare Page，用于给用户展示zhandianzhuangt
- **后端**：放在Cloudflare Worker，通过 Worker 自带的 **Cron** 每分钟 检查站点状态，并将状态持久化进 **D1** 
![](../../assets/images/uptimeflare-1.webp)

![](../../assets/images/uptimeflare-14.webp)

# Please provide the text you would like me to translate.
First, we should Fork my project (because I’m not sure why some parts haven’t been injected with environment variables).

afoim/UptimeFlare

First, we will deploy it to Cloudflare.

Create a Cloudflare API token **editWorkers** and **d1**.

接下来将该Token绑定到你的Github仓库
![](../../assets/images/uptimeflare-4.webp)

最后，来到 `Action` 页面，手动创建一个 `Deploy to Cloudflare` 的工作流
![](../../assets/images/uptimeflare-5.webp)

等待工作流运行结束，你应该可以在Cloudflare仪表板看见一个新的Page，新的Worker和新的D1
![](../../assets/images/uptimeflare-6.webp)

点开 Page，注意不要点错了
![](../../assets/images/uptimeflare-8.webp)

绑定你的域名，尝试访问
![](../../assets/images/uptimeflare-9.webp)

如果你能看到一个初始的监控页面，则正常
![](../../assets/images/uptimeflare-10.webp)

Next steps will be taken.

The system’s uptime is currently at 100%.

How to report service issues?

UptimeFlare is very flexible, and you can do anything you want in the callbacks section. For example, when you need to send a POST request to resend an email, you can send a `POST` request.

First go to https://resend.com/

添加一个域名（作为你的发信域名）
![](../../assets/images/uptimeflare-11.webp)

创建一个发信API Key
![](../../assets/images/uptimeflare-12.webp)

Add environment variables: `RESEND_API_KEY` is bound to **Action**.

![](../../assets/images/uptimeflare-13.webp)

Update the webhook payload for the uptime configuration.

示例代码：
```ts
        payload: {
        "from": "系统状态更新 <uptimeflare@update.2x.nz>",
        "to": ["acofork@foxmail.com"],
        "subject": "UptimeFlare 状态更新",
        "text": "$MSG"
      },
```

接下来，当服务故障/重新上线就会通知你啦~
![](../../assets/images/1dc1a98a404db83e909c1f87e8a115cf.webp)

Okay, please provide the text. I’m ready when you are.
https://ok.2x.nz