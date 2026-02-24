---
title: "Public Architecture, How My Two-Dimensional Random Graph API Works"
description: "Here’s the translation:  “Many of my peers have also expressed interest in building their own random graph API. I am now making this architecture public, after two years of development and refinement – it’s intended to be a valuable resource for everyone.”"
published: 2025-09-06
image: '../../assets/images/2025-08-31-04-09-37-image.webp'
tags: [随机图API]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article discusses a new API endpoint for retrieving images from Cloudflare R2, leveraging EdgeOne Pages Functions. It highlights the availability of Webp images and the free nature of the functionality, with an emphasis on the ease of use via the `eopf` service. The code is available for further exploration through the `afoim/EdgeOne_Function_PicAPI` repository.
:::

# API端点

Portal: https://pic.072103.xyz

The API endpoints located within the portal are:  *   https://hpic.072103.xyz *   https://vpic.072103.xyz (CF Worker)

API endpoint for blog use: https://eopfapi.acofork.com/pic?img=ua (EdgeOne Pages Functions)

# New version implemented.

The EdgeOne Page provides the entry point for requests. Upon receiving a request, it first distinguishes between horizontal, vertical, and adaptive modes, as indicated by `?img=h`, `?img=v`, and `?img=ua`. Subsequently, it returns the corresponding image from its internal storage. For more details, please refer to the source code: [EdgeOne_Function_PicAPI/functions/pic.js at main · afoim/EdgeOne_Function_PicAPI](https://github.com/afoim/EdgeOne_Function_PicAPI/blob/main/functions/pic.js)
# The legacy implementation.

Leveraging cnb.cool for image processing and EOP (Embedded Object Processing) as an intermediary.
# The legacy version is outdated.

Here’s the translation:  “Cloudflare R2 has been compromised with over 7 million GET requests, resulting in a charge of approximately 207.93 CNY.”

The source data is entirely located at **Cloudflare R2**, utilizing the Webp format, categorized as **Horizontal/Vertical**. As illustrated in the image.

![](../../assets/images/2025-08-31-04-13-08-image.webp)

![](../../assets/images/2025-08-31-04-13-17-image.webp)

I’ve successfully integrated the API for image retrieval at https://eopfapi.acofork.com/pic?img=ua.

The domain name can be accessed, and it’s a **EdgeOne Pages Functions** service (hereinafter referred to as **eopf**). What is it? Of course, it’s because! **All features are completely free!**

![](../../assets/images/2025-08-31-04-18-45-image.webp)

The code is designed for the EdgeOne edge function random graph API.

The system utilizes the B:eopf connection to link with B:Cloudflare R2, and then randomly selects a graphic for presentation. Indeed, it’s remarkably straightforward!

Here’s the translation:  “The principles behind the other CF worker endpoint are identical, with the R2 connection to S3 being handled internally. No further manual implementation is required.”