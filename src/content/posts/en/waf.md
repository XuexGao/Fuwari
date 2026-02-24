---
title: "Do Static Websites Need a WAF? Cloudflare Doesn't, But EdgeOne/ESA Do!"
description: "A few weeks ago, my website was subjected to approximately 100TB of DDoS traffic. Even though I have a static website and wouldn't be \"killed\" by such attacks, the excessive traffic still led EdgeOne to revoke my access. In fact, this incident could have been avoided..."
published: 2026-01-18
image: ../../assets/images/waf.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
Static websites can still be "taken down" if hosted on metered CDNs like EdgeOne/ESA, not because they lack a backend, but because unfiltered traffic can overwhelm the CDN’s resources. Protection involves blocking overseas IPs, enabling JS challenges, rate limiting, and disabling HTTP/2 to drastically reduce attack efficiency. For platforms like ESA with limited WAF features, workarounds like rule-based IP whitelisting or routing traffic through a CDN’s WAF can help mitigate abuse.
:::

# Can a static website be "killed"?
First, let's give the conclusion:

If you're hosted on **Cloudflare Page**, you really don't have to worry about it, as it doesn't charge for static request traffic, and its own CDN network is powerful enough—so long as it's not one petabyte per day, it's as stable as a rock.

However, if you are hosted on billing platforms like **EdgeOne/ESA**, you are **can be killed**.

Someone might ask: I already have a static website; there's no origin server, so how can it be "killed"?

Yes, you indeed do not have an origin server, and static websites do not count request volumes. However, if you configure no protection at all, anyone—or all IPs—can flood your site with traffic in bulk, several TB per day. A few days later, **CDN provider may cancel your access**

So the problem we need to solve becomes clear: just like dynamic websites, the essence is: **Make the website serve real users as much as possible**. The difference is that for dynamic sites, this is to **Prevent the origin server from being overwhelmed**, while for static websites, it is to **Ensure the CDN sees significant traffic**.

# How to do WAF?
First, if the CDN you are using has domestic nodes, directly block overseas access.

Because most brush IPs come from overseas (mainland IPs are precious), directly blocking them can effectively prevent large files from being scraped, such as images. I am an example of this.
![](../../assets/images/waf-1.webp)

Actually, once you complete this step, you are already **99%** unlikely to be banned, because overseas bots originally could upload images ranging from **100~1000KB**, but now they can only upload **interception pages** (usually less than **5KB**), and interception pages generally contain little information; some platforms can even customize their interception pages to return empty responses (**less than 1KB**).

If originally a brush could kill you with **** IPs, but now it requires **100 * 100000 ** IPs to kill you, this is undoubtedly an exponential growth, and since you are a static site, besides causing service downtime, you won't receive any bills, so most brushers will abandon attacking your site.

Next, we can still configure additional protections, such as **rate limiting**, **global JS challenge**, etc., which are verification measures that real visitors will not notice.

For **rate limiting**. Real visitors won't rush to your site and repeatedly press F5 to generate a large number of requests in a short time.

For **JS queries**. Real visitors access via **browser**, not via lightweight **request generators** like **curl**, **wget**, **okhttp**, **httpx** that lack JS execution capabilities. Therefore, it is recommended to enable full-site JS interception.

What comes next is the big move—if your site is being heavily brushed, and even though you've blocked everything at L7, the traffic still keeps flooding in, don't hesitate, **Disable CDN's HTTP/2.0**

What is the principle behind this? As we all know, HTTP/2.0 introduced **connection reuse**, meaning multiple HTTP requests can be sent over a single TCP connection, which undoubtedly reduces the cost of attacks.

**After actual testing, disabling HTTP/2.0 caused the attacker's data rate to drop sharply from 50GB per minute to 5GB per 10 minutes**
>Video: https://www.bilibili.com/video/BV1paryBeEbP/

# Summary: How to become the most durable website?

1. Intercept overseas
2. All JS request probes (note: do not probe the API)
3. Set rate limits
4. Disable CDN HTTP 2.0
# Tricks and gimmicks

### ESA prohibits overseas visits
For ESA, free version users may not be able to set region restrictions.
![](../../assets/images/waf-3.webp)

But we can **curve around the problem**, first setting a rule to intercept all requests by default, then checking if it's from a mainland IP; if so, bypass this rule.

![](../../assets/images/waf-4.webp)

![](../../assets/images/waf-5.webp)

Video: https://www.bilibili.com/video/BV1fKimBnE3T/

### EdgeOne Page uses CDN WAF
EdgeOne is weird; its CDN and Page WAF are separate, and the Page WAF protection is very poor, only able to **target individual IPs** for blocking
![](../../assets/images/waf-8.webp)

We can allow the CDN to source back to Page so that Page can benefit from the CDN's WAF policies. On the left is the CDN domain creation interface, and on the right, the floating window is the Page interface.

> [!WARNING]
> After this setup, you will see double the traffic in the overview, because the CDN counts once when it requests the origin server for a Page, and then again when the Page actually delivers content from the origin server. This can be alleviated by enabling caching.

![](../../assets/images/waf-7.webp)