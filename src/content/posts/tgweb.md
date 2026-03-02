---
title: 从零打造国内直连的专属 Telegram Web
published: 2026-03-02
description: TG Web采用前后端分离，前端可以部署到静态托管平台，而后端可以用各种服务反代
image: "https://img.xiegao.top/file/AgACAgUAAyEGAATeotMCAAMLaaUfMy36qvEnIduodQM0r91-jD4AAq4OaxueIChVRmgb-qzpVQIBAAMCAAN5AAM6BA.jpg"
tags: [Telegram, Nginx, 反向代理, Cloudflare Pages, GitHub Actions]
category: 教程
draft: false
---

如果你想在没有任何翻墙工具的国内网络环境下，随时随地流畅访问 Telegram，自己动手部署一套专属的 Telegram Web（基于官方的 Web K 版本）绝对是最极客也最一劳永逸的选择。

这篇文章记录了我利用 Cloudflare Pages 托管前端，并使用一台海外服务器（借助 1Panel 面板与 OpenResty/Nginx）反代官方底层 MTProto API 的全过程。期间踩坑无数（跨域拦截、WebSocket 断连、伪装失败、Cloudflare IP 被墙等），最终打磨出了这套**“终极完美版”**直连方案。

## 阶段一：前端部署与“伪装术”

前端部分我们选择白嫖 Cloudflare Pages。为了防止审查扫描器探测到我们的真实用途，这里将打包后的真实入口重命名，并在根目录放一个虚假的 Nginx 默认欢迎页。

### 修改构建命令与发布目录
在 Cloudflare Pages 的构建配置中，官方源码编译后会输出到 `public` 文件夹。

将**构建命令**修改为如下命令（注意将 `xiegao.html` 替换为你自己想要的私密入口名）：

```bash
pnpm run build && mv public/index.html public/xiegao.html && echo '<!DOCTYPE html><html><head><title>Welcome to nginx!</title></head><body><h1>Welcome to nginx!</h1><p>If you see this page, the nginx web server is successfully installed and working.</p></body></html>' > public/index.html
```

将**部署命令**设置为：

```bash
npx wrangler deploy --assets=public --compatibility-date=2026-02-22
```

![图1：构建配置页面截图，注意 Build command 和 public 目录](https://img.xiegao.top/file/AgACAgUAAyEGAATeotMCAAMDaaUcBtiaxHdOLkRMb0bWspuHDDUAAqUOaxueIChVxa6FlXtIY5EBAAMCAAN4AAM6BA.jpg)

此时，当其他人访问你的前端主域名时，只能看到无聊的 `Welcome to nginx!`，而你自己访问 `/xiegao.html` 时，熟悉的登录界面就会出现。

## 阶段二：后端 API 反向代理（最硬核的踩坑区）

前端部署好后，如果不处理后端 API，会一直卡在 `Waiting for network` 或者加载不出二维码（空白）。因为前端无法和 Telegram 官方的 WebSocket 建立连接。

这里必须有一台网络畅通的海外服务器。为了防止和同服务器上的其他网站发生 Nginx 冲突，**强烈建议使用一个全新的免费二级域名（如 `*.web.xuegao.cc.cd`）专门做 API 反代**，实现完全隔离。

以下是专为 Telegram MTProto 协议定制的 Nginx/OpenResty 终极代理配置。请直接在 1Panel 的网站配置中全盘替换：

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    
    # 【核心】：使用通配符匹配所有子域名，彻底杜绝漏网之鱼导致本地 404
    server_name *.web.xuegao.cc.cd web.xuegao.cc.cd;
    
    index index.php index.html index.htm default.php default.htm default.html;
    
    # 替换为你实际的 SSL 证书路径
    ssl_certificate /www/sites/xuegao.cc.cd/ssl/fullchain.pem; 
    ssl_certificate_key /www/sites/xuegao.cc.cd/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    
    location / {
        resolver 8.8.8.8 1.1.1.1 valid=300s ipv6=off;
        
        # 【智能路由核心】：自动将你的域名映射到官方对应的 *.web.telegram.org
        set $target "web.telegram.org";
        if ($host ~* "^(.+)\.web\.xuegao\.cc\.cd$") {
            set $target "$1.web.telegram.org";
        }

        # 智能识别 WebSocket 长连接，防止协议降级导致白屏
        set $my_connection "keep-alive";
        if ($http_upgrade = "websocket") {
            set $my_connection "Upgrade";
        }

        # 拦截 OPTIONS 预检请求，秒回放行，解决跨域 CORS 拦截
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' '*' always;
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
            add_header 'Access-Control-Allow-Headers' '*' always;
            add_header 'Access-Control-Max-Age' 1728000;
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204;
        }

        proxy_pass https://$target;
        
        # 【核心救命指令】：必须显式声明 HTTP/1.1，并彻底关闭 Nginx 缓冲，让 MTProto 数据流秒传！
        proxy_http_version 1.1;
        proxy_buffering off;
        proxy_request_buffering off;
        
        # 头部传递与伪装
        proxy_set_header Host $target;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $my_connection;
        
        proxy_set_header Origin "[https://web.telegram.org](https://web.telegram.org)";
        proxy_set_header Referer "[https://web.telegram.org/](https://web.telegram.org/)";
        
        # 抹除代理特征，防止真实 IP 暴露被官方判定为异常机器访问
        proxy_set_header X-Real-IP "";
        proxy_set_header X-Forwarded-For "";
        
        # SSL与跨域强行放行
        proxy_ssl_server_name on;
        proxy_ssl_name $target;
        proxy_ssl_verify off;
        
        proxy_hide_header 'Access-Control-Allow-Origin';
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Expose-Headers' '*' always;
        
        # 防止长轮询掉线
        proxy_connect_timeout 60s;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}
```

![图2：1Panel 面板网站配置界面](https://img.xiegao.top/file/AgACAgUAAyEGAATeotMCAAMFaaUcofEnIYWImDlpA3B9J02GfcgAAqcOaxueIChVEOtm3ODT8R0BAAMCAAN3AAM6BA.jpg)

> **避坑笔记：** > 期间尝试过将 API 反代也放在 Cloudflare Workers 上以提升带宽上限。但实测发现，只要不开 VPN 页面依然无法加载。原因在于 Cloudflare 分配的 Anycast IP 在国内绝大部分地区被进行了 SNI 阻断或封锁。因此，退回使用干净的海外独立 IP 服务器直连，才是最稳妥的选择。关掉 `proxy_buffering` 后，普通的 20Mbps 带宽看视频也足够流畅。

## 阶段三：自动化部署，做个“甩手掌柜”

Telegram 官方的 Web 源码更新非常频繁。为了让我们修改过 API 域名的代码始终与官方同步，我们可以在 GitHub 仓库里利用 Actions 编写一个自动化脚本。

在代码仓库新建 `.github/workflows/auto-update.yml`，输入以下脚本。它会每隔 3 天自动拉取官方最新代码，地毯式替换为你自己的 API 域名，然后自动触发部署更新。

```yaml
name: Auto Sync & Replace Domain

on:
  schedule:
    # 每隔 3 天的 UTC 时间凌晨 2 点执行一次
    - cron: '0 2 */3 * *'
  workflow_dispatch:

jobs:
  update-and-replace:
    runs-on: ubuntu-latest
    permissions:
      contents: write

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Fetch upstream, Protect workflow, and Hard reset
        run: |
          git config --global user.name "github-actions[bot]"
          git config --global user.email "github-actions[bot]@users.noreply.github.com"
          
          # 【护城河】：备份我们自己写的这个 Action 脚本
          cp .github/workflows/auto-update.yml /tmp/auto-update.yml
          
          # 拉取官方源并暴力重置
          git remote add upstream [https://github.com/morethanwords/tweb.git](https://github.com/morethanwords/tweb.git)
          git fetch upstream
          git checkout master
          git reset --hard upstream/master
          
          # 恢复脚本
          mkdir -p .github/workflows
          cp /tmp/auto-update.yml .github/workflows/auto-update.yml

      - name: Global Aggressive Replace API Domains
        run: |
          # 核心：地毯式无死角搜索并替换官方域名为你自己的 API 代理域名
          find . -type f -not -path '*/\.git/*' -not -path '*/\.github/*' -exec sed -i 's/web\.telegram\.org/web\.xuegao\.cc\.cd/g' {} +

      - name: Commit and Force Push
        run: |
          git add .
          git commit -m "Auto sync with upstream and apply custom domains" || echo "No changes"
          git push origin master --force
```

![图3：GitHub Actions 页面运行成功](https://img.xiegao.top/file/AgACAgUAAyEGAATeotMCAAMHaaUdJgN8qzV7hYtoK4ab7MfzjhUAAqgOaxueIChVYT-dt4NU8dQBAAMCAAN3AAM6BA.jpg)

至此，只要你的服务器稳定，这套系统就能全天候无死角运转。将前台专属网页添加到手机主屏幕，尽情享受秒开、防封锁的丝滑体验吧！

![图4：成功截图](https://img.xiegao.top/file/AgACAgUAAyEGAATeotMCAAMJaaUdyB6qCb-uSeYdQ3zrDRe9aowAAqsOaxueIChVAfQttpR5z8cBAAMCAAN3AAM6BA.jpg)
