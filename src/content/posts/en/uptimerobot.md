---
title: "UptimeRobot: No self-hosted service monitoring needed!"
description: "Previously, I used cloud-based monitoring services like BetterStack, but the free plan only supports monitoring 10 items, whereas today's recommended option supports up to 50!"
published: 2025-09-04
image: '../../assets/images/2025-09-04-04-08-47-image.webp'
tags: [UptimeRobot]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
UptimeRobot  50 ， HEAD ，， 5 ， IPv6。“Status pages”，。“Public status page, hosted on”。
:::

# Formally begin

Enter https://dashboard.uptimerobot.com/

Register an account and then start creating monitors. The free plan supports up to **50** monitors, only supports `HEAD` requests, does not support modifying request headers and request bodies, with a minimum polling cooldown of 5 minutes. **IPv6 not supported**

Then click `Status pages` to create a status page

![](../../assets/images/2025-09-04-04-10-47-image.webp)

It is recommended to set it to auto-add, so you won't need to manually add each monitor to the page; every new monitor you create under your account will be automatically synced to your dashboard in real time.

After configuration is complete, the page following `Public status page, hosted on` is your monitoring dashboard.

![](../../assets/images/2025-09-04-04-13-19-image.webp)

![](../../assets/images/2025-09-04-04-15-31-image.webp)