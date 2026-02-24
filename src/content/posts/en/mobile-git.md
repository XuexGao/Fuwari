---
title: "How to Write Blog Posts Gracefully on Android Phones"
description: "Using VS Code with Obsidian on desktop is a great way to write articles.  Similarly, you can leverage the same tools on your mobile device."
category: "Writing"
draft: false
image: ../../assets/images/Screenshot_2025-11-11-14-04-23-56_a2e3670364a4153bdb03dad30c8d4108.webp
lang: en
published: 2025-11-11
tags:
  - Git
  - 博客
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article guides users on how to create a blog using Git and Obsidian, leveraging PuppyGit and Markdown editors for mobile access. It details the steps of cloning a repository, setting up a GitHub token, integrating these tools with Obsidian, and utilizing a workflow for creating new articles on the go.
:::

# Formal commencement.
To allow me to write my blog posts while I’m traveling, I have researched and found that it is entirely possible.

First, we need to select a Git client on a smartphone. I am currently using [https://github.com/catpuppyapp/PuppyGit].

安装之后，点击右上角的加号，点击克隆，即可克隆仓库
![](../../assets/images/Screenshot_2025-11-11-14-11-13-56_a2e3670364a4153bdb03dad30c8d4108.webp)

创建Github Token
![](../../assets/images/Screenshot_2025-11-24-07-55-54-35_df198e732186825c8df26e3c5a10d7cd1.webp)

将其添加到小狗Git
![](../../assets/images/Screenshot_2025-11-24-07-56-23-48_a2e3670364a4153bdb03dad30c8d41081.webp)

链接仓库![](../../assets/images/Screenshot_2025-11-24-07-56-33-62_a2e3670364a4153bdb03dad30c8d4108.webp)

当你修改好后，点击 **需要提交** 按钮，进入提交界面
![](../../assets/images/Screenshot_2025-11-11-14-11-59-16_a2e3670364a4153bdb03dad30c8d4108.webp)

进入后点击右上角三个点就可以做我们最常用的 **提交（commit），拉取（pull），推送（push）** 啦
![](../../assets/images/Screenshot_2025-11-11-14-13-03-99_a2e3670364a4153bdb03dad30c8d4108.webp)

好的，既然我们有了git客户端，那么既然要写文章，自然是需要一个好用的markdown编辑器，很巧的是，**obsidian** 也有移动端！
![](../../assets/images/Screenshot_2025-11-11-14-15-01-63_b5a5c5cb02ca09c784c5d88160e2ec24.webp)

打开后导入仓库（src/content）就可以啦，并且会自动同步桌面端的插件，无缝迁移！
![](../../assets/images/Screenshot_2025-11-11-14-15-59-46_51606159b24eff83e24a54116878fe3e.webp)

在桌面端，我们想要新建文章一般会用Fuwari特有的 `pnpm new-post xxx` 命令，不过在手机上我们可以曲线救国，选择一个文章，**创建副本** 后再更改元数据即可！
![](../../assets/images/Screenshot_2025-11-11-14-17-32-08_51606159b24eff83e24a54116878fe3e.webp)

Finally, this article was written on a mobile device.