---
title: "Record Breaking Lsky-Pro Bed Layout (Lsky-Pro)"
description: "The Lan-Ku-Tsu bed is a simple and user-friendly (yet somewhat rudimentary) image platform framework, capturing the activation process. It appears to have been activated without encryption… I will document this."
category: "Record"
published: 2025-08-19
image: '../../assets/images/2025-08-20-21-11-48-image.webp'
tags: [兰空图床]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

Please delete after download within 24 hours for learning and exchange purposes. Access details: https://lsky.2x.nz
Video tutorial: [https://www.bilibili.com/video/BV1UieUzQEvq/](https://www.bilibili.com/video/BV1UieUzQEvq/)

# Option One: Local Happy Edition (Recommended)

I recently discovered that the project I was assigned to is source code, and there’s no need for licensing or reverse engineering – it’s simply returned to true immediately.

## 安装包体

- http://r2.072103.xyz/2xnzlskypro223.zpaq 
- [OneDrive - 2xnzlskypro223.zpaq](https://acofork-my.sharepoint.com/:u:/g/personal/af_acofork_onmicrosoft_com/Eenhpe5Kt0RLopi_n6Ud-qMBh6fmDsXKaB8csLIVLu-FEQ?e=Z6QLGn)
- Password: 2xnz binary tree tree

Using [Bandizip Official Website - Free Compression Software Download (Windows)](https://www.bandisoft.com/bandizip/),] you can decompress files, and the old version does not support it.

## What did we do?

- During installation, regardless of whether the authorization key is entered as any value, it will immediately return true without requesting a server authorization.
- Version updates are no longer requested; the system automatically returns the current version as the latest.
- Unauthorized operations cannot proceed; all actions must be performed locally.

## Environmental configuration.

Please refer to the installation guide located at [https://docs.lsky.pro/guide/install](https://docs.lsky.pro/guide/install).

**Recommended Deployment of the Baota Panel** – utilizing a containerized PHP environment within 1Panel may present some challenges.

If you need to use a single-page application, I recommend using PHP 8.2. If you encounter status codes such as 500 or 404 errors, please resolve them yourself. The solution provided by fishcpy appears to require a special `fallback`. Thank you for the deployment tutorial provided by [AcoFork1panel -  - LINUX DO](https://linux.do/t/topic/882900).

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

Authorized key simply input and proceed.

![](../../assets/images/2025-08-22-04-21-45-8d13151d19e627bd9e614517aeb5dbe6.webp)

System upgrade is now active, and this is the final version.

![](../../assets/images/2025-08-22-04-22-19-image.webp)

Ultimately, the result is… [Final Result]

![](../../assets/images/2025-08-22-04-22-37-image.webp)

# Option Two: Manual Crackdown

If you wish to independently reverse engineer or obtain the latest version package, please refer to this approach.

Please note that obtaining new versions requires valid authorization keys, and without them, you will not receive the new package version.

## 下载包体

Pro Premium Edition package: [https://r2.072103.xyz/lp223.zpaq](https://r2.072103.xyz/lp223.zpaq) (Requires password: 2x.nz binary tree tree)

## Decryption of authorization keys.

First, configure your Linux system with an HTTP proxy pointing to Burp Suite (software-provided).

```bash
export http_proxy="http://127.0.0.1:8080"
export https_proxy="http://127.0.0.1:8080"
```

![](../../assets/images/a5fd2695975981d785cea1af5c0ee9588dc1b9ee.webp)

Burp primarily filters incoming requests, but does not monitor response times. It requires manual configuration to achieve this functionality.

![](../../assets/images/2690f8470df19d0c4a0f134835a7cbc95c9798fd.webp)

Enable filtering.

![](../../assets/images/52650c556acc9406923fb824823fe3a04e153d5d.webp)

When you follow the official installation guide to execute `./install.sh`,

Please provide your domain name and wildcard authorization key. You must enter your own domain for the image preview address to be accurate afterward. Simply fill in the wildcard authorization key.

![](../../assets/images/67b17d4c5f5d7ba8d2e2ee348d19bc01c6d42b1d.webp)

Please press return to begin a spin.

![](../../assets/images/fb540faa472d476e8d6b05a04d01be5a19adb236.webp)

Upon reviewing Burp, a new request was detected. The initial step involves confirming the action through the “Allow” option.

![](../../assets/images/8a6dd20b7ad55a9fdad795be358b8486b75de5b7.webp)

An error occurred, and the status code is 401.

![](../../assets/images/ce862cb4eeefc2a7a52bea44e4e6ab137a7cd3da.webp)

The response can be edited using the content from https://r2.072103.xyz/lsky_success_223.txt and then click 'confirm'.

![](../../assets/images/b8545b978629815aec471489890a0be62f0a8f89.webp)

Congratulations, you have been granted authorization.

![](../../assets/images/fdda3a54fd4a6da5d0c0c9d5ac0fbd5b79ef2b51.webp)

Upon completion of installation, the process remains unchanged.

![](../../assets/images/79f0f4645235e7cb3ecbe554cb13295bed326be5.webp)38dd52c6e.webp)

# Advanced: Building a Self-Hosted Authorization Server

Through Cloudflare Worker, you can establish your own authorization. A colleague provided code that allows for self-registration.

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

Upon completion of the self-built process, please update the address for the configuration file located within the ``config/app.php`` directory to your own credentials. No longer will you need to manually modify the response package each time it is installed.

```php
    /**
     * 服务接口地址
     */
    'service_api' => env('APP_SERVICE_API', 'https://huohuastudio.com'),
```