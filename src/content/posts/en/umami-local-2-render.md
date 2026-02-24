---
title: "Migrating Umami from Local to Cloud"
description: "The previous site statistics deployment was hosted on my home cloud NAS via IPv6 backsource, but now I have migrated it to Render + Supabase."
category: "Record"
published: 2025-08-28
image: '../../assets/images/2025-08-28-10-01-43-image.webp'
tags: [Umami]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
The article explains how to backup a local PostgreSQL database using pgAdmin4, restore it to a Supabase cloud database, deploy Umami on Render using the restored data, and configure EdgeOne CDN to handle CORS issues indirectly. It includes step-by-step screenshots and notes on handling errors during restoration and securing the Umami instance.
:::

> Rolled back

# Backup local database

Install **pgAdmin4** on any machine

Connect to a local PostgreSQL instance

![](../../assets/images/2025-08-28-10-03-34-image.webp)

Right-click the database you need to back up, and click **Backup**

![](../../assets/images/2025-08-28-10-03-58-image.webp)

Fill in **filename** to create a backup. The backup file will be retained on **pgAdmin4**.

![](../../assets/images/2025-08-28-10-04-44-image.webp)

# Restore backup to cloud database

> The free plan offers 500MB of free database space, which is more than sufficient.
> 
> ![](../../assets/images/2025-08-28-10-06-39-2dfd6b861774ca0b05d460fc19bfccb1.webp)

Enter https://supabase.com/

Create a new project

Find the connection parameters (top-left Connect)

![](../../assets/images/2025-08-28-10-07-41-image.webp)

In **pgAdmin4**, connect to the Supabase database

![](../../assets/images/2025-08-28-10-10-00-image.webp)

> Notably, locally we can create multiple sub-databases within PostgreSQL. However, in Supabase, each project corresponds to its own dedicated **postgres** database. Of course, you can fully use **pgAdmin4** to create new sub-databases, but they will not be visible in the Supabase dashboard. Therefore, I recommend that within a Supabase project, one project corresponds to one database, and avoid using sub-databases.

Right-click to restore

![](../../assets/images/2025-08-28-10-12-10-image.webp)

Select the database file that was backed up

![](../../assets/images/2025-08-28-10-12-29-image.webp)

To perform the rollback, failure is inevitable **failure**, but ignore it.

[[These error messages are basically about not finding users from the previous database, although the table structure has already been restored]]

![](../../assets/images/2025-08-28-10-16-25-image.webp)

# Deploy Umami on Render

Open https://dashboard.render.com/

Create a project and select **Web Services**

**Source Code** Select **Exist Image**, and input `ghcr.io/umami-software/umami:postgresql-v2.19.0` *It is best to choose the latest version, i.e., the `vx.xx.x* field`

Configure the required environment variables

| Key           | Value         |
|:-------------:|:-------------:|
| APP_SECRET    | In the previous environment variables     |
| DATABASE_TYPE | PostgreSQL    |
| DATABASE_URL  | In the Supabase dashboard |

You can see the value of **APP_SECRET** in the former Umami instance

![](../../assets/images/2025-08-28-10-25-05-image.webp)

And **DATABASE_URL** can be seen in Supabase.

![](../../assets/images/2025-08-28-10-25-44-image.webp)

The `[YOUR-PASSWORD` can be reset in the Supabase database settings.

*Note that Supabase only supports resetting the database password, and once set, the password cannot be viewed again. Please keep your database password secure.*

After configuration is complete, deploy it; Render will assign you a web address.

![](../../assets/images/2025-08-28-10-29-02-image.webp)

Try accessing it; it should have been migrated successfully.

![](../../assets/images/2025-08-28-10-29-46-image.webp)

# Configure EdgeOne CDN to indirectly support CORS configuration

> Since Umami does not have an independent CORS configuration, if CORS is not set, others can arbitrarily access your Umami, leading to inaccurate statistics. See [](/posts/you-is-me-huh/). We can connect to EdgeOne CDN to indirectly support CORS.

Use **source domain** as the **backsource HOST header**.

![](../../assets/images/2025-08-28-10-32-09-image.webp)

CORS Configuration Details

![](../../assets/images/2025-08-28-10-32-32-image.webp)