---
title: "Strictly Translated! Build your own short chain service!"
description: "Utilize Cloudflare Worker+GitHub to build a pure static, non-wormish short chain!"
published: 2026-01-14
image: ../../assets/images/static-redirect-group.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This project utilizes a simplified approach to creating static redirects, leveraging Cloudflare Workers for efficient handling of 404 errors and dynamic routing. It’s designed to be self-deployable using a GitHub repository README, offering a streamlined solution for managing redirects without requiring manual configuration or extensive scripting. The core functionality centers around a Worker proxy that directly serves the `/_url` endpoint, triggering Cloudflare Workers to rebuild the redirect chain and provide fullbacks to the 404 page.  The project’s architecture relies on a straightforward approach utilizing GitHub Actions to automatically trigger the rebuilding of shortchains, ensuring consistent routing updates.
:::

# Introduction
The article segment is a simple self-deploy tutorial for this project, which should be placed in the README of the repository. It was originally intended to be outsourced by AI, but it has become overly focused on the bizarre and intricate interplay between the GitHub Page+Cloudflare Worker front-end and back-end separation, adding considerable work. In fact, a single Cloudflare Worker is sufficient for this project, so it’s reasonable to have me write it by hand.

# Project Principles
The project and the previous short chain project are similar, but simplified some things.

First, this project integrates the front-end and back-end, with almost no validation happening on the front-end; all validation is handled in the backend, eliminating the need for two separate projects to implement rules.

Due to this project’s frontend being very simple, it’s just two HTML files (one for creating a page and one for redirecting pages), so combining them doesn’t make it bloated.

The project no longer utilizes Cloudflare service-side 301/302 redirects, which has exceeded the limit of 2000 static redirections, theoretically unlimited. Instead, it directly uses CDN to fullback to 404.html when a 404 error occurs for static assets. Then, JavaScript will perform short chain queries and redirect (similar to Nginx's fixed-content).

Following up, if a pathname doesn’t match any rules, it will be caught by a default fallback origin, allowing compatibility with similar URLs: https://2x.nz/posts/pin/ --> https://blog.acofork.com/posts/pin/

Then, the logic for creating short chains is similar to a project, essentially involving worker proxies accessing GitHub, modifying JavaScript to add a new short chain rule, and then pushing it. This will automatically trigger Cloudflare Worker’s rebuild, after which you can access the new pathname correctly.

We have implemented a longer expiration period, and the principle is remarkably straightforward. When creating short chains on the frontend, we send a field indicating when the expiration date will expire to the backend; the backend then writes this information to a file, and finally, GitHub Action's scheduled monitoring clears expired short chains.

# Where to get a short chain?
My 2x.nz is purchased from porkbun.com, and it costs around one hundred dollars a year. Other suffixes are also good, such as `.im` `.mk`.

# Formally build your short chain service.

First, Fork Warehouse.

GitHub repository: afoim/Static_Redirect_Group

Next, I will modify some hardcoded elements due to Cloudflare Worker not being able to use environment variables. Some things are hardcoded in all HTML files; try `afoim` for these changes to be replaced with your (you can also add a layer and write a configuration, then inject content through building).

Then, edit the short chain folder in the js directory to your desired.

Following up, create a GitHub token with only `repo` permission.

Further, bind secret variables using `wrangler secret put XXX`.

| Variable name | Value | The table cell content is:  “The company’s revenue increased by 15% year-over-year.” |
| :--- | :--- | :--- |
| GITHUB_TOKEN | C:ghp_xxxx... | Just applied token |
| GitHub Owner | Your GitHub username | `afoim` |
| GitHub Repository | Static Redirect Group | Your warehouse name |
| C:BASE_DOMAIN | Your short chain domain name | Worker’s default domain `xxx.workers.dev` |

At this time, you can create your short chain by accessing `/_url`.

# Protective measures.
Recommended to protect short-chain networks from spam (or Cloudflare Turnstile, rate limiting…)

In Cloudflare, create a WAF rule.

When the request matches…
```sql
(http.host eq "你的域名" and (
  http.request.uri.path eq "/_url"
  or http.request.uri.path wildcard "/api/*"
))
```

Then take action…

Interactive inquiry **Interactive Inquiry**