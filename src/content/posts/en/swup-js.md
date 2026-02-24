---
title: "Solving the frustrating multiple requests issue with JS"
description: "If you were initially interested in my blog during its early stages, and possess a certain technical aptitude, you may discover that it underwent extensive modifications at one point. This process could have introduced issues and potentially impacted the blog’s current state."
published: 2025-11-18
image: ../../assets/images/swup-js.webp
tags:
  - Swup
  - JS
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This blog post addresses a persistent issue with Umami’s access rate display, which was initially lacking dynamic functionality and causing repeated requests. The core problem stemmed from the blog's approach to global sharing tokens, leading to inefficient request handling. A solution involving a middleware triggered upon token acquisition addressed this issue, eliminating redundant requests and improving performance.
:::

# Formal commencement.
As stated on the cover, my blog is **Magic Remix**, and the original version was [saicaca/fuwari: ✨A static blog template built with Astro](https://github.com/saicaca/fuwari).

As described in the original Fuwari project, this is a static blog application where writing content and deploying the website are separate processes. The content itself is presented as MarkDown files, which are then rendered into HTML upon completion.

Due to the initial design, there was no consideration for dynamic features such as the current access count displayed on my blog. The addition of dynamic functionality may introduce potential issues.

The approach outlined in this article previously discussed. Assuming you have completed the article, the steps involve two phases: 1) Obtain the global share token; and 2) Retrieve the token to access the actual access rate.

At the time, an unusual issue arose with repeated requests during step one. After analysis, I discovered that I utilized the same logic across three distinct locations within my blog – specifically, in the first page and two subsequent pages. In layman's terms, when a user opens the blog, it initially retrieves total website traffic, alongside the access data for the initial content on the homepage.

Here’s the translation:  “The global sharing token remains constant over an extended period, resulting in a significant amount of redundant requests. To address this, I implemented a middleware that processes each request for the token and stores it directly within the user's browser. Subsequent use requires no network requests to retrieve the token.”

但是在今天，有一位粉丝发现某些页面仍然会多次请求 Umami ，如图
![](../../assets/images/swup-js-1.webp)

Here’s the translation:  “Consequently, it initiated an issue [Bug: Regarding the situation where the system internally switches between multiple instances of ‘swup’ due to improper handling by Swup, resulting in a 'duo-muami' instance, Issue #79 · afoim/fuwari](https://github.com/afoim/fuwari/issues/79). It informed me that Swup was unable to manage this type of JavaScript. After the configuration, it proved possible to utilize.”

最终，使用该issue的方法后，我们随便打开一个页面，尝试分析，看看是否有问题
![](../../assets/images/swup-js-2.webp)
我们只看Umami请求：
- https://cloud.umami.is/script.js ：Umami官方的全局JS，注入在所有页面中，用于后续将访客行为告知给Umami
- http://localhost:4321/js/umami-share.js ：之前写的中间件，用于避免多次请求Umami拿全局Token
- https://umami.2x.nz/analytics/us/api/websites/5d710dbd-3a2e-43e3-a553-97b415090c63/stats?startAt=0&endAt=1763429011353&unit=hour&timezone=Asia%2FShanghai&compare=false ：获取全站统计信息。为什么在文章页也会获取全站统计？因为全站统计被安放在用户配置块，而用户配置块全局可见
- https://umami.2x.nz/analytics/us/api/websites/5d710dbd-3a2e-43e3-a553-97b415090c63/stats?startAt=0&endAt=1763429243350&unit=hour&timezone=Asia%2FShanghai&path=eq.%2Fposts%2Fswup-js%2F&compare=false ：获取本页统计信息
- 两个预检：由于CORS，请求源和被请求源不一致，这是浏览器自带的安全策略，实际顺序为 先预检（我不属于你？我能不能访问你？） - 再fetch（我允许你，访问吧） 。题外话：为什么需要预检？因为浏览器要确保该请求是对方明确允许的，而不是恶意网站强行访问的，否则会触发 **CSRF** 攻击，也就是对端源安全策略过于宽松，导致谁都能拿到信息，这些信息可能是敏感的（如登录Token，用户名与密码等）
- https://api-gateway.umami.dev/api/send ：Umami的官方JS，用于将本次访问的行为汇报给Umami

The issue has been resolved perfectly! There are no redundant requests, and the process is streamlined.