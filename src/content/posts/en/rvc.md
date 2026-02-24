---
title: "Hand-on teaching you AI karaoke!"
description: "Leverage RVC to train audio models and utilize Replay AI for voice synthesis and karaoke!"
published: 2025-10-13
image: ../../assets/images/rvc-19.webp
tags:
  - AI
  - RVC
  - Replay
  - UVR
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article details a workflow for creating AI voiceovers, specifically using RVC and Replay to train a voice conversion model. The process involves downloading necessary tools (RVC, Replay, UVR & MSST), preparing audio data with a minimum of 10 minutes of audio, utilizing the RVC-Project web UI, and then training the model through a one-click process.  It also explains how to leverage Replay for AI voice cloning and separate vocal and instrumental tracks.
:::

# Video tutorials.

Here’s the translation of the text from the provided link:  “The video explores the evolving relationship between humans and AI, examining both the potential benefits and ethical concerns surrounding artificial intelligence development. It delves into various applications of AI, including automation, healthcare, and creative industries, while also addressing issues such as job displacement and algorithmic bias.”
# 流程

RVC: Training voice model training.

Utilizing a voice model and the original composition to create an AI rendition.

UVR&MSST: Vocal accompaniment separation analysis.

# Preparation of audio sources.

At least 10 minutes, with a recommended duration of one hour. The audio only allows one sound profile; pauses are permitted, and higher quality can be achieved through individual trimming of pauses.

# Leveraging RVC for model training.

Here’s the translation:  “Easily train a high-quality Voice Conversion Model (VC) using voice data within <= 10 minutes.  Download via your system and GPU, or download via this link (domestic high-speed). [Voice Cloning & Vario-Voice Integration Package Download](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) Please ensure you download correctly.”

![](../../assets/images/rvc-1.webp)

Run `go-web.bat` directly.

![](../../assets/images/rvc-2.webp)

Enter the Training tab.

![](../../assets/images/rvc-3.webp)

首先写模型名称

![](../../assets/images/rvc-4.webp)

Please transfer your audio files to a blank folder.

![](../../assets/images/rvc-5.webp)

然后填进去

![](../../assets/images/rvc-6.webp)

Recommended training rounds vary depending on the specific model and dataset. A general guideline is to start with 50-200 rounds for optimal performance.

![](../../assets/images/rvc-7.webp)

Click on the one-click training (requires a significant time investment, and is recommended to train before bedtime).

![](../../assets/images/rvc-8.webp)

After training, you can locate the model files in `assets/weights`. The file ending with `.pth` is located at that location.

![](../../assets/images/rvc-9.webp)

# Utilizing Replay for AI-driven reimagining.

Download [Replay](https://www.weights.com/replay)

First, select your original audio.

**Model** Selects the newly trained model.

Clicking on **Convert Audio**

![](../../assets/images/rvc-10.webp)

In the **View in Folder** file, you can find **Clean AI voices**.

![](../../assets/images/rvc-11.webp)

# The duet and vocal separation.

### UVR

If you are a 50-series GPU, please visit [GPU Acceleration Hangs on RTX 5070Ti (Driver 576.80, CUDA 12.9) · Issue #1889 · Anjok07/ultimatevocalremovergui](https://github.com/Anjok07/ultimatevocalremovergui/issues/1889) using [UVR_Patch_4_24_25_20_11_BETA_full_cuda_12.8](https://www.mediafire.com/file_premium/4jg10r9wa3tujav/UVR_Patch_4_24_25_20_11_BETA_full_cuda_12.8.zip/file).

Download [Anjok07/ultimatevocalremovergui: GUI for a Vocal Remover that uses Deep Neural Networks.](https://github.com/Anjok07/ultimatevocalremovergui)

First, download the model and select the settings.

![](../../assets/images/rvc-12.webp)
选择 **Download Center** 下载 **VR  Arch** 的 **5_HP-Karaoke-UVR** 模型。然后回到首页
![](../../assets/images/rvc-13.webp)

First, select the original audio from the input selection menu.

Here’s the translation:  “Select the output folder via **Select Output**.”

**VR Architecture** – Choose the Virtual Reality (VR) architecture.

**CHOOSE VR MODEL** Select our recently downloaded **5_HP-Karaoke-UVR** model.

Select **GPU Conversion**

Clicking on **Start Processing**

![](../../assets/images/rvc-14.webp)

The instrumental track is included as background music, and the vocal tracks are the primary focus.

![](../../assets/images/rvc-15.webp)

### MSST

Download the [SUC-DriverOld/MSST-WebUI: A WebUI app for Music-Source-Separation-Training](https://github.com/SUC-DriverOld/MSST-WebUI) package. This application provides a web interface specifically designed for training music source separation models, and it integrates with UVR data.

Double-click `go-webui.bat` to launch.

![](../../assets/images/rvc-16.webp)

First, install the model. The final output files for each model may vary.

![](../../assets/images/rvc-17.webp)

Then, the text is simply a translation of the meaning – it’s essentially about separating audio files into individual tracks. Following this, you will click **Input Audio Separation**. This process begins the conversion of audio.

![](../../assets/images/rvc-18.webp)