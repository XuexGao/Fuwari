---
title: "NAT1 Open Internal Website"
description: "Here’s a professional translation of the text:  “Leveraging CF dynamic redirection, utilizing STUN+Lucky WebHook for real-time updates to the STUN port enables NAT1 to support a wide range of broadband deployments.”"
category: "Tutorial"
published: 2025-05-31
image: ../../assets/images/0aa77bad-482a-4b65-9a19-4f35acb570ba.webp
tags: [NAT1, Lucky, Cloudflare]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article outlines the process of configuring Lucky, a cloudflare API client, to handle traffic routed through Cloudflare's DNS servers and STUN services. It details steps for creating necessary API tokens, establishing dynamic redirection rules, configuring Lucky’s web service, and setting up Webhooks. The guide includes instructions on port forwarding, SSL/TLS certificate configuration, and STUN service setup, culminating in the crucial step of routing traffic to a specific Cloudflare endpoint using a patched URL.
:::

# 配套视频

The iframe displays a video player from Bilibili.com.

# Okay, please provide the text. I’m ready when you are.

![](../../assets/images/7c517b72-8287-4707-8dff-12690a71d592.webp)

# Please provide the text you would like me to translate.

### Create necessary Cloudflare API tokens

Create a token with permissions to view the image, allowing Lucky to configure DDNS, issue SSL certificates, and update Cloudflare dynamic redirects.

![](../../assets/images/890468f0-7e7f-42b9-ba57-f98e3b964626.webp)

### Here’s a breakdown of Cloudflare dynamic redirection rules:  Cloudflare provides a robust and flexible system for managing redirects, allowing you to control how users are routed when they navigate to different URLs. These rules can be configured at the edge (client-side) or in the cloud (server-side), offering granular control over redirect behavior. Key features include:  *   **Redirects:** Define specific redirect patterns – such as 301 (permanent redirect) and 302 (temporary redirect). *   **Match Types:** Specify how to match URLs for redirection, including exact matches and wildcard matching. *   **Redirects per URL:**  Control the number of redirects associated with a single URL. *   **Redirects per Domain:**  Manage redirects across multiple domains. *   **Redirects per Path:**  Restrict redirects based on specific paths within a domain. *   **Redirects per Host:**  Limit redirects to specific hostnames.  These rules are essential for maintaining website integrity, improving SEO, and providing a seamless user experience.

如图填写，替换为你的域名
![](../../assets/images/9c4a1cb0-d1c6-4e9b-b2bb-dfd6b6fe6306.webp)

``` Wildcard replace (http.request.full_uri) with "*://*.072103.xyz/*" to "https://${2}.stun.072103.xyz:6666/${3}" ```

Observe the following data from the URL:  [https://www.example.com/data](https://www.example.com/data)

![](../../assets/images/bdd05652-4676-418f-b8aa-1dfc5b3dfab1.webp)

打开开发者工具后，再保存，确保抓到这样的包，保存备用
![](../../assets/images/60e191a3-c4d8-40a2-b9b7-13af0fae38ab.webp)

`api.cloudflare.com/client`

![](../../assets/images/b1a7a07c-7b4b-49ff-a152-938e30d93ee6.webp)

If you are not the first time updating, you may have a `"position":{"index":1},`. Otherwise, the WebHook will fail.

We have migrated the port to Lucky STUN.

Okay, please provide the text. I’m ready when you are.

Ultimately, we have recorded the following information.

```
https://api.cloudflare.com/client/v4/zones/f305febd3a25b5bb3a46b802328a75a8/rulesets/35218f125f7f4421b4c76314464689a2/rules/17228a4add70429c9cdd38eb7fec1d02

{"description":"stun","expression":"(http.host wildcard \"*.072103.xyz\" and not http.host in {\"pic.072103.xyz\" \"hpic.072103.xyz\"})","action":"redirect","action_parameters":{"from_value":{"status_code":301,"preserve_query_string":true,"target_url":{"expression":"wildcard_replace(http.request.full_uri, \"*://*.072103.xyz/*\", \"https://${2}.stun.072103.xyz:#{port}/${3}\")"}}},"enabled":true}
```

### Cloudflare has taken over the traffic to *.072103.xyz.

![](../../assets/images/72dd5daa-a10f-4fa1-816f-8be18abc2587.webp)

### Here’s a configuration guide for Lucky DDNS:  **Configuration Options:**  *   **DDNS Provider:** Select your preferred DDNS provider (e.g., Cloudflare, DynDNS, etc.). *   **Static IP Address:** Choose whether to use a static IP address or a dynamic DNS service. *   **Subnet Mask:** Specify the subnet mask for your network. *   **Gateway:** Enter the default gateway address for your network. *   **DNS Servers:** Configure the DNS servers you want to use. *   **Port Forwarding (Optional):**  If needed, configure port forwarding rules.  **Important Notes:**  *   Ensure your DDNS provider supports the configuration options you select. *   Verify that your chosen DDNS provider is working correctly before making changes. *   Consult your DDNS provider’s documentation for detailed instructions and troubleshooting tips.

![](../../assets/images/bf6eafd3-3f7b-4a71-8c4f-c0bd34703eee.webp)

### Configuration of Lucky SSL/TLS certificates.

![](../../assets/images/80fc1bda-334d-4444-b063-2d3202de8296.webp)

### Configuration of Lucky Web Services

![](../../assets/images/8f64210e-2bb3-4014-96e7-3af577a722f0.webp)

### Configuration Lucky stun

Lucky’s web service port was forwarded to the router’s 17777 port. If you are not familiar with port forwarding, please **Do not enable** `Do not use Lucky built-in port forwarding` and **Target port** should be 16666.

![](../../assets/images/88f5e404-271b-4d20-98c7-b7f39a9247b2.webp)

### Configuration Web Hook

Please provide the text you would like me to translate.

![](../../assets/images/559bce4c-ed44-4523-a623-7058ef1082dc.webp)

API Address: [https://api.cloudflare.com/](https://api.cloudflare.com/)

Please provide the text you would like me to translate.

Please provide the text you would like me to translate.

```
Authorization: Bearer 你的API令牌
Content-Type: application/json
```

You previously recorded the following:  ```json {"description": "A detailed analysis of the current situation, including key indicators and potential risks."} ```

# Please provide the text you would like me to translate.