---
title: "Pitfalls Encountered During the Migration of Umami Cloud to On-Premises"
description: "Early on, I had good foresight by self-hosting Umami, but soon afterward, due to wanting to fully migrate to the cloud, I switched back to Umami Cloud. However, now that access logs have surged, I’m forced to migrate back to a local setup..."
published: 2025-12-05
image: ../../assets/images/umami-migration.webp
tags:
  - Umami
  - PostgreSQL
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
To migrate Umami data from the cloud to a local PostgreSQL instance, export the data via the cloud settings, unzip the downloaded ZIP to access the `website_event.csv` file, and import it into the local database after aligning column orders and removing duplicate `session_id` entries. Use tools like SmoothCSV and pgAdmin to manage the CSV import and database schema, ensuring data integrity before re-enabling constraints. Finally, verify data accuracy in the Umami UI and clean up duplicate session records to restore data integrity for future operations.
:::

# Formally begin
First, to migrate, we must first obtain the data stored in the original Umami Cloud.

In [Umami Cloud Data | Settings](https://cloud.umami.is/settings/data), we can choose to export data (Export)
![](../../assets/images/umami-migration-1.webp)

Once the data is ready (in about a few minutes), you will receive an email from Umami Cloud.
![](../../assets/images/umami-migration-2.webp)

The downloaded file is a ZIP archive named with a UUID. Extracting it will yield three CSV files.
![](../../assets/images/umami-migration-3.webp)

Among them, only `website_event.csv` is useful; the other two files contain only headers and no data.

Thus, we successfully obtained the old Umami data.

Next, we need to deploy the local Umami PostgreSQL version **latest version** (currently version 3.x) (deployment tutorial omitted)

Then we also need to install a CSV editing software: [SmoothCSV - The ultimate CSV editor for macOS & Windows](https://smoothcsv.com/)

When creating a new site in local Umami, Umami will randomly generate a UUID for you.

Next, we need to install a graphical management tool for PostgreSQL on your terminal: [pgAdmin - PostgreSQL Tools](https://www.pgadmin.org/)

Then connect to the database, and you will see these tables.
![](../../assets/images/umami-migration-4.webp)

Next, we will examine the `website` table. Open `website_event.csv` and change the new IDs to the old `website_id` so that the data can match.
![](../../assets/images/umami-migration-5.webp)

![](../../assets/images/umami-migration-6.webp)

Next, we will officially begin the data import. Since the imported data contains two `session_id` fields, and during Umami's self-management process, this `session_id` field is **uniquely constrained**, we need to first remove this restriction. We will need to reapply this restriction before going live (this will be explained later).

Let's drop the primary key constraint and index.

```sql
ALTER TABLE session DROP CONSTRAINT session_pkey;
DROP INDEX session_session_id_key;
```

Next, we need to pair the data. Let's first examine the `website_event.csv` table. This should only contain headers with no actual data (I have it because I've already imported it; the tutorial was written afterward).

**Note the order** For example: `event_id` `website_id` `session_id` ...

![](../../assets/images/umami-migration-7.webp)

Edit the CSV file; you need to pair the columns in order and delete any columns not present in the table, such as: `browser` `os` ...
![](../../assets/images/umami-migration-8.webp)

Ensure that the column header order in the database matches exactly with the header order in the CSV file, with no extra or missing items. **Ctrl + S Save** the CSV file, then begin importing and check the **Headers** option.

![](../../assets/images/umami-migration-9.webp)

![](../../assets/images/umami-migration-10.webp)

![](../../assets/images/umami-migration-11.webp)
After successful import, as shown in the figure [[X:content]]
![](../../assets/images/umami-migration-12.webp)

![](../../assets/images/umami-migration-13.webp)

Edit the `session` table again, using the same method; after successful import, it will look as shown in the figure.
![](../../assets/images/umami-migration-14.webp)

Next, open the local Umami WebUI to check if there are any anomalies in the data.
![](../../assets/images/umami-migration-15.webp)

After ensuring that the imported data has no abnormalities, we begin deleting another `session_id` record and re-locking the primary key. Otherwise, after going live, Umami will no longer be able to insert data into the table.
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

By now, the migration work is complete.