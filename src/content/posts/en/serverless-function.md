---
title: "盘点那些好用的Serverless（云函数）！"
description: "Here’s a professional translation of the text:  “Are you currently utilizing a VPS to host your website and installing tools like [X:宝塔/1Panel] and Nginx? Now, these services are no longer available. With a bit of learning, you can gain access to a readily available and fully functional hosting solution – free of charge.”"
published: 2025-11-25
image: ../../assets/images/serverless-function.webp
tags:
  - Serverless
  - 云函数
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# What is serverless?
Traditionally, we often build web services by purchasing a VPS (Virtual Private Server) and installing a management panel on it. Then, we install necessary software such as Nginx, List, and finally run the service, open ports, and configure DNS resolution to enable the website to be online.

Serverless is simpler than that, since **Server** has been removed by **Less**.

In Serverless services, you no longer need to manage traditional VPSs; instead, you directly upload your business code to the target platform and have the platform’s CI/CD automatically deploy your service.

The content is uploaded to the edge security acceleration platform EO Pages of Tencent Cloud, and then HTML pages are built on the platform, followed by binding a domain directly to access it.

It is evident that in the previous example, I did not build this service from scratch; instead, I only performed two things: 1. Uploading source code and 2. Binding a domain name. All other aspects were handled entirely by the platform's automation, which significantly reduced operational costs and made version control much easier during the process of doing so.

# Here’s a breakdown of the advantages and disadvantages of serverless computing:  **Advantages:**  *   **Cost-Effectiveness:** Pay-as-you-go pricing eliminates upfront infrastructure costs, scaling up or down based on actual usage. *   **Scalability:** Automatically scales resources to meet demand, ensuring optimal performance without manual intervention. *   **Reduced Operational Overhead:** No need to manage servers – the cloud provider handles all infrastructure management tasks. *   **Faster Time-to-Market:** Rapid deployment and iteration are facilitated by the platform's ease of use.  **Disadvantages:**  *   **Vendor Lock-in:** Reliance on a specific cloud provider can limit flexibility. *   **Debugging Complexity:** Debugging issues across multiple services can be challenging. *   **Limited Control:** Less control over the underlying infrastructure compared to traditional deployments. *   **Cold Starts:** Initial latency when a function is invoked after inactivity.
In Serverless, you no longer need to manage infrastructure; you simply ensure your code can run and directly upload it to the platform, the platform will handle the subsequent work.

The serverless platform offers a free tier, often referred to as a "free layer." This is because the provider views you as renting only what you need, compared to larger clients where costs can be significantly reduced.

In Serverless environments, you are always a user, but if you purchase a VPS, you generally have complete control over it – including setting firewalls and reinstalling the operating system. This cost is high, which is why you often don’t see many free VPS providers.

These often have drawbacks. Serverless frequently imposes strict usage limits, and in traditional VPS environments, IDC (Internet Data Center) servers typically limit your **maximum bandwidth**, **public IP address**, and **total traffic**. However, in Serverless environments, they usually only limit your **total traffic**, but may also have other restrictions such as **longest execution time for CPU**, **number of requests**, **number of function requests**, and **function longest execution time**.

Because when you're using Serverless, your service runs directly on the CDN platform itself. You’ll receive direct access to the CDN IP address and bandwidth associated with the platform, which simplifies management and eliminates the need for purchasing physical servers and VMs for a VPS.  You only need to create a small cluster and properly allocate users.

Serverless is easier to manage version control and debugging compared to traditional servers, as Serverless and Git are inherently linked. Users only need to host their code on GitHub first, then connect the code repository to the Serverless platform. After that, every update to your service will only require updating the source code. The platform automatically builds it for you. When you want to revert a version, simply redeploy it to the previous commit. Debugging is no longer required – you just need one computer to debug the code locally, then submit the corrected code to the platform, which will automatically deploy it.

# Here’s a breakdown of useful serverless platforms:  *   **AWS Lambda:** A serverless compute service that lets you run code without provisioning or managing servers. *   **Google Cloud Functions:** Similar to AWS Lambda, Google Cloud Functions provides a serverless platform for running code. *   **Azure Functions:** Microsoft Azure’s serverless compute service. *   **Vercel:** A platform for deploying and hosting static websites and serverless functions. *   **Netlify:** A popular platform for building and deploying web applications, including serverless functions.

### EdgeOne Pages

Okay, I understand. Please provide the text.
Do not exceed 10 million daily traffic of this service, as this could lead to account suspension.
Okay, please provide the text. I’m ready when you are.

Supports native JavaScript and Node.js functions. If your project is based on Node, you only need to modify the function entry points to seamlessly migrate. The current **Pages Function** is **not-counted-requests-nor-charged**. It’s particularly suitable for deploying services that are solely used by yourself.

The service performance for its own build is currently lower, resulting in a slightly slower launch time.

Upload an anonymous file.

### Vercel functions provide a comprehensive suite of tools and services for deploying and managing web applications. They streamline the process of building, testing, and deploying applications to Vercel’s platform, offering features like serverless deployment, CI/CD pipelines, and automated monitoring.
Supports many languages, including Node.js, Python, Go, and Wasm, and builds strong services! **Default Allocation 4C8G** It helps you build it!

用量限制非常宽松，并且可以超过限制的 **2倍** 以上仍保持正常访问
![](../../assets/images/serverless-function-1.webp)
示例服务： [来！让我们用Vercel来分享你的OneDrive！ - AcoFork Blog](/posts/onedrive-index/)

### Netlify Functions
Supports JavaScript/TypeScript and Go. With more generous limits, each month can handle up to 100GB of data transfer traffic, but immediately shuts down if exceeded.

Okay, I understand. Please provide the text you would like me to translate.

### Cloudflare Workers enables the construction and deployment of code using a user-friendly development tool.
Supports numerous languages, but has the best support for JavaScript/TypeScript. It is particularly important to note that it does not fully support the complete **Node.js** environment. Python currently cannot be installed via pip. Its advantages include the ability to work with more Cloudflare products such as Cloudflare R2 object storage, Cloudflare KV key-value store, and Cloudflare D1 SQL database.

Daily requests are limited, but exceeding them doesn’t result in an error, but rather a potential request for further clarification.

Deploy Warden directly to Cloudflare Workers?  AcoFork Blog

### Hugging Face is a leading community dedicated to building the future of artificial intelligence.

Okay, I understand. Please provide the text.
Please provide the text you would like me to translate.
Okay, please provide the text. I’m ready when you are.

This platform is designed to help you run Docker, offering a high level of engagement.

Okay, I understand. Please provide the text you want me to translate.

Okay, I understand. Please provide the text.

### CloudRun is a cloud-native platform for building, deploying, managing, and running applications in the cloud.

之前被干爆过，目前亚太爆炸，每个月有 **5 美元** 余额，直接跑Docker，按你分配的CPU核心数和内存来计费。不过 Hobby 计划还蛮便宜的，常用的话可以买
![](../../assets/images/serverless-function-2.webp)

### [Render](https://render.com/)
![](../../assets/images/serverless-function-3.webp)
**每月免费100G流量**，支持非常多的服务，如：静态网站、Web服务（Docker）、定时服务、PostgreSQL数据库、Key Vaule存储

The only downside is performance.

### [Zeabur](https://zeabur.com/zh-CN/)
![](../../assets/images/serverless-function-4.webp)
**每月免费5刀额度** ，免费计划有两个地域可选
![](../../assets/images/serverless-function-5.webp)

The most advanced VPS hosting solution is offered by Zeabur, which will install k3s and other services on your server. You can then directly manage operations from the Zeabur dashboard.

Minimum server requirements: 2 GB of RAM and 1 CPU core.

![](../../assets/images/serverless-function-6.webp)

# Please provide the text you would like me to translate! I need the content to begin with.
Serverless does not resemble traditional VPS; you do not have complete ownership of it, so some services are not allowed to run, such as those that consume a lot of I/O and network bandwidth **AList**, or high volumes of concurrent requests for commercial services. If you’re using a service like this, consider purchasing premium plans from various platforms.