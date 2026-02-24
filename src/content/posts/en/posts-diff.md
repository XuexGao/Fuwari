---
title: "How to revise your article’s history? Like Wikipedia!"
description: "Despite the implementation of client-based article updates, unforeseen changes may occur before users have had a chance to review them. Could we implement a full lifecycle diff for these articles?"
published: 2026-02-11
image: ../../assets/images/posts-diff.png
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Formal commencement.

Here’s the translation:  “Previously, we implemented a blog notification feature, which is represented by a small bell icon located in the bottom right corner of the blog. This provides a clear and immediate indication of recent updates to the blog, along with details about which articles have been modified or updated.”

![](../../assets/images/posts-diff-1.png)

We are also committed to further development and would appreciate it if you could provide a more detailed breakdown of each article update, so readers can see the progress.

Certainly! Here’s the translation:  “As we utilize Git for version control, it naturally retrieves commit history for each article.”

```sql
(TraeAI-5) C:\Users\af\Documents\GitHub\fuwari [1:128] $ git log src/content/posts/pin.md
commit f6e3e174da195c05ef0feecca16cf79496e3374b
Author: 二叉树树 <acofork@qq.com>
Date:   Mon Feb 9 07:50:52 2026 +0800

    压缩图片

commit 7deafa112126f32e71159d824b334ec63b93fa59
Author: 二叉树树 <acofork@qq.com>
Date:   Sun Jan 25 21:43:53 2026 +0800

    fix(NewPostNotification): 修复更新检测逻辑以包含标题和描述变更

    之前仅检测内容变更和发布日期更新，现在扩展检测逻辑以包含标题、描述等元数据的变更，确保任何修改都能正确触发更新通知。

commit 75be2cc6528b9e78e1c99dce8e54696a22c6146b
Author: 二叉树树 <acofork@qq.com>
Date:   Sun Jan 25 21:37:05 2026 +0800

    fix: 为RSS请求添加缓存禁用选项以获取最新内容

    在fetch请求中设置cache: 'no-store'，防止浏览器缓存导致无法及时获取最新的RSS内容，确保新文章通知能正确显示。

commit 702c1ca11398a44c839d8526f84e62cae4f8ee07
Author: 二叉树树 <acofork@qq.com>
Date:   Sun Jan 25 21:25:57 2026 +0800

    feat(widget): 增强新文章通知组件的交互和视觉效果

    - 为通知铃铛添加入场动画和退出逻辑，提升用户体验
    - 新增“清空通知”按钮，允许用户重置通知基准时间
    - 优化无更新和有时更新的状态显示，合并时间信息
    - 为通知点添加脉冲动画以增强视觉提示
    - 调整面板响应式布局，在小屏幕上优化底部间距

commit ddd201a7f44003c305a045b73f944ad281606dbf
Author: 二叉树树 <acofork@qq.com>
Date:   Sun Jan 25 21:02:10 2026 +0800

    style(Markdown): 为 Markdown 组件添加断词样式

    在 Markdown 容器 div 的类名中添加 `break-words` 实用类，确保长单词或 URL 在超出容器宽度时自动换行，避免破坏页面布局。

commit c507a478cd602102821915caeb5e7b81165383a2
Author: 二叉树树 <acofork@qq.com>
Date:   Sun Jan 25 20:28:34 2026 +0800

    fix(通知组件): 修复查看更新按钮点击失效问题并优化滚动条样式

    - 将 data-diff-toggle 事件委托改为直接 onclick 绑定，解决 Astro 组件重渲染时事件监听失效问题
    - 为更新列表添加 overflow-x: hidden 防止水平滚动
    - 在组件内定义自定义滚动条样式，统一各浏览器显示效果
    - 调整通知级别从 warning 改为 info 以匹配实际使用场景

commit d77c485f00c192de3bfd9f40ed75afe313d0cc1b
Author: 二叉树树 <acofork@qq.com>
Date:   Sat Jan 24 16:19:25 2026 +0800

    fix: 更新默认图片链接为本地路径

    将外部图片链接 https://t.alcy.cc/ycy 统一替换为本地路径 /random/h，
    包括置顶文章、记录文章和站点背景配置，确保图片资源的稳定性和一致性。

commit 29afb7adb5c91dfb0904cdccbc08b48ce73e7245
Author: 二叉树树 <acofork@qq.com>
Date:   Thu Jan 15 16:04:10 2026 +0800

    fix: 更新图片链接并移除无用脚本

    将多个页面的图片链接统一更新为新的CDN地址
    移除布局文件中不再需要的外部脚本
    更新背景图片配置为新的CDN地址
:
```

We can integrate a staging intermediate into the website’s construction process, retrieving Git commit history and generating an index file for the change tracking. Subsequently, this index file can be inserted into the final website.

The theory is validated, and action begins!

```sql
(TraeAI-5) C:\Users\af\Documents\GitHub\fuwari [0:141] $ pnpm update-diff

> fuwari@0.0.1 update-diff C:\Users\af\Documents\GitHub\fuwari
> node scripts/update-diff.js

Generating git history...
Using concurrency: 19
Processed 154/154 files...
Git history generated for 154 files.
Output saved to src/json/git-history.json
```

Okay, the index has been generated successfully. Let’s examine the actual content.

![](../../assets/images/posts-diff-2.png)

Okay, let's proceed with testing in a development environment.

![](../../assets/images/posts-diff-3.png)

Okay, no problem. Let’s begin with automation.

Due to our use of Cloudflare Workers to connect to a GitHub repository for CI/CD, we require to integrate the generation diff logic into the build process.

Initially, I intended to transition the build commands from `pnpm build` to `pnpm update-diff && pnpm build`.

However, upon reflecting on it, Cloudflare Worker cloning repositories does not retain a history of previous changes, rendering it impossible to obtain a complete diff.

Could we consider a curve to rescue the situation? It’s certainly possible, and I’ve tasked ChatGPT with creating a challenging prompt structure for this purpose.

```sql
git clone https://github.com/afoim/fuwari temp \
&& cd temp \
&& corepack enable \
&& pnpm update-diff \
&& cd .. \
&& mkdir -p src/json \
&& mv -f temp/src/json/git-history.json src/json/git-history.json \
&& rm -rf temp \
&& pnpm build

```

Carefully analyze the logic is surprisingly straightforward.

Due to Cloudflare Worker defaulting to a repository without commit history, we will recreate a complete repository with commit history and generate an index for diff generation. We will then copy this index file back into the original CF clone repository, subsequently clearing our own cloned repository, and finally executing the original build command.

Despite the difficulty in maintaining composure, the web interface has been populated with a substantial number of cryptic commands.

![](../../assets/images/posts-diff-4.png)

Here’s the translation:  “It is indeed a very effective system, fulfilling its purpose adequately.”

![](../../assets/images/posts-diff-5.png)

Ultimately, we will focus on writing articles and deploying them to GitHub, with Cloudflare providing automated diff generation and showcasing the latest versions in a production environment.

![](../../assets/images/posts-diff-6.png)