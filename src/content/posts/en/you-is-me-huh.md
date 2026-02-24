---
title: "Are you me?"
description: "“Open-source projects often attract a significant number of inexperienced contributors, leading to the completion of changes that are difficult to fully revert. This results in comments being flagged by me, and website analytics showing increased activity.”"
category: "Record"
published: 2025-08-12
image: '../../assets/images/2025-08-12-15-44-06-image.webp'
tags: [CORS]
draft: false 
lang: en

---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article details a new feature in Fuwari, an open-source blog framework, that restricts the visibility of comments from specific sources – specifically, Giscus and Umami – to prevent accidental data leakage.  The updated system requires users to explicitly configure these repositories with a JSON file containing CORS rules, ensuring only their own APIs can be accessed.  Ultimately, the article emphasizes that developers should not simply copy and paste code or API endpoints without adapting them to their own projects.
:::

# Please provide the text! I need the text to translate.

Today I received an email.

![](../../assets/images/2025-08-12-15-45-18-image.webp)

I saw it immediately.

Someone has left my warehouse empty but the comments section hasn’t changed their own.

# Please provide the text you would like me to translate.

Used the Giscus warehouse for a file.

```json
<!-- giscus.json -->
{
  "origins": ["https://2x.nz"]
}
```

The content is being blocked from being displayed on the website.

![](../../assets/images/2025-08-12-15-48-23-image.webp)

# Umami only allows itself.

My blog has a website analytics based on Umami, which was previously unauthenticated. If you don’t change anything, your visit will be recorded on my site 😅

Umami does not offer configuration options to change CORS (since this access tracking is an inverse calculation).

However, my Umami suite has been updated with CORS, allowing me to directly write a set of CORS rules that only allow myself to call.

![](../../assets/images/2025-08-12-15-50-25-image.webp)

Please provide the text you would like me to translate.

![](../../assets/images/2025-08-12-15-51-04-image.webp)

# Okay, please provide the text. I’m ready when you are.

Open source is intended to help better learn my blog framework; do not copy and paste the entire content, API endpoints, and private services. Please confirm that all content, API endpoints, and private services are changed and replaced with your own before deploying them.

You are being offered a new opportunity to start your own business from scratch, with a blank slate.