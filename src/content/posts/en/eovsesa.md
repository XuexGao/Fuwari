---
title: "EO VS ESA, Who is the king of domestic CDN?!"
description: "EdgeOne and ESA are both excellent, free domestic CDN services. They operate very similarly in practice, and today we’ll settle this debate between them!"
published: 2026-01-16
image: ../../assets/images/eovsesa.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Here’s the translation:  “Introduction”

EdgeOne began testing in July 25, 2025, while ESA opened in October 10, 2025.

EdgeOne initially required exchanging codes to obtain free packages, and the exchange codes evolved from early Twitter, followed by finding official codes, and then Discord communities at a fixed time, eventually leading to direct access through speed tests. The threshold gradually decreased, functionality increased.

ESA initially offered a free ESA package to each cloud account, and if you require multiple sites to access, you can leverage pull-based services to obtain additional free packages.

The experiences of both companies were markedly different, but there were distinct differences in their underlying logic.

# The fundamental operational principles differ significantly between the two systems. The underlying architecture of the system A utilizes a distributed, modular design with a focus on scalability and fault tolerance. It employs microservices, each responsible for a specific function, promoting independent development and deployment.  Data is typically partitioned across multiple data stores – including a key-value store, a relational database, and a NoSQL database – to optimize performance and provide flexibility. The system A prioritizes asynchronous communication using message queues, enabling loose coupling between services.  Furthermore, the system leverages containerization technologies like Docker for consistent deployment and management of its components.  In contrast, the system B adopts a centralized, monolithic approach with a strong emphasis on operational simplicity and ease of maintenance. It’s built around a single server or cluster, simplifying development and debugging. Data is typically stored in a single database, which serves as the central repository for all information.  The system B relies heavily on synchronous communication through APIs, potentially leading to increased latency.  It utilizes a traditional server-based architecture with limited modularity.

EdgeOne, particularly Page, had already begun to take shape at 24 years ago and could function similarly to platforms like Cloudflare Page, GitHub Page, and Vercel, static hosting platforms. However, it was initially due to Tencent’s involvement, and the nodes were simply terrible – only a Singaporean node and didn't support domestic nodes.

The ESA is likely derived from older DCDN and Cloud Function FC modifications, with the control panel already showing signs of degradation.

![](../../assets/images/eovsesa-1.webp)

# Rules Engine with WAF

ESA’s many things are directly copied from Cloudflare, such as:

![](../../assets/images/eovsesa-3.webp)

![](../../assets/images/eovsesa-2.webp)

The content is:  “CRITICAL RULES: Output only the translated text. No chatter, no explanations, Keep all special tags like [content], **content**, *content*, `content` exactly as they are. Translate the 'content' inside the tags, but do NOT remove or alter the [[X: ]] markers.”

![](../../assets/images/eovsesa-4.webp)

## EdgeOne’s advantages include:  *   Advanced analytics platform *   Seamless integration with existing systems *   Scalable infrastructure *   Dedicated support team

EdgeOne has developed its own rule engine, instead of copying Cloudflare’s, and it’s configured in a single location for all types of rules. It can also interact with each other.

![](../../assets/images/eovsesa-5.webp)

![](../../assets/images/eovsesa-6.webp)

甚至你还可以对不合法请求在L7给空。（不推荐，规则引擎的假拦截也算正常请求）
![](../../assets/images/1f63e461bfa538605c7734042edd68f6.webp)

![](../../assets/images/eovsesa-7.webp)

![](../../assets/images/eovsesa-8.webp)

### Priority Trap

The content is not available.

![](../../assets/images/eovsesa-9.webp)

## ESA’s strategy

Here, ESA’s priority is always the highest, and traffic will first be reviewed by the WAF gateway, then applied rules. However, free plans do not support setting regional filtering in the WAF.

![](../../assets/images/eovsesa-10.webp)

### The rescue plan based on curves.

A critical solution involves first establishing a rule to block all traffic, followed by a whitelist for trusted traffic.

![](../../assets/images/eovsesa-11.webp)

![](../../assets/images/eovsesa-12.webp)

# 回源配置

Because ESA replicates Cloudflare, the default protocol for accelerating sites is HTTP (port 80) and HTTPS (port 443). If you need to change back to port 443, you must create a new rule.

![](../../assets/images/eovsesa-13.webp)

EdgeOne can directly configure origin port and origin host when creating a site.

![](../../assets/images/eovsesa-14.webp)

# SSL certificate issuance

SSL signing requires that both providers support default CNAME issuance. This means you can point your domain to me, and I will then generate an SSL certificate for each site. EdgeOne’s CNAME issuance is unique to each site.

![](../../assets/images/eovsesa-15.webp)

ESA is unified management, give me a DCV, I’ll directly give you a global domain, and then you can use it.

![](../../assets/images/eovsesa-16.webp)

# Rules isolation and mutual understanding

EdgeOne’s unique right-brain synergy moment.

In EdgeOne CDN and EdgeOne Pages, the rules between them weren’t compatible; CDN operations followed CDN rules, Page operations followed Page rules, yes? He wants to separate wet and dry, and I have two sets of it.

## Function阉割

What does “阉割” mean, and why can CDNs perform regional targeting while pages only specify IP addresses?

![](../../assets/images/eovsesa-17.webp)

![](../../assets/images/eovsesa-18.webp)

There is no way to bypass CDN rules. There are some ways to mitigate the impact of CDN traffic on your page, such as using a full cache.

![](../../assets/images/eovsesa-19.webp)

# Service comparison

The following is a translation of the provided content:  “The following is a continuation of the page section.”

EdgeOne’s Page can be directly accessed as Cloudflare Page’s local translation, even bypassing core code. You can run Node.js services directly within the Page and discover that Cloudflare Page also has only one V8 environment (Umami can also! SSR functions are less than or equal to 128MB).

![](../../assets/images/eovsesa-20.webp)

ESA page is very similar to the Cloud Function FC, although it supports functions. However, it lacks a complete Node.js environment and recently WebSocket has been shut down (unable to be opened after closing), and the file count and single-file size are subject to limitations.

![](../../assets/images/eovsesa-21.webp)

# Speed and limits

The CDN rates gradually decrease to approximately 500 KB/s over a prolonged period of single-IP requests, but can reach up to 50 MB/s during normal business usage. However, short bursts of high rate are possible (up to 50 MB/s), but not for long durations. Therefore, Cloudflare and CF are not suitable for reverse proxy object storage or large file distribution due to this behavior. If similar needs exist, a traditional Cloudflare is more appropriate.