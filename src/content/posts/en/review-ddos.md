---
title: "A post-injury review!"
description: "Since November 25, 2023, this website has been subjected to continuous and relentless attacks totaling several hundred Terabytes (TiB), with peak attack rates reaching 6.8 Gbps. Furthermore, the attackers have shifted from initial attacks originating from Indian IP addresses to those originating from mainland China. Today, we will discuss why attackers are targeting this website, what they hope to achieve, and how to mitigate Distributed Denial of Service (DDOS) attacks."
published: 2026-02-10
image: ../../assets/images/review-ddos-5.png
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This website suffered a sustained DDoS attack lasting approximately four months, resulting in a total traffic of 6.65TB and peak traffic of 1.95GB/s. The attackers utilized numerous domestic IP addresses, likely targeting unpatched vulnerabilities. The attack escalated to include a large number of HTTP connections, further complicating mitigation efforts. Despite rate limiting, the attackers continued to exploit multiple IPs, effectively preventing effective protection.
:::

# Introduction

The initial implementation of this platform utilized a static architecture to mitigate the risk of malicious actors engaging in DoS (Distributed Denial-of-Service) attacks.

I’ve considered this, and the primary traffic is directed towards the edge nodes of a static website. Specifically, it’s being targeted at the CDN provider itself.

It’s challenging to kill, and it’s unnecessary – as there is no backend server behind a static website, and it doesn't involve any financial interests. It’s simply a waste of time.

In standard practice, DDoS attacks are directed at individual IP addresses. This is because operating a website typically requires the purchase of a server and its subsequent deployment to serve services, ultimately making them accessible to the public network.

If no high-level DDoS protection or CDN is in place, numerous free DDOS attacks are readily available to easily terminate an IP address.

However, the situation with this website is markedly different – it’s a static website directly addressed by CDN (Content Delivery Network).

![](../../assets/images/review-ddos.png)

Attacking this website means attacking the CDN.

As is customary, this is virtually impossible.

From a macro perspective, CDN is utilized for traffic cleansing, neutralizing malicious traffic, and then releasing clean traffic to the origin server.

However, if it’s a static website?

The system lacks a central repository for requests; every request is treated as a valid request and responded to by the CDN.

Therefore, if someone initiates a CDN outage, it’s simply self-inflicted suffering, and I don't need to intervene in any way.

However, is this truly so?

If the attacker’s objective is not simply to **kill CDN**, what is their true aim?

So things have become more interesting.

---

# First, a major attack: 6.65 TB traffic surge

On December 16, 2025, this website experienced a significant and widespread Distributed Denial-of-Service (DDoS) attack.

On December 16, 2025, during a testing project with my friend, he inadvertently forgot a key concept. I suggested he review my blog, but was informed that the blog’s access status code is **570**.

I immediately tested my blog website at https://itdog.cn and discovered that most nodes are in the **570** state code status.

![](../../assets/images/4f3b8517527460574d03479cc64655be.webp)

Due to the deployment of my website at **EdgeOne**,...

Following this, I contacted Tencent customer service to inquire about the status code being a **Single Node Limited Frequency Access**.

![](../../assets/images/5082a73ffa31ee435c9c7894263ae4cd.webp)

My friend even joked about it: “You’ve really gotten to me.”

![](../../assets/images/ddos-6t-1.webp)

However, the situation appears unsettling, why is it that overseas countries are consistently showing a high level of interest in **200 OK**?

I’m beginning to question whether I have been wronged.

![](../../assets/images/ddos-6t-2.webp)

It’s possible to spend a long time playing static, without immediately checking the EdgeOne request count and traffic data. It seems like nobody is interested in engaging with it.

Then I went home, briefly interrupting my logic.

- Here’s the translation:  “Previously, EdgeOne offered services directly, but now they provide service with a focus on **EdgeOne Pages**.”
- Here’s the translation:  “EdgeOne CDN is returning data from Cloudflare Pages.”

After completing the procedure, the symptoms gradually improved, although the speed was somewhat slow. Eventually, I fell asleep.

## The truth has been revealed.

Upon waking, I found myself increasingly perplexed, so I accessed the EdgeOne Pages control panel and then observed a rather significant anomaly – a large lightning strike.

![](../../assets/images/2f4df8e383a1b41625ad02eb70375465.webp)

![](../../assets/images/50480865cd7f11d7cc4b495bcbc48038.webp)

![](../../assets/images/30bb8ddb905b6de8181d60ddf1b69dbe.webp)

![](../../assets/images/01f15a24f395a3731010c8046cb2008c.webp)

Following my curiosity, I wanted to observe the defensive capabilities of ESA and was surprised to receive a message from Alibaba shortly after I had recently cut through it.

![](../../assets/images/9318872dc53b38334312619b2373c81e.webp)

Here’s the translation:  “Thus…”

![](../../assets/images/5b3bcf42d0e4f73fbe031699a291a5c2.webp)

![](../../assets/images/c4b6bdd2c39ae7585b9d3ecc5dbe9c6d.webp)

Still familiar with Indonesia.

![](../../assets/images/5a86eb051d48615259e8dcecb0fe8185.webp)

“I’ve lost it,” followed by a rapid transition to Cloudflare Pages, completed within ten minutes.

![](../../assets/images/ddos-6t-3.webp)

Currently, Cloudflare Pages appears verdant.

![](../../assets/images/image_2025-12-16_08-24-54.webp)

Finally, I received a video on Bilibili that was damaged.

I’m going! The big one has arrived!

![](../../assets/images/Screenshot_2025-12-16-08-08-33-65_149003a2d400f6a.webp)

## Here’s the translation:  This report summarizes the recent attack.

![](../../assets/images/d16b7b134dec1224dcfc16e59a21942f.webp)

![](../../assets/images/3c33b054a3180932ae87bea8bd06c3ed.webp)

Here’s the translation:  “This platform has experienced the largest DDoS attack since its launch, resulting in a total traffic volume of 6.65 TB and peak instantaneous throughput of 1.95 GB/s.”

At **acofork.com**, the primary business operations have been redirected to **2x.nz**. All business activities utilize **Cloudflare CDN**.

---

# Dead horse return, again.

After Cloudflare, the attack subsided for a period of time, and the website returned to normal accessibility.

However, I sometimes have a nagging feeling – I’ve already registered a domain name with an international CDN, and isn't it a bit frustrating not to use it domestically?

Here’s the translation:  “Domestic CDN providers offer exceptionally fast speeds for domestic visitors. While Cloudflare possesses robust security measures, domestic access speeds generally surpass those achieved through CDN infrastructure within the country.”

Subsequently, after considerable deliberation, I made the decision to “do myself a favor” – **reverting to ESA (Aliyun All-in-One Acceleration)**.

However, this time I learned to be more intelligent. I configured a redirection: domestic visitors will use the domestic IP address to access ESA, while international visitors will use CF. Simultaneously, I configured an overseas blocking layer on ESA – if forced through an overseas IP address, the request will be blocked.

![](../../assets/images/review-ddos-2.png)

At first, I believed this would provide a balance between speed and protection, but the situation has proven far more complex than initially anticipated.

---

# Extended conflict: A protracted battle of defense and offense lasting four months.

## Attack Escalation: Domestic IP Attack

Despite the deployment of split tunneling and L7 global blocking, the attacker did not abandon their strategy; they shifted to utilizing a substantial amount of domestic IP addresses for attack.

Due to the lack of a unified and comprehensive approach to protecting domestic visitors accessing our CDN, this attack is virtually impossible to effectively mitigate at L7 level.

![](../../assets/images/review-ddos-3.png)

We can briefly consider why attackers have so many domestic IP addresses. Is it simply a matter of spending money on these? Let’s examine the majority of traffic and its potential origins – UA (though it can be spoofed).

The majority of the observed instances appear to be BT downloaders, potentially linked to recent activity involving [React/NextJS - NVD - CVE-2025-55182](https://nvd.nist.gov/vuln/detail/CVE-2025-55182) and [FnOS - Important security updates notifications](https://mp.weixin.qq.com/s/LzkLcy92m5O24up_9c4NUA). Attackers may have initiated attacks leveraging a large-scale campaign of exploiting unpatched vulnerabilities in compromised meat chickens originating from public networks.

![](../../assets/images/review-ddos-12.png)

Despite a general understanding of the attack methodology, we are currently operating with little to no defense. Consequently, we have been largely in a state of helplessness, though our rate limits have been triggered multiple times, and subsequent IP addresses have been immediately blocked, effectively preventing any substantial data flow for an extended period.

Following the closure of the domestic CDN’s HTTP/2 protocol, due to its ability to serve multiple requests concurrently, and the risk of H2 failing to function, attackers are increasingly reliant on H1 or H1.1 for traffic amplification. Each HTTP connection consumes a separate TCP connection, making it significantly more challenging to effectively leverage this technique for sustained bandwidth manipulation. This approach, while potentially increasing the difficulty of single-source traffic amplification, is unlikely to be sustainable given the sheer volume of attacker IP addresses involved.

When the website was attacked, everyone was unable to access it, but I myself had already exhausted all options.

## Attack Propagation: The API has also been targeted.

Finally, the attacker has ceased to focus solely on this static site. Instead, they have shifted their attention to attacking other APIs, such as Umami and random images.

Shortly after, EdgeOne blocked the domain name for the random image. I was forced to seek alternative solutions to resolve this issue.

![](../../assets/images/review-ddos-4.png)

At the time, I temporarily circumvented a DNS restriction to avoid blocking by the search engine for the domain. However, once I changed the API domain, all business utilizing this API required a synchronization of their operations, which consumed considerable effort.

The thought of encountering another round of attacks on the domain, followed by its restriction and subsequent re-blocking and service alterations, becomes increasingly tiresome.

“fan groups” also frequently express concerns about…

![](../../assets/images/Screenshot_2026-02-10-12-01-36-17_9d26c6446fd7bb8.jpg)

Certainly, here’s the translation:  “Indeed, this is the case; despite direct connections to domestic CDNs offering superior access and performance, users experience intermittent connectivity issues when they are blocked, even rendering access unavailable. Furthermore, speed is significantly compromised.”

## Finalized and migrated to Cloudflare.

Ultimately, it took approximately half a day to migrate the entire website’s core and all other APIs to Cloudflare, despite ongoing persistent attacks from attackers; however, it is not expected to render Cloudflare ineffective.

![](../../assets/images/review-ddos-5.png)

---

# Difficult questions.

Here’s the translation:  “There are many more aspects of this that remain unaddressed, but they cannot be consolidated into a single question-and-answer format.”

- Here’s a professional translation of the text:  “Why is only you being targeted? Why hasn't my website been affected?”

Due to my role as a streamer, I experience reactions when being challenged, which is endearing.

- Here’s the translation:  “Why attack a static website? Static isn't necessarily an insurmountable challenge?”

Certainly, “activating a static website” refers to utilizing a CDN (Content Delivery Network) instead of relying on a global CDN like EO/ESA. Due to the high cost of bandwidth within China, and the fact that EO/ESA offers free services, the protective capabilities are significantly diminished compared to large international providers such as Cloudflare. As demonstrated previously, attackers can indeed **killEO/ESA** to render their website unavailable for a period. Conversely, without any proactive measures, CDN platforms may perceive our usage as excessive resource consumption, potentially leading to domain blocking or expulsion, complicating subsequent remediation efforts.

- Is this not a WAF (Web Application Firewall) being implemented, such as geo-blocking or rate limiting? Are these rules merely a formality?

To address this question, we first need to understand the purpose of a WAF. In general, a website should be designed with a secure foundation, utilizing Content Delivery Networks (CDNs) to mitigate most malicious requests and ensure that only legitimate traffic reaches the origin server. For example, if your origin server hosts high-resolution, uncompressed video content, you can implement rate limiting, restricting each IP address to only one request per second, thereby preventing malicious requests from accessing this content. However, we are static – lacking a traditional origin server – or the origin server is entirely reliant on the CDN. All inbound requests, regardless of their validity, are directly routed to the CDN, which then acts as the final point of contact for any attempts to reach our domain’s services. While measures like international blocking and rate limiting can be implemented, these are typically handled at Layer 7 (L7) – the application layer – and attackers can still bypass these defenses by establishing direct TCP connections to L4 layers within the CDN infrastructure.  Only through effective control of the CDN's L4 WAF and stringent WAF rules can we realistically prevent a successful attack from reaching our domain’s services.

- Here’s a professional translation of the text:  “Why is Cloudflare being considered as a target? While attackers often focus on CDN providers, Cloudflare's architecture and security measures are designed to withstand such attacks. It’s not simply about defending against DDoS; it’s a comprehensive approach to network resilience.”

Here’s the translation:  Cloudflare has successfully defended against over 22.2 Tbps of attacks, making it a relatively minor challenge for our traffic flow. Details can be found at https://x.com/Cloudflare/status/1970244046946759024, [Cloudflare 2025 Annual Third Quarter DDoS Threat Report – Including Top Attackers Aisuru](https://blog.cloudflare.com/ddos-threat-report-2025-q3/?utm_source=chatgpt.com/)

- Here’s the translation:  “I have a website and I need to determine how to mitigate such severe Distributed Denial of Service (DDoS) attacks.”

Here’s the translation:  “Don’t let attackers perceive you as a valuable target, or as a game. If you don’t engage them, you won’t be taken advantage of.”

---

# Attack Reports

We recently transitioned to Cloudflare, prior to that we utilized EdgeOne/ESA.

### Cloudflare.

![](../../assets/images/review-ddos-6.png)

![](../../assets/images/review-ddos-7.png)

![](../../assets/images/review-ddos-8.png)

![](../../assets/images/review-ddos-9.png)

### ESA

![](../../assets/images/review-ddos-10.png)

![](../../assets/images/review-ddos-11.png)

---

# Final assessment and review.

Following four months of intense conflict, the following key takeaways have been identified:

1. **Free Domestic CDN Does Not Prevent DDoS Attacks**：Even with well-crafted WAF rules, a CDN will not terminate your service during an attack. However, the website remains unavailable during the attack due to the inherent downtime associated with TCP handshakes.  Without L4 authorization to drop the attacker's connection at the TCP layer, L7 WAF rules offer limited effectiveness against this type of large-scale distributed attacks.

2. Here’s the translation:  “The risk of a compromised CDN, particularly in poorly secured CDNs, is exceptionally high for purely static websites.”

3. **This attack level is unprecedented, and the current solution is to switch to Cloudflare CDN.** Because Cloudflare’s scale is sufficient to withstand such a massive DDoS attack and guarantee SLA, Cloudflare has successfully defended against attacks of 22.2 Tbps. This level of threat is simply unmatched for this magnitude.

4. Here’s the translation:  “Readers are largely unconcerned about their websites being targeted. Such sophisticated attacks are clearly organized and targeted, incurring a substantial cost and practically impossible to launch broadly. Standard websites lack any inherent value in terms of vulnerability; they are simply not susceptible to such deliberate attacks unless someone like the author is actively targeted.”