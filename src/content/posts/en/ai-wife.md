---
title: "Hand-to-hand teaching you how to run a 2D anime wife!"
description: "Absolutely! Here’s the translation:  “Let's dive right in! This tutorial will guide you step-by-step from software installation to model configuration and finally, to stunning images. 100% guaranteed!”"
category: "Tutorial"
published: 2026-02-12
image: ../../assets/images/ai-wife-15.png
tags: [AI绘图, NoobAI]
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article provides a comprehensive guide to using ComfyUI, a powerful AI art tool for generating images with Stable Diffusion. It begins by explaining the basics of ComfyUI and its importance, then walks users through downloading base models (including LoRA), setting up prompts, and utilizing various techniques for creating unique artwork.  The guide covers both the official and autumn-integration versions of ComfyUI, offering clear instructions on how to download models and launch the application. It also provides helpful tips for working with NoobAI-XL, a specialized model that simplifies LoRA creation through Danbooru character tags. Finally, it offers a step-by-step process for initializing the application and uploading your desired prompts.
:::

# Introduction

Once, I wrote an article documenting my experience of researching AI art – I installed Stable Diffusion WebUI, Stable Diffusion Forge WebUI, and ComfyUI on all three simultaneously. Thankfully, by following these faint threads of knowledge, I was able to recover lost information.

But the article now seems complicated to configure, and there are many deep things that haven’t been explained clearly. It only teaches how to draw characters from Danbooru. So if I want to draw a new character or one not in Danbooru, what will this episode cover? Let's delve into AI illustration!

In a completely beginner’s situation, you can run like this! (It won't work!)

![2025-05-13-11-59-50-ComfyUI_00016_.webp](../../assets/images/2025-05-13-11-59-50-ComfyUI_00016_.webp)

![2025-05-13-12-00-37-ComfyUI_00011_.webp](../../assets/images/2025-05-13-12-00-37-ComfyUI_00011_.webp)

# Simple Thoughtstorm

In formal preparation, we will use the following terms:

- **ComfyUI**：A software that’s an AI illustration control panel, you just need to point and it will generate a picture.
- **checkpoint**：A foundational model, serving as a base for drawing. It can be used directly to begin sketching or combined with a lower-level LoRA model for drawing.
- **LoRA**：A model that controls characters or styles. It can be loaded with different LoRAs to create different characters or styles.
- **prompt**：Provide an image of a [describe the desired image]

Simply put, it’s not complicated at all. We just need to select a base model first – if you don’t pick one or your character is already in that model, you can use the model's prompt to create art. If you want to create an image of a character not in the model, you only need to add another LoRA model.

# Formal start

## Download ComfyUI

> [!tip]
> More recommended is [Stable Diffusion Forge](https://www.bilibili.com/video/BV1rc6nYNEYo/), if you don’t need complex node distribution, sdf can be more convenient for writing prompts.
> ![](../../assets/images/ai-wife-17.png)

> Despite ComfyUI supporting AMD graphics and pure CPU rendering, it’s recommended to use **NVIDIA Cuda** for rendering, as it is faster and offers better compatibility.

### The article focuses on [X:content] and explores [X:content]. It delves into [X:content] and provides insights into [X:content].

Go to [ComfyUI | Use AI to generate videos, images, audio](https://www.comfy.org/zh-cn/). Download and install, remember to open the magic or change the source mirror settings.

![](../../assets/images/ai-wife.png)

### Autumn Leaf Integration Package

Go to the ComfyUI integration package discussion area to download and extract it: https://www.bilibili.com/video/BV1Ew411776J

After de-stressing, open the folder, and open `A`.

![2025-05-13-12-05-17-image.webp](../../assets/images/2025-05-13-12-05-17-image.webp)

Click the right-hand corner to start the initialization, then let him configure it and automatically open your browser and allow you to enter the ComfyUI interface.

![2025-05-13-12-06-57-image.webp](../../assets/images/2025-05-13-12-06-57-image.webp)

## Download a base model.

Most LoRA models typically require these two base models. NoobAI supports directly creating artwork using characters from the Danbooru database without needing other LoRAs.

- NoobAI-XL (NAI-XL) – V-Pred-1.0-Version | NoobAI Checkpoint | Civitai

- [WAI-illustrious-SDXL - v16.0 | Illustrious Checkpoint | Civitai](https://civitai.com/models/827184/wai-illustrious-sdxl)

Click download now.

![2025-05-13-12-08-17-image.webp](../../assets/images/2025-05-13-12-08-17-image.webp)

> [!warning]
> Due to the V prediction model (NoobAI-VPred) being relatively new, it can only run on SDForge and ComfyUI, and the original SD cannot run, resulting in crashes!

### If you need to download LoRA, please see the link below: [https://www.lunarlancer.com/lora/](https://www.lunarlancer.com/lora/)

First, tell me the English name you want to give your character. For example, **Cartethyia** (Kai-teh-sia).

Then go to https://civitai.com and search for LoRAs you like.

![](../../assets/images/ai-wife-1.png)

In the details page, you can see the base model that LoRA requires. Sometimes the model’s description will also include.

The **Trigger Words** are recommended **Positive Prompting**. Generally, only importing LoRA will yield some effect.

![](../../assets/images/ai-wife-2.png)

## Placement model

> [!warning]
> There's a bug with desktop installation of ComfyUI. Please place your models in the folder you selected when you initially installed them, such as `C:\Users\af\Documents\ComfyUI`. Do not use the format `C:\Users\af\AppData\Local\Programs\ComfyUI\resources\ComfyUI` instead, for more information, please refer to the official documentation: [Important Note: Please do not modify resource/ComfyUI folder - Windows Desktop version - ComfyUI](https://docs.comfy.org/zh-CN/installation/desktop/windows#%E9%87%8D%E8%A6%81%E6%8F%90%E7%A4%BA%EF%BC%9A%E8%AF%B7%E5%8B%BF%E4%BF%AE%E6%94%B9-resource/comfyui-%E6%96%87%E4%BB%B6%E5%A4%B9).

Open the `models` directory:
- Place the base model (similar to `noobaiXLNAIXL_vPred10Version.safetensors`) into the `checkpoints` folder.
- Place LoRA models in the `loras` folder.

![2025-05-13-12-10-06-image.webp](../../assets/images/2025-05-13-12-10-06-image.webp)

## Start! Begin painting!

Launch ComfyUI

Default settings are empty, here’s a workflow for LoRA training:  [oRA Training Workflow]

Download - Basic Start Guide.json

Download - Basic Start + Lora.json

Downloaded after that, click the top-left corner ComfyUI icon to open this workflow.

![](../../assets/images/ai-wife-3.png)

Next, you have these nodes.

![](../../assets/images/ai-wife-4.png)

### Loading model

The base model is loaded, and after refreshing ComfyUI, you should see all the models you have placed in the `CheckpointLoader(Simplified)` section. This includes V prediction models with `vPred...`.

![2025-05-13-12-11-55-image.webp](../../assets/images/2025-05-13-12-11-55-image.webp)

![](../../assets/images/ai-wife-5.png)

Here loaded LoRA (if applicable).

![](../../assets/images/ai-wife-6.png)

### Please provide the Chinese text you would like me to translate. I need the text to be able to fulfill your request.

Fill in the positive/negative prompt, represented as **English**. If you are unable to write, please describe what you want to draw, and I will return it to you.

![](../../assets/images/ai-wife-7.png)

#### How to find character prompts?

**Method One: Using Danbooru Character Tags (NoobAI Exclusive)**

NoobAI model’s biggest feature is supporting directly drawing characters from Danbooru without needing to create them from scratch! What would you like to draw? For example, how about Flowling?

Entering [Danbooru characters in NoobAI-XL (NAI-XL)](https://www.downloadmost.com/NoobAI-XL/danbooru-character/)

Search for Firefly’s English name or search for Star Rail characters.

![2025-05-13-12-15-16-image.webp](../../assets/images/2025-05-13-12-15-16-image.webp)

Copy the `Prompt tags` and paste them into the linked CLIP text encoding.

![2025-05-13-12-16-35-image.webp](../../assets/images/2025-05-13-12-16-35-image.webp)

The character setup is already complete!

Using LoRA triggers, a method for enhancing image generation.

If you use LoRA, simply copy the trigger words from the details page.

#### Starting prompts are a great way to get started with learning or using a new AI model. Here are some popular options:  *   **"What's your favorite thing to learn?"** – This prompt encourages the AI to share its knowledge and interests. *   **“Tell me about [topic]”** – Useful for getting information on specific subjects. *   **“Explain [concept] in simple terms”** – Helps clarify complex ideas. *   **“Give me a creative story idea”** – Sparks imaginative responses. *   **“Write a poem about…”** – Allows for artistic expression.  [[1:starting_prompts]]

Here are some starting phrases:

- **Positive Conditions**：
  ```
  masterpiece, best quality, newest, absurdres, highres
  ```

- **Negative Condition**：
  ```
  text, watermark, worst quality, old, early, low quality, lowres, signature, username, logo, bad hands, mutated hands, mammal, anthro, furry, ambiguous form, feral, semi-anthro
  ```

We added this to ComfyUI as shown below:

![2025-05-13-12-19-32-image.webp](../../assets/images/2025-05-13-12-19-32-image.webp)

> [!tip]
> If you want the image to look different, please add (**English prompt! Don’t know how to do it, use translation or ask AI!**) to the front and back prompts. For example, to have the foot placed in the foreground and barefoot, add **foreground, bare feet**.

### Set image dimensions

Setting up image generation resolution, different models have different recommended resolutions.

**NoobAI recommends resolution** (approximately 1024x1024)
- **Recommended: 832x1216**
- 768x1344 [[The article discusses the benefits of mindfulness meditation]] *t’s a practice that can reduce stress and improve focus* [[Many people find it incredibly helpful for managing anxiety and improving their overall well-being]] [[Regular practice can lead to increased self-awareness and emotional regulation]]

![2025-05-13-12-22-06-image.webp](../../assets/images/2025-05-13-12-22-06-image.webp)

![](../../assets/images/ai-wife-8.png)

> Recommended to check the model release page for related resolution recommendations.

### Configuring a K-sampler.

Here are the parameters to control generation (default one is a good choice, if you don’t know, don’t do it).

![](../../assets/images/ai-wife-9.png)

- **Seed**：Each time it’s a random value, if it's fixed and other content remains unchanged, it will always produce the same image.
- Step count: The number of iterations required to generate a ghost image, too low will result in distorted images, and too high may lead to excessive elements and over-saturation.
NoobAI recommends: 28-35
- **CFG**：The AI’s adherence to your input prompts is higher the more obedient it is, lower the more it’s rendered in a fantastical manner (ignoring some prompts).
NoobAI recommends: 4-5
Other model recommendations: 7-9
- **Sampling Method**：Sampling method
NoobAI: **only use euler** (❗Important! Cannot change! May cause a distorted image!)
Other models can produce normal images.
- **Noise Reduction**：The principle behind AI-generated images is to repeatedly apply noise reduction to an image that appears as a single color, resulting in the final output. The setting of this value determines how blurry and mixed the image becomes – lower values produce clearer, more detailed images, while higher values lead to over-sharpness or over-analysis.

### Previewing real-time functionality.

To ensure we don’t get bored during the live preview, we can set up and enable automatic real-time preview functionality by changing **** to **auto**.

![](../../assets/images/ai-wife-16.png)

### Please provide the Chinese text you would like me to translate. I need the text to be able to fulfill your request.

Next, click on the right-hand corner to run, you’ve got it! You can also edit the number beside it to generate multiple images at once.

![](../../assets/images/ai-wife-10.png)

Due to the launch of real-time preview, you can see the model’s progress at each step.

![](../../assets/images/ComfyUI_UkQQZG4KkW.gif)

Click on the asset highlighted with the right-pointing arrow, and expand to view a larger image.

![](../../assets/images/ai-wife-11.png)

All images are available in the `output` folder.

![](../../assets/images/ai-wife-12.png)

If you want to draw other characters, you only need: **find LoRA, write recommendation prompts, and start!**

![](../../assets/images/ai-wife-13.png)

![](../../assets/images/ai-wife-14.png)

# Common Issues and Techniques

- The generated images are highly variable, so try again!

- Avoid generating NSFW content and add `NSFW` to negative prompts, and add `safe` to positive prompts.

- **About V Prediction Model**：Due to the new V prediction model, it can only be run on SDForge and ComfyUI. The original SD cannot run, resulting in rendering issues.

- **Reference Resources**：More tips for NoobAI models can be found on the Civitai Model page’s About section.
  ![2025-05-13-12-30-55-image.webp](../../assets/images/2025-05-13-12-30-55-image.webp)