---
title: "Record Breaking Lsky-Pro Bed Layout (Lsky-Pro)"
description: "The Lan-Empty Bed is a streamlined and user-friendly (yet surprisingly) image repository framework, capturing the activation process. It appears to be operating without encryption – I will document this."
category: "Record"
published: 2025-08-19
image: '../../assets/images/2025-08-20-21-11-48-image.webp'
tags: [兰空图床]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

Only for learning and communication, please delete within 24 hours of download. Experience address: https://lsky.2x.nz
Video tutorial: https://www.bilibili.com/video/BV1UieUzQEvq/

# Local Happy Edition (Recommended)

Suddenly discovered that the project I received was source code, so there’s no need for reverse authorization – it’s just directly returning true, wouldn't you know?

## Installation package

- The provided URL is a file named `2xnzlskypro223.zpaq`. It appears to be a compressed archive, likely containing data related to a specific software or system. Without further context about its purpose, it’s impossible to provide a definitive translation. However, based on the filename and general context of such files, it's highly probable that this is a configuration file for a program or service. It might contain settings, parameters, or metadata related to the application's operation.
- OneDrive - 2xnzlskypro223.zpaq
- ``` Binary Tree Structure ```

You can use Bandizip Official Website – Free Compression Software Download (Windows) to decompress it. It is no longer supported.

## What did we do?

- During installation, regardless of whether the authorization key is any value, it will directly return true without requesting a server authorization.
- The version has been updated.
- All operations will be performed locally.

## Environment configuration

自行参考： https://docs.lsky.pro/guide/install

Recommend using the Baota panel deployment for containerized PHP applications.

If you’re using 1Panel, consider using PHP8.2 for better performance and handling of 500, 404 errors.  The issue seems to require a special `fallback` setting. Thank you to fishcpy for his deployment tutorial: [AcoFork的兰空图床开心版1panel部署教程 - 福利羊毛 - LINUX DO](https://linux.do/t/topic/882900).

```nginx
    # 全局 404 交给 @fallback 处理，不强制状态码
    error_page 404 @fallback;

    location / {
        try_files $uri $uri/ @fallback;
    }

    # 命名 location：交给 index.php，但不强制 200
    location @fallback {
        rewrite ^ /index.php last;
    }

    # -----------------------------
    # 特殊路径：/api/v2/ 也走 index.php，但不能强制 200
    # -----------------------------
    location ^~ /api/v2/ {
        # 同样使用 @fallback，不强制状态码
        try_files $uri $uri/ @fallback;
    }
```

## Installation process

Okay, please provide the text you would like me to translate. I’m ready when you are.

![](../../assets/images/2025-08-22-04-21-45-8d13151d19e627bd9e614517aeb5dbe6.webp)

System upgrade has been activated, and the final version is deployed.

![](../../assets/images/2025-08-22-04-22-19-image.webp)

Okay, please provide the text you would like me to translate. I’m ready when you are.

![](../../assets/images/2025-08-22-04-22-37-image.webp)

# Manual decryption

If you wish to attempt a self-extraction or obtain the latest package body, refer to this solution.

Please note that if a new version is required, you will need valid authorization keys, otherwise you will not be able to obtain the new package body.

## Please provide the text you would like me to translate! I need the content to be translated.

兰空图床Pro付费版包： https://r2.072103.xyz/lp223.zpaq (解压密码：2x.nz二叉树树)

## The decryption process requires a secure key and proper authorization protocols.

First, configure a Linux proxy for Burp Suite (software-only).

```bash
export http_proxy="http://127.0.0.1:8080"
export https_proxy="http://127.0.0.1:8080"
```

![](../../assets/images/a5fd2695975981d785cea1af5c0ee9588dc1b9ee.webp)

Default Burp only intercepts requests, not responses; it requires manual configuration.

![](../../assets/images/2690f8470df19d0c4a0f134835a7cbc95c9798fd.webp)

Okay, please provide the text you would like me to translate. I’m ready when you are.

![](../../assets/images/52650c556acc9406923fb824823fe3a04e153d5d.webp)

You can access the official tutorial by running `./install.sh`.

Please provide your own domain name and authorization key. Otherwise, the preview address of the images will be incorrect after uploading. Just fill it in!

![](../../assets/images/67b17d4c5f5d7ba8d2e2ee348d19bc01c6d42b1d.webp)

Back to the drawing board.

![](../../assets/images/fb540faa472d476e8d6b05a04d01be5a19adb236.webp)

Checked Burp and found a new request: click confirm.

![](../../assets/images/8a6dd20b7ad55a9fdad795be358b8486b75de5b7.webp)

```text Unauthorized request. ```

![](../../assets/images/ce862cb4eeefc2a7a52bea44e4e6ab137a7cd3da.webp)

The response is editable, using content from https://r2.072103.xyz/lsky_success_223.txt and click confirm.

![](../../assets/images/b8545b978629815aec471489890a0be62f0a8f89.webp)

Congratulations, you have been authorized.

![](../../assets/images/fdda3a54fd4a6da5d0c0c9d5ac0fbd5b79ef2b51.webp)

Installation complete, just as before.

![](../../assets/images/79f0f4645235e7cb3ecbe554cb13295bed326be5.webp)38dd52c6e.webp)

# Advanced Authorization Server Construction

You can obtain Cloudflare Worker self-registration through a collaborator who didn’t want to disclose their name.

```js
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const jsonContent = `[{"logo":"products\\/lsky-pro.webp","name":"V 2.2.3","version":"2.2.3","changelog":"### \\u4f18\\u5316\\n- \\u6539\\u8fdb\\u76f8\\u518c\\u5217\\u8868\\u6837\\u5f0f\\n\\n### \\u4fee\\u590d\\n- \\u4fee\\u590d\\u4f7f\\u7528\\u624b\\u673a\\u53f7\\u6ce8\\u518c\\u8d26\\u53f7\\u8981\\u6c42\\u8f93\\u5165\\u90ae\\u7bb1\\u7684 bug\\n- \\u4fee\\u590d\\u72ec\\u7acb\\u9875\\u9762 title \\u663e\\u793a\\u4e0d\\u6b63\\u786e\\u7684 bug","pushed_at":"2025-07-29","milestone":"stable","download_url":"https:\\/\\/dl.huohuastudio.com\\/packages\\/products\\/lsky-pro\\/2.2.3.zip?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=d8vF9cr3Wmbu8qHMD3W1%2F20250818%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250818T141321Z&X-Amz-SignedHeaders=host&X-Amz-Expires=1800&X-Amz-Signature=40682060b50fa3ee0f520f78418e5f0754277e14e4794f5e283ab4149a6028eb"},{"logo":"products\\/lsky-pro.webp","name":"V 2.2.2","version":"2.2.2","changelog":"### \\u65b0\\u589e\\n- \\u540e\\u53f0\\u7ba1\\u7406\\u5217\\u8868\\u589e\\u52a0\\u8fc7\\u6ee4\\u5668\\n- \\u652f\\u6301\\u8bbe\\u7f6e\\u9ed8\\u8ba4\\u4e0a\\u4f20\\u50a8\\u5b58\\n- \\u652f\\u6301\\u6279\\u91cf\\u590d\\u5236\\u94fe\\u63a5\\n- \\u652f\\u6301\\u63a7\\u5236\\u5e7f\\u573a\\u662f\\u5426\\u5c55\\u793a\\n\\n### \\u4f18\\u5316\\n- \\u6539\\u8fdb\\u6837\\u5f0f\\n- \\u7f51\\u9875 title \\u6839\\u636e\\u5f53\\u524d\\u83dc\\u5355\\u663e\\u793a\\n- \\u4eea\\u8868\\u76d8\\u589e\\u52a0\\u7edf\\u8ba1\\u5361\\u7247\\n- \\u6539\\u8fdb\\u5e7f\\u573a\\u7684\\u56fe\\u7247\\u5217\\u8868\\u663e\\u793a\\n\\n### \\u4fee\\u590d\\n- \\u4fee\\u590d\\u4f7f\\u7528 libvips \\u9a71\\u52a8\\u65f6\\u4e91\\u5904\\u7406\\u8f93\\u51fa\\u56fe\\u7247\\u8fd8\\u662f\\u4f7f\\u7528 imagick \\u5904\\u7406\\u7684 bug\\n- \\u4fee\\u590d\\u56fe\\u7247\\u5904\\u7406\\u4e2d\\u6c34\\u5370\\u9009\\u62e9\\u5e73\\u53f0\\u540e\\u4fdd\\u5b58\\u63d0\\u793a\\u9700\\u8981\\u9009\\u62e9\\u6c34\\u5370\\u4f4d\\u7f6e\\u7684 bug\\n- \\u4fee\\u590d\\u5220\\...

  const headers = new Headers({
    'Content-Type': 'application/json',
    'Content-Length': '30872',
    'Strict-Transport-Security': 'max-age=31536000',
    'Alt-Svc': 'h3=":443"; ma=86400',
    'Vary': 'Accept-Encoding',
    'Cache-Control': 'max-age=0, must-revalidate, no-cache, no-store, private',
    'Pragma': 'no-cache',
    'Expires': 'Fri, 01 Jan 1990 00:00:00 GMT',
    'Access-Control-Allow-Origin': '*',
    'X-Cache': 'MISS',
    'Server': 'WAFPRO'
  });

  // 使用当前日期作为响应日期
  const currentDate = new Date().toUTCString();
  headers.set('Date', currentDate);

  return new Response(jsonContent, {
    status: 200,
    statusText: 'OK',
    headers: headers
  });
}
```

After the self-build is complete, please update the service interface address within `config/app.php`(config/app.php) to your own address.

```php
    /**
     * 服务接口地址
     */
    'service_api' => env('APP_SERVICE_API', 'https://huohuastudio.com'),
```