---
title: "Building Your Own Forward Proxy Server"
description: "Stop buying airports! Isn't it better to build your own?"
category: "Tutorial"
draft: false
image: ../../assets/images/2024-11-21-08-24-54-image.webp
lang: en
published: 2024-11-22
tags: []
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide explains how to use Cloudflare Pages with edgetunnel to set up a VLESS proxy, including steps like uploading code, generating UUIDs, binding domains, and importing configs into V2Ray. It also covers alternative setups using Hysteria2 or V2Ray on personal VPS, with installation links and client downloads. Important warnings include avoiding sharing projects due to usage limits and potential Cloudflare rate limiting, which may require recreating projects.
:::

# Use Cloudflare as a proxy (Vless - EdgeTunnel)

The following content is referenced from: [CF VLESS From Beginner to Expert cmliu/edgetunnel Must-Read Content Free Nodes Preferred Subscriptions Workers & Pages CM Feeding Rich Content 24 | CMLiussss Blog](https://vercel.blog.cmliussss.com/p/CM24/) Please support the original author!

1. https://github.com/cmliu/edgetunnel/archive/refs/heads/main.zip Upload it to your Cloudflare Pages project (don't have a Cloudflare account? Search for tutorials online to register one! If you encounter slow speeds, try using a VPN).
2. Enter https://it-tools.tech/uuid-generator to randomly obtain a UUID
3. Add a variable binding named `UUID` with the value randomly obtained in the second step (please do not disclose this to others!).
4. Re-upload the `main.zip` from step one. Let Cloudflare redeploy the page to accommodate the new variables.
5. Go to the Pages project -> Custom Domain: Bind a custom domain. (No domain? Recommended: https://nic.us.kg https://www.cloudns.net. You can search for tutorials on the internet yourself; this is not elaborated here. Alternatively, you can skip binding and directly use the domain allocated by CF, `pages.dev`. However, in some regions, `pages.dev` may not be accessible or may be easily blocked.)
6. View the dashboard via `https://your-custom-domain/uuid`
7. As shown in the figure, copy the link and open V2Ray to import it. The download address for the V2Ray client is at the end of the article.
8. ![](../../assets/images/2024-11-24-00-17-22-image.webp)
9. 500Mbps mobile broadband, speed test results via edgetunnel are as follows. Speed test website: https://fast.com
10. ![](../../assets/images/2024-11-22-09-08-38-image.webp)
11. If you are looking for the lowest latency, you can use cfnat. Here is a Windows link: https://www.youtube.com/watch?v=N2Y9TsiBgls. For other platforms, you can search for it on CM's YouTube channel.
12. **Note! edgetunnel may recently report error 1101 on new Cloudflare accounts. This may not be due to your configuration, but rather because of Cloudflare's security controls. The solution is to delete the original project and redeploy it again, using a different project name! You can also create several other normal Pages or Workers projects as decoys! The blogger tested this with a new account and was ganked three times (each time changing the name, deleting Pages, and redeploying), and has remained stable since then**
13. **I personally tested that using EdgeTunnel throughout the day has already consumed most of the quota, so please do not share your project with others or sell it! Registering yourself is simple and straightforward!**
14. As shown in the blogger's half-day usage: I just used Telegram a bit~
15. ![](../../assets/images/2024-11-26-16-07-50-image.webp)

# Use your own overseas VPS as a proxy [[X:content]]

## Use the new protocol: Hysteria2

You can go to these two repositories for one-click installation~

[https://github.com/0x0129/hysteria2](https://github.com/0x0129/hysteria2)

[https://github.com/seagullz4/hysteria2](https://github.com/seagullz4/hysteria2)

General installation process: self-signed, without using ACME, without using port jumping

Client (Hiddify):

[https://github.com/hiddify/hiddify-app](https://github.com/hiddify/hiddify-app)

Other clients fetch from the second GitHub repo

## Use the old protocol: V2Ray

[https://github.com/233boy/v2ray](https://github.com/233boy/v2ray)

VPS installation script: `bash <(curl -s -L https://git.io/v2ray.sh)`

Detailed installation: After the script is executed, enter `v2ray` to modify the configuration to Shadowsocks

Windows client: [Releases · 2dust/v2rayN · GitHub](https://github.com/2dust/v2rayN/releases)

Android client: [Releases · 2dust/v2rayNG · GitHub](https://github.com/2dust/v2rayNG/releases)