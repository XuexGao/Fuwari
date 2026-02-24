---
title: 你可曾想过，直接将BitWarden部署到Cloudflare Worker？
published: 2026-01-26
description: warden-worker就是这样一个项目，它将Rust编译为WASM，然后部署到Cloudflare Worker，无需VPS，无需家里云，只需点点鼠标就可免费用上自己的密码托管！
image: ../assets/images/warden-worker.webp
tags:
  - Cloudflare
  - Bitwarden
draft: false
lang: ""
---
:::ai-summary{model="google/gemma-3-1b"}
以下是文章的简短总结：

Vaultwarden 是一个Rust 代码编写的 Bitwarden 兼容服务器，用于在 Cloudflare Worker 上运行。它通过 Rust WASM 构建，并使用 SQL 数据库来存储加密数据。部署过程包括安装 Rust、克隆仓库、创建 D1 数据库，编译 Rust WASM，部署 Worker，设置白名单邮箱和 JWT 等安全措施，以及启用 2FA 加密。最后，用户可以通过网页端或移动端 Bitwarden 创建账号并登录，再进行 TOTP 验证。
:::

# 原理
项目参考开源的 [dani-garcia/vaultwarden: Unofficial Bitwarden compatible server written in Rust, formerly known as bitwarden_rs](https://github.com/dani-garcia/vaultwarden) 将Rust源码编译为WASM以支持在Cloudflare Worker上运行。其中Worker负责REST API，D1负责存储加密后的数据

# 部署

首先确保你安装了Rust，若无可前往： [安装 Rust - Rust 程序设计语言](https://rust-lang.org/zh-CN/tools/install/)

克隆仓库： [afoim/warden-worker: A Bitwarden-compatible server for Cloudflare Workers](https://github.com/afoim/warden-worker)

创建D1数据库
```sql
wrangler d1 create warden-sql
```

![](../assets/images/warden-worker-25.webp)

替换 **wrangler.jsonc** 的数据库ID

![](../assets/images/warden-worker-26.webp)

初始化数据库

```sql
wrangler d1 execute warden-sql --remote --file=sql/schema_full.sql
```

![](../assets/images/warden-worker-27.webp)

编译Rust WASM

```bash
cargo build --release
```
部署 Worker

```bash
wrangler deploy
```

设置白名单邮箱

```bash
wrangler secret put ALLOWED_EMAILS
```

![](../assets/images/warden-worker-29.webp)

设置JWT（脸滚键盘即可）

```bash
wrangler secret put JWT_SECRET
wrangler secret put JWT_REFRESH_SECRET
```

![](../assets/images/warden-worker-30.webp)

设置2FA加密密钥（32字节Base64编码文本）

```bash
wrangler secret put TWO_FACTOR_ENC_KEY
```

Poweshell可以这样生成

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Minimum 0 -Maximum 256}))
```

![](../assets/images/warden-worker-31.webp)

前往控制台绑定域名（若路由需要手动写一条解析到Cloudflare）

![](../assets/images/warden-worker-28.webp)

使用移动端Bitwarden创建账号（使用白名单邮箱）

接下来，前往网页端（ `/demo.html` 默认使用的是 Vaultwarden的前端，可能会有些Bug），启用2FA： https://cfbw.2x.nz （用另一个TOTP验证器存储）

*顺便一提，想要修改邮箱或主密码也可以在网页端进行了*

![](../assets/images/warden-worker-32.webp)

将所有已登录的设备登出后再登入则会被要求TOTP

# 导入密码库

如果您有旧的密码库，请先前往 **设置 - 密码库选项 - 导出 - .json** 

再登录当前密码库，前往 **设置 - 密码库选项 - 导入 - .json**

![](../assets/images/warden-worker-33.webp)