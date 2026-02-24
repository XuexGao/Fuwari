---
title: "Cyberduck - A Simple and Easy-to-Use S3 File Browser"
description: "Object storage is a very useful thing, but how can we conveniently upload files?"
published: 2025-08-31
image: '../../assets/images/2025-08-31-03-39-46-image.webp'
tags: [Cyberduck, 对象存储]

draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The author replaced their previous AList setup with Cyberduck, a cross-platform cloud browser that directly connects to Cloudflare R2 without needing local deployment. This change eliminated the need for file transfers through AList, reducing latency and improving efficiency by enabling direct S3 access. Cyberduck also supports SFTP for easy file transfers to home servers, bypassing complex panel setups.
:::

# Previous Context

You may know or not know that I operate a **API**, such as [AcoFork - RandomPic](https://pic.072103.xyz/)

Its images are stored in **Cloudflare R2**, which is Cloudflare's object storage service.

Random image libraries always need to be expanded; in the past, I would use [AList](https://alistgo.com/zh/), but now I use [Cyberduck](https://cyberduck.io/).

# What is this?

[Cyberduck](https://cyberduck.io/) is a cloud storage browser compatible with both Windows and Mac. Compared to AList, it requires no deployment, and file transfers do not require relaying; it simply acts as a frontend to connect to your own object storage, offering a simple and user-friendly interface, as shown in the figure.

![](../../assets/images/2025-08-31-03-45-24-image.webp)

If you want to map cloud storage as a local disk, you can use the sister software [Mountain Duck](https://mountainduck.io/)

# Advantages?

The API's image statistics allow me to no longer manually craft S3 API calls to retrieve the number of images—it comes built-in.

![](../../assets/images/2025-08-31-03-47-41-image.webp)

![](../../assets/images/2025-08-31-03-47-57-image.webp)

---

Uploading files no longer requires routing through AList on your home cloud.

Previous link: I - AList - S3

Current link: I - S3

This significantly reduces transmission time and improves work efficiency.

---

Not limited to S3, you can directly transfer files to a home server via SFTP without needing to log in to panels like 1Panel.

![](../../assets/images/2025-08-31-03-52-04-image.webp)