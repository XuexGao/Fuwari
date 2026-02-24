---
title: "Typora Free Activation"
description: "Typora is a simple and easy-to-use (？) Markdown editor. Don't want to pay? Just modify a few lines in the file to crack it!"
category: "Record"
published: 2025-08-15
image: '../../assets/images/2025-08-20-21-08-22-image.webp'
tags: [Typora]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide explains how to bypass Typora’s activation check by modifying its source code in VSCode. After replacing a specific string in the codebase, Typora will appear activated upon reopening. The method involves downloading, installing, and editing the app’s files directly.
:::

Enter [Typora official Chinese site](https://typoraio.cn/)

Download and install, assuming your installation path is `D:/App/Typora`

Close all Typora-related processes

Open `D:/App/Typora` with VSCode

Global search, enter

```bash
e.hasActivated="true"==e.hasActivated
```

changed to

```bash
e.hasActivated="true"==“true”
```

Open Typora, already activated

![](../../assets/images/2025-08-20-21-08-22-image.webp)