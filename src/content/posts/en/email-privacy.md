---
title: "Enhance Blog Privacy through Email Obfuscation Techniques"
description: "Technical implementation of automatically obfuscating email addresses using the rehype-email-protection plugin to protect against spam crawlers."
published: 2025-08-12
author: "hxsyzl"
image: "https://fastr2.497995.xyz/fuwari/image/5fd0835b-93da-4edc-bde5-f0c8aaa24b93.webp"
tags: ["fuwari优化"]
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article explains how to protect email addresses on static websites using the `rehype-email-protection` plugin, which obfuscates emails via Base64 encoding to prevent spam bots from harvesting them. The setup requires minimal configuration in Astro’s `astro.config.mjs`, and the emails are decoded client-side via JavaScript, preserving usability while blocking crawlers. It’s a lightweight, effective privacy measure for static site developers.
:::

> This article is not originally written by the site administrator; it is provided by https://github.com/afoim/fuwari/pull/31

## Background

Exposing email addresses directly on web pages makes them highly susceptible to automatic harvesting by spam bots. To address this privacy and security issue, email address obfuscation techniques can be employed.

In submission `0cc6194f35b3ff4ab53718fd98022b17ac522303`, the project introduced the `rehype-email-protection` plugin to address this issue.

## Technical Solution: `rehype-email-protection`

`rehype-email-protection` is a Rehype plugin that automatically identifies and obfuscates email addresses during the website content processing workflow.

### Configuration Implementation

This feature is enabled by configuring it in the `astro.config.mjs` file.

First, import the plugin module:

```javascript
import rehypeEmailProtection from "./src/plugins/rehype-email-protection.mjs";
```

Then, add this plugin to the `rehypePlugins` array in your Astro configuration and specify `base64` as the obfuscation method.

```javascript
markdown: {
  rehypePlugins: [
    // ... 其他插件
    [rehypeEmailProtection, { method: "base64" }],
    // ... 其他插件
  ],
},
```

### Working mechanism

After the configuration takes effect, all standard email addresses in the content (e.g., `user@example.com`) will be converted into Base64-encoded strings during the website build process and decoded by client-side JavaScript.

For ordinary users, the browser executes scripts to decode the encoded string into an interactive `mailto:` link, maintaining the same functional experience. For web crawlers that cannot execute JavaScript, they can only retrieve the encoded, meaningless string, thereby achieving the purpose of protecting email addresses from being easily collected.

## Conclusion

Integrating the `rehype-email-protection` plugin is a simple and effective means of enhancing privacy. It significantly reduces the security risks associated with exposing email addresses on public web pages, at minimal configuration cost, and is a recommended practice in static site development.

Traffic diversion: www.497995.xyz Let the tree spare me 😭😭