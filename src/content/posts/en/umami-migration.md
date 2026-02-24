---
title: "Umami Cloud Migration to Local Pitfalls Recording"
description: "Early on, I possessed a keen foresight regarding Umami. Initially, I developed it independently, but subsequent to the expansion of Umami Cloud, I transitioned to utilizing it locally. However, recent access logs have increased significantly, necessitating a migration to a local environment…"
published: 2025-12-05
image: ../../assets/images/umami-migration.webp
tags:
  - Umami
  - PostgreSQL
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article details the process of migrating data from Umami Cloud to a PostgreSQL database within Umami Cloud Data, including exporting data, downloading ZIP files, installing CSV editors, and finally, importing the data. It outlines specific steps for each stage, utilizing tools like SmoothCSV and pgAdmin, and emphasizes crucial considerations for ensuring data integrity and preventing issues during the migration process.
:::

# Please provide the text you would like me to translate.
We need to migrate the data stored in the Umami Cloud.

在 [Umami Cloud Data | Settings](https://cloud.umami.is/settings/data) 中，我们可以选择，导出数据（Export）
![](../../assets/images/umami-migration-1.webp)

当数据准备好后（几分钟左右），你的邮箱会收到一封Umami Cloud发来的邮件
![](../../assets/images/umami-migration-2.webp)

下载下来的文件是一个以UUID命名的ZIP压缩包，将其解压可以得到3个CSV文件
![](../../assets/images/umami-migration-3.webp)

The website event data is available on the website.

The old Umami data is now available.

Here’s how to deploy Umami PostgreSQL version 3.x (currently at the latest release) locally:  **最新版** (Currently, the latest version is **最新版**) (Deployment tutorial is available here: **最新版** – see instructions for local deployment)

Install a CSV editor software: [SmoothCSV - The ultimate CSV editor for macOS & Windows](https://smoothcsv.com/)

In the local Umami, create a new website. Umami will randomly generate a UUID for you.

pgAdmin - PostgreSQL Tools

然后连上数据库，你将可以看到这些表
![](../../assets/images/umami-migration-4.webp)

接下来我们查看 `website` 这张表，将 `website_event.csv` 打开，查看旧的 `website_id` 将新的ID改为旧的，这样才能数据匹配
![](../../assets/images/umami-migration-5.webp)

![](../../assets/images/umami-migration-6.webp)

The session ID is a unique constraint. We need to remove this constraint before the official launch.

We can remove primary keys and indexes.

```sql
ALTER TABLE session DROP CONSTRAINT session_pkey;
DROP INDEX session_session_id_key;
```

The website event data is available in the CSV file named `website_event.csv`. It only contains the header row.

Please provide the text you would like me to translate.

![](../../assets/images/umami-migration-7.webp)

编辑CSV文件，你需要将顺序配对，并且删除表中没有的列，如： `browser` `os` ...
![](../../assets/images/umami-migration-8.webp)

Ensure that the table header order and the table header order in the CSV file are consistent, with no more than a few columns. Save the CSV file, and then select the option to import and check the box for **Title**.

![](../../assets/images/umami-migration-9.webp)

![](../../assets/images/umami-migration-10.webp)

![](../../assets/images/umami-migration-11.webp)
导入成功后如图
![](../../assets/images/umami-migration-12.webp)

![](../../assets/images/umami-migration-13.webp)

再编辑 `session` 这张表，手法同上，导入成功后如图
![](../../assets/images/umami-migration-14.webp)

接下来打开本地Umami的WebUI，查看数据是否有异常
![](../../assets/images/umami-migration-15.webp)

确保导入后数据无异常后，我们开始删除另一条 `session_id` 记录并回锁主键。否则上线后Umami将无法再向表中插入数据
```sql
SELECT session_id, COUNT(*) 
FROM public.session
GROUP BY session_id
HAVING COUNT(*) > 1;

-- 保留最早的 created_at
DELETE FROM public.session
WHERE ctid NOT IN (
    SELECT MIN(ctid)
    FROM public.session
    GROUP BY session_id
);

ALTER TABLE public.session
ADD CONSTRAINT session_id_unique UNIQUE (session_id);
```

The migration work has concluded.