---
title: "Food Guide: How to Use Meal Reminder Functionality"
description: "The super impressive little bell at the bottom of the frame – how can it be used?"
category: "Announcement"
published: 2026-02-22
image: ../../assets/images/post-diff-guide.png
draft: false
lang: en
---
:::ai-summary[AI Summary]{model="google/gemma-3-1b"}
The article explains a new feature on the blog that automatically detects and notifies users when an article has been updated, using a small red and blue icon. It describes how this system works – it records past visits, compares server versions, and displays changes in a clear, contextual manner with diff highlighting. It also addresses common questions about why notifications aren't appearing and how to clear the visual indicators.
:::

Certainly, here’s the translation:  “Indeed, that small bell at the bottom right corner is not particularly noticeable.”

You may have noticed a small bell icon appearing in the bottom right corner of your blog. This is not a subscription notification (though it resembles one), but rather a **Client-Based Article Update Detection System**.

# What is the reason for this?

Frequently, after completing an article, writers often discover errors in spelling or phrasing, and may need to revise content due to various reasons.

For the reader, if you’ve previously viewed this article again, it might be challenging to discern what has changed. It could be a change in punctuation, or an addition of substantial content.

To address the challenge of “finding different versions,” we’ve implemented this feature. It tracks your previous access to articles and automatically compares the latest version available on the server upon subsequent visits, informing you: **The article has been updated, where specifically?**

---

# Please specify the method of consumption.

The process is remarkably straightforward; it’s entirely automated, requiring no manual intervention whatsoever.

## Discovering updates.

When browsing a blog, the system automatically retrieves the latest RSS subscription sources and compares them to your local cached articles.

If a new article is discovered (whether it’s content, title, or description), the small bell icon will appear in the bottom right corner, and an **dot-highlight** animation will remind you that there’s something new.

## 2. 查看列表

Click the small bell, which will display a panel listing all articles with changes.

- **NEW**: This article is a new post, marked with the 'NEW' tag.
- **Update**: A new tag has been added – a blue label indicating that this article may have previously been viewed or cached, but now it has undergone modifications.

## Review the diff.

This is the core functionality. Click on articles with the `UPDATE` tag to directly navigate to that article and automatically scroll to the first change point.

In the text, you will observe a similar “diff” effect as found in code editing tools.

- The highlighted area indicates content that has been removed or modified.
- The highlighted section indicates a new or revised content.

[!TIP]
If the content changes significantly, we will only display a few lines of text surrounding the affected areas as context. The remaining unchanged portions will remain unaltered and do not interfere with your normal reading.

## Common issues

Why haven’t I seen the small bell?
If no new articles or updates are detected, the small bell will automatically hide to avoid disturbing your reading.

Why does the system sometimes indicate a refresh when the content hasn’t changed, despite the absence of updates?
The system also analyzes the body text and title, as well as the description. Occasionally, this may involve simply adjusting formatting or correcting typographical errors, which can trigger notification updates.

I don’t want to look at these red, green, and yellow wires anymore.
At the upper right corner of the small bell panel, there is a **Clear** button (trash can icon). Clicking this button will mark all current articles as "Read" or "Newest," and clear your local comparison records. This will only re-alert you when new changes occur in the future.