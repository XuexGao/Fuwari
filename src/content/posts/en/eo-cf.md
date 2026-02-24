---
title: "EdgeOne + Cloudflare, we are invincible!"
description: "EdgeOne's low latency combined with Cloudflare's powerful capabilities! I can't even imagine how amazing this would be!"
category: "Record"
published: 2025-06-27
image: ../../assets/images/50839e45-bb5c-4fd5-8e88-3959295fb9bb.webp
tags: [EdgeOne, Cloudflare]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The author successfully activated the free EdgeOne plan via Tencent Cloud’s redemption page and recommends using a faster Chinese Hong Kong IP (43.174.150.150) over the default CNAME for better performance. For SSL, they suggest manually obtaining certificates via tools like 1Panel or acme.sh and uploading them to Tencent Cloud’s SSL console instead of relying on EO’s automatic setup. They also detail how to set up redirects using Cloudflare as a reverse proxy, leveraging EO’s edge functions for more granular control, though noting Cloudflare’s rules are more efficient for request logging.
:::

# Introduction

The streamer also got the free activation code for EdgeOne, and can finally start making big moves 😋

# How do I switch to the EdgeOne free version?

Go to [Tencent Cloud EdgeOne Free Plan Redemption Code - Experience Now](https://edgeone.ai/zh/redemption)

Recommended to post directly on Twitter, following the required guidelines.

After sending, simply send a private message to the EO official.

![](../../assets/images/9ccbf7c1-6006-45f6-a9f4-e1979df8b12b.webp)

# Is the Anycast CNAME provided by EdgeOne by default too poor?

By default, when adding a domain to EO, EO will send you a CNAME similar to `afo.im.eo.dnse4.com`

That is `your domain.eo.dnse4.com`

Well, you guys can check the speed for yourselves.

![](../../assets/images/33a0b34f-d36f-4214-bcf3-616f9b174630.webp)

I recommend everyone to use `43.174.150.150`. It is a tri-network optimized IP from Hong Kong, China. The speed is as follows. **My EdgeOne Preferred:** `eo.072103.xyz`

![](../../assets/images/ab4cfd6f-ef23-4670-8577-02850f372124.webp)

# After changing the CNAME, can't automatically apply for free SSL?

If you host your domain with EO and do not use the CNAME provided by EO, this option is unavailable.

![](../../assets/images/d81050d7-5d58-4b80-92d9-bf1e07285544.webp)

I recommend using 1Panel, BT Panel, and acme.sh to manually apply for a wildcard certificate, then upload it to the Tencent Cloud SSL console, like this: [[X:content]]

![](../../assets/images/59cf2a66-2717-4291-b027-6cd2f270ece4.webp)

# How does EdgeOne perform redirection?

Here

![](../../assets/images/8f31d55f-4d0b-4209-935b-c2ec7924846c.webp)

![](../../assets/images/5ca74214-b4d0-4ac1-9fab-06d3096a5f7e.webp)

The EO edge function also supports redirection, supporting more granular redirection rules.

But this thing records request counts, it's better to use Cloudflare's redirect rules.

![](../../assets/images/2853531b-a57f-4b20-a8ec-98c0ca433604.webp)

First, we write such a rule in CF:
![](../../assets/images/ac9afee9-a368-4e10-a2a9-045e8672d636.webp)

Then have EO redirect back to the CF edge node. The simplest way is to just fill in any IP and wrap it with CDN.

![](../../assets/images/08445fb0-892a-4793-a359-6cfc3194dbce.webp)

Then configure the origin settings for Eo. Here, you must use the acceleration domain name as the origin Host header.

![](../../assets/images/4911f0ca-86a0-42d3-90cf-ad2434f782ae.webp)

Principle: User → EO → CF → CF detects host matches redirect rule → 301

# Does EdgeOne proxy everything?

> In most cases, changing the `HOST` to the origin server can resolve the issue of the website being inaccessible after reverse proxying.
> 
> ![](../../assets/images/2025-08-04-12-00-41-image.webp)