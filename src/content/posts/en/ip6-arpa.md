---
title: "What are IPv6 reverse DNS zones? Can a long string of characters still be hosted on Cloudflare? Does SSL signing work okay?"
description: "Do you know about similar domain names like e.b.9.f.0.7.4.0.1.0.0.2.ip6.arpa? Today, I’ll teach you how to create one!"
category: "Tutorial"
published: 2025-08-09
image: '../../assets/images/2025-08-09-04-50-44-image.webp'
tags: [IPv6, ip6.arpa]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# What is this?

The following content originates from GPT-5.

This is a **IPv6 Reverse DNS** domain, adhering to the `ip6.arpa`(https://www.ip6.arpa).
It sorts IPv6 addresses in reverse hexadecimal order, followed by the `.ip6.arpa` prefix, to facilitate DNS reverse lookups and retrieve the original IPv6 address.

# 将 x.x.x.x.x.x.x.x.x.x.x.x.ip6.arpa 弄到手

Video tutorial: [https://www.bilibili.com/video/BV1q8tBzsEPi/](https://www.bilibili.com/video/BV1q8tBzsEPi/)

Go to [Hurricane Electric Free IPv6 Tunnel Broker](https://tunnelbroker.net/).

Register an account using a domain email address.

Create a tunnel. This requires a VPS that has enabled ICMP (Internet Control Message Protocol) traffic.

Upon providing an IP address, TunnelBroker will initiate a Ping request towards it.

If TunnelBroker receives a response and the IP address is not already bound by another tunnel, it will display a green indicator with the associated logo.

If the IP address has been bound, verification via HTTP is required.

![](../../assets/images/2025-08-09-04-53-04-image.webp)

Here’s the translation of the text:  “Enter this page to view the IPv6 routing assignments provided by TunnelBroker.”

![](../../assets/images/2025-08-09-04-55-24-image.webp)

Based on the provided reference, the translation is:  “As an example of `2001:470:24:386::/64`,”

First, add zero to each digit, divide by four, and format as `:` separated by brackets. This is `2001047000240386`.

Then reverse it, resulting in `6830420007401002`.

Finally, add `.` and `.ip6.arpa` to represent the following IP address: `6.8.3.0.4.2.0.0.0.0.7.4.0.1.0.0.2.ip6.arpa`

将其添加到Cloudflare

![](../../assets/images/2025-08-09-04-59-05-image.webp)

Please configure your NS server according to the Cloudflare requirements.

![](../../assets/images/2025-08-09-04-59-25-image.webp)

Return to Tunnel Broker for configuration.

![](../../assets/images/2025-08-09-04-59-49-image.webp)

The domain registration process is complete.

# Please issue an SSL certificate for us.

Default IPRA is unable to issue SSL certificates due to widespread rejection by most SSL certificate providers.

The Cloudflare SSL provider has been rebranded to SSL.com to resolve this issue.

Secure your website by requesting necessary information and initiating a change with your SSL provider.

```bash
curl --location --request PATCH 'https://api.cloudflare.com/client/v4/zones/<zone_id>/ssl/universal/settings' --header 'X-Auth-Email: 你的CF注册邮箱' --header 'X-Auth-Key: 你的CF全局APIKey' --header 'Content-Type: application/json' --data-raw '{"enabled":true,"certificate_authority":"ssl_com"}'
```

Please wait a moment; the system will automatically provision new SSL certificates from a new provider.

![](../../assets/images/2025-08-09-05-07-40-image.webp)

# Limitation(s)

Here’s the translation:  “I am conducting a personal SSL certificate test. Attempting to issue an SSL certificate for an account created at SSL.COM will likely result in rejection, as this domain is restricted to use with Cloudflare CDN.”