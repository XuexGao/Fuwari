---
title: "Allow Vercel to connect to your S3 object storage (download only)"
description: "Here’s the translation:  Many users have utilized object storage solutions, but a significant number lack a graphical interface. While services like AList have emerged as incredibly versatile, independent servers are still often required. This document will detail the implementation of a visually appealing S3 file download using a Vercel Function."
category: "Tutorial"
published: 2025-05-05
image: ../../assets/images/2025-05-05-07-45-06-image.webp
tags: [Vercel, Nextjs]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article explains how to use S3cloudrive, a Next.js-powered index for listing files from S3, leveraging Vercel for deployment and connecting it to OneDrive. It highlights the simplified setup process involving GitHub repository access and straightforward deployment. The user is seeking assistance with integrating with 天翼云盘 PC’s driver, hoping for help with authentication issues.
:::

Video tutorial (Recommended): https://www.bilibili.com/video/BV17b5gz5Ea4

# Please provide the text you would like me to translate.

The S3cloudrive public directory listing is powered by Next.js.

Okay, please provide the text you would like me to translate.

# Okay, please provide the text. I’m ready when you are.

Using Vercel Function to log into S3, receive a list of files to pass to the frontend and display them as URLs, this project is redesigning the backend integration with storage.  The original project was connecting to OneDrive: [iRedScarf/onedrive-index: OneDrive public directory listing, and One-Click Deploy to Vercel. Powered by Vercel and Next.js](https://github.com/iRedScarf/onedrive-index). This project only changes the storage type on the backend, theoretically you can switch to any storage...

“I’m trying to connect my personal PC to the Tianyun Cloud Drive, but login authentication is consistently failing. Can anyone help me?”