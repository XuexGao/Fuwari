---
title: "How to place a ZIP bomb on your website?"
description: "Do you know about zip bombs? They're those mysterious things that look harmless—tiny files, only a few KB in size—but when decompressed, they explode into files that can be hundreds or even thousands of gigabytes!"
published: 2026-02-14
image: ../../assets/images/web-bomb.png
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article explains how to create and deploy a "web compression bomb"—a small compressed file that, when decompressed by a browser, explodes into an enormous file, causing browser slowdown or crash. It demonstrates the technique using tools like Cloudflare Pages, requiring disabling automatic compression and manually setting the `Content-Encoding` header to force decompression. While primarily a prank or demo, it highlights potential misuse for DDoS-like attacks, though it’s not practical for real-world exploitation due to browser and CDN defenses.
:::

# Preface
Long ago, a friend of mine sent me a mysterious website; once opened, it just kept spinning.

But normally, the browser's loading spinner has a timeout; I waited for several minutes, but it was still spinning.

Finally, it turned out not to be an issue with the network request, but with the assets provided by the webpage!

The original webpage sent a 42kb file, informing the browser via the response header that it was compressed with br, in its original HTML format, and then...

Open the F12 console, wow! How come this thing is 10GB! No, wait! It's still loading!

![](../../assets/images/web-bomb.png)

Then I later found out that this was a web compression bomb, and today I remembered this incident, so I tried messing around with it again.

Next, I'll show you step by step how to make this compressed bomb!

# Principle

In modern web pages, servers typically do not provide original source files (such as .html), but instead provide compressed files (such as .br, .gz, .zstd).

After receiving the file, the browser determines whether the asset is compressed and which decompression algorithm to use based on the value of the `Content-Encoding` response header.

This measure was originally intended to save network bandwidth; distributing compressed web pages typically consumes significantly less bandwidth than distributing uncompressed files.

If you have a slight understanding of compression principles, you should know that compression is essentially deduplication plus categorization.

With an admittedly inappropriate example

If this is the source file, there are a total of ten 0s.

```
0000000000
```

If we want to compress? It's very simple! Since the file consists of only ten 0s, we can write it as `10-0,` to represent ten 0s, thus achieving a simple compression algorithm.

It successfully compressed the source file by 50% (the source file required 10 units for storage, but only needs 5 units after compression).

*This is merely a simple demonstration and does not represent any compression algorithm available on the market; it is intended solely for a basic understanding of "how compression is implemented"*

So, what if we stuff an extremely large number of zeros into a file, then compress it, resulting in a very small compressed file? But when decompressed, it would unleash an enormous file!

> [!TIP]
> zstd and br achieve much higher compression ratios than gz, so they are generally used to create compression bombs, with compression ratios reaching astonishing **1:124878.0487804878**
> 
> A **8.20 KB** compressed bomb that, when decompressed, can release up to **10 GB** of files!

# Hands-on

First, we need to prepare this specially designed compressed bomb; you can make it manually or download it directly from here [Memory-Eating Web Bomb – Chen Xu's Blog~](https://www.chenxublog.com/2020/11/16/web-bomb-eat-memory.html)

Next, we get a compression bomb, which appears harmless to humans and animals.

![](../../assets/images/web-bomb-1.png)

After using a decompression tool to decompress, we can obtain this large original file.

![](../../assets/images/web-bomb-2.png)

OK, next we just need to place this compression bomb on the web and set the compression headers accordingly.

So... where should I put it? Actually, anywhere works; you just need to make sure

- Web servers can provide **original compressed bomb files**
- Web servers can provide clients with a compressed bomb **a compressed header that can be normally decompressed [[C:Content-Encoding**.

We take Cloudflare Page/Worker's static hosting as an example.

First, place the compressed bomb in the static assets directory (for, I renamed it here to `index.html`).
![](../../assets/images/web-bomb-3.png)

Next, edit the Cloudflare rules to allow the client to receive the header we expect.

Since Cloudflare automatically compresses HTML files by default, our compression bomb will be compressed again by CF, which will cause the compression bomb to fail. Please refer to the logical chain in the diagram below.

Original compressed bomb.br -> Cloudflare automatic compression (usually .zstd) -> Original compressed bomb.br.zstd -> Sent to client with zstd compression header -> Client decompresses using zstd algorithm to get Original compressed bomb.br -> Directly displays Original compressed bomb.br as HTML -> Garbled text

This would be ineffective, so we first need to disable Cloudflare's automatic compression to allow it to serve the original files directly.

![](../../assets/images/web-bomb-4.png)

Next, since Cloudflare's automatic compression is disabled, the `Content-Encoding` response header will also be removed; at this point, if the client fetches it, the result will be as follows

Original compressed bomb.br -> Display original compressed bomb.br directly as HTML -> Garbled text

We have still not achieved our goal, so we need to configure an additional response header rule to force the client to decompress our compression bomb using the BR algorithm *For safety, here we force the client to parse the file type as HTML to avoid other types causing the client to ignore [[C:Content-Encoding*.

![](../../assets/images/web-bomb-5.png)

Next, try accessing again—unless something goes wrong, the client will successfully trigger our compression bomb!

![](../../assets/images/msedge_xYm7TNsMiq.gif)

# What is the use of a compressed bomb?

Not useful, it can only be used to crash your friend's browser.

If you want to use this method as an alternative to WAF interception, it does work; however, for bandwidth-sensitive CDNs, it is still recommended to return the CDN's own interception page to avoid misjudgment by the CDN *You haven't done proper protection*.

# Acknowledgments

[Memory-Eating Web Bombs – Chen Xu’s Blog~](https://www.chenxublog.com/2020/11/16/web-bomb-eat-memory.html)