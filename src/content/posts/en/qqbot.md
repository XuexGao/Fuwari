---
title: "Build Your QQ Bot with NoneBot2!"
description: "Use NapCat to connect with NoneBot2 and create your own chatbot."
category: "Tutorial"
draft: false
image: ../../assets/images/QmcMSSKysZmgUCUk9W7hQUvZCtVSFH6hGKHctg99yo1yDE.webp
lang: en
published: 2024-11-20
tags:
- QQBot
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
To install NapCat for QQ login and message handling, download and run `launcher.bat` with your QQ number, then access the web UI via the printed URL. For NoneBot2, install Python, set up pipx, and use `nb bs` to scaffold a new bot project, configuring the listening address and port (e.g., 8080) to match NapCat’s web UI. After creating the project with `nb run`, test connectivity with `/ping` and manage plugins or dependencies within the virtual environment.
:::

# Install NapCat (Win)

> Used for logging into QQ to send and receive messages

1. Enter [Release NapCat V4.1.12 · NapNeko/NapCatQQ · GitHub](https://github.com/NapNeko/NapCatQQ/releases/latest), download `NapCat.Shell.zip`

2. Unzip it into a separate folder, then open the command prompt and run `launcher.bat <BOT QQ>`

3. Log in via scanning the QR code with your phone after launch.

4. It will print the local console address information, such as: `[NapCat` [WebUi] WebUi Local Panel Url: http://127.0.0.1:6099/webui?token=4xldg5fqb1]]

5. 直接进入，如图配置即可（端口号可以自己修改，但是要和下部分NoneBot2监听的端口一致。这里是9090）![](../../assets/images/2024-11-20-19-21-21-2024-11-20-19-15-39-image.webp)

# Install NoneBot2

Used to implement logic for controlling NapCat's message sending and receiving.

1. First, you need to install [Python](https://www.python.org/downloads/). On Windows, you can use https://scoop.sh/

2. PyPI Tsinghua Source: `pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple`

3. Install pipx: `pip install pipx`. You can also use `scoop install pipx`

4. Set the pipx global variable: `pipx ensurepath`

5. Install nb-cli: `pipx install nb-cli`

6. **If the 'nb' command is not found:** For the root user, you can edit `/root/.bashrc` or `/root/.profile` (if you are using Bash): `nano /root/.bashrc` Add the following line: `export PATH="$HOME/.local/bin:$PATH"` Save and reload the configuration: `source /root/.bashrc`

7. Install nb bootstrap: `nb self install nb-cli-plugin-bootstrap`

8. Create a new project, choose a folder you like, then: `nb bs` (If you don't understand, just press Enter repeatedly)

Example:

```
C:\afbot>nb bs
加载适配器列表中……
请输入项目名称
[?] 请输入 > onanibot
[?] 请选择你想要使用的适配器 OneBot V11 (OneBot V11 协议)
请输入 Bot 超级用户，超级用户拥有对 Bot 的最高权限（如对接 QQ 填 QQ 号即可）（留空回车结束输入）
[?] 第 1 项 >
请输入 Bot 昵称，消息以 Bot 昵称开头可以代替艾特（留空回车结束输入）
[?] 第 1 项 >
请输入 Bot 命令起始字符，消息以起始符开头将被识别为命令，
如果有一个指令为 查询，当该配置项中有 "/" 时使用 "/查询" 才能够触发，
留空将使用默认值 ['', '/', '#']（留空回车结束输入）
[?] 第 1 项 >
请输入 Bot 命令分隔符，一般用于二级指令，
留空将使用默认值 ['.', ' ']（留空回车结束输入）
[?] 第 1 项 >
请输入 NoneBot2 监听地址，如果要对公网开放，改为 0.0.0.0 即可
[?] 请输入 > 127.0.0.1
请输入 NoneBot2 监听端口，范围 1 ~ 65535，请保证该端口号与连接端配置相同，或与端口映射配置相关
[?] 请输入 > 8080
[?] 是否在项目目录中释出快捷启动脚本？ Yes
[?] 是否将 localstore 插件的存储路径重定向到项目路径下以便于后续迁移 Bot？ Yes
[?] 是否使用超级用户 Ping 指令回复插件？ Yes
[?] 是否安装 logpile 插件提供日志记录到文件功能？ Yes
[?] 是否在启动脚本中使用 webui 插件启动项目以使用网页管理 NoneBot？（该插件仍在开发中，不推荐用于生产环境） No
成功新建项目 onanibot
[?] 是否新建虚拟环境？ Yes
正在 C:\afbot\onanibot\.venv 中创建虚拟环境
创建虚拟环境成功
[?] 是否需要修改或清除 pip 的 PyPI 镜像源配置？ No
[?] 是否立即安装项目依赖？ Yes
正在安装项目依赖
依赖安装成功
[?] 请选择需要启用的内置插件
项目配置完毕，开始使用吧！
```

9. After the project is created, start it: `nb run`

10. Appeared: `*NFO* nonebot | OneBot V11 | Bot XXXXXXXXXX connected` You have successfully connected to Lagrange.

11. Test, send a `/ping`, see if Pong appears~

12. If you need to debug NoneBot2, first use `nb` to enter the virtual environment. Then use `pip install <package_name>`