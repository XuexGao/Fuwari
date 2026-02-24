---
title: "How to remotely manage a home computer while traveling?"
description: "Currently, we often find ourselves outside, and almost anywhere can be accessed via a computer. However, most of our work files are typically stored on our own computers to ensure consistency in our workflow. Consequently, the need for a remote control device for our home computer has become increasingly prevalent."
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
This article explores a method for remote access using Natter, a Python-based tool, enabling direct connection to a computer via the 3389 port behind a full-cone NAT. It details setting up STUN tunnels and utilizing the `mstsc` command to initiate a remote session, ultimately facilitating seamless connectivity to a remote machine from anywhere with an internet connection.
:::

# Introduction
Here’s a professional translation:  “Perhaps this person isn't [X]: Downloading similar software like UU Remote or the Wildflower app would be excessive. It seems like they’re planning to write an article about it.”

Here’s the translation:  “Considering you are using a 32-bit computer, and your company network NAT is not enabled or IPv6 is not supported, how can we ensure a seamless and efficient remote access experience?”

# Formal commencement.
We proceed in two steps: one for 64-bit computers, which are simpler; and another for 32-bit computers, which require a bit more complexity.

### 64 bits.
First, enable the UPnP functionality of your router. Then, directly download [NetEase UU Remote Website_True4K, True Free, Truly Good](https://uuyc.163.com/) from the official website, and connect immediately using your account. In most cases, this will establish a P2P (point-to-point) connection – direct control and receiving connections between the client and server endpoints.”

### 32 bits.
Due to the limitations of our remote server, we are exploring creative solutions to accommodate users with 64-bit computers.

My approach is highly technical, involving configuring the RDP port on my home devices to be accessible directly from the internet via STUN. This utilizes the STUN protocol, but requires a NAT type of 1 (Full Cone) for the network.

那么首先，我将家中的路由器的 **DMZ** 主机设置为家里电脑的IP
![](../../assets/images/remote.webp)

Following the activation of DMZ, all traffic originating from ports addressed to the router (excluding the router's own port allocation) is routed to the DMZ host.

Here’s the translation:  “You can directly access your computer’s 3389 port by accessing the router’s 3389 port.”

Here’s the translation:  “With this configuration, you can utilize the STUN protocol to forward your router's 3389 port to your ISP's public IP address.”

After using STUN, you can access the 3389 port on your router from the IP address you’re currently connected to. This is because you’ve configured a DMZ, allowing you to reach the 3389 port on your computers.

How to establish a simple STUN tunnel?

我这里使用的是 [MikeWang000000/Natter: Expose your TCP/UDP port behind full-cone NAT to the Internet.](https://github.com/MikeWang000000/Natter) ，它是一个Python编写的程序，确保你的网络为NAT1后，你可以使用一个简单的命令，如： `python natter.py -p 3389` 来创建STUN隧道
![](../../assets/images/remote-1.webp)

Observe the connection `WAN > 112.32.39.77:55265`(https://example.com/WAN_connection) demonstrating that you can access your home computer from anywhere in the world, provided you have internet connectivity.

Finally, `Win+R` opens the Run dialog box. Enter `mstsc` to open a remote desktop window and begin your remote session.

![](../../assets/images/9207_1_112_29_106_130_gdqwd8.webp)

![](../../assets/images/9207_112_29_106_130_rx7fsq.webp)