---
title: "Configure Vercel.json to support server-side redirects."
description: "If your website (whether static or dynamic) is hosted on Vercel, configuring redirects is a straightforward process."
published: 2025-09-02
image: '../../assets/images/2025-09-02-06-34-54-image.webp'
tags: [Vercel, 重定向]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article provides instructions on how to implement redirects using `vercel.json` within your project's root directory, allowing you to control the URL structure and status codes for different routes. It explains the purpose of the `redirects` array and its configuration options, including permanent and temporary redirect settings.
:::

# Please provide the text you would like me to translate.

Official Documentation: Redirects

```json {   "redirects": [     {       "source_url": "/api/v1/users",       "destination_url": "/api/v1/users/create"     }   ] } ```

The source path is to be redirected. The destination is the path/URL for redirection. A permanent redirect is optional, and defaults to true. When a permanent redirect is active, the status code is 308. When a temporary redirect is active, the status code is 307.

```json
{
  "redirects": [
    {
      "source": "/ak",
      "destination": "https://akile.io/register?aff_code=503fe5ea-e7c5-4d68-ae05-6de99513680e",
      "permanent": false
    },
    {
      "source": "/kook",
      "destination": "https://kook.vip/K29zpT",
      "permanent": false
    },
    {
      "source": "/long",
      "destination": "https://iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii.iiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii.in/",
      "permanent": false
    },
    {
      "source": "/mly",
      "destination": "https://muleyun.com/aff/GOTRJLPN",
      "permanent": false
    },
    {
      "source": "/tg",
      "destination": "https://t.me/+_07DERp7k1ljYTc1",
      "permanent": false
    },
    {
      "source": "/tit",
      "destination": "/posts/pin/",
      "permanent": false
    },
    {
      "source": "/tly",
      "destination": "https://tianlicloud.cn/aff/HNNCFKGP",
      "permanent": false
    },
    {
      "source": "/wly",
      "destination": "https://wl.awcmam.com/#/register?code=FNQwOQBM",
      "permanent": false
    },
    {
      "source": "/yyb",
      "destination": "https://www.rainyun.com/acofork_?s=bilibili",
      "permanent": false
    }
  ]
}
```