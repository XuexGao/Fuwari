---
title: "Are you looking for a review system without wanting to self-host, and suffering from annoying spam comments?"
description: "Here’s a professional English translation of the text:  “Giscus is an excellent comment section, built upon GitHub Discussions and requires no self-hosting or account management. It can be easily integrated with a single JavaScript file.”"
category: "Tutorial"
published: 2025-08-04
image: ../../assets/images/2025-08-04-12-14-21-image.webp
tags:
  - Giscus
  - 评论区
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}

:::

# Please provide the text you would like me to translate.

GitHub uses the Github Discussion feature to store user comments, without requiring self-hosting.

First, create a public warehouse (suggesting a clean, empty warehouse).

Enable Discussion Functionality in Warehouse Settings

![](../../assets/images/2025-08-04-12-16-36-image.webp)

Go to https://giscus.app/zh-CN

Please fill your warehouse.

![](../../assets/images/2025-08-04-12-17-42-image.webp)

The following mapping relationships are crucial!

- According to the provided path, comments and pages will always match if the path remains unchanged.

- Only change the **domain** to match the URL, and comments and pages will not be matched.

- As long as you change the **Title** on the comment and page, comments and pages will not match.

![](../../assets/images/2025-08-04-12-18-21-image.webp)

Please note that it is recommended to enable the following mappings: use strict title matching, avoid commenting on the same topic, and ensure a unique identifier for each discussion. This hash string will be inserted into every new discussion page comment section after you activate this feature. The mapping relationship between subsequent discussion pages and Github Discussions will depend on this hash string.

![](../../assets/images/giscus-akismet-1.png)

If you lose or make a mistake, I will create a new discussion with the same hash.

If the previous discussion hasn’t been deleted, and you want Giscus to assign a different Discussion, you need to manually calculate a hash string based on the default page title (this depends on the mapping relationship you've selected, if pathname is selected, it will be `posts/pin` ) and manually write this hash string into the Discussion you want Giscus map.

```sql
root@AcoFork-NAS:~# echo -n "posts/pin/" | sha1sum
6ae1aef4a17c896d06677a8e55c23b364bb82bbb  -
root@AcoFork-NAS:~#
```

Announcement(s)

![](../../assets/images/2025-08-04-12-22-07-image.webp)

Okay, please provide the text. I’m ready when you are.

![](../../assets/images/2025-08-04-12-22-25-image.webp)

Okay, please provide the text. I’m ready when you are.

![](../../assets/images/2025-08-04-12-22-57-image.webp)

Okay, please provide the text you would like me to translate. I will only output the translated text and adhere strictly to your instructions.

![](../../assets/images/2025-08-04-12-23-41-image.webp)

# Here’s the translation:  “Configure Akismet”

Akismet (Automattic Kismet) is a widely used spam filtering system, developed by Matthew Mullenweg, the renowned founder of WordPress. It’s also a default plugin for WordPress and has been widely adopted, with its primary goal being to assist blog websites in filtering out unwanted spam comments.

Register at [https://www.akismet.com](https://www.akismet.com)

Select Akismet Personal Subscription, set the slider to 0$, record the received Akismet API Key

![](../../assets/images/2025-08-04-12-27-58-image.webp)

https://github.com/afoim/giscus-fuwari/blob/main/.github/workflows/akismet-comment-check.yml

``` Deploy this GitHub Action to your GCloud project. ```

Okay, please provide the text. I’m ready when you are.

- AKISMET_API_KEY: Your Akismet API key

- GH_TOKEN：前往 https://github.com/settings/tokens 创建一个具有 `repo` `write:discussion` `user` 权限的Github个人令牌![](../../assets/images/2025-08-04-12-29-06-image.webp)

The test is effective. The comment is a spam review.

Has GitHub Action implemented a review process?

![](../../assets/images/2025-08-04-12-30-37-image.webp)

# Please provide the text you would like me to translate.

If someone is repeatedly posting but hasn’t been detected as spam, what steps should be taken?

You can contact the user’s personal information page to block them.

See the documentation on how to prevent unauthorized access to your account on GitHub: [https://docs.github.com/en/account-protection/prevent-unauthorized-access](https://docs.github.com/en/account-protection/prevent-unauthorized-access)

# Preventing new users from rating unfairly.

If someone keeps constantly posting low-quality reviews?

Using the provided link, I will translate the content into English. Please provide the content you would like me to translate.

Configure temporary interaction restrictions so new users cannot perform any operations on your storage library.

![](../../assets/images/2025-08-04-20-43-06-image.webp)