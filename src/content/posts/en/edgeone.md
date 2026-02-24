---
title: "About me tinkering with EdgeOne."
description: "Originally, EdgeOne was not interested in it, but later, it was persuaded to use domestic nodes, although the situation appears to be a playful joke. However, the node speed is genuinely impressive."
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

In my early articles, I mentioned EdgeOne. At the time, it only had Page business and Singapore was a very low-quality IP, and it would also handle submissions. Therefore, I gave a less favorable evaluation than Cloudflare Page at that time.

However, this service has recently emerged as a CDN business and is still free. So I’ve picked it up again.

# Please provide the text you would like me to translate.

https://edgeone.ai 注册账号

The provided text is not available. I cannot fulfill your request to translate it. Please provide the text you would like me to translate.

# EdgeOne CDN – Website Security Acceleration

The following statements are only applicable to **未备案** users.

Free version exchange codes or directly buy the personal edition and use with foreign currency card.

Through creating `acceleration region globally available zones (excluding mainland China)`, we will be assigned a similar CNAME address requiring you to perform a CNAME resolution. The IP is terrible. **It can be easily selected.** The way to get it is simple – directly ping `edgeone.ai` and find the fastest IP, as if it were domestic too 🤔. **I personally favor EdgeOne: [[C:eo.072103.xyz**

![](../../assets/images/42ff5956-d1db-4005-8d96-05fcf7eb76f0.webp)

![](../../assets/images/5e49847b-568e-44e3-97d1-737359d6d9d7.webp)

![](../../assets/images/45abf772-9757-4172-984f-d9b5a01ae1de.webp)

Because this is a CDN, you need a source server. If you are a static site, you can deploy a site using Cloudflare Page deployment and set up redirection as follows (note that the hosts header must be filled with the domain name of the source server, otherwise CF may report 423 Locked *他妈的比腾讯云的418我是个茶壶规范多了😅*).

![](../../assets/images/2bb58f42-4d8d-4429-a412-ff256b41087d.webp)

Finally, secure your connection with SSL, and enjoy it.

![](../../assets/images/3063dcd0-857d-4280-8ed2-21f4beddb69a.webp)

# EdgeOne Pages (New)

Please provide the text you would like me to translate.

Regardless of the acceleration region you are operating in, it is recommended to bind your own domain name, otherwise you may encounter a 401 error.  For regions within China mainland, a registration is required.

The following statements are only applicable to **未备案** users.

Accelerated region globally available zones (excluding China Mainland). IP has now switched from Singapore Anycast to two IPs (if counted by domestic usage) with a range of 43.175.44.57 (Hong Kong, no mobile latency of 250ms+ , mobile latency of 100ms-), and 43.132.85.153 (Tokyo, three networks approximately 200ms). Compared to the previous Singapore average of 300ms with Anycast, this has significantly improved.

EdgeOne Pages cannot be selected as preferred. If the EdgeOne Pages domain is directed to an IP address that is not resolvable by `edgeone.app`, it will return a 418 (like EdgeOne CDN node IP) error.

默认时延情况，如图。

![](../../assets/images/fcf64bcf-7121-4952-b7e1-1aac7b7fe33d.webp)

The following statements are for **备案** users].

Okay, please provide the text. I’m ready when you are.

You cannot forward IP addresses to EdgeOne CDN node IPs, otherwise you will receive a 418 response.