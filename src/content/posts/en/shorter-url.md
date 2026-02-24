---
title: "No Server! Learn how to build a short chain service from scratch!"
description: "Do you have a short domain name? No problem, let’s quickly teach you how to build a short chain service from a domain!"
published: 2026-01-09
image: ../../assets/images/shorter-url.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article discusses a new short chain service that utilizes Cloudflare Page/Worker for redirection, along with a strategy to generate short chains through a frontend interface. It highlights the importance of limiting redirects and implementing proper safeguards against misuse, emphasizing the need to avoid direct redirections of the final page to the business domain. The system incorporates a diagram illustrating the architecture.
:::

# Video
Here’s the translation of the text from the provided link:  “The video explores the evolving relationship between humans and AI, examining both the potential benefits and ethical concerns surrounding artificial intelligence development. It delves into various applications of AI, including automation, healthcare, and creative industries, while also addressing issues such as job displacement and algorithmic bias.”

# Demo
https://2x.nz/s

# Please, take the domain!
We require a short domain name to serve as the entry point for our short-chain service.

We can purchase short domain names in these locations, and we recommend extensions like `.nz`, `.mk`, and `.im`. We suggest domain names with a length of 2 to 3 letters.
- [Towards the Future - Spaceship](https://www.spaceship.com/zh/)
- [porkbun.com | A surprisingly delightful and enjoyable experience.](https://porkbun.com/)
- [【】__whois__ -](https://www.quyu.net/)  The best domain registration website depends on your specific needs. Here are some popular options:  *   **GoDaddy:** A well-established and widely used provider. *   **Namecheap:** Known for competitive pricing and excellent customer service. *   **Bluehost:** Often recommended for beginners due to its ease of use. *   **Domain.com:** Offers a range of services, including domain registration and hosting.  To help me recommend the best option for you, could you tell me more about what you’re looking for? For example:  *   What is your budget? *   Do you need specific features (e.g., privacy protection)?

# Basic concept
The Cloudflare Page/Worker configuration file provides redirection functionality based on the content of the redirection file, referencing [this article](/posts/cfpage-redirect/).

We will leverage Cloudflare Workers to update this file and concurrently develop a frontend component that allows users to generate short chains.

# Protection measures
[!CAUTION]
Here’s the translation:  “Ensure that redirection to the final destination is not directly redirected to the business domain.  Configuration of an intermediary page is required, otherwise your domain may be flagged as **abuse/phishing/fraudulent website** in a later review.”
- Redirecting files via static redirection **2000** and dynamic redirection **100** has been restricted.
- The text is limited to a maximum of **1024**.

# Service Architecture Diagram

![](../../assets/images/MermaidChart-Createcomplexvisualdiagramswithtext-2026-01-09-031619.webp)