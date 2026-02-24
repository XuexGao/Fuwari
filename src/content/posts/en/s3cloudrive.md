---
title: "Connect Vercel to Your S3 Object Storage (Read-Only)"
description: "Many have used object storage, but most of them lack a graphical interface. Although there has been a very capable service like AList in recent years, it still requires an independent server. This article will use Vercel Function to build a beautiful S3 file download."
category: "Tutorial"
published: 2025-05-05
image: ../../assets/images/2025-05-05-07-45-06-image.webp
tags: [Vercel, Nextjs]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This tutorial shows how to deploy a Next.js-based public directory listing for S3-compatible cloud storage using Vercel Functions. It’s adapted from an original OneDrive project, with the backend modified to work with any S3-compatible service. The author notes they’re struggling to integrate Tianyi Cloud Drive due to authentication issues and seeks help.
:::

> Video tutorial (recommended): https://www.bilibili.com/video/BV17b5gz5Ea4

# Formally begin

The usage is very simple: enter the GitHub repository: [GitHub - afoim/S3cloudrive-index: S3cloudrive public directory listing. Powered by Next.js.](https://github.com/afoim/S3cloudrive-index)

Deploy according to the README.

# Principle

Use Vercel Function to log in to S3, retrieve the file list, and pass it to the frontend to concatenate URLs for display. The original project was integrated with OneDrive: [iRedScarf/onedrive-index: OneDrive public directory listing, and One-Click Deploy to Vercel. Powered by Vercel and Next.js.](https://github.com/iRedScarf/onedrive-index). This project only changes the backend storage type; theoretically, you can modify it further to integrate with any storage service...

I want to integrate with the PC driver of Tianyi Cloud Disk, but the login authentication never works. Does anyone here know how to help me?