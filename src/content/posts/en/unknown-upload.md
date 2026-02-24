---
title: "Self-built anonymous file upload endpoint"
description: "Do you ever encounter a situation where you need to transport a file from your school or company computer, but don’t want to install remote software? Today, I will teach you how to bring files back to your home without the use of a USB drive!"
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
This article provides a detailed guide on creating a simple file upload service using EdgeOne Pages and Object Storage, offering two distinct approaches: a cloud-based solution with object storage and a local server option utilizing Python's `uploadserver`. It highlights the benefits of each method based on user needs – stability, complexity, cost, and ease of setup. The article also provides installation instructions, including Python version requirements and DNS configuration for IPv6.  It concludes by outlining methods for deploying the service to a public network using EdgeOne's IPv6 return-to-origin functionality or NAT1-based STUN.
:::

# Video
Here’s the translation of the text from the provided link:  “The video explores the evolving relationship between human creativity and artificial intelligence, examining how AI tools are increasingly being used to generate artistic content and pushing the boundaries of creative expression. It delves into the ethical considerations surrounding this technology, including questions of authorship, originality, and the potential impact on human artists.”

# 明确需求

During the execution of a project, regardless of its size or scope, it’s crucial to first determine what is essential versus non-essential and ultimately, what is truly superfluous.

Considering the project’s use case, I believe it should primarily be deployed in non-home environments where a wired internet connection is unavailable but can still connect to the internet. Specifically, it would be suitable for transferring sensitive files – such as documents, screenshots, and small software applications – when these files are not excessively large.

那么大致的需求即为：
1. Based on a web page, create a frontend application that requires an `input file`. Upload complete and print completed.
2. The backend will store files in a shared storage space. This storage location must be easily accessible within the family network.

# Here’s the translation:  **Comparative Analysis**

Here are two options for translating the text:  “Here are two approaches, each with its own advantages and disadvantages.”

| | Storage solution 1 | Option two: Local server |
|---|---|---|
| Stability | Dependence on local devices not required. | Need a home computer online |
| Complexity | Need to configure cloud functions. | Execute command. |
| Cost | Storage fees | No bandwidth for family. |
| Use case scenarios | Requires stable operation | Home computer always online |

# Here’s the translation:  Option One: EdgeOne Pages + Object Storage

To ensure stable and reliable service, relying on household devices for online status is not ideal. A more suitable object storage solution is recommended.

## Clarify and analyze the situation.

Using object storage, I only need to establish a connection with a cloud function that integrates with my object storage and then provide an upload endpoint.

![](../../assets/images/unknown-upload-1.webp)

## Formal commencement.

Here’s the translation:  “I found EdgeOne Pages and its functionalities are particularly well-suited for this task. It also supports native Node runtime, which allows direct integration with `node-functions`. I then created a simple frontend upload page using the NPM package `AWS-S3`, streamlining the process.”

![](../../assets/images/unknown-upload-2.webp)

To prevent duplicate file uploads, each uploaded file will be renamed to `original filename_timestamp_ip`.

The project has been released as open source [afoim/EdgeOnePageFunctionUnknownUploader-S3-](https://github.com/afoim/EdgeOnePageFunctionUnknownUploader-S3-).

# Option Two: Upload Server Implementation

Recommended: [https://github.com/svenstaro/miniserve]

If your home computer typically maintains an online connection and prioritizes ease of use, a dedicated file-uploading tool for your desktop is a viable option.

## Installation

Ensure that you have installed **Python**.

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

## Going live” or “Streaming

### Method One: Utilizing EdgeOne for IPv6 Backpopping

将你的IPv6做 **DDNS** ，然后使用EdgeOne回源
![](../../assets/images/py-uploadserver-1.webp)

### Method Two: STUN (Limited to NAT1 availability)

当你的家庭网络为 **NAT1** ，则可以使用类似这样的软件将你的 **内网端口** 直接打到 **公网端口** （貌似该程序对TCP分片敏感，会导致RST） [MikeWang000000/Natter: Expose your TCP/UDP port behind full-cone NAT to the Internet.](https://github.com/MikeWang000000/Natter) 
![](../../assets/images/py-uploadserver-2.webp)