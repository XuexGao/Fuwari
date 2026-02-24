---
title: "Teach You to Deploy AList's Frontend to CF Pages! Make Your AList Load Instantly!"
description: "Deploying AList Web to CF Pages can significantly enhance the browsing experience for visitors, as static resources are served from CF's edge nodes, while the backend interacts via API rather than routing all traffic through the origin server. This not only reduces the load on the origin server but also leverages CF Pages' non-origin advantage, killing two birds with one stone."
category: "Tutorial"
draft: false
image: ../../assets/images/QmSmcktDEJaWdDvFQeuNTJ9ps8R3PcLWyhSrbxoLEq2b2x.webp
lang: en
published: 2024-10-15
tags:
- AList
- Cloudflare Pages
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide explains how to deploy the AList frontend to Cloudflare Pages for faster edge delivery, while keeping the backend server separate and accessible via Cloudflare Tunnel. It covers steps like forking the repo, configuring environment variables, adding Chinese localization, building with Node.js, and deploying via Cloudflare Pages with custom domain setup. Customizations like modifying the index.html are also supported via hard-coded changes in the source code.
:::

## Previous context [#](https://afo.im/shen-me-Cloudflare-dai-li-AList-tai-man--jiao-ni-bu-shu-qian-duan-dao-Pages-ju-jue-hui-yuan-#user-content-%E5%89%8D%E6%83%85%E6%8F%90%E8%A6%81)

This tutorial **is not about serverless deployment of AList**, it only deploys the frontend pages to Cloudflare Pages, so users can quickly fetch frontend files from Cloudflare's edge nodes without Cloudflare needing to fetch from the origin, improving browsing experience. The backend still requires a server exposed to the public internet to deploy AList (if there is no public server, Cloudflare Tunnels can be used).

### First, ensure your backend server supports dual-stack access for both IPv4 and IPv6.

1. Use Cloudflare Tunnel to set up CF

2. Set up A and AAAA records separately. It's troublesome; if your IP is fast, you actually don't need frontend-backend separation. Even with frontend-backend separation exposed at the source, it cannot avoid DDoS attacks, because your source server will expose this in HTTP requests.

### Then, begin formally deploying the AList frontend to Cloudflare Pages

1. Fork repository:

[https://github.com/alist-org/alist-web](https://github.com/alist-org/alist-web)

2. Change the `env.production` file in the project root directory to your backend server address
   ![QmduQJq3TydzvLzBn47zLxp2MR1iD2sxm67EzFUFuEBvQa.webp](../../assets/images/6f2871ca5d35e1e974d89611835f3a2c7fd205e7.webp)

3. Clone the repository locally, you need to install [Git](https://git-scm.com/):

```
使用SSH（需要持有你的Github SSH私钥）：
git clone git@github.com:你的用户名/你Fork的仓库

使用HTTPS（Not Use Magic有概率SSL握手失败）：
git clone git@github.com:你的用户名/你Fork的仓库
```

5. Download the Chinese localization package: [AcoFork's cloud drive](https://alist.onani.cn/guest/alist_Zh-CN) or [Crowdin - requires login](https://crowdin.com/project/alist/zh-CN)
   ![QmXVpMc7BqbXv9EaAbeptsrnhYLinvQQsu1btBE3VvDixa.webp](../../assets/images/68d31e9797edfc3c1d8a72386ebf3a643d117ce6.webp)
6. Unzip and copy the `Zh-CN` folder from `alist (zh-CN)\src\lang` to the `src/lang` directory under the repository.
7. Edit the root directory's `.gitignore` and add a line `!/src/lang/zh-CN/` to ensure the file is not ignored
8. Download [Nodejs](https://nodejs.org/zh-cn). Open the terminal in the root directory to generate the required files for Chinese:

```
安装cnpm：
npm install -g cnpm --registry=https://registry.npmmirror.com

安装依赖：
cnpm install --legacy-peer-deps

生成中文需要的文件：
node .\scripts\i18n.mjs
```

9. Stage the changes and commit to the remote repository; open the terminal in the root directory.

```
git add .   //将更改提交到暂存区
git commit -m 添加中文   //发布提交
git push -f   //强制将更改提交到远程仓库
```

10. Enter the [Cloudflare dashboard](https://dash.cloudflare.com/) and navigate to the Workers and Pages pages
    ![QmW5UaUap8T2R37u5dzmKGLmUgk4qKnSMFwHBVHqvVbkVA.webp](../../assets/images/49ccd51771082fdc94eecb270caf987d257cd987.webp)
11. Create a page and choose to connect a Git repository
    ![QmZXerKv9PVxxscAe4w4LEfAaKfiScPQEKh1UroXnCeAUr.webp](../../assets/images/9c4b9ff38d3c8810007ffe33c1a0f98cdd84b92e.webp)
12. Choose your repository and begin setup
    ![QmNdSGQrJtoqDnBx8pgDrtcfmUUfVBS9xdrN4xLgyPjyXE.webp](../../assets/images/fb97b5148c3811590609a0b85c6c1ee3c451853d.webp)
13. Build command input: `pnpm install && pnpm build`, build output directory selection `/dist`
    ![QmbhPdbE8f1zLKvWA6aEGJtZhmecRMVZiQbx6Zx1Lecp7J.webp](../../assets/images/c4300a94ccb16fe1383c721cbc83d1a71420e340.webp)
14. Wait for Cloudflare build to complete, then bind a custom domain to Pages
    ![QmTMphu61uUF9XefBAVDVf19Jm1vLVUhhXQ9PXABy7hUpK.webp](../../assets/images/d27136b31d759898fe06041f12e7a07f07bd06b0.webp)
15. Access the custom domain to check if AList is working properly.
    ![QmT8GLcaxtabhifKNL8kczEtozmNvdyhzJ823RfBrcFdpm.webp](../../assets/images/345df496620a9d3faf0eceeb773813bc9ac98375.webp)

### Customize AList[#](https://afo.im/shen-me-Cloudflare-dai-li-AList-tai-man--jiao-ni-bu-shu-qian-duan-dao-Pages-ju-jue-hui-yuan-#user-content-%E5%AE%9A%E5%88%B6-alist)

> We all know that AList supports custom headers and content, but since Cloudflare Pages is a static site, we use hardcoding, directly writing the required custom content into `index.html` at the root directory of the repository.
> ![Qmd47pgFsyh28NjhkLiCPPbf7iasXMWvAvZDupH8QspG64.webp](../../assets/images/c3ff113558b368da9a7aeb70f70b978f49d0eb7a.webp)

1. Edit the root directory's `index.html`
2. Stage and commit the changes to the remote repository; open the terminal in the root directory.

```
git add .   //将更改提交到暂存区
git commit -m 你的提交摘要   //发布提交
git push -f   //强制将更改提交到远程仓库
```

3. Cloudflare Pages will automatically rebuild; just wait for the new page build to complete.
   ![QmNZemsDHz5QLxW3V2eANghmVkfBccEpe5vMAWUCLik4o6.webp](../../assets/images/863e5bb3ef65ec2a0af03303dd3afe13fb8dd8d4.webp)

### Troubleshooting

1. If you encounter a build error (e.g., "solid-route/src not found"), you can check whether the `solid-route` folder in the root directory of your locally cloned forked repository is empty. If it is, go to https://github.com/alist-org/alist-web and manually copy the contents of the `solid-route` folder into your repository, then try rebuilding again.