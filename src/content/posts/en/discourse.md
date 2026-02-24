---
title: "Hand-to-hand teaching you how to deploy Discourse"
description: "Discourse is a powerful, open-source forum system that allows you to quickly establish your own Bulletin Board System (BBS) immediately."
category: "Tutorial"
published: 2025-05-02
image: ../../assets/images/2025-05-02-22-03-04-image.webp
tags: [Discourse]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Here's a summary of the provided Docker Compose file:

This configuration defines a multi-container application, including PostgreSQL, Redis, Discourse, and Sidekiq, all running within a Bitnami environment. It utilizes Docker Compose to orchestrate these services.  The `discourse` service is configured with an SMTP server for sending email notifications. The database connections are set up using PostgreSQL, Redis, and the sidekiq service.  The configuration specifies user/password for each service, including database connection details and SMTP settings.  It also utilizes volumes to persist data across container restarts.
:::

# Formal commencement.

Ensure you have installed `Docker` and `Docker-Compose`.

Create a directory structure using `docker-compose.yml`.

写入内容

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

The configuration files contain two revisions.

| Replacement value                | The table contains information about the number of sales per month for each product category.                      |
| ------------------- | ----------------------- |
| admin12345          | Database administrator password (optional)            |
| discourse        | Database username (optional)              |
| User 12345           | Optional password             |
| Example discourse   | Database name (optional)                |
| Redis 12345          | Password (optional)            |
| 127.0.0.1 :: 880       | Port Mapping (Optional)                |
| example.com         | Website IP or domain (no HTTP) (**Fix**) |
| siteadmin           | Website Administrator username (**Fix**)        |
| siteadmin      | Website administrator password (**Mandatory change**)         |
| siteadmin@gmail.com | Website administrator email (**Fix**)         |
| smtp.mailgun.org    | Email Host (B: Fix)          |
| 587                 | Email port. Can only be used on port 587 (**Must Change**).   |
| Email username               | Email username (**Override**)           |
| Email password                | Email password (or authorization code)     |
| TLS                 | Email protocol. Can only use TLS protocol (**Must Change**).   |

If you require an email service that supports SMTP TLS, it can be implemented using [](/posts/exmail-qq/).

Constructing…

```bash
docker compose up -d
```

If you encounter an error accessing Docker Hub, try using a different image source.

Upon completion of deployment, review the logs in the `discourse-discourse-1`(container) directory.

If you encounter the following log, Discourse is currently performing pre-compiled resources. Please wait a few minutes for this to complete.

```
INFO  ==> Precompiling assets, this may take some time...
```

If the following log indicates that Discourse has been successfully launched in a container at port 3000, please proceed with further investigation.

```bash
Accessible via: http://0.0.0.0:3000/
```

Next, please access the domain you have configured (if no parsing or website is within an internal network).

Completion of the task is achieved.

![2025-05-02-22-20-51-image.webp](../../assets/images/2025-05-02-22-20-51-image.webp)