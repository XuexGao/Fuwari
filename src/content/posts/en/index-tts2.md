---
title: "Hand-to-hand teaching you sound clones!"
description: "With just a few seconds of voice, you can clone audio tones – no complex configuration required! Start instantly and easily create blue-screen content for your videos anywhere."
published: 2025-10-13
image: ../../assets/images/index-tts2-4.webp
tags:
  - AI
  - 音色克隆
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Formal commencement.

Video tutorial: [https://www.bilibili.com/video/BV1qv41zgEjE/](https://www.bilibili.com/video/BV1qv41zgEjE/)

Please provide the full text you would like me to translate. I need the original text to fulfill your request.

Install Git LFS: `git lfs install`

Warehouse Cloning: [index-tts/index-tts: A Highly Customizable and Efficient Zero-Shot Text-to-Speech System for Industrial Applications](https://github.com/index-tts/index-tts)

Pull Git LFS files: `git lfs pull`

Install the UV package using Python's pip manager: `pip install -U uv`

Install dependencies: `uv sync --extra webui`

Install the hf-cli: `uv tool install "huggingface-hub[cli,hf_xet`"]]]

From the HF repository, download the Model Index Team/IndexTTS-2 model: `hf download IndexTeam/IndexTTS-2 --local-dir=checkpoints`.

Run the web UI: `uv run webui.py`

The browser is configured to open port `7860`.

# Simple usage.

WebUI页面长这样
![](../../assets/images/index-tts2-1.webp)

First, input audio with a reference tone (approximately 2-3 seconds).

然后输入要朗读的文本

Final click generation.

# Training

Recommend utilizing sentiment vector control techniques.

![](../../assets/images/index-tts2-2.webp)