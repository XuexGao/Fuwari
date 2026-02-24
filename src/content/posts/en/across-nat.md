---
title: "Ultimate Feeding Tutorial: Step-by-Step Guide to Internal Network Penetration"
description: "Using Zerotier, Tailscale, and Cloudflare Tunnel, various methods of internal network penetration can be achieved, including those suitable for personal access and those suitable for public access."
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
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}

:::

# After actual testing, Zerotier's NAT traversal capability is significantly better than Tailscale, so it is recommended to use Zerotier to achieve internal network penetration.

Detailed Report:
| | Zerotier | Tailscale |
| ----------- | ----------- | ----------- |
| Single-ended DMZ (Single-ended NAT1) | STUN |STUN |
| Single-end UPnP (Single-end NAT3) | UDP P2P | Metaphysical penetration |
| Dual-end UPnP (Dual-end NAT3) | UDP P2P | Occult Penetration |
| Dual-end without UPnP/DMZ (Dual-end NAT3/NAT4) | UDP P2P | Cannot penetrate|
| Self-built relay/handshake node | √ | √|

In reality, the situation is somewhat more complex, but as long as you have any one of **IPv6、UPnP、DMZ**, Zerotier will have nearly 100% success rate for hole punching

How do I know if I am a P2P or relay?
Ping your remote device; if the latency exceeds 200ms or if packet loss occurs frequently, it is most likely due to a relay node (there is also a small probability that it is caused by your device being overloaded and unable to promptly receive and respond to ping packets).

# What is internal network tunneling?

When we have a NAS at home and want to access it from the school/company network, we need to use NAT traversal to enable external access to internal services. The principle is generally peer-to-peer hole punching and traffic relay through a server.

# Preparations in advance

路由器开启UPnP![](../../assets/images/2024-10-28-17-08-00-image.webp)

关闭路由器的IPv4，IPv6防火墙 **（可选）**![](../../assets/images/2024-10-28-17-09-19-image.webp)

# *Use Zerotier/Tailscale for internal network tunneling*

> Both of their principles attempt to establish a P2P connection with the other end, requiring the other party to install software and keep it running long-term.

# A detailed tutorial on using Zerotier for internal network penetration

## Create a Zerotier account

前往：[ZeroTier | Global Networking Solution for IoT, SD-WAN, and VPN](https://www.zerotier.com/)。如果你进不去，请尝试挂梯子。如果看不懂英文可以开启浏览器的翻译功能![](../../assets/images/2024-10-28-17-12-51-image.webp)

选择 `Sign up`![](../../assets/images/2024-10-28-17-13-06-image.webp)

如果你到了这个界面，请仍然选择`Sign up`![](../../assets/images/2024-10-28-17-15-08-image.webp)

![](../../assets/images/2024-10-28-17-16-52-image.webp)

账号创建完毕后，登录即可![](../../assets/images/2024-10-28-17-17-47-image.webp)

## Create a new Zerotier network group

After successfully logging into your account, you will be automatically redirected to this page. Click `Create A Network`. If not, visit [ZeroTier Central](https://my.zerotier.com/)

![](../../assets/images/2024-10-28-17-20-24-image.webp)

下面的列表会增加一个新的网络组，点击它![](../../assets/images/2024-10-28-17-21-31-image.webp)

Zerotier's default network group mode is `Private`. That is, private mode. Even if others know your `Network ID` and attempt to join your network group, they will still need your verification.

![](../../assets/images/2024-10-28-17-22-38-image.webp)

复制这个`Network ID`![](../../assets/images/2024-10-28-17-22-13-image.webp)

---

# Install the Zerotier app on the device

## Windows:

前往[Download - ZeroTier](https://www.zerotier.com/download/)，下载exe安装文件![](../../assets/images/2024-10-28-17-25-52-image.webp)

打开Zerotier![](../../assets/images/2024-10-28-17-27-20-image.webp)

查看右下角托盘，按照图片操作加入网络组![](../../assets/images/2024-10-28-17-28-20-image.webp)![](../../assets/images/2024-10-28-17-29-12-image.webp)![](../../assets/images/2024-10-28-17-30-26-image.webp)

Here you can query your device ID and your IP address within this network group.

![](../../assets/images/2024-10-28-18-03-19-image.webp)

**Then refer to: [[L:Zerotier Authorization Device**

## Linux (Feinu OS):

Connect to your Linux device via SSH

查看安装命令：[Download - ZeroTier](https://www.zerotier.com/download/)![](../../assets/images/2024-10-28-17-38-19-image.webp)

Terminal execution: `curl -s https://install.zerotier.com | sudo bash`

看到这一行即安装完毕，后面那一串即你的设备ID：![](../../assets/images/2024-10-28-17-39-23-image.webp)

加入网络：`sudo zerotier-cli join 你的Network ID`![](../../assets/images/2024-10-28-17-42-01-image.webp)

**Then refer to: [[L:Zerotier Authorized Devices**

## Android (Android)

Download the client

1. Zerotier One: [ZeroTier One APK Download for Android - Latest Version](https://apkpure.net/zerotier-one/com.zerotier.one)

2. ZerotierFix: [Releases · kaaass/ZerotierFix](https://github.com/kaaass/ZerotierFix/releases)

As shown in the figure

![](../../assets/images/2024-10-28-17-59-06-image.webp)![](../../assets/images/2024-10-28-17-59-46-image.webp)

**Then refer to: [[L:Zerotier Authorization Device**

---

# Zerotier authorized device

Go to the ZeroTier web console: [ZeroTier Central]([https://my.zerotier.com/](https://my.zerotier.com/)

授权刚才加入的设备![](../../assets/images/2024-10-28-17-31-51-image.webp)

勾选然后保存![](../../assets/images/2024-10-28-17-33-10-image.webp)

---

# Zerotier access test

If there are already two or more devices in the same network group, you can try pinging to test connectivity. First, ensure that the two devices are not on the same local network (for example, the phone uses mobile data while the NAS connects to your home Wi-Fi).

IP可以在这里查看![](../../assets/images/2024-10-28-18-02-00-image.webp)

ping测试：![](../../assets/images/2024-10-28-18-07-13-image.webp)

---

# A detailed tutorial on using Tailscale for internal network tunneling

## Create a Tailscale account

Go to: [Tailscale](https://login.tailscale.com/start). If you can't access it, try using a proxy. If you don't understand English, you can enable the translation feature in your browser.

选择任意一个登录方式![](../../assets/images/2024-10-28-18-24-32-image.webp)

After account creation, log in to proceed.

---

# Install the Tailscale app on the device

## Windows:

Go to [Download · Tailscale](https://tailscale.com/download), download the exe installation file

官方教程：![](../../assets/images/2024-10-28-18-31-48-image.webp)

## Linux (FeinuOS):

Connect to your Linux device via SSH

查看安装命令：[Download · Tailscale](https://tailscale.com/download/linux)![](../../assets/images/2024-10-28-18-32-58-image.webp)

Terminal execution: `curl -fsSL https://tailscale.com/install.sh | sh`

Wait until installation is complete, then enter: `tailscale login`

Open the pop-up browser window and log in with your account.

## Android (Android)

Download the client (Google Play): [Download · Tailscale](https://tailscale.com/download/android)

Log in to your account to proceed.

---

## Tailscale access test

前往Tailscale的网页控制台：[Machines - Tailscale](https://login.tailscale.com/admin/machines)。可以查看到每个设备Tailscale分配的IP![](../../assets/images/2024-10-28-18-26-58-image.webp)

ping测试![](../../assets/images/2024-10-28-18-41-45-image.webp)

---

# Using Cloudflare Tunnel for internal network penetration

> This method can be accessed directly on the public internet without any configuration, but it is limited to web services. It cannot be used to penetrate game servers or similar services. You need to first host your domain with Cloudflare.

Create a Cloudflare account [Homepage | Cloudflare](https://dash.cloudflare.com/)

Enter [Cloudflare One](https://one.dash.cloudflare.com/) (requires PayPal binding)

如图操作，创建一个Tunnel![](../../assets/images/2024-10-28-18-45-41-image.webp)![](../../assets/images/2024-10-28-18-45-54-image.webp)![](../../assets/images/2024-10-28-18-46-22-image.webp)

## Docker method

**Use 1Panel**

Copy the command as shown in the figure.

![](../../assets/images/48e9c43eb5c0fb49cc5517687698e3d9d1e60220.webp)

将其粘贴，并且复制后面的令牌![](../../assets/images/a2e18519d3782d765d7293c7a3d21031c787d575.webp)

1Panel应用商店搜索`cloudflared`![](../../assets/images/cf2eba61f0aaa7605240187e1c46f80a3954edfa.webp)

填入令牌![](../../assets/images/6f661ffa778b2be2e108912d3d44d8b3301df6d6.webp)

Then go to [View IP](#查看cloudflared的ip)

**Run using command**

Copy the command below and SSH into the Linux (Feinu OS) system, then enter it in the terminal.

![](../../assets/images/2024-10-28-18-46-49-image.webp)

Then go to [View IP](#%E6%9F%A5%E7%9C%8Bcloudflared%E7%9A%84ip)

### View the IP of cloudflared

Since we are in Docker mode, the IP address needs to be checked via the SSH terminal using `ip a`. Here, it is `192.168.124.34`.

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

**Then proceed to [[L:Configure and Access Tunnel**

## Native mode (taking Debian as an example)

Choose Debian, then copy the command below and execute it directly in the terminal.

![](../../assets/images/2024-10-28-20-00-49-image.webp)

If your environment cannot connect to GitHub

Try downloading manually: [https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb)

然后将其通过SSH等方式传到Linux上，如图终端为MobaXterm![](../../assets/images/2024-10-29-10-18-29-image.webp)

Then use: `dpkg -i cloudflared-linux-amd64.deb` to install this package

然后直接复制右边的命令到SSH终端执行![](../../assets/images/2024-10-29-10-19-27-3dcfad6977bdecf80fc0366f257788e6.webp)

**Then proceed to [[L:Configure and Access Tunnel**

## Android (Termux)

Install [Termux | The main Termux site and help pages.](https://termux.dev) on Android

Run the following command at the terminal: `pkg install cloudflared`

选择`Debian`然后复制最右边的命令到终端执行![](../../assets/images/2024-10-29-08-42-38-image.webp)
If you cannot use the cloudflared that comes with Termux, try installing a proot container to achieve it.

Enter the commands in sequence:

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

Then directly copy the command on the right to the SSH terminal and execute it.

![](../../assets/images/2024-10-29-08-42-38-image.webp)

If you cannot configure cloudflared via token, see [cloudflared](#本地方式)

**Then proceed to [[L:Configure and Access Tunnel**

---

# Configure and Access Tunnel

## Configure through web page

> This method requires running it directly on the device where cloudflared is installed, using a token.

As shown in the figure, enter and create an HTTP tunnel.

![](../../assets/images/2024-10-28-18-49-21-image.webp)![](../../assets/images/2024-10-28-18-49-44-image.webp)

填写你的IP和端口，非Docker模式可以直接填写localhost![](../../assets/images/2024-10-28-18-53-37-image.webp)

## Local method

> This method only requires entering some commands on a device with cloudflared installed and then authorizing via a web page; subsequent configuration changes also need to be performed locally.

Log in and authorize: `cloudflared tunnel login`

Create a tunnel and configure the tunnel (HTTP mode penetration, target address `127.0.0.1`, port: `8080`, external domain: `test.onani.cn`): `cloudflared tunnel --name test --url http://127.0.0.1:8080 --http2 --hostname test.onani.cn`

## Access Test

成功访问![](../../assets/images/2024-10-28-18-54-42-image.webp)

# Use STUN to punch through

> This method allows direct access over the public internet without any configuration, and all types of services can function normally. However, the internal network tunneling achieved this way cannot be fixed or specified in terms of IP and port, and it will change after 3 to 7 days.

## Install Lucky

Execute: `curl -o /tmp/install.sh http://6.666666.host:6/files/golucky.sh && sh /tmp/install.sh http://6.666666.host:6/files 2.13.4`

通过`host:16601` 进入Lucky后台，设置STUN穿透。如果DMZ主机不设为Lucky主机可能会失败。打码的地方即公网访问的IP和端口![](../../assets/images/2024-10-28-18-56-16-image.webp)