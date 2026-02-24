---
title: "绕过USTC的浏览器JS验证"
description: "“When downloading resources, USTC utilizes JavaScript validation to bypass headless browsers. Are there methods that can be employed without relying on headless browser techniques?”"
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

# Here’s the translation:  “Introduction”

When downloading similar files to https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso, USTC is likely to provide you with a similar size file.

![](../../assets/images/58e8e41a-0755-4e6a-ab1e-a9dbaa1042d5.webp)

You can start downloading the file shortly.

However, if you are using tools like wget that do not support JavaScript, you may be blocked by the website server. **ERROR 403: Forbidden.**

```shell
~# wget https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
--2025-04-04 14:44:13--  https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
Resolving mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)... 2001:da8:d800:95::110, 202.141.176.110
Connecting to mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)|2001:da8:d800:95::110|:443... connected.
HTTP request sent, awaiting response... 403 Forbidden
2025-04-04 14:44:14 ERROR 403: Forbidden.
```

I’m frustrated that he bypassed the download process.

I’ve delved into this further and discovered that it wasn't actually anything related to JavaScript validation.

# Okay, please provide the text you would like me to translate. I will only output the translated text and adhere strictly to your instructions.

Please open these links and then query the webpage source code.

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

The code is remarkably concise and efficient. If your browser supports JavaScript, the browser will write the string `addr=2409:8a30:320:6480:1c6e:aab8:b415:c4fa` to your cookie, waiting for two seconds before reloading the page, and the website will then detect that you have this cookie and allow you to download it successfully. Conversely, if your browser does not support JavaScript, it will trigger a 403 error, preventing you from downloading.

So what is it?

Your IP address is 2409:8a30:320:6480:1c6e:aab8:b415:c4fa.

I can potentially bypass JavaScript validation if I consistently carry a cookie.

Let's try it.

# Please provide the text you would like me to translate.

First, we use the default wget. 403

```shell
root@AcoFork-NAS:~# wget https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
--2025-04-04 14:55:00--  https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
Resolving mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)... 2001:da8:d800:95::110, 202.141.176.110
Connecting to mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)|2001:da8:d800:95::110|:443... connected.
HTTP request sent, awaiting response... 403 Forbidden
2025-04-04 14:55:00 ERROR 403: Forbidden.
```

I need to obtain the website’s IP address first.

I will obtain the webpage source code using curl and then display the IP address. The access IP is `2409:8a30:320:6480::458`.

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

Cookie: addr = 2409:8a30:320:6480::458, again attempted wget. Unfortunately, it still fails to produce an error. Thinking about it, we may need to fabricate some UA.

```shell
root@AcoFork-NAS:~# wget --header="Cookie: addr=2409:8a30:320:6480::458" \
     https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
--2025-04-04 14:57:58--  https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
Resolving mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)... 2001:da8:d800:95::110, 202.141.176.110
Connecting to mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)|2001:da8:d800:95::110|:443... connected.
HTTP request sent, awaiting response... 403 Forbidden
2025-04-04 14:57:58 ERROR 403: Forbidden.
```

I have obtained necessary cookies and am attempting to fake a Chrome browser’s UA. It appears that the process has been successful.

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