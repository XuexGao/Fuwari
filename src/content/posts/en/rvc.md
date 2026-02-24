---
title: "Hand-on teaching you AI karaoke!"
description: "Leverage RVC to train a voice model and then utilize Replay AI to recreate vocal performances!"
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
Here’s a brief summary of the article:

The article details how to train a voice conversion model using Replay and VR architecture, leveraging RVC, UVR&MSST, and audio editing tools like UVR and Anjok07’s Ultimate Vocal Remover GUI. It guides users through downloading necessary resources (including the RVC-Project repository), setting up the training process, selecting appropriate models, and utilizing a workflow involving background processing, GPU acceleration, and AI-powered vocal separation. The final output includes instrumental tracks and vocals, with the use of Replay for AI voice cloning and UVR/MSST for audio separation.
:::

# Video tutorial

https://www.bilibili.com/video/BV19F41zPEnM/
# Okay, please provide the text. I’m ready when you are.

Training voice model for RVC.

Utilizing AI-powered voice synthesis and the original composition enhances the listening experience.

UVR&MSST：Perform vocal accompaniment separation

# Okay, please provide the text. I’m ready when you are.

At least 10 minutes, recommended for 1 hour. The audio will only have one sound quality, with pauses allowed. For higher quality, you can manually trim the pauses yourself.

# 利用RVC训练模型

Enter the RVC-Project/Retrieval-based-Voice-Conversion-WebUI for easily training a good voice model with voice data within <= 10 minutes! Based on your system and GPU, download it or use this link (domestic high-speed): [语音克隆&变声器 整合包下载](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) Please do not download incorrectly.

![](../../assets/images/rvc-1.webp)

Go-web.bat

![](../../assets/images/rvc-2.webp)

Enter training mode.

![](../../assets/images/rvc-3.webp)

Model Name

![](../../assets/images/rvc-4.webp)

Please provide the content you want me to translate! I need the text to be translated into English.

![](../../assets/images/rvc-5.webp)

Please provide the text you would like me to translate.

![](../../assets/images/rvc-6.webp)

Total training duration recommendations range from 50 to 200 hours.

![](../../assets/images/rvc-7.webp)

Then click on a one-click training (requires a significant amount of time, and is recommended to train before bedtime).

![](../../assets/images/rvc-8.webp)

Training completed. Models can be found in `assets/weights`. The file ending with [.pth] is located at `.pth`.

![](../../assets/images/rvc-9.webp)

# Please provide the text you would like me to translate.

Replay

Select audio

The model selected just trained.

Please provide the text you would like me to translate.

![](../../assets/images/rvc-10.webp)

View in Folder

![](../../assets/images/rvc-11.webp)

# The instrumental and vocal parts are separated.

### UVR

If you are a 50-series GPU, please visit [GPU Acceleration Hangs on RTX 5070Ti (Driver 576.80, CUDA 12.9) · Issue #1889 · Anjok07/ultimatevocalremovergui](https://github.com/Anjok07/ultimatevocalremovergui/issues/1889) to download a UVR patch for 50-series GPUs using [UVR_Patch_4_24_25_20_11_BETA_full_cuda_12.8](https://www.mediafire.com/file_premium/4jg10r9wa3tujav/UVR_Patch_4_24_25_20_11_BETA_full_cuda_12.8.zip/file).

Download [https://github.com/Anjok07/ultimatevocalremovergui: GUI for a Vocal Remover that uses Deep Neural Networks.]

First, download the model and select the settings.

![](../../assets/images/rvc-12.webp)
选择 **Download Center** 下载 **VR  Arch** 的 **5_HP-Karaoke-UVR** 模型。然后回到首页
![](../../assets/images/rvc-13.webp)

Please select input.

Select Output

Choose VR Architecture

Choose the 5_HP-Karaoke-UVR model.

Select GPU Conversion

Okay, please provide the text. I’m ready when you are.

![](../../assets/images/rvc-14.webp)

The instrumental track features a captivating melody, supported by rich vocal harmonies.

![](../../assets/images/rvc-15.webp)

### MSST

SUC-DriverOld/MSST-WebUI is a web UI application designed for Music-Source-Separation Training, incorporating UVR (User Verification Rate) alongside the software.

Double-click `go-webui.bat` to run.

![](../../assets/images/rvc-16.webp)

First, install the model. The final output files for each model may vary.

![](../../assets/images/rvc-17.webp)

The content is a detailed explanation of how to separate audio files using a software program, focusing on its functionality and ease of use. It covers various methods for isolating specific sections within an audio file, including techniques like splitting by time or frequency, and provides guidance on selecting the appropriate settings for optimal results.

![](../../assets/images/rvc-18.webp)