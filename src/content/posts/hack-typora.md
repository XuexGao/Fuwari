---
title: Typora免付费激活
published: 2025-08-15
description: 'Typora是一个简洁易用（？）的MarkDown编辑器，不想交钱？改几行文件就破解！'
image: '../assets/images/2025-08-20-21-08-22-image.webp'
tags: [Typora]
category: '记录'
draft: false 
lang: ''
---
:::ai-summary{model="google/gemma-3-1b"}
Typora 已经激活，可以通过全局搜索修改 `e.hasActivated` 的值。该代码片段将“true”转换为“true”，从而激活 Typora 应用。
:::

进入 [Typora 官方中文站](https://typoraio.cn/)

下载并安装，假设你的安装路径为 `D:/App/Typora`

关闭所有Typora相关进程

用VSCode打开 `D:/App/Typora`

全局搜索，将

```bash
e.hasActivated="true"==e.hasActivated
```

改为

```bash
e.hasActivated="true"==“true”
```

打开 Typora，已激活

![](../assets/images/2025-08-20-21-08-22-image.webp)
