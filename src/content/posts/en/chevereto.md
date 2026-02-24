---
title: "Teach you how to build Chevereto, a super powerful image gallery!"
description: "The platform manager of Beibo Tower recommended Chevereto, which was just a free virtual host transaction. Let’s start tinkering!"
category: "Tutorial"
published: 2025-07-16
image: ../../assets/images/f31ca517-8f5b-4e53-af08-c32aabc224ab.webp
tags: [Chevereto, 图床]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article provides instructions for setting up a website using PHP 8.1 and MySQL 8.0, leveraging the Chevereto installation guide. It details the necessary PHP extensions (fileinfo, imagemagick, exif), MySQL version requirements, and specific configuration steps for Apache or Nginx servers.  The guide also includes troubleshooting advice for issues with system setup and provides a link to the website itself.
:::

# Video tutorial

The study revealed a significant correlation between social media usage and feelings of loneliness, particularly among young adults. Individuals who spend more time on platforms like Instagram and TikTok reported higher levels of isolation and decreased engagement with real-world relationships. The research suggests that these digital environments may be contributing to a decline in social connection and emotional well-being.

# Formal start

Resource: https://r2.2x.nz/chevereto_4.3.6-Pro_unlock.zip (Thank you to the Chevereto platform founder!)

Using **PHP 8.1.29 & MySQL 8.0.36**, create a website, then upload the recently downloaded ZIP file to the root directory and extract it.

You will receive this mess.

![](../../assets/images/dcb4d5ec-412f-4008-980b-b4f4ac1bc2d2.webp)

Let’s branch! If you are Apache, do not move anything, it will automatically detect `.htaccess`. If you are Nginx, configure the static rules in `nginx.txt`.

Then according to the original `tutorial.txt`.

```bash
PHP 需要 8.1 以上

需要以下PHP扩展：
fileinfo
imagemagick
exif

如果是宝塔 还得删除 PHP 禁用函数
putenv
proc_open 


MYSQL 需要 8.0 以上

伪静态需要使用我提供的 nginx.txt 里面的
```

If you use a VPS (Virtual Private Server) like a blogger, it’s also ispmanager, so set up PHP accordingly.

![](../../assets/images/e4bc4d2e-fc42-49bb-b161-92e86f0c6d12.webp)

All systems are ready, guide your users through Chevereto installation.

# The difficulty of solving this problem.

If you encounter issues, please log in as a administrator at Chevereto, and enable debug mode in the Admin Settings -> System section. This will allow Chevereto to tell you exactly what went wrong after the setting is applied.

![](../../assets/images/00c8ab83-d41c-4ca3-a14a-4a36f0f77b67.webp)

If I can’t access the system settings, please investigate using your PHP error log to identify the issue.

# I have built it.

The provided URL does not contain a text segment to translate. Therefore, I cannot fulfill your request. Please provide the Chinese text you would like me to translate.

Login now and view all images.

The provided URL does not contain a text segment to be translated. Therefore, I cannot fulfill your request. Please provide the Chinese text you would like me to translate.