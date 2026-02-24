---
title: "How to gracefully, efficiently, and smoothly work remotely on your own home computer when you’re out?"
description: "Currently, we frequently utilize computers while traveling, and many of our work files are typically stored on our own devices. To ensure consistent workflow across all locations, a remote control for our personal computer is increasingly necessary."
published: 2025-11-24
image: ../../assets/images/9207_112_29_106_130_rx7fsq.webp
tags:
  - 远程
  - STUN
  - RDP
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Here’s a brief summary of the article:

The author demonstrates how to access remote computers using Nmap and STUN, overcoming NAT restrictions via DMZ configuration and utilizing Python scripting for establishing STUN tunnels. This allows users to connect to their local machines from anywhere with an internet connection, effectively bypassing traditional network limitations.
:::

# Here’s the translation:  “Introduction”
You might think this person isn’t XX? Downloading similar UU software or apps like “Follow the Sun” wouldn't be appropriate. It should be written as an article.

I’m asking you, if your computer is a 32-bit machine instead of a 64-bit machine, and your company network NAT type isn't open or doesn’t support IPv6? How can we use remote access in a graceful, efficient, and smooth manner?

# Please provide the text you would like me to translate.
We will proceed in two steps: one for 64-bit computers, which is simpler, and another for 32-bit computers, which is more complex.

### 64 bits
First, open the UPnP functionality of your router **UPnP**, then directly download [NetEaseUU Remote Website_True4K, True Free, Truly Good](https://uuyc.163.com/) from the official website, and log in directly to connect. In most cases, this will be P2P (point-to-point connection, where one end controls and the other is controlled).

### 32位
Due to limited resources on my computer, we’re looking for creative solutions.

I’ve configured the RDP port on my home devices to be accessible from the internet using STUN, but this requires a NAT type of 1 (Full Cone) network.

那么首先，我将家中的路由器的 **DMZ** 主机设置为家里电脑的IP
![](../../assets/images/remote.webp)

DMZ activation resulted in all traffic destined for all ports on the router being routed to the DMZ host.

You can access the computer's 3389 port directly through the router’s 3389 port.

This port is forwarded to your ISP’s public IP address.

Using STUN after, you can access the 3389 port on your router by visiting `public IP: random port`. Because it’s configured as a DMZ, you can also access the 3389 port on the computers.

How to establish a STUN tunnel?

我这里使用的是 [MikeWang000000/Natter: Expose your TCP/UDP port behind full-cone NAT to the Internet.](https://github.com/MikeWang000000/Natter) ，它是一个Python编写的程序，确保你的网络为NAT1后，你可以使用一个简单的命令，如： `python natter.py -p 3389` 来创建STUN隧道
![](../../assets/images/remote-1.webp)

Observing the `WAN > 112.32.39.77:55265` connection proves that you can connect to anywhere in the world, as long as you have internet access from the **公网IP:端口** .

To launch Remote Desktop Explorer, press Win + R. Type `mstsc` and press Enter. Begin your remote journey.

![](../../assets/images/9207_1_112_29_106_130_gdqwd8.webp)

![](../../assets/images/9207_112_29_106_130_rx7fsq.webp)