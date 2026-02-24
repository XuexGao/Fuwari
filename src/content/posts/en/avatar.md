---
title: "Let's take a look at how well various major companies are doing with image!"
description: "Today, I had a sudden idea to try accessing the profile image APIs of various major companies, and surprisingly, many of them have no anti-hotlinking protection at all."
published: 2026-02-01
image: ../../assets/images/avatar.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article compiles avatar image URLs from various apps and services the author uses, noting which ones are accessible via web without strict SSL or referer checks. It highlights that many platforms (like QQ, Google, Xiaomi) expose avatars directly, while others (like WeChat, Alipay, DingTalk) use non-web protocols or strong security measures. The author also points out that HTML5 allows embedding such media without CORS restrictions, which may be undesirable for site owners.
:::

# What is this?
Just casually collected some avatar interfaces, all sourced from the majority of APP services currently installed on my phone. Those avatars without the **Web** identifier—if you can see them—indicate that the service provider did not implement strict SSL validation, making reverse engineering extremely simple. The absence of this identifier defaults to mobile apps. All resources below come from my personal accounts.

# Some small discoveries
- Microsoft's avatar is very strict, using cookie validation, and cannot be accessed directly.
- WeChat, Alipay, TapTap, and DingTalk do not use web protocols, so they cannot be captured.
- Xiao Hei Box, NetEase Cloud Music, KuAn, ZuoYe Bang, Doubao, KFC, and Ku Jie Qu all adopt strict SSL verification and cannot be accessed directly.
- The following images, except for those verified by TapTap's Referer check, do not verify Referer at all, so they can be accessed directly. However, even if Referer verification were performed, it would be futile.

|                                                                    Avatar                                                                    | Description  |
| :--: | :-: |
|  <img src="https://q2.qlogo.cn/headimg_dl?dst_uin=2726730791&spec=0" width="50" height="100"> | QQ  |
| <img src="https://ocs-cn-north1.heytapcs.com/titans-usercenter-avatar-bucket-cn/vf/q7/7c/vfq77cwaxzzwzzaky7rkgiear4000000_1755101257605_s.webp" width="50" height="100"> |   OPPO (Web)  |
| <img src="https://lh3.googleusercontent.com/a/ACg8ocLIJXR_N2wuwp93PorzuRum2GhcH7J2dO-OZUyDhMbB-AR_wbp6GM2cl7wWM6g2R8wddRd6SCJDWbRFKoenroJnx3eVdHE=s288-c-no" width="50" height="100"> |   Google (Web)  |
| <img src="https://cdn.cnbj1.fds.api.mi-img.com/user-avatar/eUlnezeXgqmLGraD2sQ90d-x-vk-cd104cbc_320.webp" width="50" height="100"> |   Xiaomi (Web)  |
| <img src="http://storage.360buyimg.com/default.image/6a645f6465665f696d675f393836323031373632333134353936313533_big.webp" width="50" height="100"> |   JD.com (Web)  |
| <img src="https://aos-cdn-image.amap.com/pp/avatar/bb8/e4/0e/277600933.webp?ver=1717735051&imgoss=1" width="50" height="100"> |   AutoNavi Map (Web)  |
| <img src="http://img.meituan.net/avatar/0c3440bf16903eeba85fe9965bcdc66115409.webp%40132w_132h_1e_1l.webp" width="50" height="100"> |   Meituan  |
| <img src="https://img.alicdn.com/sns_logo/TB1e4rMt8Bh1e4jSZFhXXcC9VXa-240-240.webp_320x320q95.webp" width="50" height="100"> |   Taobao  |
| <img src="http://avatar3-3.pddpic.com/a/Q0FvYVZ2SDFGRkJQTFpTMUlTaHRIN1d4MDI3QUNhWWt3UT09djA0-1706852575?imageMogr2/thumbnail/100x" width="50" height="100"> |   Pinduoduo  |
| <img src="https://avatars.githubusercontent.com/u/180811437?s=400&u=e785f90ecf2021cc754f9e705c171389f17a204e&v=4" width="50" height="100"> |   GitHub (Web)  |
| <img src="https://cdn5.telesco.pe/file/eEJesgiw8Vk2I9TP-d0xawWucIlC-204T6Ghy1LGLLmNUuajtFbh5eX1iL3fEao2jnjI92dpXAkyOSOiWIjhNbdWQ7PVKdFKCIUF-FqF8S0O27QcHFxrEMcTH-Ajpe-iX55sjjNvZC6IaHbEXjcVxBvF0fMjNb4BIYzW_KVVVsD0bG1H_rkf89rlPTePCUFySDdtFx7QYegbtoruOUcCuqt00qcozFIMynAi5NLGbtkTfRcUq3nJ2-7g9SGPpPI1U5MQPwjIR_c2p1dTiveR5q-9fx5rMk4IM_pOBRnjNAkJGm7fjNQQzanfgz5QK6kQ8VgPRHC2Ny-0gifoklRY7A.webp" width="50" height="100"> |   Telegram (Web)  |
| <img src="https://img.qwps.cn/315260194?imageMogr2/thumbnail/180x180!&k=1715912797563685102" width="50" height="100"> |   WPS (Web)  |
| <img src="http://img.alicdn.com/bao/uploaded/i1/O1CN01Y71UwZ1Xr3hlLi79V_!!4611686018427385488-0-mtopupload.webp" width="50" height="100"> |   Xianyu  |
| <img src="https://imga.3839.com/117535?t=1765556642" width="50" height="100"> |   Good Game Explosion  |
| <img src="http://p3.music.126.net/MT4fcDQM_7eo7NLq9-Ge2A==/109951169275563698.webp?param=30y30" width="50" height="100"> |   NetEase Cloud Music (Web)  |
| <img src="https://img.kookapp.cn/attachments/2026-01/31/vknjuH7RiN0dw0dw.webp?x-oss-process=style/icon" width="50" height="100"> |   COOK  |
| <img src="https://img3-tc.tapimg.com/avatars/etag/FnKeVW2he8X1JwJ33XoFRG02eGVm.webp/_tap_avatar_m.webp" width="50" height="100"> |   TapTap (Web)  |
| <img src="http://wx.qlogo.cn/mmhead/OxUBpiaYgpHgv5ETJhoPFuS7H1d2vuYxvZwb5eia5G1jMAunabN4HLjREsrDUaolsxMX77UXpBzicQ/0" width="50" height="100"> |   WeChat Public Account Assistant  |
| <img src="https://himg.bdimg.com/sys/portrait/item/public.1.32f8f9b.Naa8uLkNmy_npPPyAuyi-A.webp?1769944805341" width="50" height="100"> |   Baidu Netdisk  |
| <img src="https://avatars.akamai.steamstatic.com/e603bd97da45790ad8bfb15648040f599c1aa52d.webp" width="50" height="100"> |   Steam (Web)  |

# What does this indicate?
For images, music, videos, and other static resources, if directly using `img` `audio` `video` tags, remote resources can be displayed on any webpage without CORS. This is part of the W3C specification; details can be found in [HTML5 embedded content](https://www.w3.org/TR/2014/REC-html5-20141028/embedded-content-0.html?utm_source=chatgpt.com)

Of course, if you are a website maintainer, you may not want strangers to directly display your resources to others, or fear being billed for abuse. Below, I will briefly explain which measures are effective and which are merely self-deception.

First, let's distinguish between the anti-hotlinking you manually implement on the server side and the browser's CORS mechanism:

*Browser CORS is a client-side behavior; when a request is rejected by the cross-origin policy of the target server, the browser blocks the response body. Server-side anti-hotlinking, on the other hand, involves writing small scripts on your backend to reject unauthorized access. The former will display a CORS error in the user's browser, while the latter will show an error HTTP status code such as 500, 401, or 403 in the user's browser, depending on your implementation*

Can we try setting a Referer whitelist to block unauthorized access? **Not useful** Because Referer can be forged or omitted in browsers. See [HTML 5 Referer Policy](https://www.w3.org/TR/referrer-policy/all/)

What you should do is slightly more complex, such as placing the API in a cookie (login, non-guest permissions) and having the backend handle the issuance and revocation of cookies. Just like Microsoft does.

Alternatively, if you only want users to view images through the browser individually, without allowing **anyone (including you) ** to reference the images on their websites, you can use a **Accept request header** whitelist. You can try comparing these two **Accept request headers**: the first one is automatically sent by the browser when directly accessing the image, while the second one is sent when referencing the image.

```
text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7
```

```
image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8
```

Finally, if you want the image to be accessible only to ****, and you don't want others to abuse it, you can use CORP (Cross-Origin-Resource-Policy).

Just return a CORP response header when others fetch images, such as: **Cross-Origin-Resource-Policy: same-origin**
> Moreover, CORP can not only protect images but also protect everything else. Below is a simple diagram.
> Browser fetches resources -> Requests resource, checks response headers -> CORP (whether to allow usage by default, usually allows) -> CORS (whether to allow JS to read, defaults to disallow) -> Returns

When the policy returned in the CORP response header does not match the source of the resource to be fetched, **The browser will block the resource from loading on the page, but will not block the original request**

|      Value       |                    Description                     |
| :----------: | :---------------------------------------: |
| same-origin  |        Same origin. Only allows `example.com` to fetch corresponding resources        |
|  same-site   | Same station. Only allows `*.example.com` `example.com` to pull resources |
| cross-origin |          Default. Allows all sources; anyone can pull.           |

After setting, cross-site references will be blocked by the browser.

- Chromium (Edge/Chrome)
> Also, worth mentioning: Chromium recently pushed an update that causes CORS/CORP errors to no longer display by default in the console. You need to check **Show CORS errors in console** [Console features reference  |  Chrome DevTools  |  Chrome for Developers](https://developer.chrome.com/docs/devtools/console/reference?utm_source=chatgpt.com&hl=zh-cn#cors-errors)
![](../../assets/images/avatar-1.webp)

- Firefox
![](../../assets/images/avatar-2.webp)