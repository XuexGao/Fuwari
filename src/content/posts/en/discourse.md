---
title: "Hand-on Guide: Deploy Discourse"
description: "Here’s a professional translation of the text:  “Discourse is an open-source, robust forum system that enables users to quickly establish their own online community.”"
category: "Tutorial"
published: 2025-05-02
image: ../../assets/images/2025-05-02-22-03-04-image.webp
tags: [Discourse]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Please provide the text you would like me to translate.

Ensure Docker and Docker Compose are installed.

``` docker-compose.yml ```

Please provide the content you would like me to translate. I need the text itself to begin with.

```yaml
version: '2'
services:
  postgresql:
    image: docker.io/bitnami/postgresql:11
    volumes:
      - 'postgresql_data:/bitnami/postgresql'
    environment:
      - POSTGRESQL_POSTGRES_PASSWORD=admin12345
      - POSTGRESQL_USERNAME=ex_discourse
      - POSTGRESQL_PASSWORD=user12345
      - POSTGRESQL_DATABASE=example_discourse
  redis:
    image: docker.io/bitnami/redis:6.0
    environment:
      - REDIS_PASSWORD=redis12345
    volumes:
      - 'redis_data:/bitnami/redis'
  discourse:
    image: docker.io/bitnami/discourse:2
    ports:
      - '127.0.0.1:880:3000'
    volumes:
      - 'discourse_data:/bitnami/discourse'
    depends_on:
      - postgresql
      - redis
    environment:
      # 用户和站点配置
      - DISCOURSE_HOST=example.com
      - DISCOURSE_USERNAME=siteadmin
      - DISCOURSE_PASSWORD=siteadmin12345
      - DISCOURSE_EMAIL=siteadmin@gmail.com
      # 数据库连接配置
      - DISCOURSE_DATABASE_HOST=postgresql
      - DISCOURSE_DATABASE_PORT_NUMBER=5432
      - DISCOURSE_DATABASE_USER=ex_discourse
      - DISCOURSE_DATABASE_PASSWORD=user12345
      - DISCOURSE_DATABASE_NAME=example_discourse
      # Redis 连接配置
      - DISCOURSE_REDIS_HOST=redis
      - DISCOURSE_REDIS_PORT_NUMBER=6379
      - DISCOURSE_REDIS_PASSWORD=redis12345
      # 使用 postgresql-client 为 Discourse 创建数据库
      - POSTGRESQL_CLIENT_POSTGRES_USER=postgres
      - POSTGRESQL_CLIENT_POSTGRES_PASSWORD=admin12345
      - POSTGRESQL_CLIENT_CREATE_DATABASE_NAME=example_discourse
      - POSTGRESQL_CLIENT_CREATE_DATABASE_EXTENSIONS=hstore,pg_trgm
      # SMTP
      - DISCOURSE_SMTP_HOST=smtp.mailgun.org
      - DISCOURSE_SMTP_PORT=587
      - DISCOURSE_SMTP_USER=邮箱用户名
      - DISCOURSE_SMTP_PASSWORD=邮箱密码
      - DISCOURSE_SMTP_PROTOCOL=tls或ssl
      - DISCOURSE_SMTP_AUTH=login
  sidekiq:
    image: docker.io/bitnami/discourse:2
    depends_on:
      - discourse
    volumes:
      - 'sidekiq_data:/bitnami/discourse'
    command: /opt/bitnami/scripts/discourse-sidekiq/run.sh
    environment:
      # 用户和站点配置
      - DISCOURSE_HOST=example.com
      - DISCOURSE_USERNAME=siteadmin
      - DISCOURSE_PASSWORD=siteadmin12345
      - DISCOURSE_EMAIL=siteadmin@gmail.com
      # 数据库连接配置
      - DISCOURSE_DATABASE_HOST=postgresql
      - DISCOURSE_DATABASE_PORT_NUMBER=5432
      - DISCOURSE_DATABASE_USER=ex_discourse
      - DISCOURSE_DATABASE_PASSWORD=user12345
      - DISCOURSE_DATABASE_NAME=example_discourse
      # Redis 连接配置
      - DISCOURSE_REDIS_HOST=redis
      - DISCOURSE_REDIS_PORT_NUMBER=6379
      - DISCOURSE_REDIS_PASSWORD=redis12345
      # SMTP
      - DISCOURSE_SMTP_HOST=smtp.mailgun.org
      - DISCOURSE_SMTP_PORT=587
      - DISCOURSE_SMTP_USER=邮箱用户名
      - DISCOURSE_SMTP_PASSWORD=邮箱密码
      - DISCOURSE_SMTP_PROTOCOL=tls或ssl
      - DISCOURSE_SMTP_AUTH=login
volumes:
  postgresql_data:
    driver: local
  redis_data:
    driver: local
  discourse_data:
    driver: local
  sidekiq_data:
    driver: local
```

The configuration files contain two sections that need to be modified.

Please provide the text you would like me to translate.
Okay, please provide the text you would like me to translate. I’m ready when you are.
Database Administrator Password (Optional)
Okay, I understand. Please provide the text.
Database User Password (Optional)
Okay, I understand. Please provide the text.
Redis password (optional)
| 127.0.0.1:880       | Optional port mapping |
Website IP or domain (no HTTP) (critical revision)
Site Administrator Username (**Mandatory Change**)
Website Administrator Password (**Mandatory Change**)
siteadmin@gmail.com | Website Administrator Email (**Mandatory Change**)
smtp.mailgun.org | Email Host (Must Fix)
Email port number. Can only be used on port 587 (**Must Change**).
Email username
Email password (or verification code)
TLS protocol is required. It can only be used with TLS protocol (**must change**).

If you need an email service that supports SMTP over TLS, here’s a WeChat enterprise mail solution: [微信企业邮](/posts/exmail-qq/)

Okay, please provide the text you would like me to translate. I’m ready when you are.

```bash
docker compose up -d
```

If you encounter an error accessing docker.io, you can use a repository source.

Deployment completed, check the `discourse-discourse-1` container logs.

Discourse is currently performing resource pre-compilation. Please wait a few minutes for it to be ready.

```
INFO  ==> Precompiling assets, this may take some time...
```

The Discourse service is currently running on port 3000 within a container.

```bash
Accessible via: http://0.0.0.0:3000/
```

Next steps: Access your designated domain (if applicable).

Access granted. The task is complete.

![2025-05-02-22-20-51-image.webp](../../assets/images/2025-05-02-22-20-51-image.webp)