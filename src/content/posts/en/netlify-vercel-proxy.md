---
title: "Netlify vs Vercel: The Comparison"
description: "Using Netlify for website building is no longer a fantasy!"
category: "Writing"
draft: false
image: ../../assets/images/nvp.webp
lang: en
published: 2025-04-04
tags:
  - Netlify
  - Vercel
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# The core principles.

Currently, most residential addresses are unavailable via IPv4. However, we can obtain IPv6 through Netlify, enabling all users to access our site. This also serves as a general reverse DNS tutorial. The article further details the general reverse DNS tutorial for Vercel, but this technology is currently not supported for IPv6 in 2025, only allowing for reverse DNS protection for small-scale websites like ToT
# Formal commencement.

## Netlify is a platform for hosting static websites and web applications. It offers features like continuous deployment, serverless functions, and domain management, simplifying the process of deploying and managing online content.

Please go to [https://app.netlify.com/](https://app.netlify.com/) and register an account. (Note: It's recommended to use Google accounts for registration, as other methods may require verification and activation, which can be cumbersome.)
Next, create a new repository on GitHub and establish a new directory structure with a `netlify.toml`(https://github.com/settings/toml). Within this directory, configure the Netlify settings using the `netlify.toml`(https://github.com/settings/toml) file.

```toml
[[redirects]]
  from = "/*"
  to = "http://反代域名:反代端口/:splat"
  status = 200
  force = true
```

Please note that a trailing hyphen after the port number is mandatory.
Here’s a professional translation of the text:  “The [Home] v6 website recommends pairing DDNS (Dynamic DNS) with the service.”
Next, return to [https://app.netlify.com/create a new project, import your newly created GitHub project, and deploy it].
Please finalize your domain registration.

## Vercel’s platform provides a robust and scalable infrastructure for hosting web applications, offering features like CI/CD pipelines, serverless functions, and automated deployments. It streamlines the development process by enabling rapid iteration and efficient scaling of applications.

Please visit [https://vercel.com/](https://vercel.com/) to register and log in to your account.
To install Node.js, we require npm.
Install Vercel CLI

```
npm i -g vercel
```

Log into Vercel CLI.

```
vercel login
```

Create a folder on your desktop and name it randomly. Then, within that folder, create a JSON file with a randomly assigned name. The file should contain the data you wish to store. **Note: Currently, Vercel does not support IPv6 reversal!**

```json
{
    "version": 2,
    "routes": [
      {"src": "/(.*)","dest": "https://反代域名:端口"}
    ]
}
```

Then deploy.

```
verceL -A 你随意命名的.json --prod
```

Please finalize your domain registration.