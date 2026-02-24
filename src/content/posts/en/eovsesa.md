---
title: "EO vs ESA: Who is the true king of domestic CDNs?"
description: "EdgeOne and ESA are both excellent free domestic CDNs in China, and they are almost identical in regular use. Today, let's pit them against each other to see who comes out on top!"
published: 2026-01-16
image: ../../assets/images/eovsesa.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
EdgeOne  ESA ，EdgeOne ，，；ESA  Cloudflare ，， WAF 。EdgeOne  Page  Node.js  SSR，， ESA Page ，。 SSL、、，， 500KB/s， 50MB/s。
:::

# Preface

First, EdgeOne arrived earliest, beginning its testing as early as July of the 25th year, while ESA was not opened until October.

Although EdgeOne initially required redemption codes to obtain the free plan, the process of acquiring these codes gradually became easier over time: from early days of posting on Twitter and then requesting codes from official channels, to codes being distributed daily at fixed times in Discord groups, and finally to users receiving redemption codes simply by sharing speed test results. The entry barrier has steadily decreased, and the functionality has gradually become more complete.

However, since ESA is a later entrant, it directly provides each Alibaba Cloud account with a free ESA package. If you have the need to connect multiple sites, you can also obtain additional free packages by inviting others.

As of now (January 2026), the user experiences of both are quite similar, but EdgeOne and ESA have somewhat different underlying logic.

# Comparison of underlying logic

The EdgeOne project, particularly Page, had already taken its initial shape by 2024 and could be used similarly to major static hosting platforms like Cloudflare Pages, GitHub Pages, and Vercel. However, at that time, Tencent quietly launched it, and the infrastructure was extremely poor—only offering overseas Singapore nodes and not supporting domestic nodes.

But ESA is likely derived from the old DCDN and Cloud Function FC, and the console already shows signs of being a patchwork.

![](../../assets/images/eovsesa-1.webp)

# Rule Engine and WAF

Many things of ESA are directly copied from Cloudflare, such as:

![](../../assets/images/eovsesa-3.webp)

![](../../assets/images/eovsesa-2.webp)

And it also cuts each rule (including nested sub-rules) by one, with the free plan supporting only 5 rules.

![](../../assets/images/eovsesa-4.webp)

## Advantages of EdgeOne

In contrast, EdgeOne did not simply copy Cloudflare; instead, it developed its own rule engine, where all types of rules are configured in one place and can interact with each other.

![](../../assets/images/eovsesa-5.webp)

![](../../assets/images/eovsesa-6.webp)

You can even return an empty response for illegal requests at L7. (Not recommended, as rule engine false interceptions are also considered legitimate requests.)
![](../../assets/images/1f63e461bfa538605c7734042edd68f6.webp)

![](../../assets/images/eovsesa-7.webp)

![](../../assets/images/eovsesa-8.webp)

### Priority Trap

And note this: although you can simulate a WAF interception within the rule engine, in EdgeOne, traffic first passes through the rule engine and then through the WAF. That means if you set a non-CN interception rule in the WAF and then set a non-CN rule to return an empty response in the rule engine, overseas IPs will only see an empty response and won't see the interception page; the traffic will still be logged (this is quite problematic).

![](../../assets/images/eovsesa-9.webp)

## ESA's strategy

On the ESA side, the priority of WAF has always been the highest; traffic is first reviewed by the WAF gateway, and only after passing through is it subject to rules. However, the free tier does not support setting regional-level blocking in WAF (quite frustrating).

![](../../assets/images/eovsesa-10.webp)

### Indirect salvation strategy

But there is a workaround: first write a rule to intercept all traffic, then write a whitelist rule to bypass this rule for trusted traffic.

![](../../assets/images/eovsesa-11.webp)

![](../../assets/images/eovsesa-12.webp)

# Origin configuration

Then, because ESA copied Cloudflare directly, when creating an acceleration site, HTTP defaults to port 80 and HTTPS defaults to port 443 for back-end requests. If you want to change the back-end port, you will also need to waste an additional back-end rule.

![](../../assets/images/eovsesa-13.webp)

While EdgeOne can directly set the origin port and origin Host when creating a site.

![](../../assets/images/eovsesa-14.webp)

# SSL Certificate Issuance

Regarding SSL issuance, both services initially support the default CNAME issuance method, meaning you point your domain to our server, and we assist you in obtaining the SSL certificate. However, for EdgeOne, CNAME issuance is performed separately for each site.

![](../../assets/images/eovsesa-15.webp)

But ESA is centrally managed; give me a DCV, and I'll directly issue you a wildcard domain. After that, you can use it.

![](../../assets/images/eovsesa-16.webp)

# Rule Isolation and Intercommunication

Then comes the most exciting part: the left-and-right-brain synergy moment unique to EdgeOne.

In EdgeOne CDN and EdgeOne Page, their rules are not interoperable; CDN services follow CDN rules, and Page services follow Page rules. That’s fine—he wants to separate dry and wet components, and I can configure two sets without issue.

## Functionality stripped down

But! What does "censorship" mean, and why can CDN write regional judgments, while Page can only write IP?

![](../../assets/images/eovsesa-17.webp)

![](../../assets/images/eovsesa-18.webp)

So there's no way for Page to consume CDN rules, right? There is, brother, there is (but this will show double traffic in the console; if your Page is purely static, you can write a full cache to mitigate this).

![](../../assets/images/eovsesa-19.webp)

# Page Service Comparison

Then move on to the Page section.

You can directly consider EdgeOne's Page as a localized version of Cloudflare Page, even going so far as to modify its core code to allow running Node.js services directly within Page. Keep in mind that Cloudflare Page also only provides a V8 environment (Umami can also do this! SSR functions are limited to no more than 128MB) and can host massive amounts of large and numerous files.

![](../../assets/images/eovsesa-20.webp)

While ESA Page is very similar to a modified cloud function FC, although it also supports functions, it lacks a complete Node.js environment, and even recently WebSocket support has been removed (once closed, it cannot be reopened). Additionally, there are restrictions on the number of hosted files and the size of individual files.

![](../../assets/images/eovsesa-21.webp)

# Speed and Speed Limits

Finally, regarding speed, according to multiple data sources and self-tests, both CDNs will gradually reduce the rate to approximately 500KB/s over long-term single-IP upload and download requests. However, for normal business usage, short-term burst speeds can reach around 50MB/s (but not sustainably). Therefore, neither of these CDNs is suitable for reverse proxying object storage or large file distribution. If you have similar business needs, it's still better to use Cloudflare, as CF has no speed limits.