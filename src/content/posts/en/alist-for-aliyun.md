---
title: "Leverage the Alibaba Cloud Function FC to build an AList backend, costing only 5 yuan per month!"
description: "阿里云云函数 FC是一个弹性的计算平台，可托管多种服务。搭配AList的前后端分离部署，实现比VPS更低的价格，得到更好的体验"
category: "Tutorial"
draft: false
image: ../../assets/images/47518d4403328a0fcb716f0e06fc7f608e6c65b7.webp
lang: en
published: 2025-01-13
tags:
- 阿里云云函数 FC
- AList
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Consider renting a cheap cloud server to deploy or use your home cloud. This is a viable option.

Recommended by Akile: https://akile.io/register?aff_code=503fe5ea-e7c5-4d68-ae05-6de99513680e

Okay, please provide the text. I’m ready when you are.

# Okay, please provide the text. I’m ready when you are.

1. The Alist frontend project has a dedicated project focused on [AList-Web Deployment Tutorial](/alist-web). It utilizes Cloudflare Page for front-end deployment, and we strongly recommend using https://vercel.com for faster deployments. These are completely free.
2. The deployment of a backend that can execute a list of binary files and open ports (default port 5244) for the frontend to communicate with the backend is required. In traditional setups, we typically choose to purchase a cloud server or use our own computer/home cloud + Cloudflare Tunnel or similar free hosting services. This document will delve into using阿里云FC function for binary file execution and its differences from traditional architectures.
3. The FC function is an instance service. Users can create function deployment services, and when a certain condition is triggered (e.g., an HTTP trigger), a new instance begins to run the user's service. It’s stateless; attempting to deploy it directly with a list will cause the initial configuration to complete before subsequent access becomes available. Even if you initially use a full-instance deployment, changing its state after deployment is not possible, so we need to bind a NAS file system for data persistence. However, NAS files cannot be directly bound to the code's runtime /code/xxx directory; instead, we can use the AList configuration parameters to specify the NAS binding to /mnt/AList, and then specify the configuration in /mnt/AList. This is achieved through the command **./alist server --data /mnt/AList**.

# Regarding billing.

1. The fee calculation utilizes CU numbers.
2. Through storage space fees.

# Please provide the text you would like me to translate.

1. We assume that the front-end and back-end communication addresses are defined in the `env.production` file at the root directory.
2. We currently do not know how to fill out this backend URL because the URL is only displayed when it’s created by the Cloud Function at the FC function. Therefore, we are postponing it until we have reviewed it.
3. The Cloud Functions Function Compute FC website is: https://fcnext.console.aliyun.com/overview
4. 依次点击左侧边栏的函数 -> 创建函数 -> Web函数。进入到创建Web函数的页面.
5. Function name assignment list, run environment selection Debian 10 or Debian 11, code upload method selection from a folder, start command entry: **./alist server --data /mnt/AList**
6. We need to upload a list of binary files, which are AList’s latest Linux AMD64 architecture binaries, obtained from https://github.com/AlistGo/alist/releases/latest. Download the latest version by extracting it as **alist-linux-amd64.tar.gz**.  You will get a file named **alist** which creates an empty folder and uploads this folder to the function.

![image](https://eo-r2.2x.nz/myblog/img/QmdajYeRyt1u3BSmRdGx8uUHKamGDkwoRe4TmEFZsJsaqS.webp)

7. Click left bottom corner to create.

8. The following steps are performed:  1.  Configure -> Network -> Network Editor -> Allow VPC: Yes -> Automatically configure. 2.  Configure -> Storage -> NAS file storage Edit -> Enable NAS file system -> Automatically configure. 3.  Configure -> Logs -> Enable log service

9. 现在回到 代码 界面，点击部署代码。稍等片刻会提示部署成功，然后点击 函数详情内的 HTTP触发器 ，复制公网访问地址。这个就是我们前文提到的要写到前端根目录的 env.production 文件的URL，将其填写进去，例如
   
   ```shell
   VITE_API_URL = "https://aliyun-fc-alist.run"
   ```

10. The content was not provided. Please provide the text you would like me to translate.

11. Attempt to access your AList frontend URL, which should successfully enter the login page of AList.

12. The instance currently has a new instance running. If one exists, proceed to the log file for that instance to view its logs, and you will see the administrator password generated during initialization, which can then be used to log in to AList from the front end URL and use it normally.

Okay, please provide the text. I’m ready when you are.

# The difficulty of solving these problems is a significant challenge for many students. A thorough understanding of the underlying concepts and effective problem-solving strategies are crucial for success. Students often struggle with applying theoretical knowledge to practical scenarios, requiring them to develop critical thinking skills and the ability to analyze complex situations. Furthermore, time management and attention to detail are essential when tackling challenging problems. Effective revision and practice are vital for reinforcing learned material and improving performance.

1. 如果出现正在加载储存：
   ![9aa460cd2dc84e1debe43e9df2d342fc](https://eo-r2.2x.nz/myblog/img/QmZVewYnKwCJzcShnkGTTVZJiTSUUSQi9u6pZ5rXRDK3rK.webp)
   查看你的日志，是否有存储加载失败，如果有可以尝试：
   1. 反复重新部署，直到能进后台然后删除那些加载失败的存储
   2. https://github.com/AlistGo/alist/discussions/3976