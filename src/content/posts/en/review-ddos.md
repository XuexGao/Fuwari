---
title: "After being hit continuously for four months, let's do a thorough review!"
description: "Since November 25th, this website has been subjected to continuous attacks totaling as much as hundreds of TiB, with peak attack rates reaching up to 6.8 Gbps. The attackers have shifted from initially targeting purely Indian IP addresses to now exclusively targeting Chinese mainland IP addresses. Today, let’s discuss why the attackers are launching these attacks, what they aim to achieve, and how to defend against DDoS attacks."
published: 2026-02-10
image: ../../assets/images/review-ddos-5.png
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article recounts a prolonged DDoS attack on a static website, initially thought to be immune due to CDN-based hosting. The attack, peaking at 6.65TB, targeted the CDN rather than the origin, but attackers adapted by using domestic IPs and eventually expanded to attack APIs. The author’s attempts to mitigate the attack—switching CDNs, implementing IP-based routing, and disabling HTTP/2—were largely ineffective against the scale and adaptability of the assault. The site endured four months of sustained attacks, forcing constant operational adjustments and highlighting the vulnerabilities even static sites face when using global CDNs.
:::

# Introduction

When this site was first established, it used a **static** architecture to prevent malicious individuals from launching DDoS attacks.

Think about it: a static website, all attack traffic hits the **CDN's edge nodes**, which is equivalent to attacking **the entire CDN provider**.

First, it's hard to kill them; second, it's unnecessary, since static websites don't have backend servers and don't involve any interests—purely a waste of effort.

Normally, DDoS attacks should target individual IPs, because typically, running a website requires purchasing a server and running services on it, ultimately making everything ready and accessible to the public.

If there is no high-defense protection and no CDN, many free DDoS attacks available on the market can easily bring down an IP address.

However, the situation on this website is very different; it is a **static website served directly by a CDN**.

![](../../assets/images/review-ddos.png)

That means, **Attacking the website = Attacking the CDN**

As is usual, this is almost impossible.

From a macro perspective, CDN is used to clean traffic, filtering out malicious traffic and allowing clean traffic to access the origin server.

But what if it's a static website?

It has no origin server at all; every request is treated as a valid request and responded to by the CDN.

Therefore, in summary, if someone attacks a CDN, they are absolutely making things harder for themselves, and I simply don't need to get involved.

But, is that really the case?

If the attacker's objective is not **CDN**?

Then things became interesting.

---

# First large-scale attack: 6.65TB traffic surge

*Recorded on December 16, 2025, this is the first large-scale DDoS attack the site has suffered*

At **December 16, 2025, 11:13**, while testing a project with my friend, he forgot a piece of knowledge. I suggested he check my blog, but he was informed that the blog returned a **570** status code.

I immediately tested my blog website https://acofork.com using https://itdog.cn and found that most nodes returned the **570** status code.

![](../../assets/images/4f3b8517527460574d03479cc64655be.webp)

Because my website was deployed on **EdgeOne** at that time

Subsequently, I consulted Tencent's customer service to verify, and learned that this status code is a **single-node access frequency limit** status code

![](../../assets/images/5082a73ffa31ee435c9c7894263ae4cd.webp)

My friend is even jokingly saying: **Your website 🔥ed**

![](../../assets/images/ddos-6t-1.webp)

But the situation seems a bit strange; why are all overseas responses **200 OK**?

I started to suspect that I was beaten.

![](../../assets/images/ddos-6t-2.webp)

Maybe I got used to static content and didn't check the request count and traffic on **EdgeOne** right away, thinking that since it's all static, who would bother accessing it unnecessarily.

Then I went home and temporarily cut the logic.

- Previously: **EdgeOne Pages** provided services directly, but 570
- Now: **EdgeOne CDN** fetching from **Cloudflare Pages**

After cutting, it gradually improved, although the progress was somewhat slow, and then I went to sleep.

## The truth comes to light.

After waking up, I kept thinking it was strange, so I logged into the **EdgeOne Pages** console, and then I saw—what a big shock!

![](../../assets/images/2f4df8e383a1b41625ad02eb70375465.webp)

![](../../assets/images/50480865cd7f11d7cc4b495bcbc48038.webp)

![](../../assets/images/30bb8ddb905b6de8181d60ddf1b69dbe.webp)

![](../../assets/images/01f15a24f395a3731010c8046cb2008c.webp)

Then, out of curiosity, I wanted to see how good ESA's defense was, but unexpectedly, as soon as I switched over, Alibaba Cloud sent me a message.

![](../../assets/images/9318872dc53b38334312619b2373c81e.webp)

So...

![](../../assets/images/5b3bcf42d0e4f73fbe031699a291a5c2.webp)

![](../../assets/images/c4b6bdd2c39ae7585b9d3ecc5dbe9c6d.webp)

Still the familiar Indonesia

![](../../assets/images/5a86eb051d48615259e8dcecb0fe8185.webp)

No more options, then I quickly switched to Cloudflare Pages within 10 minutes **Cloudflare Pages**

![](../../assets/images/ddos-6t-3.webp)

At present, **Cloudflare Pages** also looks quite green.

![](../../assets/images/image_2025-12-16_08-24-54.webp)

Finally posted a Bilibili video showing (being beaten), then found out

**Wow! The big shot is here!**

![](../../assets/images/Screenshot_2025-12-16-08-08-33-65_149003a2d400f6a.webp)

## Summary of this attack

![](../../assets/images/d16b7b134dec1224dcfc16e59a21942f.webp)

![](../../assets/images/3c33b054a3180932ae87bea8bd06c3ed.webp)

**This site has suffered its largest DDoS attack since its establishment, with a total traffic of 6.65TB and a peak instantaneous rate of 1.95GB/s**

At that time, all major business operations of the **acofork.com** domain were redirected to **2x.nz**, with all services utilizing **Cloudflare CDN**

---

# Suicide Backhand: Back to ESA again

After switching to Cloudflare, the attacks subsided for a while, and the website resumed normal access.

But I always had a nagging feeling—since I already have a registered domain, isn’t it too frustrating not to use a domestic CDN?

For domestic CDN, the access speed for domestic visitors is indeed top-tier. Although Cloudflare has strong protection capabilities, its access speed for domestic users is indeed not as good as that of domestic CDNs.

So, after much deliberation, I made a "suicidal" decision—**switched the website back to ESA (Alibaba Cloud's Global Acceleration Service)**

But this time I learned smarter and set up traffic diversion: domestic visitors accessing via domestic IPs will be responded to by ESA, while overseas visitors will be responded to by CF. At the same time, I configured L7-level overseas blocking on ESA — if overseas IPs attempt to access ESA forcibly, the requests will be intercepted.

![](../../assets/images/review-ddos-2.png)

At the time, we thought this would allow us to balance speed and protection, but the situation was far more complicated than that.

---

# Sustained Attack: A Four-Month Battle of Offense and Defense

## Attack Escalation: Domestic IP Attacks

Under the circumstances where I have implemented traffic diversion and L7 overseas blocking, the attackers did not give up but instead changed their strategy—**beginning to launch attacks using a large number of domestic IPs**

Since we cannot and will never implement a one-size-fits-all block for domestic visitors accessing domestic CDNs, this attack is nearly impossible to effectively defend against at the L7 level.

![](../../assets/images/review-ddos-3.png)

We canthink about why attackers have so many domestic IPs. Is it really their own money being burned? Let's take a look at the UA of most traffic (although it can be forged).

Most of them appear to be BitTorrent downloaders, which may be related to the recent [React/NextJS - NVD - CVE-2025-55182](https://nvd.nist.gov/vuln/detail/CVE-2025-55182) and [FnOS - Important Security Update Notification](https://mp.weixin.qq.com/s/LzkLcy92m5O24up_9c4NUA). Attackers may have launched attacks by scanning a large number of compromised hosts that have not been patched in a timely manner from the public network.

![](../../assets/images/review-ddos-12.png)

However, even if we roughly understand the attack methods, we still don't know how to defend against them, so during these days, we were almost helpless. Although we implemented rate limiting, due to the large number of attacking source IPs, the rate limit was essentially triggered and then switched to a new IP immediately, ultimately still allowing dozens of terabytes of traffic to be pulled in a single day.

Then I also disabled HTTP/2 for domestic CDNs. Since HTTP/2 allows connection reuse, once H2 is not supported, attackers can only use HTTP/1 or HTTP/1.1 to flood traffic, and each HTTP connection will consume an original TCP connection. I believed this would make it more difficult for attackers to pull streams from a single machine, but as mentioned above, there are many attack source IPs, and this approach seems unable to deter attacks for long.

When the website was attacked, everyone couldn't access it, but I indeed had no further options.

## Attack Spread: APIs Are Also Being Targeted

Finally, attackers are no longer solely focused on attacking this static site but have shifted to targeting other APIs, such as Umami, random images, etc.

Soon after, EdgeOne blocked the domain of the random image, and I had to seek alternative solutions.

![](../../assets/images/review-ddos-4.png)

At that time, I temporarily avoided the domain block by switching to a different subdomain, but once the API domain was changed, all services using this API needed to be updated synchronously, which consumed a significant amount of my effort.

Just thinking about having to go through the same process again once the next wave of attacks comes—domains getting attacked and banned again, switching domains, changing services, etc.—is exhausting.

Group U fans have also mentioned it.

![](../../assets/images/Screenshot_2026-02-10-12-01-36-17_9d26c6446fd7bb8.jpg)

Indeed, that's also the case. Although domestic users accessing domestic CDNs directly can achieve extremely good performance, once under attack, they may not even be able to access the service, let alone enjoy fast speeds.

## Final Solution: Migrate to Cloudflare

In the end, it took another half-day to migrate the entire website and all other APIs to Cloudflare. Although attackers are still launching continuous attacks, Cloudflare has not yet been completely overwhelmed.

![](../../assets/images/review-ddos-5.png)

---

# Troubleshooting

> There is still a lot of content left unsaid, but they can't be connected together, so let's answer them in Q&A format.

- **Why only you got hit? Why didn't my website get hit?**

Because I'm a streamer, getting hit will cause a reaction, which is very cute.

- **Why attack a static website? Isn't static invincible?**

Indeed, defending static websites is akin to defending CDNs, but since domestic CDNs like EO/ESA are used, it is well known that bandwidth in China is extremely scarce, and EO/ESA still provides free services, so their protective strength naturally cannot match that of major international providers like Cloudflare. As mentioned above, attackers can indeed **bring down EO/ESA**, rendering it unable to serve your website for a period of time. On the other hand, if we take no protective measures at all, the CDN platform may consider us to be abusing resources, leading to the domain being banned or expelled, making it more difficult for us to implement remedial measures later.

- **Haven't we already implemented a WAF (such as overseas blocking, rate limiting, etc.)? Are these rules just for show?**

To answer this question, we first need to understand what WAF was originally designed to prevent. Normally, a website should be vulnerable at its origin server, with the CDN intercepting most malicious requests and allowing only legitimate requests to reach the origin. Think of it like your origin server hosting high-definition, uncensored movies—you could set up rate limiting so that a single IP can only request once per second, thereby preventing malicious requests from accessing your origin’s hot, high-definition content and instead getting the CDN’s cold, blocking page. But we’re static, with no origin server—or, more accurately, the origin server is the CDN itself. All requests, whether valid or invalid, directly hit the “origin,” which is the CDN. Even if we implement overseas blocking or rate limiting, these are all L7-level controls. Attackers can still establish unlimited TCP connections at the L4 layer to force the CDN to reject services for our domain. Unless we can control the CDN’s L4-layer WAF and set strict WAF rules to directly reject TCP handshake requests from attackers, we may ultimately be doomed to being “killed” by such attacks.

- **Why cut off Cloudflare? Isn't it true that attackers target CDNs, and Cloudflare won't be taken down if it's a CDN?**

Cloudflare has previously defended against attacks as high as 22.2 Tbps; for traffic aimed at us, it's absolutely a piece of cake. See: https://x.com/Cloudflare/status/1970244046946759024, [Cloudflare Q3 2025 DDoS Threat Report — Including the Top Botnet Attackers, Aisuru](https://blog.cloudflare.com/ddos-threat-report-2025-q3/?utm_source=chatgpt.com/)

- **I also have a website; how can I avoid such terrifying DDoS attacks?**

Don't let attackers think it's worth it to attack you or that it's fun to hit you, and you won't get attacked (?).

---

# All attack reports

> We recently switched to Cloudflare; prior to this, we were using EdgeOne/ESA.

### Cloudflare

![](../../assets/images/review-ddos-6.png)

![](../../assets/images/review-ddos-7.png)

![](../../assets/images/review-ddos-8.png)

![](../../assets/images/review-ddos-9.png)

### ESA

![](../../assets/images/review-ddos-10.png)

![](../../assets/images/review-ddos-11.png)

---

# Final Review

After this four-month battle of offense and defense, the following points are summarized:

1. **Free domestic CDNs are not resilient**: Even if WAF rules are properly configured, the CDN will not kick you out, but during an attack, the website will still be down. Unless we have L4 permissions to drop the attacker's connection at the TCP handshake layer, WAF rules at the L7 level have limited effectiveness against large-scale distributed attacks.

2. **For purely static websites, the risk of poorly protected CDNs is high**: If deployed on a poorly protected CDN, attackers pulling large traffic volumes not only cause the website to go down temporarily but may also be expelled by the CDN if left unhandled for an extended period.

3. **This attack scale is unprecedented; the current solution is to switch to Cloudflare CDN**: Because Cloudflare is large enough to withstand such massive DDoS attacks and ensure SLA. Cloudflare has previously defended against attacks of 22.2 Tbps, which is completely within its capability for this scale of attack.

4. **Readers hardly need to worry about their websites being attacked**: Such-scale attacks are clearly organized and targeted, with high costs, making them virtually unsuitable for broad, indiscriminate attacks. Ordinary websites have no value to be targeted, unless you, like the author, have been "singled out."