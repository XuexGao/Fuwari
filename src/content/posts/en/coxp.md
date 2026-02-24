---
title: "Do You Really Understand Browser Cross-Origin? What Do COOP, COEP, CORP, and CORS Manage?"
description: "Have you ever seen messages like “Cross-origin XXX blocked loading XXX” or “200 Failed” in the browser console while browsing or developing websites? Today, let’s understand the browser’s cross-origin security model."
published: 2026-02-03
image: ../../assets/images/coxp.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article explains the differences and use cases of CORP (Cross-Origin Resource Policy) and CORS (Cross-Origin Resource Sharing), focusing on how to control resource access and API cross-origin behavior. CORP blocks unauthorized resource loading via HTTP headers like `Cross-Origin-Resource-Policy`, while CORS manages API access with headers like `Access-Control-Allow-Origin`, `Access-Control-Allow-Methods`, and others. Real-world examples show how misconfigurations can lead to security or functionality issues, and how proper header settings resolve them.
:::

# Formally begin
If you have created a website (HTML), you will know that a web page, besides providing its own content, such as `<p>hello world</p>`, can also **embed external resources**, such as `<img src="https://othersite.com/hello.webp">`

On one hand, HTML allows us to freely reference resources; on the other hand, this can also cause some issues.

Let’s imagine this: you have a stock image site filled with high-resolution pictures, and it receives a lot of traffic. At this point, someone else might envy your setup and decide to create a similar site. They could simply build a basic HTML shell, change the branding to their own, and then link directly to your images. In this way, they would only need to host a minimal amount of text files (the HTML shell), without having to host the actual images.

We definitely can't let that happen, so what should we do? We need to make sure our images return a **CORP response header** with the value **same-site** when pulled. This way, as long as the source isn't your domain writing `<img>`, the browser will block loading entirely.

![](../../assets/images/coxp-1.webp)

This is **CORP（Cross-Origin Resource Policy） - Cross-Origin Resource Policy**, which governs **whether resources are allowed to be used**.

|      Value       |                    Description                     |
| :----------: | :---------------------------------------: |
| same-origin  |        Same origin. Only allows `example.com` to fetch corresponding resources        |
|  same-site   | Same station. Only allows `*.example.com` `example.com` to pull resources |
| cross-origin |          Default. Allows all sources; anyone can pull.           |

Good, we've resolved the issue of image misuse. Next comes a more challenging task: we have another website, but it doesn't provide media resources; instead, it retrieves the visitor's IP when accessed.

This was originally just a website for your personal use, but you noticed that the backend logs recently show a lot of strange IPs. After some investigation, you discovered that a website displays visitor IPs at the bottom. By checking the network requests via F12, you found that this is indeed requesting your website!

Then you checked the response headers returned by this API and found that you previously set `Access-Control-Allow-Origin: *` for easier cross-domain calls; this header allows anyone to invoke your API and retrieve the response.

Then, you changed the value of that header to `yoursite.com`, allowing only your own website to call this API. Calls from others will still be blocked by the browser.

![](../../assets/images/coxp-4.webp)

Then, you created a website and configured different CDN image hosts for visitors accessing from various regions. You want the website to inform users which CDN you are using.

Then you had a sudden idea: since the values of the **Server** response headers returned by various CDNs are different, you wrote a bit of JS to read the response headers and write them back to the page. However, you found that the page did not display anything, and the network request showed a strange status **200 Failed**.

So you thought about it for a moment, oh! Right! Since it's a different CDN image host, and the main site domain is `blog.yoursite.com`, while the image host domain is `img.yoursite.com`, it will trigger a cross-domain issue!

Although you have correctly set the **Access-Control-Allow-Origin** header based on the previous lesson, from the browser's perspective, you have only allowed others to read my response body, without specifying the response body. After you printed out all the response headers obtained by JS, you found that only a few unrelated headers like `Content-Type` were visible, and JS could not see the **Server** header at all.

Then you go through great trouble, finally configuring the return of `Access-Control-Expose-Headers: server` on all major CDNs, and then your code finally works!

![](../../assets/images/coxp-2.webp)

Next, as your website grows larger, you want to add a visitor count display module. However, since your website is static, you don’t want to insert backend code into a project full of frontend code. So you cleverly decide to set up another service, Umami, and embed its tracking JS into your website. Then, you use client-side JS to fetch the public page from Umami to retrieve the visitor count.

Although Umami's public page is accessible, it is not possible to succeed with a single request. First, you need to request an endpoint to obtain a visitor token, then use this visitor token to access Umami's visit endpoint to retrieve the final visit count.

But this is not difficult for you; you just need to write the entire logic in JS and then wrap it into a function.

But when it actually ran, problems arose again. Since one is `blog.yoursite.com` and the other is `umami.yoursite.com`, and because you correctly configured the **Access-Control-Allow-Origin response header**, the first request succeeded, and the JS received the visitor token as expected.

The issue lies in the second request—you find that your request has once again been intercepted by the browser, displaying **Request header: x-umami-share-token is not allowed by the remote party**

You thought about it, oh! Although we have configured the **Access-Control-Allow-Origin response header**, it only allows access to the response body; the browser requires that, for **request headers**, we also configure another **Access-Control-Allow-Headers response header** in Umami.

Next, you configured the response header; for convenience, you directly wrote `Access-Control-Allow-Headers: *`. Finally, your code worked successfully and you obtained the correct traffic volume.

![](../../assets/images/coxp-3.webp)

This is **CORS（Cross-Origin Resource Sharing）- Cross-Origin Resource Sharing**, which governs **whether an API allows being called and to whom**.

- Access-Control-Allow-Origin (Who can access resources across domains? **By default, no one can**)

|Value|Description|
|:-:|:-:|
|`*`|Allows access to the resource from **any source** (⚠️ Cannot be used simultaneously with `Allow-Credentials: true`)|
|`https://example.com`|Only **specified sources** are allowed to access the resource|
|`null`|Allow `Origin: null` (e.g., `file://`, sandboxed iframe)|
- Access-Control-Allow-Methods (Cross-domain access allowed request methods? **Default is not allowed**)

|Value|Description|
|:-:|:-:|
|`GET`|Allow GET requests|
|`POST`|Allow POST requests|
|`PUT`|Allow PUT requests|
|`DELETE`|Allow DELETE requests|
|`PATCH`|Allow PATCH requests|
|`OPTIONS`|Allow preflight requests|
|`GET, POST, OPTIONS`|Allow multiple methods (comma-separated)|

- Access-Control-Allow-Headers (Headers allowed in cross-origin requests? **Default only allows headers listed in the CORS whitelist - MDN Web Documentation terminology: Definitions of web-related terms | MDN**)

|Value|Description|
|:-:|:-:|
|Content-Type|Allow carrying the `Content-Type` request header|
|`Authorization`|Allow Authentication Header|
|C:X-Custom-Header|Allow specified custom request headers|
|`*`|Allow **All request headers** (supported by modern browsers, primarily for non-credential requests)|
- Access-Control-Allow-Credentials (whether cross-domain access is allowed to include credentials? **default is not allowed**)

|Value|Description|
|:-:|:-:|
|`true`|Allow carrying credentials (Cookie / Authorization / TLS client cert)|
|(Not returned)|**Default** Credentials not allowed|

- Access-Control-Expose-Headers (Headers that can be read during cross-origin access? **By default, only headers listed in the CORS whitelist can be read - MDN Web Documentation terminology: Definitions of web-related terms | MDN**)

|        Value         |      Description       |
| :--------------: | :-----------: |
|  X-Request-Id  | Allow JS to read this response header  |
| Content-Length | Allow JS to read content length  |
|    `X-A, X-B`    | Expose multiple response headers (comma-separated) |
- Access-Control-Max-Age (How long to cache the result of a preflight request during cross-domain access (in seconds)? **Default is not cached** )

|    Value    |         Description         |
| :-----: | :----------------: |
|   `0`   |      Do not cache preflight requests       |
|  `600`  |    Pre-check result cache for 10 minutes    |
| `86400` | Cached for 24 hours (browser may have limits) |

As for **COOP and COEP**, they are both applied to **the HTML that the user is currently accessing**, respectively for the following scenarios

-  Cross-Origin-Opener-Policy (COOP)

**COOP（Cross-Origin Opener Policy）** is a browser security mechanism used to control whether **different pages can share the same browsing context (browsing context) ** across origins. It primarily affects the relationship between a page and other pages opened via `window.open()`, as well as whether these pages can access each other through `window.opener`.

When the page enables COOP, the browser forcibly isolates cross-origin pages into different browser processes according to the policy, preventing them from sharing an execution environment. This isolation can effectively reduce the risk of side-channel attacks (such as Spectre) and prevent cross-site pages from being hijacked or leaking information via `window.opener`.

COOP focuses on **the isolation relationship between pages** and does not participate in the loading or validation of resources (such as images, scripts, videos).

| Value                          | Is it default | Behavior Description           | Main Impact                                       |
| -------------------------- | ---- | -------------- | ------------------------------------------ |
| `unsafe-none`              | Yes  | No isolation enabled        | Cross-origin pages can share browsing context with `window.opener` |
| Same-origin              | ❌    | Only same-origin pages are allowed to share windows and processes | Cross-origin `window.opener` is set to `null`, enforcing process isolation       |
| `same-origin-allow-popups` | ❌    | Self-isolate but allow popups   | Commonly used in OAuth/payment popup scenarios                         |

-  Cross-Origin-Embedder-Policy (COEP)

**COEP（Cross-Origin Embedder Policy）** is a security policy used to restrict how pages **how to load and use cross-origin resources** handle cross-origin resources. When a page enables COEP, all embedded cross-origin resources must explicitly indicate "permission to be used"; otherwise, the browser will block the page from consuming these resources.

The core goal of COEP is to ensure that pages do not load untrusted cross-origin resources without explicit consent, thereby preventing attacks that exploit shared processes or shared memory. It is typically used in conjunction with resource-side declarations such as CORS or Cross-Origin-Resource-Policy.

COEP does not prevent the browser from initiating network requests, but it decides whether the resource can be used by the page after the resource is returned.

|Value|Is it default|Behavior Description|Main Impact|
|---|---|---|---|
|`unsafe-none`|Yes|Do not enable embedding restrictions|The page can load any cross-origin resource|
|`require-corp`|❌|Only cross-origin resources explicitly authorized are allowed|Cross-origin resources must satisfy CORP or CORS|

---

### When will the browser check COOP and COEP?

These two headers **are only checked by the browser when the page is loaded as a "document"** typically include:

- Top-level page navigation (open pages directly from the address bar)

- The document page loaded within the iframe

- Popup window (page opened by `window.open()`)

For images, audio, video, scripts, and other **non-document resources**, browsers will not inspect the COOP or COEP headers in their responses; even if these resources return a 200 OK, they will not automatically gain cross-origin usage permissions as a result.

It should be noted that:

- **COOP** takes effect when creating or connecting browsing contexts on a page, determining whether windows and processes can be shared between pages.

- **COEP** takes effect when a page attempts to use embedded resources, used to determine whether cross-origin resources meet security requirements.

---

### The combined effect of COOP and COEP

When a page has both COOP and COEP enabled, and all embedded resources meet their respective requirements, the browser will treat the page as **cross-origin isolated**. In this state, the page can safely use certain high-privilege Web APIs, such as `SharedArrayBuffer` and high-precision timers.

# Browser Security Model Complete Flowchart

![](../../assets/images/coxp.svg)