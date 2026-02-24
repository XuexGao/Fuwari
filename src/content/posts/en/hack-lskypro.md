---
title: "Recording the Crack of Lsky-Pro (Lsky-Pro)"
description: "LanKong Image Hosting is a simple and easy-to-use (?) image hosting framework. I took a packet capture of its activation process, and surprisingly, it's not encrypted... Recording this here."
category: "Record"
published: 2025-08-19
image: '../../assets/images/2025-08-20-21-11-48-image.webp'
tags: [兰空图床]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article provides two methods to bypass authorization for the Lsky Pro image hosting system: a pre-patched "happy version" that ignores authorization checks entirely, and a manual patching guide using Burp Suite to intercept and modify authorization responses. Both methods disable server-side validation, allowing local operation without a valid license key. An advanced section also shows how to self-host an authorization server using Cloudflare Workers.
:::

> For learning and exchange purposes only. Please delete after 24 hours of download. Experience link: https://lsky.2x.nz
> Video tutorial: https://www.bilibili.com/video/BV1UieUzQEvq/

# Option One: Local Happy Version (Recommended)

Suddenly realized that the project handed over to me was source code; what's the point of reverse-engineering the license? Just always return true~

## Install package body

- http://r2.072103.xyz/2xnzlskypro223.zpaq
- [OneDrive - 2xnzlskypro223.zpaq](https://acofork-my.sharepoint.com/:u:/g/personal/af_acofork_onmicrosoft_com/Eenhpe5Kt0RLopi_n6Ud-qMBh6fmDsXKaB8csLIVLu-FEQ?e=Z6QLGn)
- Password: 2xnz binary tree tree

zpaq can be extracted using [Bandizip official website - free compression software download (Windows)](https://www.bandisoft.com/bandizip/), older versions are not supported

## What have we done?

- During installation, regardless of the input authorization key, it directly returns true internally and no longer requests the authorization server.
- Version updates no longer request the authorization server and always return the current version as the latest version.
- All operations are executed locally without going through the authorization server.

## Environment Configuration

Refer to: https://docs.lsky.pro/guide/install

**Recommended to use BaoTa Panel for deployment**, 1Panel's containerized PHP seems to have some issues

If you insist on using 1Panel, it is recommended to use PHP 8.2. If you encounter issues such as 500 or 404 status codes, please resolve them yourself; it seems to require a special `fallback` setting. Thank you, fishcpy, for providing the solution! Here is his deployment tutorial: [AcoFork1panel -  - LINUX DO](https://linux.do/t/topic/882900)

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

## Installation Process

The authorization key can be filled in randomly and it will pass directly.

![](../../assets/images/2025-08-22-04-21-45-8d13151d19e627bd9e614517aeb5dbe6.webp)

System upgrade has been hooked, version locked

![](../../assets/images/2025-08-22-04-22-19-image.webp)

Final effect

![](../../assets/images/2025-08-22-04-22-37-image.webp)

# Option Two: Manual Patching

If you wish to break it down yourself or need to obtain the latest package, you can refer to this solution.

> Note. If you need to update to a new version, you still require a valid authorization key; otherwise, you will not be able to obtain the new package.

## Download package body

LanKong Image Hosting Pro Paid Package: https://r2.072103.xyz/lp223.zpaq (Extract password: 2x.nz Binary Tree Tree)

## Cracking authorization

First, configure an HTTP proxy for your Linux system, pointing to Burp Suite (the software will find it itself).

```bash
export http_proxy="http://127.0.0.1:8080"
export https_proxy="http://127.0.0.1:8080"
```

![](../../assets/images/a5fd2695975981d785cea1af5c0ee9588dc1b9ee.webp)

By default, Burp only intercepts requests and does not intercept responses; you need to manually configure this.

![](../../assets/images/2690f8470df19d0c4a0f134835a7cbc95c9798fd.webp)

Then enable interception

![](../../assets/images/52650c556acc9406923fb824823fe3a04e153d5d.webp)

When you go through the official tutorial to execute `./install.sh`

It will require you to input a domain name and authorization key. Enter your own domain name; otherwise, the preview URLs of uploaded images will be incorrect later! The authorization key can be filled in arbitrarily!

![](../../assets/images/67b17d4c5f5d7ba8d2e2ee348d19bc01c6d42b1d.webp)

Enter, will start spinning

![](../../assets/images/fb540faa472d476e8d6b05a04d01be5a19adb236.webp)

Check Burp and notice there's an additional request; first, click to allow it.

![](../../assets/images/8a6dd20b7ad55a9fdad795be358b8486b75de5b7.webp)

A response has now appeared, with a status code of 401

![](../../assets/images/ce862cb4eeefc2a7a52bea44e4e6ab137a7cd3da.webp)

The response block is editable; replace the original response with the content from https://r2.072103.xyz/lsky_success_223.txt. Then click Allow

![](../../assets/images/b8545b978629815aec471489890a0be62f0a8f89.webp)

Congratulations, you have been authorized.

![](../../assets/images/fdda3a54fd4a6da5d0c0c9d5ac0fbd5b79ef2b51.webp)

It's the same after installation as well.

![](../../assets/images/79f0f4645235e7cb3ecbe554cb13295bed326be5.webp)38dd52c6e.webp)

# Advanced: Building Your Own Authorization Server

Authorization can be self-built via Cloudflare Worker. Thank you to an anonymous friend who provided the code.

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

After self-configuration is completed, change `config/app.php` to your own `service interface address`. You will no longer need to manually modify the response package each time you install.

```php
    /**
     * 服务接口地址
     */
    'service_api' => env('APP_SERVICE_API', 'https://huohuastudio.com'),
```