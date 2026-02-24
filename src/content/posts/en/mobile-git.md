---
title: "How to Write My Blog Elegantly on an Android Phone"
description: "On the desktop, we can use VSCode + Obsidian to write articles. What about on mobile?"
category: "Reflections"
draft: false
image: ../../assets/images/Screenshot_2025-11-11-14-04-23-56_a2e3670364a4153bdb03dad30c8d4108.webp
lang: en
published: 2025-11-11
tags:
  - Git
  - 博客
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The author sets up a mobile workflow for writing blog posts using PuppyGit for Git operations and Obsidian for Markdown editing, syncing with desktop via GitHub tokens and repository cloning. They create new posts by duplicating existing ones and editing metadata, bypassing desktop-specific commands. The article itself was written entirely on mobile, demonstrating the feasibility of this setup.
:::

# Formally begin
In order to allow me to write blog posts on my phone while I'm away, I researched and found that it is entirely possible.

First, we need to choose a Git client for our phone; here I am using https://github.com/catpuppyapp/PuppyGit

After installation, click the plus sign in the top right corner, then click Clone to clone the repository.
![](../../assets/images/Screenshot_2025-11-11-14-11-13-56_a2e3670364a4153bdb03dad30c8d4108.webp)

Create a GitHub Token
![](../../assets/images/Screenshot_2025-11-24-07-55-54-35_df198e732186825c8df26e3c5a10d7cd1.webp)

Add it to the puppy Git
![](../../assets/images/Screenshot_2025-11-24-07-56-23-48_a2e3670364a4153bdb03dad30c8d41081.webp)

链接仓库![](../../assets/images/Screenshot_2025-11-24-07-56-33-62_a2e3670364a4153bdb03dad30c8d4108.webp)

After you have made your modifications, click the **** button to enter the submission interface
![](../../assets/images/Screenshot_2025-11-11-14-11-59-16_a2e3670364a4153bdb03dad30c8d4108.webp)

After entering, click the three dots in the top right corner to perform our most commonly used **commit, pull, push**.
![](../../assets/images/Screenshot_2025-11-11-14-13-03-99_a2e3670364a4153bdb03dad30c8d4108.webp)

好的，既然我们有了git客户端，那么既然要写文章，自然是需要一个好用的markdown编辑器，很巧的是，**obsidian** 也有移动端！
![](../../assets/images/Screenshot_2025-11-11-14-15-01-63_b5a5c5cb02ca09c784c5d88160e2ec24.webp)

After opening, import the repository (src/content), and it will automatically sync with the desktop plugin, achieving seamless migration!
![](../../assets/images/Screenshot_2025-11-11-14-15-59-46_51606159b24eff83e24a54116878fe3e.webp)

On the desktop, we typically use Fuwari's special `pnpm new-post xxx` command to create new articles. However, on mobile devices, we can achieve a similar result by selecting an existing article, **Create a Copy**, and then modifying its metadata!
![](../../assets/images/Screenshot_2025-11-11-14-17-32-08_51606159b24eff83e24a54116878fe3e.webp)

Finally! This article was also written on a mobile phone!