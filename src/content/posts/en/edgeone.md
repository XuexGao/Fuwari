---
title: "About how I messed around with EdgeOne all night"
description: "I was originally not interested in EdgeOne, but I was tempted by the claim that it allows using domestic nodes without needing to register. Although it seems the person making this claim was joking, the node speed is genuinely impressive."
category: "Record"
published: 2025-06-22
image: ../../assets/images/3a9096b2-cee8-448b-952a-d9f68cb01be6.webp
tags: [EdgeOne, 优选]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
EdgeOne recently launched a free CDN service, improving on its earlier Page-only offering with worse Singapore IPs. Users can set up global CDN acceleration via CNAME or A records, with options to optimize for speed using preferred IPs like `eo.072103.xyz`. EdgeOne Pages now offers free static hosting but requires domain binding to avoid 401 errors, with regional performance improvements over previous Singapore nodes.
:::

# What is this?

I mentioned EdgeOne in my [early articles](/posts/static-web), when it only had Page services, and its IP was a very poor Singapore one that would also swallow submissions. At that time, I gave it a rating worse than Cloudflare Page.

But this service recently launched a CDN business, and it's even free. So I've picked it up again.

# How do I use it?

Visit browser: https://edgeone.ai to register an account

Or watch the video: https://www.bilibili.com/video/BV1KmNUzVEEL

# Regarding EdgeOne CDN - Website Security Acceleration

> The following statements apply only to **unregistered** users

Need a free version redemption code. Or you can directly purchase the personal version for use, which requires a foreign currency card.

By creating `Accelerated Regions Available Globally (excluding Mainland China) `, you will be assigned a CNAME address similar to `eo3-blog.afo.im.eo.dnse4.com`, which requires you to perform a CNAME DNS record. The IP is poor. **You can directly choose the optimal one. ** The method is simple: just use ITDOG PING `edgeone.ai` to find the fastest IP and directly set an A record (it seems domestic IPs can also be used 🤔). As shown in the image. **My personal EdgeOne optimal selection: ** `eo.072103.xyz`

![](../../assets/images/42ff5956-d1db-4005-8d96-05fcf7eb76f0.webp)

![](../../assets/images/5e49847b-568e-44e3-97d1-737359d6d9d7.webp)

![](../../assets/images/45abf772-9757-4172-984f-d9b5a01ae1de.webp)

Because this is a CDN, it requires a source server. If you're running a static site, you can deploy it using Cloudflare Pages, then configure the origin as follows (note that the Host header in the origin request must be filled with the source server domain; otherwise, Cloudflare may return a 423 Locked *It's way better than Tencent Cloud's 418 I'm a teapot specification 😅*

![](../../assets/images/2bb58f42-4d8d-4429-a412-ff256b41087d.webp)

Finally enable SSL, done, enjoy it!

![](../../assets/images/3063dcd0-857d-4280-8ed2-21f4beddb69a.webp)

# About EdgeOne Pages (New)

No need to spend money; you can use it after registering an account.

No matter where your acceleration region is, it is recommended to bind your own domain; otherwise, you may encounter a 401 access error. Regions including mainland China require domain registration compliance.

> The following statements apply only to **unregistered** users

By creating `Accelerated Regions Available in Global Availability Zones (excluding Mainland China)`, the IP has now switched from the Singapore Anycast to two IPs (if counted as available within China): 43.175.44.57 (Hong Kong, non-mobile latency 250ms+, mobile latency 100ms-), and 43.132.85.153 (Tokyo, Japan, around 200ms across all networks). Compared to the previous Singapore IP with an average latency of 300ms, this is significantly improved.

**EdgeOne Pages cannot be prioritized**. If the domain hosted by EdgeOne Pages is pointed to an IP address that is not resolved by `edgeone.app`, it will return a 418 (for example, an EdgeOne CDN node IP).

Default latency scenario, as shown in the figure [[X:content]]

![](../../assets/images/fcf64bcf-7121-4952-b7e1-1aac7b7fe33d.webp)

> The following statement applies only to **** users

Default latency below 50ms (Mainland China)

The preferred option cannot point the IP to EdgeOne CDN node IPs; otherwise, it will return a 418 error.