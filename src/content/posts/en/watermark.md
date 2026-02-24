---
title: "Do you need a watermark for your website? How to apply a watermark effectively?"
description: "Very early on, I learned that my article had been stolen, and at the time I didn’t think much of it. Today, when I revisited the chat logs from back then, I still feel that even if the article was stolen, all users who read it should know who the original author was."
published: 2026-02-04
image: ../../assets/images/watermark.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The author recounts how their blog post about EdgeOne was stolen and republished on a WeChat public account with unauthorized watermarks and altered metadata. In response, they implemented a domain-based watermarking system using Sharp for all images and rewrote Git history to remove unwatermarked originals. While acknowledging that text content is easily stolen, they emphasize that watermarking images is the only practical defense against unauthorized reuse.
:::

> [!CAUTION]
> Hello from 2xss on February 4th
> 
> You damn well add a few watermarks, don't even backup, still drop and force-push to remote, and damn it, send an email to GitHub asking them to GC
> 
> Do you know how difficult it is for Laozi to find watermark-free original images cached from `.edgeone` `.astro` today?
> 
> You're really something, give me Gui Xia!

# Preface

This happened a long time ago; in short, someone stole my article: [EdgeOne - AcoFork Blog](https://acofork.com/posts/edgeone/)

This is what he posted on his WeChat public account: https://mp.weixin.qq.com/s/F4R6FtJmyHEaKkeMDI6IDw

You can see, the article is simply copied verbatim, and there are many obvious formatting errors, and even the images used are mine; you can even see the ancient domain **afo.im**

And it is not difficult to find that its article publication date is

![](../../assets/images/watermark-1.webp)

while my article's publication date is

![](../../assets/images/watermark-3.webp)

Someone might say that, as a static blog, the publication date is just a string of numbers that can be arbitrarily changed. Then I will show you the commit history from GitHub at that time.

![](../../assets/images/watermark-4.webp)

Some people might also say that the HTML in the browser can be modified; I will provide the submission URL at that time, which you can check yourself: [posts: ： EdgeOne（ps：😅） · afoim/fuwari@4e8fa65](https://github.com/afoim/fuwari/commit/4e8fa6581466db98334d1f5a70327ab586227766)

Alright, then at this point I should be able to prove that I am the original author.

---

Actually, the stolen articles aren’t a big deal; I don’t make money from articles anyway. But when I see screenshots I took myself using QQ on my own computer being posted on a WeChat public account with his watermark added by default, it really bothers me.

![](../../assets/images/watermark-5.webp)

I have always regarded my articles as my wife; when he does this, it’s as if I’ve been NTR’d.

Then let the watermark war begin. I want to ensure that even if someone steals my articles, the final reader will still know exactly who created them.

# Formally begin

Finally, it's time again for my favorite technical segment. Since we're going to add a watermark, the first thing that comes to mind is an extremely old LSB watermark project: [guofei9987/blind_watermark: Blind&Invisible Watermark ，，！](https://github.com/guofei9987/blind_watermark)

Its principle is very simple: make very subtle changes to the image by modifying pixels to embed an encoded QR code. Since QR codes are inherently resistant to interference, and a normal-resolution image contains a large number of pixels, the project's README demonstrates that even after rotating, scaling, or partially obscuring an image with a watermark, the watermark can still be fully extracted.

![](../../assets/images/watermark-6.webp)

I immediately took it off to check and try it out, only to find that it wasn't very suitable.

Firstly, my images are compressed by Sharp before being officially displayed on the website. Although WEBP is a great format, as it can significantly reduce image size while only slightly degrading quality, for LSB (Least Significant Bit) watermarking, completely obscuring most pixels is not an issue. However, WEBP compresses the entire image, inevitably "polluting" all pixels. In practice, once compressed—even simple screenshotting can completely destroy the watermark. Moreover, since this project focuses on LSB watermarking, the default watermark added is invisible unless you're using a microscope. Once your article is stolen, even if the platform adds a default watermark, your original watermark will vanish without a trace.

Next, I will try using a traditional watermark. Since my blog itself uses Sharp for compression during its construction, and Sharp is also an efficient image processing library, I will directly use it to overlay my domain name as a watermark on every image.

Like this: *There's no need to include a picture here, as, by principle, all articles on the site currently have this mysterious watermark*

This should be it, but for rigor, to prevent malicious individuals from digging through our historical commits on GitHub, we should rewrite the repository's commit history, delete all images, and then re-commit them in this submission. Additionally, we should request GitHub to delete orphaned commits and resource files. See: [How to make a file permanently disappear in a Git commit? How to discard one commit while maintaining logical integrity? - AcoFork Blog](/posts/del-git-commit/)

By now, no one else should be able to obtain the watermark-free original image, as long as I don't forget to run the watermarking script after finishing new articles. End

# Off-topic

It is impossible to prevent articles from being stolen; for text content, there is almost nothing we can do, as malicious individuals can simply scrape RSS feeds to obtain your articles. As for images, we only have watermarking as a solution, although this may make originally clean images look a bit messy.