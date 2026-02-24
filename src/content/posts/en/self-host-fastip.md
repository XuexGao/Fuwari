---
title: "都5202年了，还有人不会自建自己的Cloudflare/EdgeOne等各种CDN的优选？"
description: "Here’s a professional translation of the text:  “Choosing a preferred domain for self-managed CDNs offers a straightforward approach – initially, you establish the foundation, followed by subsequent configuration steps. However, numerous pitfalls and potential challenges exist.”"
category: "Tutorial"
published: 2025-07-22
image: '../../assets/images/5df07ad0-01cd-4541-9321-b0ded148a90f.webp'
tags: [优选, CDN]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Okay, please provide the text. I’m ready when you are.

Looking for a premium domain name, we’ll start by selecting those with high quality.

Screened quality IP addresses and updated DNS records for specified premium domain names through major DNS provider vendors.

Okay, please provide the text you would like me to translate.

# How to select high-quality IP addresses?

We absolutely need domestic aircraft to improve our country’s access quality. If we have a NAS, it's already quite good.

If you want three-network coverage, you need a machine with all three telecom, mobile, and unified network capabilities. If you want more advanced regional selection, then bring each province’s three-network machines together.

With a test machine, we now need to write a test script.

Here’s the IP address of a CDN provider: Cloudflare.

We can find Cloudflare IP address ranges using.

![](../../assets/images/9e79e4ab-ce0c-434a-84f7-3b8a9f3a0886.webp)

For other CDNs, they may not directly publish their IP addresses on the website; you will need to contact customer service for assistance.

After receiving IP segments, the next step is to write actual test logic.

I recommend using Curl and Resolve to enforce IP access to a business domain, and checking the return status code is not normal.

Please be careful with this approach, as it could lead to unexpected results. It’s a complex and potentially risky situation.

The TCPing process is becoming increasingly unreliable, particularly with HTTPS connections.  It’s essential to ensure that the IP addresses identified during testing can successfully access your service, preventing downtime.

The traffic shouldn’t be too high, specifically for Cloudflare, which has a CDN with 150w IPs. We can only test the C section, which is to test after completing `104.18.91.0` and then test `104.18.92.0`(...). This will save time as we need to test 5000+ IPs.

Finalized IP selection.

# Connecting Huawei Cloud DNS parsing.

Here’s a translation of the content:  “Why recommend Huawei Cloud?”

Huawei Cloud supports single parsing of 50 IP addresses, multiple same-name resolutions, and only one DNS resolution at a time.

Leveraging Huawei Cloud’s features, personal users can bind several thousand IP addresses below a domain name, even though more IPs are better.

Recommended version, **no real ID required**.

The content is:  “Please provide the full text of the document.”

# Okay, please provide the text. I’m ready when you are.

1. If you are performing three-way optimization, please add a default routing policy to ensure that users experiencing service outages on individual routes do not encounter service outages.

2. Each CDN provider’s IP address may change intermittently, so please monitor frequently and update when necessary.

3. If service anomalies prevent the selection of a preferred IP, please do not implement dangerous logic such as deleting all parsing. This will cause widespread service outages.

4. Choosing a CDN is not the preferred method; using custom CNAMEs or IP addresses can cause your CDN service provider to be unable to properly schedule IPs, resulting in high-quality IPs being continuously targeted. Your CDN provider may take action such as **discontinue your business**, `ban your account` to isolate the attacker. If you believe your site is under attack, please switch to a CNAME or IP provided by the official service.