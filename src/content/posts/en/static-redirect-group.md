---
title: "完全免费！搭建一个自己的短链服务！"
description: "Leveraging Cloudflare Worker and GitHub, create a pure static, immutable short-chain!"
published: 2026-01-14
image: ../../assets/images/static-redirect-group.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article outlines a project focused on creating a simple static redirect service using Cloudflare Workers and GitHub Actions, streamlining the process of generating short links. It details the core functionality – including handling 404 errors, leveraging CDN for static assets, and implementing a dynamic short chain logic via Worker proxy access.  The guide emphasizes utilizing a GitHub Action workflow for automated maintenance and security measures like token management and WAF rules.
:::

# Here’s the translation:  “Introduction”
This is a simple self-deploy tutorial for the project, which should be placed in the README of the repository. Originally, it was intended to be handled by AI, but it has added considerable work. In fact, all that’s needed is a Cloudflare Worker; since we're required to write it ourselves, it’s reasonable to include this as part of the project.

# Project principles
The project and the previous short chain project are similar, but they have been simplified.

The project will integrate the front-end and back-end, with almost no validation performed on the front-end; all validation is handled in the backend. No two projects need to be combined for this process.

Due to the project’s frontend being simple, with two HTML pages (one for creating and one for redirecting), combining them doesn't add unnecessary bulk.

The project no longer utilizes Cloudflare’s 301/302 redirects, effectively breaking the 2000 static redirect limit and potentially being infinite in scale. Instead, it directly uses a CDN to handle 404 errors for static assets, forwarding them to the 404.html file using JavaScript for short-chain queries and reloads (similar to Nginx's full-back).

The content is a discussion about the potential for a new, more efficient method of data storage and retrieval, leveraging a novel approach to address limitations in existing systems.

The goal is to create a short chain logic, similar to an existing project. This involves worker agents accessing GitHub, modifying their JavaScript code to add a new short chain rule, and then pushing this change. This will trigger Cloudflare Worker’s re-build, which will then automatically redirect based on the new pathname.

The system has been approved for a valid expiration period, the principle is simple. When creating short chains in the frontend, send a field indicating when the expiration date should be updated to the backend. The backend will then write this information to a file, and Github Action’s scheduled monitoring will clear expired short chains.

# Where to find a short chain?
My 2x.nz is purchased from porkbun.com for around one hundred dollars a year. Other suffixes are also good, such as `.im` and `.mk`.

# Formalize your short chain service.

First, clone the repository.

github repository

Please provide the text you want me to translate.

Please provide the content of the short chain folder. I need the content to edit it.

Please provide the content you would like me to translate into English.

Continue, bind secret variables, using `wrangler secret put XXX`.

Okay, please provide the text. I’m ready when you are.
Okay, please provide the text. I’m ready when you are.
GitHub token
Okay, please provide the text you would like me to translate. I’m ready when you are.
GitHub Repository Name
Okay, I understand. Please provide the text you would like me to translate.

Please create your short chain at `/_url`.

# Protection
Protecting short chains from bots and rate limiting is crucial.

Create a Cloudflare WAF rule for this.

当传入请求匹配时...
```sql
(http.host eq "你的域名" and (
  http.request.uri.path eq "/_url"
  or http.request.uri.path wildcard "/api/*"
))
```

Then take action...

Interactive inquiry