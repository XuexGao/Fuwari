---
title: "对标CF Worker？拿EdgeOne边缘函数做一个随机图API!"
description: "Early on, I became aware of EdgeOne’s edge function. It wasn't until recently that I had the opportunity to experience it and discovered its considerable power."
category: "Tutorial"
published: 2025-08-01
image: '../../assets/images/6c1b4054-0a9a-42dd-a72b-d179216ac61f.webp'
tags: [EdgeOne]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Please provide the text you would like me to translate.

Go to EdgeOne Edge Function Random Graph API.

``` worker.js const express = require('express'); const app = express(); const port = 3000;  app.get('/', (req, res) => {   res.send('Hello, world!'); });  app.listen(port, () => {   console.log(`Server listening on port ${port}`); }); ```

Deployment to EdgeOne edge function

![](../../assets/images/4274a5c6-c3d5-468b-8c98-d515a0a22762.webp)

`R2_CONFIG`

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

Configure your R2, place a random horizontal image at `ri/h` and `ri/v`. Ensure the path to the images is consistent with the code.

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

Please provide the text you would like me to translate.

![](../../assets/images/33d931d4-e7cd-4d5d-afd8-85b787524391.webp)

# Okay, please provide the text. I’m ready when you are.

Edge function receives approximately 300 million request counts each month, and the cost of exceeding this limit is currently unknown.