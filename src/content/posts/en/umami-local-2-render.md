---
title: "Record Migration Umami, from Local to Cloud"
description: "Prior to the deployment of website analytics, it was established within a home cloud NAS environment utilizing IPv6 for inbound connections. Currently, I am migrating him to Render+Supabase."
category: "Record"
published: 2025-08-28
image: '../../assets/images/2025-08-28-10-01-43-image.webp'
tags: [Umami]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Here’s a brief summary of the article:

The article guides users through setting up Umami, a PostgreSQL database service, on Supabase. It explains how to create and restore databases within pgAdmin4, connecting to the Supabase database using the provided endpoint URL.  It also covers the process of deploying Umami with Render, including configuring environment variables like `APP_SECRET` and `DATABASE_URL`, and crucially, resetting the database password through Supabase’s security features. The guide highlights potential risks associated with cross-origin requests and provides a solution for EdgeOne CDN to handle CORS properly.
:::

The rollback has been initiated.

# Backup local database.

Please install **pgAdmin4** on any machine.

Connect to a local PostgreSQL instance.

![](../../assets/images/2025-08-28-10-03-34-image.webp)

The right-click operation requires a backup of the database. Please click **Backup**.

![](../../assets/images/2025-08-28-10-03-58-image.webp)

Create a backup of the file titled **filename**. The backup will be stored on **pgAdmin4**.

![](../../assets/images/2025-08-28-10-04-44-image.webp)

# Restore backups to a cloud-based database.

> 免费计划有 500MB 免费的数据库空间，完全够用了
> 
> ![](../../assets/images/2025-08-28-10-06-39-2dfd6b861774ca0b05d460fc19bfccb1.webp)

Enter [https://supabase.com](https://supabase.com)

Create a new project.

Find connection parameters (top left).

![](../../assets/images/2025-08-28-10-07-41-image.webp)

In the **pgAdmin4** interface, connect to your Supabase database.

![](../../assets/images/2025-08-28-10-10-00-image.webp)

It is important to note that in PostgreSQL, you can create multiple sub databases locally. In Supabase, each project corresponds to a dedicated **postgres** database. You can use **pgAdmin4** to create new sub databases, but the Supabase dashboard will not be visible. Therefore, I recommend that within your Supabase project, each project has its own database, and no sub databases are utilized.

Right-click to restore.

![](../../assets/images/2025-08-28-10-12-10-image.webp)

Select the backup file you previously saved.

![](../../assets/images/2025-08-28-10-12-29-image.webp)

The process of recovery will inevitably lead to failure, but it is not a concern.

These errors are likely due to the fact that we’ve restored the database structure from a previous version. Specifically, the table structure has been re-established.

![](../../assets/images/2025-08-28-10-16-25-image.webp)

# Deploying Umami on Render.

Open the dashboard at [https://dashboard.render.com/].

Create a project, selecting **Web Services**.

Here’s the translation:  Select the “Exist Image” from the source code, and input the URL “`ghcr.io/umami-software/umami:postgresql-v2.19.0`”.  Consider using the latest version, which is `vx.xx.x`.

Configuration parameters must be specified.

| Key           | Value         |
|:-------------:|:-------------:|
| API Secret    | In previous environment variables     |
| Database type | PostgreSQL    |
| database URL  | In Supabase dashboard |

You can observe the value of **APP_SECRET** in the Umami case study from previous experiences.

![](../../assets/images/2025-08-28-10-25-05-image.webp)

Here’s the translation:  “The database URL can be found in Supabase.”

![](../../assets/images/2025-08-28-10-25-44-image.webp)

The `[YOUR-PASSWORD` setting can be reset in the Supabase database configuration.

Please note that Supabase only supports database password resets after they have been set up. Once the password reset is complete, you will no longer be able to view your database password.

Upon completion of configuration, deploy it; Render will assign you a web address.

![](../../assets/images/2025-08-28-10-29-02-image.webp)

Successfully accessed. Migration has been completed.

![](../../assets/images/2025-08-28-10-29-46-image.webp)

# Configuring EdgeOne CDN to support CORS requires the implementation of Cross-Origin Resource Sharing (CORS) policies. This allows web browsers to authorize requests from different domains, enhancing security and interoperability between applications.

Due to the lack of independent CORS settings for Umami, without enabling CORS, unauthorized users may be able to scrape your Umami data, leading to inaccurate statistics. This is detailed in [this article](/posts/you-is-me-huh/). We can leverage EdgeOne CDN to provide a simulated CORS implementation.

Using **source domain name** as **back-end host head** is sufficient.

![](../../assets/images/2025-08-28-10-32-09-image.webp)

Here’s a professional translation of “CORS configuration details”:  “CORS (Cross-Origin Resource Sharing) configuration details.”

![](../../assets/images/2025-08-28-10-32-32-image.webp)