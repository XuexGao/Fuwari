---
title: "No Server Required! Build Your Own Short Link Service from Scratch!"
description: "Do you have a short domain? No worries if you don’t—right now, I’ll teach you how to build a short-link service starting from a domain!"
published: 2026-01-09
image: ../../assets/images/shorter-url.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article outlines a short-link service using Cloudflare Pages/Workers and GitHub for dynamic URL redirection, with a frontend for user-generated links. It emphasizes security by requiring intermediate pages to avoid domain abuse flags and notes Cloudflare’s file size and redirect limits. The architecture integrates GitHub for updates and Cloudflare for serving and redirecting.
:::

# Video
[[X:content]]

# Demo
[[X:content]]

# Get the domain!
We need a short domain name to serve as the entry point for our short-link service.

We can go to these places to purchase short domain names, recommended suffixes `.nz` `.mk` `.im`, recommended 2-3 character length domains
- [Towards the Future - Spaceship](https://www.spaceship.com/zh/)
- [porkbun.com | An oddly satisfying experience.](https://porkbun.com/)
- [Quyu Net - Domain Registration Website Which Is Best? Domain Registration Inquiry and Purchase, WHOIS Information Lookup, Domain Trading Network - Quyu Net](https://www.quyu.net/)

# Basic approach
The redirect file for Cloudflare Page/Worker provides file-based redirection functionality, refer to [](/posts/cfpage-redirect/)

Next, we will use Cloudflare Worker to connect to GitHub to update this file, and also create a frontend so users can generate short links.

# Protective measures
> [!CAUTION]
> You must not directly redirect to the business domain during the final redirect; instead, you need to configure an intermediate page, otherwise your domain will definitely be reported as **Abusive/Phishing/Fraudulent Website** later on.
- Redirect file limits: static redirection **2000**, dynamic redirection **100**
- Single-line strings should not exceed **1024**

# Service Architecture Diagram

![](../../assets/images/MermaidChart-Createcomplexvisualdiagramswithtext-2026-01-09-031619.webp)