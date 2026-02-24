---
title: "Hand-to-hand teaching you sound clones!"
description: "Here’s a professional English translation of the text:  “Create stunning audio clones in just seconds – no complex setup required! Launch instantly and easily for creating captivating blue-screen background videos wherever you are.”"
published: 2025-10-13
image: ../../assets/images/index-tts2-4.webp
tags:
  - AI
  - 音色克隆
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article provides a step-by-step guide to installing and using the Git Lfs, UV (Python package manager), and Hugging Face Hub CLI for text-to-speech conversion. It details how to clone, pull, install dependencies, download models, and run the web UI, culminating in a simple usage example.  The guide highlights the importance of utilizing emotion vectors for improved voice control.
:::

# Please provide the text you would like me to translate.

Video tutorial: https://www.bilibili.com/video/BV1qv41zgEjE/

Please proceed with magic.

Install Git LFS: `git lfs install`

Clone Repository: *ndex-TTS/index-tts: An Industrial-Level Controllable and Efficient Zero-Shot Text-to-Speech System*

Pull Git LFS files

Install the UV Python package using pip: `pip install -U uv`

Install dependencies: `uv sync --extra webui`

Install the hf-cli: `uv tool install "huggingface-hub[cli,hf_xet`"]

From the HF repository, download the model: `hf download IndexTeam/IndexTTS-2 --local-dir=checkpoints`

Please provide the text you would like me to translate.

The browser has opened port 7860.

# Simple use

WebUI页面长这样
![](../../assets/images/index-tts2-1.webp)

First, please provide the audio reference.

Please provide the text you would like me to translate.

Okay, please provide the text you would like me to translate. I’m ready when you are.

# Training

Using sentiment vectors for emotion control.

![](../../assets/images/index-tts2-2.webp)