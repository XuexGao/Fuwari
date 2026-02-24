---
title: "Benchmarking against Cloudflare Workers? Build a Random Graph API with EdgeOne Edge Functions!"
description: "I’ve known about EdgeOne edge functions for a long time but never got around to experiencing them. After trying them out today, I found they are truly powerful."
category: "Tutorial"
published: 2025-08-01
image: '../../assets/images/6c1b4054-0a9a-42dd-a72b-d179216ac61f.webp'
tags: [EdgeOne]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide explains how to deploy a random image API using EdgeOne Edge Functions, requiring configuration of R2 storage credentials and image paths for horizontal (`/h`) and vertical (`/v`) images. Users must replace placeholder values in the code and ensure image files are stored under matching prefixes in R2. Domain binding and request limits (30 million monthly) are also noted.
:::

# Formally begin

Go to [afoim/EdgeOne_Function_PicAPI: Random Graph API for EdgeOne Edge Functions](https://github.com/afoim/EdgeOne_Function_PicAPI)

Copy `worker.js` code

Deploy to EdgeOne Edge Function

![](../../assets/images/4274a5c6-c3d5-468b-8c98-d515a0a22762.webp)

Set `R2_CONFIG` at the beginning of the code to your own

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

Configure your R2 to place the landscape random image at `ri/h` and `ri/v`. Ensure the paths match those in the code.

```js
    // 根据路径确定前缀
    var prefix = '';
    if (pathname === '/h') {
      prefix = 'ri/h/';
    } else if (pathname === '/v') {
      prefix = 'ri/v/';
    } else if (pathname === '/') {
```

Accessing `/h` displays a random landscape image in landscape orientation, accessing `/v` displays a random landscape image in portrait orientation

![](../../assets/images/fe7629b7-2acd-4e84-bd0c-d66ee7a54528.webp)

If domain binding is required, please set up trigger rules.

![](../../assets/images/33d931d4-e7cd-4d5d-afd8-85b787524391.webp)

# Attention

The Edge Function has a monthly request limit of 30 million, and it is currently unknown whether charges apply if this limit is exceeded.