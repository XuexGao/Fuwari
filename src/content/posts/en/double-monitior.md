---
title: "Do you have a global website? How to do monitoring well?"
description: "If you are just operating a global website that may have different nodes in various regions, how should we properly handle downtime alerts?"
published: 2026-01-09
image: ../../assets/images/double-monitior.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The article outlines a monitoring strategy for globally distributed websites using a hybrid approach: self-hosted Uptime Kuma in China and third-party services like BetterStack or UptimeRobot abroad, with mutual monitoring. It recommends using Cloudflare Tunnel to protect self-hosted monitors from DDoS attacks. Additionally, it explains how to monitor CDN nodes via custom HTTP requests with the Host header to simulate user access without needing separate monitoring sources for each region.
:::

> [!warning]
> Due to being subjected to a DDoS attack, monitoring has been discontinued, hence many links in this article are no longer functional.

# Formally begin
> Video: https://www.bilibili.com/video/BV14dqwBVEa5/

For example, my blog
::url{href=https://blog.acofork.com}

Its overseas nodes are **Cloudflare Page**, while its domestic nodes are **Aliyun ESA Pages/EdgeOne Pages**.

The solution I use is to self-host a **Uptime Kuma** service domestically, while using cloud monitoring services from major overseas providers, such as **BetterStack** **UptimeRobot**, etc., and have them monitor each other.

For monitoring hosted by large companies, we do not need to set up protection, but for your self-hosted monitoring, we recommend using **Cloudflare Tunnel** to prevent DDoS attacks.

Domestic surveillance:
::url{href=https://kuma.2x.nz}

Overseas Surveillance:
::url{href=https://vps.2x.nz}

# Advanced: Monitoring subdomain traffic on a single node using a custom HTTP request header Host field

> If you have a subdomain, normally we would need two monitoring sources to simulate access from domestic and overseas users, but is it really necessary to be this complicated...

## Principle
How does CDN identify which website each user needs to access, since so many websites are hosted on it?

For HTTPS, the CDN checks the `Server_Name` field in the SSL handshake message. For HTTP, the CDN checks the `Host` field in the request header.

That is to say, to check whether an overseas CDN is alive, we can directly access a CDN node, such as: `http://blog.acofork.com.a1.initww.com` and carry the `Host` header specified as `blog.acofork.com` to forcibly direct the node to access the business website, bypassing the traffic diversion.

So, if the CDN has enabled forced HTTPS, then turn it off.

![](../../assets/images/http-header-host-3.webp)

## Common CDN Nodes

- Cloudflare: Your own preferred domain, such as **http://cdn.2x.nz**
- Github: **http://pages.github.com**

## Configuration Method
Deploy Uptime Kuma (or other services; monitoring sources must be within the country, as per EO, ESA, we need to implement interception policies for overseas traffic)

As shown in the figure, write the monitoring project to directly use the HTTP protocol to monitor CDN nodes, carrying the Host header, setting redirects to 0, and considering the node alive if it returns a 200 status (to reduce site pressure, it is recommended to use HEAD requests)

![](../../assets/images/http-header-host-1.webp)

![](../../assets/images/http-header-host-2.webp)

# Demo
::url{href="https://status.acofork.com"}