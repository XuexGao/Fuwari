---
title: "No Server! Learn how to build a short chain service from scratch!"
description: "Do you have a short domain name? No problem, I’ll show you how to start building a short chain service from a domain!"
published: 2026-01-09
image: ../../assets/images/shorter-url.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article proposes a solution for creating a short chain service using Cloudflare Page/Worker, leveraging the existing redirection functionality of Cloudflare Pages. It outlines the steps to generate short chains through a user-friendly interface and incorporates security measures to prevent misuse and potential flagging as malicious websites during the redirection process, with restrictions on redirect size and content length.
:::

# Video
https://www.bilibili.com/video/BV1BCi1B7E1q/

# Okay, please provide the text you would like me to translate. I’m ready when you are.
https://2x.nz/s

# Domain!
shortchain.com

We can purchase short domain names at these locations, and we recommend extensions like `.nz`, `.mk`, and `.im`. We suggest domain names with 2 to 3 letters.
- Towards the future – Spaceship
- porkbun.com is an oddly satisfying experience.
- 【趣域网】域名注册网站哪个好_注册域名查询购买_whois信息查询_域名交易网_

# Okay, please provide the text. I’m ready when you are.
Cloudflare Page/Worker’s redirection file provides redirection functionality based on the file itself. Refer to [this article](/posts/cfpage-redirect/).

To update this file with Cloudflare Workers and create a frontend for users to generate short chains, please provide the necessary information.

# Protection measures
[!CAUTION]
Must be configured with an intermediary page to prevent direct redirection to the business domain, or your domain may be flagged as **abuse/phishing/fraudulent website** in the future.
- Redirects are being reconfigured to be dynamic, and dynamic redirects are being implemented for **100**.
- The dog barked loudly at the stranger.

# Service Architecture Diagram

![](../../assets/images/MermaidChart-Createcomplexvisualdiagramswithtext-2026-01-09-031619.webp)