---
title: 手把手教你克隆音色！
published: 2025-10-13
description: 仅需几秒的语音就能克隆音色，无需繁琐配置，一键启动！随时随地做蓝底神人小视频！
image: ../assets/images/index-tts2-4.webp
tags:
  - AI
  - 音色克隆
draft: false
lang: ""
---
:::ai-summary{model="google/gemma-3-1b"}
本文介绍了安装和使用“IndexTTS-2”工具，主要步骤包括：Git Lfs 安装、克隆仓库、拉取文件、安装UV包管理器、安装hf-cli、下载模型并运行WebUI。 此外，还强调了情感向量控制的用法，建议使用该方法进行更精准的文本朗读效果。
:::

# 正式开始

> 视频教程： https://www.bilibili.com/video/BV1qv41zgEjE/

> 请全程魔法

安装Git Lfs： `git lfs install`

克隆仓库： [index-tts/index-tts: An Industrial-Level Controllable and Efficient Zero-Shot Text-To-Speech System](https://github.com/index-tts/index-tts)

拉取Git Lfs文件： `git lfs pull`

安装UV（Python包管理器，类似pip）： `pip install -U uv`

安装依赖： `uv sync --extra webui`

安装hf-cli： `uv tool install "huggingface-hub[cli,hf_xet]"`

从hf下载模型： `hf download IndexTeam/IndexTTS-2 --local-dir=checkpoints`

运行web UI： `uv run webui.py`

浏览器打开 `7860` 端口

# 简单使用

WebUI页面长这样
![](../assets/images/index-tts2-1.webp)

首先将音色参考音频输入（几秒即可）

然后输入要朗读的文本

最终点击生成

# 调教

推荐使用 **使用情感向量控制** 

![](../assets/images/index-tts2-2.webp)