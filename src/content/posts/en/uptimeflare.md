---
title: "Ultra-High School-Level Monitoring Service: UptimeFlare! Based on CF Worker! Self-Hosted! Declarative! Beginner-Friendly!"
description: "Who wouldn't want a service that monitors their own services?"
published: 2026-01-03
image: ../../assets/images/uptimeflare.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide explains how to migrate from the old KV-based UptimeFlare setup to the newer D1-based version, which includes built-in i18n support. Users are instructed to fork the updated repository, configure Cloudflare API permissions, and update the `uptime.config.ts` file to use official Webhook methods for notifications. The migration automatically transfers data from KV to D1 upon deployment via GitHub Actions.
:::

# Migration from KV
Since the original project migrated data storage from KV to D1 on January 26, 2023, and is equipped with complete i18n support, if you are still operating the old version of UptimeFlare, we recommend upgrading. Below is the migration guide.

First, add a new permission to your previously configured Cloudflare API token **Edit D1**

Then back up the root directory's `uptime.config.ts`, directly delete the original repository (but do not delete KV, Worker, Page), Fork my repository

::github{repo="afoim/UptimeFlare"}

Next, edit the new `uptime.config.ts`

Refer to [UptimeFlare/uptime.config.ts at main · afoim/UptimeFlare](https://github.com/afoim/UptimeFlare/blob/main/uptime.config.ts). Essentially, it involves migrating custom callbacks to the official WebHook method.

After editing and pushing, it will automatically trigger the GitHub Action for automatic deployment, which will automatically migrate the data from KV to D1.

What does this migration to D1 mean?
![](../../assets/images/uptimeflare-16.webp)

# Preface
This tutorial was originally meant to never be released, because before this, I had already introduced a monitoring service that does not require self-hosting: [UptimeRobot](/posts/uptimerobot/)

But recently, when I checked the console again, I found that all the monitoring I had previously created were gone. I have no idea whether they were deleted by the official or if my account was hacked by some hacker master. In any case, I now have no choice but to rebuild the monitoring service.

# Principle
First, UptimeFlare is a monitoring service built on Cloudflare Worker + D1.

Its principle is very simple, consisting of three parts in total.
- **Frontend**: Placed on Cloudflare Pages, used to display zhandianzhuangt for users
- **Backend**: Placed in Cloudflare Worker, using the built-in **Cron** to check site status every minute, and persisting the status into **D1**
![](../../assets/images/uptimeflare-1.webp)

![](../../assets/images/uptimeflare-14.webp)

# Formally begin
First, we need to **Fork** the project. It is recommended to fork my project (since the original project does not allow injecting environment variables in certain places for unknown reasons, it is recommended to fork mine).

::github{repo="afoim/UptimeFlare"}

First, let's try deploying it to Cloudflare.

Create a Cloudflare API Token **Edit Workers** and **D1**

Next, bind this token to your GitHub repository.
![](../../assets/images/uptimeflare-4.webp)

Finally, go to the `Action` page and manually create a `Deploy to Cloudflare` workflow
![](../../assets/images/uptimeflare-5.webp)

Once the workflow has finished running, you should be able to see a new Page, a new Worker, and a new D1 in the Cloudflare dashboard.
![](../../assets/images/uptimeflare-6.webp)

Click on Page, be careful not to click the wrong one.
![](../../assets/images/uptimeflare-8.webp)

Bind your domain and try accessing it.
![](../../assets/images/uptimeflare-9.webp)

If you can see an initial monitoring page, it is normal.
![](../../assets/images/uptimeflare-10.webp)

Next, we begin customizing this monitoring.

Edit the root directory's `uptime.config.ts`

How to notify when a service failure occurs?

UptimeFlare is very flexible; you can write any actions to perform when a failure occurs within `callbacks`, for example, sending a `POST` request to `Resend` to have it send you an email.

First, go to https://resend.com/

Add a domain (as your sending domain)
![](../../assets/images/uptimeflare-11.webp)

Create a sending API Key
![](../../assets/images/uptimeflare-12.webp)

Add environment variable: `RESEND_API_KEY` and bind it to **Action**

![](../../assets/images/uptimeflare-13.webp)

Edit the `webhook.payload` section in `uptime.config.ts`

Example code:
```ts
        payload: {
        "from": "系统状态更新 <uptimeflare@update.2x.nz>",
        "to": ["acofork@foxmail.com"],
        "subject": "UptimeFlare 状态更新",
        "text": "$MSG"
      },
```

Next, you'll be notified when the service goes down or comes back online~
![](../../assets/images/1dc1a98a404db83e909c1f87e8a115cf.webp)

Final effect:
::url{href="https://ok.2x.nz"}