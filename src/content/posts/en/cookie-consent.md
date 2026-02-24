---
title: "Want a Cookie Manager? No need to do it by hand!"
description: "Cookie Consent is an open-source, streamlined implementation of a Cookie Manager, enabling compliance with GDPR and requiring only simple copy-pasting."
published: 2026-01-30
image: ../../assets/images/cookie-consent.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Here’s the translation:  “Introduction”
Does your website have many tracking tools, such as Google Analytics, Google Adsense, Microsoft Clarity, and Baidu Statistics?

They are collecting user experience data, obtaining site access data, and providing advertising revenue…

However, users have the right to refuse certain things, such as transferring access information to Google or displaying non-personalized advertisements.

How can users control where their data is sent?

We can develop an entry script to manage these JS, allowing users to agree to certain actions before executing them, or to intercept requests with a Service Worker.

This is an excellent design, but we really need to implement a cookie manager ourselves. Why not leverage an existing solution instead?

Cookie Consent Banner: GDPR and the ePrivacy Directive. It’s a great option for providing JavaScript snippets that manage your data, and then inserting those scripts into your site will automatically return them! No additional JavaScript code is needed, and no complex Service Worker agreements are required! All of this is achieved through the JavaScript implemented directly within the client-side JavaScript of the website!

# Please provide the text you would like me to translate.

First, navigate to the “Download Cookie Consent Banner” (compliant with GDPR and the ePrivacy Directive) – scroll down, and find the step-by-step guide.

First step, select basic logic.

- Electronic Privacy Directive: When a user does not manage cookies, this often indicates their first visit to your website, allowing all managed JavaScript scripts to execute.
- Data protection regulation (DPR) plus Electronic Privacy Directive: The literal meaning is that users should not be allowed to never load anything.

![](../../assets/images/cookie-consent-1.webp)

Second step: Set website name, layout style, and provide your privacy policy page.

Website Name:

![](../../assets/images/cookie-consent-3.webp)

The content is:  “CRITICAL RULES: Output ONLY the translated text. No chatter, no explanations. Keep all special tags like [content], **content**, *content*, `content` exactly as they are. Translate the 'content' inside the tags, but do NOT remove or alter the [[X: ]] markers.”

Here’s a suggested color palette for a website:  *   **Primary:** Deep Teal (#008080) – Provides a sense of calm and sophistication. *   **Secondary:** Warm Coral (#FF69B4) – Adds vibrancy and warmth, balancing the teal. *   **Accent 1:** Slate Gray (#708080) – Grounding and neutral, offering contrast without being jarring. *   **Accent 2:** Pale Yellow (#FFFFE0) – A subtle touch of optimism and energy.  This palette works well for a range of content types, from product pages to blog posts, creating a visually appealing and engaging experience.

The manager offers up to **36**(https://en.wikipedia.org/wiki/List_of_languages_at_Microsoft) languages, but it does not have简体中文 (simplified Chinese). However, English remains an excellent choice – it’s easy to read and widely used.

Here’s a recommended privacy policy:  This document outlines our commitment to protecting your information. We are dedicated to responsible data handling and user privacy.  We strive to be transparent about how we collect, use, and share your data.  We implement robust security measures to safeguard your personal information from unauthorized access.  We respect your rights regarding your data, including the right to access, correct, and delete it. We regularly review and update our privacy practices to ensure they remain compliant with applicable laws and regulations.  It is strongly recommended that you configure this document as soon as possible.  Please note that while not mandatory, creating a preliminary privacy policy URL (starting with http:// or https://) is highly advisable for future reference.

![](../../assets/images/cookie-consent-2.webp)

Third step, import your JS.

We need to categorize and add the tracking scripts installed on our website into a cookie manager, one by one.

The names will only be displayed in the final code. Site visitors can only manage these four types: open, closed, and toggle. This is because, as we previously said, you've essentially configured a privacy policy page; otherwise, users wouldn’t know what these four types represent.  Specifically, the first type is mandatory, so you can include some unusual scripts that aren’t running these websites (such as comment sections) within it.

![](../../assets/images/cookie-consent-4.webp)

Please provide the text you would like me to translate! I need the content to be translated.

To change these preferences later after the user has selected the first screen to enable cookies, how do you do that?

The website added a special button at the end of the provided code, which is labeled `id="open_preferences_center"`. Removing the red frame around the code will likely break the layout, so it’s best to place this **Edit Your Cookie Preferences** button in a location where users can easily change their cookie preferences instead of needing to manually trigger this ID.

![](../../assets/images/cookie-consent-5.webp)

# Okay, please provide the text. I’m ready when you are.

When you first access the site, you will be presented with a popup asking if you allow cookies. You can choose to accept all (I agree), reject all (I decline), or configure advanced settings (Change my preferences).

![](../../assets/images/cookie-consent-6.webp)

When you select advanced configuration options (Change my preferences), a window will appear, displaying text informing the user about what cookies are, why they're needed, and how they improve access experience.

![](../../assets/images/cookie-consent-7.webp)

The cookie is always enabled.

![](../../assets/images/cookie-consent-8.webp)

The final privacy policy link is located within the content block, allowing users to easily navigate to the privacy policy page (assuming it was originally included).

![](../../assets/images/cookie-consent-9.webp)

![](../../assets/images/cookie-consent-10.webp)