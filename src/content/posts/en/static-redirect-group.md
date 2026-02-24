---
title: "Completely Free! Build Your Own Short Link Service!"
description: "Build a pure static, unkillable short link using Cloudflare Worker + GitHub!"
published: 2026-01-14
image: ../../assets/images/static-redirect-group.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article explains a simplified self-hosted short-link service using only a Cloudflare Worker, avoiding the complexity of GitHub Pages + Cloudflare Workers separation. It integrates frontend and backend logic, uses JavaScript for redirection via 404 fallbacks, and supports expiration via GitHub Actions. Setup involves forking the repo, editing hardcoded values, setting up a GitHub token, and configuring Cloudflare WAF for protection.
:::

# Preface
This article shouldn't exist, as it's simply a basic self-deployment guide for the project, which should have been included in the repository's README. It was originally meant to be written by AI, but I found it overly fixated on that bizarre frontend-backend separation using GitHub Pages + Cloudflare Workers, which actually adds unnecessary work. In reality, the project only needs a single Cloudflare Worker. So since I'm writing it anyway, it's quite reasonable for me to publish this article.

# Project Principle
This project is similar to the previous short-link project, but it has simplified some aspects.

Firstly, this project integrates the front-end and back-end together. The front-end almost does no validation, with all validation handled on the back-end, eliminating the need to add rules back and forth between two separate projects.

Since the frontend of this project is very simple, with just two HTML files (one for the creation page and one for the redirect page), combining them does not result in bloat.

Moreover, this project no longer uses Cloudflare's server-side 301/302 redirects, thus breaking the 2000 static redirect limit (theoretically unlimited), instead directly using CDN: when a static asset returns a 404, it falls back to 404.html, where JavaScript performs short-link lookup and redirection (similar to Nginx's pseudo-static functionality).

Furthermore, if a pathname does not match any rule, it will be caught by a default fallback source, which can be compatible with similar cases such as https://2x.nz/posts/pin/ --> https://blog.acofork.com/posts/pin/

Then comes the logic for creating short links, which is actually similar to the previous project: the Worker proxies access to GitHub, modify the JS, add a new short link rule, and push it. This will automatically trigger a rebuild of the Cloudflare Worker. Wait a moment, then accessing the new pathname will result in the correct redirect.

Finally, we support expiration periods, and the principle is very simple: when the frontend creates a short link, it passes a field indicating when the link should expire to the backend. The backend then writes this information into a file, and finally, it uses a scheduled GitHub Action to clean up expired short links.

# Where to get a short link
My 2x.nz was purchased at https://porkbun.com for around $100 per year. Other extensions are also good, such as `.im` `.mk`

# Officially set up your short-link service

First, fork the repository

::github{repo="afoim/Static_Redirect_Group"}

Next, let's change some hardcoded elements. Since Cloudflare Worker cannot use environment variables for static assets, some things are hardcoded. Try searching for `afoim` in all HTML files and replace it with your own (you can also add an extra layer by creating a configuration and injecting the content via build, whichever you prefer).

Then, please edit the short links in the js folder to change them to what you want.

Next, create a GitHub Token that only has `repo` permissions.

Continue, bind secret environment variables, using `wrangler secret put XXX`

| Variable name | Value | Description |
| :--- | :--- | :--- |
| `GITHUB_TOKEN` | `ghp_xxxx...` | The token applied for just now |
| `GITHUB_OWNER` | Your GitHub username | For example `afoim` |
| `GITHUB_REPO` | `Static_Redirect_Group` | Your repository name |
| `BASE_DOMAIN` | Your short domain name | For example `u.2x.nz` or the default domain for Workers `xxx.workers.dev` |

At this point, accessing `/_url` will create your short link.

# Protection
Suggest protecting the short links used to create short links against bots (or Cloudflare Turnstile, rate limiting... your choice)

Create a WAF rule in Cloudflare

When the incoming request matches...
```sql
(http.host eq "你的域名" and (
  http.request.uri.path eq "/_url"
  or http.request.uri.path wildcard "/api/*"
))
```

Then take measures…

**Interactive Inquiry**