---
title: "A post-injury review is in order!"
description: "Since November 25, 2023, this website has experienced continuous and sustained attacks totaling several hundreds of Terabytes (TiB), with peak attack rates reaching 6.8 Gbps. Furthermore, the attackers have transitioned from initial brute-force attacks originating in India to increasingly sophisticated attacks originating from mainland China. Today, we will discuss the motivations behind these attacks and what attackers seek, as well as strategies for mitigating Distributed Denial of Service (DDOS) threats."
published: 2026-02-10
image: ../../assets/images/review-ddos-5.png
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Please provide the text you would like me to translate.

The initial use of the static architecture prevented malicious actors from launching DDoS attacks.

The attack traffic is distributed across the edge nodes of a CDN, which effectively represents the attack on the entire CDN provider.

It’s difficult to kill, and it’s unnecessary, as there is no backend for static websites and doesn't involve any interests – simply a waste of time.

DDOS attacks are typically targeted at individual IP addresses, as they are generally focused on a single server. Operating a website requires purchasing a server and running services on it, ultimately making the system accessible to the public.

If there is no high-level protection, and no CDN, there are many free DDoS attacks that can easily kill an IP address.

However, this website situation is very different; it’s a static website directly answered by CDN.

![](../../assets/images/review-ddos.png)

Attack the website.

It’s almost impossible.

From a macro perspective, CDN is used to clean traffic and filter malicious traffic, then release clean traffic to source servers.

But if it’s a static website?

It has no source; every request is treated as a valid request and responded to by CDN.

So, if someone gets CDN, that’s a self-inflicted wound – I really don't need to get involved.

But really?

The attacker’s purpose isn't to **killCDN**.

The situation has become interesting.

Okay, please provide the text. I’m ready when you are.

# First major attack: 6.65TB traffic surge

The content was recorded on December 16, 2025, as the first major DDoS attack against this website.

On December 16, 2025, at 11:13 AM, I was testing with a friend. He forgot a key point during our test project, so I suggested he check my blog instead. However, we were informed that the blog's access status code is **570**.

I immediately tested my blog website at https://acofork.com and found that most nodes are in the **570** status code state.

![](../../assets/images/4f3b8517527460574d03479cc64655be.webp)

Because my website was deployed on **EdgeOne**

The status code is a **Single Node Limited Frequency Access**.

![](../../assets/images/5082a73ffa31ee435c9c7894263ae4cd.webp)

My friend even joked that: “Your website is heating up!”

![](../../assets/images/ddos-6t-1.webp)

However, the situation appears strangely unsettling – why is it that overseas countries are all experiencing a high level of approval?

I’m starting to doubt that I’ve been wronged.

![](../../assets/images/ddos-6t-2.webp)

It’s possible to get stuck playing static for too long, without checking the request count and traffic on **EdgeOne** before. It's not a fun activity!

I went home for a while, briefly interrupting my logic.

- EdgeOne Pages offers direct services, but 570.
- Edge One CDN Cloudflare Pages

After completing the process, it’s slow but I’m going to sleep.

## The truth has been revealed.

Upon waking, I found myself increasingly perplexed, so I climbed onto the EdgeOne Pages control panel, and then I saw that it was a very large thunderstorm.

![](../../assets/images/2f4df8e383a1b41625ad02eb70375465.webp)

![](../../assets/images/50480865cd7f11d7cc4b495bcbc48038.webp)

![](../../assets/images/30bb8ddb905b6de8181d60ddf1b69dbe.webp)

![](../../assets/images/01f15a24f395a3731010c8046cb2008c.webp)

The ESA defense system seems quite robust, as I received a message from Alibaba shortly after I’ve gone through it.

![](../../assets/images/9318872dc53b38334312619b2373c81e.webp)

Please provide the text you would like me to translate.

![](../../assets/images/5b3bcf42d0e4f73fbe031699a291a5c2.webp)

![](../../assets/images/c4b6bdd2c39ae7585b9d3ecc5dbe9c6d.webp)

Still familiar with Indonesia.

![](../../assets/images/5a86eb051d48615259e8dcecb0fe8185.webp)

I’ve given up, and I completed the process of switching to Cloudflare Pages within 10 minutes.

![](../../assets/images/ddos-6t-3.webp)

Cloudflare Pages also looks quite lush.

![](../../assets/images/image_2025-12-16_08-24-54.webp)

I received a video on Bilibili that was damaged.

I went! The big one arrived!

![](../../assets/images/Screenshot_2025-12-16-08-08-33-65_149003a2d400f6a.webp)

## The attack summary is presented.

![](../../assets/images/d16b7b134dec1224dcfc16e59a21942f.webp)

![](../../assets/images/3c33b054a3180932ae87bea8bd06c3ed.webp)

The platform has experienced the largest DDoS attack since its launch, with a total traffic volume of 6.65 TB and peak instantaneous bandwidth of 1.95 GB/s.

The primary business operations for [ACOFORK.COM] are redirected to [2X.NZ], and all business operations utilize Cloudflare CDN.

Okay, please provide the text. I’m ready when you are.

# Dead horse again, hit ESA again.

After Cloudflare’s attack subsided, the website returned to normal access.

But I have a nagging feeling – I’ve got registered domain names, isn't it a bit frustrating not to use domestic CDN?

Domestic CDN offers exceptionally fast speeds for domestic visitors. Cloudflare, while possessing strong protection capabilities, does not match the speed of domestic CDNs.

After a lot of deliberation, I made the decision to “go back to ESA (Aliyun All-in-One Acceleration)” – again.

Domestic visitors will be answered by ESA using a domestic IP address, while international visitors will be answered by CF. Simultaneously, ESA has configured L7 overseas blocking – if forced through an overseas IP address to access ESA, the request will be blocked.

![](../../assets/images/review-ddos-2.png)

At first, I thought that this would be a good way to balance speed and protection, but things have turned out to be much more complicated.

Okay, please provide the text. I’m ready when you are.

# The protracted battle lasted four months.

## Attack escalation: domestic IP attack

At the time of the attack, the attacker did not abandon their strategy; instead, they changed tactics – **began using a large number of domestic IP addresses for attacks**.

Due to the lack of a single, unified approach to protecting against attacks on domestic visitors accessing CDN content, this type of attack is virtually impossible to effectively mitigate at L7 level.

![](../../assets/images/review-ddos-3.png)

Attackers have amassed so many domestic IP addresses for a variety of reasons. Is it simply money spent? Let’s examine the majority of traffic and its potential origins – UA (though it can be spoofed).

Many of these are BT downloaders, potentially related to recent attacks involving [React/NextJS - NVD - CVE-2025-55182](https://nvd.nist.gov/vuln/detail/CVE-2025-55182) and [FnOS - Important security updates notifications](https://mp.weixin.qq.com/s/LzkLcy92m5O24up_9c4NUA). Attackers may have launched attacks originating from public networks using compromised, unpatched vulnerabilities.

![](../../assets/images/review-ddos-12.png)

We are in a precarious situation, with almost no options available due to the sheer volume of attack sources. Although we’ve been temporarily restricted by rate limits, the IP addresses involved have triggered the restrictions, and we continue to achieve hundreds of T/S daily.

I disabled the HTTP/2 protocol on the domestic CDN, as H2 can be used for connection reuse and is vulnerable if it’s not supported. This makes it more difficult for attackers to scrape traffic through H1 or H1.1, as each HTTP connection consumes a separate original TCP connection. I believe this approach will make it harder for attackers to consistently pull traffic from a single source IP address, but it may not be effective in the long term.

The website became inaccessible when all users were unable to open it, but I had already exhausted all options.

## Attack propagation: API has also been targeted

The attacker has shifted their focus to other APIs, such as Umami and random images.

Soon EdgeOne blocked the domain name for random images, so I had to find another way to resolve it.

![](../../assets/images/review-ddos-4.png)

I’ve temporarily bypassed a proxy to avoid being blocked by ChatGPT for domain name restrictions, but any business using this API will need to synchronize its changes once the API domain is updated. This has taken up a considerable amount of effort.

The repeated attacks on domain names, followed by domain blocking and service termination, is becoming increasingly tiring.

Fan groups are also discussing.

![](../../assets/images/Screenshot_2026-02-10-12-01-36-17_9d26c6446fd7bb8.jpg)

Unfortunately, direct access to and through domestic CDN networks can be unreliable, even though users within China experience superior performance. However, any disruption will result in complete inability to connect, regardless of speed.

## Migration to Cloudflare

The website’s core and all other APIs have been migrated to Cloudflare, despite ongoing attacks from persistent attackers. Despite the effort required, Cloudflare remains unaffected.

![](../../assets/images/review-ddos-5.png)

Okay, please provide the text. I’m ready when you are.

# The difficulty of solving these problems is a significant challenge for many students. A thorough understanding of the underlying concepts and effective problem-solving strategies are crucial for success. Students often struggle with applying theoretical knowledge to practical scenarios, requiring them to develop critical thinking skills and the ability to analyze complex situations. Furthermore, time management and attention to detail are essential when tackling challenging problems. Effective revision and practice are vital for reinforcing learned material and improving performance.

“There are many more contents that have not been said, but they cannot be combined into a single question format.”

- Why am I only targeted by you? Why hasn’t my website been targeted?

Because I’m a streamer, getting hit can be unsettling, but it's also very adorable.

- Why attack a static website? Static isn't impossible to defeat!

Certainly, here’s the translation:  “Using a domestic CDN like EO/ESA, it's well-known that bandwidth in China is extremely expensive, and EO/ESA itself offers free services. Consequently, the protection level against attacks is significantly weaker than that of large international providers like Cloudflare. As previously noted, attackers can indeed **killEO/ESA** to prevent them from providing your website with service for a period of time. However, if we do not take any protective measures, the CDN platform may consider us abusing resources and subsequently block or delete domains, making it more difficult to implement remediation efforts later on.”

- Is this WAF (such as overseas blocking, rate limiting, etc.) not already implemented? Are these rules just a formality?

The website is vulnerable, and CDNs typically intercept most malicious requests, leaving only normal requests to reach the origin server. Like having high-definition, unencoded videos on a site, you can implement rate limiting to prevent single IP addresses from requesting the video repeatedly, thereby preventing the malicious requests from reaching your origin server. However, we are static – without a source or CDN – and all requests, whether valid or invalid, are directly sent to the CDN, which is the origin server itself. Even if we implement extensive WAF rules and rate limiting at the L7 layer, attackers can still establish TCP connections to the CDN's L4 layer to force the CDN to block our domain’s services.  Only by controlling the CDN’s L4 WAF and setting strict WAF rules can we potentially escape the inevitable doom of being terminated.

- Why is Cloudflare necessary? It’s not about attackers attacking CDN, Cloudflare wouldn't be taken down?

Cloudflare successfully deflected over 22.2 Tbps of attacks, which was a trivial matter for our traffic, as detailed in: https://x.com/Cloudflare/status/1970244046946759024, [Cloudflare 2025年第三季度DDoS威胁报告——包括僵尸网络的顶尖攻击者Aisuru](https://blog.cloudflare.com/ddos-threat-report-2025-q3/?utm_source=chatgpt.com/)

- I also have a website; how can I avoid such terrifying Distributed Denial of Service (DDOS) attacks?

Don’t let them think you’re worth attacking, or they won’t bother you.

Okay, please provide the text. I’m ready when you are.

# All attack reports

We are recently transitioning to Cloudflare, having previously used EdgeOne/ESA.

### Cloudflare

![](../../assets/images/review-ddos-6.png)

![](../../assets/images/review-ddos-7.png)

![](../../assets/images/review-ddos-8.png)

![](../../assets/images/review-ddos-9.png)

### ESA

![](../../assets/images/review-ddos-10.png)

![](../../assets/images/review-ddos-11.png)

Okay, please provide the text. I’m ready when you are.

# Final review.

After four months of intense combat, the following key takeaways emerged:

1. Free domestic CDN will not clear you if it’s configured with a WAF, but the website will remain down during an attack. Unless we have L4 permissions to drop the attacker's connection at the TCP handshake layer, the L7 WAF rules are ineffective against this large-scale distributed attack.

2. If deployed on a poorly protected CDN, the risk of downtime is extremely high. Prolonged traffic from large-scale attacks can lead to CDN purging.

3. Due to Cloudflare’s massive size, it can withstand this unprecedented level of DDoS attacks and guarantee SLA. Cloudflare has successfully defended against 22.2 Tbps of attacks in the past, making this scale of attack completely unprecedented.

4. Readers are unlikely to be concerned about their websites being attacked in this scale. The cost of such attacks is extremely high and practically impossible to use for widespread attacks. Ordinary websites have no value in terms of being targeted, unless they’re actively ‘followed’ by the author.