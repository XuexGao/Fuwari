---
title: "Want a cookie manager? No need to code it yourself!"
description: "Cookie Consent is an open-source, simple cookie manager that makes your website GDPR compliant—just copy and paste!"
published: 2026-01-30
image: ../../assets/images/cookie-consent.webp
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This article explains how to implement a cookie consent banner using an existing solution (CookieConsent.com) instead of building a custom system. It walks through the setup process: selecting compliance options, configuring site details, categorizing third-party scripts, and embedding the provided JavaScript. The final result is a user-friendly consent popup that allows visitors to manage cookie preferences, with clear explanations and links to privacy policies.
:::

# Preface
Does your website have many trackers? Such as **Google Analytics, Google Adsense, Microsoft Clarity, Baidu Statistics** and so on?

Some of them track user experience and obtain site visit data, while others provide advertising to generate revenue for you...

However, users have the right to refuse certain things, such as refusing to transmit access information to Google, or allowing displayed ads to be unrelated to personalization, etc.

So how can we achieve allowing users to control where their data is transmitted?

You might think that we could first write an entry script to manage these JS files, execute JS only after the user agrees, or coordinate with a Service Worker to intercept certain requests.

This is certainly great for architecture design, but do we really need to hand-code a cookie manager? Why not use an existing solution instead?

[Download Cookie Consent Banner: GDPR + ePrivacy Directive](https://www.cookieconsent.com/) It's a great choice—just paste the JS script snippet provided by the website onto your site, and insert the returned JS script from the website! No need to write additional JS code, no need to manage complex Service Worker agreements! All of this is achieved through client-side JavaScript on the website!

# Formally begin

First, we enter [Download Cookie Consent Banner: GDPR + ePrivacy Directive](https://www.cookieconsent.com/) (with browser translation), scroll down, and locate the step-by-step diagram

Step one: First, select the basic logic

- Electronic Privacy Directive: When the user has not managed cookies, this is often the user's first visit to your website, allowing all managed JavaScript scripts to execute.
- GDPR + ePrivacy Directive: Literally, users are not allowed to load forever

![](../../assets/images/cookie-consent-1.webp)

Step two: Set your website name, layout style, and provide your privacy policy page.

First, fill in the website name, which will be displayed when managing user cookies.

![](../../assets/images/cookie-consent-3.webp)

Next, select the layout; you can see real-time changes and actual interaction styles on the website, which will not be elaborated further here.

Then, select the color scheme, which is currently hard-coded, but it is recommended to dynamically adjust it via JS in the future to automatically adapt to day/night modes.

The default language can be set to English. This manager offers up to **36 languages**, but there is no Simplified Chinese; however, Traditional Chinese is available within the actual manager. Nevertheless, English remains a good choice, as it is easy to read and the most widely used language, which is not an issue.

Ultimately, for the privacy policy, this is an optional setting, but strongly recommended. However, if you haven't configured it yet, there's no need to worry—just pre-fill a future privacy policy URL (starting with http/https), and I will explain later why this is almost a mandatory field.

![](../../assets/images/cookie-consent-2.webp)

Step three, import your JS

Ok, finally, we’ve reached the main part. Next, we need to categorize the various trackers (JS snippets) previously installed on our website and add them one by one into the Cookie Manager in an orderly manner.

The names here will only appear in the final code; site visitors can only toggle these four types on or off (which is why the previous section mentioned that you should almost always configure a privacy policy page, otherwise users wouldn't know what each of these four types corresponds to). Among them, the first type is mandatory, so you can place scripts here that are essential for the website to function properly (such as comment sections).

![](../../assets/images/cookie-consent-4.webp)

Step four: Copy the JS provided by the website and paste it after the `<body>` on your site. Remove any duplicate JS snippets.

One notable point is that once the user selects which cookies to enable on the first screen, how can they change these preferences later?

The website added a button with a special tag at the end of the provided code, namely `id="open_preferences_center"`. First, remove the code within the red box, otherwise it may break the layout. Next, find a place to position the **Edit your Cookie Preferences** button so users can easily change their cookie preferences, rather than requiring users to manually create a button to trigger this ID.

![](../../assets/images/cookie-consent-5.webp)

# Final effect

When users first visit, a pop-up will appear asking whether to allow cookies. Users can choose to allow all (I agree), decline all (I decline), or adjust settings (Change my preferences).

![](../../assets/images/cookie-consent-6.webp)

When the user selects Advanced Settings (Change my preferences), a window will pop up. The user will first see a text block that informs them what cookies are, why they are needed, and how cookies improve the browsing experience.

![](../../assets/images/cookie-consent-7.webp)

Next, users can individually set whether each of the four blocks is allowed. Each block will also directly and broadly inform users about what the cookies in that section can do. As mentioned earlier, the first block is always enabled.

![](../../assets/images/cookie-consent-8.webp)

The final "More Information" section places the privacy policy link we initially filled in, allowing users to easily navigate to the privacy policy page (provided you have written one) to gain a clear understanding of your website's privacy policy.

![](../../assets/images/cookie-consent-9.webp)

![](../../assets/images/cookie-consent-10.webp)