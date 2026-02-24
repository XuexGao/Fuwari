---
title: "Food Guide: How to Use Meal Reminder Functionality"
description: "The top-right corner’s incredibly impressive chime – how can it be utilized?"
category: "Announcement"
published: 2026-02-22
image: ../../assets/images/post-diff-guide.png
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
The article explains a new feature on the blog that automatically detects and notifies users of changes to their articles, utilizing client-side article updates. It describes how this function works – it tracks recent access, displays updated articles with visual cues (red/blue highlights), and provides a detailed diff view within the article itself.
:::

Yes, that little bell at the bottom right corner isn’t particularly noticeable.

The recent blog has added a small bell icon at the bottom right corner. This is not a subscription notification (though it looks like one), but rather a **client-based article update detection system**.

# Why are we doing this?

Many times, after writing an article, we may discover typos or need to add or remove content due to various reasons.

The content has changed significantly. It’s as if the article has been rewritten, with new information added or existing information reorganized.

To address the “find different” challenge, we’ve introduced a feature that records your last access to an article and automatically compares it to the latest version on the server upon your next visit. It will tell you: **This article has changed, where exactly.**

Okay, please provide the text. I’m ready when you are.

# The method of consumption.

It’s simple, and the entire process is fully automated; no manual action is required.

## Discover update

When browsing blogs, the system automatically retrieves the latest RSS subscription sources and compares them with your local cached articles.

If there is a new article (whether content, title, or description), a red dot will appear in the corner of the small bell and an entrance animation will remind you “There’s something new.”

## Please provide the text you would like me to translate.

Click the small bell, which will display a panel listing all articles that are changing.

- A new article has been added with a green `NEW` tag, indicating that it is the latest published content.
- Update: There is a blue tag indicating that this article may have been viewed previously, but now it has new changes.

## 查看Diff

Click on articles with the `UPDATE` tag to directly jump to that article and automatically scroll to the first change point.

In the article, you will see a similar diff effect as code editor tools.

- Red lines indicate content that has been deleted or modified.
- Green underlines indicate new or modified content.

!TIP
If there are many changes to the content, we will only show the nearby lines of text surrounding the change points as context (context), and the remaining unchanged portion will remain unchanged, without interfering with your normal reading.

## Okay, please provide the text. I’m ready when you are.

Why haven’t I seen the small bell?
If no new articles or updates are detected, the small bell will default to being hidden to avoid disturbing you while reading.

Why does it sometimes seem like the same article doesn’t change, even though the update suggests it has?
The system also detects body text and titles, as well as descriptions. Sometimes it’s just a minor formatting change, or a correction to the layout, which can trigger an update notification.

I don't know what to do about these red and green wires.
At the top right corner of the small bell panel, there is a **Clear** button (trash can icon). Clicking it will mark all current articles as "read/latest" and clear local comparison records. It will remind you again when there are new changes.