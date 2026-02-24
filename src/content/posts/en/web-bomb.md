---
title: "How to put a compressed bomb on your website?"
description: "你知道压缩炸弹吗？就是那种看着人畜无害小小的只有几kb的文件，但是解压后却有高达几十几百G的文件的神秘东西！"
published: 2026-02-14
image: ../../assets/images/web-bomb.png
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Here’s the translation:  “Introduction”
Early on, I received a mysterious website from a friend that kept looping.

Browsers often have a rotating effect, and I’ve been waiting for several minutes before it starts.

The content is not being fetched correctly. The asset is the issue.

The file is 42KB in size and compressed using bzip2, originally formatted as HTML.

Open the F12 control panel, I'm going! How can something have 10 Gs?! No, it’s still loading!

![](../../assets/images/web-bomb.png)

A web compression bomb – it’s back, and I’ve tried to mess with it again today.

Here’s the translation:  “This is a highly compressed and explosive package.”

# Okay, please provide the text. I’m ready when you are.

In modern web pages, servers typically do not provide the original source files (such as .html), but rather offer a compressed file format (such as .br, .gz, or .zstd).

The browser received the file’s content encoding response header value to determine if the asset has been compressed and which decompression algorithm to use.

These measures were implemented primarily to reduce network bandwidth consumption. The compression of web pages typically results in significantly lower bandwidth usage when distributing the compressed files compared to distributing the original files.

You are familiar with compression principles, you should know that compression is essentially deduplication and grouping.

Okay, please provide the text. I’m ready when you are.

The content states that there are 10 zeros present in the input.

```
0000000000
```

We can compress it very simply! Because the file only contains 10 zeros, we can represent them as `10-0,` to indicate 10 zeros. This allows for a simple compression algorithm.

It successfully compressed the source file by 50%, reducing the required storage to 5 units instead of 10.

This is a simple demonstration and does not represent any specific compression algorithm on the market. It’s intended to illustrate how compression works in a basic way.

The file will be compressed into a very small size, but when decompressed, it will release a large file.

!TIP
Zstandard and gzip compress ratios are significantly higher than Gzip, so they are commonly used to create compression bombs. Compression after the source file can achieve remarkable **1:124878.0487804878**.
Please provide the text you would like me to translate.
A 8.20 KB compressed bomb can release up to **10 GB** of files after decompression!

# Please provide the text you would like me to translate.

First, we need to prepare this custom-made explosive, you can manually make it or download it directly from here [eating memory website bombs - Morning Sun's Blog~](https://www.chenxublog.com/2020/11/16/web-bomb-eat-memory.html).

A bomb appears to be harmless to people and animals.

![](../../assets/images/web-bomb-1.png)

Once you have used a decompression tool, you will be able to obtain this large original file.

![](../../assets/images/web-bomb-2.png)

Okay, here’s the translation:  “We are preparing to deploy a compressed payload on the web.”

So where should I put it? It could be anywhere, you just need to ensure.

- The web server can provide a raw compressed explosive file.
- The web server can provide a compression header that indicates the content is properly decompressed.

We provide an example of static hosting for Cloudflare Page/Workers.

首先，将压缩炸弹放到静态资产目录（为了伪装，我这边重命名为了 `index.html` ）
![](../../assets/images/web-bomb-3.png)

Here’s a translation of the content:  “Cloudflare rules are designed to protect your website and data from various threats.”

Due to Cloudflare’s default compression for HTML files, our compressed payload may be re-compressed again by Cloudflare, which could render the compressed payload unusable. Refer to the logic chain illustrated in the image.

原始压缩炸弹.br -> Cloudflare自动压缩（一般为 .zstd） -> 原始压缩炸弹.br.zstd -> 发送给客户端并携带zstd压缩标头 -> 客户端使用 zstd 算法解压得到 原始压缩炸弹.br -> 直接将 原始压缩炸弹.br 作为HTML显示 -> 乱码

Disable Cloudflare’s automatic compression to provide the raw file directly.

![](../../assets/images/web-bomb-4.png)

The content encoding response header will be removed, resulting in a complete download of the content.

Directly display the raw compressed bomb.br as HTML.

We still haven’t achieved our goal, so we need to configure an additional response header rule to force the client to use a br algorithm to decompress our compressed bomb *for the sake of precaution, let the client parse the file type as html to avoid other types causing the client to ignore [[C: Content-Encoding*

![](../../assets/images/web-bomb-5.png)

Absolutely! Here’s the translation:  “We’ve unleashed a powerful compression blast!”

![](../../assets/images/msedge_xYm7TNsMiq.gif)

# The purpose of compressing explosives is to reduce their volume and weight for easier transportation, storage, and handling. This can significantly decrease costs associated with shipping, packaging, and security. It also allows for more compact storage, reducing the risk of damage or loss during transport.

I don’t have any use for that. I can only provide translations.

You are correct. The content is already in English.

# Thank you.

“Eating memory pages like bombs – Morning Sunrise’s Blog”