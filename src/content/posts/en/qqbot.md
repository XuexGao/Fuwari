---
title: "Use NoneBot2 to build your QQ Bot!"
description: "Using NapCat to connect with NoneBot2, you can build your own chatbot."
category: "Tutorial"
draft: false
image: ../../assets/images/QmcMSSKysZmgUCUk9W7hQUvZCtVSFH6hGKHctg99yo1yDE.webp
lang: en
published: 2024-11-20
tags:
- QQBot
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Installation of NapCat (Windows)

Login to QQ to send and receive messages.

1. Please download [Release NapCat V4.1.12 · NapNeko/NapCatQQ · GitHub](https://github.com/NapNeko/NapCatQQ/releases/latest)’s `NapCat.Shell.zip` file.

2. Here’s the translation:  “Move the stress to a separate folder, then open the command line and run `\launcher.bat <BOT QQ ID>`”

3. Upon completion of the process, please scan your mobile device using the provided QR code to log in.

4. It will print the local console address information, such as `[NapCat` [WebUi] WebUi Local Panel Url: http://127.0.0.1:6099/webui?token=4xldg5fqb1]].

5. 直接进入，如图配置即可（端口号可以自己修改，但是要和下部分NoneBot2监听的端口一致。这里是9090）![](../../assets/images/2024-11-20-19-21-21-2024-11-20-19-15-39-image.webp)

# Installation of NoneBot2.

For implementing logic to control NapCat communication, this section will define the system’s communication protocols and management procedures.

1. First, you must install Python. Windows supports it at https://scoop.sh/.

2. Pypi Cleanwater Source: `pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple`

3. To install pipx, please run: `pip install pipx`. You can also use `scoop install pipx`.

4. Set the global pipx variable: `pipx ensurepath`

5. ``` Install the nb-cli package using pipx: `pipx install nb-cli` ```

6. **If you cannot find the 'nb' command:** For root users, you can edit `/root/.bashrc` or `/root/.profile` (if using Bash): Add the following lines to the file: `export PATH="$HOME/.local/bin:$PATH"` Save and reload the configuration: `source /root/.bashrc`

7. `nb self install nb-cli-plugin-bootstrap`

8. Develop a new project, selecting a folder you prefer. Then: `nb bs` (Unclear, proceed to the end).

示例：

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

9. Upon completion of the project, initiate the launch process: `nb run`

10. Connection to Lagrange has been established successfully. `INFO` nonebot | OneBot V11 | Bot XXXXXXXXXX connected]]

11. Please test the ping service and observe if it encounters the Pong error.

12. To debug NoneBot2, first enter the virtual environment using `nb`. Subsequently, install the necessary package using `pip install <package_name>`.