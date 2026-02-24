---
title: "Open Architecture: How I Built My Anime Random Image API"
description: "I found that many friends also want to set up their own random image API, so I’m sharing my architecture here, which I’ve refined over two years, for everyone’s reference~"
published: 2025-09-06
image: '../../assets/images/2025-08-31-04-09-37-image.webp'
tags: [随机图API]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}

:::

# API endpoints

[[Portal: https://pic.072103.xyz]]

API endpoints inside the portal: https://hpic.072103.xyz https://vpic.072103.xyz (CF Worker)

API endpoint used by the blog: https://eopfapi.acofork.com/pic?img=ua (EdgeOne Pages Functions)

# New implementation

Image source is stored in EdgeOne Page, with EdgeOne Pages Functions serving as the entry point. Upon receiving a request, it first distinguishes between landscape, portrait, and adaptive modes, i.e., `?img=h`, `?img=v`, `?img=ua`, then returns the corresponding image stored internally. For more details, please refer to the source code: [EdgeOne_Function_PicAPI/functions/pic.js at main · afoim/EdgeOne_Function_PicAPI](https://github.com/afoim/EdgeOne_Function_PicAPI/blob/main/functions/pic.js)
# Old implementation

Use cnb.cool to store images, with eopf acting as an intermediate proxy.
# Old version implementation

> Cloudflare R2 was abandoned after being subjected to **70 million (GET) requests** and charges of **28.08 USD (equivalent to 207.93 CNY)**

All image sources exist in **Cloudflare R2**, all in **Webp** format, categorized only as **landscape, portrait**, as shown in the image.

![](../../assets/images/2025-08-31-04-13-08-image.webp)

![](../../assets/images/2025-08-31-04-13-17-image.webp)

Take the API I am currently using, https://eopfapi.acofork.com/pic?img=ua, for example.

Looking at the domain name, it's clear this is a **EdgeOne Pages Functions** service (hereinafter referred to as **eopf**). What? You're asking why we're using this? Well, of course! **All features are completely free at the moment!**

![](../../assets/images/2025-08-31-04-18-45-image.webp)

Source code is available at [afoim/EdgeOne_Function_PicAPI: Random Graph API for EdgeOne Edge Functions](https://github.com/afoim/EdgeOne_Function_PicAPI)

The principle is to have **eopf** connect to **Cloudflare R2** and then randomly retrieve an image. Yes! That's it—simple as that!

[[The principle is the same for another CF Worker endpoint mentioned above, except that CF internally connects to R2 without manually handling S3 authorization]]