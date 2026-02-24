---
title: "Umami Cloud Migration to Local Pitfalls Recording"
description: "Early on, I possessed a keen foresight regarding Umami. Initially, I developed it independently, but shortly after utilizing Umami Cloud for full-scale deployment, I encountered increased access requests and subsequently migrated to local infrastructure…"
published: 2025-12-05
image: ../../assets/images/umami-migration.webp
tags:
  - Umami
  - PostgreSQL
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article details the process of migrating Umami Cloud data to a local PostgreSQL database, utilizing a ZIP archive and various tools for data processing and management. It outlines the steps involved in accessing the data, creating CSV files, installing software, and finally initiating the import process.  The migration involves several crucial actions including setting up the new PostgreSQL version, installing a CSV editor, and configuring Umami’s web UI.  Data synchronization is handled through UUIDs, ensuring unique identifiers for each record.  A significant step is the removal of session IDs, followed by a careful data pairing process, with explicit control over the order of records before saving the CSV file. The article also includes SQL commands to manage the database schema and ensure data integrity.
:::

# Formal commencement.
First, we need to migrate data from the original Umami Cloud repository.

在 [Umami Cloud Data | Settings](https://cloud.umami.is/settings/data) 中，我们可以选择，导出数据（Export）
![](../../assets/images/umami-migration-1.webp)

当数据准备好后（几分钟左右），你的邮箱会收到一封Umami Cloud发来的邮件
![](../../assets/images/umami-migration-2.webp)

下载下来的文件是一个以UUID命名的ZIP压缩包，将其解压可以得到3个CSV文件
![](../../assets/images/umami-migration-3.webp)

Here’s the translation:  “The provided data is limited to the file named ‘website_event.csv’. The other two files contain only headers and do not include any data.”

We successfully obtained the old Umami data.

Next, we need to deploy Umami PostgreSQL version **latest** (currently version 3.x) (the deployment tutorial is slightly detailed).

We also need to install a CSV editing software: [SmoothCSV - The ultimate CSV editor for macOS & Windows](https://smoothcsv.com/)

In the local Umami platform, a new website will be created randomly for you, generating a UUID.

We need to install a graphical management tool for PostgreSQL on your terminal: [pgAdmin - PostgreSQL Tools](https://www.pgadmin.org/)

然后连上数据库，你将可以看到这些表
![](../../assets/images/umami-migration-4.webp)

接下来我们查看 `website` 这张表，将 `website_event.csv` 打开，查看旧的 `website_id` 将新的ID改为旧的，这样才能数据匹配
![](../../assets/images/umami-migration-5.webp)

![](../../assets/images/umami-migration-6.webp)

Next, we will formally initiate data import. Due to the data being imported, both fields have the `session_id` identifier, and this `session_id` is a unique constraint within the Umami self-management process. We must first remove this constraint before proceeding with the official launch, and then re-add it after the launch is complete (which will be explained later).

Please remove the primary key constraints and indexes.

```sql
ALTER TABLE session DROP CONSTRAINT session_pkey;
DROP INDEX session_session_id_key;
```

Next, we need to pair the data. We will begin by examining the CSV file named `website_event.csv`. It should only contain the header row and no data – as I have already imported it successfully, the tutorial is located after this point.

**注意顺序** 如： `event_id` `website_id` `session_id` ...

![](../../assets/images/umami-migration-7.webp)

编辑CSV文件，你需要将顺序配对，并且删除表中没有的列，如： `browser` `os` ...
![](../../assets/images/umami-migration-8.webp)

Ensure that the table headers in the database and the header row of the CSV file are aligned, with a consistent order. After this alignment, save the CSV file using Ctrl+S. Proceed with importing and enable the option for "**Title**" in the settings.

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

Here’s the translation:  “With this, the migration work is concluded.”