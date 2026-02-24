---
title: "Allow Vercel to connect your S3 object storage (download only)"
description: "Many users have utilized object storage solutions, but a significant number lack a graphical interface. While services like AList have emerged as incredibly versatile, independent servers are still often required. This document will detail the implementation of a visually appealing S3 file download using Vercel Functions."
category: "Tutorial"
published: 2025-05-05
image: ../../assets/images/2025-05-05-07-45-06-image.webp
tags: [Vercel, Nextjs]
draft: false 
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
The article explains how to index files using S3cloudrive on Vercel, leveraging the OneDrive project as a source for file listings. It details the process of deploying the S3cloudrive index directly from GitHub, and highlights the potential for future integrations with other cloud storage providers like Tianyun Cloud. The user is seeking assistance with accessing the Tianyun Cloud PC driver login.
:::

Video tutorials (recommended): [https://www.bilibili.com/video/BV17b5gz5Ea4]

# Formal commencement.

The method for accessing the S3cloudrive index is straightforward: [GitHub - afoim/S3cloudrive-index: S3cloudrive public directory listing. Powered by Next.js.](https://github.com/afoim/S3cloudrive-index)

Please follow the deployment instructions outlined in the README file.

# The core principle.

Using the Vercel Function login to S3, we can pass file lists to the frontend for concatenation into a URL and display. The original project involved connecting to OneDrive, specifically the OneDrive public directory listing: [iRedScarf/onedrive-index: OneDrive public directory listing, and One-Click Deploy to Vercel. Powered by Vercel and Next.js.](https://github.com/iRedScarf/onedrive-index). This project only changed the backend storage type; theoretically, you could switch to any storage...

I am seeking assistance with the driver for Tianyun Cloud Drive PC, and I’ve been unable to log in to the authentication process. Could someone please help me?