---
title: "Ultra-High-Level Monitoring Service: UptimeFlare! Based on CF Worker! Self-Hosted! Beginner-Friendly!"
description: "Here’s a professional translation of the text:  “Many individuals desire to have access to services that are self-managed.”"
published: 2026-01-03
image: ../../assets/images/uptimeflare.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
From KV migration, the data storage was moved from KV to D1 due to a complete upgrade and the availability of an i18n package. If you are currently operating UptimeFlare’s old version, upgrading is recommended. The migration instructions can be found here: [UptimeFlare/uptime.config.ts at main · afoim/UptimeFlare](https://github.com/afoim/UptimeFlare/blob/main/uptime.config.ts).

First, add a new permission called "EditD1" to the Cloudflare API token in the Cloudflare API token editor.

Then, back up the `uptime.config.ts` file in the root directory and delete it directly (but not the KV, Worker, or Page repositories). Fork my repository: [GitHub]{repo="afoim/UptimeFlare"}

Next, edit the new `uptime.config.ts` file. Refer to [UptimeFlare/uptime.config.ts at main · afoim/UptimeFlare](https://github.com/afoim/UptimeFlare/blob/main/uptime.config.ts) for customization of custom callbacks to the official WebHook method.

After editing, push the changes automatically and trigger GitHub Actions' automated deployment, which will automatically migrate KV data into D1.  This migration to D1 has several implications:

[UptimeFlare/uptime.config.ts at main · afoim/UptimeFlare](https://github.com/afoim/UptimeFlare/blob/main/uptime.config.ts) is primarily designed for migrating custom callbacks to the official WebHook method.

The core principle behind UptimeFlare is based on Cloudflare Worker+D1 monitoring. Its functionality is straightforward:

- **Frontend:** Located in Cloudflare Page, displaying zhandianzhuangt (status display).
- **Backend:** Located in Cloudflare Worker, using a Cron job to check site status and persist it in D1.

[UptimeRobot](/posts/uptimerobot/) serves as an example of a no-managed monitoring service.

The tutorial was originally intended to be forever obsolete due to the fact that I previously introduced a monitoring service without injecting environment variables into certain places.  Now, I've decided to rebuild the monitoring service.

**Underlying Principles:**

UptimeFlare is a monitoring service based on Cloudflare Worker+D1. Its functionality is simple:

- **Frontend:** Located in Cloudflare Page
- **Backend:** Located in Cloudflare Worker
- **Webhook Payload:**  This section allows you to customize the payload for POST requests sent to Resend.

Example Payload:

```ts
payload: {
  "from": "System Status Update <uptimeflare@update.2x.nz>",
  "to": ["acofork@foxmail.com"],
  "subject": "UptimeFlare Status Update",
  "text": "$MSG"
}
```

Following this, when service failures or re-ups, Resend will notify you automatically.

[UptimeFlare/uptime.config.ts at main · afoim/UptimeFlare](https://github.com/afoim/UptimeFlare/blob/main/uptime.config.ts) is available for modification and further customization.
:::

# From KV migration.
Due to the data migration from KV to D1, which occurred on January 26th, 2023, and includes a comprehensive i18n package, if you are still operating the UptimeFlare platform with its legacy version, we recommend upgrading.  The migration guide is provided below.

First, add a new permission to your Cloudflare API token configuration: **EditD1**.

Please back up the root directory of `uptime.config.ts`. Immediately delete the original repository, excluding KV, Workers, and Pages. Fork my repository.

GitHub repository: afoim/UptimeFlare

Next, edit the new `uptime.config.ts`.

Please review the configuration file [UptimeFlare/uptime.config.ts](https://github.com/afoim/UptimeFlare/blob/main/uptime.config.ts)(https://afoim/UptimeFlare/) to migrate custom callbacks to the official WebHook method.

After editing, the system automatically triggers a GitHub Action deployment, which automatically migrates data from the KV (Key-Value) store to D1.

这迁移到D1何意味
![](../../assets/images/uptimeflare-16.webp)

# Introduction
This tutorial was originally intended to remain unpublished, as I previously introduced a self-hosted monitoring service: [UptimeRobot](/posts/uptimerobot/).

However, I recently revisited the control panel and discovered that all of my previous monitoring systems were completely deleted. I’m unsure whether this was a deliberate removal by the company or a result of hacking by malicious actors. Regardless, I need to rebuild the monitoring service immediately.

# The core principle.
Here’s the translation:  “UptimeFlare is a monitoring service based on Cloudflare Worker and D1.”

它的原理非常简单，一共由三个部分组成
- **前端**：放在Cloudflare Page，用于给用户展示zhandianzhuangt
- **后端**：放在Cloudflare Worker，通过 Worker 自带的 **Cron** 每分钟 检查站点状态，并将状态持久化进 **D1** 
![](../../assets/images/uptimeflare-1.webp)

![](../../assets/images/uptimeflare-14.webp)

# Formal commencement.
First, we need to implement the Fork project. I suggest Forking my project (as the original project doesn’t seem to have been initialized with environment variables in certain places, so I recommend Forking it).

GitHub repository: afoim/UptimeFlare

First, we will attempt to deploy it to Cloudflare.

Create a Cloudflare API token for the Workers and D1 task.

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

Next, we will begin customizing this monitoring system.

Edit the root directory’s configuration file, `uptime.config.ts`.

How should a service outage be reported?

UptimeFlare offers a flexible platform where you can specify actions to take upon encountering failures. You can utilize the `POST` request to initiate email resending for affected users. For example, `Callbacks` provides this functionality.

Please visit [https://resend.com/](https://resend.com/).

添加一个域名（作为你的发信域名）
![](../../assets/images/uptimeflare-11.webp)

创建一个发信API Key
![](../../assets/images/uptimeflare-12.webp)

Add the environment variable: `RESEND_API_KEY` to be associated with **Action**.

![](../../assets/images/uptimeflare-13.webp)

Please translate the following text to professional English:  “Edit the section of the `webhook.payload` part of `uptime.config.ts`”.

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

最终效果：
[[URL_translation]]