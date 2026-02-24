---
title: "Achieve lossless, unlimited static redirects using Cloudflare Pages' redirect feature!"
description: "Cloudflare's redirect rules are very powerful, but creating bulk redirects directly using redirect rules will consume a lot of quota."
category: "Tutorial"
published: 2025-07-13
image: ../../assets/images/530d7a11-c9ea-45ed-905a-1e3965f3e3b3.webp
tags: [Cloudflare]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
Fork the repository and deploy it via Cloudflare Workers or Pages, then bind it to your domain. Modify the `_redirects` file to define custom redirects like 301 or 302 rules. This method is powerful, free from quota limits, and doesn’t consume Worker request counts.
:::

# Get started quickly!

Fork my [repository](https://github.com/afoim/Redirect_Group) directly.

Then connect the repository to a Cloudflare-deployed Worker or Page, and bind your domain.

![](../../assets/images/0c99399a-5d25-4372-9f9b-79767c32d150.webp)

Then modify the file inside `_redirects`

![](../../assets/images/f9476b1d-b047-441b-a742-58124032a91b.webp)

For example:

```bash
/ https://www.afo.im/ 301
/test/* https://test.test/test/:splat 302
```

then means

Accessing `/` returns a 301 permanent redirect to `https://www.afo.im/`

![](../../assets/images/3f49855c-6835-423d-805c-4758f232d136.webp)

Access `/test/** 302 Temporary Redirect to [[C:https://test.test/test/`

![](../../assets/images/f018f75a-83ae-435e-9fce-d81d331f6d2f.webp)

It is already very powerful. Moreover, it does not consume redirect rule quotas or Worker request counts!