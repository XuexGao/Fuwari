---
title: "How to Set Up a Naughty Monitor"
description: "Would you like to monitor your server from a divine perspective? Also, please take care of Uptime Kuma!"
published: 2025-09-03
image: '../../assets/images/2025-09-03-05-00-43-image.webp'
tags: [哪吒监控]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

Official Tutorial: [https://nezha.wiki/](https://nezha.wiki/)

# Installation Panel (Dashboard)

The panel endpoint is the Web UI, and it also accepts backend connections. Users and panel connections utilize WebSocket communication with the backend and the panel endpoint using gRPC.

```bash
curl -L https://raw.githubusercontent.com/nezhahq/scripts/refs/heads/main/install.sh -o nezha.sh && chmod +x nezha.sh && sudo ./nezha.sh
```

Default port is 8008.

Please specify the installation command address for the nezha-agent connection (e.g., example.com:443).  You can also configure a CDN, and if you do so, please provide the CDN domain name (e.g., 443) – ensure your CDN supports gRPC communication. I do not recommend using CDN for backend or panel communication.

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

Please enter the WebUI of the Navitas 8008 probe in port 8008.

Please log in, and the default administrator password is `admin`.

![](../../assets/images/2025-09-03-05-07-55-image.webp)

First, we will change the administrator account password, and the mouse cursor will move to the upper right corner of the avatar's image, clicking `Personal Information`.

![](../../assets/images/2025-09-03-05-08-40-image.webp)

Please click `Update Profile` to change your administrator password.

![](../../assets/images/2025-09-03-05-09-06-image.webp)

# Installation of the backend (agent)

To access the WebUI for "Natha Tangping," navigate to the server section and locate the installation command. Select the appropriate system, then execute it from the terminal. A new random server will be launched shortly.

If your server is located in mainland China, it may not be able to connect to the raw GitHub repository. A recommended alternative is to use a mirror, such as `raw.githubusercontent.com`.

![](../../assets/images/2025-09-03-05-10-14-image.webp)

# Configuration Services

“Nàtaì Tànzhēn” also supports similar services for monitoring uptime, including HTTP Ping TCP. Details can be found in the navigation menu’s service offerings.

Here’s the translation:  “All services available can be accessed and monitored from the server currently hosted in the Nighthawk Probe.”

![](../../assets/images/2025-09-03-05-15-22-image.webp)

# Configuration notification.

Zhang Da’s Probe supports configuration notifications, enabling you to receive timely alerts regarding service outages and downtime. Refer to [Notification Settings | Zhang Da Server Monitoring](https://nezha.wiki/guide/notifications.html).

# Difficult questions.

- 我套了CDN，服务器可以成功上线，但是获取到的IP为内网IP：请在系统设置中配置真实IP请求头![](../../assets/images/2025-09-03-05-19-32-image.webp)

- I am experiencing issues with deploying the project, and the server consistently fails to go live. The cause is currently unknown, but a solution can be implemented through deployment of this project. [yumusb/nezha-new](https://github.com/yumusb/nezha-new)