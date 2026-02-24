---
title: "Do you need watermarks for your website’s watermark? How do you get a watermark that works effectively?"
description: "“I recently learned that my article was stolen. At the time, I didn’t really worry much about it; however, today I discovered a chat log from that period and still feel compelled to inform all users of the original source of the article.”"
published: 2026-02-04
image: ../../assets/images/watermark.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

[!CAUTION]
February 4th, 2xss hello!
Please provide the text you would like me to translate.
You’ve added several stickers and are not backing up your code. You should also send a pull request to GitHub, forcing push, and email the team members.
Please provide the text you would like me to translate.
Does it take several copies of the original image with no watermarks from the edgeone and astro areas?
Please provide the text you would like me to translate.
You really did a great job!

# Here’s the translation:  “Introduction”

Someone stole my article, “[About me tinkering with EdgeOne - AcoFork Blog]”.

“He shared his thoughts and insights on WeChat Moments.”

The content is entirely copied and formatted incorrectly, and the image is also using my images.

The article was published on [date].

![](../../assets/images/watermark-1.webp)

And when was your article published?

![](../../assets/images/watermark-3.webp)

Someone might say that the blog post date is just a series of numbers, and can be changed freely. However, I have included the GitHub commit record from that time.

![](../../assets/images/watermark-4.webp)

Here’s the translation of the content:  “Someone might have said that HTML in browsers can be modified. I'm providing the submission URL from when the post was created: [posts: 发布文章：关于我折腾了一晚上 EdgeOne（ps：腾讯云我草泥马😅） · afoim/fuwari@4e8fa65](https://github.com/afoim/fuwari/commit/4e8fa6581466db98334d1f5a70327ab586227766)”

Okay, I understand. Please provide the text.

Okay, please provide the text. I’m ready when you are.

The theft of an article didn’t yield much, and I don’t earn money through it myself. However, seeing my own computer usage of screenshots of the article being shared on a WeChat public account with its watermark triggered some annoyance.

![](../../assets/images/watermark-5.webp)

I treat my articles like my wife, and he always acts as if he’s been taken by NTR.

So, let’s start the war – make it so that anyone who steals content gets to steal it, and the final reader should know who did it.

# Please provide the text you would like me to translate.

Finally, it’s time for my favorite technical step – so I thought of a very old LSB watermark project: [guofei9987/blind_watermark: Blind&Invisible Watermark, image blind watermark, no need to extract the watermark from the original image!](https://github.com/guofei9987/blind_watermark)

Its principle is remarkably simple: to make a subtle modification to an image, by altering pixels to insert a coded QR code. Due to the QR code’s inherent resistance to interference, and the presence of numerous standard pixel points in a normal image, this project README demonstrates how to extract watermarks from rotated, scaled, and obscured images.

![](../../assets/images/watermark-6.webp)

I examined it on-site and found it wasn’t very suitable.

Sharp compresses images in the official website before they can be displayed, even though WEBP is a good format that significantly reduces image size. However, for LSB, you don’t have any issues with most pixels being blocked, but WEBP performs compression across the entire image, which undoubtedly "pollutes" all pixels. An audit has shown that once compressed, even simple screenshots can completely destroy watermarks, and this project is specifically focused on LSB watermarks, so the default watermark is invisible unless you use a microscope, otherwise, the article will be stolen, and the platform’s default watermark will disappear as well.

The content is being overlaid on every image using Sharp, a highly efficient image synthesis library.

The mysterious watermark appears on all pages of the site.

Rewrite the repository history commit, removing all images and re-uploading it in a subsequent commit.  Also, identify and remove isolated commits and resource files on GitHub. Refer to [How to make a file disappear in Git commit history? How to discard a commit and maintain logical integrity? - AcoFork Blog](/posts/del-git-commit/).

The image is no longer watermarked. Once I stop writing new articles, the watermark will be removed.

# Please provide the text you would like me to translate.

Making content private is impossible; anyone can access it through RSS feeds. However, for images, we only have a watermark method, which can make the original clean image slightly marred.