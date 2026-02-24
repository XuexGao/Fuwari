---
title: "A seemingly ordinary image—can increasing exposure reveal another image?"
description: "Teach you how to make your own \"Lightning Tank\"!"
category: "Tutorial"
published: 2025-08-04
image: '../../assets/images/2025-08-04-12-05-21-image.webp'
tags: [图片隐写]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This tool embeds one image into another by reducing the visibility of the hidden image to near-black, creating a gray checkerboard pattern. The hidden image remains intact but invisible to the human eye due to extreme darkness. When exposure is increased, the original image overexposes and fades, revealing the hidden image.
:::

# Experience site

> https://imghide.2x.nz/
> 
> Video tutorial: https://www.bilibili.com/video/BV1wdh3zYESe/

# Principle

First, embed the original image, then reduce the brightness of the hidden image to an extremely low level, and embed the original image in a checkerboard pattern.

The finally generated image presents a gray grid-like pattern.

By default, only the original image can be seen; although the hidden image information still exists, it is too dark, and the human eye will only perceive them as black pixels.

When manually increasing exposure, the original image becomes overexposed, tends toward white, and loses information.

And the hidden image is illuminated, gradually becoming visible.

The original image disappears, while the hidden image becomes fully visible.