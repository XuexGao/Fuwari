---
title: "Phira多人联机服务器搭建/使用教程"
description: "Here’s the translation:  “Individuals can directly download pre-built executable files, but require a self-contained Rust environment to access logs.”"
category: "Tutorial"
draft: false
image: ../../assets/images/2024-11-06-08-20-39-image.webp
lang: en
published: 2024-11-06
tags:
- Phira
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article introduces a tool called Phira MP that simplifies the process of setting up and running server-side files, specifically for multiplayer servers like Multiplayer Server | Dmocken’s Phira. It provides instructions for downloading and using the tool, including how to configure port numbers and specify IP/domain addresses. The guide also covers Rust development and installation details for both Windows and Linux users.
:::

# Directly download and run server files.

[https://github.com/afoim/phira-mp-autobuild](https://github.com/afoim/phira-mp-autobuild)

这里有一些由Github Action自动构建的服务端文件，涵盖以下系统和架构![](../../assets/images/2024-11-06-08-28-34-image.webp)

The Phira download station for Dmocken is available here.

Download and execute the files suitable for your system. The default server will be open on port 12346 of your host, and you can specify a custom port using `--port`. Then you can use Phira to enter IP/domain:port to connect.

Please use `RUST_LOG=debug ./xxx` to enable logging, the default log level is `WARN`.

If these files are not suitable for your system, please refer to [Self-built (Advanced)](#自行构建高级) for further reading.

# 自行构建（高级）

Due to Phira-MP’s use of Rust, if you wish to build it yourself, you will need to install a Rust environment on your operating system.

## For Windows

前往[Rust 下载页](https://www.rust-lang.org/zh-CN/learn/get-started)，下载 Rust  ![](../../assets/images/2024-11-06-09-57-44-6b333b87e835dfa299b0c3c95e5ea4e0.webp)
打开后会弹出一个 CMD 窗口，输入 1（Quick Install）回车，等待 Visual Studio 安装（如果此步 Visual Studio 下载很慢也可以[手动下载](https://visualstudio.microsoft.com/zh-hans/downloads/)）

![](../../assets/images/2024-11-06-09-57-49-61b4d36dc8cd1ce47da66be5e2a920cd.webp)在 Visual Studio 中，勾选**使用 C++ 的桌面开发**，然后安装  
![](../../assets/images/2024-11-06-09-58-05-390c775c83dc245b0690fda699bfee5f.webp)然后请跳过 Linux 教程直接阅读[构建 phira-mp]()

## For Linux

```text curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh ```

Select 1

```text CRITICAL RULES: 1. Output ONLY the translated text. No chatter, no 'Here is the translation', no explanations. 2. Keep all special tags like [content], **content**, *content*, `content` exactly as they are. Translate the 'content' inside the tags, but do NOT remove or alter the [[X: ]] markers. 3. If the input is in Chinese, you MUST translate it to English. Never return Chinese text. 4. DO NOT wrap the output in quotes unless the original text was wrapped in quotes.  ```text CRITICAL RULES: 1. Output ONLY the translated text. No chatter, no 'Here is the translation', no explanations. 2. Keep all special tags like [content], **content**, *content*, `content` exactly as they are. Translate the 'content' inside the tags, but do NOT remove or alter the [[X: ]] markers. 3. If the input is in Chinese, you MUST translate it to English. Never return Chinese text. 4. DO NOT wrap the output in quotes unless the original text was wrapped in quotes. ```

# Using Rust to build phira-mp.

Clone repository: `git clone https://github.com/TeamFlos/phira-mp.git` (不支持IPv6) or `git clone https://github.com/afoim/phira-mp-autobuild.git` (支持IPv6)

cd phira-mp or cd phira-mp-autobuild

Update dependencies: `cargo update`

``` build: cargo build --release -p phira-mp-server ```

The Phira-MP server is running on port 8080.
The Phira MP server is running on port 8080.

![](../../assets/images/2024-11-06-10-14-36-0dce4358b21773ae1261e7fc39339c32.webp)