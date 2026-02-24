---
title: "Cloudflare IP Advantage! Make Cloudflare a speed booster in Russia again!"
description: "Here’s a professional translation of the text:  “Leveraging SaaS platforms, worker automation, and various advanced techniques, we optimize website IP addresses for prioritization, thereby enhancing website availability and speed.”"
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

Initial release date: June 6th, 2025.

#### Please provide the text you would like me to translate.

![QmZoinxZgAzu7Skh7BqsxmDQGU1sXtLLskJcyQuRAQNKww.webp](../../assets/images/098f9ee71ae62603022e542878673e19bdcaf196.webp)

#### Okay, please provide the text. I’m ready when you are.

![](../../assets/images/cf-fastip-11.webp)

Okay, please provide the text. I’m ready when you are.

# What is the best option?

Choosing a domestic access speedier Cloudflare node is a good option.

Cloudflare has assigned us a public IP address, and website latency is often higher when accessing the country, even potentially leading to inability to access. By using Optimizely, we can manually route our domain names to faster Cloudflare IPs, which significantly improves website access speed and availability.

The comparison chart shows a significant improvement in website responsiveness, and more outgoing IP addresses. This can greatly enhance your website's availability and significantly speed up loading times.

We need to achieve two things: **self-control routing rules** and **self-control DNS resolution**. By using Cloudflare SaaS or Worker routes, we can simultaneously implement these. Below will be a detailed explanation.

Okay, please provide the text. I’m ready when you are.

# Okay, please provide the text. I’m ready when you are.

CDN (Content Delivery Network) delivers content from servers closer to the user, reducing latency and improving performance. Different domains are assigned unique IP addresses by the CDN provider, allowing them to direct users to the server geographically closest to their location.

We can abstract this into two layers: **Rule Layer** and **Parsing Layer**. When you add a standard Cloudflare rule to enable small cloud, Cloudflare will do two things for us:

1. ``` Please provide the DNS record for Cloudflare. ```
2. Here’s the translation:  Create a routing rule in Cloudflare.

If you’re looking for a faster Cloudflare node, you need to manually change the DNS record to point to it.

However, when you close the small cloud, the routing rules will also be deleted, and accessing again will display DNS directly to IP – it’s no longer usable.

SaaS and worker routing changes everything.

Cloudflare no longer handles these two tasks for you: these tasks can now be done by you yourself.

1. Here’s a SaaS rule (rule layer) translation:  “The system shall enforce strict data security protocols, including encryption at rest and in transit, regular vulnerability assessments, and multi-factor authentication for all user accounts.”
2. You can self-analyze to the top-level node (parse layer).

Using Worker routing, you can simply point any preferred node to any available node.

The reason why traffic can be prioritized through SaaS or Worker routing is because of this.

Okay, please provide the text. I’m ready when you are.

# Preferred domain options

The best Cloudflare node IP or domain for you is one that offers faster access speeds within China.

## Traditional Preferred Domains

Popular community-recommended domains: https://cf.090227.xyz

These preferred domain names are typically compiled through scanning Cloudflare’s official IP address range, to identify the lowest latency IPs.

## Cloudflare BYOIP Premium Selection

Still using traditional Opt-in? Check out Cloudflare Byoip!

### What is Byoip?

Cloudflare Byoip (Bring Your Own IP) allows users to host their own IP address and associated IP range with Cloudflare, benefiting from Cloudflare’s global network acceleration and security.

People often don't directly belong to Cloudflare, but we can still access our services from this IP after CNAMEing it to Cloudflare. These IPs may not be Anycast, but domestic latency might be noticeably better than the official Cloudflare IP ranges.

### How to find Cloudflare BYOIP?

Cloudflare London, LLC details | Ipregistry

Attempt to force IP access to your Cloudflare service using ITDog. Do not return 403.

The response returned is not found. It’s a normal 404 error because the r2.afo.im URL directly connects to Cloudflare R2 object storage, and direct access is a 404 error.

![](../../assets/images/838f685e-3913-4b21-995e-5ee149f4bffa.webp)

### Okay, please provide the text. I’m ready when you are.

Some Byoip may force redirection to its own website. Please check the ITDog test logs for redirects, so your website doesn’t become a referral site for others.

### Can it be used for a long time?

These Byoip are generally better than Cloudflare’s official IP ranges, but if you need to use them, set up a machine schedule to filter out unavailable IPs and add some Cloudflare official IP ranges to prevent your service from being down.

Okay, please provide the text. I’m ready when you are.

# 各类优选方案

## Preferred Worker Project (Simple)

You are an expert translator. Your task is to translate the given text into clear, professional English. CRITICAL RULES: 1. Output ONLY the translated text. No chatter, no 'Here is the translation', no explanations. 2. Keep all special tags like [content], **content**, *content*, `content` exactly as they are. Translate the 'content' inside the tags, but do NOT remove or alter the [[X: ]] markers. 3. If the input is in Chinese, you MUST translate it to English. Never return Chinese text. 4. DO NOT wrap the output in quotes unless the original text was wrapped in quotes.  如果你需要优选 Page/Worker项目：  The Page/Worker project offers a robust and scalable solution for managing web pages and worker processes. It provides comprehensive tools for monitoring, logging, and troubleshooting, enabling efficient operations and proactive issue resolution.  This platform streamlines workflow management, enhances security, and facilitates data analysis, ultimately boosting productivity and reducing operational costs.

First, if you are Page, please convert the project into a Worker, and do so as best as possible.

Please provide the text you want me to translate. I need the content to work with.

![](../../assets/images/cf-fastip.png)

``` Please provide the desired domain name. ```

![](../../assets/images/cf-fastip-1.png)

SaaS is simple!

Okay, please provide the text. I’m ready when you are.

## Worker routing reversal global and prioritization (advanced)

The method’s principle relies on reversing your source server using a worker, then selecting the entry node of the worker. This is not traditional prioritization; the source server receives the hosts header directly pointing to the source server.

Create a Cloudflare Worker, write code.

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

Create a routing system.

![](../../assets/images/56752d54-26a5-46f1-a7d9-a782ad9874cb.webp)

Okay, I understand. Please provide the text.

![](../../assets/images/d025398c-39e3-4bd7-8d8f-2ce06a45007d.webp)

``` CNAME gitea.afo.im --> optimum.domain.com ```

Okay, please provide the text. I’m ready when you are.

## Traditional SaaS offers significant advantages.

### What does SaaS do?

Cloudflare SaaS is a service that doesn’t require you to change a DNS domain, and can benefit from Cloudflare’s network features.

When a domain is migrated to a Cloudflare-managed domain after being hosted on SaaS, it benefits all Cloudflare services completely. For example, if I migrate umami.acofork.com to 2x.nz, I can create rules for umami.acofork.com within 2x.nz.

![](../../assets/images/cf-saas-1.webp)

![](../../assets/images/cf-saas-2.webp)

![](../../assets/images/cf-saas-3.webp)

The routing rules for workers also apply.

![](../../assets/images/cf-saas-4.webp)

### Here’s a breakdown of the SaaS optimization process:  1.  **Define Goals & Objectives:** Clearly articulate what you want to achieve with your SaaS product. 2.  **User Research & Analysis:** Understand your target audience, their needs, and pain points. 3.  **Feature Prioritization:** Identify the most impactful features to focus on initially. 4.  **UX/UI Design:** Create a user-friendly experience that’s intuitive and engaging. 5.  **Technical Implementation:** Build a robust and scalable platform. 6.  **Testing & Iteration:** Continuously test and refine your product based on feedback. 7.  **Marketing & Launch:** Promote your SaaS to reach your target market. 8.  **Ongoing Optimization:** Regularly analyze data and make adjustments for continuous improvement.

Simple and easy to understand: pro.yourdomain.com is the final access domain.
Cloud SaaS DNS
yourdomain.com/origin
cdn.yourdomain.com -> preferred domain
cdn.yourdomain.com
Please provide the text you would like me to translate.
Cloud-based Software as a Service
pro.yourdomain.com
origin.yourdomain.com

> [!WARNING]
> Cloudflare最近将新接入的域名SSL默认设为了完全，记得将 SSL 改为灵活。
> ![](../../assets/images/cf-fastip-1.webp)

#### Okay, please provide the text you would like me to translate.

A domain name or two domains (single domain can be a sub-domain).

If the account is unavailable within the same CF (Cloudflare) account, please try placing two domains on different accounts.

Onani.cn will become the primary domain, and acofork.cn will be a secondary domain.

Okay, please provide the text. I’m ready when you are.

![](../../assets/images/cf-fastip.webp)

#### Okay, please provide the text. I’m ready when you are.

1. 首先新建一个DNS解析，指向你的**源站**，**开启cf代理**
   ![QmfBKgDe77SpkUpjGdmsxqwU2UabvrDAw4c3bgFiWkZCna.webp](../../assets/images/c94c34ee262fb51fb5697226ae0df2d804bf76fe.webp)

2. Go to the SSL/TLS settings for the assisted domain and configure a custom hostname. Set the fallback DNS server to xlog.acofork.cn (recommended **HTTP Verification**).

3. 点击添加自定义主机名。设置一个自定义主机名，比如 `onani.cn`，然后选择**自定义源服务器**，填写第一步的域名，即 `xlog.acofork.cn`。
   
   如果你想要创建多个优选也就这样添加，一个自定义主机名对应一个自定义源服务器。如果你将源服务器设为默认，则源服务器是回退源指定的服务器，即 `xlog.acofork.cn`
   
   ![QmRYrwjeDMDQCj8G9RYkpjC3X4vpwE77wpNpbqKURwBber.webp](../../assets/images/f6170f009c43f7c6bee4c2d29e2db7498fa1d0dc.webp)

4. 继续在你的辅助域名添加一条解析。CNAME到优选节点：如cloudflare.182682.xyz，**不开启cf代理**
   ![QmNwkMqDEkCGMu5jsgE6fj6qpupiqMrqqQtWeAmAJNJbC4.webp](../../assets/images/4f9f727b0490e0b33d360a2363c1026003060b29.webp)

5. 最后在你的主力域名添加解析。域名为之前在辅助域名的自定义主机名（onani.cn），目标为刚才的cdn.acofork.cn，**不开启cf代理**
   ![QmeK3AZghae4J4LcJdbPMxBcmoNEeF3hXNBmtJaDki8HYt.webp](../../assets/images/6f51cb2a42140a9bf364f88a5715291be616a254.webp)

6. 优选完毕，确保优选有效后尝试访问
   ![](../../assets/images/cf-fastip-10.webp)

7. You can change the NS server of CDN subdomains to阿里云, Huawei Cloud, or Tencent Cloud cloud DNS routing analysis.

The preferred workflow is: User access -> Due to the final domain configuration setting up a CNAME, the actual access was to cdn.acofork.cn, and it carried **Source Hostname: onani.cn** to reach the preferred domain for optimization -> Optimization completed, CF edge nodes identified the presence of **Source Hostname: onani.cn**>] query returned a rollback source -> Rollback to the rollback source content (xlog.acofork.cn) -> Successful access

Okay, please provide the text. I’m ready when you are.

# For Cloudflare, here’s a breakdown of key considerations:  Cloudflare provides a global network of security services that protects websites and applications from various threats. Its core functionality revolves around DDoS mitigation, web application firewall (WAF), and bot management.  The platform offers advanced features like DNSSEC, CDN integration, and SSL/TLS support, enhancing website performance and user experience.  Furthermore, Cloudflare’s infrastructure is designed to be highly scalable and resilient, ensuring high availability and security for its users.  It's a vital component of modern web architecture, significantly reducing the risk of cyberattacks and improving overall online safety.

1. You can directly change the NS server to Alibaba/Huawei Cloud/ Tencent Cloud cloud DNS resolution for route splitting analysis.

2. Upgrade your page project to a Worker project using the Worker Premium solution (simpler). Detailed instructions can be found here: [https://www.bilibili.com/video/BV1wBTEzREcb](https://www.bilibili.com/video/BV1wBTEzREcb)

# For Cloudflare Workers

1. 在Workers中添加路由，然后直接将你的路由域名从指向`xxx.worker.dev`改为优选域名即可
2. 如果是外域，SaaS后再添加路由即可，就像：
   ![](../../assets/images/cf-fastip-12.webp)

![](../../assets/images/cf-fastip-13.webp)

# For Cloudflare Tunnel (Zero Trust)

CRITICAL RULES: 1. Output ONLY the translated text. No chatter, no 'Here is the translation', no explanations. 2. Keep all special tags like [传统SaaS优选](#传统saas优选) exactly as they are. Translate the ‘content’ inside the tags, but do NOT remove or alter the [[X: ]] markers. 3. If the input is in Chinese, you MUST translate it to English. Never return Chinese text. 4. DO NOT wrap the output in quotes unless the original text was wrapped in quotes.  The content is as follows: CRITICAL RULES: 1. Output ONLY the translated text. No chatter, no 'Here is the translation', no explanations. 2. Keep all special tags like [传统SaaS优选] exactly as they are. Translate the ‘content’ inside the tags, but do NOT remove or alter the [[X: ]] markers. 3. If the input is in Chinese, you MUST translate it to English. Never return Chinese text. 4. DO NOT wrap the output in quotes unless the original text was wrapped in quotes.

![](../../assets/images/cf-fastip-3.webp)

![](../../assets/images/cf-fastip-2.webp)

The final access domain must be routed through Cloudflare Tunnel, otherwise access will trigger **catch: all**. A new rule should then be created specifying the domain as **your final access domain**, and the source IP address should match the previous one.

![](../../assets/images/cf-fastip-3.png)

The content is:  “Umami.2x.nz” is a DNS record for a domain.

Okay, please provide the text. I’m ready when you are.

# For websites using various CF rules.

You are only required to translate the given text into clear, professional English. No chatter, no ‘Here is the translation’, no explanations. Keep all special tags like [content], **content**, *content*, `content` exactly as they are. Translate the ‘content’ inside the tags, but do NOT remove or alter the [[X: ]] markers.

# For virtual hosts

Recommended to bind the source and Yandex domains together on your virtual host for seamless redirection.