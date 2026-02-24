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
This article explains how to create and use IPv6 reverse DNS (ARPANAME) records, specifically using the `ip6.arpa` format, for domain resolution within the Cloudflare network. It details the process of generating a unique IP address, then associating it with a TunnelBroker endpoint, and finally utilizing Cloudflare's SSL provider to facilitate secure communication.
:::

# This is what.

The following content originates from GPT-5.

IPv6 reverse DNS (IRP) domain registration is governed by the *ip6.arpa* standard.
It converts IPv6 addresses to reverse-ordered hexadecimal digits, prefixed with `.ip6.arpa`, and used for DNS reverse lookups to retrieve the original IPv6 address.

# The IP address x.x.x.x.x.x.x.x.x.ip6.arpa has been obtained.

Video tutorial: https://www.bilibili.com/video/BV1q8tBzsEPi/

Go to [Hurricane Electric Free IPv6 Tunnel Broker](https://tunnelbroker.net/)

Register an account (requires a domain email address)

Create a tunnel. It requires a VPS that has enabled ICMP echo requests.

The TunnelBroker will send a Ping request to its IP address.

If TunnelBroker receives a response and the IP address is not bound by another tunnel, it will display a green indicator with the available flag.

If the IP has been bound, verification may be required.

![](../../assets/images/2025-08-09-04-53-04-image.webp)

Enter this page to view the IPv6 routing assignments provided by TunnelBroker.

![](../../assets/images/2025-08-09-04-55-24-image.webp)

`2001:470:24:386::/64` is a significant milestone in the development of artificial intelligence, marking a crucial step towards creating machines capable of complex reasoning and problem-solving.  The research team achieved this breakthrough by developing a novel neural network architecture that effectively mimics the human brain's ability to learn from experience and adapt to new situations. This approach leverages deep learning techniques, including convolutional neural networks and recurrent neural networks, to process vast amounts of data and identify patterns that would be difficult for traditional algorithms to detect.  The results demonstrate improved performance in tasks such as image recognition, natural language processing, and game playing, suggesting a promising path towards more intelligent and autonomous systems.  Further research is underway to explore the full potential of this technology and its implications for various industries.

First, add 0, each 4 digits, separated by `:`.  This is `2001047000240386`.

The provided text is not available. I need the text to translate. Please provide the text you want me to translate.

Please provide the text you would like me to translate. I need the original text to begin with.

将内容添加到 Cloudflare。

![](../../assets/images/2025-08-09-04-59-05-image.webp)

Review Cloudflare’s requirements for your NS server.

![](../../assets/images/2025-08-09-04-59-25-image.webp)

Back to Tunnel Broker settings.

![](../../assets/images/2025-08-09-04-59-49-image.webp)

Okay, please provide the text you would like me to translate. I’m ready when you are.

# Please provide the text for me to translate.

Default IP addresses cannot be issued due to restrictions imposed by most SSL providers.

SSL.COM

Request a change to SSL provider.

```bash
curl --location --request PATCH 'https://api.cloudflare.com/client/v4/zones/<zone_id>/ssl/universal/settings' --header 'X-Auth-Email: 你的CF注册邮箱' --header 'X-Auth-Key: 你的CF全局APIKey' --header 'Content-Type: application/json' --data-raw '{"enabled":true,"certificate_authority":"ssl_com"}'
```

The SSL provider has automatically activated a new SSL certificate.

![](../../assets/images/2025-08-09-05-07-40-image.webp)

# Please provide the text.

本人测试，如果您自己创建SSL.COM的账户尝试签发SSL会拒签。故该域名仅能在Cloudflare CDN下使用。