---
title: "Umami deployed directly to EdgeOne Pages? Toss out VPS! Run in cloud functions!"
description: "We understand that EdgeOne Pages offers a comprehensive Node.js environment, and Umami is also built on Node.js. Therefore, isn’t it possible…"
published: 2026-01-19
image: ../../assets/images/eo-umami-1.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# 原理探寻
由于 **Umami** 使用的是 **SSR** ，我原以为EdgeOne Pages不支持该模式，尝试部署后发现最大的问题在于
```
Error: SSR functions package size exceeds 128MiB limit (157MiB)
```

EdgeOne Page supports SSR (Server-Side Rendering) programs, but the Umami functionality built within it is too large. Therefore, our approach is straightforward – simply pruning the code will suffice.

The project has rapidly developed [afoim/umami: Umami is a modern, privacy-focused analytics platform. It offers an open-source alternative to Google Analytics, Mixpanel, and Amplitude.](https://github.com/afoim/umami)"

I have removed irrelevant elements from Umami v3, including pixel counts, link statistics, team information, and geographical location files. This will allow for deployment of a corrupted version of the game on the EO platform.

至于数据库，我用的是 https://supabase.com/ 需要注意，连接方式不能用 `Direct Connection`
![](../../assets/images/eo-umami-2.webp)

Demo: Umami

Video: [https://www.bilibili.com/video/BV1JiqSBaEY1/](https://www.bilibili.com/video/BV1JiqSBaEY1/)

唯一的缺陷，无法获取用户地区（原逻辑有个高达60M的本地Geo文件）
![](../../assets/images/eo-umami.webp)

# Seamless deployment.

1. Here’s the translation:  “This repository provides an analytics solution focused on privacy and modern technology. It is an open-source alternative to Google Analytics, Mixpanel, and Amplitude.”
2. Connect to EdgeOne Pages, but do not initiate deployment first.
3. Replace the database URL in the environment variable `DATABASE_URL` with the following connection string from Supabase:  `postgresql://postgres.kupggtyqiaepzvjqbboy:[YOUR-PASSWORD`@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres]]
4. Please log in to your domain by binding your domain name. Username: admin | Password: umami.
# Difficult questions.
Internal redirection issues have been reported, and access to the settings change your administrator password requires manual navigation to `/settings/preferences`. They have resolved the issue, however…

However, we’ve encountered a new issue: all POST requests are being consumed. Currently, the code has temporarily switched all POST requests to GET requests. We have deployed a version of the full GET request functionality in the **Main** branch, ensuring that standard users can continue to utilize it.

The master branch currently serves as a testing ground for Tencent, potentially exposing sensitive information. Please do not use it.