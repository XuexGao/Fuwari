---
title: "You really understand cross-domain browsers? COOP, COEP, CORP, CORS are what do they do?"
description: "Do you encounter the message “Due to Cross-Origin Request (CORS) restrictions, the request was blocked” or “200 Failed” while browsing or developing websites in your browser’s developer console? Today, we will explain the browser's cross-origin security model."
published: 2026-02-03
image: ../../assets/images/coxp.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Formal commencement.
If you have created a website (HTML), you’ll recognize that a webpage can provide content beyond its own, such as `hello world`, and also embed external resources like `image src="https://othersite.com/hello.webp"`.

Here’s the translation:  “On one hand, HTML allows for extensive resource citation, but this can also introduce complications.”

Here’s a professional translation:  “Let's consider the possibility of establishing a portfolio site featuring high-resolution images. With a significant volume of traffic, it’s conceivable that someone would be interested in creating a similar platform. This could be achieved by utilizing HTML as a shell to embed your brand and incorporate your own imagery directly into the website. The system would require minimal hosting – primarily text files – instead of managing actual image storage.”

We cannot allow him to do this. Therefore, we need to implement a mechanism that returns a **CORP Response Header** for images when they are being pulled, and sets its value to **same-site**. This will ensure that the browser blocks loading if the image URL is not associated with our domain.

![](../../assets/images/coxp-1.webp)

Here’s the translation:  This is a Cross-Origin Resource Policy (CROP), which governs the transfer of resources between different domains. It addresses the issue of whether or not certain resources can be accessed from outside the current origin.

|      Value       |                    Description: The table contains a list of items. Each item has a name and a description. The names are in bold, and the descriptions are in italics.                     |
| :----------: | :---------------------------------------: |
| Same origin  |        Source: Example.com Allow access only to this resource.        |
|  Same-site   | Same website. Only allowed `*.example.com` `example.com`. Retrieve resources. |
| Cross-origin |          Default value. Allows all sources, anyone can retrieve.           |

Okay, we have addressed the issue of inappropriate image usage. We now face a more complex challenge – another website that doesn’t offer media resources but relies on visitor IP addresses for access.

Here’s the translation:  “This website was originally intended for personal use. However, recent analysis revealed numerous unusual IP addresses in the backend logs. Through a thorough investigation, it was determined that the bottom of the site displays visitor IP addresses via F12. This indicates that the website you are accessing is your own.”

Upon reviewing the response headers received from the API, you discovered that you previously configured a `Access-Control-Allow-Origin: *` header to enable cross-origin requests and allow anyone to call your API and retrieve the response.

Subsequently, you will modify the value of that head to `yourwebsite.com` in this way, thereby restricting API calls to only your own website. Other users will still be blocked by the browser.

![](../../assets/images/coxp-4.webp)

Following this, you created a website and configured different CDN images for visitors in various regions. The goal is to inform users that the website utilizes a specific CDN across these regions.

Here’s the translation:  “Upon considering various response headers received from CDN providers, I observed a discrepancy in their values. Consequently, I implemented JavaScript to read these header values and subsequently re-write them on the page. However, the resulting page did not display, and the network request resulted in a 200 Failed status.”

Upon reflection, I realized this is a cross-domain issue. The CDN servers are different, and the primary domain for the blog is `blog.yoursite.com`, while the image CDN is `img.yoursite.com`. This will trigger a cross-origin request.

Despite having successfully configured the **Access-Control-Allow-Origin** header previously, your server only permits access to the response body.  You subsequently printed all response headers received via JavaScript, discovering that only the `Content-Type` and a few other non-essential headers are accessible. The JavaScript is unable to retrieve the **Server** header.

Finally, your code was successfully deployed across major CDN platforms, enabling the return of the following headers: `Access-Control-Expose-Headers: server`.  You persevered through considerable effort and achieved this milestone.

![](../../assets/images/coxp-2.webp)

As your website grows in size, you’re considering adding a traffic display module. However, due to the static nature of the site and your desire to avoid embedding backend code within a predominantly frontend project, you've come up with a solution: establishing Umami. Subsequently, you integrate tracking JavaScript into your website, and through client-side JavaScript, you retrieve data from Umami’s publicly accessible pages to determine website traffic.

Despite the public availability of Umami’s webpage, securing access is not a straightforward process. First, you must request an authorization token from the platform and then use that token to access the access volume endpoint. Finally, you will obtain the final access data.

However, this is not a significant challenge for you; it simply requires writing the complete logic in JavaScript and then encapsulating it as a function.

However, the application encountered issues during runtime. This is due to two different requests: one originating from `blog.yoursite.com`, and another from `umami.yoursite.com`. Because you correctly configured the `Access-Control-Allow-Origin` header, the first request was successfully sent and the JavaScript received the visitor token as expected.

The request is being blocked by the browser due to an issue with the “x-umami-share-token” header. This indicates a potential security measure preventing unauthorized sharing of the request.

Upon considering the matter, I’m pleased to say that we have implemented a policy allowing only access to the response body. However, the browser still requires an additional header, specifically an Access-Control-Allow-Headers directive, to be configured.

Following the configuration of the response header, you directly added `Access-Control-Allow-Headers: *`, and finally, your code functioned successfully and received the correct access rate.

![](../../assets/images/coxp-3.webp)

This refers to Cross-Origin Resource Sharing (CORS), which controls the ability of an application to request resources from a different domain. Specifically, it pertains to requests made by APIs that are not directly accessible from the origin server, and only allow for requests from specific authorized origins.

- Access-Control-Allow-Origin (Who can access resources across origins?) **Default, no one can**}]

|Value|Description: The table contains a list of items with their respective prices.|
|:-:|:-:|
|C:|Allowed resources (⚠️ Cannot be used simultaneously with Allow-Credentials: true)|
|C:https://example.com|Only authorized users can access resources.|
|C: null|Allowing origin: null (as `file://`, sandbox iframe)|
- Access-Control-Allow-Methods(Cross-Origin Request Policy (CORS) is disabled).

|Value|Description: The table contains a list of items with their corresponding prices.|
|:-:|:-:|
|Get request|Allowed GET requests|
|C:POST|Allow POST requests|
|C:PUT|Allow PUT requests|
|Delete|Allow deletion requests.|
|PATCH|Allow PATCH requests|
|C:OPTIONS|Allow pre-inspection requests|
|Request handling|Multiple methods, separated by commas.|

- Cross-Origin Resource Sharing (CORS) allows requests with headers that are allowed by the client. Specifically, it permits requests to be made from a different domain than the origin of the request. The MDN Web Documentation defines CORS as a mechanism for controlling which domains can access resources on behalf of a user’s browser.

|Value|Description: The table contains a list of items. Each item has a name and a description. The names are in bold, and the descriptions are in italics.|
|:-:|:-:|
|Content type|Allow carrying request headers.|
|Authorization|Permit carry valid identification.|
|C:Custom-Header|Allowed custom request headers|
|``|Allowing all request headers (supported in modern browsers, primarily for non-credential requests)|
- Access-Control-Allow-Credentials(Cross-Origin Request Restrictions (CORS)) – Does the Cross-Origin Request Policy (CORS) allow for the transmission of credentials? **Default Deny**

|Value|Description: The table contains a list of items with their corresponding prices.|
|:-:|:-:|
|True|Allow carrying identification documents (Cookies / Authorization / TLS client certificate)|
|(Not available)|The password cannot be carried.|

- Cross-Origin Resource Sharing (CORS) allows the server to access resources from a different domain. When accessing content from a different origin, the browser will typically only allow requests that are explicitly authorized by the server.  Specifically, the response headers containing CORS information can be accessed by the client. This is often used for security purposes to prevent malicious scripts from accessing sensitive data or functionality.

|        Value         |      Description: The table contains a list of items with their corresponding prices.       |
| :--------------: | :-----------: |
|  C:X-Request-Id  | Allow JavaScript to read the response header.  |
| C:Content-Length | Allow JavaScript to read content length.  |
|    C:X-A, X-B    | Multiple response headers (separated by commas) |
- Access-Control-Max-Age (preflight request result caching duration in seconds (seconds)?” **Default does not cache**

|    Value    |         Description: The table contains a list of items. Each item has a name and a quantity. The quantities are in thousands.         |
| :-----: | :----------------: |
|   C:0   |      No caching pre-scheduled requests.       |
|  C:600  |    Cache test results 10 minutes    |
| C:86400 | Cache 24 hours (browser limit) |

For **COOP** and **COEP**, they are utilized on the HTML page where **user is currently accessing**. These elements serve distinct purposes within that context.

-  Cross-Origin-Opener-Policy (COOP)

**COOP (Cross-Origin Opener Policy)** is a browser security mechanism designed to control the sharing of a single browser window context between different pages. It primarily affects the relationship between pages that open through `window.open()` and influences whether those pages can access each other.

Upon enabling COOP, the browser will isolate cross-origin pages based on a defined strategy, effectively preventing them from sharing execution environments. This isolation mitigates the risk of side-channel attacks such as Spectre, while also safeguarding against cross-site page hijacking or information disclosure via `window.opener`.

Coop focuses on the relationship between pages and their isolation from resources, such as images, scripts, or videos. It does not engage in the loading or validation of these resources.

| Value                          | Default | Behavior description           | Main impact                                       |
| -------------------------- | ---- | -------------- | ------------------------------------------ |
| unsafe-none              | Yes  | Disable isolation.        | Cross-origin page can share window context with `window.opener` |
| C:same-origin              | ❌ No support    | Only allowed within a single-source page sharing window with a process. | Cross-source window.opener was set to null, forcing process isolation.       |
| C:same-origin-allow-popups | ❌ No way.    | Self-isolation, but allows pop-up windows.   | Commonly used in OAuth/payment pop-up scenarios                         |

-  Cross-Origin-Embedder-Policy (COEP)

**Cross-Origin Embedder Policy (COEP)** is a security policy designed to restrict the loading and usage of cross-origin resources. When a page utilizes COEP, all embedded cross-origin resources must explicitly state "allow use," or the browser will block these resources from being consumed by the page.

The primary objective of COEP is to prevent page loading of untrusted cross-origin resources without user awareness, thereby mitigating attacks leveraging shared processes or memory. It commonly works in conjunction with resource declarations (such as CORS or Cross-Origin Resource Policies).

The Copie Protocol (CoP) does not prevent the browser from initiating network requests, but it will determine whether the resource can be used after its return.

|Value|Default|Behavior description|Main impact|
|---|---|---|---|
|unsafe-none|Yes|Disable embedding restrictions|Page can load any cross-origin resources.|
|C:require-corp|❌ No support|Authorized cross-source resources only.|Cross-origin resource sharing requirements must meet CORP or CORS.|

---

### When will the browser check COOP and COEP?

These headers, **Only checked when the page is loaded as a "document" (document)**, typically include:

- The top-level navigation menu can be accessed directly from the address bar.

- The document page loaded via iframe is displayed within the iframe itself.

- The window opened (`window.open()` opens a page).

For images, audio, video, scripts, and other non-document resources, the browser will not check their response headers for COOP or COEP tags. These resources, even returning a 200 OK status code, will not automatically grant cross-origin usage permissions.

Please note that…

- **COOP** is applied when creating or connecting a browsing context, determining whether windows and processes can be shared between pages.

- The embedding resource check is triggered when attempting to utilize embedded resources on the page. This functionality verifies whether the embedded resource meets the security requirements.

---

### The combined effect of COOP and COEP is significant.

When a page utilizes both COOP and COEP, and all embedded resources meet the corresponding requirements, the browser will treat that page as in a **Cross-Origin Isolated (COOP)** state.  During this state, the page can safely utilize high-permission Web APIs such as `SharedArrayBuffer` and high-precision timers.

# Here’s the translation:  Browser security models complete workflow diagram.

![](../../assets/images/coxp.svg)