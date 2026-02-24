---
title: "Could you have ever thought about deploying Warden directly to Cloudflare Workers?"
description: "Here’s the translation:  “Wardens-Worker is a project that compiles Rust into WebAssembly (WASM) and deploys it to Cloudflare Workers, eliminating the need for VPS or on-premises cloud infrastructure. Simply point and click – free access via your own credentials.”"
published: 2026-01-26
image: ../../assets/images/warden-worker.webp
tags:
  - Cloudflare
  - Bitwarden
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article describes the deployment of a Bitwarden-compatible server, Vaultwarden, built in Rust and optimized for Cloudflare Worker environments. It outlines the necessary steps to set up the server, including installing Rust, cloning the repository, creating a D1 database using SQL, compiling Rust WASM code, deploying the server via `wrangler deploy`, setting email whitelisting, JWT/2FA secrets, and configuring the two-factor authentication (2FA) key. The guide also covers how to create a new Bitwarden account and utilize the mobile app for simplified login.
:::

# Okay, please provide the text. I’m ready when you are.
The Dani Garcia/Vaultwarden project, a Rust-based server written in WASM, was previously known as bitwarden_rs and is now designed to run on Cloudflare Workers. Worker handles the REST API, and D1 manages data encryption.

# Please provide the text you would like me to translate.

Ensure you have installed Rust, if you cannot access it: [Install Rust - Rust Programming Language](https://rust-lang.org/zh-CN/tools/install/)

Clone Repository: [afoim/warden-worker: A Bitwarden-compatible server for Cloudflare Workers](https://github.com/afoim/warden-worker)

创建D1数据库
```sql
wrangler d1 create warden-sql
```

![](../../assets/images/warden-worker-25.webp)

Replacement of database ID in wrangler.jsonc

![](../../assets/images/warden-worker-26.webp)

Initialize database

```sql
wrangler d1 execute warden-sql --remote --file=sql/schema_full.sql
```

![](../../assets/images/warden-worker-27.webp)

Compile Rust WASM

```bash
cargo build --release
```
部署 Worker

```bash
wrangler deploy
```

Set up email forwarding to a specific address.

```bash
wrangler secret put ALLOWED_EMAILS
```

![](../../assets/images/warden-worker-29.webp)

Setting up a JWT (Face Roll Keyboard)

```bash
wrangler secret put JWT_SECRET
wrangler secret put JWT_REFRESH_SECRET
```

![](../../assets/images/warden-worker-30.webp)

Set 2FA encryption key (32-byte Base64 encoded text)

```bash
wrangler secret put TWO_FACTOR_ENC_KEY
```

PowerShell can be used to generate.

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Minimum 0 -Maximum 256}))
```

![](../../assets/images/warden-worker-31.webp)

Connect to the control panel and bind a domain name (if routing requires manual entry).

![](../../assets/images/warden-worker-28.webp)

Using Bitwarden to create an account (using a whitelist email)

Enable 2FA: https://cfbw.2x.nz (using a different TOTP verification method)

Let me know if you’d like me to translate anything else!

![](../../assets/images/warden-worker-32.webp)

Log out of all previously logged-in devices before logging in again, and you will be required to use TOTP.

# Importing a password library is a crucial step for securing your application and protecting sensitive data. This process involves establishing a secure connection to the library's server, typically using a cryptographic protocol like TLS/SSL.  The specific implementation details vary depending on the library’s design and chosen authentication method.  It’s essential to validate the credentials provided by the library to prevent unauthorized access and potential security breaches.  Proper handling of credentials is paramount for maintaining data integrity and system security.

Please visit **Set up - Password Library Options - Export - .json**.

Log in to the password vault, navigate to Settings - Password Vault Options - Import - .json

![](../../assets/images/warden-worker-33.webp)