---
title: "Leveraging Astrov3’s native redirection, various advanced redirections can be achieved!"
description: "Here’s the translation:  “Previously, I utilized Cloudflare Pages Redirects to implement a personal short-chain redirection for my blog. Now, I find that I can directly integrate it into my Astro blog.”"
published: 2025-09-02
image: '../../assets/images/2025-09-02-05-59-33-image.webp'
tags: [重定向, Astro]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Formal commencement.

Astro v3 now supports native redirects [Documentation - Astro Documentation](https://docs.astro.js.cn/en/guides/routing/#configured-redirects).

Please add the following code to the `astro.config.mjs` file, with an example demonstrating redirection from C:/tit to C:/posts/pin. You can configure multiple redirect rules.

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

Here’s the translation:  “My friends often ask about my Astro output mode, and if my Astro configuration is set to SSG, does that limit redirection to the Astro location? It only supports redirections via the HTML format.”

Certainly, in the absence of additional configuration for a service provider, Astro utilizes a compatibility mode to create a `HTML` redirect. Attempting to install an adapter to support redirects may be necessary, however, it’s crucial to note that not all adapters will propagate Astro-specific redirections. It is recommended to utilize the redirection services provided by your service provider, as detailed in: [Configure Vercel.json for Server-Side Redirection](/posts/vercel-redirects/) . For more information on Astro adapters, consult: [Configuration Reference | Docs](https://docs.astro.build/zh-cn/reference/configuration-reference/#adapter)