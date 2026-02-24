---
title: "Step-by-step Guide to Deploying Discourse"
description: "Discourse is a powerful open-source forum system that lets you instantly have your own BBS."
category: "Tutorial"
published: 2025-05-02
image: ../../assets/images/2025-05-02-22-03-04-image.webp
tags: [Discourse]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide outlines how to deploy Discourse using Docker Compose, requiring configuration of database, Redis, and SMTP settings. Key variables like domain, admin credentials, and email settings must be customized. The setup includes services for PostgreSQL, Redis, Discourse, and Sidekiq, with volumes for persistent data. Run `docker compose up -d` to start the stack.
:::

# Formally begin

Make sure you have installed `Docker` and `Docker-Compose`

Select a directory to create `docker-compose.yml`

Write in content

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

The sections that need to be modified. Both copies in the configuration file must be changed.

| Value to be replaced                | Explain                      |
| ------------------- | ----------------------- |
| admin12345          | Database Administrator Password (Optional)            |
| ex_discourse        | Database username (optional)              |
| user12345           | Database user password (optional)             |
| example_discourse   | Database name (optional)                |
| redis12345          | Redis password (optional)            |
| 127.0.0.1:880       | Map ports (optional)                |
| example.com         | Website IP or domain name (without HTTP) (**Must be changed**) |
| site admin           | Website Administrator Username (Must Be Changed)        |
| siteadmin12345      | Website administrator password (must be changed)         |
| siteadmin@gmail.com | Website administrator email (must be changed)         |
| smtp.mailgun.org    | Email HOST (Must be changed)          |
| 587                 | Email port. Only port 587 can be used (must be changed)   |
| Email username               | Email username (must be changed)           |
| Email password                | Email password (or authorization code) (**Must change**)     |
| TLS                 | Email protocol. Only TLS protocol is allowed (must be changed).   |

If you need an email service that supports SMTP TLS, you can use [WeChat Enterprise Email](/posts/exmail-qq/)

Construction:

```bash
docker compose up -d
```

If encountering `docker.io` is inaccessible, you can use a mirror source

After deployment, check the logs of the `discourse-discourse-1` container

If you see the log below, Discourse is currently precompiling assets; please wait a few minutes.

```
INFO  ==> Precompiling assets, this may take some time...
```

If you see the following log, it proves that Discourse has started on port 3000 inside the container.

```bash
Accessible via: http://0.0.0.0:3000/
```

Next, visit the domain you have set up (if DNS resolution has not been configured or the website is on an internal network, you can use Cloudflare Tunnel as a workaround).

Access completed successfully.

![2025-05-02-22-20-51-image.webp](../../assets/images/2025-05-02-22-20-51-image.webp)