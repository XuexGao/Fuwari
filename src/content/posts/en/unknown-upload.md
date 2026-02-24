---
title: "Build an Anonymous File Upload Endpoint"
description: "Have you ever encountered a scenario where you need to take a file with you from a school/company computer, but you don’t want to install remote software? Today, I’ll teach you how to bring your desired file home without needing a USB drive!"
published: 2025-11-08
image: ../../assets/images/unknown-upload.webp
tags:
  - EdgeOne
  - 对象存储
  - Python
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article outlines two practical solutions for uploading files from public internet devices to a home network: one using EdgeOne Pages + object storage for stability and cloud-based reliability, and another using a local Python server (uploadserver) for simplicity and low cost if the home computer remains online. The former requires cloud configuration but offers consistent access, while the latter is easy to set up locally but depends on home device availability. Both methods support anonymous file uploads via web interfaces.
:::

# Video
[[X:content]]

# Clarify requirements

When doing a project, regardless of its size, we first need to understand what we require, which are the essential needs, which are secondary, and which are completely unnecessary.

Think deeply about it, I believe the use case for this project should be: when I am in a non-home environment, and I have a device that is not directly connected to my home network but can connect to the internet, and I need to transfer some non-sensitive files that are not large (such as documents, screenshots, small software).

The general requirements are as follows:
1. Based on a web page, create a frontend page that must include a `input file`. Print "Upload completed" after upload is finished.
2. The backend places the file in a storage space. This storage space must be conveniently accessible within the home network.

# Scheme Comparison

Here are two options, each with its own advantages and disadvantages:

| | Option One: Object Storage | Option Two: Local Server |
|---|---|---|
| Stability | ⭐⭐⭐⭐⭐ No dependence on local devices | ⭐⭐ Requires home computer online |
| Complexity | ⭐⭐⭐ Requires cloud function configuration | ⭐⭐⭐⭐⭐ Start with one command |
| Cost | Object Storage Fees | None (Family Bandwidth) |
| Applicable scenarios | Requires stable operation | Home computers are often online |

# Option One: EdgeOne Pages + Object Storage

If you wish for the service to operate stably without relying on the online status of home devices, object storage is more suitable for you.

## Clarify your thoughts

With object storage, I only need to find one cloud function connected to my object storage, and then provide an upload endpoint.

![](../../assets/images/unknown-upload-1.webp)

## Formally begin

So I found EdgeOne Pages, whose Functions are perfectly suited for this task and support native Node runtime, meaning `node-functions` can directly use the `AWS-S3` npm package to create the simplest frontend upload page—done!

![](../../assets/images/unknown-upload-2.webp)

To prevent uploading files with duplicate names, each uploaded file will be renamed to `__IP`

This project has been open-sourced [afoim/EdgeOnePageFunctionUnknownUploader-S3-](https://github.com/afoim/EdgeOnePageFunctionUnknownUploader-S3-)

# Option Two: Python uploadserver

> Recommended: https://github.com/svenstaro/miniserve

If your home computer is typically left online and you prioritize simplicity and ease of use, launching an anonymous file uploader on your own computer is also a good option.

## Install

Make sure you have installed **Python**

Install **uploadserver**
```bash
pip install --user uploadserver
```

Next, create and enter a new folder to serve as **upload directory**
```bash
mkdir upload
cd upload
```

Run and listen on **IPv4** port **8000**
```bash
python -m uploadserver 8000
```

Or, monitor port **8000** on **IPv6**
```bash
python -m uploadserver --bind :: 8000
```

Next, you can use this **file uploader** in your internal network environment.
![](../../assets/images/py-uploadserver.webp)

## Reach the public network

### Method One: Use EdgeOne for IPv6 backsource

Make your IPv6 **DDNS**, then use EdgeOne as the origin server
![](../../assets/images/py-uploadserver-1.webp)

### Method Two: STUN (Only available for NAT1)

When your home network is **NAT1**, you can use software similar to this to directly map your **internal port** to your **public port** (it seems this program is sensitive to TCP fragmentation, which may cause RST) [MikeWang000000/Natter: Expose your TCP/UDP port behind full-cone NAT to the Internet.](https://github.com/MikeWang000000/Natter)
![](../../assets/images/py-uploadserver-2.webp)