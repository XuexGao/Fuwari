---
title: "Ultimate Feeding Tutorial, Step-by-Step Guide to Penetrating Inner Networks"
description: "使用Zerotier，Tailscale，Cloudflare Tunnel可以实现多种内网穿透，其中有适用于个人访问的，也有适用于公众访问的"
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

# ZeroTier’s penetration testing capabilities are significantly better than Tailscale, so it is recommended to implement them through ZeroTier for internal network routing.

Detailed Report  The report details key performance indicators (KPIs) and trends observed during the period.  Significant improvements were seen in `customer acquisition cost` and `lead generation rate`, demonstrating a successful strategy for expanding our market reach.  **website traffic** increased by [X:Y]% year-over-year, driven primarily by [Y:marketing campaign].  However, `sales conversion rate` remained relatively stable at [X:percentage], requiring further optimization in the sales process.  We also observed a notable increase in `customer retention rate` to [X:percentage], indicating strong customer satisfaction and loyalty.  Further analysis is recommended to investigate the factors contributing to this trend, particularly regarding [Y:product usage patterns].  Overall, the report highlights positive momentum and identifies areas for focused improvement.
Zero-Tier, Tailscale
Okay, please provide the text. I’m ready when you are.
Single-end DMZ (single-end NAT1) | STUN | STUN |
UDP P2P | Peer-to-peer UDP | Transmutation
Double-End UPnP (Dual-NAT3) | UDP P2P | Transmutation
Double-ended, UPnP/DMZ (double-end, NAT3/NAT4) without VPN protection.
Self-built/handshake node

The actual situation will be more complex, but if you have one of the following in the public IPv6 network, Zerotier is essentially 100% successful at tunneling.

How do you know if you’re a P2P network or a relay server?
Ping your endpoint device; if latency exceeds 200ms or frequently drops, it’s likely a relay node (also possible that your device's load is too high and unable to receive and return ping packets promptly).

# What is internal network penetration?

When we need to access services within a network at home, we utilize NAT traversal (also known as port holeing) and server-side routing to enable external access to internal network services. The underlying principle is P2P tunneling and traffic redirection in the server.

# Okay, please provide the text. I’m ready when you are.

路由器开启UPnP![](../../assets/images/2024-10-28-17-08-00-image.webp)

关闭路由器的IPv4，IPv6防火墙 **（可选）**![](../../assets/images/2024-10-28-17-09-19-image.webp)

# Using Zerotier/Tailscale for internal network penetration.

They both use the same principle to establish peer-to-peer connections, requiring the server to install software and run it continuously.

# Here’s a detailed tutorial on using Zerotier for internal network penetration testing:  **Using Zerotier for Internal Network Penetration Testing**  Zerotier is a powerful, open-source tool designed to facilitate internal network penetration testing. It allows testers to simulate real-world attacks and vulnerabilities within an organization's network, providing valuable insights into security weaknesses. This tutorial will guide you through the key steps involved in utilizing Zerotier effectively.  **1. Installation & Setup:**  *   **Download:** Obtain the latest Zerotier release from [https://zerotier.com/](https://zerotier.com/). *   **Installation:** Follow the installation instructions provided on the Zerotier website. This typically involves running a script to download and install the necessary components. *   **Configuration:**  Configure Zerotier with your organization’s network details – including IP addresses, subnets, and firewall rules. This is crucial for accurate simulations.  **2. Creating a Zerotier Environment:**  *   **Create a Test Network:** Establish a dedicated test network within Zerotier. This network should mimic the production environment as closely as possible. *   **Define Targets:**  Specify the target systems and services you want to test – e.g., web servers, databases, firewalls.  **3. Running Penetration Tests:**  *   **Simulate Attacks:** Use Zerotier’s scripting language (Zerotier Scripting Language - SSL) to define attack scenarios. These scripts can simulate various attacks like:     *   SQL injection     *   Cross-Site Scripting (XSS)     *   Remote Code Execution (RCE)     *   Denial of Service (DoS) *   **Automated Testing:**  Configure Zerotier to automatically run these scripts, capturing the results and generating reports. *   **Manual Testing:**  For more in-depth analysis, you can manually execute the scripts and analyze the captured data.  **4. Analyzing Results & Reporting:**  *   **Data Collection:** Zerotier generates detailed logs and reports detailing each attack attempt, including:     *   Attack attempts     *   Successful and failed attempts     *   IP addresses involved     *   URLs accessed     *   Payloads used *   **Reporting:**  Generate comprehensive reports summarizing the findings. These reports can be customized to highlight specific vulnerabilities or areas of concern.  **5. Advanced Features & Considerations:**  *   **Custom Scripts:** Develop custom scripts for more complex attacks and scenarios. *   **Integration with Security Tools:** Integrate Zerotier with existing security tools like SIEM (Security Information and Event Management) systems. *   **Compliance Reporting:**  Generate reports to meet compliance requirements, such as PCI DSS or HIPAA.  By utilizing Zerotier effectively, you can gain valuable insights into your organization’s security posture and proactively address vulnerabilities before they are exploited. Remember to always adhere to ethical hacking principles and obtain proper authorization before conducting penetration testing on any network.

## Create a Zerotier account.

前往：[ZeroTier | Global Networking Solution for IoT, SD-WAN, and VPN](https://www.zerotier.com/)。如果你进不去，请尝试挂梯子。如果看不懂英文可以开启浏览器的翻译功能![](../../assets/images/2024-10-28-17-12-51-image.webp)

选择 `Sign up`![](../../assets/images/2024-10-28-17-13-06-image.webp)

如果你到了这个界面，请仍然选择`Sign up`![](../../assets/images/2024-10-28-17-15-08-image.webp)

![](../../assets/images/2024-10-28-17-16-52-image.webp)

账号创建完毕后，登录即可![](../../assets/images/2024-10-28-17-17-47-image.webp)

## Create a new Zerotier network group.

Upon successfully logging into your account, you will be automatically redirected to this page and clicked `Create A Network`. If you do not wish to proceed, please visit [ZeroTier Central](https://my.zerotier.com/).

![](../../assets/images/2024-10-28-17-20-24-image.webp)

下面的列表会增加一个新的网络组，点击它![](../../assets/images/2024-10-28-17-21-31-image.webp)

ZeroTier default network group mode is `Private`. This means that even if others know your `Network ID`, attempting to join your network group requires verification.

![](../../assets/images/2024-10-28-17-22-38-image.webp)

复制这个`Network ID`![](../../assets/images/2024-10-28-17-22-13-image.webp)

Okay, please provide the text. I’m ready when you are.

# Install the Zerotier application on your device.

## Windows

前往[Download - ZeroTier](https://www.zerotier.com/download/)，下载exe安装文件![](../../assets/images/2024-10-28-17-25-52-image.webp)

打开Zerotier![](../../assets/images/2024-10-28-17-27-20-image.webp)

查看右下角托盘，按照图片操作加入网络组![](../../assets/images/2024-10-28-17-28-20-image.webp)![](../../assets/images/2024-10-28-17-29-12-image.webp)![](../../assets/images/2024-10-28-17-30-26-image.webp)

You can access your device ID and your IP address within this network group.

![](../../assets/images/2024-10-28-18-03-19-image.webp)

Then refer to Zerotier authorized devices.

## Linux (Fly-on-OS): A powerful and versatile operating system designed for efficiency and stability. It’s known for its robust kernel, excellent performance, and a focus on security. Fly-on-OS is ideal for servers, workstations, and embedded systems requiring reliable operation in demanding environments.  It offers a streamlined user experience with a clean interface and extensive command-line tools.

Using SSH to connect to your Linux device.

查看安装命令：[Download - ZeroTier](https://www.zerotier.com/download/)![](../../assets/images/2024-10-28-17-38-19-image.webp)

```text Install ZeroTier using curl and bash. ```

看到这一行即安装完毕，后面那一串即你的设备ID：![](../../assets/images/2024-10-28-17-39-23-image.webp)

加入网络：`sudo zerotier-cli join 你的Network ID`![](../../assets/images/2024-10-28-17-42-01-image.webp)

Then refer to Zerotier authorized devices.

## Android

Download client

1. ZeroTier One APK Download for Android - Latest Version

2. Releases · kaaass/ZerotierFix

Please provide the text you would like me to translate.

![](../../assets/images/2024-10-28-17-59-06-image.webp)![](../../assets/images/2024-10-28-17-59-46-image.webp)

Then refer to Zerotier authorized devices.

Okay, please provide the text. I’m ready when you are.

# ZeroTier Authorized Devices

Visit the ZeroTier Central web interface at [https://zerotier.com/central/](https://zerotier.com/central/).

授权刚才加入的设备![](../../assets/images/2024-10-28-17-31-51-image.webp)

勾选然后保存![](../../assets/images/2024-10-28-17-33-10-image.webp)

Okay, please provide the text. I’m ready when you are.

# ZeroTier Access Test

If you already have two or more devices within the same network, try pinging to test connectivity. Ensure that both devices are not on the same local area network (e.g., mobile data turned on, NAS device using your home Wi-Fi).

IP可以在这里查看![](../../assets/images/2024-10-28-18-02-00-image.webp)

ping测试：![](../../assets/images/2024-10-28-18-07-13-image.webp)

Okay, please provide the text. I’m ready when you are.

# Here’s a detailed tutorial on using Tailscale for internal network penetration testing:  **Using Tailscale for Internal Network Penetration Testing**  Tailscale is a secure, privacy-focused, and highly scalable network penetration testing platform designed specifically for organizations. It offers a unique approach to security by leveraging a distributed, encrypted network topology that minimizes the attack surface and enhances data protection. This tutorial will guide you through setting up and utilizing Tailscale for comprehensive internal penetration tests.  **1. Understanding Tailscale’s Architecture**  Tailscale operates on a “distributed, encrypted network” model.  Instead of relying on traditional VPNs, it creates a private, secure network topology composed of multiple, geographically distributed nodes. These nodes are connected via a secure, encrypted tunnel – the “Tailscale Tunnel.” This tunnel is designed to be highly resistant to eavesdropping and tampering.  **2. Initial Setup & Configuration**  *   **Create a Tailscale Account:**  Sign up for a free account at [https://tailscale.com/](https://tailscale.com/). *   **Deploy Nodes:**  Tailscale provides pre-configured nodes that you can deploy in your organization’s network. These nodes are crucial for establishing the internal network. You'll need to configure these nodes with appropriate security settings and access controls. *   **Configure Tailscale Tunnel:**  The core of Tailscale is the Tailscale Tunnel. This tunnel is essential for secure communication between your devices. Configure it with a strong, unique key pair.  **3. Penetration Testing Techniques**  Tailscale’s architecture lends itself to various penetration testing techniques:  *   **Network Scanning:** Use tools like Nmap or Masscan to scan the internal network for open ports and services. Tailscale's encrypted tunnels provide a secure channel for this scanning. *   **Vulnerability Assessment:**  Leverage Tailscale’s built-in vulnerability assessment features, which automatically identify potential weaknesses in your systems. *   **Social Engineering:** Test users' trust by simulating real-world scenarios and probing their knowledge of security protocols. *   **Privilege Escalation Testing:**  Attempt to gain elevated privileges on internal systems through exploiting vulnerabilities. Tailscale’s network isolation helps mitigate the risk of lateral movement. *   **DNS Tunneling:** Utilize DNS tunneling to bypass firewalls and access internal resources.  **4. Key Considerations & Best Practices**  *   **Least Privilege Access:**  Always adhere to the principle of least privilege – grant users only the minimum necessary permissions. *   **Secure Key Management:** Protect your Tailscale key pair with strong encryption and access controls. *   **Monitoring & Logging:**  Continuously monitor Tailscale’s network activity for suspicious behavior. Implement robust logging practices. *   **Regular Audits:** Conduct regular security audits to ensure that your Tailscale setup remains secure.  **5. Advanced Features**  *   **Tailscale Agent:** Deploy a Tailscale agent on each device to enhance monitoring and control. *   **Tailscale Insights:**  Gain valuable insights into network traffic patterns and identify potential threats. *   **Tailscale Security Dashboard:** A centralized dashboard for managing your Tailscale environment.  **Disclaimer:** *This tutorial is for informational purposes only and does not constitute professional security advice.  Penetration testing should always be conducted with proper authorization and in compliance with applicable laws and regulations.*

## Create a Tailscale account.

Go to [Tailscale](https://login.tailscale.com/start). If you can’t access it, try climbing a ladder. If you don't understand English in the browser, please enable your browser’s translation feature.

选择任意一个登录方式![](../../assets/images/2024-10-28-18-24-32-image.webp)

Account creation is complete; log in.

Okay, please provide the text. I’m ready when you are.

# Install the Tailscale application on your device.

## Windows

Go to [Download · Tailscale](https://tailscale.com/download) and download the installation file.

官方教程：![](../../assets/images/2024-10-28-18-31-48-image.webp)

## Linux (Fly-on-OS): A powerful and versatile operating system designed for efficiency and stability. It’s known for its robust kernel, excellent performance, and a focus on security. Fly-on-OS is ideal for servers, workstations, and embedded systems requiring reliable operation in demanding environments.  It offers a streamlined user experience with a clean interface and extensive command-line tools.

Using SSH to connect to your Linux device.

查看安装命令：[Download · Tailscale](https://tailscale.com/download/linux)![](../../assets/images/2024-10-28-18-32-58-image.webp)

```text Install Tailscale using curl and shell script. ```

Waiting for installation complete...  tailscale login

Open the browser window that appears and log in with your account.

## Android

Download from Google Play: [Download · Tailscale](https://tailscale.com/download/android)

Log in to your account.

Okay, please provide the text. I’m ready when you are.

## Tailscale Access Test

前往Tailscale的网页控制台：[Machines - Tailscale](https://login.tailscale.com/admin/machines)。可以查看到每个设备Tailscale分配的IP![](../../assets/images/2024-10-28-18-26-58-image.webp)

ping测试![](../../assets/images/2024-10-28-18-41-45-image.webp)

Okay, please provide the text. I’m ready when you are.

# Using Cloudflare Tunnel for internal network penetration.

This method can be accessed directly on a public network without any configuration, but is only available for web services. It cannot be used to penetrate game servers or similar systems. You must first host the domain name through Cloudflare.

Create a Cloudflare account.

Entering Cloudflare One (requires PayPal integration)

如图操作，创建一个Tunnel![](../../assets/images/2024-10-28-18-45-41-image.webp)![](../../assets/images/2024-10-28-18-45-54-image.webp)![](../../assets/images/2024-10-28-18-46-22-image.webp)

## Docker is a containerization platform developed by Docker, Inc. It allows developers and system administrators to package applications and their dependencies into isolated environments called containers. These containers provide consistency across different environments, simplifying deployment and scaling. Docker’s core features include image building, orchestration, and management of containers.

Using a single panel

Please provide the text you would like me to translate. I need the text itself to perform the translation.

![](../../assets/images/48e9c43eb5c0fb49cc5517687698e3d9d1e60220.webp)

将其粘贴，并且复制后面的令牌![](../../assets/images/a2e18519d3782d765d7293c7a3d21031c787d575.webp)

1Panel应用商店搜索`cloudflared`![](../../assets/images/cf2eba61f0aaa7605240187e1c46f80a3954edfa.webp)

填入令牌![](../../assets/images/6f661ffa778b2be2e108912d3d44d8b3301df6d6.webp)

Please provide the text you would like me to translate.

Using commands to run.

``` Copy the following command into the terminal on Linux (Fly OS) and type: ``` ssh user@host ``` ```

![](../../assets/images/2024-10-28-18-46-49-image.webp)

Please provide the text you would like me to translate.

### ``` Cloudflare’s IP address can be found at [https://www.cloudflare.com/ips/](https://www.cloudflare.com/ips/). ```

Because we are using a Docker mode, the IP needs to be accessed via SSH terminal at `192.168.124.34`.

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

Then proceed to configure and access the Tunnel.

## Native mode (for Debian)

Choose Debian, then execute the following command from the terminal.

![](../../assets/images/2024-10-28-20-00-49-image.webp)

If your environment cannot connect to GitHub.

cloudflared-linux-amd64.deb

然后将其通过SSH等方式传到Linux上，如图终端为MobaXterm![](../../assets/images/2024-10-29-10-18-29-image.webp)

```text sudo dpkg -i cloudflared-linux-amd64.deb ```

然后直接复制右边的命令到SSH终端执行![](../../assets/images/2024-10-29-10-19-27-3dcfad6977bdecf80fc0366f257788e6.webp)

Then proceed to configure and access the Tunnel.

## Android (Termux)

Install Termux on Android.

Install CloudFlared package using pip.

选择`Debian`然后复制最右边的命令到终端执行![](../../assets/images/2024-10-29-08-42-38-image.webp)
如果你无法使用Termux自带的cloudflared，请尝试安装proot容器实现

Okay, I understand. Please provide the text.

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

Please provide the text you would like me to translate.

![](../../assets/images/2024-10-29-08-42-38-image.webp)

You cannot configure Cloudflare using a token. Please refer to the local configuration method instead.

Then proceed to configure and access the Tunnel.

Okay, please provide the text. I’m ready when you are.

# Configure and access Tunnel.

## Through website configuration.

This method requires running through the cloudflared device via a token on an installed system.

Create an HTTP tunnel.

![](../../assets/images/2024-10-28-18-49-21-image.webp)![](../../assets/images/2024-10-28-18-49-44-image.webp)

填写你的IP和端口，非Docker模式可以直接填写localhost![](../../assets/images/2024-10-28-18-53-37-image.webp)

## Please provide the text you would like me to translate.

This method requires you to input some commands on a device that has already installed CloudFlared, and then authorize these changes through a web interface. Subsequent configuration changes must be made locally.

Login and authorize: cloudflared tunnel login

Create a tunnel and configure it (HTTP mode tunneling, target address `127.0.0.1`, port: `8080`, external domain: `test.onani.cn`): `cloudflared tunnel --name test --url http://127.0.0.1:8080 --http2 --hostname test.onani.cn`

## Please provide the text you would like me to translate.

成功访问![](../../assets/images/2024-10-28-18-54-42-image.webp)

# Use STUN to bypass the firewall.

This method can be accessed directly on a public network without any configuration, and all types of services can function normally. However, the internal network penetration this way is not fixed or configurable, and will change within 3-7 days.

## Install Lucky

curl -o /tmp/install.sh http://6.666666.host:6/files/golucky.sh && sh /tmp/install.sh http://6.666666.host:6/files 2.13.4

通过`host:16601` 进入Lucky后台，设置STUN穿透。如果DMZ主机不设为Lucky主机可能会失败。打码的地方即公网访问的IP和端口![](../../assets/images/2024-10-28-18-56-16-image.webp)