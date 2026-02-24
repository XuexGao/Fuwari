---
title: "NAT1 Opens Internal Network Website"
description: "Utilize CF dynamic redirection to real-time update STUN port via STUN+Lucky WebHook to achieve NAT1 home broadband website deployment"
category: "Tutorial"
published: 2025-05-31
image: ../../assets/images/0aa77bad-482a-4b65-9a19-4f35acb570ba.webp
tags: [NAT1, Lucky, Cloudflare]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide details how to configure Cloudflare dynamic DNS, SSL, and redirect rules to route traffic through Lucky STUN, including setting up API tokens, redirect expressions, and WebHooks for automatic rule updates. It also covers configuring Lucky’s DDNS, SSL, web service, and STUN settings, with special attention to port forwarding and WebHook integration. The process ensures seamless domain traffic redirection to a STUN server via Cloudflare’s rule engine.
:::

# Complementary video

<iframe src="//player.bilibili.com/player.html?isOutside=true&aid=114597528936170&bvid=BV1hY7szUEbu&cid=30235755189&p=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe>

# Principle

![](../../assets/images/7c517b72-8287-4707-8dff-12690a71d592.webp)

# Formally begin

### Create the necessary Cloudflare API tokens

Create a token with the permissions shown in the diagram, allowing Lucky to use this token to set up DDNS, issue SSL certificates, and update Cloudflare dynamic redirects.

![](../../assets/images/890468f0-7e7f-42b9-ba57-f98e3b964626.webp)

### Create base Cloudflare dynamic redirect rules

As shown in the figure, fill in and replace with your domain name.
![](../../assets/images/9c4a1cb0-d1c6-4e9b-b2bb-dfd6b6fe6306.webp)

Expression: `wildcard_replace(http.request.full_uri, "*://*.072103.xyz/*", "https://${2}.stun.072103.xyz:6666/${3}")`

Observe the URL and record the data as shown in the figure below.

![](../../assets/images/bdd05652-4676-418f-b8aa-1dfc5b3dfab1.webp)

After opening the developer tools, save again to ensure you capture such a package and save it for later use.
![](../../assets/images/60e191a3-c4d8-40a2-b9b7-13af0fae38ab.webp)

Change `dash.cloudflare.com/api` to `api.cloudflare.com/client`. Fill in the content within the red box you just obtained after `rules`.

![](../../assets/images/b1a7a07c-7b4b-49ff-a152-938e30d93ee6.webp)

If this is not your first update, you may have a `"position":{"index":1},`—delete it; otherwise, subsequent WebHooks will fail.

Change our hard-coded `6666` port to the Lucky STUN variable `#{port}`

---

In the end, we recorded the following information:

```
https://api.cloudflare.com/client/v4/zones/f305febd3a25b5bb3a46b802328a75a8/rulesets/35218f125f7f4421b4c76314464689a2/rules/17228a4add70429c9cdd38eb7fec1d02

{"description":"stun","expression":"(http.host wildcard \"*.072103.xyz\" and not http.host in {\"pic.072103.xyz\" \"hpic.072103.xyz\"})","action":"redirect","action_parameters":{"from_value":{"status_code":301,"preserve_query_string":true,"target_url":{"expression":"wildcard_replace(http.request.full_uri, \"*://*.072103.xyz/*\", \"https://${2}.stun.072103.xyz:#{port}/${3}\")"}}},"enabled":true}
```

### Let Cloudflare take over traffic for *.072103.xyz

![](../../assets/images/72dd5daa-a10f-4fa1-816f-8be18abc2587.webp)

### Configure Lucky DDNS

![](../../assets/images/bf6eafd3-3f7b-4a71-8c4f-c0bd34703eee.webp)

### Configure Lucky SSL/TLS Certificate

![](../../assets/images/80fc1bda-334d-4444-b063-2d3202de8296.webp)

### Configure Lucky Web Service

![](../../assets/images/8f64210e-2bb3-4014-96e7-3af577a722f0.webp)

### Configure Lucky STUN

Note: I used port forwarding on the router to forward Lucky's port 16666 (Web service) to port 17777 on the router. If you are not familiar with port forwarding, **do not enable** `do not use Lucky's built-in port forwarding` and **target port** fill in 16666

![](../../assets/images/88f5e404-271b-4d20-98c7-b7f39a9247b2.webp)

### Configure WebHook

As shown in the figure configuration

![](../../assets/images/559bce4c-ed44-4523-a623-7058ef1082dc.webp)

API address: the one you previously recorded `https://api.cloudflare.com/...`

Request method: `PATCH` or `POST`

Request Header:

```
Authorization: Bearer 你的API令牌
Content-Type: application/json
```

Request body: what you previously recorded `{"description":...`

# End.