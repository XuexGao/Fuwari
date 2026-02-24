---
title: "How to remotely access your home computer elegantly, efficiently, and smoothly while away from home?"
description: "Today, we can almost find computers everywhere we go outside, but most of our work files are generally stored on our home computers. To maintain consistency in our workflow, we naturally have the need to remotely access our home computers."
published: 2025-11-24
image: ../../assets/images/9207_112_29_106_130_rx7fsq.webp
tags:
  - 远程
  - STUN
  - RDP
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article explains how to remotely access a 32-bit Windows PC when standard tools like UU Remote fail due to NAT or architecture limitations. For 64-bit systems, enabling UPnP and using UU Remote usually works via P2P. For 32-bit systems, it requires configuring DMZ on the router to forward all traffic to the target PC, then using a tool like Natter to create a STUN tunnel through the public IP, allowing remote RDP access via the exposed port.
:::

# Preface
You might think, isn't this person XX? Of course, remote control can be achieved by simply downloading similar software like UU Remote or Sunflower, so why does this require an article?

Then I ask you, if your computer is 32-bit instead of 64-bit, and your company's network NAT type is not open or there is no IPv6? How can we use remote access gracefully, efficiently, and smoothly?

# Formally begin
We proceed in two steps: one for 64-bit computers, which is simpler, and the other for 32-bit computers, which is slightly more complex.

### 64-bit
First, turn on the **UPnP** feature of your home router, then directly download [NetEase UU Remote Official Website_True 4K, Truly Free, Really Useful](https://uuyc.163.com/), log in with your account, and connect directly—most cases will be P2P (peer-to-peer connection, where the controlling and controlled devices connect directly).

### 32-bit
Since UU Remote only supports 64-bit computers, we’ll have to think of some tricks.

My method is quite geeky: I expose the **RDP** port of my home devices to the public internet, which involves using **STUN**, but this method requires the NAT type of the home network to be 1 (Full Cone).

Then, first, I set the **DMZ** host of the router at home to the IP address of my home computer.
![](../../assets/images/remote.webp)

After enabling the DMZ, all traffic directed to all ports on the router (excluding ports used by the router itself) is forwarded to the DMZ host.

In plain terms, accessing port 3389 on your router will directly access port 3389 on the computer.

After such configuration, you can use the **STUN** protocol to forward port 3389 of the router to the public IP address allocated by your ISP.

In plain terms, after STUN, accessing the `IP:` you're currently using will allow you to access the router's port 3389, and because DMZ is configured, you can also access the computer's port 3389.

Then how can you simply set up a **STUN tunnel**?

I am using [MikeWang000000/Natter: Expose your TCP/UDP port behind full-cone NAT to the Internet.](https://github.com/MikeWang000000/Natter), which is a Python program. Once your network is behind NAT1, you can use a simple command, such as: `python natter.py -p 3389`, to create a STUN tunnel.
![](../../assets/images/remote-1.webp)

Observing `WAN > 112.32.39.77:55265    [ OPEN ` proves that you can now access your home computer from anywhere in the world, as long as you are connected to **the Internet**.

Finally, `Win+R` opens the Run dialog, enter `mstsc` to launch the remote control window, and begin your remote journey.

![](../../assets/images/9207_1_112_29_106_130_gdqwd8.webp)

![](../../assets/images/9207_112_29_106_130_rx7fsq.webp)