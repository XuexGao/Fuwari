---
title: "哪吒监控搭建教程"
description: "Would you like to monitor your server from a divine perspective? Also, please take care of Uptime Kuma!"
published: 2025-09-03
image: '../../assets/images/2025-09-03-05-00-43-image.webp'
tags: [哪吒监控]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article provides a comprehensive guide to installing and configuring Nezha, a web UI for monitoring servers using WebSockets and gRPC communication. It outlines the installation process, including setting up the connection address, specifying the backend server IP, and managing notifications.  It also addresses potential issues related to CDN usage and offers troubleshooting steps for common problems like network connectivity and deployment errors.
:::

Official Tutorial: https://nezha.wiki/

# Installation Panel (Dashboard)

The panel endpoint is WebUI, and it also accepts backend connections. Users and panel connections use WebSocket communication, while the backend and panel endpoints use gRPC communication.

```bash
curl -L https://raw.githubusercontent.com/nezhahq/scripts/refs/heads/main/install.sh -o nezha.sh && chmod +x nezha.sh && sudo ./nezha.sh
```

Default port is 8008

Please specify the installation command address (e.g., example.com:443) in the pre-configured nezha-agent connection address. You can also configure a CDN, and if you do, please specify the CDN domain (e.g., cdn.example.com:443) ensuring your CDN supports gRPC communication. I do not recommend using CDN for backend and panel communication.

```bash
请输入站点标题: Nezha - AcoFork
请输入暴露端口: (默认 8008)
请指定安装命令中预设的 nezha-agent 连接地址 （例如 example.com:443）46.232.60.28:8008
是否希望通过 TLS 连接 Agent？（影响安装命令）[y/N]n
请指定后台语言
1. 中文（简体）
2. 中文（台灣）
3. English
请输入选项 [1-3]1
```

Please access the WebUI for the CRITICAL: 8008 port.

Click login, default account passwords are all `admin`.

![](../../assets/images/2025-09-03-05-07-55-image.webp)

First, change your administrator account password, move the mouse to the upper right corner of the avatar, and click `Personal Information`.

![](../../assets/images/2025-09-03-05-08-40-image.webp)

Update your profile.

![](../../assets/images/2025-09-03-05-09-06-image.webp)

# Install backend (agent)

Open the WebUI for "哪吒探针", you can find the installation command in the server column, select the corresponding system and then execute it from the terminal. You will see a new server with a random name shortly.

If your server is located on mainland China, it may not be able to connect to the raw GitHub repository `raw.githubusercontent.com`. A mirror can be used instead, such as `raw.gitmirror.com`.

![](../../assets/images/2025-09-03-05-10-14-image.webp)

# Configuration Services

Baedasa Probe also supports similar UptimeKuma-style service monitoring, supporting HTTP Ping and TCP, as detailed in the navigation menu’s services.

Here are all the services available, which can be used to monitor the server of the Nighthawk Probe.

![](../../assets/images/2025-09-03-05-15-22-image.webp)

# Okay, please provide the text. I’m ready when you are.

The 哪吒探针 supports configuration notifications to promptly notify you of service outages and downtime, as detailed in [通知设置 | 哪吒服务器监控](https://nezha.wiki/guide/notifications.html).

# The difficulty of solving these problems is a significant challenge for many students. A thorough understanding of the underlying concepts and effective problem-solving strategies are crucial for success. Students often struggle with applying theoretical knowledge to practical scenarios, requiring them to develop critical thinking skills and the ability to analyze complex situations. Furthermore, time management and attention to detail are essential when tackling challenging problems. Effective revision and practice are vital for reinforcing learned material and improving performance.

- 我套了CDN，服务器可以成功上线，但是获取到的IP为内网IP：请在系统设置中配置真实IP请求头![](../../assets/images/2025-09-03-05-19-32-image.webp)

- I am unable to deploy this project due to issues with Cloudflare CDN. The reason is currently unknown, but it appears to be a problem with the deployment process.