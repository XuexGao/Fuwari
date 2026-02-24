---
title: "Bypassing USTC's Browser JS Verification"
description: "USTC uses JS verification when downloading certain resources. Is there a way to bypass it without using headless browsers..."
category: "Tutorial"
draft: false
image: ../../assets/images/58e8e41a-0755-4e6a-ab1e-a9dbaa1042d5.webp
lang: en
published: 2025-04-04
tags:
- USTC
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
USTC's mirror site blocks non-JS clients like wget by requiring a JavaScript-triggered cookie containing the user’s IP. This cookie can be manually set and sent with wget, but additional headers (like User-Agent) may be needed to bypass detection. The site’s security is based on client-side JS execution, not server-side checks, making it possible to bypass with proper headers and cookies.
:::

# Preface

When we go to download large files such as https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso, USTC will most likely show you a page like: Verifying your browser.

![](../../assets/images/58e8e41a-0755-4e6a-ab1e-a9dbaa1042d5.webp)

If you are using a browser, such as Chrome, FireFox, etc., you will be able to see the file starting to download in a few seconds.

However, if you are downloading such files using tools without JS capabilities, like wget, you will be rejected by the website server: **ERROR 403: Forbidden.**

```shell
~# wget https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
--2025-04-04 14:44:13--  https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
Resolving mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)... 2001:da8:d800:95::110, 202.141.176.110
Connecting to mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)|2001:da8:d800:95::110|:443... connected.
HTTP request sent, awaiting response... 403 Forbidden
2025-04-04 14:44:14 ERROR 403: Forbidden.
```

Previously, if I wanted to download such files, I would use my browser to download them, but today, when I complained to my friend about this, he told me he bypassed it.

So I decided to dig deeper, and then I found out it wasn't actually any JS validation at all!!!

# Analysis

Let's first open this type of link, then query the webpage source code

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

You will find that the code is actually very concise. If your browser supports JavaScript, the browser will write `addr=2409:8a30:320:6480:1c6e:aab8:b415:c4fa` into your cookie, then reload the page after two seconds. The website will then detect that you are carrying this cookie and allow you to download successfully. Conversely, if your browser does not support JavaScript, it will trigger a 403 error, preventing you from downloading.

So what exactly is this `addr=2409:8a30:320:6480:1c6e:aab8:b415:c4fa`?

We noticed that the webpage also displays the line: `Your IP address is 2409:8a30:320:6480:1c6e:aab8:b415:c4fa`. Clearly, the website is verifying your browser by checking whether you can use JavaScript to write your IP address into your cookie.

Then, thinking about it differently, if I just carry this cookie, can I bypass the JS verification?

Let's give it a try.

# Practical Combat

First, we use the default wget. 403

```shell
root@AcoFork-NAS:~# wget https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
--2025-04-04 14:55:00--  https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
Resolving mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)... 2001:da8:d800:95::110, 202.141.176.110
Connecting to mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)|2001:da8:d800:95::110|:443... connected.
HTTP request sent, awaiting response... 403 Forbidden
2025-04-04 14:55:00 ERROR 403: Forbidden.
```

Then let's carry the Cookie, but first we need to obtain the access IP that the website has acquired.

This is simple; we first use curl to obtain the webpage source code. We can see that the IP address we accessed is: `2409:8a30:320:6480::458`

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

Next, let's carry the cookie: `addr=2409:8a30:320:6480::458` and try wget again. Unfortunately, it still fails. After some thought, we might need to spoof the UA.

```shell
root@AcoFork-NAS:~# wget --header="Cookie: addr=2409:8a30:320:6480::458" \
     https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
--2025-04-04 14:57:58--  https://mirrors.ustc.edu.cn/debian-cd/12.10.0/amd64/iso-dvd/debian-12.10.0-amd64-DVD-1.iso
Resolving mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)... 2001:da8:d800:95::110, 202.141.176.110
Connecting to mirrors.ustc.edu.cn (mirrors.ustc.edu.cn)|2001:da8:d800:95::110|:443... connected.
HTTP request sent, awaiting response... 403 Forbidden
2025-04-04 14:57:58 ERROR 403: Forbidden.
```

Then, we carry the necessary cookies and forge a Chrome browser's UA. As can be seen, the download has been successfully completed.

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