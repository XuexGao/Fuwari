---
title: "QQ微信不够私密？自建自己的聊天服务器！"
description: "Using Synapse, users can directly communicate with each other through Element and other software on their servers."
category: "Tutorial"
published: 2025-08-02
image: '../../assets/images/2025-08-02-17-20-32-image.webp'
tags: [Matrix, Synapse]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Please provide the text you would like me to translate.

Due to the manual deployment of Synapse and Matrix, it can be quite challenging. Please install **1Panel面板**.

# Deployment PostgreSQL

Install and create a database named `synapse` with the username `synapse`.

Download and install PGAdmin4 from your app store.

![](../../assets/images/2025-08-02-17-24-58-image.webp)

Please provide the text you would like me to translate.

![](../../assets/images/2025-08-02-17-27-10-image.webp)

Okay, please provide the text. I’m ready when you are.

![](../../assets/images/2025-08-02-17-27-53-image.webp)

Just created a synapse database.

![](../../assets/images/2025-08-02-17-28-49-image.webp)

重新创建同名数据库

Okay, please provide the text you would like me to translate. I will adhere strictly to your instructions and deliver only the translated text without any extraneous information.

![](../../assets/images/2025-08-02-17-29-36-image.webp)

Please provide the text you would like me to translate.

![](../../assets/images/2025-08-02-17-30-34-image.webp)

# Deployment Synapse

Refer to the official tutorial to create a storage volume, otherwise Synapse installation will fail.

![](../../assets/images/2025-08-02-17-32-00-image.webp)

Install Synapse

Navigate to the file management folder: C:/var/lib/docker/volumes/synapse-data/_data

You should see.

![](../../assets/images/2025-08-02-17-33-50-image.webp)

Edit the homeserver.yaml file and configure as needed.

```yaml
server_name: "家服务器名称，比如：m.2x.nz"
public_baseurl: "公共URL，比如：https://m.2x.nz"
pid_file: /data/homeserver.pid

serve_server_wellknown: true # 启用联邦

listeners:
  - port: 8008
    tls: false
    type: http
    x_forwarded: true
    resources:
      - names: [client, federation]
        compress: false
    response_headers:
      Access-Control-Allow-Origin: "https://app.element.io"
      Access-Control-Allow-Methods: "GET, POST, OPTIONS"
      Access-Control-Allow-Headers: "Content-Type, Authorization"

database:
  name: psycopg2
  args:
    user: synapse
    password: 你的数据库密码
    dbname: synapse
    host: 你的PostgreSQL的容器名称
    cp_min: 5
    cp_max: 10

log_config: "/data/my.matrix.host.log.config"
media_store_path: /data/media_store

registration_shared_secret: "这里的东西是随机生成的，每个人都不一样，请忽略这一块，并使用你的配置"
macaroon_secret_key: "这里的东西是随机生成的，每个人都不一样，请忽略这一块，并使用你的配置"
form_secret: "这里的东西是随机生成的，每个人都不一样，请忽略这一块，并使用你的配置"
signing_key_path: "/data/my.matrix.host.signing.key"

report_stats: false

trusted_key_servers:
  - server_name: "matrix.org"

# Github OAuth
oidc_providers:
  - idp_id: github
    idp_name: Github
    idp_brand: "github"  # optional: styling hint for clients
    discover: false
    issuer: "https://github.com/"
    client_id: "Ov23liaHxxYHybb0jRoZ" # TO BE FILLED
    client_secret: "e937f214ea7c132924ab34c76d83f4b7099d696e" # TO BE FILLED
    authorization_endpoint: "https://github.com/login/oauth/authorize"
    token_endpoint: "https://github.com/login/oauth/access_token"
    userinfo_endpoint: "https://api.github.com/user"
    scopes: ["read:user"]
    user_mapping_provider:
      config:
        subject_claim: "id"
        localpart_template: "{{ user.login }}"
        display_name_template: "{{ user.name }}"

### ✅ 邮件配置（确保SMTP验证正常）
email:
  smtp_host: "你的SMTP发件服务器"
  smtp_port: 465
  smtp_user: "你的发件邮箱"
  smtp_pass: "你的SMTP密码"
  force_tls: true
  notif_from: "Matrix <你的发件邮箱>"
  validation_token_lifetime: "5m"

### ✅ 启用注册 + 邮箱验证 + 密码找回
enable_registration: true
registrations_require_3pid:
  - email
registration_requires_token: false   # 确保不强制邀请码注册（默认关闭）
password_config:
  enabled: true

### ✅ 允许邮箱登录
login_via_existing_session:
  enabled: true

rc_registration:
  per_second: 0.003  # 每秒允许的注册请求（例如：0.003 ≈ 每5分钟一次）
  burst_count: 1     # 同一IP地址的最大注册突发数

  # 消息发送速率限制
rc_message:
  per_second: 0.2    # 每秒允许发送的消息数
  burst_count: 10    # 突发消息缓冲区大小

# 房间加入速率限制
rc_joins:
  local:
    per_second: 0.1   # 本地用户加入房间的速率
    burst_count: 10
  remote:
    per_second: 0.01  # 远程用户加入房间的速率
    burst_count: 10

# 媒体保留设置
media_retention:
  # 本地媒体文件的保留时间
  local_media_lifetime: 90d
  
  # 远程媒体文件的保留时间（来自其他homeserver的媒体）
  remote_media_lifetime: 14d

# 删除陈旧设备的时间
delete_stale_devices_after: 1y

auto_join_rooms:
  - "#XXX:你的家服务器URL" # 需要自动加入的房间
```

Please configure the homeserver sample configuration file – Synapse.

# Create an administrator account.

Connect to the container’s terminal and enter this command to create a administrator account.

```bash
register_new_matrix_user  http://localhost:8008 -c /data/homeserver.yaml  -a -u 管理员用户名 -p 密码
```

# Okay, let’s begin. Please provide the text you would like me to translate.

Go to https://app.element.io and change your home server to HTTPS.

Via the administrator account login.

Individuals can register via email.