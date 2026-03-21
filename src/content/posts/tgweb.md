---
title: 从零打造国内直连的专属 Telegram Web
published: 2026-03-02
description: TG Web采用前后端分离，前端可以部署到静态托管平台，而后端可以用各种服务反代
image: "https://img.xiegao.top/file/s3:s3_1774059414737_ku762a.jpg"
tags: [Telegram, Nginx, 反向代理, Cloudflare Pages, GitHub Actions]
category: 教程
draft: false
---

如果你想在没有任何翻墙工具的国内网络环境下，随时随地流畅访问 Telegram，自己动手部署一套专属的 Telegram Web（基于官方的 Web K 版本）绝对是最极客也最一劳永逸的选择。

这篇文章记录了我利用 Cloudflare Pages 托管前端，并使用一台海外服务器（借助 1Panel 面板与 OpenResty/Nginx）反代官方底层 MTProto API 的全过程。期间踩坑无数（跨域拦截、WebSocket 断连、伪装失败、Cloudflare IP 被墙等），最终打磨出了这套**“终极完美版”**直连方案。

## 阶段一：前端部署并伪装

前端部分可以白嫖 Cloudflare Pages。为了防止审查扫描器探测到我们的真实用途，这里将打包后的真实入口重命名，并在根目录放一个虚假的 Nginx 默认欢迎页。

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

![图1：构建配置页面](https://img.xiegao.top/file/s3:s3_1774059414737_ku762a.jpg)

此时，当其他人访问你的前端主域名时，只能看到无聊的 `Welcome to nginx!`，而你自己访问 `/xiegao.html` 时，熟悉的登录界面就会出现。

## 阶段二：后端 API 反向代理

前端部署好后，如果不处理后端 API，会一直卡在 `Waiting for network` 或者加载不出二维码（空白）。因为前端无法和 Telegram 官方的 WebSocket 建立连接。

这里必须有一台网络畅通的海外服务器。为了防止和同服务器上的其他网站发生 Nginx 冲突，**强烈建议使用一个全新的免费二级域名（如 `*.web.xuegao.cc.cd`）专门做 API 反代**，实现完全隔离。

这是 Telegram MTProto 的 Nginx/OpenResty 的代理配置。可以直接在 1Panel 的网站配置中复制粘贴：

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    
    
    server_name *.web.xuegao.cc.cd web.xuegao.cc.cd;
    
    index index.php index.html index.htm default.php default.htm default.html;
    
    # 替换为你实际的 SSL 证书路径
    ssl_certificate /www/sites/xuegao.cc.cd/ssl/fullchain.pem; 
    ssl_certificate_key /www/sites/xuegao.cc.cd/ssl/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;
    
    location / {
        resolver 8.8.8.8 1.1.1.1 valid=300s ipv6=off;
        
        
        set $target "web.telegram.org";
        if ($host ~* "^(.+)\.web\.xuegao\.cc\.cd$") {
            set $target "$1.web.telegram.org";
        }

        
        set $my_connection "keep-alive";
        if ($http_upgrade = "websocket") {
            set $my_connection "Upgrade";
        }

        
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
        
        
        proxy_http_version 1.1;
        proxy_buffering off;
        proxy_request_buffering off;
        
        
        proxy_set_header Host $target;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $my_connection;
        
        proxy_set_header Origin "[https://web.telegram.org](https://web.telegram.org)";
        proxy_set_header Referer "[https://web.telegram.org/](https://web.telegram.org/)";
        
        
        proxy_set_header X-Real-IP "";
        proxy_set_header X-Forwarded-For "";
        
        proxy_ssl_server_name on;
        proxy_ssl_name $target;
        proxy_ssl_verify off;
        
        proxy_hide_header 'Access-Control-Allow-Origin';
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Expose-Headers' '*' always;
        
        
        proxy_connect_timeout 60s;
        proxy_read_timeout 86400s;
        proxy_send_timeout 86400s;
    }
}
```

![图2：1Panel 面板网站配置界面](https://img.xiegao.top/file/s3:s3_1774059414754_vqpmm6.jpg)



## 阶段三：使用GitHub Actions自动化部署

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
          
          
          cp .github/workflows/auto-update.yml /tmp/auto-update.yml
          
          
          git remote add upstream [https://github.com/morethanwords/tweb.git](https://github.com/morethanwords/tweb.git)
          git fetch upstream
          git checkout master
          git reset --hard upstream/master
          
          
          mkdir -p .github/workflows
          cp /tmp/auto-update.yml .github/workflows/auto-update.yml

      - name: Global Aggressive Replace API Domains
        run: |
          # 核心：地毯式无死角搜索并替换官方域名为你自己的 API 代理域名 记得换为自己的域名
          find . -type f -not -path '*/\.git/*' -not -path '*/\.github/*' -exec sed -i 's/web\.telegram\.org/web\.xuegao\.cc\.cd/g' {} +

      - name: Commit and Force Push
        run: |
          git add .
          git commit -m "Auto sync with upstream and apply custom domains" || echo "No changes"
          git push origin master --force
```

![图3：GitHub Actions 页面运行成功](https://img.xiegao.top/file/s3:s3_1774059416357_ype7ys.jpg)

至此，只要你的服务器稳定，这套系统就能全天候运行。

![图4：成功截图](https://img.xiegao.top/file/s3:s3_1774059416511_x30x7v.jpg)
