---
title: "Meme Generator Deployment Guide and Integration with Koishi"
description: "I've been curious for a long time whether those emojis made using friends' avatars are actually manually edited, but it turns out they aren't!"
category: "Tutorial"
published: 2025-06-30
image: ../../assets/images/ee29b679-3355-453e-917b-2b85ae9106a0.webp
tags: [meme, Koishi, QQBot]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}

:::

# Formally begin

Video tutorial: https://www.bilibili.com/video/BV1i53PzUEzE/

## Backend Deployment

> Github: https://github.com/MemeCrafters/meme-generator

Install dependencies

```bash
pip install -U "meme_generator<0.2.0"
```

Clone repository

```bash
git clone https://github.com/MemeCrafters/meme-generator
```

Clone additional emoji repositories

```bash
git clone https://github.com/MemeCrafters/meme-generator-contrib
git clone https://github.com/anyliew/meme_emoji
```

Go to `~/.config/meme_generator/config.toml` and fill in the configuration file. Also, fill in the additional emoji repository you just cloned: `meme_dirs`

```toml
[meme]
load_builtin_memes = true  # 是否加载内置表情包
meme_dirs = ["/root/meme-api/meme-generator-contrib/memes", "/root/meme-api/meme_emoji/emoji"]  # 加载其他位置的表情包，填写文件夹路径
meme_disabled_list = []  # 禁用的表情包列表，填写表情的 `key`

[resource]
# 下载内置表情包图片时的资源链接，下载时选择最快的站点
resource_urls = [
  "https://raw.githubusercontent.com/MemeCrafters/meme-generator/",
  "https://mirror.ghproxy.com/https://raw.githubusercontent.com/MemeCrafters/meme-generator/",
  "https://cdn.jsdelivr.net/gh/MemeCrafters/meme-generator@",
  "https://fastly.jsdelivr.net/gh/MemeCrafters/meme-generator@",
  "https://raw.gitmirror.com/MemeCrafters/meme-generator/",
]

[gif]
gif_max_size = 10.0  # 限制生成的 gif 文件大小，单位为 Mb
gif_max_frames = 100  # 限制生成的 gif 文件帧数

[translate]
baidu_trans_appid = ""  # 百度翻译api相关，表情包 `dianzhongdian` 需要使用
baidu_trans_apikey = ""  # 可在 百度翻译开放平台 (http://api.fanyi.baidu.com) 申请

[server]
host = "127.0.0.1"  # web server 监听地址
port = 2233  # web server 端口

[log]
log_level = "INFO"  # 日志等级
```

Running

```bash
python -m meme_generator.app
```

Seeing the following log indicates successful execution.

```bash
root@AcoFork-NAS:~/meme-api/meme-generator# python3 -m meme_generator.app
Fontconfig warning: "/usr/share/fontconfig/conf.avail/05-reset-dirs-sample.conf", line 6: unknown element "reset-dirs"
06-30 05:32:45 [INFO] meme_generator.log | Config file path: /root/.config/meme_generator/config.toml
06-30 05:32:48 [INFO] logging | Started server process [3363901]
06-30 05:32:48 [INFO] logging | Waiting for application startup.
06-30 05:32:48 [INFO] logging | Application startup complete.
06-30 05:32:48 [INFO] logging | Uvicorn running on http://127.0.0.1:2233 (Press CTRL+C to quit)
```

## Front-end integration

Install version 1.0.3 of this plugin from the Koishi plugin market.

![](../../assets/images/47f3db05-48bf-4382-817b-7a2b733dcd72.webp)

![](../../assets/images/3ffb0585-eb36-46fe-b32a-0162514e6e63.webp)

Enable the plugin. You can see `Plugin initialized, loading 455 emojis.`

![](../../assets/images/50da2a0d-7e49-491a-bad3-d9fde22a9df6.webp)

## Use

Send `emoji list` to the bot

![](../../assets/images/ed053d82-535e-47af-ac17-b27025d25dab.webp)

Generate emoji

![](../../assets/images/572c88c4-301b-4048-81bf-fcbb70d4064e.webp)