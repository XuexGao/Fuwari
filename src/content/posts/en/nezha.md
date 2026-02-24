---
title: "Nezha Monitoring Setup Tutorial"
description: "Want to monitor your server from a god's-eye view? And by the way, also handle the duties of Uptime Kuma!"
published: 2025-09-03
image: '../../assets/images/2025-09-03-05-00-43-image.webp'
tags: [哪吒监控]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide explains how to install and configure Nezha, a server monitoring tool, by setting up its dashboard (WebUI) and agent (backend). The dashboard is installed via a script, defaulting to port 8008, and requires specifying the agent connection address (e.g., VPS IP:8008). After installation, users can manage servers, set up monitoring services, configure notifications, and troubleshoot common issues like CDN compatibility or IP display problems.
:::

> Official Tutorial: https://nezha.wiki/

# Install the dashboard end (Dashboard)

> The panel end, i.e., WebUI, also accepts backend connections. Users connect to the panel via WebSocket, while the backend communicates with the panel end using gRPC.

```bash
curl -L https://raw.githubusercontent.com/nezhahq/scripts/refs/heads/main/install.sh -o nezha.sh && chmod +x nezha.sh && sudo ./nezha.sh
```

Default port is 8008

Fill in your `VPS IP:8008` in the `nezha-agent  （ example.com:443）`. Of course, you can also use a CDN; if you use a CDN, fill in `CDN:443`. Please ensure your CDN supports gRPC communication. I do not recommend using a CDN for backend and panel communication.

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

Next, you should be able to access the Nezha probe's WebUI via port 8008.

Click to log in; default username and password are both `admin`

![](../../assets/images/2025-09-03-05-07-55-image.webp)

First, let's change the administrator's account password. Move the mouse to the avatar in the top right corner and click `Personal Information`

![](../../assets/images/2025-09-03-05-08-40-image.webp)

Then click `Update Profile` to change the administrator account credentials

![](../../assets/images/2025-09-03-05-09-06-image.webp)

# Install the backend (Agent)

Open the Nezha Probe's WebUI; under the "Server" section, you can find the installation command, select the one corresponding to your system, and then execute it in the terminal. Shortly afterward, you will see a newly server with a random name.

*f your server is located in mainland China, you may not be able to connect to `raw.githubusercontent.com*. It is recommended to use the mirror [[C:raw.gitmirror.com` instead]]

![](../../assets/images/2025-09-03-05-10-14-image.webp)

# Configuration Service

Nezha Probe also supports service monitoring similar to UptimeKuma, supporting HTTP Ping and TCP. For details, please refer to the Services section in the navigation bar.

[[All services added here can be monitored using the servers already added to the Nezha probe]]

![](../../assets/images/2025-09-03-05-15-22-image.webp)

# Configure notifications

The Nezha probe supports configuring notifications to alert you promptly in cases such as service outages. See [Notification Settings | Nezha Server Monitoring](https://nezha.wiki/guide/notifications.html)

# Troubleshooting

- 我套了CDN，服务器可以成功上线，但是获取到的IP为内网IP：请在系统设置中配置真实IP请求头![](../../assets/images/2025-09-03-05-19-32-image.webp)

- I use Cloudflare CDN, and my server is always unable to come online. The cause is unclear, but deploying this project can resolve it [yumusb/nezha-new](https://github.com/yumusb/nezha-new)