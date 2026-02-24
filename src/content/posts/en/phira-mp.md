---
title: "Phira Multiplayer Online Server Setup / Usage Guide"
description: "Lazy users can directly download the pre-built executable, but if you want logs, you need to have your own Rust environment."
category: "Tutorial"
draft: false
image: ../../assets/images/2024-11-06-08-20-39-image.webp
lang: en
published: 2024-11-06
tags:
- Phira
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article provides instructions for downloading and running pre-built server files for Phira Multiplayer Server, compatible with various systems. Users can download ready-to-run binaries or build from source using Rust, with detailed steps for Windows (requiring Visual Studio) and Linux (via rustup). The server defaults to port 12346, customizable via `--port`, and logs can be viewed with `RUST_LOG=debug`.
:::

# Download the server-side files directly and run them

[https://github.com/afoim/phira-mp-autobuild](https://github.com/afoim/phira-mp-autobuild)

这里有一些由Github Action自动构建的服务端文件，涵盖以下系统和架构![](../../assets/images/2024-11-06-08-28-34-image.webp)

You can also go to [Multiplayer Server | Dmocken's Phira Download Site](https://phira.dmocken.top/Multiplayer%20Server%E5%A4%9A%E4%BA%BA%E6%B8%B8%E6%88%8F%E6%9C%8D%E5%8A%A1%E5%99%A8) to search for it yourself.

Look for the file suitable for your system, download and run it. By default, the server will be open on port 12346 of your host. If you need to customize the port, use the `--port` parameter to specify the port. Then you can use Phira to connect by entering the IP/domain:port.

*If you want to display logs, run `RUST_LOG=debug ./xxx`. The default log level is `WARN`

If these files are not suitable for the system you are using, please proceed to [Build Manually (Advanced)](#自行构建高级) to continue reading

# Self-constructed (Advanced)

Since phira-mp is written in Rust, if you wish to build it yourself, you need to install the Rust environment on your operating system.

## For Windows

前往[Rust 下载页](https://www.rust-lang.org/zh-CN/learn/get-started)，下载 Rust  ![](../../assets/images/2024-11-06-09-57-44-6b333b87e835dfa299b0c3c95e5ea4e0.webp)
After opening, a CMD window will pop up. Enter 1 (Quick Install) and press Enter, then wait for Visual Studio to install (if the Visual Studio download is slow, you can [](https://visualstudio.microsoft.com/zh-hans/downloads/)).

![](../../assets/images/2024-11-06-09-57-49-61b4d36dc8cd1ce47da66be5e2a920cd.webp)在 Visual Studio 中，勾选**使用 C++ 的桌面开发**，然后安装  
![](../../assets/images/2024-11-06-09-58-05-390c775c83dc245b0690fda699bfee5f.webp)然后请跳过 Linux 教程直接阅读[构建 phira-mp]()

## For Linux

Execute: `curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`

Select 1 and press Enter

Execute: `source $HOME/.cargo/env`

# Building phira-mp with Rust

Clone the repository: `git clone https://github.com/TeamFlos/phira-mp.git` (does not support IPv6) or `git clone https://github.com/afoim/phira-mp-autobuild.git` (supports IPv6)

`cd phira-mp` or `cd phira-mp-autobuild`

Update dependencies: `cargo update`

Building: `cargo build --release -p phira-mp-server`

Run the program and print logs to the terminal; it will display the port you are listening on: `RUST_LOG=info target/release/phira-mp-server`
(If you need to specify a port number: `RUST_LOG=info target/release/phira-mp-server --port 8080`)

![](../../assets/images/2024-11-06-10-14-36-0dce4358b21773ae1261e7fc39339c32.webp)