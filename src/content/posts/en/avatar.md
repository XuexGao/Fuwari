---
title: "Let's see how large factories make anti-theft chains!"
description: "Here’s a professional translation of the text:  “A sudden impulse led me to investigate the image sharing protocols of various factories – I was surprised to discover that many lacked security measures.”"
published: 2026-02-01
image: ../../assets/images/avatar.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# What is this?
Some avatar interfaces were collected from my phone’s majority app services currently installed. There are no avatars marked with the **Web** tag, and if you can see them, it indicates that the service provider has not performed rigorous SSL verification, making reverse engineering extremely simple.  Defaulting to mobile apps for these resources is all. All resources are from my personal account.

# Some discoveries were made.
- Microsoft’s logo is strictly regulated and utilizes cookie verification, preventing direct access.
- We do not utilize Web protocols such as WeChat, Alipay, TapTap, or DingTalk. Therefore, we cannot capture data through these platforms.
- The small black box, NetEase Cloud Music, Kuang An, Homework Help, Bean Bags, and KFC all utilize strict SSL verification, preventing direct access.
- The image bypasses TapTap verification and other referrer checks, so it can be accessed directly. However, even attempting to verify the Referer header is futile.

Okay, please provide the text. I’m ready when you are.
Okay, please provide the text. I’m ready when you are.
QQ
OPPO (Web)
Google (Web)
Xiaomi (Web)
“JD.com (Web)”
Highmap (Web)
Meituan
淘宝
Pinterest
GitHub (Web)
Telegram (Web)
WPS (Web)
闲鱼
Great fun, it’s amazing!
NetEase Cloud Music (Web)
KOOK
TapTap (Web)
微信公众号助手
百度网盘
Steam (Web)

# This indicates a significant shift in market dynamics and consumer behavior. The data reveals a growing preference for sustainable and ethically sourced products, driving increased demand for brands committed to responsible practices. Furthermore, consumers are increasingly prioritizing transparency and traceability throughout the supply chain, seeking assurance that their purchases align with their values.
For static resources such as images, music, and videos, directly using `img` `audio` `video` tags is sufficient without CORS. This is a part of the W3C standard, for more details, please refer to [HTML5 嵌入内容](https://www.w3.org/TR/2014/REC-html5-20141028/embedded-content-0.html?utm_source=chatgpt.com).

Here are some effective measures to protect your resources:  *   Implement strong authentication and authorization protocols. *   Regularly monitor and audit your website’s activity. *   Employ security best practices, such as regular software updates and vulnerability scanning. *   Consider using a Content Delivery Network (CDN) for improved performance and security.

First, we’ll differentiate between manual anti-theft chains and browser CORS differences.

Browser CORS is a client-side behavior. When an action is blocked by an upstream CORS strategy, the browser will block the response body. The backend anti-fraud chain is written on your server-side and serves to block unauthorized access. It will display a CORS error in the user's browser, such as 500, 401, 403, depending on your implementation.

Can implement a referrer whitelist to block unauthorized access. **No use** Because referrers can be forged or not sent, as detailed in [HTML 5 引用来源策略](https://www.w3.org/TR/referrer-policy/all/).

You should handle API requests through cookies, including login and non-authorized access. As with Microsoft, the backend should manage cookie issuance and revocation.

The user can access the image browser automatically, while others (including the user) cannot include images in the website.  You can use the “Accept Request Headers” to filter out unwanted requests. This approach is direct access via the image browser, whereas the latter method involves sending the image request through the website’s system.

```
text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
```

```
image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
```

The content is:  “The experience was remarkable, offering a unique blend of history and natural beauty.  We were particularly impressed by the intricate details of the architecture and the vibrant atmosphere within the ancient city center.”

```json {"corps": "Cross-Origin-Resource-Policy: same-origin"} ```
Furthermore, CORP can protect everything, and here’s a simple diagram:
Requesting resources, checking response headers, CORP (either to send or not to send, defaults to sending), CORS (either to allow or deny JS access, defaults to denying), returns.

When a CORP response header returns resources that don’t match the expected source, the browser will block resource retrieval during page load but won't prevent the original request.

Okay, please provide the text. I’m ready when you are.
Please provide the text you would like me to translate! I need the text to be able to fulfill your request.
Same-origin. Only allowed to retrieve corresponding resources from `example.com`.
Same-site content is allowed only `*.example.com` and `example.com`.
Default value. Allows all origins, anyone can pull.

Please provide the text you would like me to translate.

- Chromium（Edge/Chrome）
> 另外提一嘴，Chromium 最近推了一个更新，导致CORS/CORP错误默认不显示在控制台，需要勾选 **显示控制台中的CORS错误** [控制台功能参考  |  Chrome DevTools  |  Chrome for Developers](https://developer.chrome.com/docs/devtools/console/reference?utm_source=chatgpt.com&hl=zh-cn#cors-errors)
![](../../assets/images/avatar-1.webp)

- Firefox
![](../../assets/images/avatar-2.webp)