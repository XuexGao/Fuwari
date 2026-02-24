---
title: "Cloudflare IP Advantage! Make Cloudflare a speed booster in Russia again!"
description: "Using SaaS platforms, worker bots, and various innovative techniques, we can optimize website IP addresses for routing and prioritization, thereby enhancing website availability and speed."
category: "Tutorial"
draft: false
image: ../../assets/images/cf-fastip-11.webp
lang: en
published: 2026-01-11
tags:
  - Cloudflare SaaS
  - Cloudflare Byoip
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

Here’s the translation:  “This tutorial was initially released on June 25, 2025.”

#### No selection is preferred.

![QmZoinxZgAzu7Skh7BqsxmDQGU1sXtLLskJcyQuRAQNKww.webp](../../assets/images/098f9ee71ae62603022e542878673e19bdcaf196.webp)

#### Selected.

![](../../assets/images/cf-fastip-11.webp)

---

# What is the ‘Favor’ option?

In essence, **Selecting a domestic Cloudflare node offers faster speeds than accessing from international locations**.

Here’s the translation:  “Cloudflare provides a dedicated IP address for our users within Russia.  Accessing websites from within Russia often experiences higher latency, and in some cases, may result in inability to access the site. Utilizing Optimizely allows us to manually configure domain names to utilize Cloudflare's faster IPs, significantly improving website performance and availability.”

Based on the comparison chart, the selection of websites has experienced a significant improvement in response time, and the export IP address has increased. This enhances website availability and dramatically speeds up loading times.

To achieve optimal routing, we need to accomplish two key objectives: **self-control of routing rules** and **self-control of DNS resolution**. Utilizing Cloudflare SaaS or Worker routes, we can simultaneously implement these features. Detailed explanations will follow.

---

# Preferred principles

First, we need to understand how Content Delivery Networks (CDNs) distribute content across different domains and provide varying levels of performance for different users.

We can abstract this into two layers: [[Rule Layer]] and [[Parse Layer]]. When you add a simple parsing rule to Cloudflare, Cloudflare will perform two things for us:

1. 帮我们写一条DNS解析指向Cloudflare
2. In Cloudflare, create a routing rule.

If you’re seeking a faster DNS resolution, you are actually manually adjusting the DNS record to point to a Cloudflare node.

However, once you disable the small cloud, routing rules will also be deleted, and subsequent access will display a direct IP address to DNS – rendering it unusable.

Here’s the translation:  “The emergence of SaaS and worker routing has fundamentally altered this.”

Using SaaS, Cloudflare no longer handles these tasks for you; you can now take care of them yourself:

1. You can define your SaaS rules (rule layer) yourself.
2. You can write a CNAME query to the optimizer node (the parsing layer).

Using a worker routing rule, you can simply point DNS resolution to any preferred node after the rule is established.

Here’s the translation:  “This is why traffic routed through SaaS or Worker services can achieve prioritization.”

---

# Select a premium domain.

The primary advantage of choosing a Cloudflare node with a faster domestic IP address or domain is the improved access speed.

## Traditional Preferred Domains

Commonly used community domain names are: https://cf.090227.xyz

These preferred domain names are typically compiled by scanning Cloudflare’s official IP address ranges and identifying the lowest latency IPs within those ranges.

## Cloudflare BYOIP Select

Are you still using traditional OptiDNS? Discover Cloudflare Byoip!

### What is Byoip?

Cloudflare BYOIP (Bring Your Own IP) allows users to host their own IP address and associated IP range within the Cloudflare network, leveraging Cloudflare’s global infrastructure for enhanced performance and security.

Here’s the translation:  “When speaking informally, it's often the case that certain IP addresses are not directly managed by Cloudflare. However, when we CNAME them to this IP address, we can still access our services hosted on Cloudflare.” These IPs may not be Anycast, but domestic latency is typically more favorable than Cloudflare’s official IP ranges.

### How to locate Cloudflare BYOIP?

Please visit the details of Cloudflare London, LLC at [https://www.as209242.com/cloudflare-london](https://www.as209242.com/cloudflare-london).

Attempting to use ITDog to force IP access to your Cloudflare service will result in a 403 Forbidden error.

Here’s the translation:  “The return status of 404 is normal, as the r2.afo.im directly connects to Cloudflare R2 object storage, and direct access is a 404 error.”

![](../../assets/images/838f685e-3913-4b21-995e-5ee149f4bffa.webp)

### 注意事项

Some Byoip instances may force redirection to their own website. It’s essential to review the ITDog test logs for any re-directs, ensuring your site doesn't become a referral source for others.

### Can this product/solution/system be utilized for an extended period?

Here’s the translation:  “These Byoip addresses offer superior performance compared to Cloudflare's official IP ranges, but if you require consistent service availability, it is recommended to configure a machine-based filtering system that automatically identifies and rejects unavailable IPs. Additionally, incorporating Cloudflare's official IP ranges will mitigate potential downtime issues.”

---

# Here’s the translation:  Various preferred options.

## Preferred Worker Projects – Simple Solution

If you require a premium Page/Worker project, please let me know.

First, if you are a Page, please transfer the project to a Worker and provide specific instructions on how to do so.

Next, create a worker route that directly inputs the specified URL `your_domain+/*`

![](../../assets/images/cf-fastip.png)

Here’s the translation:  “Finally, a DNS record was successfully propagated to the desired top-level domain, all resolved!”

![](../../assets/images/cf-fastip-1.png)

No need for SaaS, no need for multiple domains – it’s that simple!

---

## Here’s a professional translation of the text:  “The worker routing system is designed to reverse global routes and prioritize (advanced) selections.”

The method’s principle relies on leveraging a worker reverse proxy to intercept your source server and then select the worker's entry point. This approach deviates from traditional reverse proxies, retaining the original host header received by the source server as direct references to the source itself.

Create a Cloudflare Worker and write code to it.

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

Create a routing plan.

![](../../assets/images/56752d54-26a5-46f1-a7d9-a782ad9874cb.webp)

类似这样填写：

![](../../assets/images/d025398c-39e3-4bd7-8d8f-2ce06a45007d.webp)

Finally, please configure a DNS record to point `CNAME gitea.afo.im --> optimum.com`.

---

## Traditional SaaS offers a compelling solution for businesses seeking scalable and efficient technology platforms.

### What does SaaS do?

Cloudflare SaaS provides a solution where you don’t need to modify your DNS server, enabling it to leverage Cloudflare’s network capabilities.

When a domain is migrated to a Cloudflare-managed service, the domain benefits all Cloudflare services. As I move umami.acofork.com to 2x.nz, I can establish rules for it within 2x.nz.

![](../../assets/images/cf-saas-1.webp)

![](../../assets/images/cf-saas-2.webp)

![](../../assets/images/cf-saas-3.webp)

The routing rules in workers also apply.

![](../../assets/images/cf-saas-4.webp)

### SaaS Optimization Workflow

Simple and straightforward (pro.yourdomain.com is the final access domain):
Cloud SaaS DNS
[Source: yourdomain.com] -> [Homepage]
cdn.yourdomain.com -> preferred domain
cdn.yourdomain.com
> 
Cloud-based Software as a Service.
Add a custom domain name: pro.yourdomain.com
The website is origin.yourdomain.com.

> [!WARNING]
> Cloudflare最近将新接入的域名SSL默认设为了完全，记得将 SSL 改为灵活。
> ![](../../assets/images/cf-fastip-1.webp)

#### Preparation is key.

We need **a domain or two domains**. (Single domain can be represented by a subdomain.)

If the same CF account is unavailable, please try placing two domains in different accounts.

We are transitioning onani.cn to a primary domain and acofork.cn to an auxiliary domain.

Single-domain performance:

![](../../assets/images/cf-fastip.webp)

#### 具体步骤

1. 首先新建一个DNS解析，指向你的**源站**，**开启cf代理**
   ![QmfBKgDe77SpkUpjGdmsxqwU2UabvrDAw4c3bgFiWkZCna.webp](../../assets/images/c94c34ee262fb51fb5697226ae0df2d804bf76fe.webp)

2. To configure your server’s SSL/TLS settings, navigate to the “Backup Domain” section and customize the hostname. Set the revert source to the domain you previously used for DNS resolution: xlog.acofork.cn (recommended **HTTP Verification**.)

3. 点击添加自定义主机名。设置一个自定义主机名，比如 `onani.cn`，然后选择**自定义源服务器**，填写第一步的域名，即 `xlog.acofork.cn`。
   
   如果你想要创建多个优选也就这样添加，一个自定义主机名对应一个自定义源服务器。如果你将源服务器设为默认，则源服务器是回退源指定的服务器，即 `xlog.acofork.cn`
   
   ![QmRYrwjeDMDQCj8G9RYkpjC3X4vpwE77wpNpbqKURwBber.webp](../../assets/images/f6170f009c43f7c6bee4c2d29e2db7498fa1d0dc.webp)

4. 继续在你的辅助域名添加一条解析。CNAME到优选节点：如cloudflare.182682.xyz，**不开启cf代理**
   ![QmNwkMqDEkCGMu5jsgE6fj6qpupiqMrqqQtWeAmAJNJbC4.webp](../../assets/images/4f9f727b0490e0b33d360a2363c1026003060b29.webp)

5. 最后在你的主力域名添加解析。域名为之前在辅助域名的自定义主机名（onani.cn），目标为刚才的cdn.acofork.cn，**不开启cf代理**
   ![QmeK3AZghae4J4LcJdbPMxBcmoNEeF3hXNBmtJaDki8HYt.webp](../../assets/images/6f51cb2a42140a9bf364f88a5715291be616a254.webp)

6. 优选完毕，确保优选有效后尝试访问
   ![](../../assets/images/cf-fastip-10.webp)

7. Here’s the translation:  “You can change the NS server for CDN subdomains to (Aliyun), Huawei Cloud, or Tencent Cloud DNS routing and forwarding.”

The preferred workflow involves user access to the platform, which triggers a CNAME resolution for the final domain, resulting in redirection to cdn.acofork.cn. The originating host, onani.cn, is then forwarded to the optimization process. Optimization completion indicates that the source host, onani.cn, has identified a return path via xlog.acofork.cn. Subsequently, the user is redirected back to the content of the return path (xlog.acofork.cn).

---

# Regarding Cloudflare’s page…

1. You can directly modify the DNS records associated with your page to redirect traffic to an Alibaba/Huawei Cloud/ Tencent Cloud DNS endpoint for routing analysis.

2. Upgrade your page project to a Worker project, utilizing the Worker Premium solution (simpler). Detailed instructions can be found here: `F Page One-Click Migration to Worker? What are the benefits?` - https://www.bilibili.com/video/BV1wBTEzREcb

# Regarding Cloudflare Workers.

1. 在Workers中添加路由，然后直接将你的路由域名从指向`xxx.worker.dev`改为优选域名即可
2. 如果是外域，SaaS后再添加路由即可，就像：
   ![](../../assets/images/cf-fastip-12.webp)

![](../../assets/images/cf-fastip-13.webp)

# Regarding Cloudflare Tunnel (Zero Trust),

Upon completion of the traditional SaaS setup, you’ll be accessing Cloudflare Tunnel.  Once your SaaS integration is complete, you can proceed as normal.

![](../../assets/images/cf-fastip-3.webp)

![](../../assets/images/cf-fastip-2.webp)

Next, we need to ensure that the traffic from the final access domain is routed correctly through Cloudflare Tunnel. Otherwise, accessing the site will trigger the **catch: all** rule, essentially preventing access. We should then create a new Tunnel rule with the following parameters:  *   **Domain:** **** *   **Source URL:** The same as the original source URL.

![](../../assets/images/cf-fastip-3.png)

Here’s the translation:  “Please provide a DNS record for the final URL: `umami.2x.nz` with the domain name **your preferred domain**.”

---

# Regarding the use of various CF rules on websites.

You only need to adhere to the rules regarding the final access domain, as the CF rule focuses on the hostname rather than the source of the access.

# Regarding virtual hosting.

To ensure seamless connectivity between your source and premium domains, we recommend binding both the Source and Premium domains to your virtual host. This will allow you to easily add and remove domains without interruption.