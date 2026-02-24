---
title: "BetterStack’s state page translation."
description: "Here’s a professional translation of the text:  “Occasionally, I noticed the BetterStack status page and discovered that it offers both Chinese and English versions.  I've decided to fully translate it into Chinese to alleviate my boredom, and all content will be localized.”"
published: 2025-08-28
image: '../../assets/images/2025-08-28-18-49-56-image.webp'
tags: [BetterStack]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article discusses BetterStack’s localization efforts, highlighting a lack of proper timezone handling and the use of ambiguous terms like “日” and “年.” It details specific translations issues, including the use of “CST” instead of “UTC+8,” and offers solutions for these inconsistencies. The article provides links to resources for accessing the Chinese Status panel and translation management tools.
:::

# Quickly scan.

BetterStack status panel.

# Please provide the text you would like me to translate.

In the left-hand navigation bar of the BetterStack sidebar, navigate to the Status pages and then enter the Translations section to begin translation.

![](../../assets/images/2025-08-28-18-52-03-image.webp)

# Some little tunes

Because BetterStack has no consideration for Chinese users, the translation of `日` and `年` does not have a suffix. However, we can hardcode it.

![](../../assets/images/2025-08-28-18-57-52-image.webp)

The moon.

![](../../assets/images/2025-08-28-18-58-30-image.webp)

BetterStack utilizes UTC+8 to self-generate a time zone, which is equivalent to CST. We can also use hardcoded solutions to address this ambiguity.

![](../../assets/images/2025-08-28-18-56-39-image.webp)

![](../../assets/images/2025-08-28-18-58-45-image.webp)