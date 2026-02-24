---
title: "Do you have a global website? How do you monitor it?"
description: "Here’s the translation:  “If your global website spans multiple regions, it's crucial to implement a robust downtime notification system. This ensures users are promptly informed of potential service interruptions.”"
published: 2026-01-09
image: ../../assets/images/double-monitior.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

> [!warning]
Due to a Distributed Denial of Service (DDoS) attack, the website’s traffic monitoring and filtering have been temporarily disabled. Consequently, many links within this article are currently unavailable.

# Formal commencement.
Video: [https://www.bilibili.com/video/BV14dqwBVEa5/](https://www.bilibili.com/video/BV14dqwBVEa5/)

For example, my blog.
**log URL**

It resides on foreign nodes as **Cloudflare Page**, and within domestic nodes it is located at **ESA Pages/EdgeOne Pages**.

I utilize a self-hosted solution for Uptime Kuma within China, and leverage cloud monitoring services from several large enterprises abroad, including BetterStack and UptimeRobot. These providers are integrated to provide mutual monitoring.

For large enterprises, surveillance is not a priority; however, for self-hosted monitoring solutions, we recommend using **Cloudflare Tunnel**, which will mitigate DDoS attacks.

Domestic surveillance:
[[Kuma URL]]

Overseas surveillance:
[[VPS - Virtual Private Server]]

# Here’s the translation:  **Advanced: Utilizing custom HTTP request headers to monitor single-region subdomain monitoring.**

If you have a split domain, it’s generally considered necessary to have two monitoring sources simulating domestic and international user traffic – however, is this truly required?

## Here’s the translation:  “The principle”
The CDN provider has hosted an enormous number of websites, how does it identify which websites each user requires access to?

Regarding HTTPS, the CDN will verify the SSL handshake message within the `Server_Name` field. Similarly, for HTTP requests, the CDN will check the request headers, specifically the `Host`, for the specified server name.

Here’s the translation:  “To determine the viability of a CDN (Content Delivery Network) in international deployments, we can directly access CDN nodes such as `http://blog.acofork.com.a1.initww.com` by including the ‘Host’ header with the value `blog.acofork.com`. This allows us to force a specific node to access the business website, bypassing traffic routing.”

If a CDN is enabled with mandatory HTTPS, it’s recommended to disable it.

![](../../assets/images/http-header-host-3.webp)

## Common CDN nodes

- Cloudflare offers you the option to use your own preferred domain name, such as **http://cdn.2x.nz**.
- GitHub: [https://pages.github.com]

## Configuration Method
Deploy an Uptime Kuma (or other service monitoring the source must be within Russia due to EO, ESA – we will implement a cross-border strategy).

Here’s the translation:  “The monitoring project utilizes HTTP protocol to directly monitor CDN nodes. It includes the Host header, redirecting the response to 0 and surviving only upon a successful 200 status code.”

![](../../assets/images/http-header-host-1.webp)

![](../../assets/images/http-header-host-2.webp)

# Demo
[[URL_translation]]