---
title: "Against-Standard CF Worker? Creating a random graph API with EdgeOne’s Edge Function!"
description: "Early on, I became aware of the EdgeOne edge function, and I hadn’t had a chance to fully explore it before today when I started using it, I discovered it is incredibly powerful."
category: "Tutorial"
published: 2025-08-01
image: '../../assets/images/6c1b4054-0a9a-42dd-a72b-d179216ac61f.webp'
tags: [EdgeOne]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article details how to configure the EdgeOne random image API, including specifying a region, service, account ID, and access key for deployment on EdgeOne edge functions. The configuration process involves setting the `R2_CONFIG` object with appropriate parameters for both horizontal (ri/h) and vertical (ri/v) random image paths.  The article also addresses potential limitations regarding request volume, noting that EdgeOne edge function requests are subject to a 300 million monthly limit.
:::

# Formal commencement.

Please visit the [afoim/EdgeOne_Function_PicAPI](https://github.com/afoim/EdgeOne_Function_PicAPI) for a random image API suitable for EdgeOne edge function functionality.

Please provide the code from `worker.js`. I need the code to translate it for you.

Deploy to EdgeOne edge function.

![](../../assets/images/4274a5c6-c3d5-468b-8c98-d515a0a22762.webp)

`R2_CONFIG` set to your own configuration.

```js
var R2_CONFIG = {
  region: 'auto',
  service: 's3',
  accountId: '',
  accessKeyId: '',
  secretAccessKey: '',
  bucketName: ''
};
```

Configure your R2, placing a random horizontal image in the `ri/h` and `ri/v` directories. Ensure the path to the image is identical to that used in the code.

```js
    // 根据路径确定前缀
    var prefix = '';
    if (pathname === '/h') {
      prefix = 'ri/h/';
    } else if (pathname === '/v') {
      prefix = 'ri/v/';
    } else if (pathname === '/') {
```

Accessing C:/h displays a horizontal random image, and accessing C:/v displays a vertical random image.

![](../../assets/images/fe7629b7-2acd-4e84-bd0c-d66ee7a54528.webp)

If you require domain binding, please configure trigger rules.

![](../../assets/images/33d931d4-e7cd-4d5d-afd8-85b787524391.webp)

# 注意

The edge function experiences a monthly request volume of approximately 300 million requests, and the extent to which this exceeds the limit is currently unknown regarding potential fees.