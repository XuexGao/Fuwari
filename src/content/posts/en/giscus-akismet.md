---
title: "Are you looking for a commenting system but don't want to self-host? And are you tired of spam comments?"
description: "Giscus is such a great comment section—it's based on GitHub Discussions, requires no self-hosting, no account management on your part, and you can use it simply by including one JS file!"
category: "Tutorial"
published: 2025-08-04
image: ../../assets/images/2025-08-04-12-14-21-image.webp
tags:
  - Giscus
  - 评论区
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="qwen/qwen3-vl-8b"}
This guide explains how to configure Giscus for GitHub Discussions-based commenting, emphasizing pathname mapping and strict title matching to avoid comment misalignment. It also covers integrating Akismet for spam filtering via GitHub Actions, using an API key and personal token, and includes steps to block users or limit new user interactions to prevent spam.
:::

# Configure Giscus

> Giscus uses GitHub Discussion to store user comments without requiring self-hosting.

First, you need to create a **public repository** (it is recommended to create a new, clean, empty repository).

Then enable the `Discussion` feature in the repository settings.

![](../../assets/images/2025-08-04-12-16-36-image.webp)

Go to https://giscus.app/zh-CN

First, fill your warehouse by checking

![](../../assets/images/2025-08-04-12-17-42-image.webp)

The following `mapping relationship` is very important!

- pathname **（Most Recommended）**: If your article's path is `posts/helloworld`. As long as you ensure this path remains unchanged, comments and pages will always match.

- URL: As long as you change **domain name**, comments and pages will no longer match.

- As long as you change ****, the comments and page will no longer match

![](../../assets/images/2025-08-04-12-18-21-image.webp)

**It is important to note that**: it is recommended to **check** `Use strict title matching` to **avoid comment cross-talk**. Once enabled, Giscus will insert a unique *sha1 fingerprint* for each new Discussion (the comment section of a new page) based on your selected mapping relationship. All subsequent mappings between page comment sections and GitHub Discussions will depend on this hash string, which is written as a comment within the body of each Discussion.

![](../../assets/images/giscus-akismet-1.png)

If you lose or mistype it, Giscus will later create another Discussion with the same name and write in the correct hash.

If the old Discussion has not been deleted and you want Giscus to target a different Discussion, you need to manually calculate a hash string using the *sha1* algorithm based on the default page title assigned by Giscus (which depends on the mapping relationship you selected above; if you selected "pathname," it will be `posts/pin`), and then manually enter this hash string to map Giscus to the desired Discussion.

```sql
root@AcoFork-NAS:~# echo -n "posts/pin/" | sha1sum
6ae1aef4a17c896d06677a8e55c23b364bb82bbb  -
root@AcoFork-NAS:~#
```

Classification recommendation selection **announcements**

![](../../assets/images/2025-08-04-12-22-07-image.webp)

Features can be selected as needed.

![](../../assets/images/2025-08-04-12-22-25-image.webp)

Choose themes based on preference. The theme will be immediately displayed after changing.

![](../../assets/images/2025-08-04-12-22-57-image.webp)

Finally, copy this JS and place it in the section where you want the comment area.

![](../../assets/images/2025-08-04-12-23-41-image.webp)

# Configure Akismet

> Akismet (Automattic Kismet) is a widely used spam comment filtering system, created by Matt Mullenweg, the renowned founder of WordPress. Akismet is also the default plugin installed with WordPress and is extensively used, designed specifically to help blog websites filter spam comments.

Register at [akismet.com](https://akismet.com/)

Choose the Akismet Personal subscription, drag the slider to $0, and record the obtained Akismet API Key.

![](../../assets/images/2025-08-04-12-27-58-image.webp)

Go to https://github.com/afoim/giscus-fuwari/blob/main/.github/workflows/akismet-comment-check.yml

Deploy this GitHub Action to your repository that has Giscus enabled.

Configure Secret:

- AKISMET_API_KEY: Your Akismet API Key

- GH_TOKEN：前往 https://github.com/settings/tokens 创建一个具有 `repo` `write:discussion` `user` 权限的Github个人令牌![](../../assets/images/2025-08-04-12-29-06-image.webp)

To test whether anti-spam is effective, post a comment with the content `viagra-test-123`. This comment will definitely be classified as spam.

Check whether GitHub Action has performed the deletion of comments.

![](../../assets/images/2025-08-04-12-30-37-image.webp)

# Ban users

> If someone keeps spamming but anti-spam has not detected it?

You can manually ban it by going to the user's personal information page.

See [Prevent users from accessing your personal account - GitHub Documentation](https://docs.github.com/zh/communities/maintaining-your-safety-on-github/blocking-a-user-from-your-personal-account#blocking-a-user-from-their-profile-page)

# Prevent new users from posting reviews

> If someone keeps creating multiple accounts to post reviews?

Use https://github.com/your-username/your-repository/settings/interaction-limits

Configure temporary interaction restrictions so that new users cannot perform any operations on your repository.

![](../../assets/images/2025-08-04-20-43-06-image.webp)