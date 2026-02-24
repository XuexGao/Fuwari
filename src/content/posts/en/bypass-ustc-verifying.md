---
title: "Around the USTC browser JS verification bypass"
description: "When downloading resources, USTC utilizes JavaScript to validate them. Are there methods to bypass the browser’s headless mode without using a headless browser?"
category: "Tutorial"
draft: false
image: ../../assets/images/58e8e41a-0755-4e6a-ab1e-a9dbaa1042d5.webp
lang: en
published: 2025-04-04
tags:
- USTC
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Introduction

When downloading files similar to the one provided at [https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso], USTC is likely to present you with a similar error message: "Your browser's page is being verified."

![](../../assets/images/58e8e41a-0755-4e6a-ab1e-a9dbaa1042d5.webp)

If you are using a web browser, such as Chrome or Firefox, you will typically see the file download progress within a few seconds.

However, if you are using tools like wget that do not support JavaScript, you may be blocked by the website server. **ERROR 403: Forbidden.**

```shell
~# wget https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
--2025-04-04 14:44:13--  https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
Resolving mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)... 2001:da8:d800:95::110, 202.141.176.110
Connecting to mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)|2001:da8:d800:95::110|:443... connected.
HTTP request sent, awaiting response... 403 Forbidden
2025-04-04 14:44:14 ERROR 403: Forbidden.
```

In the past, whenever I needed to download these files, I would use a browser to download them. However, today when I was complaining to a friend about this, he told me he circumvented it.

I began to investigate further, and I discovered that it was actually nothing like JavaScript validation.

# 分析

Please first open these links and then query the webpage source code.

```html
		<h1>Verifying your browser</h1>
		<p>Additional verification is required for this file you requested.</p>
		<p>This page requires JavaScript. Please wait for a few seconds.</p>
		<div class="footer">
			<p>Your IP address is 2409:8a30:320:6480:1c6e:aab8:b415:c4fa</p>
		</div>
		<script>
			document.cookie = "addr=2409:8a30:320:6480:1c6e:aab8:b415:c4fa; max-age=300";
			setTimeout(function () {
				location.reload();
			}, 2000);
		</script>
```

You will discover that the code is remarkably concise and elegant. If your browser supports JavaScript, the browser will write the string `addr=2409:8a30:320:6480:1c6e:aab8:b415:c4fa` to your cookie, waiting for two seconds before reloading the page. Subsequently, the website will detect this cookie and allow you to successfully download it. Conversely, if your browser does not support JavaScript, it will trigger a 403 error, preventing the download.

What is this?

We noted that a message was displayed on the webpage indicating an IP address of 2409:8a30:320:6480:1c6e:aab8:b415:c4fa. This suggests that the website is verifying your browser's identity through JavaScript by sending your IP address to cookies.

Here’s a professional translation:  “If you consistently carry this cookie, you may bypass JavaScript validation.”

Let’s try it.

# Real-world experience.

First, we utilize the default wget command. The response indicates a 403 error.

```shell
root@AcoFork-NAS:~# wget https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
--2025-04-04 14:55:00--  https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
Resolving mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)... 2001:da8:d800:95::110, 202.141.176.110
Connecting to mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)|2001:da8:d800:95::110|:443... connected.
HTTP request sent, awaiting response... 403 Forbidden
2025-04-04 14:55:00 ERROR 403: Forbidden.
```

Let’s bring cookies on board, but first we need to obtain the IP address received from our website.

Here’s the translation:  “This is straightforward. We will obtain the webpage source code using curl and observe the IP address associated with our access, which is `2409:8a30:320:6480::458`”.

```html
root@AcoFork-NAS:~# curl https://mirrors.ustc.edu.cn/dbian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso                                                                 <!DOCTYPE html>
<html lang="en">
        <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>403 Forbidden</title>
                <style>
这里是无关紧要的CSS，省略
                </style>
        </head>
        <body>
                <h1>403 Forbidden</h1>
                <p>USTC Mirrors has denied your access due to one of the following reasons:</p>
                <p>1. This directory is not intended for web browsing.</p>
                <p>2. Your computer or network has exhibited suspicious activity.</p>
                <p>If you have any question, email us at lug (AT) ustc.edu.cn with your IP address.</p>
                <div class="footer">
                        <p>Your IP address is 2409:8a30:320:6480::458</p>
                </div>
        </body>
</html>
```

Let’s retrieve the cookies: `addr=2409:8a30:320:6480::458` again, and attempt a wget. However, we still encounter an error, and we are considering a possible workaround involving spoofing the UA.

```shell
root@AcoFork-NAS:~# wget --header="Cookie: addr=2409:8a30:320:6480::458" \
     https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
--2025-04-04 14:57:58--  https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
Resolving mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)... 2001:da8:d800:95::110, 202.141.176.110
Connecting to mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)|2001:da8:d800:95::110|:443... connected.
HTTP request sent, awaiting response... 403 Forbidden
2025-04-04 14:57:58 ERROR 403: Forbidden.
```

Following this, we’ve gathered the necessary cookies and are attempting to fabricate a Chrome browser’s UA profile. It appears that the process has been successful.

```shell
root@AcoFork-NAS:~# wget --header="Cookie: addr=2409:8a30:320:6480::458" \
     --user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/115.0" \
     "https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso"
--2025-04-04 14:59:24--  https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
Resolving mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)... 2001:da8:d800:95::110, 202.141.176.110
Connecting to mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)|2001:da8:d800:95::110|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 3994091520 (3.7G) [application/octet-stream]
Saving to: ‘debian-12.10.0-amd64-DVD-1.iso.2’

debian-12.10.0-amd64-DVD-1.iso.2-   5%[>                          ] 207.26M  72.9MB/s 
```

# 