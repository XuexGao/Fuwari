---
title: "Can a static blog also display article views? Of course it can!"
description: "Using site analytics software like Umami allows administrators to understand site activity, but what if we want to display some data to users?"
category: "Tutorial"
published: 2025-06-18
image: ../../assets/images/acacac41-e1e1-4a15-bdae-05683656916c.webp
tags: [Cloudflare, Umami]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
To display article view counts on a static blog using Umami Cloud, you can reverse-engineer its API by enabling share URLs, fetching a token, and querying the `/stats` endpoint with precise path parameters like `eq./posts/xxx/` to retrieve `pageviews`. This method leverages Umami’s analytics backend to show real-time visit metrics without dynamic server-side tracking. The final output displays the total pageviews for each post, mimicking the behavior of dynamic blog platforms.
:::

# Introduction

If you have used dynamic blog frameworks like WordPress or Halo, you will likely see the view count information when accessing articles from the user's perspective.

This principle is simple: since dynamic blogs rely on a VPS, it only requires incrementing the page views by 1 each time a user visits.

Then what if we are a static blog?

We can rely on some third-party services, such as [Umami Cloud](https://umami.is). Inject a JS into the head of your static blog, and you will be able to see your site analytics, similar to the image below.

![](../../assets/images/2c1e7d81-6f6d-4323-b0de-013b2d168be1.webp)

Now we can indeed see the visit counts for each article (i.e., /posts/xxx), but how should we display them to users?

# Read-only page of Reverse Umami! (New Version v3)

> Thank you, nightNya, for providing the solution—you're a genius!

First, we enable the share URL.

![](../../assets/images/023f687b-6e4a-46d8-b7f2-4778f20ebe99.webp)

Note the `7PoDRgCzHFTs2vWB` here; it is different for each site.

Then we request `https://cloud.umami.is/analytics/us/api/share/7PoDRgCzHFTs2vWB`, receiving
*Note that the `us* here is the account region created for you; US is us, EU is eu`

```json
{
  "websiteId": "a66a5fd4-98b0-4108-8606-cb7094f380ac",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3ZWJzaXRlSWQiOiJhNjZhNWZkNC05OGIwLTQxMDgtODYwNi1jYjcwOTRmMzgwYWMiLCJpYXQiOjE3NTA4MDIwMzB9.X5GQT5kslh6r25sFlap4Asz1NDA7mN3kcZW8wqbrnBc"
}
```

Then, with our request, carry the request header `x-umami-share-token` with the value obtained in the previous step.

`https://cloud.umami.is/analytics/us/api/websites/a66a5fd4-98b0-4108-8606-cb7094f380ac/stats?startAt=0&endAt=1750805999999&unit=hour&timezone=Asia/Hong_Kong&path=eq./posts/cf-fastip/&compare=false`

Here, several key Params are explained; the rest are copied as is.

- startAt: The start time for statistics. Unix timestamp; we fill it as 0 to let Umami begin counting from 1970.

- endAt: The end time of the statistic. Unix timestamp; we can use `Date.now()`, i.e., the current time, in conjunction with the startAt parameter to achieve total page views.

- path: The path to query, fill in as the path of your article without the Host, such as `/posts/hello`. Note! Umami will treat `/posts/hello` and `/posts/hello/` as two different paths; please be aware whether your blog framework uses `/`. In version v3, you need to use the `eq.` prefix for exact matching, for example `path=eq./posts/hello/`

You will receive

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

`pageviews` refers to page views. `visitors` refers to number of visitors.

> Tips: Page views are counted once for any user who accesses the page. Access counts will not record multiple accesses from the same IP address or multiple requests for different pages within the same time period.

Enjoy it!

Final effect:

![](../../assets/images/ce822960-f7ef-444e-84d1-fa0758e2b5e8.webp)