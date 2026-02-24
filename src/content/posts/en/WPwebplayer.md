---
title: "[Open Source] WPwebplayer — A Simple and Universal Web Player"
description: "A simple, clean, lightweight, and universal open-source website music player"
category: "Record"
published: 2025-08-09
image: '../../assets/images/屏幕截图2025-08-09213908.webp'
tags: [Web]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
WPWebPlayer 、 HTML ， CSS  JS  `<wp-music-player>` 。、、，，。， CDN ， HTML 。
:::

> This article was not written by the site administrator but was added by another contributor: https://github.com/afoim/fuwari/pull/23

# WPWebPlayer (HTML website playback component)
A simple, clean, lightweight website music player  [Experience Interface](https://wpwebplayer.112601.xyz/)
![示例](https://imgbed.112601.xyz/file/1752422083916.webp)  
[Project Article (Blog)](https://www.yunsen2025.top/023-wpmusicplayer) | [Experience Interface](https://wpwebplayer.112601.xyz/) | [NPM Package (Frontend Resource)](https://www.jsdelivr.com/package/npm/wpwebplayer?tab=files)
---
# Project Features:
- Simple: Just include the CSS and JS files, and uniformly use the `<wp-music-player>` tag.
- Simple: No more redundant features, returning to the most fundamental [[website music playback]].
- High controllability: supports multiple customizable parameters, and the playback function UI color can be customized.
- Easy to integrate: can be used in any HTML project.
---
# Usage method:
1. Introduce CSS and JS files in the `<head>` tag
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/wpwebplayer@1.1.5/min-css.css">     
<script src="https://cdn.jsdelivr.net/npm/wpwebplayer@1.1.5/min-js.js"></script>
```
2. Use the `<wp-music-player>` tag in `<body>`
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
(For code examples, please visit [example.html](https://github.com/yunsen2025/WPwebplayer/blob/main/example.html))
---
# Parameter Description
| Attribute         | Type              | Default value       | Description                |
| ---------- | --------------- | --------- | ----------------- |
| `src`      | `string`        | None         | Audio file URL (required)        |
| Title    | `string`        | None         | Song Title              |
| Artist   | `string`        | None         | Author                |
| Cover    | `string`        | None         | Cover Image URL |
| `autoplay` | `true / false`  | `false`   | Auto-play  |
| `loop`     | `true / false`  | `true`    | Play repeatedly            |
| `volume`   | `number` (0~1) | `1.0`     | Initial volume (0~1)        |
| `fixed`    | `true / false`  | `true`    | Is the style fixed?         |
| `mini`     | `true / false`  | `true`    | Is Mini Mode          |
| `theme`    | Color value    | `#00c3ff` | Theme Color           |

## Instructions
- src&cover: Both require uploading images to an image hosting service and referencing them.
- autoplay: parameter is invalid. Browser security policy prohibits automatic audio playback without user permission [Chrome's autoplay policy](https://developer.chrome.com/blog/autoplay?hl=zh-cn) (audio playback requires manual user interaction)
- volume: a small decimal value from 0 to 1, representing volume levels from 0% to 100%.
- fixed: Keeps the player fixed at the bottom of the page, so its actual position is not affected by relative position changes caused by page scrolling (default is true)
- mini: Switch between "Mini Mode" and "Full Mode". Full Mode supports more features (some bugs remain unpatched).
- Theme: Theme Color, default is #00c3ff

# Special thanks to
[@MarSeventh](https://github.com/MarSeventh) ```叁月柒```大佬，在开发过程中提供宝贵帮助，解决数个关键bug