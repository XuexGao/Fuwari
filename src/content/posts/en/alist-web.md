---
title: "Teach you how to deploy your AList frontend to CF Pages! Make your AList load in seconds!"
description: "将AList Web部署到CF Pages可以显著提升访问者的浏览体验，因为静态资源都在CF的边缘节点，而后端使用API交互，而不是由源服务器路由所有流量，既能减轻源服务器的负载，又能使用CF"
category: "Tutorial"
  Pages的不回源优势，一箭双雕
draft: false
image: ../../assets/images/QmSmcktDEJaWdDvFQeuNTJ9ps8R3PcLWyhSrbxoLEq2b2x.webp
lang: en
published: 2024-10-15
tags:
- AList
- Cloudflare Pages
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

## Important: [preliminary information](https://afo.im/shen-me-Cloudflare-dai-li-AList-tai-man--jiao-ni-bu-shu-qian-duan-dao-Pages-ju-jue-hui-yuan-#user-content-%E5%89%8D%E6%83%85%E6%8F%90%E8%A6%81)

This tutorial **not AList's No-Server Deployment** focuses on deploying frontend pages to Cloudflare Pages, allowing users to quickly retrieve frontends from the edge nodes of Cloudflare. This eliminates the need for CF backends and improves browsing experience. The backend still requires a server deployed to a public network in Cloudflare Tunnels.

### First, ensure your backend server supports v4v6 dual-stack access.

1. Using Cloudflare Tunnel, set up CF.

2. Please set up A and AAAA parsing, please. If your IP is very fast, it’s actually not necessary to separate the front-end and back-end. It’s also impossible to avoid being DDoSed because your origin server will expose the front-end and backend separation in the HTTP response content.

### Then, begin formally deploying the AList frontend to Cloudflare Pages.

1. Fork Warehouse:

[https://github.com/alist-org/alist-web]

2. 更改项目根目录的`env.production`文件为你的后端服务器地址  
   ![QmduQJq3TydzvLzBn47zLxp2MR1iD2sxm67EzFUFuEBvQa.webp](../../assets/images/6f2871ca5d35e1e974d89611835f3a2c7fd205e7.webp)

3. Install Git to clone the repository locally.

```
使用SSH（需要持有你的Github SSH私钥）：
git clone git@github.com:你的用户名/你Fork的仓库

使用HTTPS（Not Use Magic有概率SSL握手失败）：
git clone git@github.com:你的用户名/你Fork的仓库
```

5. 下载汉化包：[AcoFork 的网盘](https://alist.onani.cn/guest/alist_Zh-CN)或[Crowdin - 需要登录](https://crowdin.com/project/alist/zh-CN)  
   ![QmXVpMc7BqbXv9EaAbeptsrnhYLinvQQsu1btBE3VvDixa.webp](../../assets/images/68d31e9797edfc3c1d8a72386ebf3a643d117ce6.webp)
6. 解压，将`alist (zh-CN)\src\lang`里面的`Zh-CN`文件夹复制到仓库下`src/lang`下
7. 编辑根目录的`.gitignore`，添加一行`!/src/lang/zh-CN/`确保文件不被忽略
8. 下载[Nodejs](https://nodejs.org/zh-cn)。在根目录打开终端，生成中文需要的文件：

```
安装cnpm：
npm install -g cnpm --registry=https://registry.npmmirror.com

安装依赖：
cnpm install --legacy-peer-deps

生成中文需要的文件：
node .\scripts\i18n.mjs
```

9. Please submit the changes to the staging area and push them to the remote repository, open a terminal in the root directory.

```
git add .   //将更改提交到暂存区
git commit -m 添加中文   //发布提交
git push -f   //强制将更改提交到远程仓库
```

10. 进入[Cloudflare 仪表盘](https://dash.cloudflare.com/)，进入 Workers 和 Pages 页面  
    ![QmW5UaUap8T2R37u5dzmKGLmUgk4qKnSMFwHBVHqvVbkVA.webp](../../assets/images/49ccd51771082fdc94eecb270caf987d257cd987.webp)
11. 创建一个 Pages，选择连接 Git 存储库  
    ![QmZXerKv9PVxxscAe4w4LEfAaKfiScPQEKh1UroXnCeAUr.webp](../../assets/images/9c4b9ff38d3c8810007ffe33c1a0f98cdd84b92e.webp)
12. 选择你的存储库，开始设置  
    ![QmNdSGQrJtoqDnBx8pgDrtcfmUUfVBS9xdrN4xLgyPjyXE.webp](../../assets/images/fb97b5148c3811590609a0b85c6c1ee3c451853d.webp)
13. 构建命令输入：`pnpm install && pnpm build`，构建输出目录选择`/dist`  
    ![QmbhPdbE8f1zLKvWA6aEGJtZhmecRMVZiQbx6Zx1Lecp7J.webp](../../assets/images/c4300a94ccb16fe1383c721cbc83d1a71420e340.webp)
14. 等待 Cloudflare 构建结束，为 Pages 绑定自定义域  
    ![QmTMphu61uUF9XefBAVDVf19Jm1vLVUhhXQ9PXABy7hUpK.webp](../../assets/images/d27136b31d759898fe06041f12e7a07f07bd06b0.webp)
15. 访问自定义域，查看 AList 是否正常  
    ![QmT8GLcaxtabhifKNL8kczEtozmNvdyhzJ823RfBrcFdpm.webp](../../assets/images/345df496620a9d3faf0eceeb773813bc9ac98375.webp)

### Customized List [#](https://afo.im/shen-me-Cloudflare-dai-li-AList-tai-man--jiao-ni-bu-shu-qian-duan-dao-Pages-ju-jue-hui-yuan-#user-content-%E5%AE%9A%E5%88%B6-alist)

> 我们都知道 AList 支持自定义头部和内容，但是因为 Cloudflare Pages 是一个静态页面，所以我们采用硬编码方式，直接将需要自定义的内容写入仓库根目录的`index.html`  
> ![Qmd47pgFsyh28NjhkLiCPPbf7iasXMWvAvZDupH8QspG64.webp](../../assets/images/c3ff113558b368da9a7aeb70f70b978f49d0eb7a.webp)

1. Edit the root directory’s `index.html`.
2. Please submit the changes to the staging area and push them to the remote repository, open a terminal in the root directory.

```
git add .   //将更改提交到暂存区
git commit -m 你的提交摘要   //发布提交
git push -f   //强制将更改提交到远程仓库
```

3. Cloudflare Pages 会自动重新构建，等待新网页构建完成即可  
   ![QmNZemsDHz5QLxW3V2eANghmVkfBccEpe5vMAWUCLik4o6.webp](../../assets/images/863e5bb3ef65ec2a0af03303dd3afe13fb8dd8d4.webp)

### The problem is difficult to solve.

1. If you encounter a build error (cannot find solid-route/src), try to check the root directory of your fork’s repository after pulling it down locally, and whether the `solid-route` folder is empty. If it is, please manually move the `solid-route` folder’s contents to your repository, then attempt to rebuild.