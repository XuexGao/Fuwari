---
title: "Record Migration: Umami, from Local to Cloud"
description: "Prior to the deployment of website analytics, it was established on a home cloud NAS with IPv6 backends, and now I am migrating it to Render+Supabase."
category: "Record"
published: 2025-08-28
image: '../../assets/images/2025-08-28-10-01-43-image.webp'
tags: [Umami]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Here's a brief summary of the article:

This guide walks users through setting up and deploying Umami, a PostgreSQL-based server, using Supabase. It covers backing up databases locally, creating new projects within Supabase, and then deploying it to the cloud.  The process involves connecting to the local PostgreSQL instance via pgAdmin4, creating databases, and subsequently restoring backups to a Supabase project.  It highlights important considerations like managing multiple database sub-projects within Supabase and securing your database credentials through Umami’s unique settings. Finally, the article suggests using EdgeOne CDN for CORS configuration to ensure accurate data statistics.
:::

rolled back

# Backup your local database.

Install pgAdmin 4 on any machine.

Connect to a local PostgreSQL instance.

![](../../assets/images/2025-08-28-10-03-34-image.webp)

Backup of the database requires right-click.

![](../../assets/images/2025-08-28-10-03-58-image.webp)

Create a backup of the file named **filename**. The backup will be stored on **pgAdmin4**.

![](../../assets/images/2025-08-28-10-04-44-image.webp)

# Restore your backups to the cloud.

> 免费计划有 500MB 免费的数据库空间，完全够用了
> 
> ![](../../assets/images/2025-08-28-10-06-39-2dfd6b861774ca0b05d460fc19bfccb1.webp)

https://supabase.com/

Create a new project.

Find connection parameters (top left)

![](../../assets/images/2025-08-28-10-07-41-image.webp)

In pgAdmin 4, connect to your Supabase database.

![](../../assets/images/2025-08-28-10-10-00-image.webp)

It is worth noting that you can create multiple databases locally in PostgreSQL. However, in Supabase, each project corresponds to a dedicated **postgres** database. You can use **pgAdmin4** to create new sub-databases, but the Supabase dashboard will not be visible. Therefore, I recommend that in your Supabase project, each project has its own database, and do not use sub-databases.

Right-click to restore.

![](../../assets/images/2025-08-28-10-12-10-image.webp)

Selected backup database file

![](../../assets/images/2025-08-28-10-12-29-image.webp)

进行还原，必会 **失败**，但是不用管

These errors are likely due to missing user records from previous databases, but the table structure has been restored.

![](../../assets/images/2025-08-28-10-16-25-image.webp)

# Deployment on Render

Open the dashboard.

Create projects, select **Web Services**.

Select the latest version, which is vx.xx.x, and input the following image: [https://umami-software.com/umami/postgresql-v2.19.0](https://umami-software.com/umami/postgresql-v2.19.0)

Configuration must be set.

Okay, please provide the text. I’m ready when you are.
Okay, please provide the text. I’m ready when you are.
APP_SECRET
database type
Database URL

You can observe the value of **APP_SECRET** in the Umami instance from previous experiences.

![](../../assets/images/2025-08-28-10-25-05-image.webp)

The DATABASE_URL can be found in Supabase.

![](../../assets/images/2025-08-28-10-25-44-image.webp)

The password for Supabase can be reset through the database settings.

Please note that Supabase only supports database password resets after they have been set, and you will no longer be able to view them once they are done. Please safeguard your database password carefully.

Deployment will be initiated, and Render will assign you a web address.

![](../../assets/images/2025-08-28-10-29-02-image.webp)

Attempted access has been successfully migrated.

![](../../assets/images/2025-08-28-10-29-46-image.webp)

# EdgeOne CDN supports CORS configuration.

Due to the lack of independent CORS settings for Umami, without enabling CORS, others can arbitrarily scrape your Umami, leading to inaccurate statistics. Please see the article [this article](/posts/you-is-me-huh/) regarding this issue. We can leverage EdgeOne CDN to provide a simulated CORS support.

Please provide the text you would like me to translate.

![](../../assets/images/2025-08-28-10-32-09-image.webp)

Configuration details for CORS (Cross-Origin Resource Sharing) are provided here.

![](../../assets/images/2025-08-28-10-32-32-image.webp)