---
title: "Using IPFS-based Fleek deployment for static websites, hosting a graph database, and deploying services"
description: "IPFS is a decentralized file hosting system that allows you to share files, publish websites, and automate this process with Fleek, which also facilitates linking your Git repositories."
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

:::

This document is outdated and may no longer be accessible.

### What is IPFS?

IPFS is a decentralized media protocol that accelerates network speeds, enhances security, and promotes openness. In essence, it’s a decentralized internet. Technically, it's a content addressing system based on a distributed hash table (DHT) managed using a Git model, leveraging Merkle object associations, utilizing point-to-point technology, and employing IPNS as a foundation. It integrates various technologies, including distributed file systems.

用人话说，你可以把它看成一个共享网盘，你可以尝试下载[IPFS - Desktop（适用于有图形界面的系统）](https://github.com/ipfs/ipfs-desktop)或[kubo - ipfs（适用于CLI）](https://github.com/ipfs/kubo)。然后启动IPFS，你的设备将成为IPFS网络中的一个节点，如图![](../../assets/images/2024-10-17-10-47-08-image.webp)

### Here’s the translation:  “Using IPFS offers a variety of capabilities, including decentralized storage, content distribution, and data integrity.”

Upon connecting to an IPFS network, your device is automatically designated as a local IPFS node and begins searching for other IPFS nodes. You can then assist other users in establishing connections, providing files, and facilitating file sharing. Furthermore, you can upload your files to your IPFS node, awaiting distribution, allowing other users on the network to access them. Within an IPFS network, accessing files through an IPFS gateway, such as `https://ipfs.io/ipfs/`, enables access. For example: https://ipfs.crossbell.io/ipfs/bafybeifbn36zmdb37ov6id3toy6bve47264hjk2yob6rm4bhw7ooawncf4

Here’s the translation:  “To bypass firewall restrictions, I am utilizing the CrossBell IPFS network gateway.”

### Does this technology truly offer such an ideal solution?

Here’s the translation:  “This technology is genuinely promising, however, practical implementation will encounter the following challenges.”

1. Local IPFS node uploads are currently experiencing delays in accessing the content via IPFS gateway and CID.

2. The dataset contains a limited number of nodes.

3. The usage of this application may significantly impact your internet bandwidth.

Here’s the translation:  Many of these issues stem from the network being excessively large, with individual IPFS node weights being low. Despite IPFS distribution typically completing within a few hours, it's crucial for individuals to seek assistance from service providers who often possess greater weight within the IPFS network. These services frequently offer higher efficiency in file updates and provide features such as automated Git deployment. The article utilizes **Fleek** as its source.

### Regarding “fleek,” it generally refers to a state of being attractive or stylish, often implying confidence and self-assuredness. It’s frequently used in online contexts, particularly within social media and fashion communities, to describe someone looking good or feeling confident.

It resembles…

Here’s the translation:  “This file can be rapidly distributed across a large number of IPFS nodes, uploaded via Fleek, and broadcast to the IPFS network within seconds. It also supports deployment of projects using Git storage and binding to your domain.”

### Is it reliable to trust?

I have only been interacting with this service for two days. I’ve observed that Fleek provided three access methods following successful deployment of the website.

1. `xxx-xxx.fleek.app`：This domain utilizes Cloudflare Content, and a verification test reveals that the IP address count is 2, advising against its use.

2. ![](../../assets/images/2024-10-17-11-01-49-image.webp)：这种方法是原生的IPFS访问方式。通过IPFS网关+CID来访问。但由于CID为哈希值，当你的网站改动后你的CID会发生变化

3. 绑定自定义域名来访问，这将会使用亚马逊的CDN并且自动映射CID，实测解析IP数量超过30，并且速度很快
   
   > [!WARNING]
   > 注意，任何使用HTTP协议的类ipfs技术都需要一个中心化服务器代理访问IPFS网络。只有当访问者连接上IPFS网络后才会使用去中心化的连接方式）
- ![](../../assets/images/2024-10-17-11-07-40-image.webp)

- Despite displaying an IPFS file browsing interface, the page itself is implemented using HTTP requests to Amazon CDN reverse IPFS networks. It remains a centralized network architecture.

- ![](../../assets/images/2024-10-17-11-08-44-image.webp)

- Upon connecting your device to the IPFS network, all traffic will utilize P2P (peer-to-peer) protocols, resulting in the actual access addresses being your local device.

### Refine your approach, what can Fleek achieve?

Enable Fleek to connect your Git repository, building static websites and deploying them to IPFS while maintaining HTTP access compatibility.

#### Formal commencement.

1. Please log in to fleek.xyz using MetaMask.

2. Connect your Git repository and provide information related to build commands and other relevant details.

3. Deploy website.

4. Here’s the translation:  **Domain Binding**

5. Final Access

效果图：

![](../../assets/images/2024-10-17-11-31-33-image.webp)

#### Expand our options beyond traditional IP addresses. We can leverage IPFS technology for various applications.

1. 创建一个巨大的图床，已经投入使用，参见： https://pic.onani.cn （原理：请求 https://ipfs-pic.onani.cn ，获取图片列表，随机选择使用JS展示）![](../../assets/images/2024-10-17-11-34-44-image.webp)

2. Please discontinue the use of self-hosting images; they are now in use and all blog images are stored on IPFS.

3. Here’s the translation:  “It is theoretically possible to upload any storage-intensive services to IPFS, enabling data partitioning and separation.”