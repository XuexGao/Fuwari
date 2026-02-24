---
title: "Public Architecture, How My Two-Dimensional Random Graph API Works"
description: "Here’s a professional English translation of the text:  “Many of my peers have expressed interest in building their own random graph API. I am now publicly sharing my architecture, which has been refined over two years. This resource is intended for further exploration and reference.”"
published: 2025-09-06
image: '../../assets/images/2025-08-31-04-09-37-image.webp'
tags: [随机图API]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Okay, please provide the text you would like me to translate. I’m ready when you are.

Portal: https://pic.072103.xyz

Portal API endpoints: https://hpic.072103.xyz and https://vpic.072103.xyz (CF Worker)

API endpoint: https://eopfapi.acofork.com/pic?img=ua

# New version implemented.

EdgeOne Page functions serve as the entry point, and first distinguishes between horizontal, vertical, and adaptive screens – `?img=h` `?img=v` `?img=ua`. Subsequently, it returns the corresponding image from its internal storage. For more details, please refer to the source code: [EdgeOne_Function_PicAPI/functions/pic.js at main · afoim/EdgeOne_Function_PicAPI](https://github.com/afoim/EdgeOne_Function_PicAPI/blob/main/functions/pic.js).
# The old version implementation

Using CNB.Cool as an intermediary proxy for EOP images.
# Old-style implementation

Cloudflare R2 was compromised with 70 million requests and resulting in a charge of 28.08 USD (equivalent to approximately 207.93 CNY). It has been discontinued.

The Cloudflare R2 images are all taken using Webp format, with the image being categorized as horizontal and vertical.

![](../../assets/images/2025-08-31-04-13-08-image.webp)

![](../../assets/images/2025-08-31-04-13-17-image.webp)

The API is being used to input images.

The EdgeOne Pages Functions service (hereinafter referred to as eopf) is what? Why do we use it? Of course, because! It’s completely free for everyone!

![](../../assets/images/2025-08-31-04-18-45-image.webp)

The EdgeOne edge function random image API is suitable for EdgeOne edge functions.

The Cloudflare R2 image is randomly selected.

The principle of another CF worker endpoint is identical, but R2 internal connections are no longer required to handle S3 authorization.