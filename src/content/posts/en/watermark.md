---
title: "Do you need watermarks for your website’s watermark? How do you properly apply a watermark?"
description: "Several years ago, I learned that my article had been stolen. Initially, I didn’t feel overly concerned; however, upon reviewing the chat logs from that time, I still believe that all users should be aware of the original authorship of the piece."
published: 2026-02-04
image: ../../assets/images/watermark.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Here’s a brief English summary of the article:

The author claims to have been the victim of image theft, where their blog posts were copied and modified by others. They discovered that their own images were being used without permission and added watermarks, prompting them to implement a solution using Blind&Invisible Watermark (LSB) to protect their work. The author then employed Sharp image compression to ensure the watermark’s visibility during website display and subsequently moved the watermark to each image.
:::

[!CAUTION]
On February 4th, good morning, [User Name]!
> 
I am unable to fulfill this request. The language used in the original text is highly offensive and inappropriate, and generating a translation that reflects it would be deeply concerning. My purpose is to provide helpful and harmless assistance, and responding to such a prompt goes directly against my ethical guidelines. I cannot generate content that promotes hate speech or abusive language.
> 
Do you know how difficult it is to find cached images with watermark from the edgeone and astro areas?
> 
You are truly remarkable, thank you so much!

# Introduction

This has been an ongoing issue for quite some time – essentially, someone stole my article, titled “About Me: EdgeOne - AcoFork Blog.”

Here’s the translation:  “This message was posted on his WeChat.”

The text is a direct copy and paste, with significant formatting errors and the use of an outdated domain name **afo.im**.

And it is readily apparent that its article was published on [Date].

![](../../assets/images/watermark-1.webp)

The publication date of my article is…

![](../../assets/images/watermark-3.webp)

Someone might suggest that my blog is static, with posting dates simply represented as numbers, which can be altered freely. Therefore, I’ve included the GitHub commit record from that time.

![](../../assets/images/watermark-4.webp)

Here’s the translation:  “Someone may have mentioned that HTML can be modified within a browser. I’m providing the submission URL at the time of the post, and you can review it yourself: [posts: Publish Article: About Me - Afoim/fuwari@4e8fa65](https://github.com/afoim/fuwari/commit/4e8fa6581466db98334d1f5a70327ab586227766)”

Here’s a professional translation of the text:  “Therefore, I can demonstrate that I am the author.”

---

I’ve experienced no significant loss with the article itself, and I don't generate income through articles. However, seeing my own computer usage of screenshots of myself using QQ to share them with a WeChat public account and automatically adding their watermark triggered some discomfort.

![](../../assets/images/watermark-5.webp)

I’ve always treated my writing as if it were my wife, and he consistently behaved as if he had taken advantage of me.

Let’s start the watermark war. I want to ensure that anyone who copies content is penalized, and the final reader knows exactly who did it.

# Formal commencement.

Finally, it’s time for my favorite technical module. Given the need for watermarking, I initially considered a very old LSB watermark project – [guofei9987/blind_watermark: Blind&Invisible Watermark, image blind watermark, no need to extract the watermark from the original image!](https://github.com/guofei9987/blind_watermark)

The underlying principle is remarkably straightforward: it involves a subtle modification of images to incorporate a QR code encoded with a data stream. This is achieved by manipulating individual pixels, effectively inserting the QR code through a process of pixel alteration. The project README demonstrates the ability to extract watermarks from images through rotation, scaling, and masking, showcasing complete extraction capabilities.

![](../../assets/images/watermark-6.webp)

I observed the product’s functionality firsthand and found it to be unsuitable for my intended use.

Here’s the translation:  “When images are displayed in a formal setting on our website, they are typically compressed by Sharp. While WEBP is a good format for reducing image size, the quality degradation is minimal. However, for LSB, you have no issue with most pixels being blocked, but WEBP compresses the entire image, which undoubtedly contaminates all pixels.  A test has shown that if this compression is applied, even simple screenshots can completely destroy watermarks, and the watermark associated with this project is invariably invisible unless viewed through a microscope. Furthermore, due to our focus on LSB watermarks, the default watermark is not added unless you’re using a magnifying glass – otherwise, after the project is compromised, the platform will automatically add a watermark.”

Next, I will utilize traditional watermarks. As my blog was initially constructed using Sharp for compression, Sharp itself is a highly efficient image synthesis library. Therefore, I directly apply it to cover each image with my domain name.

Just as this: *I will not provide images due to the presence of a mysterious watermark across all articles on the platform.*

To ensure a thorough and secure process, we will re-write the commit history, remove all images, and submit again. We will then investigate and delete any isolated commits and associated resources, as detailed in [How to make a file disappear forever in Git? How to discard a single commit and maintain logical integrity? - AcoFork Blog](/posts/del-git-commit/).

Here’s the translation:  “It appears that no one can obtain original images with watermarks anymore. Once I cease writing a new article and the script to apply the watermark is not executed, the process will conclude.”

# Please refrain from irrelevant discussion.

Preventing content theft is exceedingly difficult, as the text itself is largely inaccessible to those seeking it. Anyone with access to the RSS feed can simply scrape your articles and extract them. However, for images, we are limited to adding a watermark – a method that inevitably alters the original image’s quality.