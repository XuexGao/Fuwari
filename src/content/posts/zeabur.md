---
title: 想玩k3s？Zeabur来帮你！
published: 2025-09-03
description: 'Zeabur是一个PaaS服务，它可以让你将自己的服务器托管上去，然后在网页上进行管理，就像传统服务器面板一样，这些都是免费！'
image: '../assets/images/2025-09-03-06-49-30-image.webp'
tags: [k3s, Zeabur]

draft: false 
lang: ''
---
:::ai-summary{model="google/gemma-3-1b"}
Zeabur提供了一种无需手动SSH连接的 VPS 部署方案，可以直接在 Zeabur 的网页上配置服务。该方案允许您轻松部署各种应用和服务，并无需额外成本。
:::

# 这是个啥？

它可以连接你的VPS（前提，CPU≥1c，RAM≥2G）。然后在你的机子上面跑服务，包括

![](../assets/images/2025-09-03-06-54-43-5b8f9673e031a723ab2fb8a262d384d2.webp)

# 正式开始

进入 [My Servers - Zeabur](https://zeabur.com/servers)

点击创建

![](../assets/images/2025-09-03-06-55-36-image.webp)

点击添加自己的服务器

![](../assets/images/2025-09-03-06-55-47-image.webp)

阅读要求，继续

![](../assets/images/2025-09-03-06-56-01-image.webp)

填写SSH连接信息，让Zeabur连接到你的服务器

![](../assets/images/2025-09-03-06-56-30-image.webp)

之后会开始安装k3s等工具，我们将不再需要手动SSH登入服务器了，直接在Zeabur的网页上配置即可！

![](../assets/images/2025-09-03-06-57-08-image.webp)

接下来我们可以尝试部署服务，Zeabur将服务部署到你自托管的服务器是不收费的

![](../assets/images/2025-09-03-06-57-41-image.webp)

![](../assets/images/2025-09-03-06-57-52-image.webp)

请自由发挥！

![](../assets/images/2025-09-03-06-54-43-5b8f9673e031a723ab2fb8a262d384d2.webp)
