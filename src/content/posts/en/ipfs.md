---
title: "Deploy Static Websites, Host Image Storage, and Deploy Services Using Fleek on IPFS"
description: "IPFS is a multi-node file hosting system where you can share files and publish websites. Fleek automates this process and can link to your Git repository."
category: "Reflections"
draft: false
image: ../../assets/images/2024-10-17-09-55-55-image.webp
lang: en
published: 2024-10-17
tags:
  - Fleek
  - IPFS

---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}

:::

> This article is outdated, and some resources may no longer be available.

### What is IPFS?

> IPFS is a peer-to-peer hypermedia protocol that makes the network faster, safer, and more open. In simple terms, it's a decentralized internet. Technically speaking, it is a distributed file system based on content addressing via Distributed Hash Tables (DHT), version control modeled after Git, Merkle object linking, peer-to-peer technology, and a global naming system called IPNS, built upon various technologies.

用人话说，你可以把它看成一个共享网盘，你可以尝试下载[IPFS - Desktop（适用于有图形界面的系统）](https://github.com/ipfs/ipfs-desktop)或[kubo - ipfs（适用于CLI）](https://github.com/ipfs/kubo)。然后启动IPFS，你的设备将成为IPFS网络中的一个节点，如图![](../../assets/images/2024-10-17-10-47-08-image.webp)

### What can IPFS be used for?

Once you connect to the IPFS network, IPFS will automatically turn your device into a local IPFS node and search for other IPFS nodes. You will be able to help other users establish connections and provide files. You can also upload your files to your IPFS node for distribution, allowing other users on the network to access your files. In the IPFS network, accessing files is done through an IPFS gateway, such as: `https://ipfs.io/ipfs/` + `CID（file hash）`. For example: https://ipfs.crossbell.io/ipfs/bafybeifbn36zmdb37ov6id3toy6bve47264hjk2yob6rm4bhw7ooawncf4

(Here, the IPFS gateway hosted by CrossBell, `ipfs.crossbell.io`, is used to bypass GFW blocking.)

### Is this technology really that ideal?

This technology is indeed ideal, but practical application will encounter the following issues.

1. Files uploaded via a local IPFS node remain inaccessible through the IPFS gateway + CID.

2. Too few discovered nodes

3. May consume a large amount of your bandwidth

Most of these issues stem from the fact that the network is too large, and individual IPFS nodes have very low weight, even though IPFS distribution typically completes within a few hours. For individuals, we should look for service providers to fulfill these needs; they often have greater weight within the IPFS network, higher efficiency in updating files, and also offer additional services such as automated Git deployment. The service used in this article is **Fleek**

### About Fleek

> It seems like it

You can simply understand it as having significant weight, with many IPFS nodes. Files uploaded to the IPFS network via Fleek can be broadcast within seconds, and it supports deploying projects by connecting to Git repositories and binding your domain.

### Is Fleek trustworthy?

I have only used this service for two days. I observed that Fleek provides three types of access methods after successfully deploying a website.

1. `xxx-xxx.fleek.app`: This domain uses Cloudflare CDN, and actual testing shows that the number of resolved IPs is 2, which is not recommended for use.

2. ![](../../assets/images/2024-10-17-11-01-49-image.webp)：这种方法是原生的IPFS访问方式。通过IPFS网关+CID来访问。但由于CID为哈希值，当你的网站改动后你的CID会发生变化

3. Bind a custom domain to access, which will use Amazon's CDN and automatically map the CID. In actual testing, the number of resolved IPs exceeds 30, and the speed is very fast.

   > [!WARNING]
   > Note: Any class of IPFS technology using the HTTP protocol requires a centralized server proxy to access the IPFS network. Only after the visitor connects to the IPFS network will decentralized connection methods be used.
- ![](../../assets/images/2024-10-17-11-07-40-image.webp)

- Although it displays the file browsing interface of IPFS, in reality, this page is proxied through an HTTP request to Amazon's CDN, relaying the IPFS network, which remains a centralized network.

- ![](../../assets/images/2024-10-17-11-08-44-image.webp)

- Once your device is connected to the IPFS network, all traffic will use P2P (decentralized), so the access address you see is actually your local address.

### Let’s clarify our thinking: what can we achieve with Fleek?

Connect Fleek to your Git repository, build static websites via build commands, and publish to IPFS while remaining compatible with HTTP access.

#### Formally begin

1. Go to fleek.xyz and log in with MetaMask

2. Connect your Git repository, enter build commands and other relevant information

3. Deploy the website

4. Bind domain name

5. Final visit

Rendered effect:

![](../../assets/images/2024-10-17-11-31-33-image.webp)

#### Expand on this: What else can we do with IPFS technology? (Domain has been deprecated)

1. 创建一个巨大的图床，已经投入使用，参见： https://pic.onani.cn （原理：请求 https://ipfs-pic.onani.cn ，获取图片列表，随机选择使用JS展示）![](../../assets/images/2024-10-17-11-34-44-image.webp)

2. No longer need to self-host any images; already in use, all images on this blog are stored on IPFS.

3. Theoretically, you can upload any storage-consuming service to IPFS to achieve separation of storage and computation.