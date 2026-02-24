---
title: "Have you ever considered deploying BitWarden directly to a Cloudflare Worker?"
description: "warden-worker is such a project that compiles Rust to WASM and deploys it to Cloudflare Workers, requiring no VPS, no home cloud, just a few clicks to freely use your own password hosting for free!"
published: 2026-01-26
image: ../../assets/images/warden-worker.webp
tags:
  - Cloudflare
  - Bitwarden
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This project deploys a Bitwarden-compatible password manager on Cloudflare Workers using Rust compiled to WASM, with D1 serving as the encrypted data store. Deployment involves installing Rust, cloning the repo, setting up a D1 database, compiling the WASM binary, and configuring secrets like JWT keys and 2FA encryption keys via Wrangler. After deployment, users can register via mobile Bitwarden, enable 2FA on the web interface, and import/export password vaults as needed.
:::

# Principle
The project references the open-source [dani-garcia/vaultwarden: Unofficial Bitwarden compatible server written in Rust, formerly known as bitwarden_rs](https://github.com/dani-garcia/vaultwarden) and compiles its Rust source code into WASM to support running on Cloudflare Workers. In this setup, the Worker handles the REST API, while D1 manages the storage of encrypted data.

# Deployment

First, ensure that you have installed Rust; if not, go to: [Install Rust - The Rust Programming Language](https://rust-lang.org/zh-CN/tools/install/)

Clone repository: [afoim/warden-worker: A Bitwarden-compatible server for Cloudflare Workers](https://github.com/afoim/warden-worker)

Create a D1 database
```sql
wrangler d1 create warden-sql
```

![](../../assets/images/warden-worker-25.webp)

Replace the database ID in **wrangler.jsonc**

![](../../assets/images/warden-worker-26.webp)

Initialize the database

```sql
wrangler d1 execute warden-sql --remote --file=sql/schema_full.sql
```

![](../../assets/images/warden-worker-27.webp)

Compile Rust WASM

```bash
cargo build --release
```
Deploy Worker

```bash
wrangler deploy
```

Set whitelist email addresses

```bash
wrangler secret put ALLOWED_EMAILS
```

![](../../assets/images/warden-worker-29.webp)

Set JWT (just roll your keyboard)

```bash
wrangler secret put JWT_SECRET
wrangler secret put JWT_REFRESH_SECRET
```

![](../../assets/images/warden-worker-30.webp)

Set the 2FA encryption key (32-byte Base64 encoded text)

```bash
wrangler secret put TWO_FACTOR_ENC_KEY
```

PowerShell can be generated like this

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object {Get-Random -Minimum 0 -Maximum 256}))
```

![](../../assets/images/warden-worker-31.webp)

Go to the dashboard to bind the domain (if routing requires manually adding a record pointing to Cloudflare)

![](../../assets/images/warden-worker-28.webp)

Create an account using the Bitwarden mobile app (using a whitelisted email)

Next, go to the web interface ( `/demo.html` , which by default uses the Vaultwarden frontend and may have some bugs), enable 2FA: https://cfbw.2x.nz (store it with another TOTP authenticator)

**y the way, you can also modify your email or master password on the web interface.**

![](../../assets/images/warden-worker-32.webp)

After logging out and then logging back in on all previously logged-in devices, you will be prompted for TOTP.

# Import password library

If you have an old password library, please first go to **Settings - Password Library Options - Export - .json**

Log in to the current password vault, then go to **Settings - Password Vault Options - Import - .json**

![](../../assets/images/warden-worker-33.webp)