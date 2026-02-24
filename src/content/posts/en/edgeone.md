---
title: "About me tinkering with EdgeOne"
description: "Originally, EdgeOne was not interested in the service, but later, they were persuaded to use domestic nodes, despite the fact that it seems like a playful offer. However, the node speed is genuinely impressive."
category: "Record"
published: 2025-06-22
image: ../../assets/images/3a9096b2-cee8-448b-952a-d9f68cb01be6.webp
tags: [EdgeOne, 优选]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# What is this?

In my early writings, I mentioned EdgeOne. At the time, it was only a Page business, and Singapore was a very underdeveloped and unreliable IP address. Furthermore, it was being used for submitting data – a rather poor choice at the time. Therefore, I initially provided a less favorable assessment of EdgeOne compared to Cloudflare Page.

However, this technology has recently emerged with CDN services and is still free. I’ve been re-engaging with it again.

# How do I utilize it?

Please register your account at [https://edgeone.ai](https://edgeone.ai).

Please watch the video: [https://www.bilibili.com/video/BV1KmNUzVEEL]

# Regarding EdgeOne CDN, website security acceleration.

The following statements are only applicable to **Unregistered** users.

Please seek a free version exchange code or purchase the individual edition and use it with a foreign currency card.

By establishing `Accelerated Regional Global Availability Zone (excluding Mainland China)`, we will assign you a similar CNAME address, requiring you to perform a CNAME resolution. The IP addresses are poor. **It’s easy to opt-in.** The method of obtaining it is straightforward – simply ping `edgeone.ai` and find the fastest IP directly by writing A for it (it seems like it could be domestic as well 🤔). As illustrated. **My EdgeOne preference:** `eo.072103.xyz`

![](../../assets/images/42ff5956-d1db-4005-8d96-05fcf7eb76f0.webp)

![](../../assets/images/5e49847b-568e-44e3-97d1-737359d6d9d7.webp)

![](../../assets/images/45abf772-9757-4172-984f-d9b5a01ae1de.webp)

Due to the nature of this service, it’s a CDN (Content Delivery Network). You'll need a source server. If you’re deploying a static website, you can use Cloudflare Page deployment and configure a redirect as follows: (Note that the `Host` header in the redirect must include the domain name of the source server.)

![](../../assets/images/2bb58f42-4d8d-4429-a412-ff256b41087d.webp)

Finally, SSL was enabled, and you can now enjoy it.

![](../../assets/images/3063dcd0-857d-4280-8ed2-21f4beddb69a.webp)

# 关于EdgeOne Pages（新）

You can use the service without paying, once you register.

Regardless of the acceleration region you are operating within, it is recommended to bind your own domain name; otherwise, you may encounter a 401 Unauthorized error.  For regions within China, a registration is required.

The following statements are only applicable to **Unregistered** users.

Through the implementation of `Accelerated Regional Global Availability Zone (excluding Mainland China)`, we have transitioned from a single IP address (based on domestic usage) to two IPs.  The IP address has now been changed from Singapore Anycast to two IPs, depending on the level of regional availability.  This change resulted in a significant reduction in latency compared to previous Singaporean IP addresses, with a reduced latency of 300ms for mobile connections and 100ms for cellular connections.  Compared to the previous Singaporean average of 300ms, the new IP address offers significantly improved performance.

“EdgeOne Pages cannot be selected.” When a domain pointing to an EdgeOne Pages hosted on an IP address not reachable via `edgeone.app`, it will return a 418 response, typically indicating an EdgeOne CDN node’s IP address.

Default delay times are as follows:

![](../../assets/images/fcf64bcf-7121-4952-b7e1-1aac7b7fe33d.webp)

The following statements are intended for **** users.

Default latency below 50ms in mainland China.

Blocking IP addresses to EdgeOne CDN nodes is not permitted; this will result in a 418 response.