---
title: "Netlify, Vercel Reverse Proxy Websites"
description: "Use Netlify, and building a website with home broadband is no longer a dream!"
category: "Reflections"
draft: false
image: ../../assets/images/nvp.webp
lang: en
published: 2025-04-04
tags:
  - Netlify
  - Vercel
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article explains how to use Netlify to proxy IPv6-only home broadband sites to IPv4 via a reverse proxy, enabling public access. It also covers a similar method using Vercel, though Vercel currently doesn't support IPv6 proxying. Both setups require domain binding and can be used for general reverse proxying, with Netlify being the preferred choice for IPv6 scenarios.
:::

# Principle and Approach

At this stage, most home broadband connections do not receive public IPv4 addresses, but they can obtain public IPv6 addresses. By using Netlify to set up a reverse proxy from IPv6 to IPv4, everyone can access your site. This is also a general reverse proxy tutorial for Netlify. This article also teaches a general reverse proxy tutorial for Vercel, but as of 2025, Vercel still does not support IPv6, so it can only be used to proxy sites like "Little Yellow Station" (ToT).
# Formally begin

## Netlify Section

First, go to https://app.netlify.com/ to register an account. (Note! It's best to register using a Google email, as registering with other methods may result in your account needing verification or activation, which can be very troublesome.)
Next, create a new repository on GitHub and create a `netlify.toml` file in the root directory. Write the following content in it:

```toml
[[redirects]]
  from = "/*"
  to = "http://反代域名:反代端口/:splat"
  status = 200
  force = true
```

Note: Do not omit the slash after the port!
Home broadband v6 website is recommended to be used with DDNS.
Next, go back to https://app.netlify.com/ to create a new project, import the GitHub project you just created, and deploy it.
Finally, bind your domain to complete!

## Vercel article

First, go to https://vercel.com/ to register and log in to your account.
When installing Node.js on a computer, we need to use npm.
Install Vercel CLI

```
npm i -g vercel
```

Log in to Vercel CLI

```
vercel login
```

Find a location (such as your desktop) to create a folder with any name you choose, then create a .json file within it with any name you prefer, and write into it. **Note that Vercel currently does NOT support reverse proxying IPv6!!!**

```json
{
    "version": 2,
    "routes": [
      {"src": "/(.*)","dest": "https://反代域名:端口"}
    ]
}
```

Then deploy

```
verceL -A 你随意命名的.json --prod
```

Finally, bind your domain to complete!