---
title: "Build AList Backend Using Alibaba Cloud Function Compute FC, Only 5 Yuan Per Month!"
description: "Alibaba Cloud Function Compute is an elastic computing platform capable of hosting various services. When combined with AList's front-end and back-end separation deployment, it achieves lower costs than VPS while delivering a better experience."
category: "Tutorial"
draft: false
image: ../../assets/images/47518d4403328a0fcb716f0e06fc7f608e6c65b7.webp
lang: en
published: 2025-01-13
tags:
- 阿里云云函数 FC
- AList
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}

:::

# It is still recommended to purchase a cheap cloud server for deployment or use a home cloud; this method is very effective.

Recommended Akile: https://akile.io/register?aff_code=503fe5ea-e7c5-4d68-ae05-6de99513680e

---

# Principle

1. AList has a dedicated frontend project: https://github.com/AlistGo/alist-web. You can refer to [AList-Web deployment tutorial](/alist-web). The tutorial uses Cloudflare Pages for frontend deployment, but we recommend using https://vercel.com for frontend deployment, as it is faster. All of these options are completely free.
2. After deploying the frontend, we need a backend that can execute the AList binary and expose a port (default: 5244) to allow communication between the frontend and backend. Traditionally, we would choose to purchase a cloud server, or use our own computer/home cloud + Cloudflare Tunnel, or services like Serv00 for free hosting. In this article, we will use Alibaba Cloud's Function Compute (FC), which, although capable of running binary files, differs significantly from traditional architectures — we need to delve deeper into it.
3. The FC function is an instance-based service. Users can deploy a function service, and when certain conditions are triggered (e.g., an HTTP trigger), new instances are created to run the user's service. In other words, these instances are stateless. If you directly deploy AList this way, after the initial configuration is completed, the service will revert to its initial state after some time. Even if you initially deploy using a full package, you cannot modify it afterward. Therefore, we need to bind a NAS file system for data persistence. However, a NAS file system cannot be directly bound to the runtime's /code/xxx directory. We can use AList's designated configuration file parameter to bind the NAS to /mnt/AList and specify the configuration file to /mnt/AList. That is, by running the command **./alist server --data /mnt/AList**, we achieve data persistence.

# Regarding billing

1. The FC function charges based on the number of CUs.
2. NAS charges based on storage space.

# Hands-on

1. We assume you have already deployed the frontend. The communication address between the frontend and backend is defined in the env.production file in the root directory.
2. We currently do not know how to fill in this backend URL, as the URL is only displayed by Alibaba Cloud after the FC function is created. Therefore, we will temporarily set it aside for now.
3. Next, we proceed to the Alibaba Cloud Function Compute (FC) official website: https://fcnext.console.aliyun.com/overview
4. Click sequentially on Functions in the left sidebar, then Create Function, then Web Function. This will take you to the Web Function creation page.
5. Function name: AList, Runtime environment: Debian 10 or Debian 11, Code upload method: Upload code from folder, Start command: **./alist server --data /mnt/AList**, Listening port: 5244
6. We need to upload code to the function, which is the binary file of AList. We go to https://github.com/AlistGo/alist/releases/latest to download the latest binary file for Linux AMD64 architecture, which is **alist-linux-amd64.tar.gz**. After extracting it, you will get a binary file named **alist**. Create an empty folder and place this file inside, then upload this folder to the function.

![image](https://eo-r2.2x.nz/myblog/img/QmdajYeRyt1u3BSmRdGx8uUHKamGDkwoRe4TmEFZsJsaqS.webp)

7. Then click the Create button at the bottom left.

8. Then you will enter the function's control panel. Click Configuration → Network → Network Edit → Allow Access to VPC: Yes → Auto Configure. Click Configuration → Storage → NAS File Storage Edit → Mount NAS File System: Enable → Auto Configure. Click Logs → Activate Log Service.

9. Now return to the Code interface, click Deploy Code. Wait a moment until you receive a success deployment notification, then click the HTTP Trigger inside Function Details and copy the public access URL. This is the URL we mentioned earlier that needs to be written into the env.production file in the frontend's root directory. Fill it in, for example:

   ```shell
   VITE_API_URL = "https://aliyun-fc-alist.run"
   ```

10. Submit your new changes, and the frontend will automatically rebuild.

11. Try accessing your AList frontend URL directly; it should smoothly bring you to the AList login page.

12. At this point, check the control panel for instances to see if a new instance is running. If so, go to the logs to view the log of that instance, where you will find the administrator password generated during AList's initialization. Use this password to log in to the AList frontend URL, and then you can use it normally.

---

# Troubleshooting

1. If the message "Loading save..." appears:
   ![9aa460cd2dc84e1debe43e9df2d342fc](https://eo-r2.2x.nz/myblog/img/QmZVewYnKwCJzcShnkGTTVZJiTSUUSQi9u6pZ5rXRDK3rK.webp)
Check your logs for storage loading failures. If found, you may try:
1. Re-deploy repeatedly until you can access the backend and then delete those storage items that failed to load.
2. https://github.com/AlistGo/alist/discussions/3976