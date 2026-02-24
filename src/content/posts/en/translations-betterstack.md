---
title: "I have localized the BetterStack status page"
description: "[[X:content]]When I had nothing better to do, I opened the status page of BetterStack and found it switching between Chinese and English—it was unbearable! I’ve fully localized it!"
published: 2025-08-28
image: '../../assets/images/2025-08-28-18-49-56-image.webp'
tags: [BetterStack]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
You can access the Chinese version of BetterStack’s status page via [https://ss.2x.nz](https://ss.2x.nz) or through the “Status” link in the top navigation. To translate, navigate to your status page’s “Translations” section in BetterStack’s dashboard. Due to BetterStack’s lack of support for Chinese users, some terms like “day,” “year,” and “UTC+8” require hardcoded fixes to avoid ambiguity.
:::

# At a glance

Now click [here](https://ss.2x.nz) or the `Status` in the top navigation bar to view the Chinese BetterStack status panel.

# Localization process

Go to `Translations` in your status panel domain under the `Status pages` section in the left navigation bar of [BetterStack](https://uptime.betterstack.com/) to start translating.

![](../../assets/images/2025-08-28-18-52-03-image.webp)

# Some minor incidents

Because BetterStack completely disregards Chinese users, the translations for `` and `` lack suffixes, but we can hardcode them.

![](../../assets/images/2025-08-28-18-57-52-image.webp)

But for `moon`, write it directly like this

![](../../assets/images/2025-08-28-18-58-30-image.webp)

BetterStack will naively use `CST` for `UTC+8`. This is an ambiguous timezone abbreviation, and we can also resolve it with hardcoding.

![](../../assets/images/2025-08-28-18-56-39-image.webp)

![](../../assets/images/2025-08-28-18-58-45-image.webp)