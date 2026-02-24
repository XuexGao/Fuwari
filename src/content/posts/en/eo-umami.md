---
title: "Umami deployed directly to EdgeOne Pages? Toss out VPS! Run in cloud functions!"
description: "We understand that EdgeOne Pages offers a comprehensive Node.js environment, and Umami is also built on Node.js. Therefore, could we perhaps…"
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

EdgeOne Page supports SSR (Server-Side Rendering) programs, but Umami’s built-in function is too large. Therefore, our approach is straightforward – simply pruning the code will suffice.

The project has emerged due to the need for an umami analytics platform. It’s an open-source alternative to Google Analytics, Mixpanel, and Amplitude.

The irrelevant elements within Umami v3, such as `pixel statistics`, `link statistics`, `team`, and `geographic location files` have been removed. This will allow for deployment of a corrupted version of Umami on the EO.

至于数据库，我用的是 https://supabase.com/ 需要注意，连接方式不能用 `Direct Connection`
![](../../assets/images/eo-umami-2.webp)

Umami

Video: https://www.bilibili.com/video/BV1JiqSBaEY1/

唯一的缺陷，无法获取用户地区（原逻辑有个高达60M的本地Geo文件）
![](../../assets/images/eo-umami.webp)

# Successfully deploying.

1. Fork this repository [[afoim/umami: Umami is a modern, privacy-focused analytics platform. An open-source alternative to Google Analytics, Mixpanel and Amplitude.](https://github.com/afoim/umami)(https://github.com/afoim/umami-edgeonepages/tree/main)
2. Connect to EdgeOne Pages, but don’t click on deployment.
3. Enter the database URL from Supabase in the PostgreSQL connection string, similar to `postgresql://postgres.kupggtyqiaepzvjqbboy:[YOUR-PASSWORD`@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres]].
4. Bind your domain, access and log in. Username: admin | Password: umami
# The difficulty of solving these problems is a significant challenge for many students. A thorough understanding of the underlying concepts and effective problem-solving strategies are crucial for success. Students often struggle with applying theoretical knowledge to practical scenarios, requiring them to develop critical thinking skills and the ability to analyze complex situations. Furthermore, time management and attention to detail are essential when tackling challenging problems. Effective revision and practice are vital for reinforcing learned material and improving performance.
Internal redirection issues have appeared. If you wish to access your administrator password settings, please manually navigate to `/settings/preferences`. They have resolved the issue, but…

The request for all GET requests has been implemented in the main branch. We have migrated all POST requests to GET requests to ensure usability for standard users.

The master branch currently provides Tencent as a testing ground, potentially revealing sensitive information. Please do not use it.