---
title: "Leverage Cloudflare Page’s redirection feature for lossless, unlimited static reloads!"
description: "Here’s the translation:  Cloudflare’s redirection rules are exceptionally powerful, however, directly utilizing redirection rules for batch redirections can consume significant quotas."
category: "Tutorial"
published: 2025-07-13
image: ../../assets/images/530d7a11-c9ea-45ed-905a-1e3965f3e3b3.webp
tags: [Cloudflare]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Get started quickly!

I am directly transferring my [warehouse](https://github.com/afoim/Redirect_Group).

Follow up the warehouse connection to Cloudflare deployment worker or Page, and then bind your domain name.

![](../../assets/images/0c99399a-5d25-4372-9f9b-79767c32d150.webp)

Following the changes to `_redirects`, please provide the translated text.

![](../../assets/images/f9476b1d-b047-441b-a742-58124032a91b.webp)

例如：

```bash
/ https://www.afo.im/ 301
/test/* https://test.test/test/:splat 302
```

则意味着

Redirect the C:/301 URL to C:/https://www.afo.im.

![](../../assets/images/3f49855c-6835-423d-805c-4758f232d136.webp)

Redirected to `/test/** 302 with a temporary redirect to [C:https://test.test/test/`.

![](../../assets/images/f018f75a-83ae-435e-9fce-d81d331f6d2f.webp)

It has become exceptionally powerful and does not consume redirection rules or worker request counts.