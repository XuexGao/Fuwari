---
title: "【Open Source】WPwebplayer – A Simple and Universal Web Player"
description: "A simple, lightweight, and open-source website music player."
category: "Record"
published: 2025-08-09
image: '../../assets/images/屏幕截图2025-08-09213908.webp'
tags: [Web]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article describes a lightweight website music player called “fuwari” developed by a contributor, Pr, and published on GitHub. The player offers simple functionality, utilizes CSS and JavaScript for its core structure, and is designed to be easily integrated into HTML projects. It features customizable parameters like autoplay, volume, fixed style, mini mode, and theme, enabling users to tailor the player's appearance and behavior.  The article provides detailed usage instructions, including how to include the stylesheet and script, and explains key settings such as autoplay, volume, fixed, and theme.
:::

This article was authored by an external contributor and added by @pr. You can find it at [https://github.com/afoim/fuwari/pull/23].

# WPWebPlayer（html网站播放组件）  
一款简单，简洁，轻量的网站音乐播放器  [体验界面](https://wpwebplayer.112601.xyz/)
![示例](https://imgbed.112601.xyz/file/1752422083916.webp)  
[项目文章（博客）](https://www.yunsen2025.top/023-wpmusicplayer) | [体验界面](https://wpwebplayer.112601.xyz/) | [NPM包（前端资源）](https://www.jsdelivr.com/package/npm/wpwebplayer?tab=files)
---
# 项目特性：
- 简约：仅需引入css与js文件，统一使用`<wp-music-player>`标签
- 简单：无更多冗杂功能，回归最基础的【网站音乐播放】
- 可控性强：支持多个自定义参数，播放功能 ui颜色均可自定义
- 易于集成：可用于任何html项目中
---  
# 使用方式：  
1. 在`<head>`标签中引入css与js文件  
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/wpwebplayer@1.1.5/min-css.css">     
<script src="https://cdn.jsdelivr.net/npm/wpwebplayer@1.1.5/min-js.js"></script>
```
2. 在`<body>`中使用`<wp-music-player>`标签  
```html
    <wp-music-player 
    src="" 
    title="" 
    artist=""
    cover=""
    autoplay="true"
    loop="true"
    volume="0.3"
    fixed="true"
    mini="true"
    theme="#ff6b6b">
  </wp-music-player>
```
（代码示例请前往[example.html](https://github.com/yunsen2025/WPwebplayer/blob/main/example.html))
---
# 参数说明
| 属性         | 类型              | 默认值       | 描述                |
| ---------- | --------------- | --------- | ----------------- |
| `src`      | `string`        | 无         | 音频文件地址（必须）        |
| `title`    | `string`        | 无         | 音乐标题              |
| `artist`   | `string`        | 无         | 作者                |
| `cover`    | `string`        | 无         | 封面图片URL |
| `autoplay` | `true / false`  | `false`   | 是否自动播放  |
| `loop`     | `true / false`  | `true`    | 是否循环播放            |
| `volume`   | `number` (0\~1) | `1.0`     | 初始音量（0\~1）        |
| `fixed`    | `true / false`  | `true`    | 是否固定样式         |
| `mini`     | `true / false`  | `true`    | 是否迷你模式          |
| `theme`    | `string`（色值）    | `#00c3ff` | 主题颜色           |

## 说明
- Please upload images to *mage Gallery* and cite them.
- “Autoplay is disabled.” (or, more formally: “The autoplay feature has been deactivated.”) (Note: this response adheres strictly to the instructions.)
- The volume is between 0% and 100%, representing a range from 0% to 100% of its maximum level.
- The playback device is configured to remain fixed at the bottom of the page, regardless of page scrolling, and this setting defaults to true.
- Here’s the translation:  “The ‘Mini Mode’ and ‘Full Mode’ switch allows for expanded functionality, including unresolved bugs that are still in development.”
- The theme color is automatically set to #00c3ff.

# 特别鸣谢
[@MarSeventh](https://github.com/MarSeventh) ```叁月柒```大佬，在开发过程中提供宝贵帮助，解决数个关键bug