---
title: "NAT1 Open Internal Website"
description: "Leveraging CF dynamic redirection, utilizing STUN+Lucky WebHook for real-time updates of the STUN port enables NAT1 to support a wide range of bandwidth expansion."
category: "Tutorial"
published: 2025-05-31
image: ../../assets/images/0aa77bad-482a-4b65-9a19-4f35acb570ba.webp
tags: [NAT1, Lucky, Cloudflare]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Video packages.

*frame content*

# The core principle.

![](../../assets/images/7c517b72-8287-4707-8dff-12690a71d592.webp)

# Formal commencement.

### Create necessary Cloudflare API tokens.

Create a token with the ability to access the specified image, allowing Lucky to configure Dynamic DNS (DDNS), issue SSL certificates, and update Cloudflare dynamic redirects.

![](../../assets/images/890468f0-7e7f-42b9-ba57-f98e3b964626.webp)

### Create dynamic redirection rules for Cloudflare.

如图填写，替换为你的域名
![](../../assets/images/9c4a1cb0-d1c6-4e9b-b2bb-dfd6b6fe6306.webp)

``` Replace the full URI with a wildcard pattern that matches any URL starting with `*://*`.  The replacement is to redirect to `https://${2}.stun.072103.xyz:6666/` followed by the specific destination URL. ```

Observe the URL and record the data as follows:

![](../../assets/images/bdd05652-4676-418f-b8aa-1dfc5b3dfab1.webp)

打开开发者工具后，再保存，确保抓到这样的包，保存备用
![](../../assets/images/60e191a3-c4d8-40a2-b9b7-13af0fae38ab.webp)

`api.cloudflare.com/client`

![](../../assets/images/b1a7a07c-7b4b-49ff-a152-938e30d93ee6.webp)

If you are not the first time updating, there may be a `"position":{"index":1}}` that needs to be deleted. Otherwise, subsequent Webhooks will fail.

We have modified the port configuration for the `6666` port to Lucky STUN. The variable now reflects this change.

---

Here’s the translation:  “We have documented the following information.”

```
https://api.cloudflare.com/client/v4/zones/f305febd3a25b5bb3a46b802328a75a8/rulesets/35218f125f7f4421b4c76314464689a2/rules/17228a4add70429c9cdd38eb7fec1d02

{"description":"stun","expression":"(http.host wildcard \"*.072103.xyz\" and not http.host in {\"pic.072103.xyz\" \"hpic.072103.xyz\"})","action":"redirect","action_parameters":{"from_value":{"status_code":301,"preserve_query_string":true,"target_url":{"expression":"wildcard_replace(http.request.full_uri, \"*://*.072103.xyz/*\", \"https://${2}.stun.072103.xyz:#{port}/${3}\")"}}},"enabled":true}
```

### Cloudflare has acquired the traffic originating from .072103.xyz.

![](../../assets/images/72dd5daa-a10f-4fa1-816f-8be18abc2587.webp)

### Configuration for Lucky DDNS.

![](../../assets/images/bf6eafd3-3f7b-4a71-8c4f-c0bd34703eee.webp)

### Configuration of Lucky SSL/TLS certificates.

![](../../assets/images/80fc1bda-334d-4444-b063-2d3202de8296.webp)

### Configuration for Lucky Web Services.

![](../../assets/images/8f64210e-2bb3-4014-96e7-3af577a722f0.webp)

### Configuration: Lucky STUN

Here’s the translation:  “I have configured routing to forward port 16666 (Web Services) to the router at IP address 17777. If you are unfamiliar with port forwarding, please **Disable Port Forwarding** and `Do Not Use Lucky Built-in Port Forwarding`.  The target port is 16666.”

![](../../assets/images/88f5e404-271b-4d20-98c7-b7f39a9247b2.webp)

### Configuration Web Hook

Here’s the translation:  “As shown in the configuration diagram.”

![](../../assets/images/559bce4c-ed44-4523-a623-7058ef1082dc.webp)

Interface address: `https://api.cloudflare.com/...`

Request method: `PATCH` or `POST`

请求头：

```
Authorization: Bearer 你的API令牌
Content-Type: application/json
```

请求体：你之前记录的 `{"description":...`

# End.