---
title: "Self-built anonymous file upload endpoint"
description: "Here’s the translation:  “Have you ever encountered a situation where you need to transport a file from your school or company computer, but don't want to install remote software? Today, I will teach you how to bring files back to your home without a USB drive!”"
published: 2025-11-08
image: ../../assets/images/unknown-upload.webp
tags:
  - EdgeOne
  - 对象存储
  - Python
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article provides a practical guide for creating a simple file upload service using EdgeOne Pages and AWS S3, tailored for scenarios where the user's home network is connected to the internet but has limited bandwidth and a need for secure file transfer. It outlines two approaches – using an object storage solution and a local server – with detailed steps and considerations for stability, complexity, cost, and potential issues like redimensioning files.
:::

# Video
https://www.bilibili.com/video/BV1Hz1DBZEov/

# Okay, please provide the text. I’m ready when you are.

When undertaking a project, regardless of its size, it’s crucial to first determine what is essential, what can be deferred, and what is truly superfluous.

The project should be suitable for use in non-home environments where a wired network connection is unavailable but can still connect to the internet. It requires the transmission of non-sensitive files, such as documents, screenshots, and small software applications.

Okay, I understand. Please provide the text.
1. Based on the web page, create a frontend page that must include a `input file`. Upload complete, print complete.
2. The backend will store files in a storage space that is easily accessible within the family network.

# Okay, please provide the text. I’m ready when you are.

Here are two options for translating the content:  1.  “Two different approaches are presented, each with its own strengths and weaknesses.” 2.  “Both methods offer distinct advantages and disadvantages.”

Object storage | Local server
Okay, please provide the text. I’m ready when you are.
Stability: ⭐⭐⭐⭐⭐ Not reliant on local devices | ⭐⭐ Requires a family computer to be online
| Complexity | ⭐⭐⭐⭐ Requires Cloud Function Configuration | ⭐⭐⭐⭐⭐ One line of command to start |
Cost | Storage Fee | None (Home Bandwidth)
| Applicable Scenario | Requires Stable Operation | Home computer is always online |

# EdgeOne Pages + Object Storage

If you want a stable and reliable service, object storage is more suitable for you.

## 梳理思路

Using object storage, I only need to connect to a cloud function that interacts with my object storage and provide an endpoint for uploading.

![](../../assets/images/unknown-upload-1.webp)

## Please provide the text you would like me to translate.

EdgeOne Pages offer highly suitable functions for this purpose, and support native Node runtime, which allows direct use of NPM packages like `AWS-S3`. This simplifies the process of creating a simple front-end upload page using just a basic frontend framework.

![](../../assets/images/unknown-upload-2.webp)

To prevent uploading duplicate files, each uploaded file will be renamed to `original filename_timestamp_ip`.

The project is open-source [afoim/EdgeOnePageFunctionUnknownUploader-S3-](https://github.com/afoim/EdgeOnePageFunctionUnknownUploader-S3-).

# Here’s the translation:  **Python uploadserver**

More recommendations: https://github.com/svenstaro/miniserve

If your home computer typically maintains online connectivity and prioritizes ease of use, then a dedicated anonymous file upload tool can be a worthwhile option.

## Installation

Okay, I understand. Please provide the text.

安装 **uploadserver**
```bash
pip install --user uploadserver
```

接下来，创建并进入一个新文件夹，作为 **上传目录**
```bash
mkdir upload
cd upload
```

运行，并监听 **IPv4** 的 **8000端口**
```bash
python -m uploadserver 8000
```

又或者，监听 **IPv6** 的 **8000端口** 
```bash
python -m uploadserver --bind :: 8000
```

接下来，你就可以在内网环境使用这个 **文件上载器** 了
![](../../assets/images/py-uploadserver.webp)

## “Going live.”

### Using EdgeOne for IPv6 routing.

将你的IPv6做 **DDNS** ，然后使用EdgeOne回源
![](../../assets/images/py-uploadserver-1.webp)

### Okay, please provide the text you would like me to translate. I’m ready when you are.

当你的家庭网络为 **NAT1** ，则可以使用类似这样的软件将你的 **内网端口** 直接打到 **公网端口** （貌似该程序对TCP分片敏感，会导致RST） [MikeWang000000/Natter: Expose your TCP/UDP port behind full-cone NAT to the Internet.](https://github.com/MikeWang000000/Natter) 
![](../../assets/images/py-uploadserver-2.webp)