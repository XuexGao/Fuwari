---
title: "WTF?! Deploy Umami directly to EdgeOne Pages? Dump the VPS! Run it directly on cloud functions!"
description: "We all know that EdgeOne Pages provides a complete Node.js environment. Since Umami is built on Next.js, which also relies on Node.js, could we..."
published: 2026-01-19
image: ../../assets/images/eo-umami-1.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
EdgeOne Pages  SSR， Umami （157MiB > 128MiB），（、）， EdgeOne  Supabase 。， POST ， GET ；master ，。
:::

# Principle Exploration
Since **Umami** uses **SSR**, I originally thought EdgeOne Pages did not support this mode. After attempting deployment, I found the biggest issue to be
```
Error: SSR functions package size exceeds 128MiB limit (157MiB)
```

That is to say, EdgeOne Page supports SSR programs; however, the Umami-built function is too large. Therefore, our approach is clear: we just need to trim some code.

So the project was born [afoim/umami: Umami is a modern, privacy-focused analytics platform. An open-source alternative to Google Analytics, Mixpanel and Amplitude.](https://github.com/afoim/umami)

I removed irrelevant things from Umami v3, such as `` `` `` ``, so that a minimally functional version of Umami can finally be deployed on EO

As for the database, I am using https://supabase.com/. Note that the connection method cannot use `Direct Connection`.
![](../../assets/images/eo-umami-2.webp)

Demo: [Umami](https://eo-umami.acofork.com/share/rC995W8J6CT4uLDo)

Video: https://www.bilibili.com/video/BV1JiqSBaEY1/

The only drawback is that it cannot obtain the user's region (the original logic relied on a local Geo file as large as 60MB).
![](../../assets/images/eo-umami.webp)

# Getting Started with Deployment

1. Fork this repository [[afoim/umami: Umami is a modern, privacy-focused analytics platform. An open-source alternative to Google Analytics, Mixpanel and Amplitude.](https://github.com/afoim/umami)(https://github.com/afoim/umami-edgeonepages/tree/main)
2. Connect to EdgeOne Pages, but don't click Deploy yet.
3. Fill in the environment variable `DATABASE_URL` from Supabase, similar to `postgresql://postgres.kupggtyqiaepzvjqbboy:[YOUR-PASSWORD`@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres]]
4. Bind your domain, access and log in. Username: admin | Password: umami
# Troubleshooting
It seems the internal redirection has an issue; if you wish to access settings to change your administrator password, please manually navigate to `/settings/preferences`. They fixed this issue, but...

But there's a new issue: all POST requests are being blocked. Currently, the code has temporarily changed all POST requests to GET requests. We have released the fully GET-request version on the **Main** branch to ensure it remains usable for regular users.

**The master branch is currently provided to Tencent as a testing ground and exposes many sensitive pieces of information; do not use it**