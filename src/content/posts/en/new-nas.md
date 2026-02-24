---
title: "I bought a new NAS..."
description: "You might not know that I once purchased a N100 mini PC, which I later sold, but now I’ve bought it again—why is that?"
category: "Notes"
draft: false
image: ../../assets/images/b8b7d06a-1ca4-4786-a147-5275f57dfb3b.webp
lang: en
published: 2025-02-23
tags:
- NAS
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The author bought a small x86 PC years ago to serve as a 24/7 home server for running bots and Linux experiments, not primarily as a NAS due to limited storage options. Later, they sold it after impulsively buying a Mac Mini (which was incompatible with their use cases) and eventually purchased a high-performance smartphone. Now, they’re back into the hobby, buying a new NAS and planning to spend nights tinkering, admitting they’ve been too busy to write for a long time.
:::

# Why did I buy a NAS so long ago (? Doubtful

This is actually a commonly discussed issue, just like when you ask me why I started blogging—I can only give you one answer: I wanted to do it.

Well, well, this answer might be too superficial. If I think about it carefully, I should say that at the time, I already had quite a bit of theoretical knowledge and practical experience with Linux (through cloud servers), so I wanted to set up my own 24/7 always-on small computer at home to play with (my home cloud).

At first, I simply used it to host QQBot, which was originally the very thing I wanted to do most, because if I were to spend money on domestic cloud servers to host the bot, it would be too expensive, while foreign servers have high latency. Using my own phone or computer was a great option — my friend had once used Shamrock (???) to host a bot. However, this didn’t work for me. At that time, all my devices (including my phone, tablet, and computer) were each serving their own purposes and had to accompany me daily, so they couldn’t stay on 24/7. I couldn’t possibly say that my computer, phone, or tablet would go offline if they lost internet connection — and I also strongly disliked using personal devices as servers, just like how you’d leave Stable Diffusion running in the background while playing Honkai: Star Rail ~~ (and it doesn’t align with the Unix philosophy) ~~.

Actually, I've long used an old phone + Termux to achieve a home cloud effect, but because the phone's chip is Arm64, while most operations and maintenance software is AMD64 (x86) architecture. For open-source software, it's not a big deal—just need to compile a version yourself ~~(or use GitHub Actions to compile)~~ and you can use it.
But for me, who frequently works with cloud servers, I still prefer the plug-and-play convenience of the x86 architecture, as I can also install some operation and maintenance management panels to assist in use.

Then there's only one solution: buy an x86 mini PC. You may have noticed that I've talked for so long about why I want to buy an x86 mini PC for home cloud use, yet I never mentioned the word "NAS" at all. Why is that? As the saying goes, "When one is well-fed and warm, one thinks of indulgence."

If you simply spent a lot of money buying a home cloud device and left it gathering dust, that absolutely wouldn't do. So during that period, I started tinkering every day, but in reality, that little computer wasn't suitable to be used as a NAS. As we all know, NAS stands for Network Attached Storage in Chinese. Since it's network-attached **storage**, what must it necessarily do? Ah yes! Stuff it full of drives! But in reality, that little computer only had one M.2 and one SATA slot, and the M.2 slot was already used as the system drive, while the SATA slot could only accommodate 2.5-inch hard drives.

In plain terms, this is absolutely not a NAS. Is a single-bay device even considered a NAS? It’s just a home cloud with relatively large storage capacity. By now, you might be wondering, “Then why would you buy it?” Well, you wouldn’t know unless you’ve experienced it yourself. I once bought an ASUS dual-core laptop in 2017, and at that time, this “intellectual tax” laptop came with a 2.5-inch mechanical hard drive of 512GB. Although this machine couldn’t do RAID or fit multiple drives ~~(Actually, it could—later, I used an external hard drive enclosure connected via USB to create an extremely unstable RAID0)~~, it could run 24/7 without shutting down, and the N100’s performance was sufficient for me to mess around with all sorts of nonsense.

So during that time, I set up quite a few services and installed numerous systems on this little host, basically running through all the commonly used Linux distributions and also experienced nested operations like running FeiNiu inside Proxmox VE. Every day during that period had something new to tinker with, which was really satisfying.

# Then, to put it another way, since I have already sold that small host, why is that?

Short on money, but not sure exactly what kind of money I’m missing. Haha, writing this has even made me laugh—groupthink is truly terrible. We all know that by the end of 2024, Apple released the Mac Mini with 16GB RAM and 256GB storage, priced under 4,000 RMB with the education discount, and it’s a brand-new machine. Coincidentally, a friend of mine just got one and started telling me how amazing it is. I got carried away and ended up selling off everything I could—(I’m not kidding, not only did my little desktop computer suffer, but also my Redmi Book Pro 15S, Redmi G, Xiaomi Pad 6, etc.)~~

Finally managed to save enough money to pick up the device in person, but was stunned upon receiving it. Apple’s M4 chip is based on the Arm architecture, which means many things simply won’t run—Docker can’t access the GPU. In plain terms, this device is essentially a high-performance home server, but I don’t know how to use it. What did the clever binary tree do? Despite having a 7-day no-questions-asked return policy, it boldly listed the device on Xianyu and sold it at a premium price of 3,333 RMB ~~(purchased for around 4,000 RMB, net loss of about 1,000 RMB)~~.

Finally, just before my holiday allowance was about to run out, I purchased the OnePlus Ace 5 Pro (16+512GB) for 3,333 RMB, with a national subsidy of -500 RMB, ending up paying 3,299 RMB for this ultra-high-performance sweet deal.

# Streamer, streamer, your moves are still so dumb. Do you have any even dumber moves coming up later!

Yes, brother, I do have one—just now! I placed an order for a new NAS, and I’m already ready to pull an all-nighter tinkering with it. One of my friends once said that life is about (tinkering/playing around), but unfortunately, at that time, I had already become a “buddhist” (a term implying detachment or resignation), overwhelmed by all sorts of things. But to be honest, now, I’ve never felt so free before—I’m going to lead my brain, my body, and my spirit into an unprecedented feast of staying up late, tinkering, playing around, and “sitting in jail” (a humorous way to refer to being stuck indoors or obsessively engaged in a project).

Haha! I must live!

I will write new blog posts when I have time to tinker with gadgets in the future. I really haven't written anything for a long time, and I apologize to everyone. Seeing that the website has only 20 daily active users every day makes me want to cry—I'm so sad that you guys don't come to find me anymore.