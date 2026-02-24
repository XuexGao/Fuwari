---
title: "Achieve Various Advanced Redirects Using Astrov3's Native Redirection"
description: "Previously, I used Cloudflare Pages Redirects to implement my personal short-link redirection, but now I've found that I can integrate it directly into my Astro blog."
published: 2025-09-02
image: '../../assets/images/2025-09-02-05-59-33-image.webp'
tags: [重定向, Astro]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
Astro v3 ， `astro.config.mjs` 。 SSG ，Astro  HTML ， Location ，，（）。
:::

# Formally begin

> Astro v3 officially supports native redirects [Routing | Documentation - Astro Documentation](https://docs.astro.js.cn/en/guides/routing/#configured-redirects)

Simply add the following code in `astro.config.mjs`. The example code will 302 redirect requests from `/tit` to `/posts/pin`. Multiple redirect rules can be configured.

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  redirects: {
    "/tit": {
        destination: "/posts/pin/",
        status: 302,
    },
  }
});
```

Some will ask, if my Astro output mode is SSG, does Astro's redirection not support `location` redirection? Does it only support `HTML` redirection?

Indeed, without additional configuration of your build provider, Astro will use compatibility mode to create `HTML` redirects. You can attempt to install adapters to support redirects, but note that **not all adapters will pass through the redirect rules set in Astro**. It is always recommended to use the redirect service provided by your build provider. See: [Configure vercel.json to support server-level redirects](/posts/vercel-redirects/). For configuring `vercel.json`. For more information about Astro adapters, see [Configuration Reference | Docs](https://docs.astro.build/zh-cn/reference/configuration-reference/#adapter).