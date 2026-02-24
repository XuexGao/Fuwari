---
title: "Modern! Easy to Use! Efficient! And Community-Supported Super High School-Level Markdown Editor!"
description: "I used to write articles with MarkText, but today, after receiving a recommendation from a friend, I tried Obsidian and found it really useful, with a well-developed community!"
published: 2025-09-17
image: ../../assets/images/obsidian.webp
tags:
  - Obsidian
  - Markdown
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide explains how to set up and use Obsidian () for managing Markdown-based content, particularly for a project named Fuwari. It covers installing the app, configuring repositories, handling image links with proper paths and renaming via plugins like "Pasts image rename," and leveraging built-in features such as auto-fill for fields like `published`, `tags`, and boolean values. The tutorial emphasizes best practices to avoid common pitfalls, such as image path issues and configuration loss.
:::

> Video link: https://www.bilibili.com/video/BV1C7pDzpEHY
# Download
Go to [Download - Obsidian](https://obsidian.md/download) to download the software corresponding to your system version. During the installation interface, you can select the language as ****.
# First-time use
Obsidian (hereinafter referred to as "Blackstone") calls each folder containing multiple Markdown files a **Repository**

First, click on **Obsidian Vault** in the bottom left corner
![](../../assets/images/obsidian-1.webp)
Then click **Manage Repository**, and then select according to your needs.
![](../../assets/images/obsidian-2.webp)
Obsidian will create `.obsidian` under each repository, storing the workspace configuration information.
**Note:** Blackstone configurations are designed for individual repositories. If the configuration file is lost, you will need to reconfigure Blackstone. Therefore, please ensure you do not frequently change repositories while writing articles.
# Regarding the image configuration for Fuwari
First, we need to be aware of several pitfalls.
1. By default, Obsidian links to images as **internal links**, and the path configuration for these links is implemented in the private configuration file, visible only within Obsidian.
2. Obsidian defaults to **links with spaces** for images; some frameworks do not support escaping spaces, causing images to be unavailable.
First, ensure that `src/content` is set as the repository root directory, since `src/content/posts` stores blog articles and `src/content/spec` stores special Markdown pages; both may require images, so it is recommended to set the repository at the parent folder of these directories. Our images will be stored in `src/content/assets/images`, and relative path references from `posts` or `spec` will be formatted as `../../assets/images/xxx.webp` (don’t worry, Obsidian will automatically manage this—you don’t need to manually input it).
Click **Settings**
![](../../assets/images/obsidian-3.webp)
As shown in the configuration, this resolves the first issue.
![](../../assets/images/obsidian-4.webp)
Regarding the second question, Obsidian itself does not support controlling image names through variables; we need to rely on third-party plugins to achieve this.
First, we need to turn off **Safe Mode**
In sequence `Setup - Third-party Plugins - Security Mode (Off)`
Then, sequentially `Settings - Third-party Plugins - Community Plugin Market (Browse)`
Install `Pasts image rename` and **enable**
Go back to **Settings**, and at the very bottom, there will be a specific configuration item for configuring third-party plugins.
The first `Image name pattern` does not need to be changed; if you wish to modify it, make sure you know what you're doing, as this configuration description is already very detailed.
The second `Auto rename`, enable it if you don't want a dialog box to prompt you to enter the picture name every time you paste an image.
![](../../assets/images/obsidian-5.webp)
Next, try using any screenshot tool, such as **QQ Screenshot**, take a screenshot, then paste it into the article using **Ctrl+V**. You should then see a similar image link.
```bash
![](../../assets/images/obsidian.webp)
```
# How powerful is obsidian?
`published` field can be achieved through dots
![](../../assets/images/obsidian-6.webp)
Generic fields can be directly filled with content previously written.
![](../../assets/images/obsidian-7.webp)
`tags` field requires you to focus only on tags, without needing to manually manage formatting.
![](../../assets/images/obsidian-8.webp)
Boolean fields are handled by checking `true` and `false`
![](../../assets/images/obsidian-9.webp)