---
title: "What is IPv6 reverse DNS? Can it be hosted on Cloudflare even if it looks like a mess? Is SSL issuance still fine?"
description: "Have you seen domain names like e.b.9.f.0.7.4.0.1.0.0.2.ip6.arpa? Today, I'll teach you how to create one!"
category: "Tutorial"
published: 2025-08-09
image: '../../assets/images/2025-08-09-04-50-44-image.webp'
tags: [IPv6, ip6.arpa]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article explains how to obtain and configure an IPv6 reverse DNS (PTR) record in the format `x.x.x.x.x.x.x.x.x.x.x.x.ip6.arpa`, using Hurricane Electric’s Tunnel Broker and Cloudflare. It details the steps to create a tunnel, derive the reverse DNS name from the allocated IPv6 prefix, and set up DNS records in Cloudflare. The guide also covers how to obtain an SSL certificate via SSL.COM (as default providers reject `.ip6.arpa` domains) and notes that SSL.COM certificates require Cloudflare’s CDN for validation.
:::

# What is this?

> The following content is from GPT-5

This is a **IPv6 reverse DNS domain**, following the `ip6.arpa` format.
It reverses each hexadecimal digit of the IPv6 address and appends the `.ip6.arpa` suffix, used for DNS reverse lookup to resolve the domain name back to the original IPv6 address.

# Get x.x.x.x.x.x.x.x.x.x.x.x.ip6.arpa

> Video tutorial: https://www.bilibili.com/video/BV1q8tBzsEPi/

Go to [Hurricane Electric Free IPv6 Tunnel Broker](https://tunnelbroker.net/)

Register an account (requires a domain email)

Create a tunnel. Requires a VPS with ICMP signaling enabled.

After filling in the IP, TunnelBroker will send a Ping request to it.

If TunnelBroker receives a response and the IP is not already bound to another tunnel, it will display a green, bindable indicator.

If the IP has been bound, HTTP verification is required.

![](../../assets/images/2025-08-09-04-53-04-image.webp)

Enter this page to view the IPv6 route assigned to you by TunnelBroker.

![](../../assets/images/2025-08-09-04-55-24-image.webp)

Take `2001:470:24:386::/64` as an example

First add 0, each item 4 digits, separated by `:`, then it is `2001047000240386`

Then reversed, it would be `6830420007401002`

Finally, adding `.` and `.ip6.arpa` results in `6.8.3.0.4.2.0.0.0.7.4.0.1.0.0.2.ip6.arpa`

Add it to Cloudflare

![](../../assets/images/2025-08-09-04-59-05-image.webp)

Check the NS servers required by Cloudflare for you to set up.

![](../../assets/images/2025-08-09-04-59-25-image.webp)

Go back to TunnelBroker to set up

![](../../assets/images/2025-08-09-04-59-49-image.webp)

Wait until the domain is activated.

# Issue an SSL certificate for it.

By default, IPRA cannot issue SSL certificates because they are typically rejected by most SSL providers.

Changing the Cloudflare SSL provider to SSL.COM can resolve this issue.

Obtain the necessary information and initiate a request to change the SSL provider

```bash
curl --location --request PATCH 'https://api.cloudflare.com/client/v4/zones/<zone_id>/ssl/universal/settings' --header 'X-Auth-Email: 你的CF注册邮箱' --header 'X-Auth-Key: 你的CF全局APIKey' --header 'Content-Type: application/json' --data-raw '{"enabled":true,"certificate_authority":"ssl_com"}'
```

Wait a moment, CF will automatically issue an SSL certificate using the new SSL provider.

![](../../assets/images/2025-08-09-05-07-40-image.webp)

# Limitations

I have tested this: if you create your own account with SSL.COM and attempt to issue an SSL certificate, it will be rejected. Therefore, this domain can only be used under Cloudflare CDN.