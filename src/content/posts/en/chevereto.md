---
title: "Teach You to Set Up Chevereto, This Super Powerful Image Hosting Service!"
description: "Recommended by the station manager of BaoTa's Happy Edition is Chevereto, a picture hosting service. I just got a free virtual host, let's start tinkering!"
category: "Tutorial"
published: 2025-07-16
image: ../../assets/images/f31ca517-8f5b-4e53-af08-c32aabc224ab.webp
tags: [Chevereto, 图床]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide walks users through installing Chevereto 4.3.6 Pro on a website using PHP 8.1+ and MySQL 8.0+, detailing setup for Apache (auto-detects .htaccess) or Nginx (requires nginx.txt rules), required PHP extensions, and ISPManager-specific PHP settings. It also includes troubleshooting tips like enabling debug mode and checking PHP error logs, and provides a pre-built demo site for reference.
:::

# Video tutorial

[[X:content]]

# Formally begin

Resource: https://r2.2x.nz/chevereto_4.3.6-Pro_unlock.zip (Thank you, BaoTa Happy Edition!)

Create a website using **PHP 8.1.29 & MySQL 8.0.36**, then upload the ZIP file we just downloaded to the root directory of the site and extract it.

You will get this mess.

![](../../assets/images/dcb4d5ec-412f-4008-980b-b4f4ac1bc2d2.webp)

Branching point here! If you are Apache, do not change anything; it will automatically detect `.htaccess`. If you are Nginx, configure the pseudo-static rules in `nginx.txt`.

Then according to the original `tutorial.txt`

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

If you are using a virtual host just like the blogger, which is also ISPManager, set up PHP like this:

![](../../assets/images/e4bc4d2e-fc42-49bb-b161-92e86f0c6d12.webp)

Everything is ready; visit your site to proceed with the Chevereto installation wizard.

# Troubleshooting

If an issue occurs, please try logging into Chevereto with administrative privileges, then in Admin Settings -> System, enable debug mode. After this setting is applied, Chevereto will inform you specifically what went wrong when an error occurs.

![](../../assets/images/00c8ab83-d41c-4ca3-a14a-4a36f0f77b67.webp)

If I can't even access the system settings? Please analyze the issue by checking your PHP Error Log yourself.

# I have set up

https://chevereto.php.afo.im/upload

View all images after logging in:

https://chevereto.php.afo.im/explore/images