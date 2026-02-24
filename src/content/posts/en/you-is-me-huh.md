---
title: "Are you me?"
description: "Open-source projects often bring a surprising number of inexperienced contributors."
category: "Record"
published: 2025-08-12
image: '../../assets/images/2025-08-12-15-44-06-image.webp'
tags: [CORS]
draft: false 
lang: en

---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article discusses a new feature within the Fuwari framework called Giscus and Umami, which restricts external access to comments from the user's own website.  Giscus requires a JSON file with CORS headers to ensure that only the origin specified in the file is allowed to access the comments, preventing unauthorized data transfer.  The author encourages users to modify their existing code and frameworks to adhere to this new policy, emphasizing its purpose as a collaborative learning platform rather than a template for copying.
:::

# Here’s the translation:  Press release summary.

Today, I received a small email.

![](../../assets/images/2025-08-12-15-45-18-image.webp)

I immediately recognized it.

Someone has withdrawn their inventory from my warehouse, but the comments section hasn’t updated to reflect their changes.

# Giscus only allows itself.

Please upload the file to the Giscus warehouse.

```json
<!-- giscus.json -->
{
  "origins": ["https://2x.nz"]
}
```

The configuration you’ve set up will prevent the inclusion of **your comments area** on its website, even if someone introduces it on its platform.

![](../../assets/images/2025-08-12-15-48-23-image.webp)

# The flavor of umami is exclusive to itself.

Here’s the translation:  “I have a blog that tracks website traffic using Umami. Previously, it wasn't recorded, and if you don't change anything, your site will be included in my analytics.”

Umami does not offer configuration options to modify CORS (as this traffic data was generated through reverse engineering).

However, my Umami framework has been extended to an EO (Enterprise Object) model, allowing me to directly define a set of CORS rules that only allow internal calls.

![](../../assets/images/2025-08-12-15-50-25-image.webp)

Even if you don’t change anything, this will not send the incorrect statistics to me. The CORS header prevents this.

![](../../assets/images/2025-08-12-15-51-04-image.webp)

# Finally.

Open source is intended to provide a better learning experience for my blog framework, not to be copied. Please ensure that all content, API endpoints, and private services are modified and implemented by you before going live.

If you’re feeling lazy, you can fork the upstream warehouse from blank paper [Rebuild](https://github.com/saicaca/fuwari).