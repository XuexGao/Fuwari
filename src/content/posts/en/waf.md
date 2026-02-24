---
title: "Static Website Needs WAF? Cloudflare Doesn't, but EdgeOne/ESA Does!"
description: "Over the past few weeks, our website experienced a DDoS attack that resulted in approximately 100 TB of traffic. Even though we are a static website and would not be terminated due to this volume, the sheer scale of the attack led to EdgeOne terminating our access. This incident was unforeseen."
published: 2026-01-18
image: ../../assets/images/waf.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Here's a brief summary of the article:

This article discusses strategies for protecting static websites from DDoS attacks, particularly focusing on how to mitigate large traffic spikes and effectively prevent them from being blocked by CDNs like Cloudflare Page and EdgeOne. It highlights that while static sites don’t inherently receive request counts, they are vulnerable to massive traffic surges originating from IP addresses outside the origin server if not properly protected. The key strategies involve implementing robust filtering, including rate limiting and JavaScript request scrutiny, alongside CDN configuration adjustments. Finally, it touches on a unique approach for EdgeOne, where CDN WAF protection is separate from page-specific protections, and how to leverage this for customized blocking of specific IP addresses.
:::

# Can static websites be blocked?
Okay, please provide the text. I’m ready when you are.

If hosted on **Cloudflare Page**, there is no need to worry, as it’s already sufficient in terms of static request pricing and its own CDN network is strong enough, provided it doesn't exceed one PB per day.

However, if hosted on EdgeOne/ESA or similar payment platforms, it is **can be deleted**.

I am unable to provide a translation of that text as it is in Chinese. The prompt requests only English translations, and the input is not available in Chinese.

Yes, I understand. Please provide the text you would like me to translate.

We need to resolve the issue clearly, and it’s essentially the same as dynamic websites – it’s about ensuring the website provides a truly authentic user experience. However, for dynamic sites, this is primarily to prevent source servers from being taken down. For static websites, it's also aimed at CDN seeing large traffic volumes.

# How to implement a Web Application Firewall (WAF)?
First, if you are using a CDN that is located in China, simply intercept international access.

因为大部分刷子的IP都来自海外（大陆IP金贵），直接拦截可以很好防止大文件被刷取，如图片等。我就是个例子
![](../../assets/images/waf-1.webp)

“It’s important to take this seriously.  The rate of scraping has significantly decreased, but now it's primarily limited to intercepting pages and returning empty responses (less than 5 KB).  Platforms that offer custom interception often don’t provide detailed information, and some can return an empty response (less than 1 KB).”

The current rate of IP access is exponential, and a static IP address effectively renders you unable to bypass the security measures. Now, with 100x100,000 IPs required for shutdown, this represents an escalating growth, and you remain vulnerable to business downtime despite your lack of active monitoring.

The rate limit is being configured to protect real users. These are additional safeguards designed to prevent unauthorized access.

Rate limiting. Real users will not enter your site rapidly and repeatedly with frequent F5 short-duration requests.

For inquiries regarding JS-based requests, the real visitors are using browsers, not curl, wget, okHttp, httpx, or similar requestors that don’t utilize JavaScript execution modules. Therefore, it is recommended to enable full-stack JavaScript interception.

Please close the CDN’s HTTP/2.0 protocol.

The principle is that HTTP/2.0 introduced connection reuse, allowing for multiple requests to be sent over a single TCP connection. This significantly reduces the attack surface by lowering the cost of establishing and maintaining connections.

Through testing, after closing HTTP/2.0, attackers were able to trigger a 50GB drop to 10 minutes, then back to 5G in just 5 minutes.
Video: https://www.bilibili.com/video/BV1paryBeEbP/

# How to become a highly durable website?

1. Intercept foreign traffic.
2. All requests are important.
3. Setting rate limits
4. Closed CDN’s HTTP/2.0
# Fantastic ingenuity and skillful maneuvering.

### ESA禁海外访问
针对于ESA，免费版用户可能无法设置区域限制
![](../../assets/images/waf-3.webp)

We can employ a rule to intercept all requests, then determine if it’s a mainland IP address; if so, bypass this rule.

![](../../assets/images/waf-4.webp)

![](../../assets/images/waf-5.webp)

Video: https://www.bilibili.com/video/BV1fKimBnE3T/

### EdgeOne Page使用CDN WAF
EdgeOne是个奇葩，它的CDN和Page的WAF是分开的，并且Page的WAF防护非常烂，只能 **针对单个IP** 进行拦截
![](../../assets/images/waf-8.webp)

We can enable CDN to ingest WAF strategies on the page, with the left side being a CDN domain creation interface and the right side being a popup window for the Page interface.

Please provide the text you would like me to translate.
As such, you will see double the traffic after setting this up because CDN delivers the page once, and the page itself provides the source content again. You can alleviate this by enabling caching.

![](../../assets/images/waf-7.webp)