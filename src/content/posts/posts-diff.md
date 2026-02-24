---
title: 如何给你的文章上修订记录？就像维基百科那样！
published: 2026-02-11
description: 尽管我们已经做了基于客户端的文章更新系统，但如果用户还没来及查看更改就又有新的更改了呢？我们能不能做全生命周期的文章diff？
image: ../assets/images/posts-diff.png
draft: false
lang: ""
---
:::ai-summary{model="google/gemma-3-1b"}
好的，以下是这篇文章的简短总结：

这段文字描述了如何利用Git版本控制历史来自动生成文章更改索引文件，并在构建过程中嵌入到CI流程中，以确保开发者能够及时看到文章更新情况。主要步骤包括：1. Clone GitHub仓库，并使用 `pnpm update-diff` 命令生成索引；2.  在clone仓库后，使用 `corepack enable` 和 `pnpm update-diff` 命令进行更新和构建；3.  将生成的索引文件复制回 Cloudflare Worker 克隆的仓库，并清除本地仓库。 最终，通过自动化的CI流程，开发者可以轻松地集成文章更改索引信息，从而实现更高效的开发体验。
:::

# 正式开始

在之前，我们给博客添加了一个文章更新提醒功能，也就是博客右下角的小铃铛图标，它可以通过比较上次与这次访问文章是否有更新给你一个醒目的提示，并直观地告诉你都更新了哪些文章和更新什么内容

![](../assets/images/posts-diff-1.png)

但我们还想更进一步，能不能让读者，也就是你能看到我们每次更新文章的明细呢

当然可以！由于我们使用Git做版本控制，Git可以天然的读取到每一篇文章的修订情况

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

那么我们就可以让网站在构建出来时插入一个中间件，读取Git的提交历史，并生成一个文章更改索引文件，之后再插入到最终网站中即可

那么理论成立，实践开始！

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

ok，成功生成了索引，让我们看看实际的内容

![](../assets/images/posts-diff-2.png)

很好，接下来让我们尝试在开发环境中测试

![](../assets/images/posts-diff-3.png)

ok！也没什么问题，接下来我们开始做自动化

由于我们使用Cloudflare Worker连接Github仓库进行CI，我们需要在构建环节注入这个生成文章diff的逻辑

一开始我是直接想将构建命令从 `pnpm build` 改为 `pnpm update-diff && pnpm build` 

但是转念一想，Cloudflare Worker克隆仓库时并不会带历史，也就自然无法得到完整的文章diff

那么我们是否能曲线救国呢？大抵是可以的，于是我让ChatGPT写了一个难绷的构建命令

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

仔细分析一下其实逻辑非常简单

由于Cloudflare Worker默认克隆的仓库不带提交历史，那么我们就再重新克隆一个完整的带提交历史的仓库，再生成文章diff索引，将这个索引文件复制回CF自动克隆的仓库，之后再清除我们自己克隆的仓库，最后运行原构建命令

虽然看着很难绷，网页控制台被塞入了一大段神秘命令

![](../assets/images/posts-diff-4.png)

但是它的确可以很好的工作，这就够了

![](../assets/images/posts-diff-5.png)

最终，我们只需要专注于写文章与推送到Github，Cloudflare会帮我们自动生成最新的文章diff，并展示在生产环境！

![](../assets/images/posts-diff-6.png)