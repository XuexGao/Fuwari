---
title: "手把手教你跑一个二次元AI老婆！"
description: "Here’s the translation:  “Let's go through this step-by-step, teaching you how to install software, configure your models, and generate stunning images. We’ll guarantee you achieve remarkable results.”"
category: "Tutorial"
published: 2026-02-12
image: ../../assets/images/ai-wife-15.png
tags: [AI绘图, NoobAI]
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Please provide the text you would like me to translate.

I wrote an article documenting my experience of researching AI art – I assembled Stable Diffusion WebUI, Stable Diffusion Forge WebUI, and ComfyUI on all three platforms, experimenting with tutorials, practice, and troubleshooting. Fortunately, by following these faint threads of knowledge, I was able to recover lost information.

The article now seems complicated to configure, and there are many deep layers that haven’t been explained clearly. It only covers how to draw characters from Danbooru. If you want to draw new characters or those not included, this episode will delve into AI illustration techniques!

You are a beginner and you can run out like this!

![2025-05-13-11-59-50-ComfyUI_00016_.webp](../../assets/images/2025-05-13-11-59-50-ComfyUI_00016_.webp)

![2025-05-13-12-00-37-ComfyUI_00011_.webp](../../assets/images/2025-05-13-12-00-37-ComfyUI_00011_.webp)

# Simple thoughtstorms

In formal settings, we will use the following terms:

- ComfyUI is a software that is an AI illustration control panel, you just need to point and click to generate images.
- Checkpoint：A foundational model serving as a base for visualization. It can be used directly to generate images or combined with a lower-resolution LoRA model for further refinement.
- LoRA: A model that controls a character or style. It can be loaded with different LoRAs to create different characters or styles.
- Please provide the prompt! I need the prompt to be able to translate it into English.

Simply put, it’s not complicated. You just need to select a base model first – if you don't choose one or want to draw a character that already fits in it, you can use its prompt as a reference to create the image. If you want to draw a character that isn’t already included, you only need to add another LoRA model.

# Please provide the text you would like me to translate.

## Download ComfyUI

> [!tip]
> 更推荐使用 [Stable Diffusion Forge](https://www.bilibili.com/video/BV1rc6nYNEYo/)，如果不需要复杂的节点配布，sdf可以更方便的去写提示词
> ![](../../assets/images/ai-wife-17.png)

Despite ComfyUI supporting AMD graphics and pure CPU rendering, it is recommended to use NVIDIA CUDA for rendering, as it is faster and offers better compatibility.

### Please provide the text you would like me to translate.

Go to `omfyUI | Use AI to generate videos, images, audio`. Download and install it, and remember to change the mirror source in settings.

![](../../assets/images/ai-wife.png)

### Autumn leaves integration package

Download the ComfyUI integration package for videos from autumn leaves: https://www.bilibili.com/video/BV1Ew411776J

After decompressing, open the folder containing `A绘世启动器`.

![2025-05-13-12-05-17-image.webp](../../assets/images/2025-05-13-12-05-17-image.webp)

Click the right-hand corner to start the initialization process, allowing it to automatically open your browser and allow you to enter the ComfyUI interface.

![2025-05-13-12-06-57-image.webp](../../assets/images/2025-05-13-12-06-57-image.webp)

## Download base model

Most LoRA models typically require these two base models. NoobAI supports directly creating artwork with characters already available within Danbooru without the need for other LoRAs.

- NoobAI-XL (NAI-XL) - V-Pred-1.0-Version | NoobAI Checkpoint | Civitai

- WAI-illustrious-SDXL - v16.0 | Illustrious Checkpoint | Civitai

Please provide the text you would like me to translate.

![2025-05-13-12-08-17-image.webp](../../assets/images/2025-05-13-12-08-17-image.webp)

Please provide the text you would like me to translate.
Due to the V prediction model (NoobAI-VPred), it can only run on SDForge and ComfyUI, and the original SD cannot run, resulting in rendering issues.

### You can download LoRA here.

Cartheya

https://civitai.com/

![](../../assets/images/ai-wife-1.png)

In the details page, you can see the base model required for this LoRA. Sometimes the model's description will also include...

The recommended LoRA triggers typically only import the core data and do not require specific prompts. However, they can still have a noticeable effect.

![](../../assets/images/ai-wife-2.png)

## Please provide the text you would like me to translate.

Please provide the text you would like me to translate.
There’s a bug with desktop installation of ComfyUI. Please place your models in the folder you selected when you initially installed them, such as `\Users\af\Documents\ComfyUI`. For more information, please refer to the official documentation: [Important Note: Do not modify the resource/ComfyUI folder - Windows desktop version - ComfyUI](https://docs.comfy.org/zh-CN/installation/desktop/windows#%E9%87%8D%E8%A6%81%E6%8F%90%E7%A4%BA%EF%BC%9A%E8%AF%B7%E5%8B%BF%E4%BF%AE%E6%94%B9-resource/comfyui-%E6%96%87%E4%BB%B6%E5%A4%B9)

Open the models directory:
- Place the base model (similar to `noobaiXLNAIXL_vPred10Version.safetensors`) in the `checkpoints` folder.
- LoRA model placed in `loras` folder.

![2025-05-13-12-10-06-image.webp](../../assets/images/2025-05-13-12-10-06-image.webp)

## Start! Begin painting!

Start ComfyUI

Please provide the content you would like me to translate.

Click here to download - Basic Start.json

Click here to download - Basic Start & Lora.json

Download the file and click the ComfyUI icon on the left-upper corner to open this workflow.

![](../../assets/images/ai-wife-3.png)

Okay, please provide the text. I’m ready when you are.

![](../../assets/images/ai-wife-4.png)

### 加载模型

The base model has been loaded, and after refreshing ComfyUI, you should be able to see all models you have placed in the `Checkpoint加载器(简易)` section.  These are V prediction models with `vPred...` labels.

![2025-05-13-12-11-55-image.webp](../../assets/images/2025-05-13-12-11-55-image.webp)

![](../../assets/images/ai-wife-5.png)

Here loaded LoRA (if applicable)

![](../../assets/images/ai-wife-6.png)

### Please provide the text you would like me to translate.

Okay, please provide the text you want me to translate. I’m ready when you are.

![](../../assets/images/ai-wife-7.png)

#### How to find a character’s prompt?

Here’s the translation:  Method 1: Using Danbooru character tags (exclusive to NoobAI)

NoobAI’s biggest feature is that you can directly draw characters from Danbooru and create them directly within the image! What would you like to draw, such as Flowling Lumina?

Danbooru characters in NoobAI-XL (NAI-XL)

Firefly

![2025-05-13-12-15-16-image.webp](../../assets/images/2025-05-13-12-15-16-image.webp)

Please provide the text you would like me to translate.

![2025-05-13-12-16-35-image.webp](../../assets/images/2025-05-13-12-16-35-image.webp)

Okay, please provide the text. I’m ready when you are.

Using LoRA triggers can significantly enhance performance and control over image generation.

If you use LoRA, directly copy the details page’s trigger words.

#### Here are some startup prompt suggestions:  *   **Focus on User Value:** Highlight how your product/service solves a real user problem and delivers tangible benefits. *   **Clear & Concise Messaging:** Keep it simple, direct, and easy to understand. Avoid jargon. *   **Value Proposition:** Clearly articulate what makes you unique and why users should choose you. *   **Target Audience:** Define who you’re building for – their needs, pain points, and aspirations. *   **Call to Action:** Encourage engagement – invite users to learn more, sign up, or try your product.

Here are some starting prompts:  *   “Translate this into English.” *   “Provide a professional translation of this text.” *   “Translate this text accurately and concisely.”

- **正面条件**：
  ```
  masterpiece, best quality, newest, absurdres, highres
  ```

- **负面条件**：
  ```
  text, watermark, worst quality, old, early, low quality, lowres, signature, username, logo, bad hands, mutated hands, mammal, anthro, furry, ambiguous form, feral, semi-anthro
  ```

We will add this to ComfyUI as shown in the figure.

![2025-05-13-12-19-32-image.webp](../../assets/images/2025-05-13-12-19-32-image.webp)

[Tip]
If you want the image to look different, please add (**English prompt! Don't know how to do it, use translation or ask AI!**) to the front and back prompts. For example, to have the foot placed in the foreground and barefoot, add **front prompt**：`barefoot, feet in foreground`.

### Set image dimensions

Here are some recommended resolutions for image generation:  *   **1024x1024:** Offers good detail and is suitable for detailed images. *   **2048x2048:** Provides a higher level of detail and can produce more complex results. *   **512x512:** Suitable for smaller images or when you want to maintain a balance between quality and file size.

NoobAI recommends a resolution of 1024x1024 pixels.
- The most recommended size is 832x1216.
- Please provide the text you would like me to translate. I need the original content to be able to fulfill your request.

![2025-05-13-12-22-06-image.webp](../../assets/images/2025-05-13-12-22-06-image.webp)

![](../../assets/images/ai-wife-8.png)

Please visit the model release page for related resolution recommendations.

### Configuring a K-sampler

Here are the control generation parameters (a good default is fine, if you don’t know, don’t do it).

![](../../assets/images/ai-wife-9.png)

- Seed: Each time is a random value; if fixed and other content remains unchanged, it will always produce the same image.
- The number of iterations required to achieve a consistent and stable image is determined by the AI, with too low a step count leading to ghost images, broken images, or excessive element clutter.
NoobAI recommends: 28-35
- The AI’s obedience to your input prompts is higher the more consistent it is with your instructions, lower the more creative and imaginative it becomes (ignoring some prompts).
NoobAI recommends 4-5
Okay, please provide the text you would like me to translate. I’m ready when you are.
- Sampling Method
NoobAI: (Only use Euler) (❗Important! Cannot change! May cause rendering issues!)
Okay, please provide the text. I’m ready when you are.
- Noise Reduction: The principle of AI image generation involves repeatedly applying noise reduction to an image that appears as a single-color image, resulting in the final output. The setting of this value determines how blurry and mixed the image becomes – lower values produce less clear and mixed images, while higher values result in more sharp and detailed images but also increases the risk of over-sharpening or excessive analysis.

### Live preview

To ensure we don’t get bored during live previews, you can change **实时预览** to **automatic**.

![](../../assets/images/ai-wife-16.png)

### Please provide the text you would like me to translate! I need the content to be translated.

Next, please click on the "Run" button, yes, you can also edit the number next to it once to generate multiple images at a time.

![](../../assets/images/ai-wife-10.png)

Due to the real-time preview feature, you can see the model’s progress step by step.

![](../../assets/images/ComfyUI_UkQQZG4KkW.gif)

Click on the asset above, and expand to view a larger image.

![](../../assets/images/ai-wife-11.png)

All images can be found in the `output` folder.

![](../../assets/images/ai-wife-12.png)

If you want to draw other characters, just: **find LoRA, write recommendation prompts, start running!**

![](../../assets/images/ai-wife-13.png)

![](../../assets/images/ai-wife-14.png)

# Common issues and techniques

- The generated images are highly variable. Try again often!

- Avoid generating NSFW content. Add `NSFW` to negative prompts and `safe` to positive prompts.

- Regarding V prediction models, they are currently only available on SDForge and ComfyUI; the original SD version cannot run, resulting in rendering issues.

- **参考资源**：更多NoobAI模型的技巧可以到Civitai模型页面的About查看
  ![2025-05-13-12-30-55-image.webp](../../assets/images/2025-05-13-12-30-55-image.webp)