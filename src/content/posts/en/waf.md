---
title: "Static Website Needs WAF? Cloudflare Doesn't, but EdgeOne/ESA Does!"
description: "Over the past few weeks, my website experienced a DDoS attack that resulted in approximately 100 TB of traffic. Even though I am a static website and would not be terminated due to this volume, the sheer scale of the attack led to EdgeOne terminating my access. This incident was unforeseen and did not occur as planned."
published: 2026-01-18
image: ../../assets/images/waf.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article discusses strategies for protecting static websites from DDoS attacks, particularly focusing on the challenges faced by sites hosted on EdgeOne/ESA and CDN providers like Cloudflare. It highlights the importance of mitigating traffic originating from foreign IP addresses, which can lead to significant bulk traffic spikes. The core strategy involves implementing a layered approach combining DNS filtering (redirecting traffic to a CDN), JavaScript request analysis (JS-based rate limiting), and HTTP 2.0 disabling to reduce attack surface. Finally, it offers specific configurations for EdgeOne/ESA and Cloudflare, emphasizing the limitations of individual IP address protection and the need for custom strategies.
:::

# Can a static website be disabled?
First, let’s consider the conclusion.

If you’re hosted on **Cloudflare Page**, there is no need to worry, as it effectively manages static request fees and possesses a robust CDN network. This ensures stability even with relatively small requests – typically not exceeding one petabyte per day.

However, if you are hosted on the EdgeOne/ESA pricing platform, it is **can_be_killed**.

Here’s a professional translation:  “Many people have expressed concern about their website being static and lacking an authoritative source. How can they be effectively promoted and reach potential visitors?”

Here’s the translation:  “You do not have a CDN, and static websites do not track request counts. However, if you don't implement any security measures, anyone or all IP addresses can bulk-harvest your traffic, generating several terabytes in a single day. After a few days, `DN providers may revoke access`.”

We have now clarified the core issue, and it fundamentally boils down to: **ensuring the website provides a truly authentic user experience**. However, for dynamic websites, this is primarily aimed at **preventing the source server from being taken offline**. For static websites, it’s focused on **enabling CDN traffic to be effectively managed**.

# How to implement a Web Application Firewall (WAF)?
First, if you are using a CDN that is located in China, simply block access from outside the country.

因为大部分刷子的IP都来自海外（大陆IP金贵），直接拦截可以很好防止大文件被刷取，如图片等。我就是个例子
![](../../assets/images/waf-1.webp)

Taking this step will significantly increase your chances of survival against bots, as overseas bots can now only effectively scrape images with low bandwidth requirements. However, current filtering methods primarily focus on blocking these images (typically under 5 KB), and platforms often offer custom filtering options that return empty responses (less than 1 KB).

Here’s the translation:  “The functionality of a traditional scraper, capable of accessing millions of IP addresses to bypass restrictions, has dramatically increased. Now, a new generation of scrapers demands a staggering 100 million IP addresses to successfully terminate their operation – a significant and exponential growth rate. Despite this, you remain a static site, and without the ability to shut down your scraper, you won’t receive any billing records. A substantial proportion of these scrapers will discontinue their scraping efforts.”

We can continue to implement additional safeguards, such as **rate limiting**, **global JS inquiry**, and similar measures, which are specifically designed to verify the identity of genuine visitors.

Regarding **Rate Limiting**, genuine visitors will not trigger excessive requests with F5 repeatedly.

Regarding the request for a JavaScript-based authentication, the true visitors utilize browsers instead of curl, wget, Httpop, or similar tools that do not include JavaScript execution modules. Consequently, it is recommended to enable full-stack JavaScript interception.

The next phase is critical, and despite significant CDN blocking, the traffic continues to be aggressively drained. Please do not hesitate; **Disable CDN's HTTP/2.0**

Here’s the translation:  “What is the underlying principle? We are aware that HTTP/2.0 introduced **Connection Reuse**, allowing for multiple requests within a single TCP connection. This significantly reduces the attack surface.”

Following thorough testing, disabling HTTP/2.0 resulted in an attacker initiating a rapid 50GB drop to 10GB within a minute, followed by a subsequent 5G surge.
Video: [https://www.bilibili.com/video/BV1paryBeEbP/](https://www.bilibili.com/video/BV1paryBeEbP/)

# Here’s a professional translation of the text:  “How to achieve sustained user engagement and high traffic volume is a key consideration.”

1. Intercepting foreign content.
2. All requests regarding JavaScript (JS) inquiries should be directed to the API, not to questions.
3. Setting rate limits.
4. Shut down CDN HTTP/2.0.
# Remarkable ingenuity and skill.

### ESA禁海外访问
针对于ESA，免费版用户可能无法设置区域限制
![](../../assets/images/waf-3.webp)

We can implement a rule to intercept all requests and then determine if the client is located in a region outside of mainland China. If so, we will bypass this rule.

![](../../assets/images/waf-4.webp)

![](../../assets/images/waf-5.webp)

Video: [https://www.bilibili.com/video/BV1fKimBnE3T/](https://www.bilibili.com/video/BV1fKimBnE3T/)

### EdgeOne Page使用CDN WAF
EdgeOne是个奇葩，它的CDN和Page的WAF是分开的，并且Page的WAF防护非常烂，只能 **针对单个IP** 进行拦截
![](../../assets/images/waf-8.webp)

We can configure the CDN to ingest data from the Page, effectively allowing it to consume the WAF strategy implemented by CDN. The left side displays a domain interface for creating the CDN, while the right side features a floating window for the Page interface.

[WARNING]
Here’s the translation:  “By configuring this setting, you will observe a double-time increase in traffic. This is because CDN (Content Delivery Network) retrieves the page source once, and then again when the page itself provides the content. You can mitigate this by enabling caching.”

![](../../assets/images/waf-7.webp)