---
title: "Step-by-step Guide to AI Cover Singing!"
description: "Use RVC to train a voice model, then use Replay to directly output AI covers!"
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
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide explains how to train a voice conversion model using RVC, use it to generate AI vocals with Replay, and separate vocals from accompaniment using UVR or MSST. It covers preparing audio, training the model, converting songs, and separating audio components with detailed steps and model recommendations.
:::

# Video tutorial

[[X:content]]
# Process

RVC: Training Role Voice Color Models

Replay: Use vocal tone models + original song for AI cover singing

UVR&MSST: Perform vocal accompaniment separation

# Prepare audio source

At least 10 minutes, recommended 1 hour. Only one voice tone is allowed in the audio, and pauses are permitted. For higher quality, you can trim the pauses yourself.

# Utilize RVC to train a model

Enter [RVC-Project/Retrieval-based-Voice-Conversion-WebUI: Easily train a good VC model with voice data <= 10 mins!](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) to download based on your system and graphics card, or use this link to download (high-speed domestic) [Voice Cloning & Voice Changer Integrated Package Download](https://www.yuque.com/flowercry/hxf0ds). Be sure not to download the wrong one.

![](../../assets/images/rvc-1.webp)

Run `go-web.bat` directly

![](../../assets/images/rvc-2.webp)

Enter the WebUI and switch to the training section

![](../../assets/images/rvc-3.webp)

First write the model name

![](../../assets/images/rvc-4.webp)

Then place your audio source into an empty folder

![](../../assets/images/rvc-5.webp)

Then fill it in

![](../../assets/images/rvc-6.webp)

Total training epochs recommended: 50 ~ 200

![](../../assets/images/rvc-7.webp)

Then click one-click training (it will take a long time; it is recommended to train before going to bed).

![](../../assets/images/rvc-8.webp)

After training, you can find the model files in `assets/weights`, ending with `.pth`.

![](../../assets/images/rvc-9.webp)

# Use Replay to create AI covers

Download [Replay](https://www.weights.com/replay)

First **Select Audio** choose your original song

**Model** Select the model that has just been trained

Then click **Convert Audio**

![](../../assets/images/rvc-10.webp)

You can find **Clean AI Voice** in the **View in Folder** of the output file.

![](../../assets/images/rvc-11.webp)

# Separate accompaniment from vocals

### UVR

> If you are using a 50-series GPU, please go to [GPU Acceleration Hangs on RTX 5070Ti (Driver 576.80, CUDA 12.9) · Issue #1889 · Anjok07/ultimatevocalremovergui](https://github.com/Anjok07/ultimatevocalremovergui/issues/1889) and download the UVR patch suitable for 50-series GPUs via [UVR_Patch_4_24_25_20_11_BETA_full_cuda_12.8](https://www.mediafire.com/file_premium/4jg10r9wa3tujav/UVR_Patch_4_24_25_20_11_BETA_full_cuda_12.8.zip/file)

Download [Anjok07/ultimatevocalremovergui: GUI for a Vocal Remover that uses Deep Neural Networks.](https://github.com/Anjok07/ultimatevocalremovergui)

First, download the model and select settings

![](../../assets/images/rvc-12.webp)
Select **Download Center** to download the **VR Arch** model **5_HP-Karaoke-UVR**. Then return to the homepage
![](../../assets/images/rvc-13.webp)

First, select the original audio via **Select Input**

Then select the output folder via **Select Output**

**CHOOSE PROCESS METHOD** Choose **VR Architecture**

**CHOOSE VR MODEL** Choose the **5_HP-Karaoke-UVR** model we just downloaded

Check **GPU Conversion**

Then click **Start Processing**

![](../../assets/images/rvc-14.webp)

In the output folder, **Instrumental** is for instrumental accompaniment, **Vocals** is for vocals

![](../../assets/images/rvc-15.webp)

### MSST

Download [SUC-DriverOld/MSST-WebUI: A WebUI app for Music-Source-Separation-Training and we packed UVR together!](https://github.com/SUC-DriverOld/MSST-WebUI)

Double-click `go-webui.bat` to run

![](../../assets/images/rvc-16.webp)

First, install the model. The final output file for each model may differ.

![](../../assets/images/rvc-17.webp)

Then it's literal, click **Input Audio Separation** to start the conversion

![](../../assets/images/rvc-18.webp)