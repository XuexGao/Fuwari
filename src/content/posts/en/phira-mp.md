---
title: "Phira/"
description: "Here’s the translation:  Individuals can download pre-built executable files directly, but require a separate Rust environment to access log data."
category: "Tutorial"
draft: false
image: ../../assets/images/2024-11-06-08-20-39-image.webp
lang: en
published: 2024-11-06
tags:
- Phira
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Download server files and run them directly.

[https://github.com/afoim/phira-mp-autobuild](https://github.com/afoim/phira-mp-autobuild)

这里有一些由Github Action自动构建的服务端文件，涵盖以下系统和架构![](../../assets/images/2024-11-06-08-28-34-image.webp)

You can find Phira downloads on [Multiplayer Server | Dmocken](https://phira.dmocken.top/Multiplayer%20Server%E5%A4%9A%E4%BA%BA%E6%B8%B8%E6%88%8F%E6%9C%8D%E5%8A%A1%E5%99%A8).

Download and execute the files suitable for your system. The default server will be open on port 12346 of your host, and you can specify a custom port using `--port`. Then, you can use Phira to enter IP/domain: port to connect.

To enable logging, please use `RUST_LOG=debug ./xxx`. The default log level is `WARN`.

If these files are not compatible with your current system, please consult [Self-Build (Advanced)](#自行构建高级) for further information.

# Self-built (Advanced)

Due to Phira-MP’s use of Rust, you will need to install a Rust environment on your operating system for self-construction.

## Regarding Windows.

前往[Rust 下载页](https://www.rust-lang.org/zh-CN/learn/get-started)，下载 Rust  ![](../../assets/images/2024-11-06-09-57-44-6b333b87e835dfa299b0c3c95e5ea4e0.webp)
打开后会弹出一个 CMD 窗口，输入 1（Quick Install）回车，等待 Visual Studio 安装（如果此步 Visual Studio 下载很慢也可以[手动下载](https://visualstudio.microsoft.com/zh-hans/downloads/)）

![](../../assets/images/2024-11-06-09-57-49-61b4d36dc8cd1ce47da66be5e2a920cd.webp)在 Visual Studio 中，勾选**使用 C++ 的桌面开发**，然后安装  
![](../../assets/images/2024-11-06-09-58-05-390c775c83dc245b0690fda699bfee5f.webp)然后请跳过 Linux 教程直接阅读[构建 phira-mp]()

## For Linux.

``` Execute the following command to install Rust:  ```bash curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh ``` ```

Select option 1.

Execute: `source $HOME/.cargo/env`

# Using Rust to build phira-mp.

Clone Repository: `git clone https://github.com/TeamFlos/phira-mp.git` (IPv6 not supported) or `git clone https://github.com/afoim/phira-mp-autobuild.git` (IPv6 supported)

`cd phira-mp` or `cd phira-mp-autobuild`

Update dependencies: `cargo update`

``` Build: `cargo build --release -p phira-mp-server` ```

Run the program and print the log to the terminal, indicating the port you are listening on: `RUST_LOG=info target/release/phira-mp-server`.
If you need to specify a port number: `RUST_LOG=info target/release/phira-mp-server --port 8080`

![](../../assets/images/2024-11-06-10-14-36-0dce4358b21773ae1261e7fc39339c32.webp)