---
title: "Reviewing Those Useful Serverless (Cloud Functions)!"
description: "Have you bought a VPS to set up a website, then installed BT Panel or 1Panel and subsequently installed Nginx, etc.? Now, all of that is unnecessary! With just a little learning, you can obtain a free, highly available hosting service!"
published: 2025-11-25
image: ../../assets/images/serverless-function.webp
tags:
  - Serverless
  - 云函数
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
Serverless，，，。、，。Vercel、Netlify、Cloudflare Workers，，（AList），。
:::

# What is Serverless
As the introduction states, traditionally, we would set up a web service by purchasing a VPS, installing a management panel on it, then installing the required software such as Nginx and AList, finally launching it, opening ports, and configuring DNS resolution—thus successfully launching a website.

Serverless is much simpler, after all **Server** has been **Less**ed.

What does this mean? In Serverless services, you no longer need to manage traditional VPS; instead, you simply upload your business code to the target platform, which then automatically deploys your service via its CI/CD system.

For an inappropriate example, such as the [blog](https://2x.nz) you are currently viewing: first, I upload the source code to the [Edge Security Acceleration Platform EO Pages_ Tencent Cloud](https://cloud.tencent.com/document/product/1552/118260), then the platform builds the final HTML page, and finally, I bind a domain on the platform, allowing direct access.

It is not difficult to see that in the previous example, I did not start building this service from scratch; instead, I only did two things: 1. Upload source code 2. Bind domain name, while leaving all other tasks to the platform's automation. This not only greatly reduces operational costs but also makes version control easier.

# Pros and Cons of Serverless
In Serverless, you no longer need to manage infrastructure; you only need to ensure your code works, then upload it directly to the platform, and the platform will handle everything else for you.

Moreover, this is often **free**, or at least most Serverless platforms offer a **free tier**. From the platform's perspective, you are merely renting what you need, and compared to large enterprise customers, your expenses are negligible.

And in Serverless, you are always just a user; but if you purchase a VPS, you generally have full control over it, such as setting up a firewall or reinstalling the operating system, which comes at a high cost. That's why you can see many free Serverless services, but almost no free VPS providers.

But there are also some drawbacks; Serverless often has strict usage limits. In traditional VPS, IDCs usually restrict your **maximum bandwidth**, **public IP**, and **total traffic**. However, in Serverless, you are typically only restricted by your **total traffic**, but there may still be other limitations, such as: **maximum CPU execution time**, **total request count**, **function total request count**, **maximum function execution time**, etc.

Because when you use Serverless, your service runs directly on the platform's CDN. You will directly benefit from the CDN IP segments and bandwidth provided by the platform, which also makes platform management more convenient. There is no need to purchase large numbers of physical machines to set up virtual machines or VPS. Instead, you only need to set up a small cluster and properly allocate users.

Serverless is also easier than Server for version control and debugging, since Serverless and Git are inherently compatible. In the user's perspective, one only needs to first host the code on GitHub, then connect the code repository to the Serverless platform. After that, every service update simply requires updating the source code, and the platform will automatically handle the build. When you want to roll back a version, you can simply revert the deployment to a previous commit. For debugging, there is no longer a need to connect to the server; instead, you only need a computer, pull down the code, perform local development and debugging, then submit the fixed code, and the platform will automatically deploy it.

# Great Serverless platform

### [EdgeOne Pages - Edge Full-Stack Development Platform](https://pages.edgeone.ai/zh)

:::caution
Do not deploy services with daily traffic exceeding **10M** on it, as your account is likely to be suspended.
:::

Supports native JS and Node Function. If your project is built on Node, you only need to modify the function entry and exit points to seamlessly migrate. Moreover, the current **Pages Function** is **free of charge and does not count toward requests**, making it very suitable for deploying services intended for personal use.

However, its built-in build service has lower performance, and the deployment speed may be slightly slower.

Example service:  [Build an Anonymous File Upload Endpoint - AcoFork Blog](/posts/unknown-upload/)

### [Vercel Functions](https://vercel.com/docs/functions)
Supports many languages, such as Node.js, Python, Go, Wasm, etc. The build service is very powerful! **Default allocation 4C8G** helps you build!

The usage limit is very lenient, and access can remain normal even when exceeding the limit by more than **2**.
![](../../assets/images/serverless-function-1.webp)
Example service: [Come on! Let's use Vercel to share your OneDrive! - AcoFork Blog](/posts/onedrive-index/)

### [Netlify Functions](https://www.netlify.com/platform/core/functions/)
Supports JS/TS and Go. More lenient usage limits! Only restricts 100GB of monthly transfer traffic; however, the service will immediately shut down once exceeded.

Example service: https://nf-gh.072103.xyz/afoim

### [Cloudflare Workers | Build and deploy code with easy-to-use development tools | Cloudflare](https://www.cloudflare-cn.com/developer-platform/products/workers/)
Supports numerous languages, but offers the best support for JS/TS, with special attention to the fact that it does not support a full **Node.js** environment. Python currently cannot install packages via pip. Its advantage lies in its ability to integrate with more Cloudflare products, such as Cloudflare R2 object storage, Cloudflare KV key-value storage, and Cloudflare D1 SQL database.

Daily limit of **10W** requests, but exceeding the limit does not always return "Unavailable"; instead, it may return an error.

Example service: [Have you ever considered deploying BitWarden directly to Cloudflare Worker? - AcoFork Blog](/posts/warden-worker/)

### [[Hugging Face – The AI community building the future.]]

:::caution
Do not deploy **AList** on it! Immediate ban!
:::

Strictly speaking, this is a platform designed to help you run large AI model services, but since it supports running **Docker**, it's still quite versatile.

However, accessing the link requires you to: https://-Space.hf.space/

Example service: [NetEase Cloud Music Toolbox](https://acofork1-netease.hf.space/)

### [ClawCloud Run | Build, Deploy, Manage & Run in Cloud-Native Platform](https://run.claw.cloud/)

Previously, it was completely drained; currently, there's an explosion in the Asia-Pacific region, with a monthly balance of **5 dollars**. You can directly run Docker, billed based on the CPU cores and memory you allocate. However, the Hobby plan is quite affordable, and if you use it frequently, you might want to purchase it.
![](../../assets/images/serverless-function-2.webp)

### [Render](https://render.com/)
![](../../assets/images/serverless-function-3.webp)
**100GB free monthly traffic**, supports many services, such as: static websites, web services (Docker), scheduled services, PostgreSQL databases, Key Value storage

The only drawback is that its performance is not high.

### [Zeabur](https://zeabur.com/zh-CN/)
![](../../assets/images/serverless-function-4.webp)
**$5 free credit per month** , the free plan offers two regions to choose from
![](../../assets/images/serverless-function-5.webp)

The most significant feature is that you can host your VPS with Zeabur, which will install services like k3s on your server, after which you can directly manage and operate it through Zeabur's dashboard.

**Minimum server requirements: 2GB memory, 1-core CPU.**

![](../../assets/images/serverless-function-6.webp)

# Conclusion
Serverless is unlike traditional VPS, as you do not fully own it, so some services cannot run, **especially in the free tier**, such as IO- and network-intensive services like **AList**, or services with very high concurrent requests and commercial services. If you find it satisfactory, consider purchasing paid plans from major platforms.