---
category: 教程
description: 不要再买机场了！自建它不香吗？!
draft: false
image: ../assets/images/2024-11-21-08-24-54-image.webp
lang: ''
published: 2024-11-22
tags: []
title: 自建正向代理服务器
---
:::ai-summary{model="google/gemma-3-1b"}
以下是对文章的简短总结：

1.  **Cloudflare Pages 项目:** 通过 Cloudflare Pages 项目，可以创建 EdgeTunnel代理。需要先注册一个因特网账号并获取 Cloudflare 账号，然后使用 `UUID` 生成随机 UUID 并绑定到 `UUID`变量。
2.  **V2Ray Client 下载:** 下载 V2Ray 客户端地址在文章最后，用于导入和测试。
3.  **配置 & 测试:** 在 Pages 项目中，通过自定义域名（推荐：nic.us.kg、www.cloudns.net）绑定自定义域名。
4.  **仪表盘:** 通过 `https://你的自定义域名/uuid` 查看 V2Ray 仪表盘，了解速度和性能数据。
5.  **测试速度:** 移动宽带测试速度为 500Mbps，通过 EdgeTunnel测速显示为：[https://fast.com](https://fast.com)。
6.  **最低延迟:** 可以使用 cfnat 测试最低延迟，该链接在YouTube上展示了 Windows 的示例。
7.  **CF风控:**  recent Cloudflare 正在加强对新号的监控和风控，因此需要谨慎操作，避免被gank，并及时删除项目重新部署。
8.  **使用新协议：Hysteria2:** 可以使用 Hysteria2 协议进行一键安装。
9.  **V2Ray 使用:**  可以使用 V2Ray 客户端进行测试，但需注意使用 Shadowsocks 配置。
10. **VPS 代理:** 如果有国外 VPS 作为代理，可以通过使用 Hysteria2 和 V2Ray 进行配置。
:::

# 将Cloudflare作为代理使用（Vless - EdgeTunnel）

下面内容参考自：[CF VLESS 从入门到精通 cmliu/edgetunnel 必看内容 免费节点 优选订阅 Workers & Pages CM喂饭干货满满24 | CMLiussss Blog](https://vercel.blog.cmliussss.com/p/CM24/) 请支持原创作者！

1. https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip 将它上传到你的Cloudflare Pages项目（没有Cloudflare账号？先去因特网上搜索教程注册一个！如果遇到卡慢可以试试看科学上网）
2. 进入 https://it-tools.tech/uuid-generator 随机获取一个uuid
3. 添加一个名称为`UUID`的变量绑定，值为第二步随机获取的（请不要泄露给他人！）
4. 重新上传第一步的`main.zip`。让Cloudflare重新部署page以适配新变量
5. 前往Pages项目 -> 自定义域：绑定自定义域名。（没有域名？推荐 https://nic.us.kg https://www.cloudns.net 。可以自行前往因特网搜索教程，这里不再赘述。也可以不绑定，直接使用cf分配的`pages.dev`域名。但是，部分地区`pages.dev`可能无法访问或者较易和谐）
6. 通过 `https://你的自定义域名/uuid` 查看仪表盘
7. 如图复制链接，打开V2Ray，导入。V2Ray客户端下载地址在文章最后
8. ![](../assets/images/2024-11-24-00-17-22-image.webp)
9. 500Mbps的移动宽带，通过edgetunnel测速速度如下。测速网址： https://fast.com
10. ![](../assets/images/2024-11-22-09-08-38-image.webp)
11. 如果你就是想要最低延迟，可以去用cfnat，这里放一个Windows的链接： https://www.youtube.com/watch?v=N2Y9TsiBgls 其他平台可以自行前往CM的YouTube查找
12. **注意！edgetunnel近期在Cloudflare新号上可能会报错1101，这可能并不是你的配置问题，而是被cf风控了。解决方案是删除原项目重新部署一遍，不要用一样的项目名！你也可以多弄几个其他的正常pages或workers项目做伪装！博主使用新号实测被gank了3次（每一次都换名字删除pages然后重新部署），然后一直稳定到现在**
13. **本人实测在全天使用edgetunnel的情况下已经使用了大部分的配额，所以请不要将自己的项目分享给别人，也不要拿去卖！自己注册简简单单！**
14. 如图为博主半天的使用量：我只是上了上Telegram~
15. ![](../assets/images/2024-11-26-16-07-50-image.webp)

# 将你自己的国外VPS作为代理使用

## 使用新协议：Hysteria2

可以前往这两个仓库进行一键安装~

[https://github.com/0x0129/hysteria2](https://github.com/0x0129/hysteria2)

[https://github.com/seagullz4/hysteria2](https://github.com/seagullz4/hysteria2)

大致安装过程：自签名，不使用acme，不使用端口跳跃

客户端（Hiddify）：

[https://github.com/hiddify/hiddify-app](https://github.com/hiddify/hiddify-app)

其他客户端在第二个Github Repo获取

## 使用旧协议：V2Ray

[https://github.com/233boy/v2ray](https://github.com/233boy/v2ray)

VPS安装脚本：`bash <(curl -s -L https://git.io/v2ray.sh)`

详细安装：脚本执行完毕后输入`v2ray`更改配置为Shadowsocks

Windows客户端： [Releases · 2dust/v2rayN · GitHub](https://github.com/2dust/v2rayN/releases)

Android客户端： [Releases · 2dust/v2rayNG · GitHub](https://github.com/2dust/v2rayNG/releases)
