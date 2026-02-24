---
title: "Solving the frustrating multiple requests issue with JS"
description: "Here’s the translation:  “If you were an early follower of my blog and possess some technical aptitude, you may notice that it has undergone significant revisions over time. This process could introduce issues and potentially impact its current state.”"
published: 2025-11-18
image: ../../assets/images/swup-js.webp
tags:
  - Swup
  - JS
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Here’s a brief summary of the article:

The author has addressed an issue with repeated requests for Umami, a static blog template built with Astro. The original project lacked dynamic features like access count display and was plagued by redundant requests when publishing articles.  A new intermediary was implemented to handle these requests once, eliminating the need for multiple network requests. This solution resolves the problem of excessive repetition and ensures efficient data collection.
:::

# Please provide the text you would like me to translate.
As the cover stated, my blog is **魔改** (Devil's Remix), and the original version was [saicaca/fuwari: ✨A static blog template built with Astro](https://github.com/saicaca/fuwari).

The project is a static blog, meaning that writing articles and deploying the website are separate processes, and each article is a Markdown file that is then output as HTML.

Due to the initial lack of consideration for dynamic features, such as current access counts displayed on my blog, incorporating them may introduce some issues.

The approach previously discussed in [该文章](/posts/static-view/) involves two steps: first, obtain a global sharing token; and then retrieve the actual access rate associated with that token.

Repeated requests occurred during the first step. After analyzing it, I discovered that I used the same logic in three places within the blog and were independent of each other. In plain language, this means that when you open the blog, it first retrieves total access volume, and simultaneously also retrieves the access volume of these articles on the first page, due to the fact that there are already some articles on the first page.

The global sharing token remains constant for a long period, resulting in numerous redundant requests. Consequently, I created an intermediary to store this token request once and then immediately use it, without requiring retrieval from the network again.

但是在今天，有一位粉丝发现某些页面仍然会多次请求 Umami ，如图
![](../../assets/images/swup-js-1.webp)

The issue was reported that due to improper handling of swup during station-level switching, it resulted in multiple instances of the ‘duuami’ JavaScript object. Issue #79 is associated with the bug report: “站内转跳时由于swup处理不当导致的多umami实例 · Issue #79 · afoim/fuwari”. The issue informs that Swup cannot manage this type of JS instance after setting it up, and it’s now usable.

最终，使用该issue的方法后，我们随便打开一个页面，尝试分析，看看是否有问题
![](../../assets/images/swup-js-2.webp)
我们只看Umami请求：
- https://cloud.umami.is/script.js ：Umami官方的全局JS，注入在所有页面中，用于后续将访客行为告知给Umami
- http://localhost:4321/js/umami-share.js ：之前写的中间件，用于避免多次请求Umami拿全局Token
- https://umami.2x.nz/analytics/us/api/websites/5d710dbd-3a2e-43e3-a553-97b415090c63/stats?startAt=0&endAt=1763429011353&unit=hour&timezone=Asia%2FShanghai&compare=false ：获取全站统计信息。为什么在文章页也会获取全站统计？因为全站统计被安放在用户配置块，而用户配置块全局可见
- https://umami.2x.nz/analytics/us/api/websites/5d710dbd-3a2e-43e3-a553-97b415090c63/stats?startAt=0&endAt=1763429243350&unit=hour&timezone=Asia%2FShanghai&path=eq.%2Fposts%2Fswup-js%2F&compare=false ：获取本页统计信息
- 两个预检：由于CORS，请求源和被请求源不一致，这是浏览器自带的安全策略，实际顺序为 先预检（我不属于你？我能不能访问你？） - 再fetch（我允许你，访问吧） 。题外话：为什么需要预检？因为浏览器要确保该请求是对方明确允许的，而不是恶意网站强行访问的，否则会触发 **CSRF** 攻击，也就是对端源安全策略过于宽松，导致谁都能拿到信息，这些信息可能是敏感的（如登录Token，用户名与密码等）
- https://api-gateway.umami.dev/api/send ：Umami的官方JS，用于将本次访问的行为汇报给Umami

Okay, please provide the text. I’m ready when you are.