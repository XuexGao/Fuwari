---
title: "Let's see how the anti-theft chains made by large factories look!"
description: "Today’s unexpected thought led me to consider attempting to access the image interfaces of various factories – a rather ambitious endeavor, as I was surprised to discover that many lacked security measures."
published: 2026-02-01
image: ../../assets/images/avatar.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# What is this?
I have gathered a collection of avatar interfaces, all originating from the majority of applications installed on my mobile device. No avatars with the **Web** designation are included; however, their presence indicates that the service provider has not implemented rigorous SSL verification, facilitating simple reverse engineering. Defaulted to mobile apps in these resources. All content is sourced from my personal accounts.

# Some notable discoveries were made.
- Microsoft has implemented a strict policy regarding its logo, utilizing cookie-based authentication to prevent direct access.
- WeChat, Alipay, TapTap, and DingTalk do not utilize Web protocols, therefore they cannot capture data.
- The platform, including NetEase Cloud Music, Kuang An, Homework Help, and Bean Bags, employs stringent SSL encryption protocols to ensure secure access. Specifically, it prevents direct internet browsing of these services.
- The image, excluding TapTap verification headers and other Referer checks, can be accessed directly. However, even attempting to verify the Referer header is futile.

|                                                                    Profile picture                                                                    | Description: The table contains a list of items with their corresponding prices.  |
| :--: | :-: |
|  image URL | QQ  |
| Image URL |   OPPO website  |
| Image |   Google (Web)  |
| image URL |   Xiaomi (Web)  |
| Image URL |   JD.com  |
| image URL |   Highmap (Web)  |
| avatar image |   Meituan  |
| Logo image |   Taobao  |
| Image width: 50 pixels, image height: 100 pixels. |   Bargain Dosto  |
| image |   GitHub website  |
| Image URL |   Telegram website  |
| Image URL |   WPS  |
| Image thumbnail |   Yixing  |
| Image URL |   Fast and fun.  |
| Image URL |   NetEase Cloud Music (Web)  |
| Image URL |   Kook  |
| image URL |   TapTap (Web)  |
| Image source: OxUBpiaYgpHgv5ETJhoPFuS7H1d2vuYxvZwb5eia5G1jMAunabN4HLjREsrDUaolsxMX77UXpBzicQ/0 width: 50 height: 100 |     |
| Image URL |     |
| image |   Steam website  |

# This indicates a shift in market dynamics, suggesting a potential decline in demand for the current product or service offering.
For static resources such as images, music, videos, and more, directly using `img` `audio` `video` tags is sufficient to display content remotely. This is a part of the W3C standard, for further details, please refer to [HTML5 Embedding Content](https://www.w3.org/TR/2014/REC-html5-20141028/embedded-content-0.html?utm_source=chatgpt.com).

Here’s a professional translation:  “If you are a website maintainer, you may prefer to avoid having your resources displayed publicly without direct attribution. Furthermore, there is a risk of being flagged for unauthorized listing and potentially incurring charges. Here's a brief overview of effective measures and those that are ineffective.”

Here’s a professional translation of the text:  “We will now differentiate between manual anti-theft chain implementations on mobile devices and browser CORS (Cross-Origin Resource Sharing) differences.”

Here’s the translation:  “Browser CORS (Cross-Origin Resource Sharing) is a client-side mechanism that triggers a blocking response when an origin server rejects a request based on its CORS policy.  A Content Delivery Network (CDN) or anti-theft proxy, often implemented on the server-side, acts as a defense against unauthorized access. It will display a user's browser with a CORS error message, such as 401 (Unauthorized), 403 (Forbidden), or 500 (Internal Server Error).”

Can we implement a Referer whitelist to block unauthorized access? **No use** As Referer can be forged or not sent, it’s detailed in [HTML 5 Source Tracking Strategy](https://www.w3.org/TR/referrer-policy/all/).

Here’s a professional translation of the text:  “You will need to implement a solution that integrates an API into cookies for both login and non-visitor permissions. Furthermore, the backend system must handle cookie issuance and revocation.”  As in Microsoft’s approach.

Here’s the translation:  “Users can only access images through a browser alone, and cannot have anyone (including you) include images on the website. You can utilize the **Accept Request Header** to selectively allow images to be accessed via automatic image forwarding.  Comparing this with the **Accept Request Header** – the former is direct image browsing triggering automatic sending, while the latter is used when images are referenced – may provide useful insights.”

```
text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
```

```
image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
```

Finally, if you wish to ensure that images are exclusively for visitor use and not for unauthorized distribution, you can utilize CORP (Cross-Origin-Resource-Policy).

Returning a CORP response header when retrieving images from others, such as **Cross-Origin-Resource-Policy: same-origin**.
Furthermore, CORP can protect not only images but also all other items. Below is a simplified illustration.
The browser retrieves resources and then requests the response headers, indicating whether to provide or withhold access to the resource. The response is then passed to the CORSE protocol, which defaults to providing access. Finally, the result is returned.

When the CORP response header returns a strategy that includes resources not matching the requested resources, **rowser will block resource retrieval upon return of the strategy, but will not block the original request**.

|      Value       |                    Description: The table contains a list of items. Each item has a name and a description. The names are in bold, and the descriptions are in italics.                     |
| :----------: | :---------------------------------------: |
| Same origin  |        Source: Example.com Allow access only to this resource.        |
|  Same-site   | Same website. Only allowed `*.example.com` `example.com`. Retrieve resources. |
| Cross-origin |          Default value. Allows all sources, anyone can retrieve.           |

Setting up cross-site referencing can result in browser blocking.

- Chromium（Edge/Chrome）
> 另外提一嘴，Chromium 最近推了一个更新，导致CORS/CORP错误默认不显示在控制台，需要勾选 **显示控制台中的CORS错误** [控制台功能参考  |  Chrome DevTools  |  Chrome for Developers](https://developer.chrome.com/docs/devtools/console/reference?utm_source=chatgpt.com&hl=zh-cn#cors-errors)
![](../../assets/images/avatar-1.webp)

- Firefox
![](../../assets/images/avatar-2.webp)