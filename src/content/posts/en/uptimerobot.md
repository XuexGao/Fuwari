---
title: "UptimeRobot, no need for self-hosted service monitoring!"
description: "Prior to using BetterStack, a cloud-based monitoring service, I utilized its free plan, which offered only 10 monitors. However, today’s recommendation provides a support level of 50 monitors – a significant improvement!"
published: 2025-09-04
image: '../../assets/images/2025-09-04-04-08-47-image.webp'
tags: [UptimeRobot]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article describes Uptimerobot’s dashboard and monitoring tool, highlighting its free plan with a limited number of 50 monitors, focusing on HEAD requests and IPv6 support. It also explains how to create a status page for your monitored resources, enabling automatic synchronization between the dashboard and the display.  The guide provides links to setup and configuration details.
:::

# Formal commencement.

Enter the Uptimerobot dashboard at [https://dashboard.uptimerobot.com/].

Create an account and begin setting up monitoring. The free plan offers up to **50** monitors, limited to `HEAD` requests only, and does not support modification requests or request bodies. The minimum wait time for a cooling period is 5 minutes. **IPv6** is not supported.]

Please click on `Status pages` to create a status page.

![](../../assets/images/2025-09-04-04-10-47-image.webp)

Recommended to automate the addition of monitors, eliminating manual setup for each new monitor creation.  Each new monitor will automatically synchronize with your dashboard upon creation.

Upon completion of configuration, the monitoring display page will become available after it’s been hosted on `Public status page`.

![](../../assets/images/2025-09-04-04-13-19-image.webp)

![](../../assets/images/2025-09-04-04-15-31-image.webp)