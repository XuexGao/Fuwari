---
title: "How to put a compressed bomb on your website?"
description: "Do you know about compressed files? These are small, seemingly innocuous files – typically under kilobytes – that, when decompressed, can yield substantial amounts of data, ranging from hundreds to several thousand gigabytes."
published: 2026-02-14
image: ../../assets/images/web-bomb.png
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Here’s a summary of the article:

The author discovered that a simple website, when opened, sends a 42kb file compressed as br, which is then not displayed correctly. They used a web compression technique – compressing the original HTML file into a smaller format – to achieve this. This process effectively duplicates the content and then compresses it, resulting in a surprisingly small file size. The author demonstrates how to create a "web bomb" using a simple compression algorithm, showcasing its potential for disrupting website performance by forcing browsers to interpret the compressed content as HTML.
:::

# Introduction
Several years ago, a friend sent me an intriguing website that began to rotate endlessly when I opened it.

Normally, rotating in a browser is resource-intensive; I’ve been waiting for several minutes before it finally stops.

Finally, it was discovered that the issue wasn’t a network request, but rather a problem with the assets provided by the webpage!

The original webpage transmitted a 42KB file via the response header, indicating compression using bzip2. The original format was HTML, followed by…

Open the F12 debugger console. I’m going! This thing has 10 Gs! Wrong! It's still loading!

![](../../assets/images/web-bomb.png)

Following the discovery of this web compression bomb, it’s come to light that I’ve revisited the matter again today, and I’ve attempted to provoke it.

Here’s a professional translation of the text:  “Let's demonstrate how to create a compressed explosive – a ‘blast-off’ device.”

# The core principle.

In modern web applications, servers typically do not provide the original source files (e.g., .html), but instead offer compressed versions of the files (e.g., .br, .gz, .zstd).

The browser responds to the received file by examining the Content-Encoding header value to determine if the asset has been compressed and which decompression algorithm is utilized.

This measure was implemented to reduce network bandwidth consumption, and the compression of web files typically results in significantly lower bandwidth usage compared to distributing the original files.

If you have a basic understanding of compression principles, you’ll recognize that it fundamentally involves removing redundant data and organizing it into meaningful categories.

Using an inappropriate example.

Assuming this is a source file, there are 10 zeros present.

```
0000000000
```

We can easily compress this file by simply having it contain only 10 zeros. We can represent this with `10-0,`. This allows for a straightforward compression algorithm.

It successfully compressed the source file by reducing it to 50% of its original size, resulting in only 5 units instead of 10.

Here’s the translation:  “This is a simplified demonstration and does not represent any compression algorithm found on the market; it's intended solely to illustrate the principles of compression.”

Here’s a professional translation:  “When embedding an extremely large number of zeros within a file, and subsequently compressing it, the resulting compressed file will be significantly smaller, but unpacking it will release a substantial archive.”

[!TIP]
Zstandard compression achieves significantly higher compression ratios than Gzip, making it a common choice for creating "compression bombs" – where the resulting compressed files offer exceptional compression rates, often exceeding 1:1.
> 
A compressed bomb, when decompressed, can release up to **10 GB** of files!

# Practical

We need to prepare a custom-designed compressed bomb, which can be fabricated manually or downloaded directly from here: [Eating Memory's Web Bomb - Morning Sun's Blog~](https://www.chenxublog.com/2020/11/16/web-bomb-eat-memory.html)

Here’s the translation:  “We are now receiving a compressed explosive device – it appears to be harmless to people and animals.”

![](../../assets/images/web-bomb-1.png)

Using a stress relief tool, we can obtain this massive original file after the decompression process.

![](../../assets/images/web-bomb-2.png)

Okay, we will deploy this compressed bomb onto the web and set up a compression header accordingly.

Therefore, where should it go? It’s okay with anything – you just need to ensure…

- Here’s the translation:  The web server can provide access to raw compressed explosive files.
- A web server can provide a client with a compression header that enables normal decompression of the compressed data **Normally decompressed compression headers**.

Here’s the translation:  We provide a practical example of static hosting using Cloudflare Page/Worker.

首先，将压缩炸弹放到静态资产目录（为了伪装，我这边重命名为了 `index.html` ）
![](../../assets/images/web-bomb-3.png)

Here’s the translation:  “Next, revise Cloudflare rules to ensure they provide clients with a standardized header.”

Due to Cloudflare’s default compression for HTML files, our compressed data will be further compressed by Cloudflare, potentially rendering the compressed data unusable.  See the logical chain illustrated in the image.

Cloudflare Automatic Compression (typically using .zstd) -> Raw Compressed Bomb.br.zstd -> Sent to client and carries the zstd compression header -> Client decompresses the raw compressed bomb.br -> Displays the raw compressed bomb.br directly -> Encoded.

The current method is not yielding the desired results, so we must first disable Cloudflare’s automatic compression and allow the files to be served directly.

![](../../assets/images/web-bomb-4.png)

Due to Cloudflare’s automatic compression disabling, the response header `Content-Encoding` will also be removed. Consequently, if a client requests data, this results in the following:

The provided text is a corrupted HTML snippet, likely representing a compressed data file. It’s essentially a mess of code and should not be displayed directly.

We have yet to achieve our objectives, necessitating the implementation of additional response header rules to ensure that clients parse our compressed data using the BR algorithm. This is in place to prevent other content types from causing the client to misinterpret the file type and thus avoid potential issues with encoding.

![](../../assets/images/web-bomb-5.png)

We successfully accessed our compressed payload, and the client is now fully integrated.

![](../../assets/images/msedge_xYm7TNsMiq.gif)

# The purpose of compressing explosives is to reduce their volume, thereby decreasing the weight and size of the device, facilitating easier transportation and storage. It also minimizes the risk of accidental detonation due to reduced sensitivity.

I have no use for it; I can only be used to fry your friend’s browser.

Using this method effectively can mitigate WAF attacks, however, for bandwidth-sensitive CDNs, it’s recommended to revert to the CDN's built-in filtering mechanism to avoid CDN misidentification *you haven’t taken adequate protection*

# Thank you.

Here’s the translation:  “Memory Bytes: A Web Bomb by Morning Dawn”