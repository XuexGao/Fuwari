---
title: "Want a Cookie Manager? No need to do it by hand!"
description: "Cookie Consent is an open-source, simple implementation of a Cookie Manager, enabling your website to comply with GDPR simply by copying and pasting!"
published: 2026-01-30
image: ../../assets/images/cookie-consent.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
This article provides a comprehensive guide on implementing cookie consent management on a website, leveraging a Cookie Consent Banner from Cookie Consent. It explains the process of integrating a cookie manager into the website’s codebase, focusing on user control and privacy policy configuration. The guide details the steps involved in setting up the system, including selecting appropriate language options, customizing layout, color schemes, and importing tracking scripts.  It highlights the use of a readily available Cookie Consent Banner as a solution to simplify this process, offering flexibility and ease of implementation compared to manual management.
:::

# Introduction
Does your website have many tracking tools, such as **Google Analytics, Google Adsense, Microsoft Clarity, Baidu Statistics**?

They are also tracking user experience, collecting website traffic data, and providing advertising revenue…

However, users have the right to refuse certain things, such as refusing to transmit access information to Google or having ads displayed that are not personalized.

How can we enable users to control where their data is sent?

You might consider writing an entry script to manage these JS, allowing users to agree to certain actions before executing them, or to intercept certain requests with Service Workers.

This is definitely a great approach for architectural design, but we really need to build a Cookie Manager ourselves? Why don’t we just use an existing solution instead?

[Download Cookie Consent Banner: GDPR + ePrivacy Directive](https://www.cookieconsent.com/) It’s a great option for providing you with the JavaScript snippets that manage your JS scripts on this website, and then simply insert those scripts into your site. You don't need to write any additional JS code; you don't have to manage complex Service Worker agreements! All of this is achieved through the JavaScript implemented within the client-side JavaScript of this website!

# Formal start

First, we enter [Cookie Consent Banner - GDPR + ePrivacy Directive](https://www.cookieconsent.com/). Scroll down, find the step-by-step guide.

Step one, first choose basic logic.

- Electronic Privacy Directive: When a user does not manage cookies, this often indicates their first visit to your website, allowing all managed JavaScript scripts to execute.
- GDPR + Electronic Privacy Directive: The literal meaning, users are not allowed to never load.

![](../../assets/images/cookie-consent-1.webp)

Second, set up the website name, layout style, and provide your privacy policy page.

First, enter the website name. This will be displayed when users manage cookies.

![](../../assets/images/cookie-consent-3.webp)

Next, choose the layout – you’ll see real-time changes and actual interactive styles online, no further explanation is needed.

Then choose a color palette, here is a hardcoded one, but it’s recommended to dynamically change it using JavaScript for automatic daylight/night mode adaptation.

The default language can be in English, and the manager offers up to **36**(https://en.wikipedia.org/wiki/List_of_languages_in_the_default_language_of_the_United_States) 26 languages, but it doesn’t have simplified Chinese. However, English is still a good choice – it's easy to read and has the highest usage rate.

Ultimately, privacy policy is an optional setting, but it’s strongly recommended to configure it. However, if you are currently not configured, don't worry about it; just pre-populate a future privacy policy URL (starting with http/https). We will explain why this is almost a mandatory step later.

![](../../assets/images/cookie-consent-2.webp)

Third step, import your JS.

Finally, it's time for the main event – we need to categorize and add all the tracking scripts (JS snippets) that were originally installed on our website, one by one, in a structured manner.

Here are the translations:  The name only appears in the final code, and website visitors can only manage these four types: open/close (this is why we said you were almost configuring a privacy policy page, otherwise users wouldn’t know what those four types correspond to), with the first type being mandatory – so you can include some unusual scripts that aren't running these non-operating websites (such as comment sections)

![](../../assets/images/cookie-consent-4.webp)

Fourth step: Copy the JavaScript code provided by the website and paste it into the `<body>` section of your website. Remove any duplicate JavaScript snippets.

One important point to note is that, after a user has successfully enabled cookies on the first screen and wants to change these preferences later, what should they do?

The website added a special button at the end of the provided code, which is `id="open_preferences_center"`. You should remove the red frame around it first, otherwise it might break the layout. Then, place this **edit_Cookie_Preferences** button in a location so that users can easily change their cookie preferences without needing to manually trigger this ID.

![](../../assets/images/cookie-consent-5.webp)

# Ultimately, the results will be satisfactory.

When a user first visits, a popup will appear asking if they allow Cookies. The user can choose to allow all (I agree), reject all (I decline) or customize their preferences (Change my preferences).

![](../../assets/images/cookie-consent-6.webp)

When you select advanced configuration options (Change my preferences), a window will appear, displaying text informing the user what cookies are, why they’re needed, and how cookies improve access experience.

![](../../assets/images/cookie-consent-7.webp)

The first block is always enabled.

![](../../assets/images/cookie-consent-8.webp)

More information (Privacy Policy) is located in the final block. Users can easily navigate to the privacy policy page by clicking on it, assuming you’ve already provided it.

![](../../assets/images/cookie-consent-9.webp)

![](../../assets/images/cookie-consent-10.webp)