---
title: "Are you looking for a review system without needing to self-host, and tired of being harassed by spam reviews?"
description: "Giscus is a robust comment section built on the GitHub Discussion platform, offering a self-hosted solution without requiring manual setup or account management. It’s simply accessible with a single JavaScript integration."
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

# 配置Giscus

Giscus utilizes the GitHub Discussion feature to manage user comments, without requiring self-hosting.

First, you need to establish a **public warehouse** (it’s recommended to start with a clean, empty warehouse).

In warehouse settings, enable the “Enable Discussion” functionality.

![](../../assets/images/2025-08-04-12-16-36-image.webp)

Please visit [https://giscus.app/zh-CN](https://giscus.app/zh-CN).

First, please populate your inventory through verification.

![](../../assets/images/2025-08-04-12-17-42-image.webp)

The following `mapping relationships` are critically important!

- Here’s the translation:  “If your article path is **(Recommended)**, then any changes to that path will automatically match comments and pages.”

- Only change the domain name to match comments and pages.

- Any change to the title will prevent matching comments and pages.

![](../../assets/images/2025-08-04-12-18-21-image.webp)

**Please note the following guidelines:**:  It is recommended to `enable strict title matching` and **avoid commenting in parallel**. Once activated, Giscu will insert a unique identifier for each new discussion (comment section) based on your chosen mapping relationship. Subsequent discussion sections will then rely on this hash string, which is written as a comment within each discussion's main text.

![](../../assets/images/giscus-akismet-1.png)

If you lose it or make a mistake, we will create a new discussion with the same name and include a unique hash tag.

If the previous discussion hasn’t been deleted and you wish to have Giscus assign a different discussion, you need to calculate a hash string using the default page title assigned to Giscus (dependent on the mapping relationship you've selected – if pathname is selected, it will be `posts/pin`). Then, manually enter the hash string into the discussion you want Giscus to map.

```sql
root@AcoFork-NAS:~# echo -n "posts/pin/" | sha1sum
6ae1aef4a17c896d06677a8e55c23b364bb82bbb  -
root@AcoFork-NAS:~#
```

Recommended classification: **Announcements**

![](../../assets/images/2025-08-04-12-22-07-image.webp)

Specific options can be selected on demand.

![](../../assets/images/2025-08-04-12-22-25-image.webp)

Select your preferred theme based on your preferences. Changes to the theme will immediately reflect.

![](../../assets/images/2025-08-04-12-22-57-image.webp)

Please provide the JavaScript code you would like me to translate into professional English. I need the text to be translated!

![](../../assets/images/2025-08-04-12-23-41-image.webp)

# Configuration for Akismet.

Akismet (Automattic Kismet) is a widely used spam filter system, developed by Matthew Mullenweg, the renowned founder of WordPress. It’s also a default plugin for WordPress and has become incredibly popular due to its function of assisting blog websites in filtering out unwanted comments.

Registered at [akismet.com](https://akismet.com/)

Select the Akismet Personal subscription, and adjust the slider to zero $, record the resulting Akismet API key.

![](../../assets/images/2025-08-04-12-27-58-image.webp)

Go to https://github.com/afoim/giscus-fuwari/blob/main/.github/workflows/akismet-comment-check.yml

Deploy this GitHub Action to your repository that has been configured with Ginkgo.

配置Secret：

- AKISMET_API_KEY: Your Akismet API key

- GH_TOKEN：前往 https://github.com/settings/tokens 创建一个具有 `repo` `write:discussion` `user` 权限的Github个人令牌![](../../assets/images/2025-08-04-12-29-06-image.webp)

“Testing the effectiveness of spam filtering,” the message contains the comment “`viagra-test-123`”. This comment is expected to be flagged as spam.

Here’s a professional translation of the text:  “Has the GitHub Action feature been implemented with automated review processes?”

![](../../assets/images/2025-08-04-12-30-37-image.webp)

# Blocking users.

If someone consistently engages in screen scraping without detection, is it possible that the system isn’t recognizing it as such?

You can manually block this user through their personal information page.

See the following document regarding preventing user access to your account: [GitHub Documentation: Preventing User Access].

# Preventing new users from artificially inflating ratings is a crucial aspect of maintaining platform integrity and fostering trust. Addressing this issue proactively can significantly improve the overall quality of user reviews and contribute to a more balanced and reliable assessment system.

If someone consistently engages in excessive online review or feedback solicitation, it may indicate a problematic behavior.

使用 https://github.com/你的用户名/你的仓库/settings/interaction_limits

Implement temporary interaction restrictions to prevent new users from accessing your storage repository.

![](../../assets/images/2025-08-04-20-43-06-image.webp)