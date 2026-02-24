---
title: "Comparison of Advantages and Disadvantages of N CDN/Static Hosting Service Providers"
description: "There are many serverless services, and static hosting is particularly important. Let's see which one is the most stable and fast."
category: "Record"
draft: false
image: ../../assets/images/da8b7a38-7247-43af-b272-f012f2dd024d.webp
lang: en
published: 2025-07-14
tags:
- Vercel
- Cloudflare
- Netlify
- EdgeOne
- Github
- Render
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
Netlify CDN，。Vercel 、，IPv4。EdgeOne CDN ，，，。Cloudflare ，。Render 。GitHub Pages GitHub Action，，。
:::

# [Netlify](https://www.netlify.com)

High registration threshold, requires Google email for registration. Supports IPv6 backsource. Usage limits are relatively lenient, with only bandwidth and build time restrictions. **I think this is the fastest CDN among free plans, and it has very few restrictions!**

> Note that build time is limited monthly. However, the traffic limit is more lenient.

![](../../assets/images/282ad19c-f971-4f92-9096-6e75308205c5.webp)

Since the nodes are not pingable, the Tcping results are used here to show the status.

**Recommended CNAME:** apex-loadbalancer.netlify.com

![](../../assets/images/e11f4d07-4135-411e-943e-cf27690bc9c7.webp)

# [Vercel](https://vercel.com)

Zero cost to use. Registration has no barriers, with good latency. Usage limits are relatively strict. Only supports IPv4 for origin. The default `*.vercel.app` will be blocked by SNI within China and requires binding your own domain.

> Vercel can build 100 times per day, with each build lasting no more than 45 minutes.

**Recommended IP:** 76.76.21.21

![](../../assets/images/14654577-5c25-4136-bb06-9e10d1945ae2.webp)

![](../../assets/images/eb1ef62c-f50c-4f89-a287-c74e18353b9c.webp)

# [EdgeOne CDN](https://edgeone.ai)

Currently in internal testing, requires a redemption code. Obtain it by visiting [Tencent Cloud EdgeOne Free Plan Redemption Code - Experience Now](https://edgeone.ai/zh/redemption). No traffic or request limits apply.

![](../../assets/images/ed25c33f-5719-44b5-844e-62ac73eadfef.webp)

Support **Advanced Origin Settings**

![](../../assets/images/a1517d8e-1664-4819-ba08-d78ae13299a4.webp)

## Global Availability Zones (excluding Mainland China)

> The CDN currently used by my blog

The default provided CNAME has generally poor latency. The diagram below uses my HK preferred option: eo.072103.xyz (Note: EdgeOne Page is unavailable)

![](../../assets/images/b2937ed2-0f8d-4179-a9b5-b465902ca9ab.webp)

## EdgeOne CDN Availability Zones in Mainland China

Real-name authentication is required, and domain name filing is required.

Default CNAME is available

![](../../assets/images/c44674d3-d37e-4f00-a7ee-cdac7798b293.webp)

# [Cloudflare](https://www.cloudflare.com/)

No limits on traffic or request counts. **Cannot be killed**

[Click me to view preferred domains](/posts/record/#cloudflare-%E4%BC%98%E9%80%89%E5%9F%9F%E5%90%8D)

The following diagram uses my: fenliu.072103.xyz

![](../../assets/images/f0785c5d-b31a-40d1-9da9-ac50a94f6b0a.webp)

# [Render](https://render.com)

Registration is simple, with strict usage limits.

![](../../assets/images/0bccb1b9-3fe1-49f0-a255-0805fc0ee35c.webp)

![](../../assets/images/2b6104d5-9cee-4e2b-adb5-9aefe02240d2.webp)

# [Github Page](https://pages.github.com/)

GitHub Actions are required for deployment. **Most regions in mainland China will intermittently block access**, so it is not recommended to use.

![](../../assets/images/efccadbf-bc70-4444-bb48-8399cf881617.webp)