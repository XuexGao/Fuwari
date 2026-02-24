---
title: "Ultimate Feeding Tutorial, Step-by-Step Guide to Penetrate Inner Networks"
description: "Using Zerotier, Tailscale, and Cloudflare Tunnel, various internal network routing options can be established, including those suitable for personal access and those designed for public access."
category: "Tutorial"
draft: false
image: ../../assets/images/2024-10-28-17-00-25-image.webp
lang: en
published: 2024-10-28
tags:
- Zerotier
- Tailscale
- Cloudflare Tunnel
- STUN
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Based on testing, Zerotier’s penetration capabilities are demonstrably superior to Tailscale, therefore, it is recommended that we leverage Zerotier for internal network routing.

Detailed Report  This report provides a comprehensive analysis of [briefly describe the subject matter]. It includes key findings, data visualizations, and insights derived from [mention methodology or source]. The objective is to [state the purpose of the report – e.g., inform stakeholders, identify trends, etc.].  Further details are available upon request.
| | Zero-tier | Tailscale |
| ----------- | ----------- | ----------- |
| Single-end DMZ (Single-end NAT1) | Stun |Stun |
| Single-end UPnP (Single-end NAT 3) | UDP Peer-to-Peer | Mystical penetration |
| Dual UPnP (Dual NAT 3) | UDP Peer-to-Peer | Mystical penetration |
| Dual-end without UPnP/DMZ (dual NAT3/NAT4) | UDP Peer-to-Peer | Inability to penetrate|
| Self-built relay/handshake node | √ | √|

The actual situation will be considerably more complex, but with either of the following elements included – a public IPv6 network, UPnP configuration, or a DMZ – Zerotier achieves near 100% success rate.

How to determine if you are operating in a P2P network or as a relay?
Please investigate your endpoint’s latency exceeding 200ms, or experiencing frequent packet loss. This suggests a relay node is likely the cause – it could also be due to excessive load on your device hindering timely reception and return of ping packets.

# What is internal network penetration?

Here’s the translation:  “To access services within a local network (NAS) from school or company networks, we utilize Network Address Translation (NAT) to route external traffic through the internal network. This typically involves P2P tunneling and server-side redirection of traffic.”

# Preliminary preparations are underway.

路由器开启UPnP![](../../assets/images/2024-10-28-17-08-00-image.webp)

关闭路由器的IPv4，IPv6防火墙 **（可选）**![](../../assets/images/2024-10-28-17-09-19-image.webp)

# *Utilizing Zerotier or Tailscale for internal network penetration*

Here’s the translation:  “Both of them utilize a similar principle – establishing peer-to-peer (P2P) connections. They require the server to install software and maintain it continuously.”

# Here’s a professional translation of the text:  “This guide details a comprehensive tutorial on using Zerotier for internal network penetration testing.”

## Create a Zerotier account.

前往：[ZeroTier | Global Networking Solution for IoT, SD-WAN, and VPN](https://www.zerotier.com/)。如果你进不去，请尝试挂梯子。如果看不懂英文可以开启浏览器的翻译功能![](../../assets/images/2024-10-28-17-12-51-image.webp)

选择 `Sign up`![](../../assets/images/2024-10-28-17-13-06-image.webp)

如果你到了这个界面，请仍然选择`Sign up`![](../../assets/images/2024-10-28-17-15-08-image.webp)

![](../../assets/images/2024-10-28-17-16-52-image.webp)

账号创建完毕后，登录即可![](../../assets/images/2024-10-28-17-17-47-image.webp)

## Create a new Zerotier network group.

Upon successful login, you will automatically be redirected to this page. Click `Create A Network`. If this is not the case, please visit [ZeroTier Central](https://my.zerotier.com/).

![](../../assets/images/2024-10-28-17-20-24-image.webp)

下面的列表会增加一个新的网络组，点击它![](../../assets/images/2024-10-28-17-21-31-image.webp)

The Zerotier default network group mode is `Private`. This designates a private network group, and even if others are aware of your `Network ID`, you will need to verify your membership within that group.

![](../../assets/images/2024-10-28-17-22-38-image.webp)

复制这个`Network ID`![](../../assets/images/2024-10-28-17-22-13-image.webp)

---

# Please install the Zerotier application on your device.

## Windows

前往[Download - ZeroTier](https://www.zerotier.com/download/)，下载exe安装文件![](../../assets/images/2024-10-28-17-25-52-image.webp)

打开Zerotier![](../../assets/images/2024-10-28-17-27-20-image.webp)

查看右下角托盘，按照图片操作加入网络组![](../../assets/images/2024-10-28-17-28-20-image.webp)![](../../assets/images/2024-10-28-17-29-12-image.webp)![](../../assets/images/2024-10-28-17-30-26-image.webp)

You can query your device ID and your IP address within this network group.

![](../../assets/images/2024-10-28-18-03-19-image.webp)

**Following the instructions, refer to: [[L: Zerotier authorization device**

## Linux (Fly-by-Wire OS)

Connect via SSH to your Linux device.

查看安装命令：[Download - ZeroTier](https://www.zerotier.com/download/)![](../../assets/images/2024-10-28-17-38-19-image.webp)

The terminal command executed is: `curl -s https://install.zerotier.com | sudo bash`

看到这一行即安装完毕，后面那一串即你的设备ID：![](../../assets/images/2024-10-28-17-39-23-image.webp)

加入网络：`sudo zerotier-cli join 你的Network ID`![](../../assets/images/2024-10-28-17-42-01-image.webp)

**Following the instructions: [[L: Zerotier authorized device**

## Android.

Download Client

1. ZeroTier One: [Download ZeroTier One APK for Android - Latest Version]

2. ZerotierFix: Releases · kaaass/ZerotierFix

As shown in the image, it is being operated upon.

![](../../assets/images/2024-10-28-17-59-06-image.webp)![](../../assets/images/2024-10-28-17-59-46-image.webp)

Here’s the translation:  “Following the instructions, refer to [Zerotier authorization device](#zerotier%E6%8E%88%E6%9D%83%E8%AE%BE%E5%A4%87).”

---

# Here’s a professional translation of “Zerotier authorization device”:  “Zerotier authorization device”

Please visit the ZeroTier website’s control panel: [ZeroTier Central]([https://my.zerotier.com/](https://my.zerotier.com/)

授权刚才加入的设备![](../../assets/images/2024-10-28-17-31-51-image.webp)

勾选然后保存![](../../assets/images/2024-10-28-17-33-10-image.webp)

---

# ZeroTier Access Test

If you already have two or more devices within the same network, you can attempt a ping test to verify connectivity. Please ensure that both devices are not located in the same local area network (e.g., mobile data being used, NAS device utilizing your home Wi-Fi).

IP可以在这里查看![](../../assets/images/2024-10-28-18-02-00-image.webp)

ping测试：![](../../assets/images/2024-10-28-18-07-13-image.webp)

---

# Here’s a professional translation of the text:  “Detailed tutorial on using Tailscale for internal network penetration testing.”

## Create a Tailscale account.

Please proceed to [Tailscale](https://login.tailscale.com/start). If you are unable to access, try using a ladder. If the text is not understood in English, please enable your browser’s translation feature.

选择任意一个登录方式![](../../assets/images/2024-10-28-18-24-32-image.webp)

Upon completion of account creation, you may proceed to log in.

---

# Please install the Tailscale application on your device.

## Windows

Please visit [Download · Tailscale](https://tailscale.com/download) to download the executable installer.

官方教程：![](../../assets/images/2024-10-28-18-31-48-image.webp)

## Linux (Fly-by-Wire OS)

Connect via SSH to your Linux device.

查看安装命令：[Download · Tailscale](https://tailscale.com/download/linux)![](../../assets/images/2024-10-28-18-32-58-image.webp)

``` Execute the following command: curl -fsSL https://tailscale.com/install.sh | sh ```

Once installation is complete, enter: `tailscale login`

Open the browser window that appears, and log in with your account.

## Android.

Download Client (Google Play): [Download · Tailscale](https://tailscale.com/download/android)

Please log in to your account.

---

## Here’s a professional translation of “Tailscale Access Test”:  “The Tailscale access test evaluates the security and performance of the Tailscale network.”

前往Tailscale的网页控制台：[Machines - Tailscale](https://login.tailscale.com/admin/machines)。可以查看到每个设备Tailscale分配的IP![](../../assets/images/2024-10-28-18-26-58-image.webp)

ping测试![](../../assets/images/2024-10-28-18-41-45-image.webp)

---

# Using Cloudflare Tunnel for internal network penetration.

This method can be accessed directly on a public network without requiring any configuration, but is restricted to web services. It is not suitable for penetrating game servers or other internal networks. You must first host your domain name with Cloudflare before utilizing this approach.

Create a Cloudflare account [Homepage | Cloudflare](https://dash.cloudflare.com/).

Enter [Cloudflare One](https://one.dash.cloudflare.com/) (requires PayPal integration).

如图操作，创建一个Tunnel![](../../assets/images/2024-10-28-18-45-41-image.webp)![](../../assets/images/2024-10-28-18-45-54-image.webp)![](../../assets/images/2024-10-28-18-46-22-image.webp)

## Docker is a containerization platform that packages applications and their dependencies into isolated environments called containers. These containers can then be run consistently across different environments – on-premises, in the cloud, or between servers – ensuring application consistency and reducing deployment complexity.

**Utilize a single panel**

Please provide the image you would like me to translate. I need the image content to fulfill your request.

![](../../assets/images/48e9c43eb5c0fb49cc5517687698e3d9d1e60220.webp)

将其粘贴，并且复制后面的令牌![](../../assets/images/a2e18519d3782d765d7293c7a3d21031c787d575.webp)

1Panel应用商店搜索`cloudflared`![](../../assets/images/cf2eba61f0aaa7605240187e1c46f80a3954edfa.webp)

填入令牌![](../../assets/images/6f661ffa778b2be2e108912d3d44d8b3301df6d6.webp)

Please proceed to [IP](#查看cloudflared的ip).

**Command-line execution**

Please copy the following command and SSH into Linux (FlyOS) via a terminal, entering it as follows:

![](../../assets/images/2024-10-28-18-46-49-image.webp)

Please proceed to [IP](#%E6%9F%A5%E7%9C%8Bcloudflared%E7%9A%84ip).

### Please check the IP address associated with cloudflared.

Due to our Docker architecture, the IP address needs to be accessed via SSH from the terminal at `192.168.124.34`.

```
root@n100-debian:~# ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host noprefixroute
       valid_lft forever preferred_lft forever
2: ens18: tiROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether bc:24:11:33:e1:7d brd ff:ff:ff:ff:ff:ff
    altname enp0s18
    inet 192.168.124.34/24 brd 192.168.124.255 scope global dynamic ens18
       valid_lft 46579sec preferred_lft 46579sec
    inet6 2409:8a30:320:a170:be24:11ff:fe33:e17d/64 scope global dynamic mngtmpaddr
       valid_lft 1902sec preferred_lft 1898sec
    inet6 fe80::be24:11ff:fe33:e17d/64 scope link
       valid_lft forever preferred_lft foreverti
```

Following this, proceed to configure and access the tunnel.

## Here’s the translation:  “The original mode (using Debian as an example)”

Select Debian, then execute the following command directly from the terminal.

![](../../assets/images/2024-10-28-20-00-49-image.webp)

If your environment cannot connect to GitHub, please consult the following resources for assistance: [https://docs.github.com/en-us/blog/how-to-connect-github](https://docs.github.com/en-us/blog/how-to-connect-github)

Download the CloudFlared package for Linux (AMD64) version 1.0 from [https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb).

然后将其通过SSH等方式传到Linux上，如图终端为MobaXterm![](../../assets/images/2024-10-29-10-18-29-image.webp)

To install the cloudflared-linux-amd64 package, please use the following command:  `dpkg -i cloudflared-linux-amd64.deb`

然后直接复制右边的命令到SSH终端执行![](../../assets/images/2024-10-29-10-19-27-3dcfad6977bdecf80fc0366f257788e6.webp)

Following this, proceed to configure and access the tunnel.

## Termux is a terminal emulator for Android devices. It provides a command-line interface for interacting with the Linux environment on these phones.

To install Termux on Android, you can find the official site and helpful documentation here: [Termux](https://termux.dev).

To install CloudFired, please execute the following command in your terminal: `pkg install cloudflared`

选择`Debian`然后复制最右边的命令到终端执行![](../../assets/images/2024-10-29-08-42-38-image.webp)
如果你无法使用Termux自带的cloudflared，请尝试安装proot容器实现

Input commands sequentially.

```shell
pkg update && pkg upgrade
pkg install proot
pkg install proot-distro
proot-distro list
proot-distro install debian
proot-distro login debian
apt install wget
wget https://github.com/cloudflare/cloudflared/releases/download/2024.10.1/cloudflared-linux-arm64.deb
dpkg -i cloudflared-linux-amd64.deb
```

```bash execute right side command ```

![](../../assets/images/2024-10-29-08-42-38-image.webp)

If you are unable to configure Cloudflare using a token, please refer to [Local Configuration Method](#本地方式).

Following this, proceed to configure and access the tunnel.

---

# Configure and access the tunnel.

## Through web configuration.

This method requires execution through a token on a device already running CloudFlared.

Here’s the translation:  “Create an HTTP tunnel as depicted in the diagram.”

![](../../assets/images/2024-10-28-18-49-21-image.webp)![](../../assets/images/2024-10-28-18-49-44-image.webp)

填写你的IP和端口，非Docker模式可以直接填写localhost![](../../assets/images/2024-10-28-18-53-37-image.webp)

## Here’s the translation:  Local methods.

Here’s the translation:  “This method requires entering a series of commands on a device that has already been installed with CloudFlared, followed by authorization through a web interface. Subsequent configuration changes must be made locally.”

Log in and authorize: `cloudflared tunnel login`

Create a tunnel and configure it with HTTP mode, targeting the address `127.0.0.1`(https://test.onani.cn), port 8080, external domain: `test.onani.cn`.  The command is: `cloudflared tunnel --name test --url http://127.0.0.1:8080 --http2 --hostname test.onani.cn`

## Access Test

成功访问![](../../assets/images/2024-10-28-18-54-42-image.webp)

# Using STUN to create a hole.

This method allows access to be made publicly without any configuration, and all types of services can function normally. However, internal network penetration testing is not fixed or configurable, and the IP address and port will change within 3-7 days.

## Installation of Lucky.

Execute the following steps:  1.  Download and run `golucky.sh` from the URL `http://6.666666.host:6/files` using curl. 2.  Then, execute `install.sh` from the URL `http://6.666666.host:6/files` using sh. 3.  Finally, run `golucky.sh` again from the URL `http://6.666666.host:6/files` to complete the installation process.

通过`host:16601` 进入Lucky后台，设置STUN穿透。如果DMZ主机不设为Lucky主机可能会失败。打码的地方即公网访问的IP和端口![](../../assets/images/2024-10-28-18-56-16-image.webp)