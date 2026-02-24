---
title: "Email obfuscation technology enhances blog privacy"
description: "Using the rehype-email-protection plugin, a technology is implemented to automatically obfuscate email addresses, thereby protecting against spam email detection by web crawlers."
published: 2025-08-12
author: "hxsyzl"
image: "https://fastr2.497995.xyz/fuwari/image/5fd0835b-93da-4edc-bde5-f0c8aaa24b93.webp"
tags: ["fuwari优化"]
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
The article explains how the `rehype-email-protection` plugin, introduced in the GitHub repository `fuwari`, addresses the privacy and security risk of exposing email addresses on websites via direct exposure. It details the configuration process, including importing the plugin module and specifying the `base64` method for encoding, ensuring that standard email addresses are converted to Base64 strings before being processed by clients, effectively protecting against automated email harvesting.
:::

This text is original content created by the author of the GitHub repository at https://github.com/afoim/fuwari, and was submitted as a pull request under the number 31.

## 背景

Here’s the translation:  “Exposing email addresses directly on a webpage significantly increases their susceptibility to automated spam harvesting by malicious entities. To mitigate this privacy and security risk, techniques for email address obfuscation can be employed.”

In response to the issue of rehype-email-protection, the project has integrated the `rehype-email-protection` plugin.

## Technical Solution: [[Rehype-Email-Protection]]

Rehype is a plugin that automatically identifies and obfuscates email addresses within website content processing workflows.

### 配置实现

The functionality is enabled through configuration within the `astro.config.mjs`(file).

First, import the plugin module.

```javascript
import rehypeEmailProtection from "./src/plugins/rehype-email-protection.mjs";
```

Here’s the translation:  “Add the plugin ‘rehypePlugins’ to the ``rehypePlugins`` array within Astro, and specify ``base64`` as a obfuscation method.”

```javascript
markdown: {
  rehypePlugins: [
    // ... 其他插件
    [rehypeEmailProtection, { method: "base64" }],
    // ... 其他插件
  ],
},
```

### Work processes.

Upon configuration, all standard email addresses within the content will be converted to Base64 encoded strings and subsequently decoded by the client-side JavaScript.

For standard users, a browser will execute scripts to revert the encoded data to an interactive `mailto:` link, while maintaining the functionality. For network crawlers that cannot execute JavaScript, they only retrieve meaningless strings resulting in the protection of email addresses from easy collection.

## Conclusion

The integration of the `rehype-email-protection`(https://github.com/rehype/rehype-email-protection) plugin offers a straightforward and effective privacy enhancement solution. Its low initial cost substantially mitigates security risks associated with exposing email addresses on publicly accessible websites, making it a recommended practice for static website development.

“I’m letting go of you, please,” the message reads.