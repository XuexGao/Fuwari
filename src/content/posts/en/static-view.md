---
title: "Static blog also wants to showcase article readership? Of course!"
description: "Here’s a professional English translation of the text:  “Utilizing Umami and similar analytics platforms allows administrators to gain insights into site activity, but when we aim to present data to users, what approach should be taken?”"
category: "Tutorial"
published: 2025-06-18
image: ../../assets/images/acacac41-e1e1-4a15-bdae-05683656916c.webp
tags: [Cloudflare, Umami]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Umami Cloud 提供了一种新的方式来分析静态博客的访问量，通过分享URL和API调用。该方法允许用户查看每个文章的访问量，并利用 Umami 的分析功能，从而展示给用户。
:::

# Please provide the text you would like me to translate.

You likely see browsing statistics within your WordPress blog when a user visits a post.

This blog is simple because it relies on a VPS, and all you need to do is increment the browsing volume by 1 each time a user visits.

So, if it’s a static blog?

We can rely on some third-party services, such as [Umami Cloud](https://umami.is). In your static blog’s head injection, you can then see your site analytics, similar to the image below.

![](../../assets/images/2c1e7d81-6f6d-4323-b0de-013b2d168be1.webp)

We now see the access volume for each post (posts/xxx) clearly. How can we present this to users?

# Reverse Umami’s only read pages! (New v3)

Thank you for the solution provided by nightNya! You are a genius!

Please enable sharing URLs.

![](../../assets/images/023f687b-6e4a-46d8-b7f2-4778f20ebe99.webp)

Please provide the text you would like me to translate. I need the text itself to fulfill your request.

Please provide the content you want me to translate.
Please note that here, `us` is your account region, US for us, and EU for eu.

```json
{
  "websiteId": "a66a5fd4-98b0-4108-8606-cb7094f380ac",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3ZWJzaXRlSWQiOiJhNjZhNWZkNC05OGIwLTQxMDgtODYwNi1jYjcwOTRmMzgwYWMiLCJpYXQiOjE3NTA4MDIwMzB9.X5GQT5kslh6r25sFlap4Asz1NDA7mN3kcZW8wqbrnBc"
}
```

Please provide the text you would like me to translate.

https://cloud.umami.is/analytics/us/api/websites/a66a5fd4-98b0-4108-8606-cb7094f380ac/stats?startAt=0&endAt=1750805999999&unit=hour&timezone=Asia/Hong_Kong&path=eq./posts/cf-fastip/&compare=false)

Here are the key parameters:  *   **[content]**: The content remains unchanged. *   ****content****: The content remains unchanged. *   ***content***: The content remains unchanged. *   **`content`**: The content remains unchanged.

- Start time: Unix timestamp, we enter as 0, allowing Umami to begin counting from 1970.

- The total number of views is calculated using the current time and the start timestamp, which can be achieved by leveraging `Date.now()`.

- The path to be queried is `/posts/hello`.

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

Page views and visitors are counted as pageviews and visitors, respectively.

Browsing history is counted for each user who visits the site.

Okay, please provide the text. I’m ready when you are.

Okay, please provide the text. I’m ready when you are.

![](../../assets/images/ce822960-f7ef-444e-84d1-fa0758e2b5e8.webp)