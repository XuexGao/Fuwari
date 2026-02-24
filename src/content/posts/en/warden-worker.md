---
title: "Could you have ever thought about deploying Warden directly to Cloudflare Workers?"
description: "The Warden-Worker project streamlines Rust compilation into WebAssembly (WASM) and deploys it to Cloudflare Workers, eliminating the need for a VPS or on-premises cloud infrastructure. Deployment is seamless via a simple point-and-click interface, offering free access to your own credentials for secure hosting."
published: 2026-01-26
image: ../../assets/images/warden-worker.webp
tags:
  - Cloudflare
  - Bitwarden
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This project utilizes Rust code to create a Bitwarden compatible server, running on Cloudflare Workers. The server handles REST API requests through the Worker and stores encrypted data within the D1 database using SQL. Deployment involves installing Rust, cloning the repository, creating the D1 database with `wrangler`, initializing the database with `wrangler`, compiling the Rust WASM code using Cargo, deploying the worker using `wrangler deploy`, setting up email whitelisting via secret keys, JWT/2FA authentication through secrets, and finally, enabling two-factor authentication by generating a Base64 encoded text key. The project also includes instructions for creating a Bitwarden account on a mobile device, including importing existing passwords from a JSON file, and utilizing TOTP for login verification.
:::

# The core principle.
The project, based on open-source code for [dani-garcia/vaultwarden: Unofficial Bitwarden compatible server written in Rust, formerly known as bitwarden_rs](https://github.com/dani-garcia/vaultwarden), has been compiled into WebAssembly (WASM) to enable execution within Cloudflare Workers. Worker handles the REST API, and D1 is responsible for storing encrypted data.

# Deployment

Ensure you have installed Rust. If installation is not possible, please refer to [Install Rust - Rust Programming Language](https://rust-lang.org/zh-CN/tools/install/).

Clone Repository: [afoim/warden-worker: A Bitwarden-compatible server for Cloudflare Workers](https://github.com/afoim/warden-worker)

创建D1数据库
```sql
wrangler d1 create warden-sql
```

![](../../assets/images/warden-worker-25.webp)

Please provide the content of the database ID file, **wrangler.jsonc**. I need the content to translate it into professional English.

![](../../assets/images/warden-worker-26.webp)

Initialize the database.

```sql
wrangler d1 execute warden-sql --remote --file=sql/schema_full.sql
```

![](../../assets/images/warden-worker-27.webp)

Compilation of Rust WebAssembly.

```bash
cargo build --release
```
部署 Worker

```bash
wrangler deploy
```

Set up a whitelist for email addresses.

```bash
wrangler secret put ALLOWED_EMAILS
```

![](../../assets/images/warden-worker-29.webp)

Setting up JWT (Face Recognition Keyboard) is straightforward.

```bash
wrangler secret put JWT_SECRET
wrangler secret put JWT_REFRESH_SECRET
```

![](../../assets/images/warden-worker-30.webp)

Set up 2FA encryption key (32-byte Base64 encoded text).

```bash
wrangler secret put TWO_FACTOR_ENC_KEY
```

Here’s a professional translation of “Poweshell can be generated” into English:  “Poweshell can be generated.”

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Minimum 0 -Maximum 256}))
```

![](../../assets/images/warden-worker-31.webp)

Please bind the domain to the control panel (if a wildcard route requires manual configuration).

![](../../assets/images/warden-worker-28.webp)

Here’s the translation:  “Create a Bitwarden account using a white-list email address from your mobile device.”

Next, please proceed to the web interface (`/demo.html` defaults to the Vaultwarden frontend, which may experience some bugs). Enable 2FA: [https://cfbw.2x.nz](https://cfbw.2x.nz) using a different TOTP verification method.

Please note that you can modify your email or primary password directly on the website.

![](../../assets/images/warden-worker-32.webp)

Upon logging out of all previously logged-in devices, you will be prompted to enter the TOTP (Time-Based One-Password) code.

# 导入密码库

If you have an old password vault, please proceed to **Set - Password Vault Options - Export - .json**.

Log in to the current password library, and proceed to **Set - Password Library Options - Import - .json**.

![](../../assets/images/warden-worker-33.webp)