---
title: "Record of"
description: "Some records are updated periodically."
category: "Record"
draft: false
image: /random/h
lang: en
published: 1999-01-01
tags:
- 记录
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article provides a comprehensive overview of various software and technologies, including cloudflare services, VPS configurations, and advanced techniques like V2Ray and Cloudflare Pages. It covers everything from basic device ID resets to complex network configurations and DNS management strategies. The content is structured logically, providing detailed explanations for each topic.
:::

# Device ID reset.

In ZeroTier, if you clone a VM or copy a system image via device ID duplication, you must reset the device ID. ZeroTier’s device IDs are generated based on your local private key and cannot be directly modified within software; however, you can restore them using the following methods:

Method 1: Resetting on Linux/Debian

Please cease operation of ZeroTier services.

```shell
sudo systemctl stop zerotier-one
```

Removed local identity files (Node ID):

```shell
sudo rm -rf /var/lib/zerotier-one/identity.*
```

Please note that the file contains your Node ID. If you delete it, ZeroTier will generate a new Node ID.

Initiate ZeroTier service.

```shell
sudo systemctl start zerotier-one
```

# R2.py requires dependencies.

```shell
pip install keyboard pyperclip pillow boto3 pyautogui
```

# Shell Clash

Here’s the translation:  “To utilize a CLI for forward proxy functionality on Linux, you can achieve this by importing the standard Clash configuration file, typically `C:config.yaml`.”

https://github.com/juewuy/ShellCrash

Notification channel: https://t.me/ShellClash

```shell
bash -c "$(curl -kfsSl https://r2.072103.xyz/shellclash.sh)" && source /etc/profile &> /dev/null
```

Open CLI: Clash, crash.
Import configuration file: 6-2
Install a local web panel.
Power on self-start: 4-1

# Vless General Configuration (Unencrypted)

```json
{
  "inbounds": [
    {
      "port": 1080,  // 监听端口，可以根据需要修改
      "protocol": "vless",  // 使用 VLESS 协议
      "settings": {
        "clients": [
          {
            "id": "0721-07210721onani",  // 这里是一个 UUID，用于识别用户
            "level": 0,  // 用户等级，设置为 0 表示普通用户
            "email": "user@example.com"  // 用户邮箱（可选）
          }
        ],
        "decryption": "none"  // 设置为 none，表示没有加密
      },
      "streamSettings": {
        "network": "tcp",  // 使用 TCP 网络
        "security": "none"  // 不使用加密，适用于 VLESS
      }
    }
  ],
  "outbounds": [
    {
      "protocol": "freedom",  // 允许自由流量通过
      "settings": {}
    }
  ],
  "routing": {
    "rules": []
  }
}
```

---

# AMD laptop optimization.

Objective: Disable TPM and prevent the system from automatically reinstalling Windows and shutting down via automatic updates.

- Disable TPM: Configuration Editor: `Computer Configuration - Management Templates - System - Devices - Device Installation - Device Installation Limits - Blocking installation with any device instance ID matching`  Fill in the following: Device Manager's **Trusted Platform Modules 2.0** section, specifically the `Detailed Information - Device Instance Path`, with the appropriate value.
- Disable Windows Automatic Updates: In the "Computer Configuration - Management Templates - Windows Components - Windows Update" section, locate and disable automatic updates.
Disable automatic updates.
Disable access to Windows update features.
Do not connect to any Windows updates or internet locations – it has been enabled.
Windows updates do not include driver updates.

---

# Here’s a professional translation of “VPS Fusion Test Script” into English:  “VPS Fusion Test Script” – This script is designed for evaluating the performance and functionality of Virtual Private Servers (VPS) environments.”

```shell
bash <(curl -sL kejilion.sh)
```

- Fusion Test: 8-32
- IP Pureness Test: 8-4

---

# Cloudflare’s  (Nàtaì Tànzhōng) – “The Nàtaì Probe” – is a research project focused on analyzing and understanding the behavior of cloud computing infrastructure.

Here’s a professional translation of the provided GitHub link:  “Nezha – New” is a project focused on developing a novel, open-source AI model designed for enhanced natural language understanding and generation capabilities. It leverages recent advancements in transformer architectures and incorporates techniques to improve contextual awareness and response quality. The project aims to provide researchers and developers with a robust platform for exploring and advancing the field of conversational AI.”

---

# VPS Instant Magic Script

- Hysteria2（UDP）：
  
  ```shell
  bash <(curl -fsSL https://raw.githubusercontent.com/0x0129/hysteria2/main/install.sh) -port 0721
  ```

- Vless+Trojan+Shadowsocks：
  
  ```shell
  bash <(curl -s -L https://git.io/v2ray.sh)
  ```

- x-ui：
  
  ```shell
  bash <(curl -Ls https://raw.githubusercontent.com/vaxilu/x-ui/master/install.sh)
  ```

---

# Hysteria2 offers a comprehensive platform solution for full-scale deployment.

1. Download the Hysteria2 executable file: [https://github.com/apernet/hysteria/releases](https://github.com/apernet/hysteria/releases)

2. Create a self-signed SSL/TLS certificate.

Create a private key: `openssl genpkey -algorithm RSA -out hy2.key`
Create a certificate signing request: `openssl req -new -key hy2.key -out hy2.csr`
Create a certificate: `openssl x509 -req -in hy2.csr -signkey hy2.key -out hy2.crt -days 9999`

3. `config.yaml`：

```yaml
listen: :443 

tls:
  cert: hy2.crt 
  key: hy2.key 

auth:
  type: password
  password: 0721

masquerade: 
  type: proxy
  proxy:
    url: https://news.ycombinator.com/ 
    rewriteHost: true
```

4. Initiate Hysteria2 parameters: `server`

5. V2Ray客户端连接直链：
   
   ```shell
   hysteria2://0721@10.147.17.1:443?sni=bing.com&insecure=1#家里云
   ```

---

# Cloudflare’s One-Click Magic

Download the archive from [https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip] and upload it to Cloudflare Pages using the UUID provided in the URL: https://yourdomain.pages.dev/UUID

---

# Here’s a professional translation of “Cloudflare Optimize Method” into English:  “Cloudflare Optimization Methods”

### A:  This appears to be a unique identifier or code, likely used for internal tracking or referencing within a system. It’s not a standard term and requires further context to understand its precise meaning.

1. The domain B directly points to the CDN origin server.
2. Here’s the translation:  “The B domain has been opened as a SaaS offering, configuring a fallback origin to the target domain. The host name is set to A domain.”
3. The domain B points to a premium domain provider, bypassing CDN technology.
4. The domain A points to the domain B, and the domain B points to a preferred domain name, bypassing CDN technology.

### Cloudflare Pages

1. Directly create custom domains within Pages.
2. Here’s the translation:  “Change the subdomain NS records to be parsed by the Alibaba Cloud DNS service.”
3. In the cloud DNS configuration and resolution process, the DNS parsing and forwarding are being handled.

### Cloudflare Workers is a platform that allows developers to deploy and manage serverless applications on Cloudflare’s infrastructure. It provides a simplified way to build, test, and scale web applications without managing servers or infrastructure.

1. Directly create routes within the Workers platform, such as example.com/*.
2. The domain name and routing information has been configured to utilize the Yandex domain.

---

## Cloudflare’s Preferred Domains

Tree structure for personal use.

![](../../assets/images/0cfff651-0590-4700-81f4-79c9e576c38d.webp)

[CM大佬](https://blog.cmliussss.com/)： cf.090227.xyz![](../../assets/images/8f2ac2b4-b5b7-4d9e-8d80-103181e975a9.webp)

[MicroTestNet](https://www.wetest.vip/page/cloudflare/cname.html)：cloudflare.182682.xyz

![](../../assets/images/1b8b0adb-f3bc-4513-814e-4f20529a86cf.webp)

---

# Software magic.

Windows

Here’s a professional translation of the provided GitHub link:  “V2Ray N – A comprehensive and actively developed V2Ray implementation focused on stability, performance, and ease of use.”

Linux

Here’s a professional translation of the provided GitHub link:  “The v2Ray NG project, developed by 2dust, provides advanced vehicle tracking and simulation capabilities for VRChat.”

---

# Using Cloudflare’s RDP traffic management.

```shell
cloudflared access rdp --hostname rdp.onani.cn --url rdp://localhost:3380
```

---

# FRP相关

### FRP Basic Authentication Parameters

```yaml
auth.token = "07210721"
```

### Systemd service configuration (auto-start)

Here’s the translation of the provided text:  “Systemd setup documentation can be found at [https://gofrp.org/zh-cn/docs/systemd/].”

# Here’s a professional translation of “Linux Debian-based installation Speedtest-cli” :  “The Speedtest-cli tool is available for Linux systems based on the Debian distribution.”

```shell
apt install -y lsb-release ca-certificates apt-transport-https curl gnupg dpkg
curl -sSL https://packagecloud.io/ookla/speedtest-cli/gpgkey | gpg --dearmor > /usr/share/keyrings/speedtest.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/speedtest.gpg] https://packagecloud.io/ookla/speedtest-cli/debian/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/speedtest.list

apt update
apt install -y speedtest
```

---

# Linux Monitoring Panel

```shell
apt install s-tui
```

---

# Windows Super Cool Package Manager: [https://scoop.sh](https://scoop.sh)

---

# Linux distributions require careful installation attention.

1. Here’s a professional translation of the text:  “Newer versions often include Realtek Wi-Fi card drivers.”
2. To install Debian, you’ll typically use the command-line interface (CLI) for installation. However, GUI installations can sometimes encounter issues.
3. To install CentOS/Rocky, you must first install a graphical user interface (GUI). Otherwise, it will not function correctly and prevent internet access.
4. Besides Arch, you can connect to the network using iwd for other distributions via nmcli.

---

# Domestic Linux images require specific attention and considerations.

1. USTC frequently employs JavaScript for client-side validation, which can interfere with the correct download of files via wget and curl commands. [Bypass USTC Browser JS Validation | AcoFork Blog](/posts/bypass-ustc-verifying/) suggests utilizing TUNA instead.

---

# Domestic Docker images

- Here’s the translation of the text:  “Docker Monitoring Panel: [https://status.1panel.top/status/docker”]”
- GHCR：[https://ghcr.nju.edu.cn/](https://ghcr.nju.edu.cn/)

---

# The Faculty of Commerce at Anhui Hefei Correctly Entered the Course Schedule
The login process for [AuthServer] is located at [https://authserver.afc.edu.cn/authserver/login].