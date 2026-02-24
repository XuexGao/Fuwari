---
title: "How to Set Up Website Traffic Distribution? Global Instant Access! A Bit Like Being in Prison, But Fun!"
description: "Website traffic splitting looks difficult, but in reality, it's not simple at all. If you're also interested (and want to go to jail), come try it out, 8!"
published: 2026-01-12
image: ../../assets/images/fenliu.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article details a comprehensive website traffic splitting setup for blog.acofork.com and its associated domains, using CDNs like EdgeOne, ESA, and Cloudflare. It covers SSL certificate acquisition methods, source server configurations (static vs. dynamic), browser-based server detection, and critical operational notes including CDN limitations, DNS routing, and security best practices like enabling overseas blocking for domestic nodes. The setup ensures optimal performance and security across regions while maintaining automated SSL management and flexible routing.
:::

# Websites requiring traffic diversion
Blog itself, main site
::url{href="https://blog.acofork.com"}
Umami, used to insert a JS on a website for visitor statistics and displaying visitor information
::url{href="https://umami.acofork.com/share/CdkXbGgZr6ECKOyK"}
Static random image, used as the cover for pinned articles and as the background image for the entire website.
::url{href="https://pic1.acofork.com"}

---
Others: https://acofork.com, https://www.acofork.com
These are all domains that need to be redirected to https://blog.acofork.com via a **301** redirect, and we also need to configure load balancing for them.

# Various CDN SSL application solutions

### EdgeOne

Since NS is directly on EdgeOne, apply directly.
![](../../assets/images/fenliu-1.webp)
### ESA
Use DCV delegation
![](../../assets/images/fenliu-2.webp)
### Cloudflare
Using HTTP validation, since the ACME validation server is located overseas, it will only see the CNAME record pointing to Cloudflare, thereby issuing the SSL certificate.
![](../../assets/images/fenliu-3.webp)
For domains with redirects, since all requests are by default redirected to the new domain, ACME cannot verify. Therefore, we need to write an exclusion rule that allows ACME verification paths to directly return a 200 OK, while other paths are redirected.
![](../../assets/images/fenliu-17.webp)

# Source type

### Static type

For domestic use, the Page service utilizes the corresponding CDN; for overseas use, Cloudflare Worker is employed. As for why `blog.acofork.com` is not also placed on EdgeOne Page, one reason is that the WAF rules for EdgeOne CDN and Page are separate, and the WAF rules for Page services are not well-suited for overseas blocking. Another reason is that EO previously blocked this subdomain when it was under attack. In contrast, ESA Page can easily implement overseas blocking.
![](../../assets/images/fenliu-4.webp)

![](../../assets/images/fenliu-5.webp)

![](../../assets/images/fenliu-16.webp)
### Dynamic type

Domestic use of IPv6 for backsource (user - IPv4 - EO/ESA CDN - IPv6 - origin server). As for why ESA is not used, it is because ESA CDN requires non-standard ports for backsource, which necessitates writing a backsource rule similar to Cloudflare, consuming one of the five free rule slots.
![](../../assets/images/fenliu-6.webp)
Overseas adoption of Cloudflare Tunnel (User - IPv4 - CF CDN - Internal Connection - Origin Server)
![](../../assets/images/fenliu-7.webp)

# Browser client implements monitoring of the currently visited node

Use browser JavaScript to send a HEAD request to retrieve the Server field from the remote response headers and display it (if cross-domain, set the **Access-Control-Expose-Headers** response header with the value **server**
![](../../assets/images/fenliu-12.webp)

![](../../assets/images/ae6f93ce318fa428e94256c2b4a501e1.webp)

# [[X:content]]

- ESA Page has poor support for excessive resources and large files. For example, the Static Random Graph project cannot be deployed to ESA Page (exceeds 2000 static assets).
- ESA CDN requires configuring back-source rules for non-standard ports, similar to Cloudflare, which is inefficient and wastes rules. It is recommended to use EdgeOne CDN, which allows you to specify the back-source port freely.
![](../../assets/images/fenliu-8.webp)
- If you want to do traffic splitting, you must host the domain's NS records with a domestic DNS resolution service provider, because Cloudflare does not support domain traffic splitting resolution, and please set the default resolution to CF and the domestic resolution to domestic nodes; do not reverse this.
![](../../assets/images/fenliu-9.webp)
- The principle of is that DNS checks the source IP of the query; if it's domestic, it returns a domestic node, and if it's overseas, it returns an overseas node. In other words, your exit IP determines which node you access. If you use a VPN (e.g., in the United States), even if you are physically located in China, you will still access an overseas node.
- Only one DCV delegation is allowed. If your NS is in EO, you can set the DCV to ESA, and since Cloudflare uses HTTP verification, everything will be one-time and fully automated.
- When integrating external domains with Cloudflare SaaS, it is highly recommended to choose HTTP validation for issuing SSL certificates. The following section will detail the advantages of this validation method. We all know that, when Cloudflare SaaS is initially created, the default SSL application option is TXT validation, but this method is not ideal. While TXT validation can indeed issue certificates, after three months (following the expiration of the previous SSL certificate), we must promptly update the TXT records to reapply for a new SSL certificate. However, with HTTP validation, Cloudflare CDN automatically places the HTTP validation file on edge nodes, and Cloudflare can modify it at any time. Thus, you do not need to take any action when applying for a new SSL certificate—everything is automatically handled by Cloudflare.
- After Cloudflare SaaS integrates an external domain, all services available under a single Cloudflare domain (including Cloudflare Workers, see: [Cloudflare Worker](/posts/cf-fastip/#%E9%92%88%E5%AF%B9%E4%BA%8Ecloudflare-workers/)) can be enjoyed for that external domain. You can also configure rules and other business settings; when you ultimately access a domain, write the corresponding hostname, do not write the fallback source's hostname, unless you want the rule to only take effect when directly accessing the fallback source.
![](../../assets/images/fenliu-11.webp)

![](../../assets/images/fenliu-10.webp)
- Cloudflare Tunnel can actually be customized to work with specific domains, not limited to domains within the account (although it may appear that way in the console). We can achieve various domains by modifying the request body through packet capture; it does not undergo verification. See: [Cloudflare Tunnel](/posts/cf-fastip/#%E9%92%88%E5%AF%B9%E4%BA%8Ecloudflare-tunnelzerotrust/)
![](../../assets/images/fenliu-13.webp)
- After completing the traffic diversion, you must enable the "block overseas" mode for domestic nodes. This greatly reduces the probability that your CDN provider will revoke your domain's access due to a DDoS attack. Cloudflare is fine, as it's nearly indestructible; if your origin server can't handle it, please configure some protection strategies. Because attackers (DDoS initiators) can forcibly bind your domain and IP to use cheap, high-capacity overseas IPs to attack your vulnerable domestic nodes. If you don't implement any protection, you may be hit with several TB of abnormal traffic and subsequently have your CDN access revoked.
![](../../assets/images/fenliu-14.webp)

![](../../assets/images/fenliu-15.webp)
# Exhibition of Achievements

### Blog ontology

![](../../assets/images/https___blogacoforkcom__多地区多线路HTTP测速(1).webp)
### Umami
![](../../assets/images/https___umamiacoforkcom__多地区多线路HTTP测速.webp)
### Random graph
![](../../assets/images/https___picacoforkcom__多地区多线路HTTP测速.webp)