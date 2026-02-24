---
title: "Are You Me?"
description: "Once the blog is open source, there will be many inexperienced people who fork it and make incomplete changes, causing comments to come to me and also bringing traffic statistics to me 😅"
category: "Record"
published: 2025-08-12
image: '../../assets/images/2025-08-12-15-44-06-image.webp'
tags: [CORS]
draft: false 
lang: en

---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The author highlights security and ownership issues with open-source tools like Giscus and Umami, noting that forks without proper configuration can still access or misreport data from the original repo. Giscus can be restricted to only allow comments from the original owner via `origins`, while Umami can be protected with CORS rules to prevent unauthorized tracking. The author urges users to fully customize and own their implementations before deploying, emphasizing that open-source is for learning, not copying.
:::

# Previous Summary

Received a small email today.

![](../../assets/images/2025-08-12-15-45-18-image.webp)

I could tell at a glance.

Someone forked my repository but didn't change the Giscus comment section to their own.

# Giscus allows only itself

Place a file in the repository with Giscus enabled.

```json
<!-- giscus.json -->
{
  "origins": ["https://2x.nz"]
}
```

After this setting, even if someone embeds **your comment section** on its website, it will be rejected from displaying.

![](../../assets/images/2025-08-12-15-48-23-image.webp)

# Umami allows only itself [[X:content]]

My blog has a visit statistics based on Umami, which previously had no authentication. If you don't make any changes, visiting your site will also be recorded on my site 😅

Umami does not provide configuration options to modify CORS (after all, this access statistics was reverse-engineered by me)

But my Umami is using EO, so I can directly write a set of CORS rules to allow only myself to call it.

![](../../assets/images/2025-08-12-15-50-25-image.webp)

In this case, even if you don't make any changes, it won't send incorrect statistical information to me; instead, it will return a CORS header error.

![](../../assets/images/2025-08-12-15-51-04-image.webp)

# Finally

Open source is intended to help everyone learn from my blog framework, not for you to copy-paste. Please ensure you replace all content, API endpoints, and private services with your own before going live!

If you're lazy, you can Fork [upstream original repository](https://github.com/saicaca/fuwari) and start from scratch [modify](/posts/fuwari/)