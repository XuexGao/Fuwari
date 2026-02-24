---
title: "Record of"
description: "Here’s the translation:  “Some records are updated periodically.”"
category: "Record"
draft: false
image: /random/h
lang: en
published: 1999-01-01
tags:
- 记录
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# zt重置设备ID

In ZeroTier, if you clone a VM or copy system images due to device ID (Node ID) duplication, you need to reset the device ID. The device ID in ZeroTier is based on the machine's private key and cannot be modified directly within software; however, you can reset it using the following methods:

To reset your system, follow these steps:  1.  Boot into recovery mode. 2.  Select "Advanced options" from the GRUB menu. 3.  Choose "Recovery mode." 4.  From the Recovery menu, select "root shell." 5.  Type `reboot` and press Enter. 6.  After reboot, you will be presented with a login screen.  The process may vary slightly depending on your distribution. Refer to your distribution’s documentation for more detailed instructions.

Stop ZeroTier service.

```shell
sudo systemctl stop zerotier-one
```

Deleted local identity files (Node IDs).

```shell
sudo rm -rf /var/lib/zerotier-one/identity.*
```

The identity.* file contains your Node ID; deleting it will generate a new Node ID by ZeroTier.

Launch ZeroTier services.

```shell
sudo systemctl start zerotier-one
```

# r2.py requires dependencies.

```shell
pip install keyboard pyperclip pillow boto3 pyautogui
```

# ShellClash

For use on Linux from the command line to perform reverse proxying, you can achieve this by importing the standard Clash configuration file `config.yaml`.

https://github.com/juewuy/ShellCrash

Tg通知频道：https://t.me/ShellClash

```shell
bash -c "$(curl -kfsSl https://r2.072103.xyz/shellclash.sh)" && source /etc/profile &> /dev/null
```

Open CLI: Clash, crash
6-2
Install a local web panel: 9-4-1
Start-up and power-on: 4-1

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

Okay, please provide the text. I’m ready when you are.

# AMD laptop optimization

Disable TPM and prevent system reinstallation, disable Windows automatic updates.

- Disable TPM: Group Policy Editor: `Computer Configuration - Management Templates - System - Device Installation - Device Installation Restrictions - Blocking installation with any device instance ID matching` Fill in: The value of the **Trusted Platform Modules 2.0**(Device Manager - `Detailed Information - Device Instance Path)` within the `Detailed Information - Device Instance Path` of the **Trusted Platform Modules 2.0** group.
- Close Windows automatic updates: in the "Computer Configuration - Management Templates - Windows Components - Windows Update" section.
Configuration automatic updates are disabled.
Deleted all Windows update access permissions.
Do not connect to any Windows updates or Internet locations. It has been enabled.
Windows updates do not include driver updates.

Okay, please provide the text. I’m ready when you are.

# VPS Fusion Test Script

```shell
bash <(curl -sL kejilion.sh)
```

- Fusion test: 8-32
- Pureness test: 8-4

Okay, please provide the text. I’m ready when you are.

# Nascent Cloudflare’s investigation into the nature of the ‘Who’ and ‘What’ behind the recent surge in security incidents.

Nezha New

Okay, please provide the text. I’m ready when you are.

# VPS One-Click Magic Script

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

Okay, please provide the text. I’m ready when you are.

# Hysteria2 Service Platform (Universal)

1. Download the Hysteria 2 executable file: https://github.com/apernet/hysteria/releases

2. Self-signed SSL/TLS certificate

Create a private key: `openssl genpkey -algorithm RSA -out hy2.key`
Create an SSL certificate signing request: `openssl req -new -key hy2.key -out hy2.csr`
Create a certificate: openssl x509 -req -in hy2.csr -signkey hy2.key -out hy2.crt -days 9999

3. Okay, I understand. Please provide the text.

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

4. Start Hysteria2 parameters: `server`

5. V2Ray客户端连接直链：
   
   ```shell
   hysteria2://0721@10.147.17.1:443?sni=bing.com&insecure=1#家里云
   ```

Okay, please provide the text. I’m ready when you are.

# Cloudflare’s one-click magic.

Download the file from https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip and upload it to Cloudflare Pages using its UUID. Access https://yourdomain.pages.dev/UUID

Okay, please provide the text. I’m ready when you are.

# Cloudflare’s Preferred Method

### A, CNAME

1. The B domain directly points to a CDN origin server.
2. The B domain has been enabled as a SaaS offering, setting the rollback origin to the target domain. Custom hostname is A domain.
3. B domain points to premium domains, not CDN-based.
4. A domain pointing to B domain points to a preferred domain name, without CDN protection.

### Cloudflare Pages

1. Directly create custom domains within Pages.
2. Changed subdomain NS to Alibaba Cloud DNS解析
3. In Alibaba Cloud DNS setup and parsing forwarding analysis.

### Cloudflare Workers

1. Directly create routes within Workers, such as example.com/*.
2. The routing domain is being resolved to a preferred domain.

Okay, please provide the text. I’m ready when you are.

## Cloudflare Preferred Domains

binary tree

![](../../assets/images/0cfff651-0590-4700-81f4-79c9e576c38d.webp)

[CM大佬](https://blog.cmliussss.com/)： cf.090227.xyz![](../../assets/images/8f2ac2b4-b5b7-4d9e-8d80-103181e975a9.webp)

Micro-Measurement Network (Micro-Measurement Net) at cloudflare.182682.xyz

![](../../assets/images/1b8b0adb-f3bc-4513-814e-4f20529a86cf.webp)

Okay, please provide the text. I’m ready when you are.

# Magic software

Windows

https://github.com/2dust/v2rayN

Linux

https://github.com/2dust/v2rayNG

Okay, please provide the text. I’m ready when you are.

# Using Cloudflared RDP traffic.

```shell
cloudflared access rdp --hostname rdp.onani.cn --url rdp://localhost:3380
```

Okay, please provide the text. I’m ready when you are.

# Fiber Reinforced Polymer (FRP) related

### Basic Certification Parameters

```yaml
auth.token = "07210721"
```

### FRP systemd service configuration (boot-time self-start)

CRITICAL RULES: 1. Output ONLY the translated text. No chatter, no 'Here is the translation', no explanations. 2. Keep all special tags like [content], **content**, *content*, `content` exactly as they are. Translate the 'content' inside the tags, but do NOT remove or alter the [[X: ]] markers. 3. If the input is in Chinese, you MUST translate it to English. Never return Chinese text. 4. DO NOT wrap the output in quotes unless the original text was wrapped in quotes.  The GoFRP systemd setup documentation is available at https://gofrp.org/zh-cn/docs/setup/systemd/.

# ``` Linux Debian/Ubuntu Speedtest-cli installation guide ```

```shell
apt install -y lsb-release ca-certificates apt-transport-https curl gnupg dpkg
curl -sSL https://packagecloud.io/ookla/speedtest-cli/gpgkey | gpg --dearmor > /usr/share/keyrings/speedtest.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/speedtest.gpg] https://packagecloud.io/ookla/speedtest-cli/debian/ $(lsb_release -sc) main" > /etc/apt/sources.list.d/speedtest.list

apt update
apt install -y speedtest
```

Okay, please provide the text. I’m ready when you are.

# Linux Monitoring Face  This tool provides comprehensive monitoring capabilities for Linux systems. It allows users to track key performance indicators (KPIs) and system health metrics, enabling proactive issue resolution and optimization.  Features include real-time dashboards, log analysis, alerting, and customizable reporting.  It’s designed for both experienced administrators and technical analysts.

```shell
apt install s-tui
```

Okay, please provide the text. I’m ready when you are.

# Windows Super Cool Package Manager: https://scoop.sh

Okay, please provide the text. I’m ready when you are.

# Linux distributions typically have a few key installation steps to ensure a smooth and stable system setup. Here’s a breakdown:  1. **Bootloader:**  First, you need to boot into your chosen operating system (like Ubuntu, Debian, or Fedora). The bootloader is usually GRUB (GNU GRand Unified Bootloader) or similar. You'll typically need to select the option to "Try" or "Install" the distribution.  2. **ISO Image:**  Download the ISO image of your desired Linux distribution from its official website. This is a digital disk containing the installation files.  3. **Bootable USB Drive:** Use a tool like Rufus (Windows) or Etcher (cross-platform) to create a bootable USB drive with the ISO image.  4. **BIOS/UEFI Settings:**  During startup, you’ll need to enter your BIOS or UEFI settings.  You'll typically find this by pressing Delete, F2, F10, or Esc during the initial boot process.  Select the option to "Boot from USB" or "USB Boot."  5. **Installation Process:** Follow the on-screen instructions to complete the installation. This usually involves selecting a partition for your hard drive and choosing an installation type (e.g., "Guided Partitioning").  6. **Post-Installation:** After installation, you’ll need to configure your system settings, install essential packages, and update your software.  This often involves using the command line or graphical user interface tools provided by the distribution.  7. **Network Configuration:** Set up a network connection (Ethernet or Wi-Fi) for accessing online resources and updates.  8. **User Account Creation:** Create a user account with appropriate permissions.  9. **Security Updates:**  Regularly update your system to ensure security patches and bug fixes.  These are general steps, and the exact process may vary slightly depending on the distribution you choose. Refer to the official documentation for your chosen Linux distribution for detailed instructions.

1. Realtek has a wired network card driver.
2. Install Debian using CLI (command-line installation) is typically required for GUI installations, which can experience issues.
3. Install CentOS/Rocky requires installing a graphical user interface (GUI) first, otherwise it will not be able to connect to the network.
4. Besides using iwd for connecting to the network, other distributions can use nmcli to connect to the network.

Okay, please provide the text. I’m ready when you are.

# Domestic Linux images require careful attention.

1. USTC frequently uses JavaScript for client-side validation, which can prevent wget and curl commands from correctly downloading files. It is recommended to use TUNA (清华源) instead.

Okay, please provide the text. I’m ready when you are.

# Domestic Docker images

- Docker Monitoring: https://status.1panel.top/status/docker
- Nanjing University’s GHCR (Global High-Core Research Center) Mirror Source: https://ghcr.nju.edu.cn

Okay, please provide the text. I’m ready when you are.

# 安徽财贸职业学院教务学生正确入口（课表导入）
https://authserver.afc.edu.cn/authserver/login