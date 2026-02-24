---
title: "Step-by-step Guide to Running a 2D AI Girlfriend!"
description: "Extremely simple! Even a fool can do it! In this episode, I'll show you step by step—from software installation, model configuration, to generating images—how to create stunning pictures with 100% success!"
category: "Tutorial"
published: 2026-02-12
image: ../../assets/images/ai-wife-15.png
tags: [AI绘图, NoobAI]
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide teaches beginners how to use ComfyUI for AI image generation, focusing on simplicity and accessibility. It walks through downloading ComfyUI, installing base models like NoobAI-XL and WAI-illustrious-SDXL, adding LoRA models for specific characters, and using prompt-based workflows to generate images—even for new or unlisted characters. The tutorial emphasizes practical setup, avoiding complex configurations, and includes downloadable workflow files to streamline the process.
:::

# Introduction

I once wrote an article documenting my journey of researching AI image generation from scratch—back then, I installed Stable Diffusion WebUI, Stable Diffusion Forge WebUI, and ComfyUI, searching for tutorials, experimenting hands-on, and making mistakes. Fortunately, relying on my remaining memory, I was able to recover the knowledge I had previously forgotten, following these faint traces.

But looking back at that article now, the setup is still too complicated, and many deeper aspects remain unclear—it only teaches how to draw characters already included in Danbooru. So what if I want to draw a brand-new character or one not yet included? This episode will thoroughly break down AI drawing!

With zero prior knowledge, you can achieve something like the figure below! (If you can't, I'll kill you!)

![2025-05-13-11-59-50-ComfyUI_00016_.webp](../../assets/images/2025-05-13-11-59-50-ComfyUI_00016_.webp)

![2025-05-13-12-00-37-ComfyUI_00011_.webp](../../assets/images/2025-05-13-12-00-37-ComfyUI_00011_.webp)

# Simple brainstorming

Before we begin, we will use the following terms; here is a brief introduction to what each one does:

- **ComfyUI**: A software that serves as an AI image generation console; you just need to click a few times here to generate images.
- **checkpoint**: A base model serving as the foundational layer. You can use it directly to start drawing, or combine it with the Lora models listed below for drawing.
- **LoRA**: A model for controlling character/style. Different LoRAs can be loaded to draw different characters or styles.
- **prompt**：Prompt, used to inform the AI of what kind of thing you want to draw

In short, this is not complicated at all. We just need to first select a base model; if you don’t pick one or the character you want to draw is already included, you can directly use the prompt for that character to generate the image. If you want to draw a character not included, you just need to load an additional LoRA model.

# Formally begin

## Download ComfyUI

> [!tip]
> It is more recommended to use [Stable Diffusion Forge](https://www.bilibili.com/video/BV1rc6nYNEYo/), as it is more convenient to write prompts if you do not need complex node configurations.
> ![](../../assets/images/ai-wife-17.png)

> Although ComfyUI supports AMD graphics cards and CPU-only rendering, it is still recommended to use **NVIDIA Cuda** for rendering, as it is faster and has better compatibility!

### Method One: Official Version (Recommended)

Go to [ComfyUI | Generate videos, images, and audio with AI](https://www.comfy.org/zh-cn/) to download and install, remember to enable Magic or change the mirror source in settings

![](../../assets/images/ai-wife.png)

### Method Two: Autumn Leaves Integration Pack

Go to the comment section of the video "Autumn Leaves" to download the ComfyUI integration package, download and extract it: https://www.bilibili.com/video/BV1Ew411776J

After extraction, open the folder and open `A`

![2025-05-13-12-05-17-image.webp](../../assets/images/2025-05-13-12-05-17-image.webp)

Click the "Start" button at the bottom right to initiate the process, allowing it to complete its initialization until it automatically opens your browser and successfully accesses the ComfyUI interface.

![2025-05-13-12-06-57-image.webp](../../assets/images/2025-05-13-12-06-57-image.webp)

## Download the base model

Most LoRA models generally require these two base models. Among them, NoobAI supports direct painting using characters already existing in Danbooru, without needing other LoRA:

- [NoobAI-XL (NAI-XL) - V-Pred-1.0-Version | NoobAI Checkpoint | Civitai](https://civitai.com/models/833294?modelVersionId=1190596)（Requires Magic）

- [WAI-illustrious-SDXL - v16.0 | Illustrious Checkpoint | Civitai](https://civitai.com/models/827184/wai-illustrious-sdxl)

Click to download

![2025-05-13-12-08-17-image.webp](../../assets/images/2025-05-13-12-08-17-image.webp)

> [!warning]
> Since the V-prediction model (NoobAI-VPred) is relatively new, it can only run on SDForge and ComfyUI; the original SD cannot run it, and it will cause image corruption!

### If you need to download LoRA

First, you need to know the English name of the character you want to draw, such as **Cartethyia** (Ming Chao - Cartethyia)

Then go to https://civitai.com/ to search and select your preferred LoRA.

![](../../assets/images/ai-wife-1.png)

On the detail page, you can see the base model required for this LoRA. Sometimes, the model's description will also write

The following **Trigger Words** are recommended **Positive Prompts**. Generally, importing only LoRA without writing specific prompts will still have some effect.

![](../../assets/images/ai-wife-2.png)

## Place the model

> [!warning]
> for the desktop version of ComfyUI, please place your models in the folder you selected during installation, such as `C:\Users\af\Documents\ComfyUI`, rather than in locations like `C:\Users\af\AppData\Local\Programs\ComfyUI\resources\ComfyUI`. For more details, please refer to the official documentation: [Important Note: Do Not Modify the resource/ComfyUI Folder - Windows Desktop Version - ComfyUI](https://docs.comfy.org/zh-CN/installation/desktop/windows#%E9%87%8D%E8%A6%81%E6%8F%90%E7%A4%BA%EF%BC%9A%E8%AF%B7%E5%8B%BF%E4%BF%AE%E6%94%B9-resource/comfyui-%E6%96%87%E4%BB%B6%E5%A4%B9)

Open the `models` directory:
- Place the base model (similar to `noobaiXLNAIXL_vPred10Version.safetensors`) into the `checkpoints` folder
- Place the LoRA model into the `loras` folder

![2025-05-13-12-10-06-image.webp](../../assets/images/2025-05-13-12-10-06-image.webp)

## Start! Begin drawing!

Launch ComfyUI

By default, it should be empty. Here is a workflow with a starting pose + LoRA that you can import directly:

[Click to download - Basic Starting.json](https://2x.nz/files/基础起手.json)

[Click to download - Base Start + Lora.json](https://2x.nz/files/基础起手+Lora.json)

After downloading, click the ComfyUI icon in the top left corner to open this workflow.

![](../../assets/images/ai-wife-3.png)

Next, you should already have these nodes.

![](../../assets/images/ai-wife-4.png)

### Loading model

Here, load the base model. After refreshing ComfyUI, you should be able to see all the models you placed at `Checkpoint Loader (Simple)`. Select the one with `vPred...` as the V-prediction model.

![2025-05-13-12-11-55-image.webp](../../assets/images/2025-05-13-12-11-55-image.webp)

![](../../assets/images/ai-wife-5.png)

Load LoRA (if any) here

![](../../assets/images/ai-wife-6.png)

### Fill in the prompt

Here, fill in the positive and negative prompt words, both in **English**. If you don't know how to write them, find another AI to describe what you want to draw, and have it return a prompt suitable for AI image generation.

![](../../assets/images/ai-wife-7.png)

#### How to find the prompt for the character?

**Method One: Using Danbooru Character Tags (Exclusive to NoobAI)**

One major feature of the NoobAI model is its support for directly drawing through existing characters from Danbooru! What would you like to draw? For example, Liyue from Honkai: Star Rail?

Enter [Danbooru characters in NoobAI-XL (NAI-XL)](https://www.downloadmost.com/NoobAI-XL/danbooru-character/)

Search for the English name `firefly` or search `star rail` to find all characters from Honkai: Star Rail.

![2025-05-13-12-15-16-image.webp](../../assets/images/2025-05-13-12-15-16-image.webp)

Copy `Prompt tags` and paste it into the CLIP text encoder linked to the positive condition

![2025-05-13-12-16-35-image.webp](../../assets/images/2025-05-13-12-16-35-image.webp)

The character preset is now ready!

**Method Two: Using LoRA's Trigger Words**

If you use LoRA, simply copy the Trigger Words from the product detail page.

#### Recommended starting prompt tips

I also provide some starting prompts here:

- **Positive Conditions**:
  ```
  masterpiece, best quality, newest, absurdres, highres
  ```

- **Negative Conditions**:
  ```
  text, watermark, worst quality, old, early, low quality, lowres, signature, username, logo, bad hands, mutated hands, mammal, anthro, furry, ambiguous form, feral, semi-anthro
  ```

We add it to ComfyUI, as shown in the figure below:

![2025-05-13-12-19-32-image.webp](../../assets/images/2025-05-13-12-19-32-image.webp)

> [!tip]
> If you want the image to look different, please add (**must be in English! If unsure, use translation or ask AI!**) to both the positive and negative prompts. For example, if you want the feet to be in focus and barefoot, add **positive prompt**: `barefoot, feet in foreground`

### Set image size

Here, set the resolution for generating images; different models have different recommended resolutions:

**Recommended Resolution by NoobAI** (Total area approximately 1024x1024):
- **Recommended: 832x1216**
- Others: 768x1344, 896x1152, 1024x1024, 1152x896, 1216x832, 1344x768, 1024x1536, 1536x1024

![2025-05-13-12-22-06-image.webp](../../assets/images/2025-05-13-12-22-06-image.webp)

![](../../assets/images/ai-wife-8.png)

> It is recommended to visit the model release page to view the recommended resolution information.

### Configure K Sampler

Here, control the generation parameters (the default one provided to you is already a good choice; if you don't understand, do not change it).

![](../../assets/images/ai-wife-9.png)

- **Seed**: Each time it is a random value; if fixed and no other content changes, it will always produce the same image.
- **Steps**: This refers to how many times the AI needs to redraw. Too low may result in ghost images or distorted images, while too high may lead to excessive elements and overly saturated visuals.
- NoobAI Recommendation: 28-35
- **CFG**: The degree to which the AI complies with your input prompt; the higher the value, the more obedient the output, and the lower the value, the more imaginative and free-form the result (ignoring some prompts)
- NoobAI Recommendation: 4-5
- Other model recommendations: 7-9
- **Sampler Name**: Sampling Method
NoobAI: **Can only use euler** (❗Important! Cannot be changed! May cause image generation failure!)
- Other models: Most can generate normal images.
- **Noise Reduction**: The principle of AI-generated images is to iteratively denoise an image that initially appears as a solid color, gradually refining it into the final output. The lower this value is set, the blurrier and more chaotic the image becomes; the higher it is set, the clearer the image becomes, but it may also result in over-sharpening or excessive detail.

### Enable real-time preview

To ensure we are not bored while generating images, you can go to Settings and enable the real-time preview function, changing **** to ****.

![](../../assets/images/ai-wife-16.png)

### Run generation

Next, click the "Run" button in the top right corner. Oh, by the way, you can also edit the number next to it to generate multiple images at once.

![](../../assets/images/ai-wife-10.png)

Since we have enabled real-time preview, you can see the model's painting progress at each step.

![](../../assets/images/ComfyUI_UkQQZG4KkW.gif)

Click the Assets in the top right corner to expand and view the large image.

![](../../assets/images/ai-wife-11.png)

All generated images can be seen in the `output` folder.

![](../../assets/images/ai-wife-12.png)

If you want to draw other characters, you only need: **Find LoRA, write recommended prompts, and start generating!**

![](../../assets/images/ai-wife-13.png)

![](../../assets/images/ai-wife-14.png)

# Common Questions and Tips

- **AI-generated images have randomness**: Each generated image is somewhat different, so try multiple times!

- **Avoid generating NSFW images**: Add `NSFW` to the negative prompt and `safe` to the positive prompt.

- **About the V Prediction Model**: Since the V prediction model is relatively new, it can only run on SDForge and ComfyUI; the original SD cannot run it, and it will cause image corruption.

- **Reference Resources**: For more tips on NoobAI models, check the "About" section on the Civitai model page.
  ![2025-05-13-12-30-55-image.webp](../../assets/images/2025-05-13-12-30-55-image.webp)