---
title: "Leveraging Astrov3’s native redirection, various advanced redirections can be achieved!"
description: "Here’s a professional English translation of the text:  “Previously, I utilized Cloudflare Pages Redirects to implement personalized redirection chains for my personal short-link. However, I have now realized that direct integration into my Astro blog is now possible.”"
published: 2025-09-02
image: '../../assets/images/2025-09-02-05-59-33-image.webp'
tags: [重定向, Astro]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Please provide the text you would like me to translate.

Astro v3 officially supports live reloads [路由 | 文档 - Astro 文档](https://docs.astro.js.cn/en/guides/routing/#configured-redirects).

```json {   "C:astro.config.mjs": "To redirect requests from /c:/tit to /c:/posts/pin, please configure multiple redirection rules." } ```

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

The Astro output mode is SSG. Whether the redirection support for Astro is limited to `location` redirections only, or supports `HTML` redirections as well, depends on the specific implementation details of the Astro server.

Certainly, here is the translation of the text:  “When a service provider does not configure additional services, Astro will use a compatibility mode, creating `HTML` redirects. You may try installing an adapter to support redirections, but be aware that not all adapters will propagate Astro's settings for redirections. It’s recommended to use the redirection services provided by your service provider, as detailed in: [Configure Vercel.json to support server-level redirections](/posts/vercel-redirects/).”