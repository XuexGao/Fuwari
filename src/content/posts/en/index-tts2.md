---
title: "Step-by-step Guide to Clone Vocal Tones!"
description: "Just a few seconds of voice can clone your tone, no complicated setup required—start with one click! Create blue-background celebrity-style short videos anytime, anywhere!"
published: 2025-10-13
image: ../../assets/images/index-tts2-4.webp
tags:
  - AI
  - 音色克隆
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide walks you through installing and running IndexTTS, an industrial-grade text-to-speech system, using Git LFS, UV, and Hugging Face tools. After cloning the repo and downloading the model, launch the web UI on port 7860 to input text and reference audio for speech generation. For advanced control, use emotion vectors to fine-tune the output tone.
:::

# Formally begin

> Video tutorial: https://www.bilibili.com/video/BV1qv41zgEjE/

> Please cast magic throughout the entire process.

Install Git LFS: `git lfs install`

Clone repository: [index-tts/index-tts: An Industrial-Level Controllable and Efficient Zero-Shot Text-To-Speech System](https://github.com/index-tts/index-tts)

Pull Git LFS files: `git lfs pull`

Install UV (a Python package manager, similar to pip): `pip install -U uv`

Install dependencies: `uv sync --extra webui`

Install hf-cli: `uv tool install "huggingface-hub[cli,hf_xet`"]]

Download the model from hf: `hf download IndexTeam/IndexTTS-2 --local-dir=checkpoints`

Run the web UI: `uv run webui.py`

Browser opens port `7860`

# Simple to use

The WebUI page looks like this
![](../../assets/images/index-tts2-1.webp)

First, input the reference audio for tone (a few seconds is sufficient).

Then enter the text to be read aloud

Final click to generate

# Training

It is recommended to use **Use emotional vector control**

![](../../assets/images/index-tts2-2.webp)