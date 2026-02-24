---
title: "EO VS ESA, Who is the King of Domestic CDN?"
description: "EdgeOne and ESA are both excellent, free domestic CDN services – they operate very similarly in practice, and today we’ll settle this debate between them!"
published: 2026-01-16
image: ../../assets/images/eovsesa.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Introduction

First, EdgeOne emerged as the earliest, debuting in July of 2025. ESA was established ten months later, opening in October 2025.

Here’s a professional translation of the text:  “EdgeOne initially required redemption codes to obtain free packages, which evolved from early Twitter promotions and then transitioned to official codes obtained through Discord communities.  The process has gradually lowered in complexity, with functionality expanding over time.”

Here’s the translation:  “ESA, being a newer offering, immediately provided each cloud account with a complimentary ESA package. Furthermore, if you require multiple sites to be integrated, leveraging pull-based access can yield additional free ESA packages.”

As of January 26th, 2026, the two firms exhibited significant differences in their experiences. However, the underlying logic within EdgeOne and ESA diverged somewhat.

# Here’s the translation:  Fundamental logical comparison.

EdgeOne’s project, particularly Page, has already demonstrated a nascent stage and utilizes similar functionality to platforms like Cloudflare Page, GitHub Page, and Vercel. However, this initial implementation was hampered by the fact that it originated from Tencent, with limited node availability primarily focused on overseas Singaporean nodes and lacking support for domestic infrastructure.

The ESA likely originated from modifications to older DCDN and Cloud Function FC platforms, with the control panel already exhibiting signs of instability.

![](../../assets/images/eovsesa-1.webp)

# Here’s the translation of “Rules Engine with WAF” into professional English:  **Rules Engine with Web Application Firewall (WAF)**

Many aspects of ESA are directly derived from Cloudflare’s offerings, such as:

![](../../assets/images/eovsesa-3.webp)

![](../../assets/images/eovsesa-2.webp)

Furthermore, all rules (nested rules are considered one rule) have been completely pruned, and the free package only supports 5 rules.

![](../../assets/images/eovsesa-4.webp)

## Here’s a professional translation of “EdgeOne’s advantages”:  “EdgeOne offers several key strengths, including *nsert specific advantages here – e.g., enhanced security protocols, streamlined operations, superior performance metrics*.”

Against EdgeOne, it doesn’t replicate Cloudflare; instead, it has developed a rule engine internally and allows all types of rules to be configured in a single location. Furthermore, these rules can interact with each other.

![](../../assets/images/eovsesa-5.webp)

![](../../assets/images/eovsesa-6.webp)

甚至你还可以对不合法请求在L7给空。（不推荐，规则引擎的假拦截也算正常请求）
![](../../assets/images/1f63e461bfa538605c7734042edd68f6.webp)

![](../../assets/images/eovsesa-7.webp)

![](../../assets/images/eovsesa-8.webp)

### Priority Trap

It’s crucial to note that while you can implement a WAF intercept within an EdgeOne rule engine, the initial traffic will first pass through the rule engine and then be inspected by the WAF. This means if you configure a non-CN (Content Delivery Network) intercept within the rule engine but set it to empty for a foreign IP address, the response will appear as a blank response, and no interception page will be displayed. The traffic will still be recorded.

![](../../assets/images/eovsesa-9.webp)

## ESA’s strategy.

Here’s the translation:  “From ESA, the prioritization of WAF is always the highest. Traffic initially undergoes review through the WAF gateway, and then applied rules. However, free plans do not support region-based filtering within the WAF.”

![](../../assets/images/eovsesa-10.webp)

### Rescue Plan Curve

Here’s a professional translation:  “A solution involving a curve-of-recovery strategy is proposed, wherein initial traffic filtering is implemented, followed by the creation of a whitelist for trusted traffic. This whitelist will then bypass the filter applied to the traffic.”

![](../../assets/images/eovsesa-11.webp)

![](../../assets/images/eovsesa-12.webp)

# Configuration Source Assignment

Following the ESA protocol, Cloudflare is utilized for acceleration, resulting in a default HTTP connection (port 80) when creating accelerated sites. Conversely, HTTPS traffic requires a connection through port 443, necessitating an additional routing rule to switch between these ports.

![](../../assets/images/eovsesa-13.webp)

EdgeOne can configure the server’s back-end port and the back-end host directly during site creation.

![](../../assets/images/eovsesa-14.webp)

# Here’s the translation of “SSL certificate issuance” into professional English:  “SSL certificate issuance” translates to “the process of issuing an SSL certificate.”

Regarding SSL issuance, both companies currently support default CNAME signing. This means you can configure your domain to point to me, and I will then generate an SSL certificate for you. However, EdgeOne’s CNAME signing is performed individually for each site.

![](../../assets/images/eovsesa-15.webp)

Here’s the translation:  “ESA is a unified management system. Please provide me with a DCV, and I will immediately issue you a general domain name. After that, you can use it.”

![](../../assets/images/eovsesa-16.webp)

# Isolation and interconnection are key principles in modern network design.

Here’s the translation:  “The EdgeOne exclusive moment of joint action between the left and right hemispheres is the most significant.”

In the EdgeOne CDN and EdgeOne Pages, the two rules were not compatible – the CDN’s rules applied to CDN operations, while the Page’s rules applied to Page operations. It seems like he wants to implement a wet-dry separation, and I can easily handle that.

## Function truncation.

However, what does “” signify? Why can CDNs perform geographic targeting while Page only specifies IP addresses?

![](../../assets/images/eovsesa-17.webp)

![](../../assets/images/eovsesa-18.webp)

There isn’t a method to bypass CDN rules for Page. However, there are options to mitigate the impact of double traffic:  *   **Implement a full cache:** For purely static pages, creating a complete cache can significantly reduce the load on the CDN and prevent excessive traffic spikes.

![](../../assets/images/eovsesa-19.webp)

# Here’s a professional translation of “Page Service Comparison”:  **Service Comparison of Pages**  This document provides a detailed comparison of different page services, examining key features, pricing models, and performance characteristics.  We analyze the strengths and weaknesses of each offering to help users make informed decisions regarding their preferred page service solution.

Following the ‘Pages’ section.

EdgeOne’s Page provides a direct, localized equivalent to Cloudflare Page. It even bypasses core code and allows for the deployment of Node.js services directly within the Page itself. Notably, Cloudflare Page utilizes only one V8 environment (Umami can also be utilized!), with file sizes under 128MB being suitable for hosting vast amounts of data and files.

![](../../assets/images/eovsesa-20.webp)

ESA Page mirrors the functionality of Cloud Functions FC, though it supports functions. However, it lacks a complete Node.js environment and recently shut down WebSocket support. Furthermore, the number of hosted files and single-file sizes are subject to limitations.

![](../../assets/images/eovsesa-21.webp)

# Speed and limits.

Finally, performance is a key consideration. Utilizing data from multiple sources and self-tests, both CDNs exhibit a gradual rate reduction of approximately 500 KB/s over prolonged periods of single IP traffic. However, for typical business operations, short bursts of high bandwidth can reach up to 50 MB/s, but not consistently for extended durations. Therefore, these two CDNs are less suitable for reverse proxy object storage and large file distribution due to the limitations in speed. Cloudflare offers unlimited throughput for similar needs.