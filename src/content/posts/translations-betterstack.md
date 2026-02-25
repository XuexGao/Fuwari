---
title: 我给BetterStack的状态页面汉化了
published: 2025-08-28T18:46:27
description: '闲来无事，打开BetterStack的状态页面发现一会中文一会英文，受不了了，全部汉化！'
image: '../assets/images/2025-08-28-18-49-56-image.webp'
tags: [BetterStack]

draft: false 
lang: ''
---
> [!ai] qwen/qwen3-vl-8b
> BetterStack状态面板支持中文汉化，可通过“Status pages”进入翻译界面；因平台未适配中文，需手动硬编码“日”“年”“月”及“UTC+8”时区显示，避免歧义。


# 速览

现在点击 [这里](https://ss.2x.nz) 或者顶部导航栏的 `状态` 即可查看中文的BetterStack的状态面板

# 汉化过程

在 [BetterStack](https://uptime.betterstack.com/) 左侧导航条的 `Status pages` 进入你的状态面板域名，然后进入 `Translations` 即可开始汉化

![](../assets/images/2025-08-28-18-52-03-image.webp)

# 一些小插曲

因为BetterStack完全没有顾及中国用户，所以对于 `日` 和 `年` 的翻译没有后缀，不过我们可以硬编码一下

![](../assets/images/2025-08-28-18-57-52-image.webp)

而对于 `月` 直接这样写

![](../assets/images/2025-08-28-18-58-30-image.webp)

BetterStack对于 `UTC+8` 会自作聪明使用 `CST` 。这是一个有歧义的时区缩写，我们同样可以使用硬编码来解决

![](../assets/images/2025-08-28-18-56-39-image.webp)

![](../assets/images/2025-08-28-18-58-45-image.webp)
