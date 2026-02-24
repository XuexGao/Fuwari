---
title: "Is Domestic Object Storage Free of Bandwidth Fees? What Exactly is the Cloudflare Bandwidth Alliance?"
description: "The Cloudflare Bandwidth Alliance is a service ecosystem jointly built by multiple cloud service providers. Within designated cloud service providers, if traffic is routed through Cloudflare, no bandwidth charges are applied; users only pay for storage fees."
category: "Record"
published: 2025-07-22
image: '../../assets/images/bf447f03-220b-494b-9f32-da71caa8b43d.webp'
tags: [Cloudflare]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
Cloudflare Bandwidth Alliance CDN（OSS、COS），。Cloudflare“”，。，。
:::

# What is this?

The Cloudflare Bandwidth Alliance is composed of a group of forward-thinking cloud service and networking companies dedicated to reducing or eliminating data transfer (bandwidth) costs for their shared customers.

In plain terms: The Alibaba Cloud OSS and Tencent Cloud COS you purchase can avoid traffic fees by pairing them with CF.

# Which specific services support traffic-free usage?

You may visit [Cloudflare___|Cloudflare China Official Website | Cloudflare](https://www.cloudflare.com/zh-cn/bandwidth-alliance/) to view

As of the date the article was published, these services support

![](../../assets/images/e04c6bee-efc2-4998-83aa-aeacc80e6908.webp)

Here you can see that if you need to transfer 1TB of traffic per month, Cloudflare will save you this much money per month.

![](../../assets/images/3ac81964-bb93-4528-921f-d801a66cb72d.webp)

# How to use?

If you have an Alibaba Cloud OSS instance, normally you need to CNAME it to Alibaba Cloud's Endpoint. If you happen to be using Cloudflare NS servers to host your domain, you only need to enable the "Little Yellow Cloud" feature.

Cloudflare will host your Alibaba Cloud OSS traffic; traffic exiting from Cloudflare will not incur traffic fees.

Based on Alibaba Cloud's policy of free internal storage fees for 5G, you can get free object storage at the 5G level.

# [[X:content]]

Never expose your origin, which is the Alibaba Cloud OSS Endpoint mentioned above. If someone discovers your origin and traffic does not pass through Cloudflare, you will be charged.

Of course, most object storage service providers support configuring private access. For detailed rules and usage methods, please consult the respective customer service.