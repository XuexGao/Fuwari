---
title: "Inventory those useful Serverless (Cloud Functions)!"
description: "Do you purchase a VPS (Virtual Private Server) to build a website, and then install Bahtai or 1Panel before installing Nginx and other related services? Now, these should be sufficient. With a little learning, you can obtain a free, readily available managed hosting service!"
published: 2025-11-25
image: ../../assets/images/serverless-function.webp
tags:
  - Serverless
  - 云函数
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
Here's a summary of the article, within 3 sentences:

Serverless offers a simplified approach to web application deployment by eliminating the need for traditional VPS management and infrastructure. It leverages cloud platforms like EdgeOne Pages, Vercel Functions, Netlify Functions, Cloudflare Workers, and Hugging Face AI community platforms to automate tasks and provide scalable solutions. While offering cost-effectiveness and ease of use, Serverless also presents unique limitations regarding resource usage, such as bandwidth limits and CPU core allocation, requiring careful consideration when choosing a platform.
:::

# What is serverless?
As described in the introduction, traditional web service deployment typically involves purchasing a VPS (Virtual Private Server) and installing a management panel on it. Subsequently, software such as Nginx, ALiSt, and other necessary applications are installed. Finally, the server is configured to open ports, and DNS records are established to allow access to the website. This allows a website to be successfully launched.

Serverless is considerably simpler than traditional approaches, as **Less** has been removed from the system.

Here’s a professional translation:  “What is the meaning of this? In Serverless environments, you no longer need to manage traditional Virtual Private Servers (VPS). Instead, you directly upload your business code to the target platform, and the platform's CI/CD pipeline automatically deploys your service.”

Here’s a professional translation of the text:  “The process involves uploading the source code to [Edge Security Acceleration Platform EO Pages - Tencent Cloud](https://2x.nz), followed by the platform constructing the final HTML page. Finally, the domain is linked directly through the platform, enabling access.”

It is evident that in the previous example, I did not initiate the creation of this service from scratch; instead, I focused on two key actions: 1) uploading the source code and 2) binding a domain name. All other aspects were delegated to the platform's automation system, resulting in significant cost reduction for operations and significantly simplifying version control during the process.

# Here’s the translation:  The benefits and drawbacks of serverless computing.
In Serverless environments, you no longer need to manage infrastructure; simply ensure your code can execute and directly upload it to the platform, which will handle subsequent operations.

And frequently, this is the case of **free**, or rather, most serverless platforms offer a **free tier**. Because from the platform’s perspective, you are merely renting what you need, compared to larger clients where your costs are often overlooked.

In Serverless environments, you are always a user, but if you purchase a VPS, you generally have complete control over it. This includes configuring firewalls and reinstalling the operating system – a significant cost that’s why many free Serverless services are available, yet few truly offer free VPS solutions.

Here’s a professional translation of the text, adhering to your instructions:  “However, Serverless platforms often impose strict usage limits, which can be a drawback in traditional VPS environments. Traditional VPS providers typically restrict bandwidth, public IP addresses, and total traffic capacity, while Serverless offers limited restrictions on total traffic but may also include additional limitations such as CPU execution time, the number of requests, the total number of function calls, and the longest execution time of individual functions.”

Here’s the translation:  “When utilizing serverless architectures, your service directly leverages the CDN infrastructure provided by the platform. This grants you direct access to the CDN IP address and bandwidth associated with that platform, simplifying management and eliminating the need for substantial physical hardware investments – only requiring a small cluster and proper user distribution.”

Serverless offers enhanced version control and debugging capabilities compared to traditional server-based deployments, intrinsically linked with Git. The process involves first deploying code to GitHub, followed by connecting the repository to the Serverless platform. Subsequent updates to your service require only updating the source code; the platform automatically builds the deployment.  When reverting to a previous version, simply redeploying the instance will revert to the previous commit, eliminating the need for further debugging on the server. Debugging can be streamlined by deploying back to the previous commit, and the platform will automatically deploy the corrected code upon completion.

# A reliable serverless platform.

### EdgeOne Pages is a full-stack development platform.

:::caution
Please do not deploy services that exceed the daily traffic limit of **10M** , which may result in account suspension.
:::

Support native JavaScript and Node.js functions. If your project is built on Node, simply modify the function entry points to seamlessly migrate. The current **Pages Function** is configured as **No Request, No Fee**. This is particularly well-suited for deploying services that are solely used internally.

Here’s the translation:  “The service offering itself has lower build performance, potentially resulting in a slightly slower initial rollout.”

[Establish an anonymous file upload endpoint - AcoFork Blog](/posts/unknown-upload/)

### [Vercel Functions](https://vercel.com/docs/functions)
We support a wide range of languages, including Node.js, Python, Go, and Wasm. We offer robust service development capabilities. **Default Allocation 4C8G** Let us help you build!

用量限制非常宽松，并且可以超过限制的 **2倍** 以上仍保持正常访问
![](../../assets/images/serverless-function-1.webp)
示例服务： [来！让我们用Vercel来分享你的OneDrive！ - AcoFork Blog](/posts/onedrive-index/)

### [Netlify Functions](https://www.netlify.com/platform/core/functions/)
Support for JavaScript/TypeScript and Go.  Increased bandwidth limits are available, with a maximum monthly transfer limit of 100GB. However, exceeding this limit will immediately cause downtime.

示例服务： https://nf-gh.072103.xyz/afoim

### Cloudflare Workers enables the creation and deployment of code using intuitive development tools. It’s a powerful platform for leveraging cloud infrastructure to streamline your workflows.
Here’s the translation:  “Support for numerous languages is excellent, with particularly strong support for JavaScript/TypeScript.  It's crucial to note that it does not fully support the complete **Node.js** environment. Currently, Python cannot be installed via pip. Its advantages include seamless integration with a wider range of Cloudflare products, such as Cloudflare R2 object storage, Cloudflare KV key-value store, and Cloudflare D1 SQL database.”

Daily limits are restricted, but the exceeding does not result in a return; instead, it may request an error.

[Should you consider deploying Warden directly to Cloudflare Workers? - AcoFork Blog](/posts/warden-worker/)

### Here’s a professional translation of the text:  [Hugging Face – A community fostering the advancement of artificial intelligence.](https://huggingface.co/)

:::caution
Please do not deploy **AList** on that! Instant freeze!
:::

Strictly speaking, this is a platform designed to help users run AI large language models. However, its support for Docker functionality significantly enhances its appeal and playability.

Please verify the link by entering your username and Space name in the provided URL: https://username-Spacename.hft.space/

[Netlify Music Toolbox](https://acofork1-netease.hf.space/)

### [ClawCloud Run | Build, Deploy, Manage & Run in Cloud-Native Platform](https://run.claw.cloud/)

之前被干爆过，目前亚太爆炸，每个月有 **5 美元** 余额，直接跑Docker，按你分配的CPU核心数和内存来计费。不过 Hobby 计划还蛮便宜的，常用的话可以买
![](../../assets/images/serverless-function-2.webp)

### [Render](https://render.com/)
![](../../assets/images/serverless-function-3.webp)
**每月免费100G流量**，支持非常多的服务，如：静态网站、Web服务（Docker）、定时服务、PostgreSQL数据库、Key Vaule存储

The only drawback is its performance.

### [Zeabur](https://zeabur.com/zh-CN/)
![](../../assets/images/serverless-function-4.webp)
**每月免费5刀额度** ，免费计划有两个地域可选
![](../../assets/images/serverless-function-5.webp)

The most significant aspect is that you can host your VPS through Zeabur, which will install k3s and subsequent operations directly within its dashboard.

The minimum server requirement is 2 GB of RAM and a single core CPU.

![](../../assets/images/serverless-function-6.webp)

# Concluding remarks
Serverless architecture differs significantly from traditional Virtual Private Servers (VPS). It does not grant complete ownership, and certain services are unavailable or restricted in the free tier. This includes services requiring significant I/O operations and network bandwidth, as well as handling a high volume of concurrent requests, often suitable for commercial applications.  If you require a robust and reliable solution, exploring premium plans offered by various cloud providers is recommended.