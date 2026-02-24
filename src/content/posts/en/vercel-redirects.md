---
title: "Configure vercel.json to support server-level redirects"
description: "If your site (whether static or dynamic) is using Vercel, configuring redirects is very easy."
published: 2025-09-02
image: '../../assets/images/2025-09-02-06-34-54-image.webp'
tags: [Vercel, 重定向]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
To set up redirects in a Vercel project, create a `vercel.json` file at the root with an array of redirect rules. Each rule specifies a `source` path, a `destination` URL, and an optional `permanent` flag (defaulting to `true` for 308 redirects). The example config redirects various paths like `/ak`, `/kook`, and `/tg` to external or internal URLs with temporary (307) redirects.
:::

# Formally begin

> Official documentation: [Redirects](https://vercel.com/docs/redirects)

Create `vercel.json` in your repository's root directory to write redirect rules

`source` is the path to be redirected, `destination` is the target path/URL, and `permanent` is an optional boolean value to switch between permanent and temporary redirects (default is `true`). When `true`, the status code is [308](https://developer.mozilla.org/docs/Web/HTTP/Status/308). When `false`, the status code is [307](https://developer.mozilla.org/docs/Web/HTTP/Status/307).

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