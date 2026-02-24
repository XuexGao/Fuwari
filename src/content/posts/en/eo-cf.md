---
title: "EdgeOne + Cloudflare, we are invincible!"
description: "Here’s the translation:  “EdgeOne offers low latency and Cloudflare’s robust cloud infrastructure – it's simply exhilarating!”"
category: "Record"
published: 2025-06-27
image: ../../assets/images/50839e45-bb5c-4fd5-8e88-3959295fb9bb.webp
tags: [EdgeOne, Cloudflare]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Here’s a brief summary of the article:

The author is discussing EdgeOne's free plan activation and related issues, including the use of custom CNAMEs and DNS redirection challenges. They recommend using a combination of Cloudflare and CDN for advanced redirect configurations, leveraging edge functions for more granular control.  The article highlights best practices for handling reverse redirects after activating the free plan and addresses potential problems like the reliance on default CNAMEs and the difficulty in accessing websites after EdgeOne's initial redirection setup.
:::

# Introduction

The streamer has obtained the EdgeOne free activation code, allowing for a significant expansion of their capabilities.

# How do I obtain the EdgeOne free version?

Visit the [Tencent Cloud EdgeOne Free Plan Redemption Code - Experience Now](https://edgeone.ai/zh/redemption)

Recommend direct messaging and submit requests according to your specifications.

After the presentation, please send a private message to the EO official.

![](../../assets/images/9ccbf7c1-6006-45f6-a9f4-e1979df8b12b.webp)

# Here’s a professional translation of the text:  “The EdgeOne Anycast CNAME is considered overly generic and lacks significant value.”

Upon adding a domain to your EO, you will receive a corresponding CNAME record. This record will point to the specified domain.

`Your domain.eo.dnse4.com`

That thing, how fast is it?

![](../../assets/images/33a0b34f-d36f-4214-bcf3-616f9b174630.webp)

I recommend using `43.174.150.150` – a Chinese Hong Kong three-network optimization IP address. The speed is as follows: **My EdgeOne Preferred:** `eo.072103.xyz`

![](../../assets/images/ab4cfd6f-ef23-4670-8577-02850f372124.webp)

# After a CNAME change, automatic SSL certificate requests are not possible.

If you host your domain with EOT and do not use EOT to provision a CNAME for your CN, this option is unavailable.

![](../../assets/images/d81050d7-5d58-4b80-92d9-bf1e07285544.webp)

I recommend utilizing 1Panel, Baotao, and Acme.sh for manual certificate issuance via the Tencent Cloud SSL Control Panel. This process involves applying the certificates through these platforms, as shown below.

![](../../assets/images/59cf2a66-2717-4291-b027-6cd2f270ece4.webp)

# Here’s a professional translation of “EdgeOne how to redirect?”:  “How does EdgeOne handle redirects?”

Here.

![](../../assets/images/8f31d55f-4d0b-4209-935b-c2ec7924846c.webp)

![](../../assets/images/5ca74214-b4d0-4ac1-9fab-06d3096a5f7e.webp)

The Edge Function also supports redirection, allowing for more granular redirection rules.

However, this tracking mechanism records request counts; it’s preferable to utilize Cloudflare's redirection rules.

![](../../assets/images/2853531b-a57f-4b20-a8ec-98c0ca433604.webp)

首先我们在CF写这样一个规则
![](../../assets/images/ac9afee9-a368-4e10-a2a9-045e8672d636.webp)

Then, return the IP address to the CDN edge node. The simplest approach is to simply provide an IP address and route it to the CDN.

![](../../assets/images/08445fb0-892a-4793-a359-6cfc3194dbce.webp)

Following the configuration of E-Retry, please utilize accelerated domain names as the return host header.

![](../../assets/images/4911f0ca-86a0-42d3-90cf-ad2434f782ae.webp)

The system analyzes user requests, identifies a host match, and then applies a redirect rule – a 301 redirect.

# Please translate to: EdgeOne’s reverse function?

> 大部分情况将 `回源HOST头` 改为源站就能解决反代后网站无法访问的问题
> 
> ![](../../assets/images/2025-08-04-12-00-41-image.webp)