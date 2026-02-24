---
title: "Configure Vercel.json to support server-side redirects."
description: "If your site (whether static or dynamic) is hosted on Vercel, configuring redirects is a remarkably straightforward process."
published: 2025-09-02
image: '../../assets/images/2025-09-02-06-34-54-image.webp'
tags: [Vercel, 重定向]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
The article explains how to configure redirects in your Next.js project using `vercel.json` and provides a JSON file that defines redirect rules for various paths, including permanent and temporary redirects with different status codes (308 and 307).
:::

# Formal commencement.

Official documentation: [Redirects](https://vercel.com/docs/redirects)

In your repository's root directory, create a `vercel.json` file and configure redirect rules.

Here’s the translation:  “The path to be redirected is `source`, and the destination is `destination`.  A permanent redirect will use a boolean value, defaulting to `true`.  In a permanent redirect, the status code will be [308](https://developer.mozilla.org/docs/Web/HTTP/Status/308); in a temporary redirect, it will be [307](https://developer.mozilla.org/docs/Web/HTTP/Status/307).”

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