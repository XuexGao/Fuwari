---
title: "Email obfuscation technology enhances blog privacy"
description: "Here’s a professional English translation of the text:  “The rehype-email-protection plugin automatically obfuscates email addresses to mitigate the risk of being targeted by spam crawlers.”"
published: 2025-08-12
author: "hxsyzl"
image: "https://fastr2.497995.xyz/fuwari/image/5fd0835b-93da-4edc-bde5-f0c8aaa24b93.webp"
tags: ["fuwari优化"]
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

This content is not original by the company, and was provided by https://github.com/afoim/fuwari.

## Please provide the text! I need the text to translate.

Email addresses can be exposed directly on websites, making them susceptible to spam filtering by automated email collectors. To address this privacy and security concern, email address obfuscation techniques can be employed.

In the project, a rehype-email-protection plugin was introduced to address this issue.

## Here’s the translation:  Technical solutions are needed to protect email from spoofing and phishing attacks.

Rehype is a plugin that automatically identifies and obfuscates email addresses within website content processing workflows.

### Okay, please provide the text you would like me to translate. I’m ready when you are.

The feature can be enabled by configuring it in the `astro.config.mjs` file.

Please provide the text you would like me to translate.

```javascript
import rehypeEmailProtection from "./src/plugins/rehype-email-protection.mjs";
```

``` `rehypePlugins` = "Plugin Name" ```

```javascript
markdown: {
  rehypePlugins: [
    // ... 其他插件
    [rehypeEmailProtection, { method: "base64" }],
    // ... 其他插件
  ],
},
```

### Okay, please provide the text. I’m ready when you are.

Configuration is applied after the content includes all standard email addresses (e.g., `user@example.com`) and is encoded as Base64 strings for use in the client-side JavaScript during website construction.

For ordinary users, browsers will execute scripts to decompress the encoded content into interactive `mailto:` links, but the functionality remains unchanged. For network crawlers that cannot execute JavaScript, they can only retrieve meaningless strings, thereby achieving the purpose of protecting email addresses from easy collection.

## Please provide the text you would like me to translate.

The rehype-email-protection plugin is a simple and effective privacy enhancement tool. It offers a low cost solution that significantly reduces security risks associated with exposing email addresses on public websites, making it a recommended practice for static website development.

“I’m letting go of you, and I’m heartbroken.”