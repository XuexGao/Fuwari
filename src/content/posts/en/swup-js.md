---
title: "Solving the JS Duplicate Request Issue That Has Plagued Me for a Long Time"
description: "If you followed my blog since its early days and possess some technical ability, you’ll notice that my blog went through a period of intense customization, which may have caused certain issues and still affects it today."
published: 2025-11-18
image: ../../assets/images/swup-js.webp
tags:
  - Swup
  - JS
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This blog, a modified version of the static Astro template "Fuwari," initially faced redundant Umami analytics requests due to multiple independent components fetching global stats. The author implemented a middleware to cache the global token in the browser to reduce network calls, but issues persisted due to Swup’s handling of page transitions. After resolving the issue by configuring Swup to avoid managing certain JS, all requests now behave correctly—no redundant calls, clean and efficient analytics tracking.
:::

# Formally begin
As the cover says, my blog is **** derived, and the base template is [saicaca/fuwari: ✨A static blog template built with Astro.](https://github.com/saicaca/fuwari)

As the original Fuwari described, this project is a **static blog**, meaning that writing articles and deploying the website are separated, and articles are individual Markdown files that are built and output as HTML.

Because the original project never considered **dynamic features** such as the **visit count display** currently used in my blog, there may be some issues after adding dynamic features.

This approach to displaying visit counts was previously described in [](/posts/static-view/). I assume you have already read it; the steps of this approach are two: 1. First, obtain the global sharing token; 2. Use this token to retrieve the actual visit count.

At that time, a strange issue arose: multiple duplicate requests appeared in Step One. After analyzing it myself, I realized that I used the same set of logic in three separate places on my blog, and they were mutually independent. In plain terms, when you open the blog, it first fetches the total site traffic, and since the first screen already displays some articles, it simultaneously fetches the traffic for those articles as well.

However, this global sharing token remains unchanged for an extremely long period, leading to a large number of redundant requests. At that time, I wrote a middleware that caches this token after the first request and stores it in the user's browser; subsequently, when needed, it can be used directly without needing to fetch it again from the network.

But today, a fan discovered that certain pages still make multiple requests to Umami, as shown in the figure.
![](../../assets/images/swup-js-1.webp)

Thus, it opened an issue [Bug: Multiple umami instances caused by improper Swup handling during internal navigation · Issue #79 · afoim/fuwari](https://github.com/afoim/fuwari/issues/79), informing me that it was a Swup issue, and that Swup should not manage such JS; after setting this, it indeed worked.

Finally, after using the method from this issue, we can randomly open a page and try to analyze it to see if there are any problems.
![](../../assets/images/swup-js-2.webp)
We only look at Umami requests:
- https://cloud.umami.is/script.js: Umami's official global JS, injected into all pages, for future use to report visitor behavior to Umami
- http://localhost:4321/js/umami-share.js: Previously written middleware to avoid multiple requests to Umami for the global token
- https://umami.2x.nz/analytics/us/api/websites/5d710dbd-3a2e-43e3-a553-97b415090c63/stats?startAt=0&endAt=1763429011353&unit=hour&timezone=Asia%2FShanghai&compare=false ：Retrieve full-site statistics. Why is full-site statistics also retrieved on article pages? Because full-site statistics are placed within the user configuration block, which is globally visible.
- https://umami.2x.nz/analytics/us/api/websites/5d710dbd-3a2e-43e3-a553-97b415090c63/stats?startAt=0&endAt=1763429243350&unit=hour&timezone=Asia%2FShanghai&path=eq.%2Fposts%2Fswup-js%2F&compare=false ：Get statistics for this page
- Two preflight requests: Due to CORS, the request origin and the target origin are inconsistent, which is a built-in security policy of the browser. The actual sequence is: first, preflight (Do I belong to you? Am I allowed to access you?) — then fetch (You're allowed; go ahead and access). Aside note: Why is preflight needed? Because the browser must ensure that the request is explicitly permitted by the target server, rather than being forcibly accessed by a malicious site, otherwise it would trigger **CSRF** attacks — meaning the target origin's security policy is too permissive, allowing anyone to retrieve information, which may be sensitive (e.g., login tokens, usernames, passwords, etc.).
- https://api-gateway.umami.dev/api/send ：Umami's official JS, used to report the behavior of this visit to Umami

The issue has been perfectly resolved! No redundant requests, clean and crisp.