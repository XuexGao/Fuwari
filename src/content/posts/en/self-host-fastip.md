---
title: "5202，Cloudflare/EdgeOneCDN？"
description: "The preferred domain names for building your own large CDN services are remarkably straightforward – simply select one, then another… but be aware of several pitfalls along the way."
category: "Tutorial"
published: 2025-07-22
image: '../../assets/images/5df07ad0-01cd-4541-9321-b0ded148a90f.webp'
tags: [优选, CDN]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article describes a process for selecting and securing domain names to improve website accessibility, focusing on leveraging Cloudflare's CDN service. It outlines the steps involved: initial IP filtering, testing with various CDNs, creating DNS records, and utilizing Huawei Cloud’s features for managing multiple IP addresses. The strategy emphasizes careful planning, testing, and proactive monitoring of IP availability, alongside considerations for security and potential service disruptions.
:::

# Basic approach

To select a premium domain name, we first need to identify and filter out those with high quality IP addresses.

After screening for high-quality IP addresses, we update DNS records for designated premium domain names through partnerships with leading cloud DNS providers.

Finally, enter your domain name for testing and evaluation after the optimization process.

# How to identify high-quality IP addresses?

To improve domestic access quality, we absolutely require domestic aircraft. If our facility has a NAS (Network Attached Storage), it’s already quite advantageous.

To achieve optimal network coverage across three networks – terrestrial, mobile, and fiber optic – you require a device that supports simultaneous connectivity to all three. For more advanced regional selection, it’s recommended to have each province’s three-network router installed.

With the test machine ready, we will now begin to develop test scripts.

First, we need to determine the IP address associated with a CDN provider. For example, consider Cloudflare.

We can locate Cloudflare IP addresses via searching for `Cloudflare IP segments`.

![](../../assets/images/9e79e4ab-ce0c-434a-84f7-3b8a9f3a0886.webp)

For other CDNs, they may not directly expose their IP addresses on the webpage. You will need to contact customer service for assistance.

Following the acquisition of an IP address, the next step is to develop and execute practical testing procedures.

I recommend using Curl+Resolve to enforce IP access to a business domain and verify the response status code.

Please note that this approach and its testing requirements represent a significant challenge. It demands careful evaluation of your test equipment, router configuration, ISP performance, and the server's capacity.

Here’s the translation:  “This is the most reliable testing method, as the streamer has extensively tested TCP connections on 443. They have successfully accessed HTTPS (418) or pinged through CDNIP when TCP connections fail. To ensure your test methods accurately identify IP addresses that can successfully access your service, please verify that the IPs you’re filtering for can properly reach your endpoint, preventing service outages.”

Here’s the translation:  “Scaling CDN performance shouldn't be excessively high. For a CDN with 150w IPs like Cloudflare, we can focus on testing the C-segment, which is just testing the connection to `104.18.91.0` and then immediately test `104.18.92.0`. This approach will save time as we only need to test 5000 IP addresses.”

Ultimately, we secured a selection of IP addresses.

# Huawei Cloud DNS Resolution Translation

Here’s a professional translation of “Why recommend Huawei Cloud?”:  “Several factors contribute to the growing popularity of Huawei Cloud. These include its robust security infrastructure, scalable and reliable services tailored for diverse business needs, competitive pricing, and a strong commitment to innovation.”

Only Huawei Cloud supports **Single Record Value Support 50 IPs**, **Multiple Same Name Records Allowed**, and **Support Only 1 DNS Record (TTL=1) **

Leveraging the functionalities offered by Huawei Cloud, individual users can establish a domain with several thousand IP addresses (though more IPs are preferable).

Recommend using the overseas version, **No KYC Required**.

Following API documentation, you can perform DNS record resolution via API.

# Post-maintenance updates.

1. To ensure a seamless user experience, consider implementing a default routing policy that automatically handles service outages on individual lines. This will prevent users from experiencing service disruptions when a particular line experiences technical difficulties.

2. Here’s the translation:  “Each CDN provider’s IP address may change intermittently, so it is crucial to monitor and regularly update your IP addresses.”

3. If encountering service anomalies and unable to obtain an optimized IP address, please avoid writing risky logic in the script, such as deleting all parsing. This could lead to widespread service outages.

4. Here’s the translation:  Using a custom CNAME or IP address is not the preferred method. If your site is targeted by an attack, relying on CDN services can result in IP routing issues for your CDN provider, leading to persistent attacks and potentially triggering actions like **service shutdown** ]and `account suspension`.  Should you suspect your site is under attack, immediately switch to the designated CNAME or IP provided by your platform.