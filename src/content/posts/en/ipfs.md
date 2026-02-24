---
title: "Using IPFS-based Fleek deployment for static websites, hosting a graph database, and deploying services"
description: "Here’s a professional English translation of the text:  “IPFS is a decentralized file hosting system that enables sharing files, publishing websites, and automating this process through Fleek. It also facilitates linking your Git repositories.”"
category: "Writing"
draft: false
image: ../../assets/images/2024-10-17-09-55-55-image.webp
lang: en
published: 2024-10-17
tags:
  - Fleek
  - IPFS

---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Here’s a brief summary of the article:

The article discusses IPFS, a decentralized network that offers improved speed, security, and openness compared to traditional centralized file systems. It explains how IPFS works – it's a distributed hash table based on Git, managed by Mirkel objects, and uses point-to-point connections.  It highlights challenges like slow file access, limited node availability, bandwidth usage, and the need for specialized services like Fleek to overcome these issues. Fleek is presented as a solution that simplifies deploying websites and integrating with Git repositories through P2P networking.
:::

This document is outdated and may no longer be accessible.

### IPFS (InterPlanetary File System) is a decentralized storage network that allows users to store and share files securely across the internet. It uses content addressing, which means each file is identified by its hash value, making it resistant to censorship and tampering.

IPFS is a decentralized media protocol that makes the internet faster, safer, and more open. Simply put, it’s a decentralized internet. Technically, it’s a content addressing system based on distributed hash tables DHT, managed using a Git model, leveraging Merkle object associations, point-to-point technology, and IPNS as a distributed file system.

用人话说，你可以把它看成一个共享网盘，你可以尝试下载[IPFS - Desktop（适用于有图形界面的系统）](https://github.com/ipfs/ipfs-desktop)或[kubo - ipfs（适用于CLI）](https://github.com/ipfs/kubo)。然后启动IPFS，你的设备将成为IPFS网络中的一个节点，如图![](../../assets/images/2024-10-17-10-47-08-image.webp)

### IPFS (InterPlanetary File System) enables decentralized file storage and sharing. It allows users to store files across a network of nodes, ensuring data redundancy and resilience against censorship or single points of failure.  It’s particularly useful for applications requiring secure, distributed access to content.

You can help other users establish connections, provide files, and access your files through the IPFS network. You can also upload your files to your IPFS node, wait for distribution, and allow other users on the network to access your files. Accessing files in the IPFS network involves using the IPFS gateway, such as `https://ipfs.io/ipfs/` + `CID（文件哈希）`. For example: https://ipfs.crossbell.io/ipfs/bafybeifbn36zmdb37ov6id3toy6bve47264hjk2yob6rm4bhw7ooawncf4

The content is: The content is: The content is:

### Does this technology really live up to its potential?

The technology is truly ideal, but its practical application presents the following issues.

1. Through local IPFS node uploads, the access is currently unavailable via IPFS gateway and CID.

2. The number of discovered nodes is insufficient.

3. May be excessive bandwidth usage.

These issues are largely due to the fact that most IPFS nodes have low weights, despite file distribution typically taking place within a few hours. However, for individuals, we should seek service providers to help us address these needs. These services often have higher weights in the IPFS network and offer more efficient file updates, as well as various extensions such as automated Git deployment. The article utilizes **Fleek**

### Please note that “Fleek” is slang and has a specific meaning within online communities. It generally refers to being stylish, fashionable, or looking good.

It resembles...

The file can be broadcast to IPFS network within seconds via Fleek upload, and supports deploying projects and binding your domain.

### Is it worth trusting?

Only recently have I been using this service. I’ve observed that Fleek provided three access methods after successfully deploying a website.

1. This domain utilizes Cloudflare CDN, and a test revealed that the number of IP addresses is 2. It’s recommended not to use it.

2. ![](../../assets/images/2024-10-17-11-01-49-image.webp)：这种方法是原生的IPFS访问方式。通过IPFS网关+CID来访问。但由于CID为哈希值，当你的网站改动后你的CID会发生变化

3. 绑定自定义域名来访问，这将会使用亚马逊的CDN并且自动映射CID，实测解析IP数量超过30，并且速度很快
   
   > [!WARNING]
   > 注意，任何使用HTTP协议的类ipfs技术都需要一个中心化服务器代理访问IPFS网络。只有当访问者连接上IPFS网络后才会使用去中心化的连接方式）
- ![](../../assets/images/2024-10-17-11-07-40-image.webp)

- Despite displaying an IPFS file browsing interface, this page actually utilizes HTTP requests to Amazon CDN reverse IPFS network functionality; it remains a centralized network.

- ![](../../assets/images/2024-10-17-11-08-44-image.webp)

- When your device is connected to the IPFS network, all traffic will use P2P (peer-to-peer), so the access address you see actually represents your local IP address.

### 梳理一下思路，我们可以用Fleek做到什么。

Let's connect Fleek to your Git repository using command-line tools to build static websites and publish them to IPFS, while supporting HTTP access.

#### Please provide the text you would like me to translate.

1. Go to fleek.xyz by logging in with MetaMask.

2. Connect your Git repository and enter build commands, etc.

3. Deploy website

4. Please provide the text you would like me to translate.

5. Final Access

Okay, please provide the text. I’m ready when you are.

![](../../assets/images/2024-10-17-11-31-33-image.webp)

#### Expand on how we can use IPFS technology?

1. 创建一个巨大的图床，已经投入使用，参见： https://pic.onani.cn （原理：请求 https://ipfs-pic.onani.cn ，获取图片列表，随机选择使用JS展示）![](../../assets/images/2024-10-17-11-34-44-image.webp)

2. The content has been transferred to IPFS. No images are hosted locally.

3. Theoretically, any data that is stored on a service can be uploaded to IPFS for decentralized storage and separation of computation.