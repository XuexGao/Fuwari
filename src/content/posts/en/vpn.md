---
title: "Self-built reverse proxy server"
description: "Don’t buy an airport – it doesn’t feel authentic?"
category: "Tutorial"
draft: false
image: ../../assets/images/2024-11-21-08-24-54-image.webp
lang: en
published: 2024-11-22
tags: []
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Here’s a summary of the article:

The article explains how to leverage Cloudflare as an edge router using Vless – EdgeTunnel, focusing on utilizing a custom domain name for improved performance and stability. It details the steps involved in setting up this configuration, including obtaining a UUID, creating a variable, and connecting to the Cloudflare Pages project via the `pages.dev` domain.  The article highlights recent issues with Cloudflare's new routing policies (1101 error) and recommends removing the original project and re-deploying it to avoid being flagged as blocked. It also encourages users to register for a simple, single-click account. Finally, it introduces Hysteria2 and V2Ray as alternative routing protocols, providing links to their respective GitHub repositories for installation instructions.
:::

# Cloudflare as an edge router (Vless - EdgeTunnel)

“CF VLESS from Beginner to Mastery: A must-read content on cmliu/edgetunnel. Free Nodes, Premium Subscriptions, and Worker & Pages – a comprehensive guide packed with valuable insights.”

1. https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip 将它上传到你的Cloudflare Pages项目（没有Cloudflare账号？先去因特网上搜索教程注册一个！如果遇到卡慢可以试试看科学上网）
2. 进入 https://it-tools.tech/uuid-generator 随机获取一个uuid
3. 添加一个名称为`UUID`的变量绑定，值为第二步随机获取的（请不要泄露给他人！）
4. 重新上传第一步的`main.zip`。让Cloudflare重新部署page以适配新变量
5. 前往Pages项目 -> 自定义域：绑定自定义域名。（没有域名？推荐 https://nic.us.kg https://www.cloudns.net 。可以自行前往因特网搜索教程，这里不再赘述。也可以不绑定，直接使用cf分配的`pages.dev`域名。但是，部分地区`pages.dev`可能无法访问或者较易和谐）
6. 通过 `https://你的自定义域名/uuid` 查看仪表盘
7. 如图复制链接，打开V2Ray，导入。V2Ray客户端下载地址在文章最后
8. ![](../../assets/images/2024-11-24-00-17-22-image.webp)
9. 500Mbps的移动宽带，通过edgetunnel测速速度如下。测速网址： https://fast.com
10. ![](../../assets/images/2024-11-22-09-08-38-image.webp)
11. 如果你就是想要最低延迟，可以去用cfnat，这里放一个Windows的链接： https://www.youtube.com/watch?v=N2Y9TsiBgls 其他平台可以自行前往CM的YouTube查找
12. **注意！edgetunnel近期在Cloudflare新号上可能会报错1101，这可能并不是你的配置问题，而是被cf风控了。解决方案是删除原项目重新部署一遍，不要用一样的项目名！你也可以多弄几个其他的正常pages或workers项目做伪装！博主使用新号实测被gank了3次（每一次都换名字删除pages然后重新部署），然后一直稳定到现在**
13. **本人实测在全天使用edgetunnel的情况下已经使用了大部分的配额，所以请不要将自己的项目分享给别人，也不要拿去卖！自己注册简简单单！**
14. 如图为博主半天的使用量：我只是上了上Telegram~
15. ![](../../assets/images/2024-11-26-16-07-50-image.webp)

# I am providing a translation of the provided text. Please provide the text you would like me to translate.

## Hysteria2

Can visit these two warehouses for a one-click installation.

https://github.com/0x0129/hysteria2

https://github.com/seagullz4/hysteria2

The installation process involves signing with a self-signed certificate, without using Acme and without port jumping.

Client (Hiddify)

https://github.com/hiddify/hiddify-app

Other clients obtained the second GitHub repo through the second Github Repo.

## Using V2Ray

[https://github.com/233boy/v2ray](https://github.com/233boy/v2ray)

``` Install VPS Script: curl -s -L https://git.io/v2ray.sh ```

Install: After script execution completes, enter `v2ray` to change configuration settings.

Windows client: [https://github.com/2dust/v2rayN](https://github.com/2dust/v2rayN)

Android client: [Releases · 2dust/v2rayNG · GitHub](https://github.com/2dust/v2rayNG/releases)