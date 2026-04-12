---
title: 如何使用CloudFlare优选，让网站跑的更快
description: 使用SaaS、Worker以及各种方法来让你的网站解析的IP进行优选，提高网站速度
draft: false
image: https://img.xiegao.top/file/s3:s3_1775977357750_v6v08q.jpg
lang: ""
published: 2026-04-12
tags:
  - Cloudflare SaaS
  - Cloudflare Workers
---

# 相关视频

- **全解**： https://www.bilibili.com/video/BV1QpSoBqERj 

# 选择优选域名

优选的核心就是选择一个国内访问速度更快的Cloudflare节点IP或域名。

## 传统优选域名

常用的社区优选域名：https://cf.090227.xyz https://cf.877774.xyz

这些优选域名通常是通过扫描Cloudflare官方IP段，找出国内延迟最低的IP整理而成。

---

# 各种优选方案

## 一、Worker项目优选

如果你需要优选 Page/Worker项目：

首先，如果你是Page，将项目转为Worker，具体AI一下即可。

接下来编写Worker路由，直接填写 `你的域名+ /*`

![](https://img.xiegao.top/file/s3:s3_1775977418970_z3l24a.jpg)

最后写一条DNS解析到想要的优选域名，完事！

![](https://img.xiegao.top/file/s3:s3_1775977470028_6p98vi.jpg)

不需要折腾SaaS，更不需要多域名，就这么简单！

---

## 二、Worker路由反代全球并优选（进阶）



创建一个Cloudflare Worker，写入代码：

```js
// 域名前缀映射配置
const domain_mappings = {
  '源站.com': '最终访问头.',
//例如：
//'gitea.0721234.xyz': 'gitea.',
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

创建路由：

![](https://img.xiegao.top/file/s3:s3_1775977680977_vu2q6v.jpg)

类似这样填写：

![](https://img.xiegao.top/file/s3:s3_1775977738797_e4za28.jpg)

最后写一条DNS解析 `CNAME pan.0721234.xyz --> 优选域名` 即可

---


## 三、SaaS优选

### SaaS优选步骤

> 简单易懂（pro.yourdomain.com 是最终访问域名）：
> CF SaaS DNS
> origin.yourdomain.com -> 源站开小黄云
> cdn.yourdomain.com -> cf优选域名
> pro.yourdomain.com -> cdn.yourdomain.com
> 
> CF SaaS
> 添加自定义主机名pro.yourdomain.com
> 源站为origin.yourdomain.com

> [!WARNING]
> Cloudflare最近将新接入的域名SSL默认设为了完全，记得将 SSL 改为灵活。
> ![](https://img.xiegao.top/file/s3:s3_1775977851802_ssv78w.webp)

#### 准备工作

我们需要**一个域名或两个域名**（单域名直接用子域名即可。双域名比如：xiegao.cc.cd和xiegao.top）。

> **如果在同一CF账号下不可用，请尝试将俩域名放置在不同账号**

这里我们让xiegao.top成为主力域名，让xiegao.cc.cd成为辅助域名。

单域名效果：

![](https://img.xiegao.top/file/s3:s3_1775977922434_gl7j4i.jpg)

#### 具体步骤

1. 首先新建一个DNS解析，指向你的**源站**，**开启cf代理**
   ![](https://img.xiegao.top/file/s3:s3_1775977968819_3vpcqt.webp)

2. 前往**辅助域名**的 SSL/TLS -> 自定义主机名。设置回退源为你刚才的DNS解析的域名：pan.xiegao.top（推荐 **HTTP 验证**）

3. 点击添加自定义主机名。设置一个自定义主机名，比如 `pan.xiegao.top`，然后选择**自定义源服务器**，填写第一步的域名，即 `pan1.xiegao.top`。
   
   如果你想要创建多个优选也就这样添加，一个自定义主机名对应一个自定义源服务器。如果你将源服务器设为默认，则源服务器是回退源指定的服务器，即 `saas.xiegao.top`
   
3. 继续在你的辅助域名添加一条解析。CNAME到优选节点：如cf.877774.xyz，**不开启cf代理**
   ![](https://img.xiegao.top/file/s3:s3_1775978089061_abchur.jpg)

4. 最后在你的主力域名添加解析。域名为之前在辅助域名的自定义主机名（pan.xiegao.top），目标为刚才的cdn.xiegao.top，**不开启cf代理**
   ![](https://img.xiegao.top/file/s3:s3_1775978153445_sgowll.jpg)

5. 优选完毕，确保优选有效后尝试访问

---

# 针对于Cloudflare Page

1. 将您的Page项目升级为Worker项目，使用Worker优选方案（更简单）。详细方法见：【CF Page一键迁移到Worker？好处都有啥？-哔哩哔哩】 https://www.bilibili.com/video/BV1wBTEzREcb

# 针对于Cloudflare Workers

1. 在Workers中添加路由，然后直接将你的路由域名从指向`xxx.worker.dev`改为优选域名即可
2. 如果是外域，SaaS后再添加路由即可

# 针对于Cloudflare Tunnel（ZeroTrust）

请先参照 [传统SaaS优选](#传统saas优选) 设置完毕，源站即为 Cloudflare Tunnel。正常做完SaaS接入即可：

![](https://img.xiegao.top/file/s3:s3_1775978433845_cvgw8w.jpg)

![](https://img.xiegao.top/file/s3:s3_1775978461098_zowx4d.jpg)


接下来我们需要让 **最终访问的域名** 打到 Cloudflare Tunnel 的流量正确路由，否则访问时主机名不在Tunnel中，会触发 **catch: all** 规则，总之就是没法访问。再创建一个Tunnel规则，域名为 **你最终访问的域名** ，源站指定和刚才的一致即可。

![](https://img.xiegao.top/file/s3:s3_1775978153445_sgowll.jpg)

最后写一条 `pan.xiegao.top` CNAME **你自己的优选域名** 的DNS记录即可

