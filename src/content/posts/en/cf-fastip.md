---
title: "Try Cloudflare IP Priority! Let Cloudflare no longer be a speed reducer in China!"
description: "Use SaaS, Worker, and various tricks to route traffic based on the IP resolving your website, optimizing for availability and speed."
category: "Tutorial"
draft: false
image: ../../assets/images/cf-fastip-11.webp
lang: en
published: 2026-01-11
tags:
  - Cloudflare SaaS
  - Cloudflare Byoip
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This tutorial explains how to optimize website performance by selecting faster Cloudflare nodes within China. It covers methods like using SaaS or Worker routes to manually control DNS and routing rules, bypassing default Cloudflare IPs that often suffer from high latency. The guide also introduces Cloudflare Byoip (Bring Your Own IP) as an alternative for better performance, with caveats about maintenance and reliability.
:::

> This tutorial was initially published in June 25.

#### Not preferred

![QmZoinxZgAzu7Skh7BqsxmDQGU1sXtLLskJcyQuRAQNKww.webp](../../assets/images/098f9ee71ae62603022e542878673e19bdcaf196.webp)

#### Already preferred

![](../../assets/images/cf-fastip-11.webp)

---

# What is the preferred option?

In simple terms, **Choosing the preferred option means selecting a Cloudflare node with faster access speed from within China**.

The Cloudflare IPs officially assigned to us often exhibit higher latency and even accessibility issues when accessed from within China. By using our preferred option, we can manually resolve the domain to Cloudflare IPs that offer faster access from within China, thereby significantly improving website speed and availability.

From the comparison chart above, it can be seen that the selected websites have significantly improved response speeds and a greater number of outbound IPs. This greatly enhances your website's availability and noticeably speeds up loading times.

To achieve optimal performance, we need to accomplish two things: **control routing rules ourselves** and **control DNS resolution ourselves**. Through Cloudflare SaaS or Workers routing, we can achieve both simultaneously, which will be explained in detail below.

---

# Principle of Optimization

First, we need to understand how CDN delivers different content through different domains.

We can abstract this into two layers: **Rule Layer** and **Resolution Layer**. When we normally add a DNS record with the "Cloudflare" flag enabled in Cloudflare, Cloudflare performs two tasks for us:

1. Help us write a DNS record pointing to Cloudflare.
2. Create a routing rule in Cloudflare

If you want optimal performance, you are essentially manually changing this DNS resolution to point to a faster Cloudflare node.

However, once you disable the small yellow cloud, the routing rules will also be deleted, and upon re-access, DNS will directly point to the IP—making it unusable.

**The emergence of SaaS and Worker routing has changed all of this.**

After using SaaS, Cloudflare no longer helps you with these two things, both of which you can now handle yourself:

1. You can write your own SaaS rule (rule layer) yourself.
2. You can write your own CNAME record pointing to the preferred node (resolution layer).

Similarly to Worker routing, once you create Worker routing rules, DNS resolution can point to any preferred node at will.

This is why traffic routed through SaaS or Worker can be prioritized.

---

# Choose your preferred domain name

The core of optimization is to select a Cloudflare node IP or domain with faster access speed domestically.

## Traditional preferred domain names

Commonly used community preferred domain: https://cf.090227.xyz

These preferred domain names are typically compiled by scanning Cloudflare's official IP ranges to identify the IPs with the lowest latency within China.

## Cloudflare Byoip Preferred

> Still using traditional BYOIP? Take a look at Cloudflare BYOIP!

### What is Byoip?

Cloudflare Byoip (Bring Your Own IP) allows users who own their own IP address or IP range to host it with Cloudflare and benefit from Cloudflare's global network for acceleration and security.

In plain terms, some IPs are not directly owned by Cloudflare, but after we CNAME to these IPs, we can still access our services deployed on Cloudflare normally. These IPs may not be Anycast, but their latency within China might be noticeably better than Cloudflare's official IP segments.

### How to find Cloudflare Byoip?

You can visit [AS209242 Cloudflare London, LLC details | Ipregistry](https://ipregistry.co/AS209242#ranges)

Try using ITDog to forcibly bind IP access to your Cloudflare service, ensuring it does not return a 403.

> Returning a 404 here is normal, because r2.afo.im directly connects to Cloudflare R2 object storage, and direct access results in a 404.

![](../../assets/images/838f685e-3913-4b21-995e-5ee149f4bffa.webp)

### [[X:content]]

Some Byoip may forcibly redirect to their own websites. Check ITDog's test logs to see if there is any redirection; don't let your website become a traffic source for others.

### Can it be used for a long time?

These BYOIP ranges are indeed better quality than Cloudflare's official IP ranges, but if you really intend to use them, set up a machine to periodically filter out unusable IPs, and also add some Cloudflare official IP ranges to prevent your service from going down.

---

# Various preferred solutions

## Worker project preferred (simplest)

If you need to prioritize the Page/Worker project:

First, if you are Page, convert the project to Worker; simply AI it out.

Next, write the Worker routing, directly fill in `your domain + /*`

![](../../assets/images/cf-fastip.png)

Finally, write a DNS record pointing to the desired preferred domain, and that's it!

![](../../assets/images/cf-fastip-1.png)

No need to mess with SaaS, no need for multiple domains—just that simple!

---

## Worker routing reverse proxy globally and preferentially (advanced)

> The principle of this method is to have the Worker act as a reverse proxy for your origin, then select the optimal entry node of the Worker. This method is not traditional optimization; the origin server still receives the Host header directly pointing to the origin's resolved address.

Create a Cloudflare Worker and write the code:

```js
// 域名前缀映射配置
const domain_mappings = {
  '源站.com': '最终访问头.',
//例如：
//'gitea.072103.xyz': 'gitea.',
//则你设置Worker路由为gitea.*都将会反代到gitea.072103.xyz
};

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const current_host = url.host;

  // 强制使用 HTTPS
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return Response.redirect(url.href, 301);
  }

  const host_prefix = getProxyPrefix(current_host);
  if (!host_prefix) {
    return new Response('Proxy prefix not matched', { status: 404 });
  }

  // 查找对应目标域名
  let target_host = null;
  for (const [origin_domain, prefix] of Object.entries(domain_mappings)) {
    if (host_prefix === prefix) {
      target_host = origin_domain;
      break;
    }
  }

  if (!target_host) {
    return new Response('No matching target host for prefix', { status: 404 });
  }

  // 构造目标 URL
  const new_url = new URL(request.url);
  new_url.protocol = 'https:';
  new_url.host = target_host;

  // 创建新请求
  const new_headers = new Headers(request.headers);
  new_headers.set('Host', target_host);
  new_headers.set('Referer', new_url.href);

  try {
    const response = await fetch(new_url.href, {
      method: request.method,
      headers: new_headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      redirect: 'manual'
    });

    // 复制响应头并添加CORS
    const response_headers = new Headers(response.headers);
    response_headers.set('access-control-allow-origin', '*');
    response_headers.set('access-control-allow-credentials', 'true');
    response_headers.set('cache-control', 'public, max-age=600');
    response_headers.delete('content-security-policy');
    response_headers.delete('content-security-policy-report-only');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response_headers
    });
  } catch (err) {
    return new Response(`Proxy Error: ${err.message}`, { status: 502 });
  }
}

function getProxyPrefix(hostname) {
  for (const prefix of Object.values(domain_mappings)) {
    if (hostname.startsWith(prefix)) {
      return prefix;
    }
  }
  return null;
}
```

Create route:

![](../../assets/images/56752d54-26a5-46f1-a7d9-a782ad9874cb.webp)

Fill it out like this:

![](../../assets/images/d025398c-39e3-4bd7-8d8f-2ce06a45007d.webp)

Finally, add one DNS record `CNAME gitea.afo.im --> preferred domain`

---

## Traditional SaaS Preferred Choice

### What does SaaS do?

Cloudflare SaaS allows you to benefit from Cloudflare's network features without needing to change the NS servers of your domain.

When a domain is SaaSed to a domain already on Cloudflare, it fully benefits from all Cloudflare services. For example, if I SaaS umami.acofork.com to 2x.nz, I can write rules for umami.acofork.com within 2x.nz:

![](../../assets/images/cf-saas-1.webp)

![](../../assets/images/cf-saas-2.webp)

![](../../assets/images/cf-saas-3.webp)

The routing rules in Worker are also applicable:

![](../../assets/images/cf-saas-4.webp)

### SaaS Selection Preferred Steps

> Simple and easy to understand (pro.yourdomain.com is the final access domain).
> CF SaaS DNS
> origin.yourdomain.com -> Source site enables yellow cloud
> cdn.yourdomain.com -> cf preferred domain
> pro.yourdomain.com -> cdn.yourdomain.com
> 
> CF SaaS
> Add a custom hostname pro.yourdomain.com
> The origin is origin.yourdomain.com

> [!WARNING]
> Cloudflare recently set the default SSL for newly added domains to "Strict," remember to change SSL to "Flexible."
> ![](../../assets/images/cf-fastip-1.webp)

#### Preparations

We need **one domain or two domains** (for a single domain, a subdomain will suffice. For two domains, for example: onani.cn and acofork.cn).

> **If it is not available under the same CF account, please try placing the two domains under different accounts**

Here, we make onani.cn the primary domain and acofork.cn the secondary domain.

Single-domain effect:

![](../../assets/images/cf-fastip.webp)

#### Specific steps

1. First, create a new DNS record pointing to your **source server**, **enable Cloudflare proxy**
   ![QmfBKgDe77SpkUpjGdmsxqwU2UabvrDAw4c3bgFiWkZCna.webp](../../assets/images/c94c34ee262fb51fb5697226ae0df2d804bf76fe.webp)

2. Go to **auxiliary domain** SSL/TLS -> Custom Hostname. Set the fallback source to the domain you just resolved via DNS: xlog.acofork.cn (recommended **HTTP verification**).

3. Click to add a custom hostname. Set a custom hostname, such as `onani.cn`, and then select **Custom Source Server**, filling in the domain from Step 1, which is `xlog.acofork.cn`.

If you want to create multiple preferred options, simply add them, with one custom hostname corresponding to one custom source server. If you set the source server as default, it becomes the fallback source, specified as `xlog.acofork.cn`

   ![QmRYrwjeDMDQCj8G9RYkpjC3X4vpwE77wpNpbqKURwBber.webp](../../assets/images/f6170f009c43f7c6bee4c2d29e2db7498fa1d0dc.webp)

4. Add another record to your auxiliary domain. CNAME to the preferred node: cloudflare.182682.xyz, **Do not enable CF proxy**
   ![QmNwkMqDEkCGMu5jsgE6fj6qpupiqMrqqQtWeAmAJNJbC4.webp](../../assets/images/4f9f727b0490e0b33d360a2363c1026003060b29.webp)

5. Finally, add the DNS record for your primary domain. The domain name should be the custom hostname previously set up on the secondary domain (onani.cn), and the target should be the CDN domain you just configured (cdn.acofork.cn), **Do not enable Cloudflare proxy**.
   ![QmeK3AZghae4J4LcJdbPMxBcmoNEeF3hXNBmtJaDki8HYt.webp](../../assets/images/6f51cb2a42140a9bf364f88a5715291be616a254.webp)

6. After preferred selection is completed, ensure the preferred selection is effective, then attempt to access.
   ![](../../assets/images/cf-fastip-10.webp)

7. (Optional) You can also change the NS servers of the CDN subdomain to Alibaba Cloud / Huawei Cloud / Tencent Cloud DNS for line-based traffic distribution.

> Preferred workflow: User access -> Due to the CNAME resolution set for the final accessed domain, the actual access is to cdn.acofork.cn, carrying **Source hostname: onani.cn** -> Reaches the preferred domain for preferred routing -> Preferred routing ends, and the Cloudflare edge node identifies the carried **Source hostname: onani.cn** query and discovers the fallback source -> Falls back to the fallback source content (xlog.acofork.cn) -> Access succeeds

---

# Regarding Cloudflare Page

1. You can directly change the NS servers of the subdomain bound to Page to Alibaba Cloud / Huawei Cloud / Tencent Cloud DNS for traffic splitting resolution.

2. Upgrade your Page project to a Worker project using the Worker preferred solution (simpler). Detailed steps are available at: 【CF Page one-click migration to Worker? What are the benefits? - Bilibili】 https://www.bilibili.com/video/BV1wBTEzREcb

# Regarding Cloudflare Workers

1. Add routes in Workers, then directly change your route domain from pointing to `xxx.worker.dev` to your preferred domain.
2. If it's an external domain, you can simply add a route after SaaS, just like:
   ![](../../assets/images/cf-fastip-12.webp)

![](../../assets/images/cf-fastip-13.webp)

# Regarding Cloudflare Tunnel (Zero Trust)

Please first refer to [SaaS](#传统saas优选) to complete the setup, with the origin being the Cloudflare Tunnel. Simply proceed with the normal SaaS integration:

![](../../assets/images/cf-fastip-3.webp)

![](../../assets/images/cf-fastip-2.webp)

Next, we need to ensure that traffic from **final accessed domain** is correctly routed to the Cloudflare Tunnel; otherwise, if the hostname is not found in the Tunnel during access, it will trigger the **catch: all** rule, making access impossible. Then, create another Tunnel rule with the domain name **your final accessed domain**, and specify the origin server to match the previous one.

![](../../assets/images/cf-fastip-3.png)

Finally, add a DNS record with a CNAME pointing from `umami.2x.nz` to **your preferred domain**.

---

# For websites that use various CF rules

You only need to make the rules apply to your **final access domain**, because Cloudflare's rules look at the hostname, not who provides it.

# Regarding virtual hosting

For safety, it is recommended to bind both the source site and the preferred domain to your virtual host simultaneously, ensuring connectivity before deleting them one by one.