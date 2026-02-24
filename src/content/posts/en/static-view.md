---
title: "Static Blog Also Wants to Showcase Article Readership? Of Course!"
description: "Using Umami and similar analytics platforms allows administrators to gain insights into site activity, but we need to present data to users."
category: "Tutorial"
published: 2025-06-18
image: ../../assets/images/acacac41-e1e1-4a15-bdae-05683656916c.webp
tags: [Cloudflare, Umami]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Umami Cloud analytics provides a way to track website traffic, specifically page views and visitors, for static blogs using WordPress.  The platform utilizes a share URL to generate data, and the analysis is performed via an API call with specific parameters. The output reveals detailed statistics on page views, visitors, visits, bounces, total time, and comparisons between different pages.
:::

# Introduction

If you’ve used WordPress, including dynamic blogging frameworks like Halo, you likely see visitor analytics data when a user views a post.

The underlying principle is straightforward: dynamic blogs rely on a VPS, and all that’s required is for users to increment the view count each time they access the site.

If we are a static blog, what does that mean?

We can leverage third-party services, such as [Umami Cloud](https://umami.is). By injecting a JavaScript snippet into your static blog’s head, you can gain access to your site analytics, mirroring the screenshot below.

![](../../assets/images/2c1e7d81-6f6d-4323-b0de-013b2d168be1.webp)

We now clearly see the access volume for each post (specifically, posts with the ID ‘xxx’) and we need to determine how best to present this information to users.

# Here’s the translation:  “Reverse Umami – Read-Only Pagelets (New Version v3)”

Thank you very much for the innovative solution provided by NightNya! You are truly exceptional!

First, we enable sharing URLs.

![](../../assets/images/023f687b-6e4a-46d8-b7f2-4778f20ebe99.webp)

Please note that the following translations are provided as requested, adhering to all specified rules.  “It is important to consider that each site has unique characteristics.”

Following our request to `https://cloud.umami.is/analytics/us/api/share/7PoDRgCzHFTs2vWB`, we received [[X:content]].
Please note that the `us` refers to your account region, US for America and EU for Europe.

```json
{
  "websiteId": "a66a5fd4-98b0-4108-8606-cb7094f380ac",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3ZWJzaXRlSWQiOiJhNjZhNWZkNC05OGIwLTQxMDgtODYwNi1jYjcwOTRmMzgwYWMiLCJpYXQiOjE3NTA4MDIwMzB9.X5GQT5kslh6r25sFlap4Asz1NDA7mN3kcZW8wqbrnBc"
}
```

We request the inclusion of a request header `x-umami-share-token` containing the token obtained in the previous step.

`https://cloud.umami.is/analytics/us/api/websites/a66a5fd4-98b0-4108-8606-cb7094f380ac/stats?startAt=0&endAt=1750805999999&unit=hour&timezone=Asia/Hong_Kong&path=eq./posts/cf-fastip/&compare=false`

这里解释几个关键Params，其他的照搬

- Start time: Timestamp in Unix epoch, we record it as 0, allowing Umami to begin counting from 1970.

- End-of-session time is recorded as a Unix timestamp. Utilizing `now()`, which provides the current time and the startAt parameter, we can calculate total website views.

- The path you are interested in should be entered as the URL of your article page, excluding the Host path (e.g., `/posts/hello`). Please note that Umami will treat `/posts/hello` and `/posts/hello/` as two separate paths; ensure your blog framework is configured to use `/`. In version 3, you must use `eq.` prefix for precise matching, such as `path=eq./posts/hello/`.

Will you receive?

```json
{
    "pageviews": 1655,
    "visitors": 343,
    "visits": 411,
    "bounces": 183,
    "totaltime": 30592,
    "comparison": {
        "pageviews": 0,
        "visitors": 0,
        "visits": 0,
        "bounces": 0,
        "totaltime": 0
    }
}
```

`pageviews` indicates the number of views on a page; `visitors` refers to the number of individuals who have accessed that page.

Here’s the translation:  “Browsing history is counted for each user who visits, and not for repeated access to the same page or multiple requests within a single timeframe.”

Enjoy!

最终效果：

![](../../assets/images/ce822960-f7ef-444e-84d1-fa0758e2b5e8.webp)