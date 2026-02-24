---
title: "It's already 5202, yet some people still don't know how to build their own preferred CDN like Cloudflare or EdgeOne."
description: "Choosing the preferred domain for self-built major CDN services is very simple; you just need to do this first, then this... but there are also quite a few pitfalls..."
category: "Tutorial"
published: 2025-07-22
image: '../../assets/images/5df07ad0-01cd-4541-9321-b0ded148a90f.webp'
tags: [优选, CDN]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
To optimize domain performance, select high-quality IPs by testing them via scripts (e.g., using curl + resolve) across different network providers, then update DNS records via cloud providers like Huawei Cloud, which supports advanced DNS features for flexible IP binding. Regular maintenance is crucial: monitor IP validity, maintain fallback DNS records, and avoid risky automation to prevent service outages. Be cautious with custom IPs during attacks, as they may trigger CDN provider actions like account suspension.
:::

# Basic idea

To create a preferred domain, we first need to screen for high-quality IPs.

After screening to identify high-quality IPs, update the DNS resolution for the designated preferred domain through major cloud DNS service providers.

Finally, put your domain into use and test the effect after optimization.

# How to screen for high-quality IPs?

If you want to improve access quality domestically, we definitely need domestic machines; having your own NAS would be even better.

If you want to prioritize all three networks, then having only one machine is insufficient—you need machines with telecom, mobile, and Unicom networks simultaneously to perform IP filtering. If you want to do more advanced regional prioritization, then... get machines for all three networks in every province?

With the test machine in place, the next step is to write the test scripts.

First, we need to know what IP ranges a CDN provider uses; here, we take Cloudflare as an example.

We can search for `Cloudflare IP segments` to find them

![](../../assets/images/9e79e4ab-ce0c-434a-84f7-3b8a9f3a0886.webp)

For other CDNs, they may not directly expose IPs on their web pages; you will need to find customer service yourself to inquire.

After obtaining the IP segment, the next step is to write the actual test logic.

I only recommend using Curl + Resolve to forcibly bind an IP address to access the business domain name and check whether the returned status code is normal.

**Note that this approach may stress your test machine, router, ISP, and remote server's performance!**

But this is also the most reliable testing method. Streamers have encountered too many strange CDN IPs—some where TCPing port 443 works, others where HTTPS returns 418 or where ping works but TCP does not. Please ensure that the IPs your testing method selects can normally access your service to avoid service downtime.

The thread does not need to be pulled too high; for a CDN like Cloudflare with 1.5 million IPs, we can test only the C segments—after testing `104.18.91.0`, directly test `104.18.92.0`—this saves time, requiring only testing over 5,000 IPs.

In the end, we obtained a set of preferred IPs.

# Connect to Huawei Cloud DNS Resolution

Why is Huawei Cloud recommended?

There is no other reason, because only Huawei Cloud supports **single record value supporting up to 50 IPs**, **ability to create multiple records with the same name**, and **DNS resolution caching for 1 second (TTL=1)**

Thanks to these features of Huawei Cloud, individual users can also bind tens of thousands of IPs under a single domain name (although having more IPs isn't always better).

It is recommended to use the international version, **No real-name authentication required**

Then, refer to the API documentation to experiment with the API and add DNS resolution yourself.

# Post-maintenance

1. If you are using the three-network optimal selection, please add a default resolution route to ensure that users on the corresponding line will not encounter service outages when individual lines are down.

2. Each CDN provider's IP segment may change, please check frequently and update expired IPs promptly.

3. If you encounter service anomalies and cannot obtain the preferred IP, do not write dangerous logic in the script, such as deleting all resolutions. This will cause widespread service outages.

4. Using custom CNAMEs or IPs is not a mainstream practice. If your site is under attack, using custom CNAMEs or IPs may prevent your CDN provider from performing IP-based traffic routing, causing high-quality IPs to be continuously targeted by attacks. Your CDN provider may take forced measures such as: **shutting down your service, banning your account** to isolate the attacker. When you believe your site is under attack, please promptly switch to the official CNAME or IP allocated by the provider.