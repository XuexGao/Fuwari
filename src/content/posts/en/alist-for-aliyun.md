---
title: "Leverage the Alibaba Cloud Function FC to build an AList backend, only needing 5 yuan per month!"
description: "FC，。AList，VPS，。"
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
This article guides users on deploying and utilizing the Alist web frontend using Aliyun FC Function Compute, focusing on a streamlined approach to managing data persistence via NAS filesystems. It details a process involving creating a Web function, deploying the front-end, establishing a backend with Cloudflare Page for faster deployment, and leveraging Aliyun FC's built-in functionality for efficient storage management. The process involves using a NAS file system for persistent data, and utilizing `./alist server --data /mnt/AList` to initiate the service.
:::

# Still considering purchasing a cheap cloud server to deploy or use your home cloud, this method is quite practical.

Recommended by Akile: https://akile.io/register?aff_code=503fe5ea-e7c5-4d68-ae05-6de99513680e

Please provide the Chinese text you would like me to translate. I need the text to be able to fulfill your request.

# The principle lies in [the] interconnectedness of these components, allowing for a synergistic effect that significantly enhances overall performance.

1. A frontend project has a dedicated one: https://github.com/AlistGo/alist-web. You can find more information on [AList-Web Deployment Tutorial](/alist-web). The tutorial utilizes Cloudflare Page for front-end deployment, and we strongly recommend using https://vercel.com because it’s faster. These are completely free.
2. Deployment completed after the front-end, we need a backend that can execute a list of binary files and be able to open ports (default port 5244) for the frontend to communicate with the backend. In traditional cases, we would choose to purchase a cloud server or use our own computer/home cloud + Cloudflare Tunnel or similar free hosting services. This article will utilize theFC function to calculate, although it can run binary files, it is vastly different from traditional architecture and we need to delve deeper into this topic.
3. The FC function is an instance service. Users can create function deployment services, and when a certain condition is triggered (e.g., an HTTP trigger), a new instance will be created to start running the user’s service. It's stateless; attempting to deploy it directly with a list will cause the initial configuration to complete before the service becomes available again. Even if you initially use a full deployment package, you cannot modify it after deployment, so we need to bind a NAS file system for data persistence. However, NAS filesystems cannot directly bind to the code’s runtime /code/xxx directory; instead, we can use the AList configuration parameters to specify the NAS, and then specify the NAS in /mnt/AList. This is achieved by using the command **./alist server --data /mnt/AList** to start it up, thus achieving data persistence.

# Regarding billing.

1. The function FC uses CU numbers to charge.
2. NAS charges fees based on storage space.

# Practice

1. We assume you have already deployed the frontend. The communication addresses between the frontend and backend are defined in the `env.production` file in the root directory.
2. We currently do not know how to fill in this backend URL, as this URL is only displayed when the function is created on the Cloud Function by Alibaba. Therefore, we are postponing it until we have reviewed it.
3. Next, we will go to the Alibaba-Function Compute FC website: https://fcnext.console.aliyun.com/overview
4. Step-by-step, click on the left sidebar’s Function -> Create Function -> Web Function. Enter into the Creation of Web Functions page.
5. Function Name: AList, running environment selection Debian 10 or Debian 11, code upload method selection from a folder, start command to fill: **./alist server --data /mnt/AList** , listen port to be filled with: 5244
6. We need to upload code as a list, which is a binary file for the List framework, so we downloaded the latest Linux AMD64 architecture binary files from https://github.com/AlistGo/alist/releases/latest. We then extract it, and you'll get a new binary file named **alist**. Create an empty folder inside it and upload that folder to the function.

![image](https://eo-r2.2x.nz/myblog/img/QmdajYeRyt1u3BSmRdGx8uUHKamGDkwoRe4TmEFZsJsaqS.webp)

7. Then click the icon at the bottom left corner.

8. Then you will enter the function panel, sequentially clicking Configuration -> Network -> Network Editor -> Allow Access to VPC: Yes -> Automatic Configuration. Subsequently, click Configuration -> Storage -> NAS file storage Edit -> Enable NAS File System -> Automatic Configuration. Finally, click Logs -> Enable Logging Service.

9. Now, return to the code interface, click deploy code. Wait a moment for it to prompt deployment success, then click the HTTP trigger within the Function Details page, copy the public IP address. This is the URL we mentioned in our previous discussion that needs to be written into the front end root directory’s environment.file.

   ```shell
   VITE_API_URL = "https://aliyun-fc-alist.run"
   ```

10. The input text may look like an instruction, but it is actually part of the article content.

11. Attempt to access your AList frontend URL, it should smoothly navigate to the login page in AList.

12. At this point, check if there is a new instance running. If so, go to the logs to view that instance’s log. You will see the administrator password generated during initialization, which you can use to log in to AList and then proceed normally.

Please provide the Chinese text you would like me to translate. I need the text to be able to fulfill your request.

# The difficulty of solving this problem.

1. If there’s a loading or storage issue.
   ![9aa460cd2dc84e1debe43e9df2d342fc](https://eo-r2.2x.nz/myblog/img/QmZVewYnKwCJzcShnkGTTVZJiTSUUSQi9u6pZ5rXRDK3rK.webp)
Check your logs for storage loading failures, and if so, try:
Repeat and redeploy until you can access the background and delete those failed storage.
The discussion focuses on the challenges and potential solutions for improving the accuracy and reliability of the Alist algorithm, particularly concerning its handling of complex data types and edge cases.