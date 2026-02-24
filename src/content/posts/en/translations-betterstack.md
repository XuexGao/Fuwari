---
title: "BetterStack’s state page translation."
description: "I find myself with idle time and discover BetterStack’s status page, encountering both Chinese and English translations. I'm tired of it all and want to fully translate it into Mandarin."
published: 2025-08-28
image: '../../assets/images/2025-08-28-18-49-56-image.webp'
tags: [BetterStack]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article discusses BetterStack’s localization efforts, highlighting the challenges of translating dates and times in Chinese due to the platform's lack of consideration for local user preferences. It details specific translations issues – using “” and “” without suffixes, and directly writing “” – and explains how BetterStack uses a misleading time zone abbreviation (CST) and employs hardcoded solutions for these inconsistencies.
:::

# Rapid overview.

Please click on [](https://ss.2x.nz) or the status bar at the top to view the Chinese BetterStack status panel.

# The localization process.

The navigation bar for the Left Sidebar, which leads to Status Pages, will take you to your Status Panel domain and then to Translations.

![](../../assets/images/2025-08-28-18-52-03-image.webp)

# A few little tunes.

Because BetterStack has not considered Chinese users at all, the translations for `` and `` are absent with no suffixes. However, we can hardcode this information.

![](../../assets/images/2025-08-28-18-57-52-image.webp)

Here’s the translation:  “Regarding `Moon`, it is simply written that way.”

![](../../assets/images/2025-08-28-18-58-30-image.webp)

BetterStack’s approach utilizes UTC+8, but it incorrectly applies `UTC+8`. We can also leverage pre-defined time zones for a more robust solution.

![](../../assets/images/2025-08-28-18-56-39-image.webp)

![](../../assets/images/2025-08-28-18-58-45-image.webp)